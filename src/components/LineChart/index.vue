<template>
    <div class="line-chart" ref="el" :style="{ width, height }"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
    name: 'RdwtChart',
    props: {
        dataValue: { type: Array, default: () => [720,650,560,430,390,360,300,260,190,110] },
        dataName:  { type: Array, default: () => ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']},
        height:    { type: String, default: '320px' },
        width:     { type: String, default: '100%' },
        barWidth:  { type: Number, default: 3 },              // 复用为 lineWidth
        symbolSize:{ type: Array,  default: () => [5, 3] },  // 取第一个作为圆点大小
        topColor:  { type: String, default: '#ebda55' },       // 线条/圆点颜色
        bottomColor:{type: String, default: '#0a78ff' },       // 保留（未用）
        gradient:  { type: Array,  default: () => ['#1f73e1', '#1ccaf7'] }, // 面域渐变
        opacity:   { type: Number, default: 0.6 },
        left:    { type: Number, default: 8 },
    },
    data () {
        return { ec: null, ro: null }
    },
    mounted () {
        this.$nextTick(() => {
            this.render()
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
        dataName () { this.render() },
        dataValue () { this.render() },
        barWidth () { this.render() },       // 现在控制线宽
        symbolSize () { this.render() },
        topColor () { this.render() },
        bottomColor () { this.render() },
        gradient () { this.render() },
        opacity () { this.render() }
    },
    methods: {
        getOption () {
            const { dataName, dataValue, barWidth, symbolSize, topColor, gradient, opacity } = this
            return {
                tooltip: { trigger: 'axis', axisPointer: { type: 'line' } },
                grid: { borderWidth: 0, top: '15%', left: this.left+'%', bottom: '5%', height: '70%', width: '95%' },
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
                        type: 'line',
                        smooth: true,
                        data: dataValue,
                        showSymbol: true,
                        symbol: 'circle',
                        symbolSize: symbolSize[0] || 10,
                        lineStyle: { width: Math.max(2, Math.round(barWidth / 3)), color: topColor },
                        itemStyle: { color: topColor },

                        z: 10
                    }
                ]
            }
        },
        render () {
            if (!this.ec) this.ec = echarts.init(this.$refs.el)
            this.ec.setOption(this.getOption(), true)
        },
        resize () { if (this.ec) this.ec.resize() },
        /** 父组件快速更新数据 */
        setData (names = [], values = []) {
            if (!this.ec) return
            this.ec.setOption({ xAxis: { data: names }, series: [{ data: values }] })
        },
        /** 获取实例 */
        getInstance () { return this.ec }
    }
}
</script>

<style scoped>
.line-chart { outline: none; }
</style>
