<template>
  <el-container class="login">
    <el-header class="login-head">
      <img src="@/assets/images/login-head.png">
    </el-header>
    <el-main class="login-cont">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
            <h3 class="title">欢 迎 登 录</h3>
            <div v-if="1 === this.loginForm.type">
                <el-form-item prop="username">
                    <el-input
                        v-model="loginForm.username"
                        type="text"
                        auto-complete="off"
                        placeholder="账号"
                    >
                        <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="loginForm.password"
                        type="password"
                        auto-complete="off"
                        placeholder="密码"
                        @keyup.enter.native="handleLogin"
                    >
                        <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code" v-if="captchaEnabled">
                    <el-input
                        v-model="loginForm.code"
                        auto-complete="off"
                        type="text"
                        placeholder="验证码"
                        class="yzm"
                        @keyup.enter.native="handleLogin"
                    >
                        <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
                    </el-input>
                    <div class="login-code">
                        <img :src="codeUrl" @click="getCode" class="login-code-img"/>
                    </div>
                </el-form-item>
                <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;" v-if="false">记住密码</el-checkbox>
            </div>
            <div v-if="2 === this.loginForm.type">
                <el-form-item prop="username">
                    <el-input
                        v-model="loginForm.username"
                        type="text"
                        auto-complete="off"
                        placeholder="手机号"
                    >
                        <svg-icon slot="prefix" icon-class="phone" class="el-icon-mobile-phone input-icon"/>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code" v-if="captchaEnabled">
                    <el-input
                        v-model="loginForm.code"
                        auto-complete="off"
                        type="text"
                        placeholder="验证码"
                        class="yzm"
                        @keyup.enter.native="handleLogin"
                    >
                        <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
                    </el-input>
                    <div class="login-code">
                        <img :src="codeUrl" @click="getCode" class="login-code-img"/>
                        <span @click="getCode" class="login-code-text" v-if="!codeUrl">看不了？换一张</span>
                    </div>
                </el-form-item>
                <el-form-item prop="code" v-if="captchaEnabled">
                    <el-input
                        v-model="loginForm.smsCode"
                        auto-complete="off"
                        type="text"
                        placeholder="短信验证码"
                        class="yzm"
                        @keyup.enter.native="handleLogin"
                    >
                        <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
                    </el-input>
                    <div class="login-code">
                        <el-button
                            :disabled="isButtonDisabled"
                            @click="getCaptcha"
                            :class="{ 'disabled-button': isButtonDisabled }"
                        >
                            {{ buttonText }}
                        </el-button>
                    </div>
                </el-form-item>
            </div>

            <el-form-item style="width:100%;">
                <el-button
                    :loading="loading"
                    size="medium"
                    type="primary"
                    style="width:100%;"
                    @click.native.prevent="handleLogin"
                >
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                </el-button>
                <div style="float: right;" v-if="register">
                    <router-link class="link-type" :to="'/register'">立即注册</router-link>
                </div>
            </el-form-item>
        </el-form>

      <div class="login-show">
        <span>维护<br/>民利</span>
        <span>了解<br/>民情</span>
        <span>凝聚<br/>民心</span>
        <span>集中<br/>民智</span>
        <img class="login-show-shadow" src="@/assets/images/login-show-shadow.png">
        <img src="@/assets/images/login-show.png">
      </div>
    </el-main>
    <!--  底部  -->
    <!--    <div class="el-login-footer">-->
    <!--      <span>Copyright © {{copyrightInfo.startYear}}<span v-if="copyrightInfo.startYear != copyrightInfo.currentYear">-{{copyrightInfo.currentYear}}</span> All Rights Reserved.</span>-->
    <!--    </div>-->
  </el-container>
</template>

<script>
    import {getCodeImg, getSMSCode} from "@/api/login";
    import Cookies from "js-cookie";
    import {encrypt, decrypt} from '@/utils/jsencrypt';

    export default {
        name: "Login",
        data() {
            return {
                isButtonDisabled: false,
                buttonText: '获取验证码',
                countdown: 60,
                sysName: process.env.VUE_APP_TITLE,
                codeUrl: "",
                loginForm: {
                    username: "",
                    password: "",
                    rememberMe: false,
                    code: "",
                    smsCode: "",
                    uuid: "",
                    type: 2
                },
                loginRules: {
                    username: [
                        {required: true, trigger: "blur", message: "请输入您的账号"}
                    ],
                    password: [
                        {required: true, trigger: "blur", message: "请输入您的密码"}
                    ],
                    code: [{required: true, trigger: "change", message: "请输入验证码"}],
                    smsCode: [{required: true, trigger: "change", message: "请输入短信验证码"}]
                },
                copyrightInfo: {
                    startYear: 2023,
                    currentYear: new Date().getFullYear()
                },
                loading: false,
                // 验证码开关
                captchaEnabled: true,
                // 注册开关
                register: false,
                redirect: undefined
            };
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect;
                },
                immediate: true
            }
        },
        created() {
            this.initLoginPage();
            this.getCode();
            this.getCookie();
        },
        methods: {
            initLoginPage() {
                if (1 === this.loginForm.type) {
                    this.loginForm.username = "";
                } else if (2 === this.loginForm.type) {
                    this.loginForm.username = "";
                }
            },
            getCaptcha() {
                getSMSCode(this.loginForm.username, this.loginForm.code, this.loginForm.uuid, this.loginForm.type).then(res => {
                    if (res && 200 === res.code) {
                        this.loginForm.uuid = res.uuid;
                        if (this.isButtonDisabled) return;
                        this.isButtonDisabled = true;
                        this.buttonText = `${this.countdown}秒后可重试`;

                        const interval = setInterval(() => {
                            this.countdown -= 1;
                            this.buttonText = `${this.countdown}秒后可重试`;

                            if (this.countdown === 0) {
                                clearInterval(interval);
                                this.isButtonDisabled = false;
                                this.buttonText = '获取验证码';
                                this.countdown = 60;
                            }
                        }, 1000);
                    }
                }).catch(() => {
                    this.loading = false;
                    if (this.captchaEnabled) {
                        this.getCode();
                    }
                });
            },
            getCode() {
                getCodeImg().then(res => {
                    this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
                    if (this.captchaEnabled) {
                        this.codeUrl = "data:image/gif;base64," + res.img;
                        this.loginForm.uuid = res.uuid;
                    }
                });
            },
            getCookie() {
                const username = Cookies.get("username");
                const password = Cookies.get("password");
                const rememberMe = Cookies.get('rememberMe');
                this.loginForm = {
                    username: username === undefined ? this.loginForm.username : username,
                    password: password === undefined ? this.loginForm.password : decrypt(password),
                    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
                    type: this.loginForm.type
                };
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        if (this.loginForm.rememberMe) {
                            Cookies.set("username", this.loginForm.username, {expires: 30});
                            Cookies.set("password", encrypt(this.loginForm.password), {expires: 30});
                            Cookies.set('rememberMe', this.loginForm.rememberMe, {expires: 30});
                        } else {
                            Cookies.remove("username");
                            Cookies.remove("password");
                            Cookies.remove('rememberMe');
                        }
                        let loginData = {
                            username: this.loginForm.username,
                            password: this.loginForm.password,
                            code: this.loginForm.code,
                            uuid: this.loginForm.uuid,
                            type: this.loginForm.type
                        };
                        if (2 === this.loginForm.type) {
                            loginData.code = this.loginForm.smsCode;
                        }
                        this.$store.dispatch("Login", loginData).then(() => {
                            this.$router.push({path: this.redirect || "/"}).catch(() => {
                            });
                        }).catch(() => {
                            this.loading = false;
                            if (this.captchaEnabled) {
                                this.getCode();
                            }
                        });
                    }
                });
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background-image: url("../assets/images/login-background.jpg");
    background-size: 100% 100%;
  }

  .login-head {
    width: 40%;
    margin-top: 7%;

    img {
      width: 100%;
    }
  }

  .login-cont {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    .login-show {
      width:  500px;
      position: relative;
        margin-top: -65px;
        z-index: 1;
      span {
        position: absolute;
        color: white;
        width: 70px;
        height: 70px;
        left: 75%;
        top: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url("../assets/images/bubble.png") no-repeat ;
        background-size: cover;
        font-size: 18px;
        animation: donghua 2s infinite;
        border-radius: 50%;
      }

      span:nth-child(2) {
        left: 65%;
        top: 45%;
        background: url("../assets/images/bubble1.png") no-repeat;
        background-size: cover;
      }

      span:nth-child(3) {
        left: 15%;
        top: 40%;
        width: 60px;
        height: 60px;
        font-size: 14px;
      }

      span:nth-child(4) {
        width: 40px;
        height: 40px;
        left: 40%;
        top: 50%;
        font-size: 12px;

      }

      @keyframes donghua {
        0% {
          transform: translateY(0px);
          box-shadow: 0 0 0 0 rgba(28, 193, 255, 0.1);
        }
        50% {
          transform: translateY(10px);
          box-shadow: 0 0 0 10px rgba(28, 193, 255, 0);

        }
        100% {
          transform: translateY(0px);
          box-shadow: 0 0 0 0 rgba(28, 193, 255, 0);
        }
      }

      img {
        width: 100%;
      }
        .login-show-shadow{
            position: absolute;
            width: 700px;
            height: 500px;
            right: -100px;
            bottom: 110px;
        }
    }

    }

  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #66aef7;
    font-size: 28px;
  }

  .login-form {
    //background: #ffffff;
    width: 350px;
    background-size: 100% 100%;
      z-index: 2;
    .el-input {
      height: 38px;

      input {
        //background-color: #01366b;
        height: 38px;
        font-size: 16px;
          border-radius: 40px;
        //border-color: #265786;
        //color: #92bdda;
      }

      input::-webkit-input-placeholder {
        color: #82848a;
      }
    }
    .yzm{
      width: calc(100% - 110px);
    }

    .el-button--primary {
      color: #042041;
      background-color: #00d2ff;
      border-color: #00beeb;
      font-size: 22px;
      font-weight: bold;
        border-radius: 40px;
    }

    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }

  ::placeholder {
    color: red;
  }

  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }

  .login-code {
    //width: 33%;
    height: 38px;
    float: right;

    img {
      cursor: pointer;
      vertical-align: middle;
    }
    button{
        padding: 11px 5px;
        border-radius: 40px;
    }

  }

  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .login-code-img {
    height: 38px;
  }

  .login-code-text {
      color: white;
      cursor: pointer;
  }


</style>
