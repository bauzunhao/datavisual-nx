<template>
    <div class="home">
        <datavhead></datavhead>
        <div class="cont">
            <div class="sectionleft">
                <div class="sec1-nav" style="white-space: nowrap;">
                    <router-link to="/"><img src="../../../assets/images/general-home.png" alt=""></router-link>
                    <ul>
                        <li @click="openDialong()"><span>导航</span></li>
                        <li>
                            <router-link to="/datav/leader"><span>领导包案</span></router-link>
                        </li>
                        <li>
                            <router-link to="/datav/priorities"><span>接访下访</span></router-link>
                        </li>
                        <li>
                            <router-link to="/datav/focusmatter"><span>重点事项</span></router-link>
                        </li>
                        <li>
                            <router-link to="/datav/example"><span>示范区县</span></router-link>
                        </li>
                    </ul>
                </div>
                <div class="sec1-min">
                    <p class="minp ft30">
                        重点事项监测件
                        {{ this.focusData.total }}件（来访：{{ this.focusData.lfNum }}、来信：{{ this.focusData.lxNum }}、网投：{{ this.focusData.wsNum }}），越级访{{ this.focusData.aboveNum }}件、重复访{{ this.focusData.repeatLfNum }}件、进京访{{ this.focusData.nationLfNum }}件、（今日办结{{ this.toDayEnd }}件）。
                    </p>

                    <div class="slist">
                        <p class="slistp">国家件</p>
                        <div>
                            <p><span>{{ this.focusData.nationalEndNum }}/{{ this.focusData.nationalNum }}</span><span>办结/总量</span>
                            </p>
                        </div>
                    </div>
                    <div class="slist">
                        <p class="slistp">自治区件</p>
                        <div>
                            <p><span>{{ this.focusData.provinceEndNum }}/{{ this.focusData.provinceNum }}</span><span>办结/总量</span>
                            </p>
                        </div>
                    </div>
                    <div class="slist">
                        <p class="slistp">全地市件</p>
                        <div>
                            <p><span>{{ this.loaclAllData.localEndNum }}/{{ this.loaclAllData.localNum }}</span><span>办结/总量</span>
                            </p>
                        </div>
                    </div>
                    <div class="slist">
                        <p class="slistp">办理率</p>
                        <div>
                            <p><span>{{ this.focusData.bll }}</span><span></span></p>
                        </div>
                    </div>

                </div>
            </div>
            <div class="section">
                <div class="sectionfelx">
                    <div class="sectionlist">
                        <div class="listleft">
                            <div class="leftp">
                                <p>国家局</p>
                            </div>
                            <ul>
                                <li><p>来信：{{ this.nationalData.nationalLxNum }}件{{ this.nationalData.nationalLxRc }}人次
                                    正在办理中
                                    <span>{{ this.nationalData.nationalLxblzNum }}件</span>，超期件<span>{{ this.nationalData.nationalLxcqNum }}件</span>
                                </p></li>
                                <li><p>来访：{{ this.nationalData.nationalLfNum }}件{{ this.nationalData.nationalLfRc }}人次
                                    正在办理中
                                    <span>{{ this.nationalData.nationalLfblzNum }}件</span>，超期件<span>{{ this.nationalData.nationalLfcqNum }}件</span>
                                </p></li>
                                <li><p>网投：{{ this.nationalData.nationalWsNum }}件{{ this.nationalData.nationalWsRc }}人次
                                    正在办理中
                                    <span>{{ this.nationalData.nationalWsblzNum }}件</span>，超期件<span>{{ this.nationalData.nationalWscqNum }}件</span>
                                </p></li>
                            </ul>
                        </div>
                        <div class="listrt">
                            <h3>办理情况</h3>
                            <div class="rtli" ref="nationalScrollContainer">
                                <p v-for="gjData in nationalDataList">
                                    <span>{{ gjData.letterCode }}</span> <span>{{ gjData.letterTypeName }}</span>
                                    <span>{{ gjData.zoneName }}</span><span
                                    :title="gjData.lastHandledUnitName">{{ gjData.lastHandledUnitName }}</span>
                                    <span v-if="!gjData.cqType"></span>
                                    <span class="back1"
                                          v-for="cqData in gjData.cqType">{{ (1 === cqData || 3 === cqData) ? "受理已超期" : (2 === cqData || 4 === cqData) ? "受理即将超期" : 5 === cqData ? "办理已超期" : "办理即将超期" }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="sectionlist">
                        <div class="listleft">
                            <div class="leftp">
                                <p>本地区</p>
                            </div>
                            <ul>
                                <li><p>来信：{{ this.localData.localLxNum }}件{{ this.localData.localLxRc }}人次 正在办理中
                                    <span>{{ this.localData.localLxblzNum }}件</span>，超期件<span>{{ this.localData.localLxcqNum }}件</span>
                                </p></li>
                                <li><p>来访：{{ this.localData.localLfNum }}件{{ this.localData.localLfRc }}人次 正在办理中
                                    <span>{{ this.localData.localLfblzNum }}件</span>，超期件<span>{{ this.localData.localLfcqNum }}件</span>
                                </p></li>
                                <li><p>网投：{{ this.localData.localWsNum }}件{{ this.localData.localWsRc }}人次 正在办理中
                                    <span>{{ this.localData.localWsblzNum }}件</span>，超期件<span>{{ this.localData.localWscqNum }}件</span>
                                </p></li>
                            </ul>
                        </div>
                        <div class="listrt">
                            <h3>办理情况</h3>
                            <div class="rtli" ref="localScrollContainer">
                                <p v-for="bdqData in localDataList">
                                    <span>{{ bdqData.letterCode }}</span> <span>{{ bdqData.letterTypeName }}</span>
                                    <span>{{ bdqData.zoneName }}</span><span
                                    :title="bdqData.lastHandledUnitName">{{ bdqData.lastHandledUnitName }}</span>
                                    <span v-if="!bdqData.cqType"></span>
                                    <span class="back1"
                                          v-for="localCq in bdqData.cqType">{{ (1 == localCq || 3 == localCq) ? "受理已超期" : (2 == localCq || 4 == localCq) ? "受理即将超期" : 5 == localCq ? "办理已超期" : "办理即将超期" }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="sectionlist">
                        <div class="listleft">
                            <div class="leftp">
                                <p>本机构</p>
                            </div>
                            <ul>
                                <li><p>来信：{{ this.orgData.orgLxNum }}件{{ this.orgData.orgLxRc }}人次 正在办理中
                                    <span>{{ this.orgData.orgLxblzNum }}件</span>，超期件<span>{{ this.orgData.orgLxcqNum }}件</span>
                                </p></li>
                                <li><p>来访：{{ this.orgData.orgLfNum }}件{{ this.orgData.orgLfRc }}人次 正在办理中
                                    <span>{{ this.orgData.orgLfblzNum }}件</span>，超期件<span>{{ this.orgData.orgLfcqNum }}件</span>
                                </p></li>
                                <li><p>网投：{{ this.orgData.orgWsNum }}件{{ this.orgData.orgWsRc }}人次 正在办理中
                                    <span>{{ this.orgData.orgWsblzNum }}件</span>，超期件<span>{{ this.orgData.orgWscqNum }}件</span>
                                </p></li>
                            </ul>
                        </div>
                        <div class="listrt">
                            <h3>办理情况</h3>
                            <div class="rtli" ref="orgScrollContainer">
                                <p v-for="bjgData in orgDataList">
                                    <span>{{ bjgData.letterCode }}</span> <span>{{ bjgData.letterTypeName }}</span>
                                    <span>{{ bjgData.zoneName }}</span><span
                                    :title="bjgData.lastHandledUnitName">{{ bjgData.lastHandledUnitName }}</span>
                                    <span v-if="!bjgData.cqType"></span>
                                    <span class="back1" v-for="cqData in bjgData.cqType">{{ (1 == cqData || 3 == cqData) ? "受理已超期" : (2 == cqData || 4 == cqData) ? "受理即将超期" : 5 == cqData ? "办理已超期" : "办理即将超期" }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sectionrt">
                <div class="secrt-0 mabt70">
                  <h3>专项件积案化解率办结率</h3>
                  <div class="secrt-0chart" ref="srt0chart"></div>
                </div>
                  <div class="secrt-0">
                      <h3>第四批专项件地市分布 <span style="float: right;font-size: 32px;cursor: pointer;line-height: 40px;" @click="openzxjdl()">全部>></span></h3>
                      <div class="secrt-0chart" ref="srt1chart"></div>
                  </div>
            </div>
        </div>
        <DialogNav ref="DialogNav"></DialogNav>

        <el-dialog
            :visible.sync="zxjVisible"
            width="1600px"
            custom-class="detailtable"
            title="第四批专项件地市分布"
            :before-close="morevisClose">
            <div   style="width: 100%;height: 400px;" ref="srt1chartdl">
            </div>
        </el-dialog>
    </div>
</template>

<script>
import datavhead from '@/components/DatavHead/index'
import DialogNav from '@/components/DialogNav/index'
import {
    getFocusData,
    getToDayEndFocusData,
    getFocusNumByNationalData,
    getFocusNumByLocalData,
    getFocusNumByOrgData,
    getFocusHandleByNationalData,
    getFocusHandleByLocalData,
    getFocusHandleByOrgData,
} from '@/api/datav/focusmatter/focusmatter';
import * as echarts from 'echarts'
import {
    getRepeatPetitionPerson,
    getSpecialItemBatchData,
    getSpecialThirdBatchByZone
} from '@/api/datav/priorities/repetition'

export default {
    name: "DataVFocusMatter",
    data() {
        return {
            focusData: {},
            zxjVisible: false,
            loaclAllData: {},
            toDayEnd: 0,
            nationalData: {},
            localData: {},
            orgData: {},
            nationalDataList: [],
            localDataList: [],
            orgDataList: []
        }
    },
    mounted() {
        this.$modal.loading("");
        this.queryFocusData();
        this.queryToDayEndFocusData();
        this.queryFocusNumByNationalData();
        this.queryFocusNumByLocalData();
        this.queryFocusNumByOrgData();
        this.queryFocusHandleByNationalData();
        this.queryFocusHandleByLocalData();
        this.queryFocusHandleByOrgData();
        this.loadSpecialItemBatchData();
        this.loadSpecialThirdBatchByZone();

    },
    components: {'datavhead': datavhead, 'DialogNav': DialogNav},
    methods: {
        morevisClose(done){
            done()
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
        loadSpecialThirdBatchByZone() {
            getSpecialThirdBatchByZone(this.queryParams).then(result => {
                if (result) {
                    this.srt1chartdata = this.ignoreCityData(result, "zoneName");
                }
                this.initsecrt1Chart(this.srt1chartdata,this.$refs.srt1chart,5);
            });
        },
        initsecrt0Chart(chartData) {
            var batchData = [];
            let seriesdata = [];
            if (chartData) {
                batchData.push("第一批");
                batchData.push("第二批");
                batchData.push("第三批");
                batchData.push("第四批");
                seriesdata.push((chartData.firstBatchNum ? ((chartData.firstBatchEndNum / chartData.firstBatchNum) * 100).toFixed(2) : 0) + "%");
                seriesdata.push((chartData.secondBatchNum ? ((chartData.secondBatchEndNum / chartData.secondBatchNum) * 100).toFixed(2) : 0) + "%");
                seriesdata.push((chartData.thirdBatchNum ? ((chartData.thirdBatchEndNum / chartData.thirdBatchNum) * 100).toFixed(2) : 0) + "%");
                seriesdata.push((chartData.fourthBatchNum ? ((chartData.fourthBatchEndNum / chartData.fourthBatchNum) * 100).toFixed(2) : 0) + "%");
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
                        fontSize : 24
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
                        fontSize : 24,
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
        openzxjdl(){
            this.zxjVisible = true;
            this.$nextTick(()=>{
                this.initsecrt1Chart(this.srt1chartdata,this.$refs.srt1chartdl,this.srt1chartdata.length);
            })
        },
        queryFocusData() {
            getFocusData().then(response => {
                if (response.data) {
                    if (response.data.focusData) {
                        this.focusData = response.data.focusData;
                    }
                    if (response.data.loaclData) {
                        this.loaclAllData = response.data.loaclData;
                    }
                }
            })
        },
        queryToDayEndFocusData() {
            getToDayEndFocusData().then(response => {
                if (response.data && response.data.endNum) {
                    this.toDayEnd = response.data.endNum;
                }
            })
        },
        queryFocusNumByNationalData() {
            getFocusNumByNationalData().then(response => {
                if (response.data) {
                    this.nationalData = response.data;
                }
            })
        },
        queryFocusNumByLocalData() {
            getFocusNumByLocalData().then(response => {
                if (response.data) {
                    this.localData = response.data;
                }
            })
        },
        queryFocusNumByOrgData() {
            getFocusNumByOrgData().then(response => {
                if (response.data) {
                    this.orgData = response.data;
                }
            })
        },
        queryFocusHandleByNationalData() {
            getFocusHandleByNationalData().then(response => {
                if (response.data) {
                    this.nationalDataList = response.data;
                    this.startScroll(this.$refs.nationalScrollContainer);
                }
            })
        },
        queryFocusHandleByLocalData() {
            getFocusHandleByLocalData().then(response => {
                if (response.data) {
                    this.localDataList = response.data;
                    this.startScroll(this.$refs.localScrollContainer);
                }
            })
        },
        queryFocusHandleByOrgData() {
            getFocusHandleByOrgData().then(response => {
                if (response.data) {
                    this.orgDataList = response.data;
                    this.startScroll(this.$refs.orgScrollContainer);
                }
                this.$modal.closeLoading();
            })
        },
        openDialong() {
            this.$refs.DialogNav.handldOpen();
        },
        startScroll(scrollContainer) {
            // 定义滚动间隔时间（单位：毫秒）和每次滚动的距离
            const intervalTime = 100; // 100毫秒
            const scrollDistance = 1; // 每次滚动1个像素
            // 使用setInterval方法每隔一段时间执行一次scroll方法，实现自动滚动效果
            setInterval(() => {
                // 如果滚动到底部，重新开始滚动
                if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
                    scrollContainer.scrollTop = 0; // 滚动到顶部
                } else {
                    scrollContainer.scrollTop += scrollDistance; // 向下滚动一定距离
                }
            }, intervalTime);
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
                position: relative;
                padding-top: 32px;
                height: 1600px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .minp {
                    position: absolute;
                    color: $ft-color;
                    white-space: nowrap;
                    top: 0;
                    left: 0;
                    width: 2900px;
                    span {
                        float: right;
                    }

                    span:first-child {
                        color: #ebda55;
                    }
                }

                .slist {
                    font-size: 40px;
                    color: $ft-color;
                    margin-top: 40px;

                    .slistp {
                        background-image: linear-gradient(268deg, rgba(6, 178, 227, 0.5) 0%, rgba(4, 186, 237, .2) 100%);
                        line-height: 100px;
                        height: 100px;
                        padding: 0 25px;
                    }

                    div {
                        height: 140px;
                        line-height: 140px;
                        font-size: 40px;
                        color: $ft-color;
                        padding: 0 25px;
                        background: rgba(7, 48, 79, 0.3);

                        span:first-child {
                            font-size: 60px;
                            font-family: $sz-font-family;
                            color: #f9686f;
                        }

                        span:last-child {
                            float: right;
                        }
                    }
                }

                .slist:nth-child(3) {
                    div span:first-child {
                        color: #ebda55;
                    }
                }

                .slist:nth-child(4) {
                    div span:first-child {
                        color: #16b279;
                    }
                }

                .slist:nth-child(5) {
                    div span:first-child {
                        color: $ft-color;
                    }
                }
            }
        }

        .section {
            display: inline-block;
            width: 1960px;
            vertical-align: top;
            margin-left: 50px;
            margin-top: 220px;
            height: 1600px;
            .sectionfelx{
                display: flex;
                height: 100%;
                flex-direction: column;
                -webkit-box-pack: justify;
                justify-content: space-between;
            }
            .sectionlist {
                height: 430px;
                margin-bottom: 20px;
                width: 1961px;
                background: rgba(25, 54, 98, .3);
                padding: 83px 0 ;
                .listleft {
                    padding: 40px 50px;
                    //width: 940px;
                    display: inline-block;
                    overflow: hidden;
                    border-right: 2px dashed rgb(32, 87, 153);;

                    .leftp {
                        display: inline-block;

                        p {
                            height: 166px;
                            width: 166px;
                            border: 5px solid #f9686f;
                            border-radius: 50%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 35px;
                            color: #f9686f;
                        }
                    }

                    ul {
                        display: inline-block;
                        vertical-align: top;
                        margin: 0;
                        padding-left: 50px;

                        li {
                            font-size: 26px;
                            color: $ft-color;
                            line-height: 55px;

                            p {
                                color: $ft-color;

                                span {
                                    color: #ebda55;
                                }

                                span:last-child {
                                    color: #f9686f;
                                }
                            }
                        }
                    }

                }

                .listrt {
                    width: 1128px;
                    display: inline-block;
                    vertical-align: top;
                    padding-top: 30px;
                    padding-left: 10px;

                    .rtli {
                        color: $ft-color;
                        font-size: 24px;
                        height: 150px;
                        overflow: auto;
                        padding-right: 50px;

                        p {
                            margin-bottom: 10px;

                            span:first-child {
                                width: 200px;
                            }

                            span {
                                display: inline-block;
                                width: 120px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                margin-left: 10px;
                            }

                            .back1 {
                                color: white;
                                padding: 0 10px;
                                height: 38px;
                                line-height: 38px;
                                border-radius: 5px;
                                display: inline-block;
                                width: 165px;
                                text-align: center;
                                float: right;
                            }
                        }

                        .back1 {
                            background-color: #6a4058;
                        }

                        .back2 {
                            background-color: #13638c;
                        }
                    }

                    .rtli::-webkit-scrollbar-track {
                        background-color: #122a4e;
                    }

                    .rtli::-webkit-scrollbar-thumb {
                        background-color: #1379ca;
                    }
                }
            }

            .sectionlist:nth-child(2) .listleft .leftp p {
                color: #ebda55;
                border-color: #ebda55;
            }

            .sectionlist:nth-child(3) .listleft .leftp p {
                color: #16b279;
                border-color: #16b279;
            }
        }

        .sectionrt {
            width: 612px;
            display: inline-block;
            vertical-align: top;
            margin-top: 210px;
            margin-left: 50px;

            .secrt-0 {
                margin-top: 15px;
                width: 100%;

                .secrt-0chart {
                    height: 670px;
                    width: 100%;
                }

                .secrt-1chart {
                    height: 170px;
                    width: 220px;
                    display: inline-block;
                }
            }
        }
    }
}
</style>
