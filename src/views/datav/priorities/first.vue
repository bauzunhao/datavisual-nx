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
          <h3>初次信访结构</h3>
          <div class="min1">
            <p>赴国家局 <span>初次信访</span></p>
            <p>{{summaryData.gjNum}}</p>
            <p>占比：{{summaryData.gjRatio}}%<span>同比：{{summaryData.gjYOY}}%</span></p>
            <p><span>来信 {{summaryData.gjlxNum}}</span><span>来访 {{summaryData.gjlfNum}}</span><span>网投 {{summaryData.gjwtNum}}</span></p>
          </div>
          <div class="min1">
            <p>赴自治区 <span>初次信访</span></p>
            <p>{{summaryData.qjNum}}</p>
            <p>占比：{{summaryData.qjRatio}}%<span>同比：{{summaryData.qjYOY}}%</span></p>
            <p><span>来信 {{summaryData.qjlxNum}}</span><span>来访 {{summaryData.qjlfNum}}</span><span>网投 {{summaryData.qjwtNum}}</span></p>
          </div>
          <div class="min1">
            <p>赴拉萨市 <span>初次信访</span></p>
            <p>{{summaryData.sjNum}}</p>
            <p>占比：{{summaryData.sjRatio}}%<span>同比：{{summaryData.sjYOY}}%</span></p>
            <p><span>来信 {{summaryData.sjlxNum}}</span><span>来访 {{summaryData.sjlfNum}}</span><span>网投 {{summaryData.sjwtNum}}</span></p>
          </div>
          <div class="min1">
            <p>赴区县 <span>初次信访</span></p>
            <p>{{summaryData.xjNum}}</p>
            <p>占比：{{summaryData.xjRatio}}%<span>同比：{{summaryData.xjYOY}}%</span></p>
            <p><span>来信 {{summaryData.xjlxNum}}</span><span>来访 {{summaryData.xjlfNum}}</span><span>网投 {{summaryData.xjwtNum}}</span></p>
          </div>
        </div>
        <div class="sec2-min ">
          <h3>初次信访反映渠道分布</h3>
          <div class="secrt-0 mabt70">
            <div class="secrt-0li">
              <div class="secrt-0chart" ref="secrt0chart"></div>
              <div>
                <p>来信</p>
              </div>
            </div>
            <div class="secrt-0li">
              <div class="secrt-0chart" ref="secrt1chart"></div>
              <div>
                <p>来访</p>
              </div>
            </div>
            <div class="secrt-0li">
              <div class="secrt-0chart" ref="secrt2chart"></div>
              <div>
                <p>网投</p>
              </div>
            </div>

          </div>
          <h3>初次信访主要问题</h3>
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
        <h3>初次信访量趋势</h3>
        <div class="section-2 mabt70" ref="section2chart"></div>
        <h3>反馈渠道</h3>
        <div class="section-2" ref="section3chart"></div>
      </div>
      <div class="sectionrt ">
        <div class="secrt-nav ft30">
          <ul>
            <li @click="queryTimeMark(1)"><span :style="{ 'color': queryParams.params.timeMark===1? '#fff':''  }">今日</span></li>
            <li @click="queryTimeMark(4)"><span :style="{ 'color': queryParams.params.timeMark===4? '#fff':''  }">昨天</span></li>
            <li @click="queryTimeMark(2)"><span :style="{ 'color': queryParams.params.timeMark===2? '#fff':''  }">本月</span></li>
            <li @click="queryTimeMark(5)"><span :style="{ 'color': queryParams.params.timeMark===5? '#fff':''  }">上月</span></li>
            <li @click="queryTimeMark(3)"><span :style="{ 'color': queryParams.params.timeMark===3? '#fff':''  }">本年</span></li>
          </ul>
        </div>
        <div class="secrt-0 mabt70">
          <h3>各市县初次信访事项分布</h3>
          <div class="secrt-0chart" ref="srt0chart"></div>
        </div>
        <div class="secrt-0">
          <h3>各市县一次性化解率</h3>
          <div class="secrt-0chart" ref="srt1chart"></div>
        </div>
      </div>
    </div>
    <DialogNav ref="DialogNav"></DialogNav>
  </div>
</template>

<script>
    import datavhead from '@/components/DatavHead';
    import DialogNav from '@/components/DialogNav/index';
    import * as echarts from 'echarts';
    import interviewchart from '@/assets/images/interview-chart.png';
    import {
        getFirstPetitionSummaryData,
        getFirstPetitionByLetterType,
        getFirstPetitionByContentType,
        getFirstPetitionByZone,
        getFirstPetitionLetterTypeByZone,
        getFirstPetitionByMonth,
        getFirstPetitionLetterTypeByMonth,
        getResolutionRateByZone
    } from "@/api/datav/priorities/first";

    export default {
        name: "DataV-Source-First-Petition",
        components: {'datavhead': datavhead, 'DialogNav': DialogNav},
        data() {
            return {
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
                contentTypeData: []
            }
        },
        mounted() {
            this.loadAllFirstPetitionData();
            this.loadFirstResolutionRateByZone();
        },
        methods: {
            openDialong() {
                this.$refs.DialogNav.handldOpen();
            },
            queryTimeMark(mark) {
                this.queryParams.params.timeMark = mark;
                this.loadAllFirstPetitionData();
            },
            loadAllFirstPetitionData() {
                this.$modal.loading("");
                this.loadFirstSummaryData();
                this.loadFirstByLetterType();
                this.loadFirstByContentType();
                this.loadFirstPetitionByZone();
                this.loadFirstLetterTypeByZone();
                this.loadFirstPetitionByMonth();
                this.loadFirstLetterTypeByMonth();
            },
            loadFirstSummaryData() {
                getFirstPetitionSummaryData(this.queryParams).then(result => {
                    if (result) {
                        this.summaryData = result;
                    }
                });
            },
            loadFirstByLetterType() {
                this.initsecrt0chart(100, 0, 0, 0);
                getFirstPetitionByLetterType(this.queryParams).then(result => {
                    if (result) {
                        this.initsecrt0chart(result.totalNum, result.letterNum, result.visitNum, result.onlineNum);
                    }
                });
            },
            loadFirstByContentType() {
                getFirstPetitionByContentType(this.queryParams).then(result => {
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
            loadFirstPetitionByZone() {
                getFirstPetitionByZone(this.queryParams).then(result => {
                    let chartData = [];
                    if (result) {
                        chartData = this.ignoreCityData(result, "zoneName");
                    }
                    this.initZoneChart(chartData);
                });
            },
            loadFirstLetterTypeByZone() {
                getFirstPetitionLetterTypeByZone(this.queryParams).then(result => {
                    let chartData = [];
                    if (result) {
                        chartData = this.ignoreCityData(result, "zoneName");
                    }
                    this.initsecrt0Chart(chartData);
                });
            },
            loadFirstPetitionByMonth() {
                getFirstPetitionByMonth(this.queryParams).then(result => {
                    let chartData = [];
                    if (result) {
                        chartData = result;
                    }
                    this.initsection2Chart(chartData);
                });
            },
            loadFirstLetterTypeByMonth() {
                getFirstPetitionLetterTypeByMonth(this.queryParams).then(result => {
                    let chartData = [];
                    if (result) {
                        chartData = result;
                    }
                    this.initsection3Chart(chartData);
                });
            },
            loadFirstResolutionRateByZone() {
                getResolutionRateByZone(this.queryParams).then(result => {
                    let chartData = [];
                    if (result) {
                        chartData = this.ignoreCityData(result, "id");
                    }
                    this.initsecrt1Chart(chartData);
                });
            },
            initsecrtchartOption(totalNum, secrt0chart, Colors, n) {
                var echartData = [{
                    value: secrt0chart,//时间
                    name: ''
                }, {
                    value: totalNum - secrt0chart,
                    name: ''
                }];
                var innerColor = Colors[2]; //内层颜色
                var outColor = '#13add7'; //外层边框色粗
                var textColor = Colors[2]; //文字颜色
                var startColor = Colors[1]; //中间饼图渐变开始颜色
                var endColor = Colors[2]; //中间饼图渐变结束颜色
                /*---------------------缩放----------------------------*/
                var scale = 1;

                /*---------------------颜色配置----------------------------*/
                var color = [{
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: startColor // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: endColor // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }, 'none'];
                /*---------------------富文本----------------------------*/
                var rich = {
                    time: {
                        color: innerColor,
                        fontSize: 32 * scale,
                        padding: [0, 0],
                        fontWeight: 'bold'
                    },
                    unit: {
                        color: innerColor,
                        fontSize: 14 * scale,
                        padding: [0, 0, 0, 0],
                        verticalAlign: 'bottom',
                    }
                };
                return {
                    legend: {
                        show: false,
                        itemGap: 12,
                        data: ['', '']
                    },
                    series: [
                        //内圈圆环
                        {
                            name: 'Line 0',
                            type: 'pie',
                            clockWise: false, //顺时加载
                            hoverAnimation: false, //鼠标移入变大
                            center: ['50%', '50%'],
                            radius: ['0', '0'],
                            itemStyle: {
                                normal: {
                                    color: innerColor
                                }
                            },
                            data: [{
                                value: 10,
                                name: '',
                            }],
                            label: {
                                normal: {
                                    formatter: function (params) {
                                        var time = echartData[0].value;
                                        if (n) {
                                            return '{time|' + time + '}\n{unit|' + n + '}';
                                        } else {
                                            return '{time|' + time + '}{unit|}';
                                        }
                                    },
                                    position: 'center',
                                    textStyle: {
                                        fontSize: 38 * scale,
                                        fontWeight: 'bold',
                                        color: textColor
                                    },
                                    rich: rich
                                }
                            }
                        },
                        //中间圆环
                        {
                            name: 'Line 1',
                            type: 'pie',
                            clockWise: false, //顺时加载
                            hoverAnimation: false, //鼠标移入变大
                            center: ['50%', '50%'],
                            radius: ['75%', '65%'],
                            color: color,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                },
                                borderWidth: 5,
                                borderRadius: 50,
                            },
                            data: echartData,
                        },
                        //外层圆环
                        {
                            name: 'Line 2',
                            type: 'pie',
                            clockWise: false, //顺时加载
                            hoverAnimation: false, //鼠标移入变大
                            center: ['50%', '50%'],
                            radius: ['75%', '75%'],
                            itemStyle: {
                                normal: {
                                    borderWidth: 2 * scale,
                                    borderColor: outColor,
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                }
                            },
                            data: [{
                                value: 10,
                                name: '',

                            }]
                        }
                    ],
                };
            },
            initsecrt0chart(totalNum, letterNum, visitNum, onlineNum) {
                echarts.init(this.$refs.secrt0chart).setOption(this.initsecrtchartOption(totalNum, letterNum, ['#13add7', '#5f6542', '#e4d454']));
                echarts.init(this.$refs.secrt1chart).setOption(this.initsecrtchartOption(totalNum, visitNum, ['#13add7', '#0e6d5c', '#1ad385']));
                echarts.init(this.$refs.secrt2chart).setOption(this.initsecrtchartOption(totalNum, onlineNum, ['#13add7', '#704059', '#fa686f']));
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
                            name: '初次信访主要问题',
                            type: 'pie',
                            radius: ['50%', '100%'],
                            color: ['#ec5d51', '#59abe1', '#f4cf42', '#3dc6a8', '#FFCC67'],
                            width: '300',
                            height: '300',
                            label: {
                                normal: {
                                    position: 'inner',
                                    formatter: '{d}%',
                                    textStyle: {
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: 20
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
                        color: '#34d0ff',
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
                        top: '40%',
                        textAlign: "center",
                        left: "50%",
                        textStyle: {
                            color: '#ebda55',
                            fontSize: 88,
                            fontWeight: '500',
                            fontFamily: 'DSfont'
                        },
                        subtext: '初次信访总数',
                        subtextStyle: {
                            textAlign: "center",
                            color: '#20c2f3',
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
                            nameTextStyle: '#20c2f0'
                        },
                        axisLabel:{
                            fontSize:26,
                            color : '#34d0ff'
                        }
                    },
                    grid: {
                        top: 10,
                        left: 0,
                        right: 10,
                        bottom: 30,
                    },
                    yAxis: {
                        show :false
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
                                fontSize: 24,
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
                let letterNumData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                let visitNumData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                let onlineNumData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (let i = 0, len = chartData.length; i < len; i++) {
                    let rec = chartData[i];
                    let index = parseInt(rec.time) - 1;
                    letterNumData[index] = rec.letterNum;
                    visitNumData[index] = rec.visitNum;
                    onlineNumData[index] = rec.onlineNum;
                }
                let option = {
                    legend: {
                        icon: 'circle',
                        top: 0,
                        right: 0,
                        itemWidth: 6,
                        itemGap: 20,
                        textStyle: {
                            color: '#20c2f3',
                            fontSize:26,
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
                        axisLabel:{
                            fontSize:26,
                            color : '#34d0ff'
                        }
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba( 33, 142, 168, 0.302 )'
                            }
                        }
                    },
                    series: [
                        {
                            name: '来信',
                            data: letterNumData,
                            type: 'line',
                            symbolSize: 1,
                            symbol: 'circle',
                            smooth: true,
                            yAxisIndex: 0,
                            showSymbol: false,
                            color: '#ebda55',
                        },
                        {
                            name: '来访',
                            data: visitNumData,
                            type: 'line',
                            symbolSize: 1,
                            symbol: 'circle',
                            smooth: true,
                            yAxisIndex: 0,
                            showSymbol: false,
                            color: '#1acc83',
                        },
                        {
                            name: '网投',
                            data: onlineNumData,
                            type: 'line',
                            symbolSize: 1,
                            symbol: 'circle',
                            smooth: true,
                            yAxisIndex: 0,
                            showSymbol: false,
                            color: '#ef656e',
                        },
                    ]
                };
                echarts.init(this.$refs.section3chart).setOption(option);
            },
            initsecrt0Chart(chartData) {
                let zoneNameData = [];
                let letterNumData = [];
                let visitNumData = [];
                let onlineNumData = [];
                for (let i = 0, len = chartData.length; i < len; i++) {
                    let rec = chartData[i];
                    zoneNameData.unshift(rec.zoneName);
                    letterNumData.unshift(rec.letterNum);
                    visitNumData.unshift(rec.visitNum);
                    onlineNumData.unshift(rec.onlineNum);
                }
                let option = {
                    legend: {
                        top: '0',
                        right: '0',
                        textStyle: {
                            color: '#a4a8b4',
                            fontSize : 22
                        },
                    },
                    grid: {
                        left: '0',
                        top: '5%',
                        right: '1%',
                        bottom: '1%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            // margin: 10,
                            color: '#34d0ff',
                            fontSize : 24
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: zoneNameData,
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
                            color: '#34d0ff',
                            fontSize : 24
                        }
                    },
                    color: [
                        new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: 'rgb(0,162,255)'
                        },
                            {
                                offset: 1,
                                color: 'rgba(0,162,255,0)'
                            }
                        ]),
                        new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: 'rgb(34,176,140)'
                        },
                            {
                                offset: 1,
                                color: 'rgba(42,222,176,0)'
                            }
                        ]),
                        new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: 'rgb(251,104,111)'
                        },
                            {
                                offset: 1,
                                color: 'rgba(251,104,111,0)'
                            }
                        ]),
                    ],
                    series: [
                        {
                            name: '来信',
                            type: 'bar',
                            stack: 'Tik Tok',
                            barWidth: 25,
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
                                    offset: [0, 0],
                                    formatter: '{c}',
                                    textStyle: {
                                        align: 'center',
                                        baseline: 'middle',
                                        fontSize: 22,
                                        fontWeight: '400',
                                        color: '#fff',
                                        textShadowColor: '#000',
                                        textShadowBlur: '0',
                                        textShadowOffsetX: 1,
                                        textShadowOffsetY: 1,
                                    }
                                },
                            },
                            data: letterNumData
                        },
                        {
                            name: '来访',
                            type: 'bar',
                            stack: 'Tik Tok',
                            barWidth: 25,
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
                                    offset: [0, 0],
                                    formatter: '{c}',
                                    textStyle: {
                                        align: 'center',
                                        baseline: 'middle',
                                        fontSize: 22,
                                        fontWeight: '400',
                                        color: '#fff',
                                        textShadowColor: '#000',
                                        textShadowBlur: '0',
                                        textShadowOffsetX: 1,
                                        textShadowOffsetY: 1,
                                    }
                                },
                            },
                            data: visitNumData
                        },
                        {
                            name: '网投',
                            type: 'bar',
                            stack: 'Tik Tok',
                            barWidth: 25,
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
                                    offset: [0, 0],
                                    formatter: '{c}',
                                    textStyle: {
                                        align: 'center',
                                        baseline: 'middle',
                                        fontSize: 22,
                                        fontWeight: '400',
                                        color: '#fff',
                                        textShadowColor: '#000',
                                        textShadowBlur: '0',
                                        textShadowOffsetX: 1,
                                        textShadowOffsetY: 1,
                                    }
                                },
                            },
                            data: onlineNumData
                        }
                    ]
                };
                echarts.init(this.$refs.srt0chart).setOption(option);
            },
            initsecrt1Chart(chartData) {
                let zoneNameData = [];
                let seriesData = [];
                for (let i = 0, len = chartData.length; i < len; i++) {
                    let rec = chartData[i];
                    zoneNameData.push(rec.name);
                    seriesData.push(rec.rate);
                }
                let option = {
                    xAxis: {
                        type: 'category',
                        data: zoneNameData,
                        axisLine: {
                            lineStyle: {
                                color: '#228ea8' //
                            },
                            nameTextStyle: '#20c2f0'
                        },
                        axisLabel: {
                            fontSize : 20,
                            color : '#34d0ff',
                            rotate: 45, // 旋转标签
                            interval: 0, // 显示所有标签
                        },
                    },
                    grid: {
                        top: 10,
                        left: 40,
                        right: 10,
                        bottom: 100,
                    },
                    yAxis: {
                        type: 'value',
                        show :false,
                        axisLabel: {
                            formatter: '{value}%',
                            color : '#34d0ff'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#228ea8',
                                fontSize : 24
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
                            data: seriesData,
                            type: 'bar',
                            barWidth: 32,
                            itemStyle: {
                                color: function (params) {
                                    if (params.dataIndex % 2 === 0) {
                                        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {offset: 0, color: 'rgb(0,162,255)'},
                                            {offset: 1, color: 'rgba(17,102,255,0)'}
                                        ])
                                    } else {
                                        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {offset: 0, color: 'rgb(0,212,193)'},
                                            {offset: 1, color: 'rgba(98,117,209,0)'}
                                        ])
                                    }
                                },
                            },
                            label: {
                                show: true,
                                position: 'insideTop',
                                color: '#fff',
                                fontSize: 22,
                                formatter: function (params) {
                                    // 如果数据为零，则不显示标签，或者可以设置为一个空字符串
                                    return params.value * 1 ===  100 ? '100%' : params.value * 1 === 0 ? '' : params.value+'%';
                                },
                            }
                        }
                    ]
                };
                echarts.init(this.$refs.srt1chart).setOption(option);
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
            margin-right: 40px;
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
            display: flex;
            flex-wrap: nowrap;
            align-content: center;
            justify-content: space-between;
            align-items: center;
            background-size: 100% 100%;

            .secrt-0li {
              display: flex;
              align-items: center;

              .secrt-0chart {
                height: 360px;
                width: 300px;
              }

              p {
                font-size: 32px;
                margin: 0;
                color: $ft-color;
              }
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
          height: 369px;
        }
      }

      .sectionrt {
        width: 968px;
        display: inline-block;
        vertical-align: top;

        .secrt-nav {
            height: 47px;
            margin-bottom: 80px;

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

        .secrt-0 {
          margin-top: 30px;
          width: 100%;

          .secrt-0chart {
            height: 736px;
            width: 100%;
          }
        }
      }
    }
  }
</style>
