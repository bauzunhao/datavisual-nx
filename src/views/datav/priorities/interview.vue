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
            <li><router-link to="/datav/focusmatter"><span>重点事项</span></router-link></li>
            <li><router-link to="/datav/example"><span>示范区县</span></router-link></li>
          </ul>
        </div>
        <div class="sec1-min mabt70">
          <h3>领导接待安排</h3>
          <ul>
            <li v-for="rec in this.receptionTimeList">
              {{rec.flatsName}}<p>每{{"week"===rec.servedFrequency ? "" : "月"}}{{rec.weekDate}}{{"week"===rec.servedFrequency ? "" : "日"}}<span>{{rec.originateTime}}~{{rec.finishesTime}}</span>
            </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="section">
        <h3>全市接访下访量</h3>
        <div class="section-1">
          <div class="section-1list ft67">
            <p>{{receptionStatisData.weekNum}}</p>
            <p class="ft30">本周</p>
          </div>
          <div class="section-1list ft67">
            <p>{{receptionStatisData.monthNum}}</p>
            <p class="ft30">本月</p>
          </div>
          <div class="section-1list ft67">
            <p>{{receptionStatisData.yearNum}}</p>
            <p class="ft30">本年</p>
          </div>
        </div>
        <div class="section-2" ref="chart">

        </div>
      </div>
      <div class="sectionrt">
        <h3>接访下访动态</h3>
        <ul>
          <li v-for="rec in this.receptionNews"><span class="backcolor1">{{0===rec.type ? "接访" : "下访"}}</span> {{rec.leaderName}}在{{rec.cadreZoneName}}进行{{0===rec.type ? "接访" : "下访"}} <span>{{rec.interviewTime}}</span></li>
        </ul>
      </div>

      <div class="contlist1">
        <h3>接访领导</h3>
        <ul>
          <li v-for="rec in this.receptionInfo.list">
              <el-image v-if="receptionInfo.profile && rec.portrait" :src="rec.portrait" fit="cover"></el-image>
              <el-image v-if="receptionInfo.profile && !rec.portrait" :src="require('../../../assets/images/profile.jpg')" fit="cover"></el-image>

            <div>
              <h4 class="ft30">{{rec.cadreName}}</h4>
              <p class="ft26">{{rec.cadreDuties}}</p>
              <p class="ft24">{{rec.introduction}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="contlist2">
        <h3>接访下访现场</h3>
          <div class="simglist" >
              <img v-for="photo in visibleItems" v-if="photo.regular" :src="realImgSrc(photo.fileName)" alt=""/>
              <div class="swipersl" :style="{width: 3540-(visibleItems.length*415)+'px'}">
                  <div class="swiper-container" ref="swiper" >
                      <div class="swiper-wrapper">
                          <div v-for="photo in visibleItemregu"  class="swiper-slide">
                              <img  :src="realImgSrc(photo.fileName)" alt=""/>
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
    import datavhead from '@/components/DatavHead';
    import interviewchart from '@/assets/images/interview-chart.png';
    import * as echarts from 'echarts';
    import DialogNav from '@/components/DialogNav';
    import { isExternal } from "@/utils/validate";
    import {
        getLeaderReceptionTime,
        getLeaderReceptionInfo,
        getLeaderReceptionStatis,
        getLeaderReceptionStatisByZone,
        getLeaderReceptionNews,
        getLeaderReceptionPhoto
    } from "@/api/datav/priorities/interview";
    import 'swiper/swiper-bundle.css';
    import Swiper, { Autoplay } from 'swiper';
    Swiper.use([Autoplay]);
    export default {
        name: "DataV-Priorities-Interview",
        components: {'datavhead': datavhead, 'DialogNav': DialogNav},
        data() {
            return {
                swiper: null,
                receptionTimeList: [],
                receptionInfo: {
                    profile: true,
                    defaultProfile: '../../../assets/images/profile.jpg',
                    list: []
                },
                receptionStatisData: {
                    todayNum: 0,
                    weekNum: 0,
                    monthNum: 0,
                    yearNum: 0,
                    zoneChartData: []
                },
                receptionNews: [],
                receptionPhoto: []
            }
        },
        mounted() {
            this.loadReceptionConfig();
            this.loadReceptionTime();
            this.loadReceptionStatis();
            this.loadReceptionStatisByZone();
            this.loadReceptionNews();
            this.loadReceptionInfo();
            this.loadReceptionPhoto();
        },
        methods: {
            initswiper(){
                this.swiper = new Swiper(this.$refs.swiper, {
                    loop: true, // 无限滚动
                    slidesPerView: 7-this.visibleItems.length,  // 一次显示5个slides
                    spaceBetween: 30, // 间隔30px
                    centeredSlides: false, // 不居中排列
                    on: {
                        init: function() {
                            if(this.slides.length>3){
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
            },
            loadReceptionConfig() {
                this.getConfigKey("sys.cadre.photo.show").then(response => {
                    this.receptionInfo.profile = "1" === response.msg;
                });
            },
            loadReceptionTime() {
                getLeaderReceptionTime().then(result => {
                    if (result) {
                        this.receptionTimeList = result;
                    }
                });
            },
            realImgSrc(src) {
                if (!src) {
                    return;
                }
                let real_src = src.split(",")[0];
                if (isExternal(real_src)) {
                    return real_src;
                }
                return process.env.VUE_APP_BASE_API + real_src;
            },
            loadReceptionInfo() {
                getLeaderReceptionInfo().then(result => {
                    if (result && result.length > 0) {
                        for (let i = 0, len = result.length; i < len; i++) {
                            result[i].portrait = this.realImgSrc(result[i].portrait);
                        }
                        this.receptionInfo.list = result;
                    }
                });
            },
            loadReceptionStatis() {
                getLeaderReceptionStatis().then(result => {
                    if (result) {
                        this.receptionStatisData.todayNum = result.todayNum;
                        this.receptionStatisData.weekNum = result.weekNum;
                        this.receptionStatisData.monthNum = result.monthNum;
                        this.receptionStatisData.yearNum = result.yearNum;
                    }
                });
            },
            loadReceptionStatisByZone() {
                getLeaderReceptionStatisByZone().then(result => {
                    if (result) {
                        this.receptionStatisData.zoneChartData = result;
                        this.initZoneChart(this.receptionStatisData.zoneChartData);
                    }
                });
            },
            loadReceptionNews() {
                getLeaderReceptionNews().then(result => {
                    if (result) {
                        this.receptionNews = result;
                    }
                });
            },
            loadReceptionPhoto() {
                let form = {pageNum: 1, pageSize: 10, photoType: 1, show: true};
                getLeaderReceptionPhoto(form).then(result => {
                    if (result) {
                        this.receptionPhoto = result.rows;
                        this.$nextTick(()=>{
                            this.initswiper()
                        })
                    }
                });
            },
            initZoneChart(chartData) {
                var img = interviewchart;
                var total = 0;
                var data = [];
                var color = ['#46fdff', '#36ffcc', '#06ffa1', '#0080ff', '#1eabfb', '#dff3ff', '#74cbff'];
                var scale = 1;
                var rich = {
                    yellow: {
                        color: "#ebda55",
                        fontSize: 42 * scale,
                        align: 'left',
                        fontFamily: 'DSfont'
                    },
                    total: {
                        color: "#ffc72b",
                        fontSize: 46 * scale,
                        align: 'left'
                    },
                    white: {
                        color: "#fff",
                        align: 'left',
                        fontSize: 22 * scale,
                    },
                    blue: {
                        color: '#34d0ff',
                        fontSize: 22 * scale,
                        align: 'left'
                    },
                    hr: {
                        borderColor: '#0b5263',
                        width: '100%',
                        borderWidth: 1,
                        height: 0,
                    }
                };
                for (var i = 0; i < chartData.length; i++) {
                    total += chartData[i].num;
                    data.push({
                        value: chartData[i].num,
                        name: chartData[i].zoneName,
                        itemStyle: {
                            normal: {
                                borderWidth: 5,
                                // shadowBlur: 20,
                                // borderColor:color[i],
                                // shadowColor: color[i]
                            }
                        }
                    }, {
                        value: 2,
                        name: '',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                                color: 'rgba(0, 0, 0, 0)',
                                borderColor: 'rgba(0, 0, 0, 0)',
                                borderWidth: 0
                            }
                        }
                    });
                }
                var seriesOption = [{
                    name: '',
                    type: 'pie',
                    clockWise: false,
                    radius: [125, 150],
                    hoverAnimation: false,
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#ddd',
                        formatter: function (params) {
                            var percent = 0;
                            if (total > 0) {
                                percent = ((params.value / total) * 100).toFixed(1);
                            }
                            if (params.name !== '') {
                                return '{white|' + params.name + '}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
                            } else {
                                return '';
                            }
                        },
                        rich: rich
                    },
                    itemStyle: {
                        normal: {
                            labelLine: {
                                length: 50,
                                length2: 150,
                                show: true,
                                color: '#00ffff'
                            }
                        },
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 100
                    },
                    data: data
                }];
                var option = {
                    color: color,
                    title: {
                        text: total,
                        top: '40%',
                        textAlign: "center",
                        left: "50%",
                        textStyle: {
                            color: '#ebda55',
                            fontSize: 68,
                            fontWeight: '400',
                            fontFamily: 'DSfont'
                        },
                        subtext: '领导接访量',
                        subtextStyle: {
                            color: '#fff',
                            fontSize: 26,
                        }
                    },
                    graphic: {
                        elements: [{
                            type: "image",
                            z: 3,
                            style: {
                                image: img,
                                width: 250,
                                height: 250
                            },
                            left: 'center',
                            top: 'center',
                            position: [100, 100]
                        }]
                    },
                    tooltip: {
                        show: false
                    },
                    toolbox: {
                        show: false
                    },
                    series: seriesOption
                };
                echarts.init(this.$refs.chart).setOption(option);
            }
        },
        computed: {
            visibleItems() {
                return this.receptionPhoto.filter(item => item.regular);
            },
            visibleItemregu() {
                return this.receptionPhoto.filter(item => !item.regular);
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

  $ft-color: #34d0ff;
  @font-face {
    font-family: "DSfont";
    src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
  }

  $sz-font-family: "DSfont";


  .home {


    .cont {


      .sectionleft {


        .sec1-min {

          /* 滚动条的轨迹背景颜色 */
          ul::-webkit-scrollbar-track {
            background-color: #122a4e;
          }

          /* 滚动条的滑块颜色 */
          ul::-webkit-scrollbar-thumb {
            background-color: #1379ca;
          }
          ul {
            list-style: none;
            margin-top: 30px;
            font-size: 26px;
            padding: 0;
            height: 535px;
            overflow: auto;

            li {
                padding: 0 40px 0 15px;
                color: #34d0ff;
                height: 50px;
                background-color: rgba(25, 54, 98, 0.38);
                margin-top: 21px;
                line-height: 50px;
                border-left: 10px solid;

              p {
                display: inline-block;
                float: right;

                span {
                  color: #ebda55;
                  margin-left: 20px;
                }
              }
            }

            li:nth-child(1) {
              border-color: #b45362
            }

            li:nth-child(2) {
              border-color: #ebda55
            }

            li:nth-child(3) {
              border-color: #1ad084
            }

            li:nth-child(4) {
              border-color: #1ab9f4
            }

            li:nth-child(5) {
              border-color: #225fdf
            }

            li:nth-child(6) {
              border-color: #2a3367
            }

            li:nth-child(7) {
              border-color: #845e3c
            }
          }
        }
      }

      .section {
          width: 1500px;
          margin: 155px 100px 0 100px;
        height: 400px;
        display: inline-block;
        vertical-align: top;

        .section-1 {
          display: inline-block;
          width: 350px;
          margin-top: 10px;

          .section-1list {
            height: 150px;
            margin-bottom: 20px;
            background: url("../../../assets/images/szbackgd.png");
            background-size: 100% 100%;

            p {
              font-family: $sz-font-family;
              height: 100px;
              line-height: 100px;
              text-align: center;
            }

            p:last-child {
              color: $ft-color;
              height: 50px;
              line-height: 50px;
              background-image: linear-gradient(to right, #042a4b, #054d73);
            }
          }

          .section-1list:nth-child(1) {
            p {
              color: #ecd956
            }
          }

          .section-1list:nth-child(2) {
            p {
              color: #1ad385
            }
          }

          .section-1list:nth-child(3) {
            p {
              color: #22b6e4
            }
          }
        }

        .section-2 {
          width: 1150px;
          height: 535px;
          display: inline-block;
          vertical-align: bottom;
        }
      }

      .sectionrt {
          width: 968px;
        height: 535px;
        display: inline-block;
        vertical-align: top;
        margin-top: 155px;
        overflow: hidden;

        ul {
          margin-top: 20px;
          list-style: none;
          height: 55px;
          line-height: 55px;
          padding: 0;

          li {
            font-size: 24px;
            color: $ft-color;
            border-bottom: 1px dotted rgba(34, 182, 228, 0.102);

            span:first-child {
              padding: 2px 10px;
              margin-right: 5px;
              color: white;
              border-radius: 2px;
            }

            span:last-child {
              float: right;
            }

            .backcolor1 {
              background-color: #134192;
            }

            .backcolor2 {
              background-color: #0f7c67;
            }
          }
        }
      }

      .contlist1 {
        overflow: hidden;

        ul {
          list-style: none;
          height: 440px;
          padding: 0;
          overflow: hidden;
          display: grid;
          grid-template-columns: repeat(7, 580px);
          grid-gap: 30px;
          li {
            //width: 590px;
            height: 100%;
            min-width: 200px;
            display: flex;
            img {
              width: 330px;
              height: 100%;

            }

            div {
              display: inline-block;
              width: 100%;
              height: 100%;
              vertical-align: top;
              color: $ft-color;
              font-size: 18px;
              text-align: right;
              padding: 10px 15px;
              background-color: rgba(25, 54, 98, 0.38);

              h4 {
                margin: 0;
              }

              p:first-child {
                margin-top: 5px;
              }

              p:last-child {
                color: #a4a8ad;
                margin-top: 30px;
                overflow: hidden;
                display: -webkit-box;
                text-overflow: ellipsis;
                line-height: 30px;
                max-height: 280px;
              }
            }
          }
        }
      }

      .contlist2 {
        overflow: hidden;
          .simglist {
              height: 295px;

              .swipersl {
                  display: inline-block;
                  overflow: hidden;
                  vertical-align: top;
              }

              .swiper-container {
                  width: 100%;
                  height: 295px;
                  display: inline-block;
              }

              img {
                  width: 385px;
                  height: 100%;
                  margin-right: 30px;
              }
          }
      }
    }
  }
</style>
