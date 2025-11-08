<template>
    <div class="app">
       <div class="glogo">
           <p>拉萨市网格信访</p>
           <p>受理门户</p>
       </div>
        <div class="cont">
            <p class="conttips" v-if="false">您所在网格：网格名称</p>
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
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
                <el-form-item prop="code" >
                    <el-input
                        v-model="loginForm.code"
                        auto-complete="off"
                        type="text"
                        placeholder="验证码"
                        class="yzm"
                    >
                        <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
                    </el-input>
                    <div class="login-code">
                        <img :src="codeUrl" @click="getCode" class="login-code-img"/>
                    </div>
                </el-form-item>
                <el-form-item prop="code" >
                    <el-input
                        v-model="loginForm.smsCode"
                        auto-complete="off"
                        type="text"
                        placeholder="短信验证码"
                        class="yzm"
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
                <el-form-item>
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
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {getCodeImg, getSMSCode} from "@/api/login";
import Cookies from "js-cookie";

    export default {
        name : 'GridLogin',
        data(){
            return{
                isButtonDisabled: false,
                buttonText: '获取验证码',
                codeUrl: '',
                countdown: 60,
                loginForm: {
                    username: "",
                    rememberMe: false,
                    code: "",
                    smsCode: "",
                    uuid: "",
                    type: 3
                },
                loginRules: {
                    username: [
                        {required: true, trigger: "blur", message: "请输入您的账号"}
                    ],
                    code: [{required: true, trigger: "change", message: "请输入验证码"}],
                    smsCode: [{required: true, trigger: "change", message: "请输入短信验证码"}]
                },
                loading: false,
                redirect: undefined
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect;
                },
                immediate: true
            }
        },
        mounted() {
            this.getCode();
        },
        methods :{
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
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        if (this.loginForm.rememberMe) {
                            Cookies.set("username", this.loginForm.username, {expires: 30});
                            Cookies.set('rememberMe', this.loginForm.rememberMe, {expires: 30});
                        } else {
                            Cookies.remove("username");
                            Cookies.remove('rememberMe');
                        }
                        let loginData = {
                            username: this.loginForm.username,
                            code: this.loginForm.code,
                            uuid: this.loginForm.uuid,
                            type: this.loginForm.type
                        };
                        if (3 === this.loginForm.type) {
                            loginData.code = this.loginForm.smsCode;
                        }
                        this.$store.dispatch("Login", loginData).then(() => {
                            this.$router.push({path: this.redirect || "/grid/personal"}).catch(() => {
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
    }
</script>

<style scoped lang="scss">
.app{
    .glogo{
        padding: 5rem;
        font-size: 10rem;
        line-height: 5rem;
        text-align: center;
    }
    .cont{
        .conttips{
            padding: 10px 10rem;
        }
        .login-form {
            padding: 0 10rem;
            .el-input {
                height: 38px;

                input {
                    //background-color: #01366b;
                    height: 38px;
                    font-size: 16px;
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
                width: 100%;
                //color: #042041;
                //background-color: #00d2ff;
                //border-color: #00beeb;
                font-size: 22px;
                //font-weight: bold;
            }

            .input-icon {
                height: 39px;
                width: 14px;
                margin-left: 2px;
            }
        }
        .login-tip {
            font-size: 13px;
            text-align: center;
            color: #bfbfbf;
        }

        .login-code {
            height: 38px;
            float: right;

            img {
                cursor: pointer;
                vertical-align: middle;
            }
            button{
                width: 100px;
                padding: 11px 5px;
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

    }
}
</style>
