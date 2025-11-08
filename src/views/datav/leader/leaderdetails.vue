<template>
  <div class="home">
    <datavhead></datavhead>
    <div class="cont">
      <div class="sectionleft">
        <div class="sec1-nav">
          <router-link to="/"><img src="../../../assets/images/general-home.png" alt=""></router-link>
          <ul>
            <li @click="openDialong()"><span>导航</span></li>
            <li><router-link to="/datav/leader"><span>领导包案</span></router-link></li>
            <li><router-link to="/datav/priorities"><span>接访下访</span></router-link></li>
            <li><router-link to="/"><span>重点事项</span></router-link></li>
            <li><router-link to="/datav/example"><span>示范区县</span></router-link></li>
          </ul>
        </div>
        <div class="sectmin1">
          <img v-if="receptionInfo.profile && receptionInfo.leaderInfo.portrait" :src="realImgSrc(receptionInfo.leaderInfo.portrait)" alt="">
          <img v-if="receptionInfo.profile && !receptionInfo.leaderInfo.portrait" src="../../../assets/images/profile.jpg" alt="">
          <div>
            <h4 class="ft30" v-text="receptionInfo.leaderInfo.leaderName"></h4>
            <p class="ft26" v-text="receptionInfo.leaderInfo.duties"></p>
            <p class="ft24" v-text="receptionInfo.leaderInfo.introduction"></p>
          </div>
        </div>
        <div class="sectmin2 mabt70">
          <p>包案时效 <span>包案结果</span></p>
          <p><span>{{leaderTime}}天</span> {{petitionInfo.startLeaderTime}}启动/{{petitionInfo.endLeaderTime}}结束 <span>{{situationJson.checkRadio}}</span></p>
        </div>
        <div class="sectmin3">
          <h3>信访述求概况</h3>
          <div><p v-text="petitionInfo.complaintContent"></p></div>
        </div>
      </div>
      <div class="section">
        <div class="sectionhead">
          <p><span>组长名字</span>{{receptionInfo.leaderInfo.leaderName}}</p>
        </div>
        <div class="sectguorp mabt70">
          <div class="gulist"  v-if="receptionInfo.deputyInfo.length !== 0" v-for="deputy in receptionInfo.deputyInfo">
            <img v-if="receptionInfo.profile && deputy.portrait" :src="realImgSrc(deputy.portrait)" alt="">
            <img v-if="receptionInfo.profile && !deputy.portrait" src="../../../assets/images/profile.jpg" alt="">
            <div>
              <h4 >副组长</h4>
              <h5 v-text="deputy.leaderName"></h5>
              <p v-text="deputy.duties"></p>
            </div>
          </div>
          <div class="gulist" v-if="receptionInfo.deputyInfo.length === 0">
            <div>
              <h4 >副组长</h4>
              <h5>无</h5>
            </div>
          </div>
          <div class="gulist" >
            <div>
              <h4 >组员</h4>
              <h5>
                <span v-if="receptionInfo.teamList.length !== 0"
                      v-for="team in receptionInfo.teamList"
                      v-text="team.leaderName">组员名字</span>
                <span v-if="receptionInfo.teamList.length === 0">无</span>
              </h5>
            </div>
          </div>
          <div class="gulist" >
            <div>
              <h4 >参与单位</h4>
              <h5>
                <span  v-if="unitName.length !== 0" v-for="unit in unitName" v-text="unit">单位名字</span>
                <span v-if="unitName.length === 0">无</span>
              </h5>
            </div>
          </div>
        </div>
        <div class="sectmin mabt70">
          <div class="sectmin1">
            <h3>包案进度</h3>
            <div class="sectmin1">
              <ul>
                <li>摸排调查</li>
                <li>协调处理</li>
                <li>督查落实</li>
<!--                <li>包清情况</li>-->
              </ul>
             <div class="prog">
               <div class="proglist">
                 <el-progress  :stroke-width="12" text-color="#ebda55" :percentage="examineJson.number" ></el-progress>
                 <p :title="examineJson.textarea" v-if="examineJson.textarea">{{examineJson.textarea}}</p>
               </div>
               <div class="proglist">
                 <el-progress  :stroke-width="8" text-color="#ebda55" :percentage="coprocessingJson.number" ></el-progress>
                 <p :title="coprocessingJson.textarea" v-if="coprocessingJson.textarea">{{coprocessingJson.textarea}}</p>
               </div>
               <div class="proglist">
                 <el-progress  :stroke-width="8" text-color="#ebda55" :percentage="workableJson.number" ></el-progress>
                 <p :title="workableJson.textarea" v-if="workableJson.textarea">{{workableJson.textarea}}</p>
               </div>
<!--               <div class="proglist">-->
<!--                 <el-progress  :stroke-width="8" text-color="#ebda55" :percentage="situationJson.number" ></el-progress>-->
<!--                 <p v-if="situationJson.textarea">{{situationJson.textarea}}</p>-->
<!--               </div>-->
             </div>
            </div>
          </div>
          <div class="sectmin2" >
            <h3>包清情况</h3>
            <div class="sectmin2con">
                <p v-if="situationJson.textarea">{{situationJson.textarea}}</p>
            </div>
          </div>
        </div>

        <div class="sectfot">
          <h3>包案现场</h3>
          <div class="fotimglist">
              <div class="swiper-container" ref="swiper">
                  <div class="swiper-wrapper">
                      <div v-for="file in files"  class="swiper-slide">
                          <img  :src="realImgSrc(file.fileName)" alt="">
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <DialogNav ref="DialogNav"></DialogNav>
  </div>
</template>

<script>
import DialogNav from '@/components/DialogNav/index'
import datavhead from '@/components/DatavHead/index'
import {getLeaderPetition} from '@/api/datav/priorities/leader'
import 'swiper/swiper-bundle.css';
import Swiper, { Autoplay } from 'swiper';
Swiper.use([Autoplay]);
import { isExternal } from "@/utils/validate";

export default {
name: "leaderdetails",
  components: {'DialogNav': DialogNav, 'datavhead': datavhead, },
    data(){
    return {
        petitionInfo:{},
        examineJson: {number: 0, file: [],textarea:''},   //摸排调查
        coprocessingJson: {number: 0, file: [],textarea:''},//协调处理
        workableJson: {number: 0, file: [],textarea:''},    //督查落实
        situationJson: {number: 0,textarea:''},   //包清情况
        files:[],//图片集合
        leaderTime:0,//包案时间间隔
        receptionInfo: {
            profile: true,
            defaultProfile: '../../../assets/images/profile.jpg',
            leaderInfo:{},//领导对象
            deputyInfo:[],//副组长集合
            teamList:[],//组员集合
        },
        unitName: [],
        swiper: null,
    }
    },
  mounted() {

  },
  created(){
    this.loadConfig();
    this.getInfo();
  },
  methods: {
    initswiper(){
        this.swiper = new Swiper(this.$refs.swiper, {
            loop: true, // 无限滚动
            slidesPerView: 5,  // 一次显示5个slides
            spaceBetween: 0,  // slides之间的间距
            centeredSlides: false,
            on: {
                init: function() {
                    if (this.slides.length > 5){
                        this.timer = setInterval(() => {
                            this.slideNext();
                        }, 2000);
                    }

                }
            }
        });

    },
    openDialong() {
      this.$refs.DialogNav.handldOpen();
    },getInfo(){
          getLeaderPetition(this.$route.query.petitionId).then(response => {
            this.petitionInfo = response.data;
            if(this.petitionInfo){
                this.coprocessingJson = JSON.parse(this.petitionInfo.coprocessingJson);
                this.examineJson = JSON.parse(this.petitionInfo.examineJson);
                this.workableJson = JSON.parse(this.petitionInfo.workableJson);
                this.situationJson = JSON.parse(this.petitionInfo.situationJson);
                this.receptionInfo.leaderInfo = this.petitionInfo.leaderList[0];
                this.receptionInfo.deputyInfo = this.petitionInfo.deputyList;
                this.receptionInfo.teamList = this.petitionInfo.teamList;
                this.coprocessingJson.file.forEach(obj => {
                    this.files.push(obj);
                });
                this.examineJson.file.forEach(obj => {
                    this.files.push(obj);
                });
                this.workableJson.file.forEach(obj => {
                    this.files.push(obj);
                });
                let start = new Date(this.petitionInfo.startLeaderTime);
                let end = new Date(this.petitionInfo.endLeaderTime);
                this.leaderTime = (end - start) / 1000 / 3600 / 24;
                this.petitionInfo.joinUnitList.forEach(unit => {
                    this.unitName.push(unit.joinUnitName);
                });
                let handUnitName = this.petitionInfo.handUnitName;
                if(handUnitName){
                    let splic = handUnitName.split(',');
                    splic.forEach(name => {
                        this.unitName.push(name);
                    })
                }
            }
              this.$nextTick(()=>{
                  this.initswiper()
              })
          })
      },loadConfig() {
          this.getConfigKey("sys.leader.photo.show").then(response => {
              this.receptionInfo.profile = "1" === response.msg;
          });
      },realImgSrc(src) {
          if (!src) {
              return;
          }
          let real_src = src.split(",")[0];
          if (isExternal(real_src)) {
              return real_src;
          }
          return process.env.VUE_APP_BASE_API + real_src;
      },
  },
    beforeDestroy() {
        if (this.swiper) {
            // 停止定时器
            if (this.swiper.timer) {
                clearInterval(this.swiper.timer);
            }
            this.swiper.destroy();
        }
    }
}
</script>

<style scoped lang="scss">

p {
  margin: 0
}

.colorred {
  color: #fb686f
}

.colorgreen {
  color: #1ad485
}

.coloryel {
  color: #ebda55
}

$ft-yel: #ebda55;
$ft-color: #34d0ff;
@font-face {
  font-family: "DSfont";
  src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
}

$ye-color: #ebda55;
$sz-font-family: "DSfont";

.home {

  .cont {
    .sectionleft {
      .sectmin1{
          display: flex;
          //width: 330px;
          height: 440px;

          img {
              width: 330px;
              height: 100%;
          }

          div {
            display: inline-block;
            min-width: calc(100% - 440px) ;
            width: 100%;
            height: 100%;
            vertical-align: top;
            color: $ft-color;
            text-align: right;
            padding: 15px 30px;
            background-color: rgba(25, 54, 98, 0.38);

            h4 {
              margin: 0;
            }

            p:nth-child(2) {
              margin-top: 5px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
            }

            p:last-child {
              color: #a4a8ad;
              margin-top: 30px;
              overflow: hidden;
              display: -webkit-box;
              text-overflow: ellipsis;
              -webkit-line-clamp: 13; /* 限制显示为3行 */
              -webkit-box-orient: vertical;
              line-height: 30px; /* 行高 */
              max-height: 260px;  /* 线高 x 行数 */
            }
        }
      }
      .sectmin2{
        margin-top: 70px;
        background-color: rgba(25, 54, 98, 0.38);
        padding: 15px 20px;
        p:first-child{
          font-size: 30px;
          color: $ft-color;
          line-height: 55px;
          height: 55px;
          span{
            float: right;
          }
        }
        p:last-child{
          line-height: 45px;
          height: 45px;
          color: #a4a7ae;
          font-size: 26px;
          span:first-child{
            font-size: 28px;
            color: $ft-yel;
            margin-right: 10px;
          }
          span:last-child{
            font-size: 26px;
            color: $ft-yel;
            float: right;
          }
        }
      }
      .sectmin3{
        div{
          height: 780px;
          background-color: rgba(25, 54, 98, 0.38);
          color: $ft-color;
          font-size: 28px;
          padding:20px 40px;
          overflow: auto;
        }
        div::-webkit-scrollbar-track {
          background-color: #122a4e;
        }

        /* 滚动条的滑块颜色 */
        div::-webkit-scrollbar-thumb {
          background-color: #1379ca;
        }
      }
    }
    .section{
      margin: 155px 0 0 100px;
      width: 2572px;
      display: inline-block;
      vertical-align: top;
      .sectionhead{
        height: 100px;
        background: #09477a;
        color: white;
        font-size: 32px;
        line-height: 100px;
        span{
          background: #1690e6;
          display: inline-block;
          width: 270px;
          height: 100px;
          text-align: center;
          margin-right: 35px;
        }
      }
      .sectguorp{
        display: grid;
        grid-template-columns: repeat(3, 824px);
        grid-gap: 50px;  /* 设置元素之间的间隙 */
        margin-top: 55px;
        .gulist{
          display: flex;
          //width: 330px;
          height: 240px;
          position: relative;
          img {
            width: 160px;
            height: 100%;
          }

          div {
            display: inline-block;
            width: 100%;
            height: 100%;
            overflow: hidden;
            vertical-align: top;
            color: $ft-color;
            font-size: 18px;
            //text-align: right;
            padding: 15px 30px;
            background-color: #09477a;
            h4 {
              font-size: 32px;
              margin: 0;
            }
            h5{
              margin: 10px 0 0;
              font-size: 26px;
              span{
                margin-right: 10px;
              }
            }
            p:last-child {
              font-size: 24px;
              color: #a4a8ad;
              margin-top: 10px;
              overflow: hidden;
              display: -webkit-box;
              text-overflow: ellipsis;
              -webkit-line-clamp: 5; /* 限制显示为3行 */
              -webkit-box-orient: vertical;
              line-height: 30px; /* 行高 */
              max-height: 160px;  /* 线高 x 行数 */
            }
          }
        }
        .gulist:first-child{
          text-align: right;
        }
        .gulist:nth-child(1):after{
          content: '';
          background: #168fe8;
          position: absolute;
          top: -31px;
          left: 50%;
          width: 3px;
          height: 31px;
        }
        .gulist:nth-child(2):after{
          content: '';
          background: #168fe8;
          position: absolute;
          top: -56px;
          left: 50%;
          width: 3px;
          height: 56px;
        }
        .gulist:nth-child(2):before{
          content: '';
          background: #168fe8;
          position: absolute;
          top: -30px;
          left: calc(-50% - 50px);
          width: calc(200% + 100px);
          height: 3px;
        }
        .gulist:nth-child(3):after{
          content: '';
          background: #168fe8;
          position: absolute;
          top: -31px;
          left: 50%;
          width: 3px;
          height: 31px;
        }
      }
      .sectmin{
        margin-top: 25px;
        .sectmin1{
          display: inline-block;
          ul{
            display: inline-block;
            font-size: 26px;
            color: $ft-color;
            padding: 0;
            margin: 0;
            li{
              line-height: 80px;
              height: 80px;
              list-style: none;
            }
          }
          .prog{
            width: 1200px;
            display: inline-block;
            vertical-align: top;
            .proglist{
              margin: 0 12px 0 20px;
              color: #a4a8ad;
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 80px;
              p{
                width: 95.5%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                height: 31px;
                line-height: 31px;
                font-size: 20px;
              }
            }
          }
        }
      }
      .sectmin2{
        display: inline-block;
        vertical-align: top;
        width: 1265px;
        .sectmin2con{
          height: 240px;
          color: $ft-color;
          background-color: rgba(25, 54, 98, 0.38);
          font-size: 26px;
          padding: 20px 40px;
          overflow: auto;
        }
        .sectmin2con::-webkit-scrollbar-track {
          background-color: #122a4e;
        }
        .sectmin2con::-webkit-scrollbar-thumb {
          background-color: #1379ca;
        }
      }
      .sectfot{
        margin-top: 5px;
        vertical-align: top;
        display: inline-block;
        height: 620px;
        width: 100%;
        overflow: hidden;
        .fotimglist{
            height: 620px;
            .swiper-container {
                width: 100%;
                height: 620px;
            }
          img{
            width: 385px;
            height: 100%;
            //margin-right: 30px;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.proglist{
  /* 为线性进度条设置渐变颜色 */
  .el-progress-bar__outer{
    background-color: rgba(144, 147, 153, 0.1)!important;
  }
  .el-progress--line .el-progress-bar__inner {
    background: linear-gradient(to right, #0c4f79, #01c4fc);
  }
}
</style>
