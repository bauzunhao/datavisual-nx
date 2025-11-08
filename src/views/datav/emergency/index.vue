<template>
    <div class="home">
        <datavhead></datavhead>
        <div class="cont">
            <div class="sectionleft">
                <div class="sec1-nav">
                    <router-link to="/"><img src="../../../assets/images/general-home.png" alt=""></router-link>
                    <ul>
                        <li @click="openDialong()"><span>导航</span></li>
                        <li><span>风险播报</span></li>
                        <li><router-link to="/datav/linkage"><span>联动指挥</span></router-link></li>
                        <li><router-link to="/datav/publicityv"><span>宣传教育</span></router-link></li>
                    </ul>
                </div>
                <div class="sec1list">
                    <h3>风险监测预警分布</h3>
                    <div class="slist" v-for="rec in this.eventZoneData">
                        <p class="slistp">{{ rec.zoneName }}<span>{{ rec.total }}<i>个</i></span></p>
                        <div>
                            <p><span></span>{{ rec.num1 }}个</p>
                            <p><span></span>{{ rec.num2 }}个</p>
                            <p><span></span>{{ rec.num3 }}个</p>
                            <p><span></span>{{ rec.num4 }}个</p>
                            <p><span></span>{{ rec.num5 }}个</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="section-1 mabt70">
                    <h3>风险事件分布</h3>
                    <genpie-chart class="sectionmap" ref="child" v-if="this.eventZoneData" :message="this.eventZoneData" :height="1000" viewType="emergencyEvent"></genpie-chart>
                </div>
                <div class="section-2">
                    <div class="sec2min1">
                        <h3>风险事项分类</h3>
                        <div class="sec2min1list">
                            <p v-for="(rec, index) in this.eventContentTypeData">
                                <span>{{ index + 1 }}</span>{{ rec.contentTypeName }}
                            </p>
                        </div>
                        <div class="sec2min1chart" ref="sec2min1chart"></div>
                    </div>
                    <div class="sec2min2">
                        <h3>风险事项形式</h3>
                        <div class="min2">
                            <div class="min2chart" ref="min2chart"></div>
                            <div class="charttip">
                                <p><i></i>来信<span>{{ this.eventLetterTypeData.num1 }}</span>占比{{ ((this.eventLetterTypeData.num1 / this.eventLetterTypeData.total) * 100).toFixed(2) }}%</p>
                                <p><i></i>来访<span>{{ this.eventLetterTypeData.num2 }}</span>占比{{ ((this.eventLetterTypeData.num2 / this.eventLetterTypeData.total) * 100).toFixed(2) }}%</p>
                                <p><i></i>网投<span>{{ this.eventLetterTypeData.num3 }}</span>占比{{ ((this.eventLetterTypeData.num3 / this.eventLetterTypeData.total) * 100).toFixed(2) }}%</p>
                            </div>
                        </div>
                        <h3>已处理风险事项</h3>
                        <div class="min3">
                            <p v-for="rec in this.eventResultData">{{ rec.name }}<span>{{ rec.value }}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sectionrt">
                <div class="secrt-1 mabt70">
                    <h3>风险统计</h3>
                    <div class="sihead">
                        <div class="headli">
                            <div>
                                <p>本日</p>
                                <p class="colorred">{{ this.eventSummaryData.num1 }}</p>
                            </div>
                        </div>
                        <div class="headli">
                            <div>
                                <p>本月</p>
                                <p class="coloryel">{{ this.eventSummaryData.num2 }}</p>
                            </div>
                        </div>
                        <div class="headli">
                            <div>
                                <p>本年度</p>
                                <p class="colorgreen">{{ this.eventSummaryData.num3 }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="secrt-2">
                    <h3>风险播报</h3>
                    <div class="secrt-2list">
                        <ul ref="scrollContainer">
                            <li v-for="rec in this.eventList">
                                <router-link target="_blank" :to="{path: '/datav/linkage', query: {eventId: rec.eventId}}">
                                    <span class="backcolor1">{{ rec.ruleName }}</span><span> {{ rec.name }}在{{ rec.zoneName }}发生风险事件</span><span>{{ rec.createTime }}</span>
                                </router-link>
                            </li>
                        </ul>
                        <div class="detail" @click="openEventListDetailDialog">详情 ></div>
                    </div>
                </div>
            </div>
        </div>
        <DialogNav ref="DialogNav"></DialogNav>
        <el-dialog
            :visible.sync="eventListDialog"
            width="1600px"
            custom-class="detailtable"
            title="风险事件列表"
            :before-close="closeEventListDetailDialog">
            <el-table :data="this.eventList" height="500">
                <el-table-column label="序号" type="index" width="50"/>
                <el-table-column label="信访人" width="120" align="center" prop="name"/>
                <el-table-column label="信访件编号" width="140" align="center" prop="letterCode"/>
                <el-table-column label="信访人联系电话" width="140" align="center" prop="mobile"/>
                <el-table-column label="属地" width="200" align="center" prop="zoneName"/>
                <el-table-column label="信访日期" width="140" align="center" prop="receiveTime"/>
                <el-table-column label="发现时间" width="160" align="center" prop="createTime"/>
                <el-table-column label="事件级别" width="80" align="center" prop="customLevel">
                    <template slot-scope="scope">{{eventLevelList[scope.row.customLevel]}}</template>
                </el-table-column>
                <el-table-column label="处理结果" width="160" align="center" prop="resultStatus">
                    <template slot-scope="scope">{{resultStatusList[scope.row.resultStatus] || '进行中'}}</template>
                </el-table-column>
                <el-table-column label="风险规则名称" align="center" prop="ruleName"/>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-service" v-if="!scope.row.resultStatus">
                            <router-link target="_blank" :to="{path: '/datav/linkage', query: {eventId: scope.row.eventId}}">联动指挥</router-link>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import DialogNav from '@/components/DialogNav/index';
import datavhead from '@/components/DatavHead/index';
import * as echarts from 'echarts';
import genpieChart from '@/views/datav/petition/genpieChart';
import {
    getSummaryData,
    getContentType,
    getLetterType,
    getEventResult,
    getStatisByTime,
    getEventList
} from '@/api/datav/emergency/event';

export default {
    name: "DataV-Emergency-Event",
    components: {'DialogNav': DialogNav, 'datavhead': datavhead, 'genpieChart': genpieChart},
    data() {
        return {
            eventListDialog: false,
            eventZoneData: [],
            eventContentTypeData: [],
            eventLetterTypeData: {
                total: 0, // 总量
                num1: 0, // 来信
                num2: 0, // 来访
                num3: 0 // 网投
            },
            eventLevelList: ['全部', '一级', '二级', '三级', '四级', '五级'],
            resultStatusList: ['', '转领导包案', '推进化解', '已经稳控'],
            eventResultData: [
                {name: "转领导包案", value: 0},
                {name: "推进化解", value: 0},
                {name: "已经稳控", value: 0}
            ],
            eventSummaryData: {
                num1: 0, // 今日
                num2: 0, // 今月
                num3: 0 // 今年
            },
            eventList: []
        }
    },
    mounted() {
        this.loadAllEventData();
    },
    methods: {
        openEventListDetailDialog() {
            this.eventListDialog = true
        },
        closeEventListDetailDialog() {
            this.eventListDialog = false
        },
        openDialong() {
            this.$refs.DialogNav.handldOpen();
        },
        loadAllEventData() {
            this.loadEventSummaryData();
            this.loadEventContentType();
            this.loadEventLetterType();
            this.loadEventResult();
            this.loadEventStatis();
            this.loadEventList();
        },
        loadEventSummaryData() {
            getSummaryData().then(result => {
                if (result && 200 === result.code) {
                    let data = result.data;
                    this.eventZoneData = this.ignoreCityData(data, "zoneName");
                    //加载地图数据
                    setTimeout(() => {
                        this.$refs.child.initmap();
                    }, 1000);
                }
            });
        },
        loadEventContentType() {
            getContentType().then(result => {
                if (result && 200 === result.code) {
                    let data = result.data;
                    this.eventContentTypeData = data;
                    this.initsec2min1chart();
                }
            });
        },
        loadEventLetterType() {
            getLetterType().then(result => {
                if (result && 200 === result.code) {
                    let data = result.data;
                    this.eventLetterTypeData = data;
                    this.initmin2chart();
                }
            });
        },
        loadEventResult() {
            getEventResult().then(result => {
                if (result && 200 === result.code) {
                    let data = result.data;
                    for (let i = 0, len = data.length; i < len; i++) {
                        let rec = data[i];
                        let index = rec.resultStatus - 1;
                        this.eventResultData[index].value = rec.total;
                    }
                }
            });
        },
        loadEventStatis() {
            getStatisByTime().then(result => {
                if (result && 200 === result.code) {
                    let data = result.data;
                    this.eventSummaryData = data;
                }
            });
        },
        loadEventList() {
            let query = {timeMark: "2"};
            getEventList(query).then(result => {
                if (result && 200 === result.code) {
                    let data = result.data;
                    this.eventList = data;
                    this.autoScrollTop(this.$refs.scrollContainer);
                }
            });
        },
        initsec2min1chart() {
            let data = [];
            for (let i = 0, len = this.eventContentTypeData.length; i < len; i++) {
                let rec = this.eventContentTypeData[i];
                data.push({name: rec.contentTypeName, value: rec.total});
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
                    right: '50',
                    bottom: '50',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    show: false,
                },
                yAxis: {
                    type: 'category',
                    data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    show: false,
                    inverse: true,
                },
                series: [{
                    name: 'barChart',
                    barWidth: 20,
                    type: 'bar',
                    zlevel: 2,
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            offset: [20, 2],
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
                            color: function (params) {
                                if (params.dataIndex === 0) {
                                    return {
                                        type: 'linear',
                                        colorStops: [{
                                            offset: 0,
                                            color: 'rgba(251,104,111,.3)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(251,104,111,1)'
                                        }],
                                    };
                                }
                                if (params.dataIndex === 2) {
                                    return {
                                        type: 'linear',
                                        colorStops: [{
                                            offset: 0,
                                            color: 'rgba(42,222,176,.3)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(42,222,176,1)'
                                        }],
                                    };
                                }
                                if (params.dataIndex === 1) {
                                    return {
                                        type: 'linear',
                                        colorStops: [{
                                            offset: 0,
                                            color: 'rgba(243,230,115,.3)'
                                        }, {
                                            offset: 1,
                                            color: 'rgb(243,230,115)'
                                        }],
                                    };
                                }
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
                            },
                            borderWidth: 0,
                            borderColor: '#333',
                        }
                    },
                    barGap: '10%',
                    barCategoryGap: '50%',
                    data: data
                }]
            };
            echarts.init(this.$refs.sec2min1chart).setOption(option);
        },
        initmin2chart() {
            let chartData = [];
            if (this.eventLetterTypeData) {
                chartData = [{
                    name: '来信',
                    value: this.eventLetterTypeData.num1
                }, {
                    name: '来访',
                    value: this.eventLetterTypeData.num2
                }, {
                    name: '网投',
                    value: this.eventLetterTypeData.num3
                }];
            }
            let arrValue = this.getArrayValue(chartData, "value");
            let sumValue = eval(arrValue.join('+'));
            let optionData = this.getData(chartData, sumValue);
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
            echarts.init(this.$refs.min2chart).setOption(option)
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
                    width: '240',
                    height: '240',
                    radius: [75 - i * 15 + '%', 68 - i * 15 + '%'],
                    center: ["30%", "40%"],
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
                        radius: [220, 220],
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
            .sec1list {

                .slist {
                    font-size: 34px;
                    color: $ft-color;
                    margin-top: 25px;

                    .slistp {
                        background-image: linear-gradient(268deg, rgba(6, 178, 227, 0.5) 0%, rgba(4, 186, 237, .2) 100%);
                        line-height: 55px;
                        height: 55px;
                        padding: 0 15px;

                        span {
                            color: $ft-yel;
                            float: right;
                            font-size: 34px;
                            font-family: $sz-font-family;
                            line-height: 55px;

                            i {
                                color: $ft-color;
                                font-size: 26px;
                                font-style: inherit;
                            }
                        }
                    }

                    div {
                        font-size: 26px;
                        display: flex;
                        justify-content: space-evenly;
                        align-items: center;
                        background: rgba(7, 48, 79, 0.3);
                        height: 30px;
                        width: 100%;
                        margin-top: 10px;

                        span {
                            display: inline-block;
                            width: 40px;
                            height: 15px;
                            margin-right: 15px;
                            background: rgb(15, 85, 97);
                            background: linear-gradient(90deg, rgba(15, 85, 97, 1) 0%, rgba(34, 175, 139, 1) 100%);

                        }

                        p:nth-child(2) span {
                            background: rgb(4, 68, 118);
                            background: linear-gradient(90deg, rgba(4, 68, 118, 1) 0%, rgba(1, 147, 233, 1) 100%);
                        }

                        p:nth-child(1) span {
                            background: rgb(71, 49, 74);
                            background: linear-gradient(90deg, rgba(71, 49, 74, 1) 0%, rgba(248, 103, 110, 1) 100%);
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
                position: relative;

                .maplegend {
                    position: absolute;
                    bottom: 20px;
                    left: 250px;
                    color: $ft-color;
                    font-size: 22px;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    flex-direction: column;
                    height: 60px;
                    margin-bottom: 10px;

                    span {
                        display: inline-block;
                        width: 40px;
                        height: 15px;
                        margin-right: 15px;
                        background: rgb(71, 49, 74);
                        background: linear-gradient(90deg, rgba(71, 49, 74, 1) 0%, rgba(248, 103, 110, 1) 100%);
                    }

                    p:nth-child(3) span {
                        background: rgb(4, 68, 118);
                        background: linear-gradient(90deg, rgba(4, 68, 118, 1) 0%, rgba(1, 147, 233, 1) 100%);
                    }

                    p:nth-child(4) span {
                        background: rgb(15, 85, 97);
                        background: linear-gradient(90deg, rgba(15, 85, 97, 1) 0%, rgba(34, 175, 139, 1) 100%);
                    }

                }
            }

            .sectionmap {
                width: 100%;
                height: 630px;
            }

            .section-2 {
                .sec2min1 {
                    width: 800px;
                    height: 410px;
                    display: inline-block;

                    .sec2min1list {
                        display: inline-block;
                        width: 150px;
                        overflow: hidden;

                        p {
                            font-size: 24px;
                            color: $ft-color;
                            line-height: 33px;
                            height: 33px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;

                            span {
                                display: inline-block;
                                width: 20px;
                                height: 20px;
                                color: white;
                                background: $ft-color;
                                text-align: center;
                                line-height: 20px;
                                margin-right: 15px;
                            }
                        }

                        p:first-child {
                            span {
                                background: linear-gradient(90deg, #47314a 0%, #f8676e 100%);
                            }
                        }

                        p:nth-child(2) {
                            span {
                                background: linear-gradient(90deg, #546962 0%, #f3e674 100%);
                            }
                        }

                        p:nth-child(3) {
                            span {
                                background: linear-gradient(90deg, #186673 0%, #23ae8d 100%);
                            }
                        }
                    }

                    .sec2min1chart {
                        display: inline-block;
                        width: 650px;
                        vertical-align: top;
                        height: 400px;
                    }
                }

                .sec2min2 {
                    display: inline-block;
                    height: 410px;
                    width: 700px;
                    vertical-align: top;

                    .min2 {
                        width: 100%;

                        .min2chart {
                            height: 180px;
                            width: 180px;
                            display: inline-block;
                        }

                        .charttip {
                            display: inline-block;
                            vertical-align: top;
                            width: 340px;
                            color: $ft-color;
                            font-size: 30px;
                            top: 55px;
                            right: 40px;

                            p {
                                position: relative;
                                margin: 15px 0;
                                font-family: $sz-font-family;
                                padding-left: 30px;

                                span {
                                    color: $ye-color;
                                    font-size: 30px;
                                    display: inline-block;
                                    min-width: 30px;
                                }

                                i {
                                    position: absolute;
                                    display: inline-block;
                                    content: "";
                                    top: 13px;
                                    left: -20px;
                                    width: 30px;
                                    height: 10px;
                                    background: linear-gradient(90deg, #546962 0%, #f3e674 100%);
                                }
                            }

                            p:nth-child(2) span {
                                color: #1ad485;
                            }

                            p:nth-child(2) i {
                                background: linear-gradient(90deg, #186673 0%, #23ae8d 100%);
                            }

                            p:nth-child(3) span {
                                color: #fb686f;
                            }

                            p:nth-child(3) i {
                                background: linear-gradient(90deg, #47314a 0%, #f8676e 100%);
                            }
                        }
                    }

                    .min3 {
                        p {
                            color: $ft-color;
                            line-height: 40px;
                            height: 40px;
                            font-size: 26px;
                            span {
                                float: right;
                            }
                        }
                    }
                }
            }
        }

        .sectionrt {
            margin-top: 155px;
            width: 968px;
            display: inline-block;
            vertical-align: top;

            .sihead {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 120px;
                background: #13355c;
                background: linear-gradient(90deg, rgba(57, 83, 127, 0.5018382352941176) 0%, rgba(33, 65, 124, 0.1881127450980392) 50%, rgba(57, 83, 127, 0.4962359943977591) 100%);

                .headli {
                    color: $ft-color;
                    width: 100%;
                    text-align: center;

                    div {
                        height: 80px;
                        font-size: 26px;
                        border-left: 1px solid $ft-color;

                        p:last-child {
                            font-size: 52px;
                            font-family: $sz-font-family;
                        }
                    }

                    div:last-child {
                        border-right: 1px solid $ft-color;
                    }
                }
            }

            .secrt-2 {
                margin-top: 30px;

                .secrt-2list {
                    ul {
                        margin-top: 30px;
                        list-style: none;
                        line-height: 55px;
                        padding: 0;
                        max-height: 1150px;
                        overflow: auto;

                        li {
                            font-size: 26px;
                            color: $ft-color;
                            border-bottom: 1px dotted rgba(34, 182, 228, 0.102);
                            height: 55px;
                            margin-bottom: 40px;

                            span:first-child {
                                padding: 2px 10px;
                                margin-right: 5px;
                                color: white;
                                border-radius: 5px;
                                display: inline-block;
                                max-width: 250px;
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                                vertical-align: top;
                            }
                            span:nth-child(2){
                                display: inline-block;
                                max-width: 415px;
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                                vertical-align: top;
                            }

                            span:last-child {
                                float: right;
                                color: #adb3b3;
                            }

                            .backcolor1 {
                                background-color: #033b6a;
                            }

                        }
                    }

                    ul::-webkit-scrollbar-track {
                        background-color: #122a4e;
                    }

                    ul::-webkit-scrollbar-thumb {
                        background-color: #1379ca;
                    }
                }

                .detail {
                    margin-top: 30px;
                    padding: 10px 35px;
                    color: white;
                    font-size: 24px;
                    float: right;
                    background: rgb(4, 121, 164);
                    background: linear-gradient(90deg, rgba(4, 121, 164, 1) 0%, rgba(4, 186, 236, 1) 100%);
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
