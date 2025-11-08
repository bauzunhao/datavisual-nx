<template>
  <div class="app-container home">
    <datavhead></datavhead>
    <div class="cont">
      <div class="sectionleft">
        <div class="sec1-nav">
          <router-link to="/"><img src="../../../assets/images/general-home.png" alt=""></router-link>
          <ul>
            <li @click="openDialong()"><span>导航</span></li>
            <li><router-link to="/datav/general"><span>信访概览</span></router-link></li>
            <li><router-link to="/datav/transact"><span>办理情况</span></router-link></li>
            <li><router-link to="/datav/perfmon"><span>绩效分析</span></router-link></li>
            <li><router-link to="/datav/contradiction"><span>突出矛盾</span></router-link></li>
          </ul>
        </div>
        <div class="sec1-min mabt70">
          <h3>重复件</h3>
          <!--<div class="sec1minchart" ref="sec1minchart"></div>-->
          <div class="sec1minchart" ref="sect2chart1"></div>
        </div>
        <div class="sec1-min mabt70">
          <h3 style="cursor: pointer;"><span @click="openexceedactvis(0)" >按期答复TOP>></span> <span style="float: right;font-size: 40px;"><span @click="opencity()">全部>></span></span></h3>
          <div class="sec1minchart" ref="sec2minchart"></div>
        </div>
      </div>
      <div class="section">
        <div class="mabt70">
            <h3>办理绩效</h3>
            <div class="section-1">
                <div class="seclist">
                    <p>信访机构及时受理率</p>
                    <p><span>{{this.workPerformanceData.xfbmsll}}</span><span></span></p>
                </div>
                <div class="seclist">
                    <p>一次性化解率</p>
                    <p><span>{{this.workPerformanceData.ycxHjl}}</span><span></span></p>
                </div>
                <div class="seclist">
                    <p>群众满意率（信访机构/责任单位）</p>
                    <p><span>{{this.workPerformanceData.xfbmmyl}} / {{this.workPerformanceData.zrdwmyl}}</span><span></span></p>
                </div>
            </div>
            <div class="section-2">
                <p><span>{{this.workPerformanceData.blsx}}</span>天/件</p>
                <p>拉萨</p>
                <!--<p><span>222</span>天/件</p>
                <p>全区</p>-->
            </div>
            <div class="section-1">
                <div class="seclist">
                    <p>责任单位及时受理率</p>
                    <p><span>{{this.workPerformanceData.zrdwsll}}</span><span></span></p>
                </div>
                <div class="seclist">
                    <p>按期答复率</p>
                    <p><span>{{this.workPerformanceData.aqdfl}}</span><span></span></p>
                </div>

                <div class="seclist">
                    <p>参评率（信访机构/责任单位）</p>
                    <p><span>{{this.workPerformanceData.xfbmcpl}} / {{this.workPerformanceData.zrdwcpl}}</span><span></span></p>
                </div>
            </div>
        </div>
        <h3 style="margin-top: 25px">重复件TOP <span @click="opencfj()" style="cursor: pointer;float: right;">全部 >></span></h3>
        <div class="sect2">
          <!--<div class="sect2chart" ref="sect2chart1"></div>-->
          <div class="sect2chart">
            <div style="width: 100%;height: 100%" ref="sect2chart2"></div>
            <div class="charttip">
              <p>国家重复件 {{this.workRepeatData.repeatMap.repeatNum > 0 ? ((this.workRepeatData.repeatMap.gjRepeatNum / this.workRepeatData.repeatMap.repeatNum) * 100 ).toFixed(2) : 0 }}% <span>{{this.workRepeatData.repeatMap.gjRepeatNum}}</span></p>
              <p>自治区重复件 {{this.workRepeatData.repeatMap.repeatNum > 0 ? ((this.workRepeatData.repeatMap.provinceNum / this.workRepeatData.repeatMap.repeatNum) * 100 ).toFixed(2) : 0}}% <span>{{this.workRepeatData.repeatMap.provinceNum}}</span></p>
              <p>本地市重复件 {{this.workRepeatData.repeatMap.repeatNum > 0 ? ((this.workRepeatData.bdqRepeatTotal / this.workRepeatData.repeatMap.repeatNum) * 100 ).toFixed(2) : 0}}% <span>{{this.workRepeatData.bdqRepeatTotal}}</span></p>
            </div>
          </div>
          <div class="sect2chart" ref="sect2chart3"></div>
        </div>
      </div>
      <div class="sectionrt">
        <h3>一次性化解率 <span style="float: right;font-size: 40px;cursor: pointer;" @click="hjlVisible=true;">全部>></span></h3>
        <div class="sectionrt1chart" ref="sectionrt1chart"></div>
        <div class="sectionrt1list">
            <p v-for="(rec, index) in oneHjlZoneGroupData.slice(0, 7)"
               :key="index"
               :style=" {'border-color' : borcolor(rec.rate)}">
                {{rec.name}}<span>{{rec.rate}}%</span>
            </p>
        </div>
        <h3 style="margin-top: 70px">
            <span @click="openexceedactvis(1)" style="margin-top: 25px; cursor: pointer;">满意度TOP >></span>
            <span @click="openmyd()" style="cursor: pointer;float: right;">全部 >></span>
        </h3>
        <div class="sectionrt2chart" ref="sectionrt2chart"></div>
      </div>

      <div class="pmbottom" ref="pmbottom"></div>
    </div>
    <DialogNav ref="DialogNav"></DialogNav>
      <el-dialog
          :visible.sync="exceedvis"
          width="1200px"
          custom-class="detailtable"
          :title="perfmonName"
          :before-close="morevisClose">
          <el-table :data="perfmonTableData">
              <el-table-column label="编号" align="center" prop="letterCode" />
              <el-table-column label="区县" align="center" prop="zoneName" show-overflow-tooltip/>
              <el-table-column v-if="0 == perfmonType" label="最后办理单位" align="center"prop="handleUnitName" show-overflow-tooltip/>
              <el-table-column v-if="0 == perfmonType" label="经办人" align="center" prop="userName"/>
              <el-table-column v-if="0 == perfmonType" label="电话" align="center" prop="telephone"/>
              <el-table-column v-if="1 == perfmonType" label="不满意原因" align="center"prop="acceptReasonName" show-overflow-tooltip/>
              <el-table-column v-if="1 == perfmonType" label="评价日期" align="center"prop="zrdwpjsj" show-overflow-tooltip/>
              <el-table-column v-if="1 == perfmonType" label="概括" align="center"prop="complaintContent" show-overflow-tooltip/>
          </el-table>
          <pagination
              v-show="perfmonTotal>0"
              :total="perfmonTotal"
              :page.sync="queryTableParams.pageNum"
              :limit.sync="queryTableParams.pageSize"
              @pagination="openexceedactvis(perfmonType)"
          />
      </el-dialog>

      <el-dialog
          :visible.sync="dfpVisible"
          width="1200px"
          custom-class="detailtable"
          title="按期答复"
          :before-close="morevisClose">
        <div class="sectionrt2charttc" ref="sec2minchart1"></div>
      </el-dialog>

      <el-dialog
          :visible.sync="hjlVisible"
          width="500px"
          custom-class="detailtable"
          title="一次性化解率"
          :before-close="morevisClose">
          <div >
              <div class="sectionrt1list">
                  <p v-for="(rec, index) in this.oneHjlZoneGroupData" :style=" {'border-color' : borcolor(rec.rate)}">{{rec.name}}<span>{{rec.rate}}%</span></p>
              </div>
          </div>
      </el-dialog>

      <el-dialog
          :visible.sync="mydVisible"
          width="1200px"
          custom-class="detailtable"
          title="满意度"
          :before-close="morevisClose">
          <div class="mydmxchart" style="width: 100%;height: 550px;" ref="mydmxchart">
          </div>
      </el-dialog>
      <el-dialog
          :visible.sync="cfjVisible"
          width="1200px"
          custom-class="detailtable"
          title="重复件"
          :before-close="morevisClose">
          <div class="mydmxchart" style="width: 100%;height: 550px;" ref="dialsect2chart3">
          </div>
      </el-dialog>
  </div>
</template>

<script>
    import datavhead from '@/components/DatavHead/index';
    import DialogNav from '@/components/DialogNav/index';
    import * as echarts from 'echarts';
    import {
        getWorkPerformanceData,
        listAqdflZoneGroupData,
        listZrdwmylZoneGroupData,
        listOneHjlZoneGroupData,
        listFirstYOYZoneGroupData,
        getRepeatData,
        getMonthThreeRateData,
        getAqdflCqData,
        getZrdwBmyData
    } from "@/api/datav/petition/perfmon";

    export default {
        name: "DataV-PerfMon",
        components: {'datavhead': datavhead, 'DialogNav': DialogNav},
        data() {
            return {
                topcitydate : null,
                dfpVisible : false,
                mydVisible : false,
                hjlVisible : false,
                cfjVisible : false,
                exceedvis : false,
                perfmonTableData: [],
                perfmonType: 0,
                perfmonTotal: 0,
                perfmonName: "",
                queryTableParams: {
                    pageNum: 1,
                    pageSize: 10,
                    params: {
                        timeMark: 3
                    }
                },
                // 查询参数
                queryParams: {
                    params: {
                        timeMark: 3
                    }
                },
                workPerformanceData: {
                    aqdfl: "0.00%",
                    blsx: "0",
                    xfbmsll: "0.00%",
                    zrdwsll: "0.00%",
                    ycxHjl: "0.00%",
                    firstYOY: "0.00%",
                    zrdwmyl: "0.00%",
                    zrdwcpl: "0.00%",
                    xfbmmyl: "0.00%",
                    xfbmcpl: "0.00%"
                },
                oneHjlZoneGroupData: [],
                firstYOYZoneGroupData: [],
                workRepeatData: {
                    repeatMap: {
                        total: 0,
                        gjRepeatNum: 0,
                        provinceNum: 0,
                        repeatNum: 0
                    },
                    repeatZoneList: [],
                    bdqRepeatTotal: 0,
                },
                mydmxdata : null,
                cfjdata : null,
            }
        },
        mounted() {
            this.loadAllPerfMonData();
        },
        methods: {
            borcolor(rate){
                if(rate <85){
                    return '#f56971'
                }
                if( 85 <= rate && rate <= 90){
                    return '#ebda55'
                }
                if(  rate > 90){
                    return '#1ad485'
                }
            },
            morevisClose(done){
                done()
            },
            openmyd(){
                this.mydVisible=true;
                this.$nextTick(() => {
                    this.initsectionrt2chart(this.mydmxdata,this.$refs.mydmxchart,this.mydmxdata.length);
                });
            },
            opencfj(){
                this.cfjVisible=true;
                this.$nextTick(() => {
                    this.initsect2chart3(this.cfjdata,this.$refs.dialsect2chart3,this.cfjdata.length);
                });
            },
            openexceedactvis(type){
                this.exceedvis = true;
                if(type != this.perfmonType){
                    this.queryTableParams.pageNum = 1;
                }
                this.perfmonType = type;
                if(0 == type){
                    this.perfmonName = "答复超期件明细";
                    this.queryAqdflCqData();
                }else{
                    this.perfmonName = "责任单位不满意件明细";
                    this.queryZrdwBmyData();
                }
            },
            openDialong() {
                this.$refs.DialogNav.handldOpen();
            },
            loadAllPerfMonData() {
                this.$modal.loading("");
                this.loadWorkPerformanceData();
                this.loadAqdflZoneGroupData();
                this.loadZrdwmylZoneGroupData();
                this.loadOneHjlZoneGroupData();
                //this.loadFirstYOYZoneGroupData();
                this.loadWorkRepeatData();
                this.loadMonthThreeRateData();
            },
            loadWorkPerformanceData() {
                getWorkPerformanceData(this.queryParams).then(result => {
                    if (result && 200 === result.code) {
                        let data = result.data;
                        this.workPerformanceData = data;
                        // 再次初始化其他依赖数据
                       // this.initsec1minChart(this.firstYOYZoneGroupData);
                        this.initsectionrt1chart(this.workPerformanceData.ycxHjl);
                    }
                    this.$modal.closeLoading();
                });
            },
            loadAqdflZoneGroupData() {
                listAqdflZoneGroupData(this.queryParams).then(result => {
                    if (result && 200 === result.code) {
                        this.topcitydate = this.ignoreCityData(result.data, "id");
                        this.initsec2minChart(this.topcitydate,this.$refs.sec2minchart,7);
                    }
                });

            },
            loadZrdwmylZoneGroupData() {
                listZrdwmylZoneGroupData(this.queryParams).then(result => {
                    if (result && 200 === result.code) {
                        this.mydmxdata = this.ignoreCityData(result.data, "id");
                        this.initsectionrt2chart(this.mydmxdata,this.$refs.sectionrt2chart,7);
                    }
                });
            },
            loadOneHjlZoneGroupData() {
                listOneHjlZoneGroupData(this.queryParams).then(result => {
                    if (result && 200 === result.code) {
                        let data = this.ignoreCityData(result.data, "id");
                        this.oneHjlZoneGroupData = data;
                    }
                });
            },
            loadFirstYOYZoneGroupData() {
                listFirstYOYZoneGroupData(this.queryParams).then(result => {
                    if (result && 200 === result.code) {
                        let data = result.data;
                        this.firstYOYZoneGroupData = data;
                        this.initsec1minChart(data);
                    }
                });
            },
            loadWorkRepeatData() {
                getRepeatData(this.queryParams).then(result => {
                    if (result && 200 === result.code) {
                        let data = result.data;
                        this.workRepeatData = data;
                        this.cfjdata = this.ignoreCityData(data.repeatZoneList, "id")
                        this.initsect2chart(data.repeatMap.total, data.repeatMap.repeatNum);
                        this.initsect2chart2(data.repeatMap,data.bdqRepeatTotal);
                        this.initsect2chart3(this.cfjdata,this.$refs.sect2chart3,7);
                    }
                });
            },
            loadMonthThreeRateData() {
                getMonthThreeRateData(this.queryParams).then(result => {
                    if (result && 200 === result.code) {
                        let data = result.data;
                        this.initpmbottomChart(data);
                    }
                });
            },
            queryAqdflCqData(){
                getAqdflCqData(this.queryTableParams).then(response => {
                    this.perfmonTableData = [];
                    if (response.rows) {
                        this.perfmonTableData = response.rows;
                    }
                    this.perfmonTotal = response.total;
                })
            },
            queryZrdwBmyData(){
                getZrdwBmyData(this.queryTableParams).then(response => {
                    this.perfmonTableData = [];
                    if (response.rows) {
                        this.perfmonTableData = response.rows;
                    }
                    this.perfmonTotal = response.total;
                })
            },
            initsec1minChart(chartData) {
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
                        color: "#bbbbbb",
                        align: 'left',
                        fontSize: 22 * scale,
                    },
                };
                for (var i = 0; i < chartData.length; i++) {
                    total += chartData[i].num;
                    data.push({
                        value: chartData[i].num,
                        name: chartData[i].name,
                        yoy: chartData[i].yoy,
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
                    radius: [120, 105],
                    hoverAnimation: false,
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#ddd',
                        formatter: function (params) {
                            if (params.name !== '') {
                                return '{white|' + params.name + params.data.yoy + '}';
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
                                length2: 50,
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
                        text: this.workPerformanceData.firstYOY,
                        top: '35%',
                        textAlign: "center",
                        left: "50%",
                        textStyle: {
                            color: '#ebda55',
                            fontSize: 62,
                            fontWeight: '500',
                        },
                        subtext: '初件同比变化',
                        subtextStyle: {
                            textAlign: "center",
                            color: '#ffffff',
                            fontSize: 32
                        }
                    },
                    tooltip: {
                        show: false
                    },
                    toolbox: {
                        show: false
                    },
                    series: seriesOption
                };
                echarts.init(this.$refs.sec1minchart).setOption(option);
            },
            initsec2minChart(chartData,chartElement,num) {
                let zoneNameData = [];
                let cqbjNumData = [];
                let aqbjNumData = [];
                let aqdflData = [];
                for (let i = 0, len = num; i < len; i++) {
                    let rec = chartData[i];
                    zoneNameData.unshift(rec.name + rec.aqdfl);
                    cqbjNumData.unshift(rec.cqbjNum+rec.cqwbNum);
                    aqbjNumData.unshift(rec.aqbjNum);
                    aqdflData.unshift(rec.aqdfl);
                }
                let option = {
                    legend: {
                        top: '0',
                        right: '0',
                        textStyle: {
                            color: '#a4a8b4',
                            fontSize: 22,
                        },
                    },
                    grid: {
                        left: '0',
                        top: '8%',
                        right: '1%',
                        bottom: '1%',
                        containLabel: true
                    },
                    xAxis: {
                        show: false
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
                            fontSize: 26,
                            formatter: '{value}',
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
                            name: '按期件',
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
                                    offset: [-20, 4],
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
                            data: aqbjNumData
                        },
                        {
                            name: '超期件',
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
                                    offset: [20, 4],
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
                            data: cqbjNumData
                        }
                    ]
                };
                let chart = echarts.init(chartElement);
                chart.setOption(option);
            },
            initsect2chartOption(totalNum, secrt0chart, Colors, n) {
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
                    title: {
                        text: secrt0chart + '件',
                        top: '35%',
                        textAlign: "center",
                        left: "50%",
                        textStyle: {
                            color: '#ebda55',
                            fontSize: 62,
                            fontWeight: '500',
                        },
                        subtext: '重复件占比' + ((secrt0chart / totalNum) * 100).toFixed(2) + '%',
                        subtextStyle: {
                            textAlign: "center",
                            color: '#ffffff',
                            fontSize: 32
                        }
                    },
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
                                show: false
                            }
                        },
                        //中间圆环
                        {
                            name: 'Line 1',
                            type: 'pie',
                            clockWise: false, //顺时加载
                            hoverAnimation: false, //鼠标移入变大
                            center: ['50%', '50%'],
                            radius: ['100%', '90%'],
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
                            radius: ['100%', '100%'],
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
            initsect2chart(total, num) {
                echarts.init(this.$refs.sect2chart1).setOption(this.initsect2chartOption(total, num, ['#13add7', '#5f6542', '#e4d454']));
            },
            initsect2chart2(chartData,bdqRepeatTotal) {
                let data = [];
                if (chartData) {
                    data.push({
                        name: "国家重复件",
                        value: chartData.gjRepeatNum
                    }, {
                        name: "自治区重复件",
                        value: chartData.provinceNum
                    }, {
                        name: "本地市重复件",
                        value: bdqRepeatTotal
                    });
                }
                let arrValue = this.getArrayValue(data, "value");
                let sumValue = eval(arrValue.join('+'));
                let optionData = this.getData(data, sumValue);
                let option = {
                    // backgroundColor: '#000',
                    legend: {
                        show: false,
                    },
                    tooltip: {
                        show: true,
                        trigger: "item",
                        formatter: "{a}<br>{b}:{c}({d}%)"
                    },
                    color: [
                        {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#485341' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#e3d354' // 100% 处的颜色
                            }],
                        },
                        {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#0d6859' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#1ad385' // 100% 处的颜色
                            }],
                        },
                        {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#6e3b50' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#f8676e' // 100% 处的颜色
                            }],
                        },
                    ],
                    xAxis: [{
                        show: false
                    }],
                    series: optionData.series
                };

                echarts.init(this.$refs.sect2chart2).setOption(option)
            },
            getData(data, sumValue) {
                var res = {
                    series: [],
                    yAxis: []
                };
                for (let i = 0; i < data.length; i++) {
                    res.series.push({
                        name: '',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        width: '400',
                        height: '325',
                        radius: [75 - i * 15 + '%', 68 - i * 15 + '%'],
                        center: ["35%", "45%"],
                        Gap: '1%',
                        label: {
                            show: false
                        },
                        itemStyle: {
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false
                            },
                            borderWidth: 5,
                            borderRadius: '50%',
                        },
                        data: [{
                            value: data[i].value,
                            name: data[i].name
                        }, {
                            value: sumValue - data[i].value,
                            name: '',
                            radius: [180, 180],
                            itemStyle: {
                                color: "rgba(0,0,0,0)",
                                borderWidth: 0,
                            },
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        }]
                    });
                    res.yAxis.push((data[i].value / sumValue * 100).toFixed(2) + "%");
                }
                return res;
            },
            getArrayValue(array, key) {
                var key = key || "value";
                var res = [];
                if (array) {
                    array.forEach(function (t) {
                        res.push(t[key]);
                    });
                }
                return res;
            },
            initsect2chart3(chartData,chartElement,num) {
                let seriesdata = [];
                var batchData = [];
                //len = chartData.length
                for (let i = 0, len = num; i < len; i++) {
                    let rec = chartData[i];
                    batchData.push(rec.name);
                    seriesdata.push(rec.num);
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
                                color: '#34d0ff',
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
                                color: '#34d0ff',
                            }
                        },
                        axisLabel: {
                            fontSize: 26
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
                                    color: '#34d0ff',
                                    fontSize: '20'
                                },
                            },
                            data: seriesdata
                        }

                    ],
                    series: [{
                        name: 'barChart',
                        barWidth: 25,
                        type: 'bar',
                        zlevel: 2,
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                offset: [-10, 2],
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
                        itemStyle: {
                            normal: {
                                show: true,
                                // 设置每个圆柱的渐变色填充
                                color: 'rgb(0,162,255)',
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
                        data: seriesdata
                    },
                        {
                            name: '背景',
                            type: 'bar',
                            barWidth: 25,
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
                echarts.init(chartElement).setOption(option);
            },
            initsectionrt1chart(rate) {
                rate = rate ? rate.replace(/%/g, '') : 0;
                let data = [{name: '', value: rate || 0}];
                let option = {
                    tooltip: {
                        formatter: '{a} <br/>{b} : {c}%'
                    },
                    grid: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    },
                    series: [
                        {
                            name: '一次性化解率',
                            type: 'gauge',
                            radius: '95%',   // 设置仪表盘的半径
                            pointer: {
                                itemStyle: {
                                    color: 'auto'
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    width: 16,
                                    color: [
                                        [0.85, '#f56971'],
                                        [0.9, '#ebda55'],
                                        [1, '#1ad485']
                                    ],
                                }
                            },
                            anchor: {
                                show: true,
                                showAbove: true,
                                size: 30,
                                itemStyle: {
                                    // borderWidth: 10,
                                    color: 'auto'
                                }
                            },
                            itemStyle: {
                                // color: '#dc7180',
                            },
                            axisLabel: {
                                color: '#009cf8', // 设置刻度标签颜色
                            },
                            detail: {
                                offsetCenter: [0, '70%'],
                                valueAnimation: true,
                                formatter: function (value) {
                                    return '{value|' + value + '%}\n{unit|一次性化解率}';
                                },
                                rich: {
                                    value: {
                                        fontSize: 40,
                                        fontWeight: 'bolder',
                                        color: '#ffffff'
                                    },
                                    unit: {
                                        fontSize: 30,
                                        color: '#009cf8',
                                    }
                                }
                            },
                            axisTick: {            // 主刻度线
                                show: true,       // 默认为 true，表示是否显示。
                                length: 5,       // 刻度线长度
                                lineStyle: {      // 刻度线样式
                                    color: '#009cf8',    // 颜色，默认 'auto'，可以是回调函数。
                                    width: 2         // 宽度，默认 1。
                                }
                            },
                            splitLine: {           // 分隔线
                                show: true,       // 默认为 true，表示是否显示。
                                length: 10,       // 分隔线长度
                                lineStyle: {      // 分隔线样式
                                    color: '#009cf8',    // 颜色，默认 'auto'，可以是回调函数。
                                    width: 3         // 宽度，默认 1。
                                }
                            },
                            data: data
                        },
                    ]
                };
                echarts.init(this.$refs.sectionrt1chart).setOption(option);
            },
            initsectionrt2chart(chartData, chartElement, num ) {
                let zoneNameData = [];
                let myNumData = [];
                let bmyNumData = [];
                let cqwpjNumData = [];
                let wpjNumData = [];

                // 只取前 num 条数据
                for (let i = 0; i < Math.min(num, chartData.length); i++) {
                    let rec = chartData[i];
                    zoneNameData.unshift(rec.name + rec.zrdwmyl);
                    myNumData.unshift(rec.myNum);
                    bmyNumData.unshift(rec.bmyNum);
                    cqwpjNumData.unshift(rec.cqwpjNum);
                    wpjNumData.unshift(rec.wpjNum);
                }

                let option = {
                    legend: {
                        top: '0',
                        right: '0',
                        textStyle: {
                            color: '#a4a8b4',
                            fontSize: 24
                        },
                    },
                    grid: {
                        left: '0',
                        top: '8%',
                        right: '1%',
                        bottom: '1%',
                        containLabel: true
                    },
                    xAxis: {
                        show: false
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
                            color: '#34d0ff',
                            fontSize: 26
                        }
                    },
                    color: [
                        new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: 'rgb(26, 212, 133)'
                        }, {
                            offset: 1,
                            color: 'rgba(26, 212, 133,0)'
                        }]),
                        new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: 'rgb(251,104,111)'
                        }, {
                            offset: 1,
                            color: 'rgba(251,104,111,0)'
                        }]),
                        new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: 'rgb(235, 218 ,85)'
                        }, {
                            offset: 1,
                            color: 'rgba(235 ,218 ,85,0)'
                        }])
                    ],
                    series: [
                        {
                            name: '满意件',
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
                            data: myNumData
                        },
                        {
                            name: '不满意件',
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
                                    offset: [-20, 0],
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
                            data: bmyNumData
                        },
                        {
                            name: '超期未评价件',
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
                                    offset: [20, 0],
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
                            data: cqwpjNumData
                        }
                    ]
                };

                let chart = echarts.init(chartElement);
                chart.setOption(option);
            },

            initpmbottomChart(chartData) {
                let xfbmsllData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                let zrdwmylData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                let aqdflData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                if (chartData && chartData.xfbmsllList) {
                    let chartAqdflList = chartData.aqdflList;
                    let chartMonthData = chartData.xfbmsllList;
                    let zrdwmylList = chartData.zrdwmylList;
                    for (let i = 0, len = chartMonthData.length; i < len; i++) {
                        let rec = chartMonthData[i];
                        let index = parseInt(rec.mon) - 1;
                        xfbmsllData[index] = rec.xfbmsll.replace(/%/g, '');
                        zrdwmylData[index] = zrdwmylList[i] ? zrdwmylList[i].zrdwmyl.replace(/%/g, '') : 0;
                        aqdflData[index] = chartAqdflList[i] ? chartAqdflList[i].replace(/%/g, '') : 0;
                    }
                }
                let option = {
                    legend: {
                        icon: 'circle',
                        top: 0,
                        right: 150,
                        itemWidth: 6,
                        itemGap: 20,
                        textStyle: {
                            color: '#20c2f3',
                            fontSize : 20
                        }
                    },
                    grid: {
                        top: 30,
                        left: 40,
                        right: 80,
                        bottom: 50,
                    },
                    xAxis: {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisLabel: {
                            color: '#20c2f3',
                            fontSize: 20,
                        }
                    },
                    yAxis: [{
                        type: 'value',
                        min: 50,
                        max: 100,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba( 33, 142, 168, 0.302 )'
                            }
                        },
                        axisLabel: {
                            color: '#20c2f3',
                        }
                    }],
                    series: [
                        {
                            name: '信访机构及时受理率(%)',
                            data: xfbmsllData,
                            type: 'line',
                            symbolSize: 10,
                            symbol: 'circle',
                            smooth: true,
                            yAxisIndex: 0,
                            showSymbol: true,
                            color: '#ebda55'
                        },
                        {
                            name: '按期答复率(%)',
                            data: aqdflData,
                            type: 'line',
                            symbolSize: 10,
                            symbol: 'circle',
                            smooth: true,
                            yAxisIndex: 0,
                            showSymbol: true,
                            color: '#ef656e'
                        },
                        {
                            name: '责任单位满意率(%)',
                            data: zrdwmylData,
                            type: 'line',
                            symbolSize: 10,
                            symbol: 'circle',
                            smooth: true,
                            yAxisIndex: 0,
                            showSymbol: true,
                            color: '#20c2f3'
                        }
                    ]
                };
                echarts.init(this.$refs.pmbottom).setOption(option);
            },
            opencity(){
                this.dfpVisible=true;
                this.$nextTick(() => {
                    this.initsec2minChart(this.topcitydate,this.$refs.sec2minchart1 ,this.topcitydate.length);
                });
            },
        },
        computed:{

        }
    }
</script>

<style scoped lang="scss">
  p {
    margin: 0
  }

  $ft-color: #34d0ff;
  $ft-yel: #ebda55;
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

          .sec1minchart {
            height: 470px;
            width: 100%;
          }
        }
      }

      .section {
        width: 1500px;
        margin: 155px 100px 0 100px;
        display: inline-block;
        vertical-align: top;

        .section-1 {
          display: inline-block;
          width: 560px;

          .seclist {
            height: 145px;
            background: url("../../../assets/images/szbackgd.png");
            background-size: 100% 100%;
            margin-bottom: 10px;

            p {
              color: rgb(32, 194, 243);
              height: 50px;
              line-height: 50px;
              padding: 0 10px;

              span {
                color: $ft-yel;
                font-size: 32px;
              }

              span:last-child {
                color: rgb(32, 194, 243);
                float: right;
                font-size: 22px;
              }
            }
            P:last-child{
                height: 100px;
                line-height: 100px;
            }
            p:first-child {
              border-radius: 2px;
              background-image: -webkit-linear-gradient(0deg, rgba(6, 178, 227, 0.3098) 0%, rgba(4, 186, 237, 0.302) 100%);
              font-size: 32px;
            }
          }
        }

        .section-2 {
          width: 300px;
          height: 300px;
          padding: 60px 0;
          background: url("../../../assets/images/bljx.png");
          background-size: 100%;
          margin: 0 40px;
          margin-top: 65px;
          text-align: center;
          vertical-align: top;
          font-size: 30px;
          color: $ft-color;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          p {
            span {
              color: white;
              font-family: $sz-font-family;
              font-size: 58px;
            }
          }

          p:nth-child(2) {
            background-color: #0097ee;
            padding: 0 20px;
            border-radius: 20px;
            display: inline-block;
            color: white;
            margin-bottom: 10px;
          }

          //p:nth-child(4) {
          //  background-color: #0097ee;
          //  padding: 0 20px;
          //  border-radius: 20px;
          //  display: inline-block;
          //  color: white;
          //}
        }

        .sect2 {
          width: 100%;
          height: 470px;

          .sect2chart {
            display: inline-block;
            height: 100%;
            width: 50%;
            position: relative;

            .charttip {
              position: absolute;
              color: $ft-color;
              font-size: 24px;
              top: 13px;
              right: 235px;

              p {
                margin: 0;
                font-family: $sz-font-family;

                span {
                  color: $ft-yel;
                  font-size: 30px;
                  display: inline-block;
                  min-width: 30px;
                }
              }

              p:nth-child(2) span {
                color: #1ad485;
              }

              p:nth-child(3) span {
                color: #fb686f;
              }
            }
          }

          .sect2chart:last-child {
            padding-left: 50px;
            width: 50%;
          }
        }
      }

      .sectionrt {
        width: 968px;
        display: inline-block;
        vertical-align: top;
        margin-top: 142px;

        .sectionrt1chart {
          width: 470px;
          height: 470px;
          display: inline-block;
        }

        .sectionrt1list {
          display: inline-block;
          width: 465px;
          margin-left: 30px;
          vertical-align: top;

          p {
            color: $ft-color;
            font-size: 24px;
            height: 50px;
            line-height: 50px;
            margin-bottom: 10px;

            padding-left: 15px;
            background-color: rgba(25, 54, 98, 0.38);
            border-left: 5px solid;

            span {
              float: right;
              padding-right: 10px;
            }
          }
        }

        .sectionrt2chart {
          width: 100%;
          height: 470px;
        }
      }
    }

    .pmbottom {
      //padding: 0 115px;
      height: 440px;
    }
  }
</style>
<style lang="scss">
    .detailtable{
        margin-top: 15vh !important;
        border: 1px solid rgb( 18, 121, 203 );
        border-top: 5px solid #20c2f3;
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
        .el-dialog__body{
            padding: 30px 10px;
            .el-table, .el-table .el-table__header-wrapper th , .el-table tr {
                background: none;
                color: #34d0ff;
                border-bottom: 0;
            }
            .el-table .el-table__header-wrapper th{
                color: white;
                font-size: 24px;
                text-align: center;
                font-weight: 400;
            }
            .el-table__header-wrapper{
                background: none;
            }
            .el-table td.el-table__cell{
                border-bottom: 0;
                line-height: 30px;
                text-align: center;
            }
            .el-table{
                font-size: 20px;
                .el-table::before{
                    display: none;
                }
                .cellcolor1{
                    color: #ebda55;
                }.cellcolor2{
                     color: #1ad485;
                 }
                .el-table__body-wrapper{

                }
            }
            .el-table::before{
                display: none;
            }
            .pagination-container{
                background: none;
                span{
                    color: white;
                }
            }
        }
        .sectionrt2charttc{
            width: 100%;
            height: 550px;
        }

        .sectionrt1list {
            display: inline-block;
            width: 430px;
            margin-left: 30px;
            vertical-align: top;

            p {
                color: #34d0ff;
                font-size: 18px;
                height: 33px;
                line-height: 33px;
                margin-bottom: 3px;

                padding-left: 15px;
                background-color: rgba(25, 54, 98, 0.38);
                border-left: 5px solid;

                span {
                    float: right;
                    padding-right: 10px;
                }
            }
        }
    }
</style>
