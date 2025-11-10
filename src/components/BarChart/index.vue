<template>
    <div class="rdwt-chart" ref="el" :style="{ width, height }"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
    name: 'RdwtChart',
    props: {
        dataValue: {
            type: Array,
            default: () => [720,650,560,430,390,360,300,260,190,110]
        },
        dataName: {
            type: Array,
            default: () => ['住房公积金','产权交易','土地转让','集体资产管理','大气污染','规划建设','辖区管理','土地转让','集体资产管理','规划建设']
        },
        height: { type: String, default: '320px' },
        width:  { type: String, default: '100%' },
        barWidth:   { type: Number, default: 20 },
        symbolSize: { type: Array,  default: () => [20, 10] },
        topColor:   { type: String, default: '#2fd7ff' },
        bottomColor:{ type: String, default: '#0a78ff' },
        gradient:   { type: Array,  default: () => ['#1f73e1', '#1ccaf7'] },
        opacity:    { type: Number, default: 0.6 }
    },
    data () {
        return {
            ec: null,
            ro: null
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.render()
            // 自适应：容器尺寸变化
            if (window.ResizeObserver) {
                this.ro = new ResizeObserver(() => this.resize())
                this.ro.observe(this.$refs.el)
            }
            window.addEventListener('resize', this.resize, { passive: true })
            this.$emit('ready', this.ec)
        })
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.resize)
        if (this.ro) this.ro.disconnect()
        if (this.ec) { this.ec.dispose(); this.ec = null }
    },
    watch: {
        // 数据或外观参数变化时重绘
        dataName () { this.render() },
        dataValue () { this.render() },
        barWidth () { this.render() },
        symbolSize () { this.render() },
        topColor () { this.render() },
        bottomColor () { this.render() },
        gradient () { this.render() },
        opacity () { this.render() }
    },
    methods: {
        getOption () {
            const { dataName, dataValue, barWidth, symbolSize, topColor, bottomColor, gradient, opacity } = this
            return {
                tooltip: {},
                grid: { borderWidth: 0, top: '15%', left: '8%', bottom: '5%', height: '70%', width: '95%' },
                xAxis: {
                    type: 'category',
                    data: dataName,
                    axisLine: { lineStyle: { color: 'rgba(120,200,255,.4)' } },
                    axisTick: { show: false },
                    axisLabel: { color: '#79bfff', fontSize: 12, margin: 12 }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: { color: '#79bfff', fontSize: 12 },
                    splitLine: { show: true, lineStyle: { color: 'rgba(120,200,255,.35)', type: 'dashed' } }
                },
                series: [
                    {
                        type: 'pictorialBar',
                        symbolSize,
                        symbolOffset: [0, -5],
                        symbolPosition: 'end',
                        z: 12,
                        label: { normal: { show: true, position: 'top', color: '#fff' } },
                        data: dataValue,
                        itemStyle: { color: topColor, opacity }
                    },
                    {
                        type: 'pictorialBar',
                        symbolSize,
                        symbolOffset: [0, 5],
                        z: 12,
                        data: dataValue,
                        itemStyle: { color: bottomColor, opacity }
                    },
                    {
                        type: 'bar',
                        barWidth,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: gradient[0] },
                                { offset: 1, color: gradient[1] }
                            ]),
                            opacity
                        },
                        data: dataValue
                    }
                ]
            }
        },
        render () {
            if (!this.ec) this.ec = echarts.init(this.$refs.el)
            this.ec.setOption(this.getOption(), true)
        },
        resize () {
            if (this.ec) this.ec.resize()
        },
        /** 给父组件调用：快速更新数据 */
        setData (names = [], values = []) {
            if (!this.ec) return
            this.ec.setOption({
                xAxis: { data: names },
                series: [{ data: values }, { data: values }, { data: values }]
            })
        },
        /** 给父组件调用：获取实例 */
        getInstance () {
            return this.ec
        }
    }
}
</script>

<style scoped>
.rdwt-chart { outline: none; }
</style>
