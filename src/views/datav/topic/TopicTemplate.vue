<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="conthead">
                <h2>新就业群体专题分析 </h2><span>全区信访部门: 34件次    |    自治区信访局: 23件次</span>
            </div>
            <div class="sectionhead">
                <div class="sectionhead-left">
                    <div class="subtitle">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>今日信访情况</h3>
                    </div>
                    <ul class="proc-list">
                        <li class="proc-item">
                            <!-- 左 -->
                            <div class="proc-type">
                                <img src="../../../assets/images/zllist2.png" alt="">
                            </div>

                            <!-- 中：总量 -->
                            <div class="proc-total">
                                转交信访量 <span class="num">2 件次</span>
                            </div>
                            <!-- 右-->
                            <div class="proc-extra">
                                <p>已办结 <span class="num green">3件次</span></p>
                                <p>办理中 <span class="num yellow">4件次</span></p>
                            </div>
                        </li>
                        <li class="proc-item">
                            <!-- 左 -->
                            <div class="proc-type">
                                <img src="../../../assets/images/zllist4.png" alt="">
                            </div>

                            <!-- 中：总量 -->
                            <div class="proc-total">
                                涉及信访人数 <span class="num">2 人</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="sectionhead-centre">
                    <div style="margin-bottom: 10px" class="subtitle subtitle2">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>群体类别分布</h3>
                    </div>
                    <div style="padding-right: 25px;">
                        <RdwtChart
                            ref="chart"
                            height="160px"
                            :bar-width="22"
                        />
                    </div>
                </div>
                <div class="sectionhead-right">
                    <div class="subtitle">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>新就业群体信访热词</h3>
                    </div>
                    <div class="word-cloud" ref="wc"></div>
                </div>
            </div>

            <div class="section">

                <div class="section-left">
                    <div class="section-left-top">
                        <div class="title"><h4>信访人特征</h4></div>
                        <img class="deepseekdesc" src="../../../assets/images/deepseek.png" alt="" >
                        <p class="section-left-top-desc">一，年龄分布情况
                            从年龄分布情况来看，男性信访人致为1189人，女性信访人致为174人，总性政策和优化股务提供了重要参考依猴</p>
                    </div>

                    <div class="section-left-right-top">
                        <div class="title"><h4>性别和年龄分布</h4></div>
                        <div class="agechart" ref="agechart"></div>
                    </div>

                    <div class="section-left-top">
                        <div class="title"><h4>主要诉求</h4></div>
                        <img class="deepseekdesc" src="../../../assets/images/deepseek.png" alt="" >
                        <p class="section-left-top-desc">一，年龄分布情况
                            从年龄分布情况来看，男性信访人致为1189人，女性信访人致为174人，总性政策和优化股务提供了重要参考依猴</p>
                    </div>

                    <div class="section-left-right-top">
                        <div class="title"><h4>住址分布</h4></div>
                        <div style="padding-right: 25px;">
                            <RdwtChart
                                ref="chart"
                                left=8
                                height="200px"
                                :bar-width="22"
                            />
                        </div>
                    </div>

                </div>

                <div class="section-right">
                    <div class="section-right-left">
                        <div class="title"><h4>高频信访人</h4></div>
                        <RankGradientBars :items="cityList" :barHeight="12" />
                    </div>

                    <div class="section-right-right">
                        <div class="section-right-right-top">
                            <div class="title"><h4>被反映主体</h4></div>
                            <div ref="ReasonDonutChart" style="width:100%;height:220px;"></div>
                        </div>
                        <div class="section-right-right-bottom">
                            <div class="title"><h4>内容分类</h4></div>
                            <div style="padding-right: 25px;">
                                <RdwtChart
                                    ref="chart"
                                    height="220px"
                                    left=12
                                    :bar-width="22"
                                />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import DatavHead from '@/components/DatavHead/index.vue'
import RdwtChart from '@/components/BarChart/index.vue'
import RankGradientBars from '@/components/RankGradientBars/index.vue'
import img from '@/assets/images/leftlist2chartbp_03.png'
export default {
    name: 'index',
    components: { RankGradientBars, RdwtChart, DatavHead },
    data () {
        return {
            chart: null,
            cityList: [
                { name: '拉萨市', value: 90 },
                { name: '日喀则市', value: 85 },
                { name: '山南市', value: 70 },
                { name: '林芝市', value: 65 },
                { name: '昌都市', value: 50 },
                { name: '昌都市', value: 50 },
                { name: '昌都市', value: 50 },
                { name: '昌都市', value: 50 },
                { name: '昌都市', value: 50 },
                { name: '那曲市', value: 40 },
                { name: '阿里地区', value: 20 }
            ],
            rawList: [
                { value: 12, name: '集体访',    color: '#FFC557' },
                { value: 32, name: '联名网上信访',    color: '#2FE7BF' },
                { value: 32, name: '联名信',    color: '#3BB8FF' },
            ],
        }
    },
    mounted () {
        this.chart = echarts.init(this.$refs.wc)
        this.chart.setOption(this.getOption())

        this.chart1 = echarts.init(this.$refs.agechart)
        this.chart1.setOption(this.getOption1())

        this.chart2 = echarts.init(this.$refs.ReasonDonutChart)
        this.chart2.setOption(this.getOption2())

        window.addEventListener('resize', this.resize)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.resize)
        this.chart && this.chart.dispose()
        this.chart1 && this.chart1.dispose()
        this.chart2 && this.chart2.dispose()

    },
    computed: {
        pieData () {
            const gapValue = 5
            const result = []

            const gradients = [
                [
                    { offset: 0, color: '#FFC557' },
                    { offset: 1, color: '#C8891A' }
                ],
                [
                    { offset: 0, color: '#2FE7BF' },
                    { offset: 1, color: '#0C7A5A' }
                ],
                [
                    { offset: 0, color: '#3BB8FF' },
                    { offset: 1, color: '#1C72FF' }
                ]
            ]

            this.rawList.forEach((item, index) => {

                result.push({
                    ...item,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,   // 上到下渐变
                            gradients[index]
                        ),
                        shadowBlur: 0,
                    }
                })

            })

            return result
        }


    },
    methods: {
        resize () {
            this.chart && this.chart.resize()
        },
        getOption1 () {
            const ageList = [
                '71岁以上',
                '60-70岁',
                '51-60岁',
                '41-50岁',
                '31-40岁',
                '21-40岁',
                '21岁以下'
            ]

            const leftData = [-10, -45, -80, -90, -70, -50, -15]

            const rightData = [20, 120, 180, 210, 190, 130, 30]

            const femaleTotal = leftData.reduce((s, v) => s + Math.abs(v), 0)
            const maleTotal   = rightData.reduce((s, v) => s + v, 0)
            const total       = femaleTotal + maleTotal

            const femalePercent = ((femaleTotal / total) * 100).toFixed(1)
            const malePercent   = ((maleTotal / total) * 100).toFixed(1)



            return {
                backgroundColor: 'transparent',
                grid: {
                    top: 10,
                    bottom: 10,
                    left: 20,
                    right: 40,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                    formatter (params) {
                        const name = params[0].name
                        const left  = Math.abs(params[0].value)   // 负数取绝对值
                        const right = params[1].value
                        return [
                            name,
                            `${params[0].marker} 女性：${left}`,
                            `${params[1].marker} 男性：${right}`
                        ].join('<br/>')
                    }
                },
                legend: {
                    top: 0,
                    right: 20,
                    textStyle: {
                        color: '#A8D8FF',
                        fontSize: 14
                    },
                    itemWidth: 18,
                    itemHeight: 10,
                    icon: 'rect',
                    formatter(name) {
                        if (name === '女性') {
                            return `女性${femaleTotal}(${femalePercent}%)`
                        }
                        if (name === '男性') {
                            return `男性${maleTotal}(${malePercent}%)`
                        }
                    },
                    data: ['女性', '男性']
                },


                xAxis: {
                    type: 'value',
                    min: -60,
                    max: 220,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(120, 200, 255, .4)'
                        }
                    },
                    axisLabel: {
                        color: '#7ecbff'
                    }
                },
                yAxis: {
                    type: 'category',
                    data: ageList,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: {
                        color: '#7ecbff',
                        margin: 18
                    }
                },
                series: [
                    // 左侧红色渐变
                    {
                        name: '女性',
                        type: 'bar',
                        barWidth: 18,
                        data: leftData,
                        z: 2,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                1, 0, 0, 0, // 从右到左
                                [
                                    { offset: 0, color: '#47314c' }, // 中间靠近 0 处透明
                                    { offset: 1, color: '#f9676b' }  // 左边红色
                                ]
                            )
                        }
                    },
                    // 右侧蓝色渐变
                    {
                        name: '男性',
                        type: 'bar',
                        barWidth: 18,
                        data: rightData,
                        z: 2,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 1, 0, // 从左到右
                                [
                                    { offset: 0, color: '#015b9b' },   // 中间靠近 0 透明
                                    { offset: 1, color: '#00a2ff' }    // 右边亮蓝
                                ]
                            )
                        }
                    }
                ]
            }
        },

        getOption () {
            const data = [
                { name: '劳动和社会保障', value: 100 },
                { name: '生命安全',       value: 80 },
                { name: '农村农业',       value: 70 },
                { name: '恶意扣款罚款',   value: 60 },
                { name: '科技与信息产业', value: 55 },
                { name: '组织人事',       value: 50 },
                { name: '账号封禁和解封', value: 45 },
                { name: '订单违规取消',   value: 40 },
                { name: '租车骗局',       value: 35 }
            ]

            return {
                backgroundColor: 'transparent',
                tooltip: { show: false },
                series: [
                    {
                        type: 'wordCloud',
                        shape: 'pentagon',          // 布局形状，
                        gridSize: 10,              // 单词之间的间距
                        sizeRange: [15, 30],      // 字号范围
                        rotationRange: [0, 0],    // 不旋转（全是水平的）
                        textStyle: {
                            fontWeight: 'normal',
                            color () {
                                const colors = ['#7be56a', '#ffdf6b', '#73d5ff', '#ff7878', '#5ec0ff']
                                return colors[Math.floor(Math.random() * colors.length)]
                            }
                        },
                        data
                    }
                ]
            }
        },

        getOption2() {
            const img = require('@/assets/images/leftlist2chartbp_03.png')
            return {
                backgroundColor: 'transparent',

                title: {
                    left: 'center',
                    top: '45%',
                    text: `{name|占比}`,
                    textStyle: {
                        rich: {
                            name: {
                                fontSize: 28,
                                color: '#fff'
                            }
                        }
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: p => p.name !== 'gap'
                        ? `${p.name}：${p.value}（${p.percent}%）`
                        : ''
                },
                graphic: [
                    {
                        type: 'image',
                        left: '30.5%',
                        top: '9.5%',
                        style: {
                            image: img,
                            width: 180,
                            height: 180,
                            opacity: 0.7
                        },
                        z: 0
                    }
                ],
                series: [
                    {
                        name: '被反映主体',
                        type: 'pie',
                        radius: [60, 80],
                        center: ['50%', '50%'],
                        minAngle: 10,
                        startAngle: 90,
                        clockwise: true,
                        roseType: false,

                        labelLine: {
                            show: true,
                            length: 20,
                            length2: 30,
                            lineStyle: { color: 'rgba(120,170,255,.7)', width: 1.5 }
                        },

                        label: {
                            show: true,
                            formatter: p => {
                                if (p.name === 'gap') return ''
                                const idx = p.dataIndex

                                return `{name|${p.name}}\n{num${idx}|${p.percent}%}\n{num${idx}|${p.value}件}`
                            },
                            rich: {
                                name: {
                                    color: '#ffffff',
                                    fontSize: 16
                                },

                                //  num0/num1/num2 样式
                                ...(() => {
                                    const r = {}
                                    this.rawList.forEach((item, i) => {
                                        r[`num${i}`] = {
                                            fontFamily: 'DS-Digital, DSfont, monospace',
                                            fontSize: 16,
                                            color: item.color,
                                        }
                                    })
                                    return r
                                })()
                            }
                        },

                        data: this.pieData
                    }
                ]
            }
        }
    }
}
</script>

<style scoped lang="scss">
.home{
    .cont{
        .conthead{
            display: flex;
            align-items: flex-end;
            h2{
                font-weight: bold;
                font-size: 26px;
                margin: 0;
                background: linear-gradient(to bottom, #2d94f4, #0870d8);
                -webkit-background-clip: text;   /* 背景裁剪成文字形状 */
                -webkit-text-fill-color: transparent; /* 让文字透明，只显示背景 */
            }
            span{
                font-size: 18px;
                color: #1a63bb;
                margin-left: 20px;
            }
        }

        .sectionhead{
            display: flex;
            gap: 25px;
            margin-top: 10px;
            .sectionhead-left{
                background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                border-radius: 10px;
                width: 450px;
                .proc-list {
                    margin: 0;
                    list-style: none;
                    padding: 0 25px;
                }

                .proc-item {
                    position: relative;
                    margin-bottom: 12px;
                    padding: 12px 20px;
                    overflow: hidden;
                    background: url("../../../assets/images/blnxblue.png") no-repeat center center;
                    background-size: 100% 100%;

                    // ⭐ 每行用 grid：左中右三列
                    display: grid;
                    grid-template-columns: 85px 1fr 100px;
                    column-gap: 10px;
                    align-items: center;
                    color: #6bb5ff;

                }

                /* 左：类型 */
                .proc-type {
                    font-size: 16px;
                    text-align: center;
                }

                /* 中：总量 */
                .proc-total {
                    font-size: 16px;

                    .num {
                        margin: 0 4px;
                        font-size: 16px;
                        color: #cfe8ff;

                    }
                }

                /* 右：重复信访 + 化解率 */
                .proc-extra {
                    text-align: right;
                    font-size: 14px;
                    color: #6bb5ff;
                    line-height: 1.6;
                    p{margin: 0;}

                    .num {
                        &.green {
                            color: #2fe7bf;
                        }
                        &.yellow {
                            color: #ffd95c;
                        }
                    }
                }

                .dept-list {
                    margin: 0;
                    list-style: none;
                    padding: 0 25px;
                }

                .dept-item {
                    position: relative;
                    padding: 15px 28px;
                    margin-bottom: 8px;
                    background: url("../../../assets/images/blnxblue.png") no-repeat center center;
                    background-size: 100% 100%;
                    overflow: hidden;

                    /* 一行左右布局 */
                    display: grid;
                    grid-template-columns: 80px 1fr;
                    align-items: center;
                    color: #6bb5ff;

                }

                .dept-name {
                    font-size: 16px;
                }

                .dept-stats {
                    text-align: right;
                    font-size: 14px;
                    color: #6bb5ff;

                    p {
                        margin: 4px 0;
                    }

                    .g {
                        color: #2fe7bf;
                        padding-right: 4px;
                    }

                    .y {
                        color: #ffd95c;
                    }
                }
            }
            .sectionhead-centre{
                background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                border-radius: 10px;
                flex: 1;
            }
            .sectionhead-right{
                background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                border-radius: 10px;
                width: 450px;
                .word-cloud {
                    width: 100%;
                    height: 160px;
                }
            }
        }

        .section{
            margin-top: 25px;
            display: flex;
            .deepseekdesc{
                position: absolute;
                top: 0;
                right: 0;
            }
            .title{background: none}

            .section-left{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 25px;
                width: 60%;
                padding-right: 25px;
                .section-left-top{
                    width: 450px;
                    background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                    border-radius: 10px;
                    position: relative;
                    padding-top: 10px;
                    .section-left-top-desc{
                        font-size: 14px;
                        color: #5494d6;
                        margin: 0;
                        height: 220px;
                        overflow: auto;
                        padding: 0 25px 25px;
                    }
                }
                .section-left-right-top{
                    background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                    border-radius: 10px;
                    padding-top: 10px;
                    width: calc(100% - 475px);
                    .agechart{
                        width: 100%;
                        height: 200px;
                    }
                }
            }

            .section-right{
                width: 40%;
                display: flex;
                gap: 25px;
                .section-right-left{
                    background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                    border-radius: 10px;
                    padding-top: 10px;
                    width: calc(100% - 475px);
                    .rank-bars{
                        padding: 0 10px;
                    }
                }
                .section-right-right{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                    .section-right-right-top{
                        background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                        border-radius: 10px;
                        padding-top: 10px;
                    }
                    .section-right-right-bottom{
                        background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                        border-radius: 10px;
                        padding-top: 10px;
                    }
                }
            }
        }
    }
}
</style>

