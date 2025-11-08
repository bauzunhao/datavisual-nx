<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="sectionleft">

                <section class="sec1-list">
                    <h3>全区信访量情况</h3>
                    <div class="stats-container">
                        <div class="simap">
                            <genpie-chart ref="child" v-if="tableData" :message="tableData" :height="950" :viewType="viewName"></genpie-chart>
                        </div>
                    </div>

                    <h3>信访形式</h3>
                    <div ref="leftPie" class="leftPie pie-chart"></div>
                    <h3>近12个月信访量走势</h3>
                    <div ref="lineChart" class="leftPie pie-chart"></div>
                </section>
            </div>
            <div class="sectionrt">
                <h3>全区信访量情况</h3>
                <div class="sec1-min">
                    <div class="min1 mabt70">
                        <div class="min1-0 min1-1" >
                            <div class="min1-01">
                                <p>
                                    <span class="ft67">11</span>
                                    <span class="ft30">信访件次</span>
                                </p>
                            </div>
                            <div class="min1-02 ft30">
                                同比: 11
                            </div>
                        </div>
                        <div class="min1-0 min1-2" >
                            <div class="min1-01">
                                <p>
                                    <span class="ft67">11</span>
                                    <span class="ft30">信访事项</span>
                                </p>
                            </div>
                            <div class="min1-02 ft30">
                                同比: 11
                            </div>
                        </div>
                        <div class="min1-0 min1-3" >
                            <div class="min1-01">
                                <p>
                                    <span class="ft67">11</span>
                                    <span class="ft30">来访人次</span>
                                </p>
                            </div>
                            <div class="min1-02 ft30">
                                同比: 11
                            </div>
                        </div>
                    </div>
                </div>

                <div class="min3 mabt70">
                    <h3>办理情况</h3>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="min3li">
                                <p class="ft30">登记件次</p>
                                <p class="ft40">22</p>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="min3li" style=" border-top: 3px solid #2196f3;">
                                <p class="ft30">转送件次</p>
                                <p class="ft40">22</p>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="min3li" style=" border-top: 3px solid #ff5722;">
                                <p class="ft30">交办件次</p>
                                <p class="ft40">22</p>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="min3li" style=" border-top: 3px solid #009688;">
                                <p class="ft30">督办件次</p>
                                <p class="ft40">22</p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="minbtm">
                    <div class="minbtmlt">
                        <div class="visit-table">
                            <!-- 表头 -->
                            <div class="row header">
                                <div class="cell name">名称</div>
                                <div class="cell value">信访量</div>
                                <div class="cell ratio">占比</div>
                            </div>

                            <!-- 数据行 -->
                            <div
                                class="row"
                                v-for="(item, idx) in rows"
                                :key="item.name"
                                :style="{ color: item.color || '#fff' }"
                            >
                                <div class="cell name">{{ item.name }}</div>
                                <div class="cell value">{{ item.value }}</div>
                                <div class="cell ratio">{{ item.ratio }}%</div>
                            </div>
                        </div>
                    </div>
                    <div class="minbtmrt">
                        <h3>信访形式</h3>
                        <div ref="visitchart" class="chart pie-chart"></div>
                        <h3>信访目的</h3>
                        <div ref="donutchart" class="donut-chart"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import genpieChart from '@/views/datav/petition/genpieChart'
import DatavHead from '@/components/DatavHead/index.vue'
import { getZoneGroupData } from '@/api/datav/petition/general'
export default {
name: "index",
    components: { DatavHead , genpieChart },
    data () {
        return{
            rows: [
                { name: '政法',       value: 140586, ratio: 17.25, color: '#ff4d4f' },
                { name: '市场监管',   value: 133995, ratio: 16.44, color: '#52c41a' },
                { name: '城乡建设',   value: 131010, ratio: 16.07, color: '#faad14' },
                { name: '劳动和社会保障', value: 115715, ratio: 14.13 },
                { name: '纪检监察',   value: 44594,  ratio: 5.47  },
                { name: '经济管理',   value: 38341,  ratio: 4.70  },
                { name: '农村农业',   value: 35442,  ratio: 4.35  },
                { name: '自然资源',   value: 35025,  ratio: 4.30  },
                { name: '教育',       value: 31795,  ratio: 3.90  },
                { name: '其他',       value: 22603,  ratio: 2.77  },
                { name: '卫生健康',   value: 14662,  ratio: 1.80  },
                { name: '科技与信息产业', value: 14515, ratio: 1.78 },
                { name: '交通运输',   value: 12138,  ratio: 1.49  }
            ],
            viewName:'generalView',
            tableData: null,
            visitchart: null,
            leftPieChart: null,
            donutchart: null,
            // 查询参数
            queryParams: {
                params: {
                    timeMark:3
                },
            },
        }
    },
    mounted() {
        this.queryZoneGroupData();
        this.renderChart();
        this.renderlineChart();
        this.rendervisitChart();
        this.renderdonutchart();
    },
    methods : {
        queryZoneGroupData() {
            getZoneGroupData(this.queryParams).then(response => {
                if (response.data) {
                    this.tableData = this.ignoreCityData(response.data, 'name');
                    //加载地图数据
                    setTimeout(() => {
                        this.$refs.child.initmap();
                    }, 1000);
                    // 启动定时器，循环滚动
                    this.startScrolling();
                }
            })
        },
        startScrolling() {
            this.intervalId = setInterval(() => {
                this.startIndex = (this.startIndex + 1) % (this.tableData.length - 3) + 3; // 更新滚动部分的开始索引，跳过前三行
                this.scrollingData = this.tableData.slice(this.startIndex, this.startIndex + 2);

                // 处理末尾数据循环
                if (this.startIndex + 2 > this.tableData.length) {
                    const endIndex = this.startIndex + 2 - this.tableData.length;
                    this.scrollingData = this.tableData.slice(this.startIndex).concat(this.tableData.slice(3, 3 + endIndex));
                }
            }, 3000);  // 每2秒滚动一次，可以根据需求调整
        },

        renderChart() {

            const regions = [
                '银川市',
                '石嘴山市',
                '吴忠市',
                '固原市',
                '中卫市'
            ];

            const values = [
                123,  // 银川市的 num
                45,   // 石嘴山市的 num
                67,   // 吴忠市的 num
                89,   // 固原市的 num
                10    // 中卫市的 num
            ];

            // 2. 初始化实例（只做一次）
            if (!this.leftPie) {
                this.leftPie = echarts.init(this.$refs.leftPie, null, {
                    backgroundColor: 'transparent'
                })
            }

            // 3. 配置并渲染
            this.leftPie.setOption({
                backgroundColor: 'transparent',
                grid: { top: 40, bottom: 80, left: 60, right: 20 },
                xAxis: {
                    type: 'category',
                    data: regions,
                    axisLine: { lineStyle: { color: '#ccc' } },
                    axisTick: { show: false },
                    axisLabel: { color: '#fff', rotate: 0, interval: 0, fontSize: 24 }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
                    axisLabel: { color: '#fff', fontSize: 24 }
                },
                series: [
                    {
                        type: 'bar',
                        data: values,
                        barWidth: '30%',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgb(0,212,193)' },
                                { offset: 1, color: 'rgba(98,117,209,0)' }
                            ])
                        },
                        label: {
                            show: true,
                            position: 'top',
                            color: '#fff',
                            fontSize: 24,
                            formatter: '{c}'
                        }
                    }
                ]
            })
        },
        renderlineChart() {
            // 1. 准备数据
            const xData = [
                '2024-05', '2024-06', '2024-07', '2024-08',
                '2024-09', '2024-10', '2024-11', '2024-12',
                '2025-01'
            ]
            const yData = [
                200000, 210000, 215000, 220000,
                210000, 190000, 200000, 280000,
                220000
            ]

            // 2. 初始化 ECharts（只做一次）
            if (!this.chart) {
                this.chart = echarts.init(this.$refs.lineChart, null, {
                    backgroundColor: 'transparent'
                })
            }

            // 3. 设置配置项并渲染
            this.chart.setOption({
                backgroundColor: 'transparent',
                grid: {
                    top: 40, bottom: 60, left: 60, right: 20
                },
                xAxis: {
                    type: 'category',
                    data: xData,
                    boundaryGap: false,
                    axisLine: { lineStyle: { color: '#ccc' } },
                    axisTick: { show: false },
                    axisLabel: {
                        color: '#fff',
                        rotate: 0,
                        fontSize: 24,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
                    axisLabel: { color: '#fff', fontSize: 24 }
                },
                series: [
                    {
                        name: '数量',
                        type: 'line',
                        data: yData,
                        smooth: false,
                        showSymbol: true,
                        symbol: 'circle',
                        symbolSize: 8,
                        lineStyle: {
                            color: '#FFD56D',
                            width: 2
                        },
                        itemStyle: {
                            color: '#FFD56D'
                        }
                    }
                ]
            })
        },

        rendervisitChart() {
            // 1. 准备数据
            const data = [
                { value: 59.68, name: '网上信访' },
                { value: 30.70, name: '来信' },
                { value: 9.62, name: '来访' }
            ]

            // 2. 初始化实例（只做一次）
            if (!this.visitchart) {
                this.visitchart = echarts.init(
                    this.$refs.visitchart,
                    null,
                    { backgroundColor: 'transparent' }
                )
            }

            // 3. 设置配置并渲染
            this.visitchart.setOption({
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}：{d}%'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['40%', '70%'],      // 内外半径
                        center: ['50%', '50%'],
                        data,
                        roseType: false,             // 不启用南丁格尔
                        label: {
                            formatter: '{b}：{d}%',    // 显示 name + 百分比
                            color: '#fff',
                            fontSize: 24
                        },
                        labelLine: {
                            length: 15,
                            length2: 10,
                            lineStyle: { color: '#ccc' }
                        },
                        itemStyle: {
                            // 阴影营造轻微 3D 立体感
                            shadowBlur: 20,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        },
                        emphasis: {
                            scale: true,
                            scaleSize: 10
                        }
                    }
                ]
            })
        },
        renderdonutchart() {
            // 1. 准备数据
            const data = [
                { value: 66.27, name: '求决' },
                { value: 15.89, name: '申诉' },
                { value: 6.77, name: '检举控告' },
                { value: 8.04, name: '其他' },
                { value: 3.03, name: '建议意见' }
            ]

            // 2. 初始化实例（只做一次）
            if (!this.donutchart) {
                this.donutchart = echarts.init(this.$refs.donutchart, null, {
                    backgroundColor: 'transparent'
                })
            }

            // 3. 设置配置项并渲染
            this.donutchart.setOption({
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}：{d}%'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '75%'],    // 内半径 50%，外半径 75%
                        center: ['50%', '50%'],
                        avoidLabelOverlap: false,
                        data,
                        label: {
                            show: true,
                            position: 'outside',
                            formatter: '{b} {d}%',
                            color: '#fff',
                            fontSize: 24
                        },
                        labelLine: {
                            length: 20,
                            length2: 10,
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    }
                ]
            })
        }
    }
}
</script>

<style scoped lang="scss">
@font-face {
    font-family: "DSfont";
    src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
}
$sz-font-family: "DSfont";
$ft-color: #34d0ff;
$ye-color: #ebda55;
.cont{
    .sectionleft {
        width: 1770px;
        margin-right: 100px;

        .sec1-nav {
            display: flex;
            align-items: center;
            margin-bottom: 16px;

            img {
                display: none
            }

            ul {
                display: flex;
                margin-left: 24px;

                li {
                    margin-right: 16px;
                }
            }
        }
        .simap {
            height: 850px;
            width: 100%;
            position: relative;
        }
        .leftPie {
            width: 100%;
            height: 350px;
        }
    }
    .sectionrt{
        width: 1770px;
        display: inline-block;
        vertical-align: top;
        .sec1-min {
            .min1 {
                display: grid;
                column-gap: 100px;
                grid-template-columns: repeat(3, 1fr);
                //height: 125px;
                .min1-0 {
                    width: 500px;
                    display: inline-block;
                    background: url("../../../assets/images/szbackgd.png");
                    background-size: 100% 100%;
                    //cursor: pointer;
                    .min1-01 {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        align-content: center;
                        justify-content: space-around;
                        align-items: stretch;
                        height: 210px;

                        p {
                            color: $ft-color;
                            display: flex;
                            flex-direction: column;
                            flex-wrap: nowrap;
                            align-content: space-between;
                            justify-content: center;
                            align-items: center;

                            span:first-child {
                                font-family: $sz-font-family;
                                color: $ye-color;
                            }
                        }
                    }

                    .min1-02 {
                        height: 80px;
                        line-height: 80px;
                        text-align: center;
                        background-image: linear-gradient(to right, #042a4b, #054d73);
                        color: $ft-color;
                    }
                }

                .min1-1 {
                    .min1-01 {
                        p {
                            span:first-child {
                                color: #1ad485;
                            }
                        }
                    }
                }

                .min1-2 {
                    .min1-01 {
                        p {
                            span:first-child {
                                color: #22b6e4;
                            }
                        }
                    }
                }
            }
        }
        .min3{
            .min3li{
                background: url("../../../assets/images/szbackgd.png");
                background-size: 100% 100%;
                height: 250px;
                padding-top: 15px;
                border-top: 3px solid $ye-color;
                display: flex;
                flex-direction: column;
                justify-content: center;
                p{
                    color: $ft-color;
                    margin: 0;
                    text-align: center;
                    line-height: 60px;
                }
            }
            .min3li-1{
                border-top-color: #1ad485;
            }
            .min3li-2{
                border-top-color: $ft-color;
            }
        }
        .pie-chart{
            height: 400px;
            width: 100%;
        }
        .minbtm{
            display: grid;
            column-gap: 40px;
            grid-template-columns: repeat(2, 1fr);
            .minbtmlt , .minbtmrt{
                height: 100%;
            }
            .visit-table {
                display: grid;
                /* 共 1 + rows.length 行，3 列固定布局 */
                grid-template-columns: 2fr 1fr 1fr;
                /* 每行自动撑高 */
                grid-auto-rows: auto;
                background: transparent;

                .row {
                    display: contents; // 让单元格直接参与外层 grid 布局
                }

                .cell {
                    padding: 14px 12px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 32px;
                }

                /* 表头特殊样式 */
                .header .cell {
                    background: rgba(10, 42, 92, 0.8);
                    color: #fff;
                    font-weight: bold;
                }

                /* 第一列左对齐，其他列右对齐 */
                .name { text-align: left; }
                .value,
                .ratio { text-align: right; }

                /* 可选：斑马纹 */
                .row:nth-child(2n+1) .cell {
                    background: rgba(255, 255, 255, 0.05);
                }
            }
            .donut-chart {
                width: 100%;
                height: 400px;
            }
        }
    }
}
</style>
