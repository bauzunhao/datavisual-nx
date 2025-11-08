<template>
  <div class="home">
    <datavhead></datavhead>
    <div class="cont">
      <div class="sectionleft">
        <div class="sec1-nav">
          <router-link to="/"><img src="../../../assets/images/general-home.png" alt=""></router-link>
          <ul>
            <li @click="openDialong()"><span>导航</span></li>
            <li><router-link to="/datav/firstpiece"><span>初次信访</span></router-link></li>
            <li><router-link to="/datav/repetition"><span>重复信访</span></router-link></li>
            <li><router-link to="/datav/threelist"><span>三项清单</span></router-link></li>
          </ul>
        </div>
        <div class="sec1-min mabt70">
          <h3>重复信访结构</h3>
          <div class="min1">
            <p>赴国家局 <span>重复信访</span></p>
            <p>{{summaryData.gjNum}}</p>
            <p>占比：{{summaryData.gjRatio}}%<span>同比：{{summaryData.gjYOY}}%</span></p>
            <p><span>来信 {{summaryData.gjlxNum}}</span><span>来访 {{summaryData.gjlfNum}}</span><span>网投 {{summaryData.gjwtNum}}</span>
            </p>
          </div>
          <div class="min1">
            <p>赴自治区 <span>重复信访</span></p>
            <p>{{summaryData.qjNum}}</p>
            <p>占比：{{summaryData.qjRatio}}%<span>同比：{{summaryData.qjYOY}}%</span></p>
            <p><span>来信 {{summaryData.qjlxNum}}</span><span>来访 {{summaryData.qjlfNum}}</span><span>网投 {{summaryData.qjwtNum}}</span>
            </p>
          </div>
          <div class="min1">
            <p>赴拉萨市 <span>重复信访</span></p>
            <p>{{summaryData.sjNum}}</p>
            <p>占比：{{summaryData.sjRatio}}%<span>同比：{{summaryData.sjYOY}}%</span></p>
            <p><span>来信 {{summaryData.sjlxNum}}</span><span>来访 {{summaryData.sjlfNum}}</span><span>网投 {{summaryData.sjwtNum}}</span>
            </p>
          </div>
          <div class="min1">
            <p>赴区县 <span>重复信访</span></p>
            <p>{{summaryData.xjNum}}</p>
            <p>占比：{{summaryData.xjRatio}}%<span>同比：{{summaryData.xjYOY}}%</span></p>
            <p><span>来信 {{summaryData.xjlxNum}}</span><span>来访 {{summaryData.xjlfNum}}</span><span>网投 {{summaryData.xjwtNum}}</span>
            </p>
          </div>
        </div>
        <div class="sec2-min">
            <div class="secrt-0 mabt70">
                <h3>初件办结后重复信访区域 <span style="float: right;cursor: pointer;line-height: 33px;" @click="opencbjdl()">全部>></span></h3>
                <div class="secrt-0chart" ref="srt2chart"></div>
            </div>
          <h3>重复信访主要问题</h3>
          <div class="secrt-1chart" ref="ctdtchart"></div>
          <div class="secrt-1li">
            <ul>
              <li v-for="rec in contentTypeData">
                <p><span>{{rec.name}}</span><span>{{rec.value}}</span><span v-if="false">{{rec.ratio}}</span></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-1" ref="section1chart">
        </div>
        <h3>重复信访趋势</h3>
        <div class="section-2 mabt70" ref="section2chart"></div>
        <h3>重复信访VS初次信访</h3>
        <div class="section-2" ref="section3chart"></div>
      </div>
      <div class="sectionrt">
        <div class="secrt-nav">
          <ul>
            <li @click="queryTimeMark(1)"><span :style="{ 'color': queryParams.params.timeMark===1? '#fff':''  }">今日</span></li>
            <li @click="queryTimeMark(4)"><span :style="{ 'color': queryParams.params.timeMark===4? '#fff':''  }">昨天</span></li>
            <li @click="queryTimeMark(2)"><span :style="{ 'color': queryParams.params.timeMark===2? '#fff':''  }">本月</span></li>
            <li @click="queryTimeMark(5)"><span :style="{ 'color': queryParams.params.timeMark===5? '#fff':''  }">上月</span></li>
            <li @click="queryTimeMark(3)"><span :style="{ 'color': queryParams.params.timeMark===3? '#fff':''  }">本年</span></li>
          </ul>
        </div>

          <h3>重复信访TOP</h3>
          <div class="secrt-0" style="height: 740px;">
              <div class="seclt-0chart" ref="seclt0chart" style="height: 700px;"></div>
              <div class="seclt-0list" style="height: 700px;">
                  <ul>
                      <li v-for="rec in this.repeatPetitionTop">
                          <span>{{rec.contentTypeName}}</span><span>{{rec.zoneName}}</span>
                      </li>
                  </ul>
              </div>
          </div>


        <div class="secrt-0">
          <h3>市直部门重复件TOP</h3>
          <div class="secrt-1chart" ref="srt3chart"></div>
          <div class="secrt-1li">
            <ul>
              <li v-for="rec in this.municipalDirectData">
                <p><span>{{rec.name}}</span><span>{{rec.value}}</span><span v-if="false">{{rec.ratio}}</span></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <DialogNav ref="DialogNav"></DialogNav>

    <el-dialog
      :visible.sync="historyvis"
      width="1200px"
      custom-class="historydia"
      title="历次信访记录"
      :before-close="historyClose">
      <div class="titles">
        <p>信访人姓名：<span v-text="letterName">王</span></p>
      </div>
      <div class="content">
        <div style="display: inline-block;width: 750px;" v-if="historyInfo.length > 0">
          <div class="conleft" v-for="info in historyInfo">
            <div class="lefthead">
              <img src="../../../assets/images/history1.png" alt="">
              <span v-text="info.year"></span>
            </div>
            <div class="leftmin1">
                <p><span>信访次数</span><span v-text="info.count"></span>次</p>
                <p>
                  <span>办理状态</span>
                  待办理 <span v-text="info.bl.noEnd"></span>件，
                  已办理 <span v-text="info.bl.end"></span>件
                </p>
                <p>
                  <span>登记级别</span>
                  国 <span v-text="info.level.country"></span>件，
                  区 <span v-text="info.level.privince"></span>件，
                  市 <span v-text="info.level.city"></span>件，
                  县 <span v-text="info.level.county">22</span>件
                </p>
            </div>
            <div class="leftlist" v-for="chil in info.children">
              <div class="leftlistst">
                <div><span></span><span></span><span></span></div>
              </div>
              <p>
                <span v-text="chil.yearMonth"></span>
                <i>|</i>信访次数<span v-text="chil.count">11</span>次；
                待办理<span v-text="chil.bl.noEnd">11</span>件；
                已办理<span v-text="chil.bl.end">11</span>件；</p>
            </div>
          </div>
        </div>
        <div style="display: inline-block;width: 750px;" v-if="historyInfo.length == 0">
          <div class="conleft" ><span style="font-size: 24px;" v-text="historyMsg"></span></div>
        </div>
        <div class="conright">
          <div class="rightmin">
            <h3>总信访次数</h3>
            <div class="min1">
              <img src="../../../assets/images/history2.png" alt="">
              <p><span v-text="historyTotal.total">2321</span>次</p>
            </div>
          </div>
          <div class="rightmin">
            <h3>重复信访</h3>
            <div class="min1">
              <img src="../../../assets/images/history3.png" alt="">
              <p><span v-text="historyTotal.repeatCount">2321</span>次</p>
            </div>
          </div>
          <div class="rightmin">
            <h3>渠道分布</h3>
            <div class="min2">
              <div class="min2list">
                <img src="../../../assets/images/history4.png" alt="">
                <p>走访<span v-text="historyTotal.visitCount">1</span>批</p>
              </div>
              <div class="min2list">
                <img src="../../../assets/images/history5.png" alt="">
                <p>来信<span v-text="historyTotal.letterCount">1</span>件</p>
              </div>
              <div class="min2list">
                <img src="../../../assets/images/history6.png" alt="">
                <p>网信<span v-text="historyTotal.internetCount">1</span>件</p>
              </div>
            </div>
          </div>
          <div class="rightmin">
            <h3>走访情况</h3>
            <div class="min2">
              <div class="min2list">
                <img src="../../../assets/images/history7.png" alt="">
                <p>进京访<span v-text="historyTotal.level">1</span>批</p>
              </div>
              <div class="min2list">
                <img src="../../../assets/images/history8.png" alt="">
                <p>赴区访<span v-text="historyTotal.level2">1</span>件</p>
              </div>
              <div class="min2list">
                <img src="../../../assets/images/history9.png" alt="">
                <p>市县访<span v-text="historyTotal.level34">1</span>件</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="connav"></div>
    </el-dialog>

      <el-dialog
          :visible.sync="cbjVisible"
          width="1200px"
          custom-class="detailtable"
          title="初件办结后重复信访区域"
          :before-close="morevisClose">
          <div   style="width: 100%;height: 400px;" ref="srt2chartdl">
          </div>
      </el-dialog>
      <el-dialog
          :visible.sync="zxjVisible"
          width="1600px"
          custom-class="detailtable"
          title="第三批专项件地市分布"
          :before-close="morevisClose">
          <div   style="width: 100%;height: 400px;" ref="srt1chartdl">
          </div>
      </el-dialog>
  </div>
</template>

<script>
    import datavhead from '@/components/DatavHead/index';
    import DialogNav from '@/components/DialogNav/index';
    import * as echarts from 'echarts';
    import interviewchart from '@/assets/images/interview-chart.png';
    import {
        getRepeatPetitionSummaryData,
        getRepeatPetitionByContentType,
        getRepeatPetitionByZone,
        getRepeatPetitionByMonth,
        getPetitionRepeatTypeByMonth,
        getSpecialItemBatchData,
        getRepeatPetitionPerson,
        getRepeatPetitionMunicipalDirect,
        getFirstEndAfterRepeatByZone,
        getSpecialThirdBatchByZone,
        getHistoryTotal,
        getHistoryInfo
    } from "@/api/datav/priorities/repetition";

    export default {
        name: "DataV-Source-Repeat-Petition",
        components: {'datavhead': datavhead, 'DialogNav': DialogNav},
        data() {
            return {
              srt2chartdata : null,
              srt1chartdata : null,
              historyvis : false,
              cbjVisible : false,
              zxjVisible : false,
              // 查询参数
                queryParams: {
                    params: {
                        timeMark: 3
                    }
                },
                summaryData: {
                    totalNum: 0,
                    gjNum: 0,
                    gjlfNum: 0,
                    gjlxNum: 0,
                    gjwtNum: 0,
                    gjRatio: 0,
                    gjYOY: null,
                    qjNum: 0,
                    qjlfNum: 0,
                    qjlxNum: 0,
                    qjwtNum: 0,
                    qjRatio: 0,
                    qjYOY: null,
                    sjNum: 0,
                    sjlfNum: 0,
                    sjlxNum: 0,
                    sjwtNum: 0,
                    sjRatio: 0,
                    sjYOY: null,
                    xjNum: 0,
                    xjlfNum: 0,
                    xjlxNum: 0,
                    xjwtNum: 0,
                    xjRatio: 0,
                    xjYOY: null
                },
                contentTypeData: [],
                repeatPetitionTop: [],
                municipalDirectData: [],
                //历次信访
                letterName: '',
                historyTotal: {
                },
                historyInfo:[],
                historyMsg: '',
            }
        },
        mounted() {
            this.loadAllRepeatPetitionData();
        },
        methods: {
            opencbjdl(){
              this.cbjVisible = true;
              this.$nextTick(()=>{
                  this.initsrt2chart(this.srt2chartdata,this.$refs.srt2chartdl,this.srt2chartdata.length);
              })
            },openzxjdl(){
              this.zxjVisible = true;
              this.$nextTick(()=>{
                  this.initsecrt1Chart(this.srt1chartdata,this.$refs.srt1chartdl,this.srt1chartdata.length);
              })
            },
            morevisClose(done){
                done()
            },
          openhistory(params){
            this.historyvis=true;
            let $this = this;
            this.$nextTick(()=>{
                $this.$modal.loading("");
                $this.letterName = params.data.name;
                let form = {name: params.data.name, certificateNumber: params.data.idcard}
                $this.handelHistoryTotal(form);
                $this.handelHistoryInfo(form);
            })
          },
          handelHistoryTotal(form){
              getHistoryTotal(form).then(response => {
                  let data = response.data;
                  let history = {
                      //总数，重件，复查，复核， 答复
                      total: 0, repeatCount: 0, recheckCount: 0, reviewCount: 0, opinionCount: 0,
                      //来信，来访，网投
                      letterCount: 0, visitCount: 0, internetCount: 0,
                      //进京访，赴区访，市县访
                      level: 0, level2:0, level34: 0
                  }
                  this.historyTotal = {};
                  if(data) {
                      data.forEach(obj => {
                          history.total ++;
                          if(obj.isRepeat) history.repeatCount ++;
                          if(obj.letterType == 2) {
                              history.visitCount ++;
                              if(obj.level === 1){
                                  history.level ++;
                              }else if (obj.level === 2 || obj.level === 12) {
                                  history.level2 ++;
                              }else if (obj.level === 3 || obj.level === 4 || obj.level === 13 || obj.level === 14 ||
                                  obj.level === 5 || obj.level === 15) {
                                  history.level34 ++;
                              }
                          }
                          if(obj.letterType == 1) history.letterCount ++;
                          if(obj.letterType == 5 || obj.letterType == 6 || obj.letterType == 7) history.internetCount ++;
                      });
                  }
                  this.historyTotal = history;
              });
          },
          handelHistoryInfo(form){
              getHistoryInfo(form).then(response => {
                  let data = response.data;
                  let items = {};
                  this.historyInfo = [];
                  this.historyMsg = '';
                  if(data) {
                      data.forEach(obj => {
                          let info = items[obj.year];
                          if(!info){
                              info = {
                                  year : '',//xx年
                                  count: 0,//信访次数
                                  bl: {end: 0, noEnd: 0},//已办理，未办理
                                  level: {country: 0, privince:0, city: 0, county: 0},//国，区，市，县
                                  children:{}
                              };
                          }
                          let children = info.children[obj.yearMonth];
                          if(!children){
                              children = {
                                  yearMonth:'',//xx年xx月
                                  count: 0,//信访次数
                                  bl: {end: 0, noEnd: 0},//已办理，未办理
                              };
                          }

                          info.year = obj.year;
                          info.count ++;
                          //办理状态
                          if(obj.isEnd) info.bl.end ++;
                          else info.bl.noEnd ++;
                          //登记机构级别
                          if(obj.level === 1) info.level.country ++;
                          else if(obj.level === 2 || obj.level === 12) info.level.privince ++;
                          else if(obj.level === 3 || obj.level === 13) info.level.city ++;
                          else if(obj.level === 4 || obj.level === 14) info.level.county ++;
                          //处理月份
                          children.yearMonth = obj.yearMonth;
                          children.count ++;
                          //办理状态
                          if(obj.isEnd) children.bl.end ++;
                          else children.bl.noEnd ++;

                          info.children[obj.yearMonth] = children;
                          items[obj.year] = info;
                      });
                  }else{
                      this.historyMsg = '暂无历次信访记录';
                  }
                  for(let key in items){
                      this.historyInfo.push(items[key]);
                  }
                  this.$modal.closeLoading();
              });
          },
          historyClose(done){
            done()
          },
            openDialong() {
                this.$refs.DialogNav.handldOpen();
            },
            queryTimeMark(mark) {
                this.queryParams.params.timeMark = mark;
                this.loadAllRepeatPetitionData();
            },
            loadAllRepeatPetitionData() {
                this.$modal.loading("");
                this.loadRepeatSummaryData();
                this.loadRepeatByContentType();
                this.loadRepeatPetitionByZone();
                this.loadRepeatPetitionByMonth();
                this.loadRepeatTypeByMonth();
                this.loadSpecialItemBatchData();
                this.loadRepeatPetitionPerson();
                this.loadRepeatMunicipalDirect();
                this.loadFirstEndAfterRepeatByZone();
                this.loadSpecialThirdBatchByZone();
            },
            loadRepeatSummaryData() {
                getRepeatPetitionSummaryData(this.queryParams).then(result => {
                    if (result) {
                        this.summaryData = result;
                    }
                });
            },
            loadRepeatByContentType() {
                getRepeatPetitionByContentType(this.queryParams).then(result => {
                    this.contentTypeData = [];
                    if (result) {
                        for (let i = 0, len = result.length; i < len; i++) {
                            let rec = result[i];
                            this.contentTypeData.push({name: rec.name, value: rec.num, ratio: 0});
                        }
                    }
                    this.initctdtchart();
                    this.$modal.closeLoading();
                });
            },
            loadRepeatPetitionByZone() {
                getRepeatPetitionByZone(this.queryParams).then(result => {
                    let chartData = [];
                    if (result) {
                        chartData = this.ignoreCityData(result, "zoneName");
                    }
                    this.initZoneChart(chartData);
                });
            },
            loadRepeatPetitionByMonth() {
                getRepeatPetitionByMonth(this.queryParams).then(result => {
                    let chartData = [];
                    if (result) {
                        chartData = result;
                    }
                    this.initsection2Chart(chartData);
                });
            },
            loadRepeatTypeByMonth() {
                getPetitionRepeatTypeByMonth(this.queryParams).then(result => {
                    let chartData = [];
                    if (result) {
                        chartData = result;
                    }
                    this.initsection3Chart(chartData);
                });
            },
            loadSpecialItemBatchData() {
                getSpecialItemBatchData(this.queryParams).then(result => {
                    let chartData = {};
                    if (result) {
                        chartData = result;
                    }
                    this.initsecrt0Chart(chartData);
                });
            },
            loadRepeatPetitionPerson() {
                getRepeatPetitionPerson(this.queryParams).then(result => {
                    this.repeatPetitionTop = [];
                    if (result) {
                        this.repeatPetitionTop = result;
                    }
                    this.initseclt0chart();
                });
            },
            loadRepeatMunicipalDirect() {
                getRepeatPetitionMunicipalDirect(this.queryParams).then(result => {
                    this.municipalDirectData = [];
                    if (result) {
                        for (let i = 0, len = result.length; i < len; i++) {
                            let rec = result[i];
                            this.municipalDirectData.push({name: rec.name, value: rec.num, ratio: 0});
                        }
                    }
                    this.initsrt3chart();
                });
            },
            loadFirstEndAfterRepeatByZone() {
                getFirstEndAfterRepeatByZone(this.queryParams).then(result => {
                    if (result) {
                        this.srt2chartdata = this.ignoreCityData(result, "zoneName");
                    }
                    this.initsrt2chart(this.srt2chartdata,this.$refs.srt2chart,5);
                });
            },
            loadSpecialThirdBatchByZone() {
                getSpecialThirdBatchByZone(this.queryParams).then(result => {
                    if (result) {
                        this.srt1chartdata = this.ignoreCityData(result, "zoneName");
                    }
                    this.initsecrt1Chart(this.srt1chartdata,this.$refs.srt1chart,5);
                });
            },
            initctdtchart() {
                let data = this.contentTypeData;
                let option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        show: false
                    },
                    grid: {
                        top: '0',
                        left: '0',
                        containLabel: true
                    },
                    series: [
                        {
                            name: '重复信访主要问题',
                            type: 'pie',
                            radius: ['50%', '100%'],
                            color: ['#ec5d51', '#59abe1', '#f4cf42', '#3dc6a8', '#FFCC67'],
                            width: '320',
                            height: '320',
                            label: {
                                normal: {
                                    position: 'inner',
                                    formatter: '{d}%',
                                    textStyle: {
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: 22
                                    }
                                }
                            },
                            data: data
                        }
                    ]
                };
                echarts.init(this.$refs.ctdtchart).setOption(option);
            },
            initZoneChart(chartData) {
                var img = interviewchart;
                var total = 0;
                var data = [];
                var scale = 1;
                var rich = {
                    yellow: {
                        color: "#ebda55",
                        fontSize: 52 * scale,
                        align: 'left',
                        fontFamily: 'DSfont'
                    },
                    total: {
                        color: "#ffc72b",
                        fontSize: 40 * scale,
                        align: 'left'
                    },
                    white: {
                        color: "#fff",
                        align: 'left',
                        fontSize: 24 * scale,
                    },
                    blue: {
                        color: '#1aa1c5',
                        fontSize: 20 * scale,
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
                    radius: [180, 220],
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
                                length: 30,
                                length2: 200,
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
                    color: ['#46fdff', '#36ffcc', '#06ffa1', '#0080ff', '#1eabfb', '#dff3ff', '#74cbff'],
                    title: {
                        text: total,
                        top: '35%',
                        textAlign: "center",
                        left: "50%",
                        textStyle: {
                            color: '#ebda55',
                            fontSize: 88,
                            fontWeight: '500',
                            fontFamily: 'DSfont'
                        },
                        subtext: '重复信访总数',
                        subtextStyle: {
                            textAlign: "center",
                            color: '#34d0ff',
                            fontSize: 32
                        }
                    },
                    graphic: {
                        elements: [{
                            type: "image",
                            z: 3,
                            style: {
                                image: img,
                                width: 340,
                                height: 340
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
                echarts.init(this.$refs.section1chart).setOption(option);
            },
            initsection2Chart(chartData) {
                let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (let i = 0, len = chartData.length; i < len; i++) {
                    let rec = chartData[i];
                    let index = parseInt(rec.time) - 1;
                    data[index] = rec.num;
                }
                let option = {
                    xAxis: {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisLine: {
                            lineStyle: {
                                color: '#228ea8' // 设置Y轴轴线颜色为蓝色
                            },
                        },
                        axisLabel: {
                            color : '#34d0ff',
                            fontSize : 24
                        },
                    },
                    grid: {
                        top: 10,
                        left: 0,
                        right: 10,
                        bottom: 30,
                    },
                    yAxis: {
                        // type: 'value',
                        show :false
                        // splitLine: {
                        //     show: true,
                        //     lineStyle: {
                        //         color: 'rgba( 33, 142, 168, 0.302 )'
                        //     }
                        // },

                    },
                    series: [
                        {
                            data: data,
                            type: 'bar',
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {offset: 0, color: 'rgb(0,212,193)'},
                                    {offset: 1, color: 'rgba(98,117,209,0)'}
                                ])
                            },
                            label: {
                                show: true,
                                position: 'insideTop',
                                color: '#fff',
                                fontSize: 22,
                                formatter: function (params) {
                                    // 如果数据为零，则不显示标签，或者可以设置为一个空字符串
                                    return params.value === 0 ? '' : params.value;
                                },
                            }
                        }
                    ]
                };
                echarts.init(this.$refs.section2chart).setOption(option);
            },
            initsection3Chart(chartData) {
                let firstNumData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                let repeatNumData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (let i = 0, len = chartData.length; i < len; i++) {
                    let rec = chartData[i];
                    let index = parseInt(rec.time) - 1;
                    firstNumData[index] = rec.firstNum;
                    repeatNumData[index] = rec.repeatNum;
                }
                let option = {
                    legend: {
                        icon: 'circle',
                        top: 0,
                        right: 0,
                        itemWidth: 6,
                        itemGap: 20,
                        textStyle: {
                            color: '#34d0ff',
                            fontSize : 24
                        }
                    },
                    grid: {
                        top: 10,
                        left: 0,
                        right: 10,
                        bottom: 50,
                    },
                    xAxis: {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisLabel: {
                            color : '#34d0ff',
                            fontSize : 24
                        },
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba( 33, 142, 168, 0.302 )'
                            }
                        },

                    },
                    series: [
                        {
                            name: '重件',
                            data: repeatNumData,
                            type: 'line',
                            symbolSize: 1,
                            symbol: 'circle',
                            smooth: true,
                            yAxisIndex: 0,
                            showSymbol: false,
                            color: '#ebda55'
                        },
                        {
                            name: '初件',
                            data: firstNumData,
                            type: 'line',
                            symbolSize: 1,
                            symbol: 'circle',
                            smooth: true,
                            yAxisIndex: 0,
                            showSymbol: false,
                            color: '#1acc83'
                        }
                    ]
                };
                echarts.init(this.$refs.section3chart).setOption(option);
            },
            initsecrt0Chart(chartData) {
                var batchData = [];
                let seriesdata = [];
                if (chartData) {
                    batchData.push("第一批");
                    batchData.push("第二批");
                    batchData.push("第三批");
                    seriesdata.push((chartData.firstBatchNum ? ((chartData.firstBatchEndNum / chartData.firstBatchNum) * 100).toFixed(2) : 0) + "%");
                    seriesdata.push((chartData.secondBatchNum ? ((chartData.secondBatchEndNum / chartData.secondBatchNum) * 100).toFixed(2) : 0) + "%");
                    seriesdata.push((chartData.thirdBatchNum ? ((chartData.thirdBatchEndNum / chartData.thirdBatchNum) * 100).toFixed(2) : 0) + "%");
                }
                let seriesformatter = '{value}';
                var salvProMax = [];//背景按最大值
                for (let i = 0; i < seriesdata.length; i++) {
                    salvProMax.push(100);
                }
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'none'
                        },
                        formatter: function (params) {
                            return params[0].name + ' : ' + params[0].value
                        }
                    },
                    grid: {
                        left: '0',
                        top: '0',
                        right: '0',
                        bottom: '0',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        show: false,
                        position: 'top',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#1aa1c5',
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    },
                    yAxis: [{
                        type: 'category',
                        axisTick: {
                            show: false,
                            alignWithLabel: false,
                            length: 5,

                        },
                        "splitLine": { //网格线
                            "show": false
                        },
                        inverse: 'true', //排序
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#1aa1c5',
                            }
                        },
                        axisLabel: {
                            color : '#34d0ff',
                            fontSize : 18
                        },
                        data: batchData
                    },
                        {
                            type: 'category',
                            inverse: true,
                            axisTick: 'none',
                            axisLine: 'none',
                            show: true,
                            axisLabel: {
                                formatter: seriesformatter,
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: '18'
                                },
                                color : '#34d0ff'
                            },
                            data: seriesdata
                        }

                    ],
                    series: [{
                        name: 'barChart',
                        barWidth: 20,
                        type: 'bar',
                        zlevel: 2,
                        itemStyle: {
                            normal: {
                                show: true,
                                // 设置每个圆柱的渐变色填充
                                color: function (params) {
                                    if (params.dataIndex === 0) {
                                        return {
                                            type: 'linear',
                                            colorStops: [{
                                                offset: 0,
                                                color: 'rgba(0,162,255,.5)'
                                            }, {
                                                offset: 1,
                                                color: 'rgb(0,162,255)'
                                            }],
                                        };
                                    }
                                    if (params.dataIndex === 1) {
                                        return {
                                            type: 'linear',
                                            colorStops: [{
                                                offset: 0,
                                                color: 'rgba(42,222,176,.5)'
                                            }, {
                                                offset: 1,
                                                color: 'rgba(42,222,176,1)'
                                            }],
                                        };
                                    }
                                    if (params.dataIndex === 2) {
                                        return {
                                            type: 'linear',
                                            colorStops: [{
                                                offset: 0,
                                                color: 'rgba(251,104,111,.5)'
                                            }, {
                                                offset: 1,
                                                color: 'rgba(251,104,111,1)'
                                            }],
                                        };
                                    }
                                },
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        emphasis: {
                            zlevel: 2,
                            itemStyle: {},
                        },
                        barGap: '0%',
                        barCategoryGap: '50%',
                        data: seriesdata.map(item => item.replace(/%$/, ''))
                    },
                        {
                            name: '背景',
                            type: 'bar',
                            barWidth: 20,
                            barGap: '-100%',
                            data: salvProMax,
                            zlevel: 1,
                            itemStyle: {
                                normal: {
                                    color: '#06375f',
                                }
                            },
                        },
                    ]
                };
                echarts.init(this.$refs.srt0chart).setOption(option);
            },
            initsecrt1Chart(chartData, chartElement, num) {
                let data1 = [];
                let data2 = [];
                let data3 = [];
                let xAxisData = [];
                for (let i = 0; i < Math.min(num, chartData.length); i++) {
                    let rec = chartData[i];
                    data1.push(rec.handledNum);
                    data2.push(rec.num);
                    data3.push(rec.totalNum);
                    xAxisData.push(rec.zoneName);
                }
                let option = {
                    legend: {
                        top: 0,
                        right: 0,
                        textStyle: {
                            color: '#34d0ff'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxisData,
                        axisLine: {
                            lineStyle: {
                                color: '#228ea8' //
                            },
                        },
                        axisLabel: {
                            color : '#34d0ff',
                            fontSize : 18,
                            rotate: 0, // 旋转标签
                            interval: 0 // 显示所有标签
                        },
                    },
                    grid: {
                        top: 20,
                        left: 40,
                        right: 10,
                        bottom: 30,
                    },
                    yAxis: {
                        type: 'value',
                        // show :false
                        axisLabel: {
                            formatter: '{value}',
                            color : '#34d0ff',
                            fontSize : 18
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#228ea8' //
                            },
                            nameTextStyle: '#20c2f0'
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba( 33, 142, 168, 0.302 )'
                            }
                        }
                    },
                    series: [
                        {
                            data: data1,
                            name: '已化解',
                            type: 'bar',
                            stack: 'Tik Tok',
                            barWidth: 30,
                            zlevel: 2,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {offset: 0, color: 'rgb(0,162,255)'},
                                {offset: 1, color: 'rgba(17,102,255,0)'}
                            ]),

                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    offset: [-10, 0],
                                    formatter: '{c}',
                                    textStyle: {
                                        align: 'center',
                                        baseline: 'middle',
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#fff',
                                        textShadowColor: '#000',
                                        textShadowBlur: '0',
                                        textShadowOffsetX: 1,
                                        textShadowOffsetY: 1,
                                    }
                                },
                            },
                        }, {
                            name: '未化解',
                            data: data2,
                            type: 'bar',
                            stack: 'Tik Tok',
                            barWidth: 30,
                            zlevel: 2,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(251,104,111)'
                            },
                                {
                                    offset: 1,
                                    color: 'rgba(251,104,111,0)'
                                }
                            ]),
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    offset: [-10, 0],
                                    formatter: '{c}',
                                    textStyle: {
                                        align: 'center',
                                        baseline: 'middle',
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#fff',
                                        textShadowColor: '#000',
                                        textShadowBlur: '0',
                                        textShadowOffsetX: 1,
                                        textShadowOffsetY: 1,
                                    }
                                },
                            },
                        }, {
                            type: 'bar',
                            barWidth: 30,
                            barGap: '-100%',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    offset: [0, -3],
                                    formatter: '{c}',
                                    textStyle: {
                                        align: 'center',
                                        baseline: 'middle',
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#34d0ff',
                                        textShadowColor: '#000',
                                        textShadowBlur: '0',
                                        textShadowOffsetX: 1,
                                        textShadowOffsetY: 1,
                                    }
                                },
                            },
                            data: data3,
                            zlevel: 1,
                            itemStyle: {
                                normal: {
                                    color: '#06375f',
                                }
                            },
                        },
                    ]
                };
                let chart = echarts.init(chartElement);
                chart.setOption(option);
            },
            initseclt0chart() {
                let yAxisData = [];
                let seriesData = [];
                for (let i = 0, len = this.repeatPetitionTop.length; i < len; i++) {
                    let rec = this.repeatPetitionTop[i];
                    yAxisData.unshift(rec.name);
                    seriesData.unshift({name:rec.name, value:rec.num, idcard:rec.idcard});
                }
                // 确保长度至少为18
                const desiredLength = 18;
                while (yAxisData.length < desiredLength) {
                    yAxisData.unshift(''); // 添加空字符串作为占位符
                }
                while (seriesData.length < desiredLength) {
                    seriesData.unshift({name:'', value:null}); // 添加空数据对象作为占位符
                }
                let option = {
                    legend: {
                        show: false
                    },
                    grid: {
                        left: '0',
                        top: '0',
                        right: '1%',
                        bottom: '1%',
                        containLabel: true
                    },
                    xAxis: {
                        show: false
                    },
                    yAxis: {
                        type: 'category',
                        data: yAxisData,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.3)'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            // margin: 10,
                            fontSize : 22,
                            color: function (value, index) {
                                if (index === 4) {
                                    return '#ebda55'
                                }
                                if (index === 3) {
                                    return '#1ad385'
                                }
                                return '#1aa1c5';
                            },
                        }
                    },
                    color: [
                        new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: 'rgb(0,162,255)'
                        },
                            {
                                offset: 1,
                                color: 'rgba(0,162,255,.3)'
                            }
                        ]),
                    ],
                    series: [
                        {
                            name: '重复信访',
                            type: 'bar',
                            barWidth: 20,
                            itemStyle: {
                                shadowColor: '#000',
                                shadowBlur: 10,
                                shadowOffsetY: 0,
                                shadowOffsetX: 0,
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    offset: [-10, 2],
                                    formatter: '{c}',
                                    textStyle: {
                                        align: 'center',
                                        baseline: 'middle',
                                        fontSize: 18,
                                        fontWeight: '400',
                                        color: '#fff',
                                        textShadowColor: '#000',
                                        textShadowBlur: '0',
                                        textShadowOffsetX: 1,
                                        textShadowOffsetY: 1,
                                        lineHeight: 20,
                                    }
                                },
                            },
                            data: seriesData
                        },
                    ]
                };

              let chart = echarts.init(this.$refs.seclt0chart);
              chart.setOption(option);
              chart.on('click', (params)=> {
                this.openhistory(params);
              });

            },
            initsrt2chart(chartData, chartElement, num) {
                let seriesdata = [];
                let yAxisData = [];
                for (let i = 0; i < Math.min(num, chartData.length); i++) {
                    let rec = chartData[i];
                    seriesdata.push(rec.num);
                    yAxisData.push(rec.zoneName);
                }
                let seriesformatter = '{value}';
                let barWidth = 5;
                var salvProMax = [];//背景按最大值
                for (let i = 0; i < seriesdata.length; i++) {
                    salvProMax.push(Math.max(...seriesdata) ? Math.max(...seriesdata) : 1)
                }
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'none'
                        },
                        formatter: function (params) {
                            return params[0].name + ' : ' + params[0].value
                        }
                    },
                    grid: {
                        left: '0',
                        top: '1%',
                        right: '2%',
                        bottom: '2%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        show: false,
                        position: 'top',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#1aa1c5',
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    },
                    yAxis: [{
                        type: 'category',
                        axisTick: {
                            show: false,
                            alignWithLabel: false,
                            length: 5,

                        },
                        "splitLine": { //网格线
                            "show": false
                        },
                        inverse: 'true', //排序
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#1aa1c5',

                            }
                        },
                        axisLabel: {
                            color : '#34d0ff',
                            fontSize: 22,
                        },
                        data: yAxisData
                    },
                        {
                            type: 'category',
                            inverse: true,
                            axisTick: 'none',
                            axisLine: 'none',
                            show: true,
                            axisLabel: {
                                formatter: seriesformatter,
                                textStyle: {
                                    fontSize: '22'
                                },
                                color : '#34d0ff'
                            },
                            data: seriesdata
                        }

                    ],
                    series: [{
                        name: 'barChart',
                        barWidth: barWidth,
                        type: 'bar',
                        zlevel: 2,
                        itemStyle: {
                            normal: {
                                show: true,
                                // 设置每个圆柱的渐变色填充
                                color: function (params) {
                                    return {
                                        type: 'linear',
                                        colorStops: [{
                                            offset: 0,
                                            color: '#09476d'
                                        }, {
                                            offset: 1,
                                            color: '#4bf3ff'
                                        }],
                                    };
                                },
                                barBorderRadius: 10,
                                borderWidth: 0,
                                borderColor: '#333',
                            }
                        },
                        emphasis: {
                            zlevel: 2,
                            itemStyle: {
                                color: function (params) {
                                    return {
                                        type: 'linear',
                                        colorStops: [{
                                            offset: 0,
                                            color: '#09476d'
                                        }, {
                                            offset: 1,
                                            color: '#4bf3ff'
                                        }],
                                    };
                                },
                            },
                        },
                        barGap: '0%',
                        barCategoryGap: '50%',
                        data: seriesdata
                    },
                        {
                            name: '背景',
                            type: 'bar',
                            barWidth: barWidth,
                            barGap: '-100%',
                            data: salvProMax,
                            zlevel: 1,
                            itemStyle: {
                                normal: {
                                    color: '#06375f',
                                    barBorderRadius: 30,
                                }
                            },
                        },
                    ]
                };
                let chart = echarts.init(chartElement);
                chart.setOption(option);
                // echarts.init(this.$refs.srt2chart).setOption(option);
            },
            initsrt3chart() {
                let data = this.municipalDirectData;
                let option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        show: false
                    },
                    grid: {

                        containLabel: true
                    },
                    series: [
                        {
                            name: '市直部门重复件TOP',
                            type: 'pie',
                            radius: ['60%', '90%'],
                            color: ['#ec5d51', '#59abe1', '#f4cf42', '#3dc6a8', '#FFCC67'],
                            width: '500',
                            height: '500',
                            label: {
                                normal: {
                                    position: 'inner',
                                    formatter: '{d}%',
                                    textStyle: {
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: 26
                                    }
                                }
                            },
                            data: data
                        }
                    ]
                };
                echarts.init(this.$refs.srt3chart).setOption(option);
            },
        }
    }
</script>

<style scoped lang="scss">
  p {
    margin: 0
  }

  $ft-color: #1aa1c5;
  @font-face {
    font-family: "DSfont";
    src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
  }

  $sz-font-family: "DSfont";


  .home {
    .cont {

      .sectionleft {

        .sec1-min {
          margin-top: 30px;

            .min1 {
                height: 250px;
                width: 464px;
                background-image: linear-gradient(rgba(14, 97, 162, 0.5) 0%, rgba(0, 31, 66, 0.5) 100%);
                position: relative;
                display: inline-block;
                margin-bottom: 40px;

                p:nth-child(1) {
                    font-size: 40px;
                    color: $ft-color;
                    padding: 15px 25px 10px;

                    span {
                        color: white;
                        font-size: 24px;
                        background-color: #137c9f;
                        border-radius: 10px;
                        padding: 2px 10px;
                        float: right;
                        vertical-align: bottom;
                        margin-top: 10px;
                    }
                }

                p:nth-child(2) {
                    font-family: $sz-font-family;
                    font-size: 62px;
                    color: #f9686f;
                    padding-left: 25px;
                }

                p:nth-child(3) {
                    padding-left: 25px;
                    font-size: 24px;
                    color: #c0c0c0;

                    span {
                        margin-left: 60px;
                    }
                }

                p:nth-child(4) {
                    position: absolute;
                    bottom: 0;
                    font-size: 24px;
                    color: $ft-color;
                    display: flex;
                    width: 100%;

                    span {
                        display: block;
                        width: 100%;
                        text-align: center;
                        border-bottom: 2px solid;
                        margin-right: 5px;
                        line-height: 35px;
                    }

                    span:nth-child(1) {
                        border-image: linear-gradient(90deg, rgba(2, 43, 82, 1) 0%, rgba(1, 93, 156, 1) 100%, rgba(3, 24, 56, 1) 100%) 1;
                    }

                    span:nth-child(2) {
                        border-image: linear-gradient(90deg, rgba(9, 51, 72, 1) 0%, rgba(19, 102, 102, 1) 100%) 1;
                    }

                    span:nth-child(3) {
                        border-image: linear-gradient(90deg, rgba(36, 37, 65, 1) 0%, rgba(128, 66, 87, 1) 100%) 1;
                    }
                }
            }

          .min1:nth-child(even) {
            margin-right: 20px;
          }

          .min1:nth-child(3) {
            p:nth-child(2) {
              color: #ebda55
            }
          }

          .min1:nth-child(4) {
            p:nth-child(2) {
              color: #1ad385
            }
          }

          .min1:nth-child(5) {
            p:nth-child(2) {
              color: $ft-color
            }
          }
        }

        .sec2-min {
          .secrt-0 {
            width: 100%;
              .secrt-0chart {
                  width: 100%;
                  height: 320px;
                  display: inline-block;
              }


          }

          .secrt-1chart {
              height: 320px;
              width: 320px;
            display: inline-block;
          }

            .secrt-1li {
                display: inline-block;
                width: 600px;
                height: 320px;
                vertical-align: top;
                color: $ft-color;

                ul {
                    margin: 0;
                    padding: 0 10px 0 40px;

                    li {
                        list-style: none;
                        position: relative;
                        //list-style-type: square;
                        p {
                            margin: 0;
                            line-height: 60px;
                            display: flex;
                            flex-direction: row;
                            flex-wrap: nowrap;
                            align-content: center;
                            justify-content: space-between;
                            align-items: center;
                            width: 100%;
                            font-size: 32px;
                            span {
                                width: 80px;
                                white-space: nowrap;
                            }
                        }
                    }

                    li:after {
                        content: '';
                        border: 5px solid;
                        position: absolute;
                        left: -20px;
                        top: 13px;
                        //['#ec5d51', '#59abe1', '#f4cf42', '#3dc6a8','#FFCC67']
                        border-color: #ec5d51;
                    }

                    li:nth-child(2):after {
                        border-color: #59abe1;
                    }

                    li:nth-child(3):after {
                        border-color: #f4cf42;
                    }

                    li:nth-child(4):after {
                        border-color: #3dc6a8;
                    }

                    li:nth-child(5):after {
                        border-color: #FFCC67;
                    }
                }
            }
        }
      }

      .section {
          width: 1500px;
          margin: 155px 100px 0 100px;
        display: inline-block;
        vertical-align: top;

        .section-1 {
            width: 100%;
            height: 730px;
        }

        .section-2 {
            width: 100%;
            height: 320px;
        }

      }

      .sectionrt {
        width: 968px;
        display: inline-block;
        vertical-align: top;

        .secrt-nav {
          height: 47px;

          ul {
            text-align: right;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-content: center;
            justify-content: flex-end;
            align-items: center;

            li {
              font-size: 24px;
              /* margin: 0px; */
              padding: 0 22px;
              color: $ft-color;
              list-style: none;
              cursor: pointer;
            }

            li:first-child {
              border-left: 0;
            }
          }
        }

          .seclt-0list {
              width: 50%;
              display: inline-block;
              vertical-align: top;

              ul {
                  margin: 0;
                  padding: 0;

                  li {
                      color: $ft-color;
                      line-height: 30px;
                      font-size: 22px;
                      list-style: none;

                      span {
                          display: inline-block;
                          width: 50%;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                      }

                      span:last-child {
                          text-align: right;
                      }
                  }

                  li:nth-child(1) {
                      color: #ebda55;
                  }

                  li:nth-child(2) {
                      color: #1ad385;
                  }
              }
          }

          .seclt-0chart {
              width: 50%;
              height: 160px;
              display: inline-block;
          }

          .secrt-0 {
          margin-top: 15px;
          height: 210px;
          width: 100%;

          .secrt-0chart {
            height: 160px;
            width: 100%;
          }

          .secrt-1chart {
              height: 500px;
              width: 900px;
              display: inline-block;
          }

              .secrt-1li {
                  display: inline-block;
                  width: 600px;
                  height: 320px;
                  vertical-align: top;
                  color: $ft-color;

                  ul {
                      margin: 0;
                      padding: 0 10px 0 40px;

                      li {
                          list-style: none;
                          position: relative;
                          //list-style-type: square;
                          p {
                              margin: 0;
                              line-height: 60px;
                              display: flex;
                              flex-direction: row;
                              flex-wrap: nowrap;
                              align-content: center;
                              justify-content: space-between;
                              align-items: center;
                              width: 100%;
                              font-size: 32px;
                              span {
                                  width: 80px;
                                  white-space: nowrap;
                              }
                          }
                      }

                      li:after {
                          content: '';
                          border: 5px solid;
                          position: absolute;
                          left: -20px;
                          top: 13px;
                          //['#ec5d51', '#59abe1', '#f4cf42', '#3dc6a8','#FFCC67']
                          border-color: #ec5d51;
                      }

                      li:nth-child(2):after {
                          border-color: #59abe1;
                      }

                      li:nth-child(3):after {
                          border-color: #f4cf42;
                      }

                      li:nth-child(4):after {
                          border-color: #3dc6a8;
                      }

                      li:nth-child(5):after {
                          border-color: #FFCC67;
                      }
                  }
              }
        }
      }
    }
  }
</style>

<style lang="scss">

$ft-color: #34d0ff;
$ft-yel: #ebda55;
.home .historydia{
  margin-top: 25vh !important;
  border: 1px solid rgb( 18, 121, 203 );
  border-top: 5px solid #34d0ff;
  background: none;
  background-image: linear-gradient( 180deg, rgba(18,121,203,.7) 0%, rgba(0,39,83,.7) 100%);
  .el-dialog__header{
    height: 70px;
    background-image: linear-gradient(to right, #033d6b, #076aa2);
    .el-dialog__title{
      font-size: 34px;
      line-height: 30px;
      color: white;
      //font-weight: bold;
      padding-left: 15px;
      border-left: 7px solid #34d0ff;
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

  .content::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: #1379cb;
  }

  /* 滚动条滑块 */
  .content::-webkit-scrollbar-thumb {
    background-color: #1379cb;
    border-radius: 0;
  }

  /* 滚动条轨道 */
  .content::-webkit-scrollbar-track {
    background-color: #122a4e;
    border-radius: 0;
  }
  .el-dialog__body{
    padding: 0;
    .titles{
      position: absolute;
      top: 0;
      right: 20px;
      height: 70px;
      line-height: 70px;
      font-size: 18px;
      color: $ft-color;
      span{
        color: $ft-yel;
      }
    }
    .connav{
      position: absolute;
      width: 100%;
      height: 50px;
      bottom: 0;
      left: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.5));

    }
    .content{
      position: relative;
      height: 470px;
      padding: 40px;
      overflow: auto;
      .conleft{
        color: $ft-color;
        display: inline-block;
        width: 750px;
        .lefthead{
          font-size: 30px;
          span{
            vertical-align: top;
            margin-left: 10px;
            font-weight: bold;
          }
        }
        .leftmin1{
          font-size: 18px;
          padding-left: 23px;
          margin-left: 23px;
          margin-top: 15px;
          border-left: 4px solid rgb( 32, 194, 243 );
          p{
            margin-bottom: 15px;
            span{
              font-size: 30px;
              color: $ft-yel;
              margin-right: 5px;
              vertical-align: middle;
            }
            span:first-child{
              background-image: linear-gradient(to right, rgb(2, 49, 86), rgb(6, 85, 130));
              padding: 6px 15px;
              border-radius: 5px;
              margin-right: 15px;
              font-size: 18px;
              color: $ft-color;
              vertical-align: top;
            }

          }
          p:last-child{
            margin: 0;
          }
        }
        .leftlist{
          margin-left: 17px;
          height: 106px;
          .leftlistst{
            display: inline-block;
            width: 15px;
            height: 100%;
            div{
              display: flex;
              flex-direction: column;
              align-items: center;
              span{
                background-color: $ft-color;
                width: 4px;
                height: 36px;
              }
              span:nth-child(2){
                width: 15px;
                height: 15px;
                border-radius: 50%;
                margin: 10px 0 ;
              }
            }
          }
          img{
            display: inline-block;
            height: 100%;
          }
          p{
            display: inline-block;
            vertical-align: top;
            height: 106px;
            line-height: 106px;
            padding-left: 40px;
            font-size: 18px;
            padding-right: 10px;
            background: url("../../../assets/images/history10.png") no-repeat;
            background-position : 6px center;
            background-size: 100%;
            span:first-child{
              font-size: 20px;
              color: rgb( 32, 194, 243 );
            }
            span{
              color: $ft-yel;
            }
            i{
              margin: 0 15px;
            }
          }
        }
        .leftlist:last-child{
          .leftlistst{
            div{
              span:last-child{display: none}
            }
          }
        }
      }
      .conright{
        display: inline-block;
        width: 350px;
        vertical-align: top;
        h3{
          font-size: 22px;
        }
        .rightmin{
          font-size: 20px;
          color: $ft-color;
          margin-bottom: 20px;
          .min1{
            background-color: rgba( 17, 42, 78,.5 );
            padding:  3px 15px 0 5px;
            border-radius: 100px;
            img{
              display: inline-block;
            }
            p{
              float: right;
              display: inline-block;
              span{
                font-size: 48px;
                color: $ft-yel;
                line-height: 53px;
                height: 53px;
              }
            }
          }
          .min2{
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            .min2list{
              display: flex;
              flex-direction: column;
              align-items: center;
              p{
                margin-top: 5px;
                span{
                  color: $ft-yel;
                }
              }
            }
          }
        }
      }

    }

  }
}
</style>
