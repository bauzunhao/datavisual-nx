<template>
  <div class="home">
    <datavhead></datavhead>
    <div class="cont videocomm">
      <div class="sectionleft">
        <div class="sec1-nav">
          <router-link to="/"><img src="../../../assets/images/general-home.png" alt=""></router-link>
          <ul>
            <li @click="openDialong()"><span>导航</span></li>
            <li><router-link to="/datav/emergency"><span>风险播报</span></router-link></li>
            <li><router-link target="_blank" :to="{path: '/datav/linkage', query: {eventId: this.form.eventId}}"><span>联动指挥</span></router-link></li>
            <li><router-link to="/datav/publicityv"><span>宣传教育</span></router-link></li>
          </ul>
        </div>
        <div class="sec1-min">
          <div class="min1left ">
            <div class="lefthead">
              <p>信访件编号：{{this.eventDetail.letterCode}} <span v-if="false">状态：<i class="colorred">已超期</i></span></p>
              <p>信访人：<span class="coloryel">{{this.eventDetail.letterDetail.name}}</span></p>
              <p>证件号码：{{this.eventDetail.letterDetail.certificateNumber}}</p>
            </div>
            <div class="sect2">
              <h3>信访人基本详细</h3>
              <div class="sect2min">
                  <img v-if="!this.eventDetail.letterDetail.jointly" src="../../../assets/images/grts.png" alt="">
                  <img v-if="this.eventDetail.letterDetail.jointly" src="../../../assets/images/jtf.png" alt="">
                <div class="sect2minlist">
                  <p class="coloryel">姓名：{{this.eventDetail.letterDetail.name}}<span v-if="this.eventDetail.letterDetail.sex">性别：{{this.eventDetail.letterDetail.sex}}</span></p>
                  <p v-if="this.eventDetail.letterDetail.age">年龄：{{this.eventDetail.letterDetail.age}}岁</p>
                  <p v-if="this.eventDetail.letterDetail.nation">民族：{{this.eventDetail.letterDetail.nation}}</p>
                  <p>电话：{{this.eventDetail.letterDetail.mobile}}</p>
                  <p>住址：{{this.eventDetail.letterDetail.address}}</p>
                </div>
              </div>
            </div>
            <div class="sect3">
              <div class="leftmin3">
                <p><span>信访次数</span><span>{{this.eventDetail.letterDetail.detailStatis.totalCount}}</span>次，走访{{this.eventDetail.letterDetail.detailStatis.visitCount}}件，来信{{this.eventDetail.letterDetail.detailStatis.letterCount}}件，网投{{this.eventDetail.letterDetail.detailStatis.onlineCount}}件</p>
                <p>
                  <span>办理状态</span>
                  待办理<span>{{this.eventDetail.letterDetail.detailStatis.todoCount}}</span>件,
                  已办理<span>{{this.eventDetail.letterDetail.detailStatis.completedCount}}</span>件
                </p>
                <p>
                  <span>登记级别</span>
                  国<span>{{this.eventDetail.letterDetail.detailStatis.guojiaCount}}</span>件，
                  区<span>{{this.eventDetail.letterDetail.detailStatis.qujiCount}}</span>件，
                  市<span>{{this.eventDetail.letterDetail.detailStatis.shijiCount}}</span>件，
                  县<span>{{this.eventDetail.letterDetail.detailStatis.xianjiCount}}</span>件
                </p>
              </div>
<!--              <div class="sect3bot">-->
<!--&lt;!&ndash;                <p>详细情况></p>&ndash;&gt;-->
<!--              </div>-->
            </div>
          </div>
          <div class="min1rt ">
            <div class="rthead ">
              <p><span class="cobor1">{{this.eventDetail.zoneName}}</span><span class="cobor2">{{this.eventDetail.letterDetail.belongToSystem}}</span><span class="cobor3">{{this.eventDetail.letterDetail.complaintReason}}</span></p>
              <p><span class="cobor2">{{this.eventDetail.letterDetail.contentTypeName}}</span><span class="cobor3">{{this.eventDetail.letterDetail.purposeTypeName}}</span><span class="cobor1">{{1 === this.eventDetail.letterDetail.handleType ? "信访" : "行政"}}</span></p>
            </div>
            <div class="sect1">
              <h3>信访概况 <span>（涉及人数：{{this.eventDetail.letterDetail.involveNumber || 0}}人，
              {{this.eventDetail.letterDetail.repeat ? "重件": "初件"}}{{this.eventDetail.letterDetail.pendingCase ? "，积案" : ""}}
              {{this.eventDetail.letterDetail.sfssbz ? "，涉法涉诉" : ""}}）</span></h3>
              <div class="sect1text"><span>{{this.eventDetail.letterDetail.complaintContent}}</span></div>
              <div class="secttext">
                <div class="sect1text"><span>{{this.eventDetail.letterDetail.remark}}</span></div>
              </div>
            </div>

          </div>
        </div>
        <div class="sectionmin2">
          <h3>关联单位详情</h3>
          <el-descriptions contentClassName="descrcon" labelClassName="desrlabel" :column=4>
            <template v-for="rec in this.relatedUnit">
              <el-descriptions-item label="单位名称">{{rec.unitName}}</el-descriptions-item>
              <el-descriptions-item v-if="false" label="负责人">{{rec.unitLeader}}</el-descriptions-item>
              <el-descriptions-item label="电话">{{rec.unitContact}}</el-descriptions-item>
              <el-descriptions-item label="经办人">{{rec.handledName}}</el-descriptions-item>
              <el-descriptions-item label="电话">{{rec.handledContact}}</el-descriptions-item>
            </template>
          </el-descriptions>
        </div>
      </div>
      <div class="section">
        <div class="section1">
          <h3>风险流程图</h3>
          <div class="sectioncont1 sectioncont ">
              <el-image
                  v-if="this.eventDetail.processFile"
                  style="max-width: 100%;max-height: 100%;"
                  :src="this.eventDetail.processFile"
                  :preview-src-list="[this.eventDetail.processFile]">
              </el-image>
          </div>
            <h3>风险资源图</h3>
            <div class="sectioncont1 sectioncont">
                <el-image
                    v-if="this.eventDetail.resourceFile"
                    style="max-width: 100%;max-height: 100%;"
                    :src="this.eventDetail.resourceFile"
                    :preview-src-list="[this.eventDetail.resourceFile]">
                </el-image>
            </div>
        </div>
        <div class="section1">
          <h3>信访视频</h3>
          <div class="sectioncont">

          </div>
        </div>
      </div>
    </div>
    <DialogNav ref="DialogNav"></DialogNav>
  </div>
</template>

<script>
    import datavhead from '@/components/DatavHead/index';
    import DialogNav from '@/components/DialogNav/index';
    import {
        getLinkageEventDetail
    } from '@/api/datav/linkage/index';
    export default {
        name: "DataV-Emergency-Linkage-Video",
        components: {'datavhead': datavhead, 'DialogNav': DialogNav},
        data() {
            return {
                eventLevelList: ['全部', '一级', '二级', '三级', '四级', '五级'],
                resultStatusList: ['', '转领导包案', '推进化解', '已经稳控'],
                form: {
                    eventId: null
                },
                linkageVideoConfig: {
                    autoOpen: false,
                    url: null
                },
                eventDetail: {
                    letterDetail: { // 信访详情
                        detailStatis: {} // 详情统计
                    }
                }, // 事件详情
                relatedUnit: [] // 关联单位
            }
        },
        mounted() {
            let eventId = this.$route.query.eventId;
            this.form.eventId = eventId;
            this.loadLinkageVideoDetail();
            this.loadLinkageVideoConfig();
        },
        methods: {
            openDialong() {
                this.$refs.DialogNav.handldOpen();
            },
            loadLinkageVideoDetail() {
                getLinkageEventDetail(this.form).then(result => {
                    if (result) {
                        this.eventDetail = result.eventDetail;
                        this.relatedUnit = result.relatedUnit;
                    } else {
                        this.$modal.msgError("系统查找不到对应数据！");
                    }
                });
            },
            loadLinkageVideoConfig() {
                this.getConfigKey("sys.command.video").then(response => {
                    let result = response.msg;
                    if (result) {
                        let arr = result.split("||");
                        this.linkageVideoConfig.autoOpen = Boolean(arr[0]);
                        this.linkageVideoConfig.url = arr[1];
                    }
                });
            },
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

  .cobor1 {
    color: #34d0ff;
    border-color: #34d0ff;
  }

  .cobor2 {
    color: #1ad485;
    border-color: #1ad485;
  }

  .cobor3 {
    color: #fb686f;
    border-color: #fb686f;
  }
  $ft-color: #34d0ff;

  $ft-yel: #ebda55;
  @font-face {
    font-family: "DSfont";
    src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
  }

  $ye-color: #ebda55;
  $sz-font-family: "DSfont";

  .home {
    .cont {
      .sectionleft {

        .sec1-min {
          margin-top: 20px;

          .min1left {
            width: 100%;
            display: inline-block;

            .lefthead {
              color: $ft-color;
              font-size: 28px;
              line-height: 40px;

              i {
                font-style: inherit;
              }

              p:first-child span {
                float: right;
              }
            }

            .sect2 {
              margin-top: 10px;

              .sect2min {
                background-color: rgba(25, 54, 98, 0.3);
                padding: 25px;
                padding-bottom: 0;
                  height: 215px;
                  overflow: hidden;
                img {
                  height: 160px;
                  margin-right: 25px;
                  width: 121px;
                }

                .sect2minlist {
                  display: inline-block;
                  font-size: 26px;
                  vertical-align: top;
                  color: $ft-color;
                  width: 400px;

                  p {
                    line-height: 40px;
                    height: 40px;
                    //overflow: hidden;
                    //white-space: nowrap;
                    //text-overflow: ellipsis;
                    span {
                      color: $ft-color;
                      float: right;
                    }
                  }

                }
              }

            }

            .sect3 {
              margin-top: 15px;

              .leftmin3 {
                font-size: 26px;
                margin-top: 30px;
                color: $ft-color;
                background-color: rgba(25, 54, 98, 0.3);
                padding: 30px 25px;

                p {
                  margin-bottom: 15px;

                  span {
                    color: $ft-yel;
                    vertical-align: middle;
                  }

                  span:first-child {
                    background-image: linear-gradient(to right, rgb(2, 49, 86), rgb(6, 85, 130));
                    padding: 6px 15px;
                    border-radius: 5px;
                    margin-right: 15px;
                    font-size: 26px;
                    color: $ft-color;
                    vertical-align: top;
                  }

                }

                p:last-child {
                  margin: 0;
                }
              }

              .sect3bot {
                height: 45px;
                line-height: 45px;
                text-align: right;
                padding: 0 25px;
                background-image: linear-gradient(to right, #042a4b, #054d73);
                color: $ft-color;
                cursor: pointer;
                font-size: 24px;
              }
            }
          }

          .min1rt {
            width: 100%;
            margin-left: 15px;
            display: inline-block;
            vertical-align: top;

            .rthead {
              height: 105px;
              overflow: hidden;
              padding-top: 10px;

              p {
                margin-bottom: 15px;
              }

              span {
                border: 2px solid;
                border-radius: 4px;
                padding: 3px 20px;
                margin: 20px 15px;
                font-size: 26px;
              }

            }

            .sect1 {
              margin-top: 10px;

              h3 span {
                color: $ft-color;
                font-size: 26px;
                display: inline-block;
                width: 520px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }

              .sect1text {
                height: 215px;
                overflow: auto;
                padding: 25px;
                color: $ft-color;
                line-height: 30px;
                  font-size: 26px;
                background-color: rgba(25, 54, 98, 0.3);
              }

              .sect1text::-webkit-scrollbar-track {
                background-color: #122a4e;
              }

              .sect1text::-webkit-scrollbar-thumb {
                background-color: #1379ca;
              }

              .secttext {
                .sect3bot {
                  height: 45px;
                  line-height: 45px;
                  //text-align: right;
                  padding: 0 25px;
                  background-image: linear-gradient(to right, #042a4b, #054d73);
                  color: $ft-color;
                  cursor: pointer;
                  font-size: 24px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }

                .sect1text {
                  height: 205px;
                }

                margin-top: 30px;
              }
            }
          }
        }
      }

      .section {
        width: 2572px;

        display: inline-block;
        vertical-align: top;
        margin-left: 60px;
        margin-top: 155px;

        .section1 {
          width: 1226px;
          display: inline-block;
          vertical-align: top;

          .sectioncont {
            height: 1550px;
            width: 100%;
            background-color: rgba(25, 54, 98, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
          }
            .sectioncont1{
                height: 720px;
                margin-bottom: 20px;
            }
        }

        .section1:first-child {
          margin-right: 60px;
        }
      }
    }
  }
</style>
<style lang="scss">
  .videocomm {
    .sectionmin2 {
      margin-top: 20px;

      .el-descriptions__body {
        background-color: rgba(25, 54, 98, 0.3);
        padding: 30px;
        height: 210px;
        overflow: auto;

        .descrcon {
          font-size: 26px;
          color: white;
          max-width: 180px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: inline-block;
        }

        .desrlabel {
          font-size: 24px;
          color: #20c2f3;
        }
      }

      .el-descriptions__body::-webkit-scrollbar-track {
        background-color: #122a4e;
      }

      .el-descriptions__body::-webkit-scrollbar-thumb {
        background-color: #1379ca;
      }
    }

  }
</style>
