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
        // 新增第二组圆柱的数据（记得长度和 dataName 一致）
        dataValue2: {
            type: Array,
            default: () => [360, 320, 280, 220, 200, 180, 150, 130, 90, 60]
        },
        // 第二根柱子的渐变色
        gradient2: {
            type: Array,
            default: () => ['#f4731c', '#fdaa24']
        },
        topColor2:   { type: String, default: '#e4a31a' },
        bottomColor2:{ type: String, default: '#ee7118' },
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
        opacity:    { type: Number, default: 1 },
        left:    { type: String, default: '8' },
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
            const {
                dataName,
                dataValue,      // 蓝色部分
                dataValue2,     // 橙色部分
                barWidth,
                symbolSize,
                topColor,
                bottomColor,
                gradient,
                topColor2,
                bottomColor2,
                gradient2,
                opacity
            } = this

            // 蓝色 + 橙色 的总高度，用来放“最上面的橙色圆帽”
            const totalValue = dataValue.map((v, i) => v + (dataValue2?.[i] || 0))

            return {
                tooltip: {},
                grid: {
                    borderWidth: 0,
                    top: '15%',
                    left: this.left + '%',
                    bottom: '5%',
                    height: '70%',
                    width: '95%'
                },
                xAxis: {
                    type: 'category',
                    data: dataName,
                    axisLine: { lineStyle: { color: 'rgba(120,200,255,.4)' } },
                    axisTick: { show: false },
                    axisLabel: { color: '#ffffff', fontSize: 12, margin: 12 }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: { color: '#79bfff', fontSize: 12 },
                    splitLine: {
                        show: true,
                        lineStyle: { color: 'rgba(120,200,255,.35)', type: 'dashed' }
                    }
                },
                series: [
                    // ========== 顶部橙色圆帽（总高度） ==========
                    {
                        type: 'pictorialBar',
                        symbolSize,
                        symbolOffset: [0, -5],
                        symbolPosition: 'end',
                        z: 20,
                        data: totalValue,
                        itemStyle: { color: topColor2, opacity }
                    },

                    // ========== 蓝色和橙色交界处的小圆帽（可选，美化） ==========
                    {
                        type: 'pictorialBar',
                        symbolSize,
                        symbolOffset: [0, -5],
                        symbolPosition: 'end',
                        z: 19,
                        data: dataValue, // 交界高度 = 蓝色高度
                        itemStyle: { color: bottomColor2, opacity }
                    },

                    // ========== 底部蓝色圆帽 ==========
                    {
                        type: 'pictorialBar',
                        symbolSize,
                        symbolOffset: [0, 5],
                        z: 12,
                        data: dataValue,
                        itemStyle: { color: bottomColor, opacity }
                    },

                    // ========== 蓝色柱身（底部） ==========
                    {
                        type: 'bar',
                        barWidth,
                        stack: 'total',             // 关键：堆叠
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: gradient[0] },
                                { offset: 1, color: gradient[1] }
                            ]),
                            opacity
                        },
                        data: dataValue
                    },

                    // ========== 橙色柱身（堆在蓝色上面） ==========
                    {
                        type: 'bar',
                        barWidth,
                        stack: 'total',             // 跟上面同一个 stack 名
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: gradient2[0] },
                                { offset: 1, color: gradient2[1] }
                            ]),
                            opacity
                        },
                        data: dataValue2
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
