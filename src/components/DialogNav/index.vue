<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="1200px"
    custom-class="interdialog"
    title="导航"
    :before-close="handleClose">
    <div class="content">
      <div>
        <h3>大数据分析研判</h3>
        <router-link to="/datav/general"><p>信访概览</p></router-link>
        <router-link to="/datav/transact"><p>办理情况</p></router-link>
        <router-link to="/datav/perfmon"><p>绩效分析</p></router-link>
        <router-link to="/datav/contradiction"><p>突出矛盾</p></router-link>
        <img src="../../assets/images/dataanaly.png" alt="">
      </div>
      <div>
        <h3>重点事项监测</h3>
        <router-link to="/datav/leader"><p>领导包案</p></router-link>
        <router-link to="/datav/priorities"><p>接访下访</p></router-link>
        <router-link to="/datav/focusmatter"><p>重点事项</p></router-link>
        <router-link to="/datav/example"><p>示范区县</p></router-link>
        <img src="../../assets/images/emphasis.png" alt="">
      </div>
      <div>
        <h3>源头治理</h3>
        <router-link to="/datav/firstpiece"><p>初次信访</p></router-link>
        <router-link to="/datav/repetition"><p>重复信访</p></router-link>
        <router-link to="/datav/threelist"><p>三项清单</p></router-link>
        <img src="../../assets/images/emergency.png" alt="">
      </div>
      <div>
        <h3>风险监测预警</h3>
        <router-link to="/datav/emergency"><p>风险播报</p></router-link>
        <router-link to="/datav/linkage"><p>联动指挥</p></router-link>
        <router-link to="/datav/publicityv"><p>宣传教育</p></router-link>
        <img src="../../assets/images/lincom.png" alt="">
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
name: "index",
  data(){
    return{
      dialogVisible :false
    }
  },
  methods:{
    handldOpen(){
      this.dialogVisible = true;
    },
    handleClose(done) {
      done();
    },
  }
}
</script>

<style lang="scss">
.home .interdialog:not(.is-fullscreen){
  margin-top: 20vh !important;
  border: 1px solid rgb( 18, 121, 203 );
  border-top: 5px solid #20c2f3;
  background: none;
  background-image: linear-gradient( 180deg, rgba(18,121,203,.7) 0%, rgba(0,39,83,.7) 100%);
  .el-dialog__header{
    height: 70px;
    background-image: linear-gradient(to right, #033d6b, #076aa2);
    .el-dialog__title{
      font-size: 22px;
      line-height: 30px;
      color: white;
      font-weight: bold;
      padding-left: 15px;
      border-left: 7px solid #20c2f3;
    }
    .el-dialog__headerbtn{
      top: 0;
      right: -50px;
      font-size: 40px;
      border: 1px solid rgb( 18, 121, 203 );
      line-height: 30px;
      background-color: rgba( 18, 121, 203, 0.149 );
      .el-dialog__close{
        color: #1279cb;
      }
    }
  }
  .content {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    div {
      width: 270px;
      height: 385px;
      border-top: 0.4vh solid #ebda55;
      background: url("../../assets/images/conbj.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 15px;
      position: relative;
      font-size: 22px;
      color: #20c2f3;
      h3 {
        margin: 0;
        color: white;
        font-size: 30px;
        background-size: 100% 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        margin-bottom: 10px;
        border: 0;

      }


      p {
        padding-left: 35px;
        cursor: pointer;
        margin-bottom: 20px;
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
      border-color: #f9676f
    }

    div:nth-child(3) {
      border-color: #1ad485
    }

    div:last-child {
      border-color: #13add7
    }
  }
}
</style>

