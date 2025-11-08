<template>
  <div class="app-container">
      <div class="head" v-if="isGridUser">
          <el-card class="box-card">
              <div slot="header" class="clearfix">
                  <span>网格信访概览</span>
              </div>
              <div class="item">
                  <el-row :gutter="40" class="numlist">
                      <el-col :span="4">
                          <div>
                              <p>{{summaryData.pendingDeliveryNum}}</p>
                              <p>待派件数</p>
                          </div>
                      </el-col>
                      <el-col :span="1" class="opspan">1</el-col>
                      <el-col :span="4">
                          <div>
                              <p>{{summaryData.overduePendingDeliveryNum}}</p>
                              <p>超期未派件数</p>
                          </div>
                      </el-col>
                  </el-row>
              </div>
          </el-card>
      </div>

    <div class="head" v-if="!isGridUser && !isZfwUser">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{timeMarkShowInfo}}信访概览</span>
          <div class="ragrop" >
            <el-radio-group v-model="timeMark" size="small">
              <el-radio-button label="1">今日</el-radio-button>
              <el-radio-button label="2">本月</el-radio-button>
              <el-radio-button label="3">本年</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <el-row :gutter="40" class="numlist">
            <el-col :span="4">
              <div>
                <p>{{summaryData.endNum}}/{{summaryData.totalNum}}</p>
                <p>全地市办结/总量</p>
              </div>
            </el-col>
            <el-col :span="1" class="opspan">1</el-col>
            <el-col :span="4">
              <div>
                <p>{{summaryData.firstNum}}</p>
                <p>初件</p>
              </div>
            </el-col>
            <el-col :span="1" class="opspan">1</el-col>
            <el-col :span="4">
              <div>
                <p>{{summaryData.repeatNum}}</p>
                <p>重复件</p>
              </div>
            </el-col>
            <el-col :span="1" class="opspan">1</el-col>
            <el-col :span="4">
              <div>
                <p>{{summaryData.zrdwbmyNum}}</p>
                <p>不满意</p>
              </div>
            </el-col>
            <el-col :span="1" class="opspan">1</el-col>
            <el-col :span="4">
              <div>
                <p>{{summaryData.nationVisitNum}}</p>
                <p>进京访</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>

    <div class="cont" v-if="!isGridUser && !isZfwUser">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{timeMarkShowInfo}}各地市登记量对比</span>
            </div>
            <div class="chart" ref="registerChart"></div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{timeMarkShowInfo}}各地市初件对比</span>
            </div>
            <div class="chart" ref="firstChart"></div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{timeMarkShowInfo}}各地市重件对比</span>
            </div>
            <div class="chart" ref="repeatChart"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    import {getSummaryData, getZoneRegisterNum, getZoneFirstNum, getZoneRepeatNum, getGridData} from "@/api/index";
    import {hasRole} from "@/utils/permission"; // 权限判断函数
    import * as echarts from "echarts";
    import { loopShowTooltip } from '@/utils/echarts-tooltip-carousel';

    export default {
        name: "Index",
        data() {
            return {
                isGridUser: false,
                isZfwUser: false,
                // 汇总数据
                summaryData: {
                    endNum: 0,
                    totalNum: 0,
                    firstNum: 0,
                    repeatNum: 0,
                    nationVisitNum: 0,
                    zrdwbmyNum: 0,
                    pendingDeliveryNum: 0,
                    overduePendingDeliveryNum: 0
                },
                chartObj: {
                    registerChart: null,
                    firstChart: null,
                    repeatChart: null
                },
                chartTooltipClearLoop: [],
                // 查询参数
                timeMark: 3,
                timeMarkShowInfo: ""
            };
        },
        created() {
            this.isGridUser = this.hasRole(["grid"]);
            this.isZfwUser = this.hasRole(["szfw"]);
            this.loadData();
        },
        watch: {
            timeMark(newVal, oldVal) {
                this.loadData();
            }
        },
        methods: {
            hasRole,
            loadData() {
                if (this.isGridUser) {
                    this.loadGridData();
                } else if (!this.isZfwUser) {
                    let arr = ["", "今日以来", "本月以来", "本年以来"];
                    this.timeMarkShowInfo = arr[this.timeMark];
                    this.openLoading();
                    this.resetHighlight();
                    this.loadSummaryData();
                    this.loadZoneRegisterNum();
                    this.loadZoneFirstNum();
                    this.loadZoneRepeatNum();
                }
            },
            // 重置高亮
            resetHighlight() {
                if (this.chartTooltipClearLoop && this.chartTooltipClearLoop.length > 0) {
                    for (var i = 0, len = this.chartTooltipClearLoop.length; i < len; i++) {
                        const clearLoop = this.chartTooltipClearLoop[i];
                        clearLoop.clearLoop();
                    }
                    this.chartTooltipClearLoop = [];
                }
            },
            // 执行tooltip高亮
            exceHighlight(chart, chartOption, options) {
                const clearLoop = loopShowTooltip(chart, chartOption, options);
                this.chartTooltipClearLoop.push(clearLoop);
            },
            // 打开加载层
            openLoading() {
                this.$modal.loading("正在加载数据，请稍候！");
            },
            getQueryParams: function () {
                const query = {params: {}};
                query.params["timeMark"] = this.timeMark;
                return query;
            },
            loadSummaryData: function () {
                getSummaryData(this.getQueryParams()).then(response => {
                    var data = response.data;
                    this.$modal.closeLoading();
                    if (data) {
                        this.summaryData.endNum = data.endNum;
                        this.summaryData.totalNum = data.totalNum;
                        this.summaryData.firstNum = data.firstNum;
                        this.summaryData.repeatNum = data.repeatNum;
                        this.summaryData.nationVisitNum = data.nationVisitNum;
                        this.summaryData.zrdwbmyNum = data.zrdwbmyNum;
                    }
                });
            },
            loadGridData() {
                getGridData().then(response => {
                    var data = response.data;
                    if (data) {
                        this.summaryData.pendingDeliveryNum = data.num;
                        this.summaryData.overduePendingDeliveryNum = data.cqNum;
                    }
                });
            },
            initChartOption: function (xAxisData, seriesData) {
                return {
                    tooltip: {
                        trigger: 'axis',
                        className: 'indextooltip',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '2%',
                        right: '4%',
                        bottom: '5%',
                        top: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxisData,
                        axisLine: {
                            lineStyle: {
                                color: '#000000'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontFamily: 'Microsoft YaHei'
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            show: true,
                            nameTextStyle: {
                                color: '#000',
                            },
                            lineStyle: {
                                color: 'rgba(0,0,0,0.5)',
                                nameTextStyle: {
                                    color: '#000'
                                },
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        axisLabel: {}
                    },
                    series: [{
                        name: '信访量（件次）',
                        type: 'bar',
                        barWidth: '30%',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#1badfd'
                                }, {
                                    offset: 1,
                                    color: '#1a81f5'
                                }]),
                                barBorderRadius: 12,
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#1badfd',
                                        fontSize: 12
                                    }
                                }
                            }
                        },
                        data: seriesData
                    }]
                };
            },
            loadZoneRegisterNum: function () {
                getZoneRegisterNum(this.getQueryParams()).then(response => {
                    var list = response.data;
                    if (list) {
                        const xAxisData = [];
                        const seriesData = [];
                        for (var i = 0, len = list.length; i < len; i++) {
                            var rec = list[i];
                            xAxisData.push(rec.zoneName);
                            seriesData.push(rec.regNum);
                        }
                        this.chartObj.registerChart = echarts.init(this.$refs.registerChart);
                        const chartOption = this.initChartOption(xAxisData, seriesData);
                        this.chartObj.registerChart.setOption(chartOption);
                        this.exceHighlight(this.chartObj.registerChart, chartOption);
                    }
                });
            },
            loadZoneFirstNum: function () {
                const query = this.getQueryParams();
                query.repeat = false;
                getZoneFirstNum(query).then(response => {
                    var list = response.data;
                    if (list) {
                        const xAxisData = [];
                        const seriesData = [];
                        for (var i = 0, len = list.length; i < len; i++) {
                            var rec = list[i];
                            xAxisData.push(rec.zoneName);
                            seriesData.push(rec.regNum);
                        }
                        this.chartObj.firstChart = echarts.init(this.$refs.firstChart);
                        const chartOption = this.initChartOption(xAxisData, seriesData);
                        this.chartObj.firstChart.setOption(chartOption);
                        this.exceHighlight(this.chartObj.firstChart, chartOption);
                    }
                });
            },
            loadZoneRepeatNum: function () {
                const query = this.getQueryParams();
                query.repeat = true;
                getZoneRepeatNum(query).then(response => {
                    var list = response.data;
                    if (list) {
                        const xAxisData = [];
                        const seriesData = [];
                        for (var i = 0, len = list.length; i < len; i++) {
                            var rec = list[i];
                            xAxisData.push(rec.zoneName);
                            seriesData.push(rec.regNum);
                        }
                        this.chartObj.repeatChart = echarts.init(this.$refs.repeatChart);
                        const chartOption = this.initChartOption(xAxisData, seriesData);
                        this.chartObj.repeatChart.setOption(chartOption);
                        this.exceHighlight(this.chartObj.repeatChart, chartOption);
                    }
                });
            }
        }
    };
</script>

<style scoped lang="scss">
  .head {
    .ragrop {
      float: right;
    }
  }

  .numlist {
    .el-col div {
      border: 1px solid #cccccc63;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px;
      border-radius: 5px;
      p {
        margin: 0;
        font-size: 15px;
        white-space: nowrap;
      }

      p:first-child {
        font-size: 30px;
        color: #1890ff;
        line-height: 35px;
      }
    }
  }

  .cont {
    margin-top: 40px;

    .chart {
      height: 400px;
    }
  }
  .opspan{
    opacity: 0;
  }
</style>

