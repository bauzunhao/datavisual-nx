<template>
  <div class="home">
    <div class="head">
      <div class="hname">
        <p>欢迎登录 <span>{{loginUser.nickName}}</span> <span class="quit" @click="logout()">退出</span></p>
        <p>
<!--          <router-link to="/home/index" target="_blank">后台管理</router-link>-->
          <router-link to=""  target="_blank">后台管理</router-link>
        </p>
      </div>
      <img src="@/assets/images/login-head.png">
    </div>
    <div class="content" v-if="!hasRole(['grid']) && !hasRole(['szfw'])">
      <div>
        <h3>信访形势分析</h3>
        <router-link to="/datav/analysis"><p>今日信访量情况</p></router-link>
        <router-link to="/datav/analysis"><p>各地信访量</p></router-link>
        <router-link to="/datav/analysis"><p>全区信访量情况</p></router-link>
        <router-link to="/datav/analysis"><p>办理情况</p></router-link>
        <img src="../assets/images/dataanaly.png" alt="">
      </div>
      <div>
        <h3>源头治理</h3>
        <router-link to="/datav/legalization"><p>区信访局登记占比</p></router-link>
        <router-link to="/datav/legalization"><p>赴区信访局走访</p></router-link>
        <router-link to="/datav/legalization"><p>群众满意率</p></router-link>
        <img src="../assets/images/emphasis.png" alt="">
      </div>
      <div>
        <h3>信访工作法治化</h3>
        <router-link to="/datav/firstpiece"><p>预防法制化</p></router-link>
        <router-link to="/datav/repetition"><p>受理法制化</p></router-link>
        <router-link to="/datav/threelist"><p>办理法制化</p></router-link>
        <router-link to="/datav/threelist"><p>监督追责法制化</p></router-link>
        <router-link to="/datav/threelist"><p>维护秩序法制化</p></router-link>
        <img src="../assets/images/emergency.png" alt="">
      </div>
      <div>
        <h3>信访专题</h3>
        <router-link to="/datav/general"><p>新就业群体专题</p></router-link>
        <router-link to="/datav/general"><p>政法专题</p></router-link>
        <router-link to="/datav/general"><p>涉军专题</p></router-link>
        <img src="../assets/images/lincom.png" alt="">
      </div>
    </div>
  </div>
</template>


<script>
    import {hasRole} from "@/utils/permission"; // 权限判断函数
    export default {
        name: "DataVisualNavPage",
        data() {
            return {
                loginUser: {
                    userName: undefined,
                    nickName: undefined
                }
            };
        },
        created() {
            if (hasRole(["grid", "szfw"])) {
                this.$router.push({path: "/home/index"}).catch(() => {});
            }
            this.initInfo();
        },
        methods: {
            hasRole,
            initInfo() {
                this.loginUser.userName = this.$store.state.user.name;
                this.loginUser.nickName = this.$store.state.user.nickName;
            },
          async logout() {
            this.$confirm('确定注销并退出系统吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$store.dispatch('LogOut').then(() => {
                location.href = '/login';
              })
            }).catch(() => {});
          }
        }
    }
</script>

<style scoped lang="scss">
  $ft-color: #22b6e4;
  p {
    margin: 0
  }

  .home {
    height: 100vh;
    width: 100vw;
    padding: 4vh 4vw;
    background: url("../assets/images/login-background.jpg") no-repeat;
    background-size: 100% 100%;

    .head {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      align-items: center;

      .hname {
        color: $ft-color;
        font-size: 1.3rem;
        display: flex;
        justify-content: space-between;
        width: 100%;

        p:last-child {
          background: url("../assets/images/back-stage.png") no-repeat;
          background-size: 100% 100%;
          text-align: center;
          line-height: 2rem;
          height: 2rem;
          padding: 0 25px;
          cursor: pointer;
        }

        span {
          margin-left: 20px;
        }

        .quit {
          cursor: pointer;
          color: white;
          padding: 5px 30px;
          border-radius: 4px;
          background: rgb(3, 39, 72);
          background: linear-gradient(90deg, rgba(3, 39, 72, 0.8519782913165266) 0%, rgba(3, 59, 94, 0.8547794117647058) 50%, rgba(3, 74, 111, 0.7567401960784313) 100%);
        }
      }

      img {
        width: 20vw;
        margin-top: 6vh;
      }
    }

    .content {
      display: flex;
      justify-content: center;
      margin-top: 9vh;

      div {
        width: 12vw;
        height: 46vh;
        border-top: 0.4vh solid #ebda55;
        background: url("../assets/images/conbj.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 2.5vw;
        position: relative;
        transition: all .5s ease;
        h3 {
          margin: 0;
          color: white;
          font-size: 1.5rem;
          background: url("../assets/images/conbj1.png") no-repeat;
          background-size: 100% 100%;
          height: 11vh;
          line-height: 11vh;
          text-align: center;
          margin-bottom: 1vh;
          border: 0;
        }

        font-size: 1.2rem;
        color: $ft-color;

        p {
          margin-top: 2vh;
          padding-left: 1.5vw;
          cursor: pointer;
        }

        p:hover {
          color: white;
          text-decoration: underline;
        }

        img {
          width: 20%;
          position: absolute;
          bottom: 10%;
          right: 5%;
        }
      }

      div:first-child {
        margin: 0;
        //transform: scale(0.8);
        border-color: #f9676f
      }

      div:nth-child(3) {
        border-color: #1ad485
      }

      div:last-child {
        //transform: scale(0.8);
        border-color: #13add7
      }
      div:hover{
        transform: scale(1.2);
      }

    }
  }

  @media only screen and (max-width: 2500px) {
    //.home .content div h3 {
    //  font-size: 24px;
    //}
    //.home .content div p {
    //  font-size: 18px;
    //}
    .home .content div {
      height: 40vh;
    }
  }

</style>
