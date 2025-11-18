<template>
    <div class="bubble-chart" ref="bubbleChart"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
    name: 'BubbleChart',
    mounted () {
        this.chart = echarts.init(this.$refs.bubbleChart)
        this.chart.setOption(this.getOption())
        window.addEventListener('resize', this.chart.resize)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.chart.resize)
        this.chart && this.chart.dispose()
    },
    methods: {
        getOption () {
            // 手动控制每个气泡的位置 [x, y, 数值]
            const data = [
                { name: '交通管理', value: [40, 80, 5200], type: 'traffic' },
                { name: '交通管理', value: [60, 70, 5200], type: 'traffic' },
                { name: '交通管理', value: [50, 60, 5200], type: 'traffic' },
                { name: '交通管理', value: [35, 55, 5200], type: 'traffic' },

                { name: '行政复议', value: [70, 55, 1500], type: 'admin' },
                { name: '行政复议', value: [65, 40, 1500], type: 'admin' },
                { name: '行政复议', value: [55, 35, 1500], type: 'admin' },

                { name: '法律服务', value: [25, 65, 850], type: 'law' },
                { name: '法律服务', value: [20, 45, 850], type: 'law' },
                { name: '法律服务', value: [75, 30, 850], type: 'law' },

                { name: '移民', value: [30, 30, 850], type: 'immigrate' }
            ]

            // 颜色分组（外圈有一点渐变效果）
            const colorMap = {
                traffic: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
                    { offset: 0, color: 'rgba(126, 206, 255, 1)' },
                    { offset: 1, color: 'rgba(6, 107, 193, 1)' }
                ]),
                admin: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
                    { offset: 0, color: 'rgba(135, 243, 192, 1)' },
                    { offset: 1, color: 'rgba(7, 142, 77, 1)' }
                ]),
                law: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
                    { offset: 0, color: 'rgba(255, 144, 174, 1)' },
                    { offset: 1, color: 'rgba(183, 26, 68, 1)' }
                ]),
                immigrate: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
                    { offset: 0, color: 'rgba(255, 238, 144, 1)' },
                    { offset: 1, color: 'rgba(197, 160, 30, 1)' }
                ])
            }

            return {
                backgroundColor: 'transparent',
                grid: { left: 0, right: 0, top: 0, bottom: 0 },
                xAxis: {
                    type: 'value',
                    min: 0,
                    max: 100,
                    show: false
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 100,
                    show: false
                },
                series: [
                    {
                        type: 'scatter',
                        coordinateSystem: 'cartesian2d',
                        symbol: 'circle',
                        // 根据数值控制圆大小（你可以自己改算法）
                        symbolSize: val => {
                            const v = val[2]
                            if (v >= 5000) return 110
                            if (v >= 1500) return 95
                            return 85
                        },
                        data: data.map(d => ({
                            ...d,
                            itemStyle: {
                                color: colorMap[d.type],
                                shadowBlur: 25,
                                shadowColor: 'rgba(0, 0, 0, 0.4)'
                            },
                            label: {
                                show: true,
                                formatter: params => {
                                    const v = params.value[2]
                                    return `{title|${params.data.name}}\n{value|${v}}`
                                },
                                align: 'center',
                                verticalAlign: 'middle',
                                rich: {
                                    title: {
                                        fontSize: 14,
                                        color: '#ffffff'
                                    },
                                    value: {
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        color: '#ffffff',
                                        lineHeight: 24
                                    }
                                }
                            }
                        })),
                        emphasis: {
                            scale: true,
                            scaleSize: 8
                        },
                        zlevel: 2
                    }
                ]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.bubble-chart {
    width: 100%;
    height: 100%;
}
</style>
