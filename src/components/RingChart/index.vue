<template>
    <div :id="id" class="ring-chart" />
</template>

<script>
import * as echarts from 'echarts'

export default {
    name: 'RingChart',
    props: {
        id: { type: String, required: true },
        percent: { type: Number, default: 0 },
        color: { type: Array, default: () => ['#f8f372', '#f1c94a'] }
    },
    mounted() {
        this.chart = echarts.init(document.getElementById(this.id))
        this.chart.setOption(this.getOption(this.percent, this.color))
        window.addEventListener('resize', this.chart.resize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.chart.resize)
        this.chart && this.chart.dispose()
    },
    methods: {
        getOption(percent, colorArr) {
            return {
                backgroundColor: 'transparent',
                title: {
                    text: `{num|${percent}}{unit|%}`,
                    left: 'center',
                    top: 'center',
                    textStyle: {
                        rich: {
                            num: {
                                fontSize: 42,
                                fontWeight: 'bold',
                                color: colorArr[1],
                            },
                            unit: {
                                fontSize: 21,
                                padding: [15, 0, 6, 2], // 让 % 垂直微调一下
                                color: colorArr[1]
                            }
                        }
                    }
                },
                series: [
                    // 外圈细线
                    {
                        type: 'pie',
                        radius: ['80%', '80%'],
                        silent: true,
                        label: { show: false },
                        data: [
                            {
                                value: 100,
                                itemStyle: {
                                    color: 'transparent',
                                    borderColor: '#6bb5ff',
                                    borderWidth: 1
                                }
                            }
                        ]
                    },

                    // 进度环
                    {
                        type: 'pie',
                        radius: ['72%', '80%'],
                        startAngle: 90,
                        silent: true,
                        clockwise: true,
                        label: { show: false },
                        data: [
                            {
                                value: percent,
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            { offset: 0, color: colorArr[0] },
                                            { offset: 1, color: colorArr[1] }
                                        ]
                                    )
                                }
                            },
                            {
                                value: 100 - percent,
                                itemStyle: { color: 'transparent' }
                            }
                        ]
                    }
                ]
            }
        }
    }
}
</script>

<style scoped>
.ring-chart {
    width: 160px;
    height: 160px;
    margin: 0 auto;
}
</style>
