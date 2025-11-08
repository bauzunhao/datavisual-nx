<!-- src/views/StatsDashboard.vue -->
<template>
    <div class="home">
        <DatavHead />

        <div class="cont">
            <!-- 左侧 -->
            <div class="sectionleft">
                <nav class="sec1-nav">
                    <router-link to="/">
                        <img src="@/assets/images/general-home.png" alt="" />
                    </router-link>
                    <ul>
                        <li><span>风险播报</span></li>
                        <li><router-link to="/datav/linkage"><span>联动指挥</span></router-link></li>
                        <li><router-link to="/datav/publicityv"><span>宣传教育</span></router-link></li>
                    </ul>
                </nav>

                <section class="sec1-list">
                    <h3>总量</h3>
                    <div class="stats-container">
                        <div
                            v-for="item in stats"
                            :key="item.id"
                            class="stat-item"
                        >
                            <img :src="item.icon" alt="" class="icon" />
                            <div class="text">
                                <div class="label">{{ item.label }}</div>
                                <div class="value">{{ item.value }}</div>
                            </div>
                        </div>
                    </div>

                    <h3>信访形式</h3>
                    <div ref="leftPie" class="chart pie-chart"></div>
                </section>
            </div>

            <!-- 右侧 -->
            <div class="section-right">
                <div class="rt-list">
                </div>

                <div class="rt-chart">
                    <h3>热点问题（三级内容分类情况）</h3>
                    <div ref="rightBar" class="chart bar-chart"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import DatavHead from '@/components/DatavHead/index.vue'
import letterIcon from '@/assets/images/history2.png'

export default {
    name: 'index',

    components: { DatavHead },

    data() {
        return {
            // 统计卡片数据
            stats: [
                { id: 1, icon: letterIcon, value: 5695, label: '信访件次' },
                { id: 2, icon: letterIcon, value: 5559, label: '信访事项' },
                { id: 3, icon: letterIcon, value:   12, label: '扬言件次' },
                { id: 4, icon: letterIcon, value: 6525, label: '信访人次' },
                { id: 5, icon: letterIcon, value:  521, label: '来访人次' },
                { id: 6, icon: letterIcon, value:   25, label: '集体访人次' }
            ],

            // 饼图数据
            pieData: [
                { value: 79.9, name: '网上信访' },
                { value: 11.7, name: '来信' },
                { value:  8.4, name: '来访' }
            ],

            // 柱状图数据
            categories: [
                '消费投诉',
                '制售假冒伪劣商品',
                '拖欠农民工工资',
                '市场交易',
                '职工养老保险'
            ],
            values: [734, 213, 202, 194, 182],

            // ECharts 实例
            leftPieChart: null,
            rightBarChart: null
        }
    },

    mounted() {
        this.initLeftPie()
        this.initRightBar()
        window.addEventListener('resize', this.resizeCharts)
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.resizeCharts)
        this.disposeCharts()
    },

    methods: {
        // 初始化 左侧饼图
        initLeftPie() {
            this.leftPieChart = echarts.init(this.$refs.leftPie)
            this.leftPieChart.setOption(this.getLeftPieOption())
        },

        // 初始化 右侧柱状图
        initRightBar() {
            this.rightBarChart = echarts.init(this.$refs.rightBar, null, {
                backgroundColor: 'transparent'
            })
            this.rightBarChart.setOption(this.getRightBarOption())
        },

        // 饼图配置
        getLeftPieOption() {
            return {
                backgroundColor: 'transparent',
                tooltip: { trigger: 'item', formatter: '{b}：{d}%' },
                series: [
                    {
                        type: 'pie',
                        radius: '60%',
                        center: ['50%', '50%'],
                        data: this.pieData,
                        label: { color: '#fff', formatter: '{b}：{d}%', fontSize: 24 },
                        labelLine: { lineStyle: { color: '#ccc' } }
                    }
                ]
            }
        },

        // 柱状图配置
        getRightBarOption() {
            const seriesData = this.values.map((v, i) => ({
                value: v,
                unit: i === 0 ? '次' : '件次'
            }))

            return {
                backgroundColor: 'transparent',
                grid: { top: 40, bottom: 40, left: 60, right: 20 },
                xAxis: {
                    type: 'category',
                    data: this.categories,
                    axisLine: { lineStyle: { color: '#ccc' } },
                    axisTick: { show: false },
                    axisLabel: { color: '#fff', interval: 0,fontSize : 24 }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
                    axisLabel: { color: '#fff',fontSize : 24 }
                },
                series: [
                    {
                        type: 'bar',
                        data: seriesData,
                        barWidth: '20%',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {offset: 0, color: 'rgb(0,212,193)'},
                                {offset: 1, color: 'rgba(98,117,209,0)'}
                            ])
                        },
                        label: {
                            show: true,
                            position: 'top',
                            color: '#fff',
                            fontSize: 24,
                            formatter: ({ data }) => `${data.value}${data.unit}`
                        }
                    }
                ]
            }
        },

        // 重置所有图表尺寸
        resizeCharts() {
            this.leftPieChart?.resize()
            this.rightBarChart?.resize()
        },

        // 销毁所有图表实例
        disposeCharts() {
            this.leftPieChart?.dispose()
            this.rightBarChart?.dispose()
        }
    }
}
</script>

<style lang="scss" scoped>
.home {
    .cont {
        display: flex;

        .sectionleft {
            width: 968px;

            .sec1-nav {
                display: flex;
                align-items: center;
                margin-bottom: 16px;

                img { display: none }
                ul {
                    display: flex;
                    margin-left: 24px;
                    li { margin-right: 16px; }
                }
            }

            .sec1-list {
                h3 { color: #fff; margin: 12px 0; }

                .stats-container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    gap: 20px;
                    height: 800px;
                    .stat-item {
                        display: flex;
                        align-items: center;
                        border-radius: 8px;
                        padding: 12px;

                        .icon { width: 100px; height: 100px; margin-right: 12px; }
                        .text {
                            .label { font-size: 38px; color: #ccc; }
                            .value { font-size: 32px; color: #fff; font-weight: bold; }
                        }
                    }
                }

                .pie-chart {
                    width: 968px;
                    height: 500px;
                    margin-top: 20px;
                }
            }
        }

        .section-right {
            margin-left: 40px;
            flex: 1;

            .rt-list {
                height: 800px;
                /* 填充右侧列表区域 */
            }

            .rt-chart {
                margin-top: 40px;

                h3 { color: #fff; margin-bottom: 12px; }
                .bar-chart {
                    width: 100%;
                    height: 500px;
                }
            }
        }
    }
}
</style>
