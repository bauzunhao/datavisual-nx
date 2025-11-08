<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="sectionleft">
                <div class="stats-list">
                    <div
                        class="stat-card"
                        v-for="(item, idx) in stats"
                        :key="idx"
                    >
                        <div class="icon">
                            <img :src="item.icon" alt="" />
                        </div>
                        <div class="body">
                            <div class="title">{{ item.title }}</div>

                            <!-- 文字卡 -->
                            <div v-if="item.type==='text'" class="text-value">
                                <span class="main">{{ item.value }}</span>
                                <span v-if="item.sub" class="sub">({{ item.sub }})</span>
                                <span v-if="item.unit" class="unit">{{ item.unit }}</span>
                            </div>

<!--                            &lt;!&ndash; 半圆仪表 &ndash;&gt;-->
<!--                            <div-->
<!--                                v-else-->
<!--                                class="gauge"-->
<!--                                :ref="`gauge${idx}`"-->
<!--                            ></div>-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="simap">
                    <genpie-chart ref="child"  :height="950" viewType="generalView"></genpie-chart>
                </div>
            </div>
            <div class="sectionrt">
                <h3>赴区信访局走访</h3>
                <div ref="leftPie" class="leftPie pie-chart"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import genpieChart from '@/views/datav/petition/genpieChart'
import DatavHead from '@/components/DatavHead/index.vue'

import iconYellow from '@/assets/images/dataanaly.png'
import iconRed    from '@/assets/images/emergency.png'
import iconGreen  from '@/assets/images/emphasis.png'
import { getZoneGroupData } from '@/api/datav/petition/general'

export default {

name: "index",
    components: { DatavHead , genpieChart },
    data() {
        return {
            leftPieChart: null,
            stats: [
                {
                    type: 'text',
                    icon: iconYellow,
                    title: '国家信访局 登记占比',
                    percent: 47.07,
                    value: 45,
                    unit: '%'
                },
                {
                    type: 'text',
                    icon: iconRed,
                    title: '赴区信访局 走访（集体访）',
                    value: 11.0,
                    sub: 0.5,
                    unit: '万人次'
                },
                {
                    type: 'text',
                    icon: iconRed,
                    title: '赴地市走访（集体访）',
                    value: 18.4,
                    sub: 4.4,
                    unit: '万人次'
                },
                {
                    type: 'text',
                    icon: iconGreen,
                    title: '群众满意率',
                    percent: 92.7,
                    value: 79,
                    unit: '%'
                },
                {
                    type: 'text',
                    icon: iconGreen,
                    title: '信访事项一次性化解率',
                    percent: 93.83,
                    value: 89,
                    unit: '%'
                },
                {
                    type: 'text',
                    icon: iconGreen,
                    title: '发生初次信访情况同比',
                    percent: 13.27,
                    value: 11,
                    unit: '%'
                }
            ]
        }
    },
    mounted() {
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
        // 初始化所有 gauge
        this.stats.forEach((item, idx) => {
            if (item.type === 'gauge') {
                const dom = this.$refs[`gauge${idx}`]
                const chart = echarts.init(dom)
                const p = Math.min(Math.max(item.percent, 0), 100) / 100
                chart.setOption({
                    series: [{
                        type: 'gauge',
                        startAngle: 90,
                        endAngle: -270,
                        radius: '80%',
                        pointer: { show: false },
                        progress: { show: true, roundCap: true, width: 8 },
                        axisLine: {
                            lineStyle: {
                                width: 8,
                                color: [[p, '#3fc5f0'], [1, '#1e2a3a']]
                            }
                        },
                        axisTick:    { show: false },
                        splitLine:   { show: false },
                        axisLabel:   { show: false },
                        detail: {
                            valueAnimation: true,
                            formatter: '{value}%',
                            offsetCenter: ['0', '10%'],
                            fontSize: 16,
                            color: '#fff'
                        },
                        data: [{ value: item.percent }]
                    }]
                })
            }
        })
        this.renderChart()
    },
    methods :{
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
    }
}
</script>

<style scoped lang="scss">
.home{
    .cont{
        .sectionleft{
            width: 980px;
        .stats-list {
            display: flex;
            flex-direction: column;
            gap: 100px;
            width: 100%;
        }
        .stat-card {
            padding: 60px;
            display: flex;
            align-items: center;
            background: rgba(0,0,0,0.07);
            border-radius: 8px;
        }
        .stat-card .icon img {
            width: 60px;
            height: 60px;
            margin-right: 10px;
        }
        .stat-card .body {
            flex: 1;
            margin-left: 12px;
            display: flex;
            justify-content: space-between;

        }
        .stat-card .title {
            color: #ccc;
            font-size: 28px;
            margin-bottom: 4px;
        }
        /* 文字类型 */
        .text-value {
            display: flex;
            align-items: baseline;
        }
        .text-value .main {
            font-size: 36px;
            color: #fff;
            margin-right: 4px;
        }
        .text-value .sub {
            font-size: 28px;
            color: #f7c35d;
            margin-right: 4px;
        }
        .text-value .unit {
            font-size: 28px;
            color: #999;
        }
        /* 仪表盘占位 */
        .gauge {
            width: 80px;
            height: 50px; /* 半圆高 */
        }
    }

        .section {
            width: 1500px;
            display: inline-block;
            vertical-align: top;
            .simap {
                height: 925px;
                width: 100%;
                position: relative;
                zoom: 1.6;
            }
        }
        .sectionrt{
            width: 980px;
            display:inline-block ;
            .leftPie{
                width: 100%;
                height: 1600px;
            }
        }
    }
}
</style>
