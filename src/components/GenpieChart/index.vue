<template>
    <div style="width:100%;height:100%;">
        <div ref="mapchart" style="width:100%;height:100%;"></div>

        <!-- ElementUI 弹框 -->
        <div class="visit-dialog">
         <el-dialog
            :visible.sync="dialogVisible"
            :show-close="false"
            width="1300px"
        >
            <div class="subtitle subtitle2" >
                <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                <h3>{{ currentArea.name }}
                    <span @click="dialogVisible = false" class="dialog-close">X</span>
                </h3>
            </div>
            <div class="visit-container">

                <el-table
                    :data="tableData"
                    style="width: 100%;"
                    row-key="id"
                    class="visit-table"
                >
                    <!-- 左侧可展开列 -->
                    <el-table-column type="expand" width="30">
                        <template slot-scope="props">
                            <!-- 这里就是展开后的内容 -->
                            <div class="expand-content">
                                <template>
                                    <div class="steps">
                                        <div
                                            v-for="(item, index) in steps"
                                            :key="index"
                                            class="step-item"
                                        >
                                            <!-- 圆点 -->
                                            <div
                                                class="step-circle"
                                                :class="{
                                                          active: index + 1 === current,
                                                          passed: index + 1 < current
                                                        }"
                                            >
                                                <span>{{ index + 1 }}</span>

                                                <!-- 当前步骤的外圈效果 -->
                                                <div
                                                    v-if="index + 1 === current"
                                                    class="step-circle-ring"
                                                ></div>
                                            </div>

                                            <!-- 步骤文本 -->
                                            <div class="step-label">
                                                {{ item }}
                                            </div>

                                            <!-- 线段（最后一个不显示） -->
                                            <div
                                                v-if="index < steps.length - 1"
                                                class="step-line"
                                                :class="{
                                                          passed: index + 1 < current,
                                                          active: index + 1 === current
                                                        }"
                                            ></div>
                                        </div>
                                    </div>
                                </template>
                                <template>
                                    <div class="history-list">
                                        <div
                                            class="history-item"
                                            v-for="(item, index) in historyList"
                                            :key="index"
                                        >
                                            <!-- 日期 -->
                                            <div class="history-date">
                                                {{ item.date }}
                                            </div>

                                            <p class="history-row">
                                                {{ item.prefix1 }}
                                                <span class="highlight">{{ item.highlight1 }}</span>
                                                {{ item.suffix1 }}
                                            </p>
                                            <p class="history-row">
                                                {{ item.prefix2 }}
                                                <span class="highlight" v-if="item.highlight2">{{ item.highlight2 }}</span>
                                                {{ item.suffix2 }}
                                            </p>
                                        </div>
                                    </div>
                                </template>


                            </div>
                        </template>
                    </el-table-column>


                    <el-table-column prop="name" label="姓名" width="50" />
                    <el-table-column prop="code" label="信访件编号" width="130" />
                    <el-table-column prop="date" label="登记日期" width="120" />
                    <el-table-column prop="type" label="信访形式" width="80" />
                    <el-table-column prop="purpose" label="信访目的" width="80" />
                    <el-table-column prop="toCity" label="去向" width="100" />
                    <el-table-column prop="addr" label="住址" width="120" />
                    <el-table-column prop="cat" label="内容分类" width="140" />
                    <el-table-column prop="summary" label="概括信息"  />
                    <el-table-column label="信访人联系方式" width="120">
                        <template slot-scope="scope">
                            <span class="phone-cell">
                              {{ scope.row.phone }}
                            </span>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="block">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="1000">
                    </el-pagination>
                </div>
            </div>
        </el-dialog>
        </div>
    </div>
</template>


<script>
import * as echarts from 'echarts';
import dataInJs from '@/api/datav/common/640100.json';
import {loopShowTooltip} from '@/utils/echarts-tooltip-carousel';

export default {
    name: "genpieChart",
    props: {
        enableClick: {
            type: Boolean,
            default: false   // 默认不开启
        },
        current: { type: Number, default: 4 }, // 当前步骤
        steps: {
            type: Array,
            default: () => [
                "登记受理",
                "已转责任单位",
                "处理阶段",
                "审核阶段",
                "办结阶段",
                "归档"
            ]
        },
    },

    data() {
        return {
            timerChart: null,  // 定时器名称
            viewType : '',
            // 用银川市区县做 message
            message: [
                { name: '兴庆区',  num: 27, threatenNum: 2, jointNum: 0, jjfNum: 0 },
                { name: '金凤区',  num: 21, threatenNum: 1, jointNum: 0, jjfNum: 0 },
                { name: '西夏区',  num: 15, threatenNum: 0, jointNum: 0, jjfNum: 0 },
                { name: '永宁县',  num: 10, threatenNum: 0, jointNum: 0, jjfNum: 0 },
                { name: '贺兰县',  num: 9,  threatenNum: 0, jointNum: 0, jjfNum: 0 },
                { name: '灵武市',  num: 6,  threatenNum: 0, jointNum: 0, jjfNum: 0 },
            ],

            mapechart: null,          // 保存图表实例
            dialogVisible: false,     // 弹框显隐
            currentArea: {},          // 当前点击区域的数据
            tableData: [
                {
                    id: 1,
                    name: '张三',
                    code: '500000001890',
                    date: '2025-10-05',
                    type: '来访',
                    purpose: '求决',
                    toCity: '拉萨市',
                    addr: '城关区',
                    cat: '拖欠农民工工资',
                    summary: '概括信息概括信息概括信息……',
                    phone: '13888888888'
                },
               {
                    id: 2,
                    name: '张三',
                    code: '500000001890',
                    date: '2025-10-05',
                    type: '来访',
                    purpose: '求决',
                    toCity: '拉萨市',
                    addr: '城关区',
                    cat: '拖欠农民工工资',
                    summary: '概括信息概括信息概括信息……',
                    phone: '13888888888'
                },
               {
                    id: 3,
                    name: '张三',
                    code: '500000001890',
                    date: '2025-10-05',
                    type: '来访',
                    purpose: '求决',
                    toCity: '拉萨市',
                    addr: '城关区',
                    cat: '拖欠农民工工资',
                    summary: '概括信息概括信息概括信息……',
                    phone: '13888888888'
                },
               {
                    id: 4,
                    name: '张三',
                    code: '500000001890',
                    date: '2025-10-05',
                    type: '来访',
                    purpose: '求决',
                    toCity: '拉萨市',
                    addr: '城关区',
                    cat: '拖欠农民工工资',
                    summary: '概括信息概括信息概括信息……',
                    phone: '13888888888'
                },
               {
                    id: 5,
                    name: '张三',
                    code: '500000001890',
                    date: '2025-10-05',
                    type: '来访',
                    purpose: '求决',
                    toCity: '拉萨市',
                    addr: '城关区',
                    cat: '拖欠农民工工资',
                    summary: '概括信息概括信息概括信息……',
                    phone: '13888888888'
                },

            ],
            historyList: [
                {
                    date: '2023-06-30',
                    prefix1: '城关区信访局 ',
                    highlight1: '张三登记',
                    suffix1: '',
                    prefix2: '告知信访人内容显示',
                    highlight2: '',
                    suffix2: ''
                },
                {
                    date: '2023-06-30',
                    prefix1: '直接转送',
                    highlight1: '县住建局',
                    suffix1: '',
                    prefix2: '办理意见内容显示，办理意见内容显示，办理意见内容显示，办理意见内容显示',
                    highlight2: '',
                    suffix2: ''
                }
            ]

        }
    },
    mounted() {
        this.initmap();
    },
    methods: {
        initmap() {



            if (this.timerChart) {
                this.timerChart.clearLoop();
            }
            var geoCoordMap = {
                兴庆区: [106.44644, 38.44069],
                金凤区: [106.30000, 38.41061],
                西夏区: [105.93453, 38.38012],
                永宁县: [106.23879, 38.21607],
                贺兰县: [106.30933, 38.51061],
                灵武市: [106.71170, 38.11390],
            }
            var customerBatteryCityData = []
            for (let i in this.message) {
                if (i > 0) {
                    if (this.viewType == 'threelistView') {
                        customerBatteryCityData.push({
                            name: this.message[i].name,
                            value: this.message[i].num,
                            stockNum: this.message[i].stockNum,
                            incrementNum: this.message[i].incrementNum,
                            variableNum: this.message[i].variableNum,
                        })
                    } else if ("emergencyEvent" === this.viewType) {
                        customerBatteryCityData.push({
                            name: this.message[i].zoneName,
                            value: this.message[i].total,
                            num1: this.message[i].num1,
                            num2: this.message[i].num2,
                            num3: this.message[i].num3,
                            num4: this.message[i].num4,
                            num5: this.message[i].num5,
                        });
                    } else {
                        customerBatteryCityData.push({
                            name: this.message[i].name,
                            value: this.message[i].num,
                            threaten: this.message[i].threatenNum,
                            jjfNum: this.message[i].jjfNum,
                            jointNum: this.message[i].jointNum,
                        })
                    }
                }
            }
            echarts.registerMap('yinchuan', dataInJs);
            var option = {
                // backgroundColor: '#131C38',
                tooltip: {
                    trigger: 'item',
                    show: true,
                    enterable: true,
                    textStyle: {
                        fontSize: 20,
                        color: '#fff'
                    },
                    backgroundColor: '',
                    borderWidth: 0,
                    className: 'echarttoop',
                    extraCssText: 'box-shadow: 0 0 0 rgba(0, 0, 0, 0);',
                    formatter: params => {
                        if (!params.data) return ''; // 没数据不显示 tooltip
                        return `
                                    <div class="maptool">
                                      <p>${params.name}</p>
                                      <div class="maptool-desc">
                                        <p>已汇报数 <span>17%</span></p>
                                       </div>
                                    </div>
                                  `;
                    }
                },
                grid: {
                    top: '5%',
                    bottom: '5%',
                    height: '500'
                },
                geo: [
                    {
                        map: 'yinchuan',
                        aspectScale: 0.9,
                        roam: false, // 是否允许缩放
                        zoom: 1.2, // 默认显示级别
                        layoutSize: '95%',
                        layoutCenter: ['55%', '50%'],
                        itemStyle: {
                            normal: {
                                areaColor: {
                                    type: 'linear-gradient',
                                    x: 0,
                                    y: 400,
                                    x2: 0,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(37,108,190,0.3)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(15,169,195,0.3)' // 50% 处的颜色
                                    }],
                                    global: true // 缺省为 false
                                },
                                borderColor: '#4ecee6',
                                borderWidth: 1
                            },
                            emphasis: {
                                areaColor: {
                                    type: 'linear-gradient',
                                    x: 0,
                                    y: 300,
                                    x2: 0,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(37,108,190,1)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(15,169,195,1)' // 50% 处的颜色
                                    }],
                                    global: true // 缺省为 false
                                }
                            }
                        },
                        emphasis: {
                            itemStyle: {
                                areaColor: 'rgba(6,68,141,.4)'
                            },
                            label: {
                                show: 0,
                                color: '#fff'
                            }
                        },
                        zlevel: 3,
                        select:{//这个就是鼠标点击后，地图想要展示的配置
                            itemStyle:{
                                color:"rgba(0,210,255 ,0.6)",
                                areaColor:"rgba(0,210,255 ,0.6)",

                            },
                        },
                    },
                    {
                        map: 'yinchuan',
                        aspectScale: 0.9,
                        roam: false, // 是否允许缩放
                        zoom: 1.2, // 默认显示级别
                        layoutSize: '95%',
                        layoutCenter: ['55%', '50%'],
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(192,245,249,.6)',
                                borderWidth: 2,
                                shadowColor: '#2C99F6',
                                shadowOffsetY: 0,
                                shadowBlur: 120,
                                areaColor: 'rgba(29,85,139,.2)'
                            }
                        },
                        zlevel: 2,
                        silent: true,
                        select:{//这个就是鼠标点击后，地图想要展示的配置
                            itemStyle:{
                                color:"rgba(0,210,255 ,0.6)",
                                areaColor:"rgba(0,210,255 ,0.6)",

                            },
                        },
                    },
                    {
                        map: 'yinchuan',
                        aspectScale: 0.9,
                        roam: false, // 是否允许缩放
                        zoom: 1.2, // 默认显示级别
                        layoutSize: '100%',
                        layoutCenter: ['55%', '51.5%'],
                        itemStyle: {
                            // areaColor: '#005DDC',
                            areaColor: 'rgba(0,210,255 ,0.6)',
                            borderColor: '#004db5',
                            borderWidth: 1
                        },
                        zlevel: 1,
                        silent: true,
                        select:{//这个就是鼠标点击后，地图想要展示的配置
                            itemStyle:{
                                color:"rgba(0,210,255 ,0.6)",
                                areaColor:"rgba(0,210,255 ,0.6)",

                            },
                        },
                    }
                ],
                series: [
                    // map
                    {
                        geoIndex: 0,
                        // coordinateSystem: 'geo',
                        showLegendSymbol: true,
                        type: 'map',
                        roam: true,
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },

                        itemStyle: {
                            normal: {
                                borderColor: '#2ab8ff',
                                borderWidth: 1.5,
                                areaColor: '#12235c'
                            },
                            emphasis: {
                                areaColor: '#2AB8FF',
                                borderWidth: 0,
                                color: 'red'
                            }
                        },
                        map: 'yinchuan', // 使用
                        data: customerBatteryCityData
                        // data: this.difficultData //热力图数据   不同区域 不同的底色
                    },
                    // 柱状体的主干
                    {
                        type: 'lines',
                        zlevel: 5,
                        effect: {
                            show: false,
                            // period: 4, //箭头指向速度，值越小速度越快
                            // trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                            // symbol: 'arrow', //箭头图标
                            // symbol: imgDatUrl,
                            symbolSize: 5 // 图标大小
                        },
                        lineStyle: {
                            width: 20, // 尾迹线条宽度
                            color: '#14f4fe',
                            opacity: 1, // 尾迹线条透明度
                            curveness: 0 // 尾迹线条曲直度
                        },
                        label: {
                            show: 0,
                            position: 'end',
                            formatter: '245'
                        },
                        silent: true,
                        data: lineData()
                    },
                    // 柱状体的顶部
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        zlevel: 5,
                        label: {
                            show: true,
                            formatter: function () {
                                // return `顶部label`
                                return ``
                            },
                            position: "top"
                        },
                        symbol: 'circle',
                        symbolSize: [20, 10],
                        itemStyle: {
                            color: 'rgb(22,255,255, 1)',
                            opacity: 1
                        },
                        silent: true,
                        data: scatterData()
                    },
                    // 柱状体的底部
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        zlevel: 4,
                        label: {
                            // 这儿是处理的
                            formatter: '{b}',
                            position: 'bottom',
                            color: '#fff',
                            fontSize: 12,
                            distance: 10,
                            show: true
                        },
                        symbol: 'circle',
                        symbolSize: [20, 10],
                        itemStyle: {
                            // color: '#F7AF21',
                            color: 'rgb(22,255,255, 1)',
                            opacity: 1
                        },
                        silent: true,
                        data: scatterData2()
                    },
                    // 底部外框
                    {
                        tooltip: {
                            show: false,
                        },
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        rippleEffect: {
                            scale: 10,
                            brushType: 'stroke',
                        },
                        showEffectOn: 'render',
                        itemStyle: {
                            normal: {
                                shadowColor: '#0ff',
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                color : 'rgb(22,255,255, 1)',
                            },
                        },
                        label: {
                            normal: {
                                color: '#fff',
                            },
                        },
                        symbol: 'circle',
                        symbolSize: [10, 5],
                        data: scatterData2(),
                        zlevel: 4,
                    },

                ]
            }
            // 保存到 this 上，方便其他方法用
            this.mapechart = echarts.init(this.$refs.mapchart);
            this.mapechart.setOption(option);

            this.exceHighlight(this.mapechart, option);

            // ⭐ 给地图加点击事件（只有父组件允许时）
            if (this.enableClick) {
                this.mapechart.off('click');
                this.mapechart.on('click', (params) => {
                    if (params.componentType === 'series' && params.seriesType === 'map') {
                        this.handleAreaClick(params);
                    }
                });
            }



            // 动态计算柱形图的高度（定一个max）
            function lineMaxHeight() {
                const maxValue = Math.max(...customerBatteryCityData.map(item => item.value))
                return 0.2 / maxValue
            }

            // 柱状体的主干
            function lineData() {
                return customerBatteryCityData.map((item) => {
                    return {
                        coords: [geoCoordMap[item.name], [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight()]]
                    }
                })
            }

            // 柱状体的顶部
            function scatterData() {
                return customerBatteryCityData.map((item) => {
                    return [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight()]
                })
            }

            // 柱状体的底部
            function scatterData2() {
                return customerBatteryCityData.map((item) => {
                    return {
                        name: item.name,
                        value: geoCoordMap[item.name]
                    }
                })
            }

        },

        handleAreaClick(params) {
            // params.name 就是区域名字，比如 "兴庆区"
            const areaName = params.name;

            // 从 message 里找到这条数据（你也可以用 params.data 直接用）
            const areaData = this.message.find(item => item.name === areaName) || {};

            this.currentArea = {
                name: areaName,
                ...areaData,
                // 也可以把 tooltip 里那些字段带上
                value: params.data && params.data.value,
                threaten: params.data && params.data.threaten,
                jointNum: params.data && params.data.jointNum,
                jjfNum: params.data && params.data.jjfNum,
            };

            this.dialogVisible = true; // 打开弹框
        },

        exceHighlight(chart, chartOption, options) {
            this.timerChart = loopShowTooltip(chart, chartOption, options);
        },
    }
}
</script>

<style scoped lang="scss">

.visit-dialog ::v-deep .el-dialog {
    box-sizing: border-box !important;
}
.visit-dialog ::v-deep .el-dialog{
    .el-dialog__header{display: none;}
    background: rgba(5, 24, 55, 0.9);
    .el-dialog__body{
        padding: 0;
        border-radius: 10px;
        background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
        h3{width: calc(100% - 55px);}
        .dialog-close{
            float: right;
            margin-right: 25px;
            cursor: pointer;
        }
        .visit-container{
            padding: 0 25px;
            max-height: 550px;
            overflow: auto;
        }
        .visit-table::before{
            height: 0;
        }
        .visit-table {
            // 隐藏原来的小图标
            .el-table__expand-icon > i {
                display: none;
            }
            .expand-content {
                height: 200px;
                overflow: auto;
                padding: 10px 50px;
                color: #fff;
                font-size: 14px;
                background-color: rgba(2, 21, 48, 0.7);
                border-radius: 10px;

            }
            .el-table__expanded-cell{
                background: #071934;
            }

            // 默认状态：指向右侧的小三角
            .el-table__expand-icon {
                position: relative;
                width: 0;
                height: 0;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-left: 10px solid #ffd800; // 黄色
                margin-left: 10px;
                cursor: pointer;
            }

            // 展开后：旋转成向下的小三角
            .el-table__expand-icon--expanded {
                transform: rotate(90deg);
            }

            .has-gutter tr,th{
                background: #0a3e7a;
                color: #fff;
                border: 0;
            }
            .el-table__row td,tr{
                color: #6bb5ff;
            }
        }

        .visit-table {
            // 隐藏原来的小图标
            .el-table__expand-icon > i {
                display: none;
            }

            // 默认状态：指向右侧的小三角
            .el-table__expand-icon {
                position: relative;
                width: 0;
                height: 0;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-left: 10px solid #ffd800; // 黄色
                margin-left: 10px;
                cursor: pointer;
            }

            // 展开后：旋转成向下的小三角
            .el-table__expand-icon--expanded {
                transform: rotate(90deg);
            }
        }

        .visit-table {
            // 隐藏原来的小图标
            .el-table__expand-icon > i {
                display: none;
            }

            // 默认状态：指向右侧的小三角
            .el-table__expand-icon {
                position: relative;
                width: 0;
                height: 0;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-left: 10px solid #ffd800; // 黄色
                margin-left: 10px;
                cursor: pointer;
            }

            // 展开后：旋转成向下的小三角
            .el-table__expand-icon--expanded {
                transform: rotate(90deg);
            }
            .phone-cell {
                color: #ffd94a;
                cursor: pointer;

                &:hover {
                    color: #fff;
                    text-decoration: underline;
                }
            }

        }

        .steps {
            display: flex;
            align-items: center;
            width: 100%;
            position: relative;
            margin-top: 10px;

            .step-item {
                display: flex;
                align-items: center;
                position: relative;
                flex: 1;

            }

            .step-circle {
                width: 34px;
                height: 34px;
                background: #7a7a7a; // 默认灰
                color: #fff;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                z-index: 2;
                font-size: 16px;

                &.passed {
                    background: #00aaff;
                }

                &.active {
                    background: #00aaff;
                }

                .step-circle-ring {
                    position: absolute;
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    border: 6px solid rgba(0, 170, 255, 0.2);
                    top: -6px;
                    left: -6px;
                }
            }

            .step-label {
                font-size: 14px;
                color: #fff;
                position: absolute;
                top: 40px;
                width: 120px;
                left: -40px;
                text-align: center;
            }

            .step-line {
                flex: 1;
                height: 3px;
                background: #7a7a7a;
                margin-left: 10px;
                margin-right: 10px;

                &.passed {
                    background: #00aaff;
                }

                &.active {
                    border-top: 3px dashed #00aaff;
                    background: none;
                }
            }
        }

        .el-table,
        .el-table th,
        .el-table td {
            border: none !important;
        }

        .el-table::before {
            display: none !important; /* 左边第一条竖线 */
        }

        .el-table__body-wrapper::before {
            display: none !important; /* 顶部那条线 */
        }

        .el-table__row {
            border: none !important;
        }
        .el-table tr {background: transparent;}
        .el-table td,
        .el-table th.is-leaf {
            background: transparent !important;
        }
        .el-table , .visit-container {background: transparent;}
        .el-table__body tr:hover > td {
            background-color: transparent !important; /* 取消 hover 灰背景 */
        }

        .history-list {
            padding: 10px 0;
            color: #ffffff;
            font-size: 14px;
            margin-top: 40px;
        }

        .history-item {
            display: flex;
            padding: 4px 0;
            align-items: center;
            gap: 30px;
        }

        .history-date {
            width: 120px;
            flex-shrink: 0;
        }


        .history-row {
            margin: 0;
            line-height: 1.8;
            color: #6bb5ff;
        }

        .highlight {
            color: #ffd94a;
        }

        .visit-container{
            .block{
                padding: 20px 0;
                text-align: right;
                .el-pagination{
                    color: #6bb5ff;
                    .active{
                        background: #2e73a8;
                        color: #fff;
                    }
                }
                .btn-prev , .btn-next{
                    background: #0c3b71;
                    color: #6bb5ff;
                    border-radius: 3px;
                    margin: 0 5px;
                    padding: 0 6px;
                }
                .el-pager li{
                    background: #0c3b71;
                    border-radius: 3px;
                    margin: 0 5px;
                }
                .el-icon-more{
                    color: #6bb5ff;
                }

            }
        }
    }
}
</style>
