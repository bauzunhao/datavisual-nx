<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="conthead">
                <p>时间设置:</p>
                <div class="seg-wrap">
                    <div class="seg-pill">
                        <button
                            v-for="(item, i) in options2"
                            :key="i"
                            :class="['seg-btn', { 'is-active': activeIndex2 === i }]"
                            @click="handleClick2(i)"
                        >
                            <span>{{ item }}</span>
                        </button>
                    </div>
                </div>
                <p>数据源:</p>
                <div class="seg-wrap">
                    <div class="seg-pill">
                        <button
                            v-for="(item, i) in options1"
                            :key="i"
                            :class="['seg-btn', { 'is-active': activeIndex1 === i }]"
                            @click="handleClick1(i)"
                        >
                            <span>{{ item }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="sectionleft">
                <div class="subtitle" >
                    <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                    <h3>信访次数TOP20</h3>
                </div>
                <div style="text-align: center;">
                    <div class="seg-wrap">
                        <div class="seg-pill">
                            <button
                                v-for="(item, i) in options3"
                                :key="i"
                                :class="['seg-btn', { 'is-active': activeIndex3 === i }]"
                                @click="handleClick3(i)"
                            >
                                <span>{{ item }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tabline">
                    <button
                        v-for="(t,i) in tabsh"
                        :key="i"
                        class="tabline__item"
                        :class="{ 'is-active': i === active1 }"
                        @click="active1 = i"
                    >
                        {{ t }}
                    </button>
                </div>
                <div class="RankGradientBars">
                    <RankGradientBars :items="cList" :barHeight="13" :rowicon="true" namewidth="55"/>
                </div>
            </div>
            <div class="section">

                <div class="section-list">
                    <div class="subtitle subtitle2" >
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>信访总量 : 323232</h3>
                    </div>
                   <div style="display: flex; gap: 30px;">

                       <div class="sect-bubble-chart">
                           <div class="title"><h4>信访突出问题</h4></div>
                           <div class="bubble-chart" ref="bubbleChart"></div>
                       </div>

                       <div class="sect-desc">
                           <div class="sect-desc-list" style="margin-bottom: 50px;">
                               <div class="title"><h4>信访突出问题</h4></div>
                               <p>扬言件数量 <span>12</span></p>
                               <p>占总量比重 <span>12</span></p>
                               <p>同比 <span class="red">15%</span></p>
                           </div>
                           <div class="sect-desc-list">
                               <div class="title"><h4>信访突出问题</h4></div>
                               <p>扬言件数量 <span>12</span></p>
                               <p>占总量比重 <span>12</span></p>
                               <p>同比 <span class="red">15%</span></p>
                           </div>
                       </div>

                       <div class="sect-pie-chart">
                           <div class="title"><h4>联名信情况	</h4></div>
                           <div ref="ReasonDonutChart" style="width:100%;height:300px;"></div>
                           <p>联名信数量     <span class="mag10">6367</span>    <span class="mag10">0.60%</span> <span class="bulep">同比</span> <span class="mintp">-54%</span></p>
                       </div>
                   </div>

                </div>

                <div class="section-list" style="margin-top: 25px;">
                    <div class="subtitle subtitle2" >
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>信访次数top</h3>
                    </div>
                    <RdwtChart
                        ref="chart"
                        :data-name="names"
                        :data-value="values"
                        left=5
                        height="240px"
                        :bar-width="22"
                    />
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import DatavHead from '@/components/DatavHead/index.vue'
import RankGradientBars from '@/components/RankGradientBars/index.vue'
import bubble1 from '@/assets/images/bubble5.png'
import bubble2 from '@/assets/images/bubble.png'
import bubble3 from '@/assets/images/bubble3.png'
import bubble4 from '@/assets/images/bubble4.png'
import img from '@/assets/images/leftlist2chartbp_03.png'
import RdwtChart from '@/components/BarChart/index.vue'

export default {
    name: 'index',
    components: { RdwtChart, RankGradientBars, DatavHead },
    data(){
        return {
            options1: ['全系统', '全区', '国家局', '部委', '自治区信访局'],
            activeIndex1: 0,
            options2: ['今日', '本月', '本年'],
            activeIndex2: 0,
            options3: ['件批次', '件人次'],
            activeIndex3: 0,
            cList: [
                { name: '张三', value: 100 , unit : 10, },
                { name: '张三', value: 100 , unit : 10, },
                { name: '张三', value: 11 , unit : 10, },
                { name: '张三', value: 32 , unit : 10, },
                { name: '张三', value: 12 , unit : 10, },
            ],
            tabsh: ['一级分类', '二级分类','三级分类'],
            active1: 0,
            rawList: [
                { value: 12, name: '集体访',    color: '#FFC557' },
                { value: 32, name: '联名网上信访',    color: '#2FE7BF' },
                { value: 32, name: '联名信',    color: '#3BB8FF' },
            ],
            names: ['住房公积金','产权交易','土地转让','集体资产管理','大气污染','规划建设','辖区管理','土地转让','集体资产管理','规划建设'],
            values: [720,650,560,430,390,360,1300,260,190,110]
        }
    },
    mounted () {
        this.chart = echarts.init(this.$refs.bubbleChart)
        this.chart.setOption(this.getOption())
        window.addEventListener('resize', this.chart.resize)

        this.ec1 = echarts.init(this.$refs.ReasonDonutChart)
        this.ec1.setOption(this.getOption1())
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
    beforeDestroy () {
        window.removeEventListener('resize', this.chart.resize)
        this.chart && this.chart.dispose()

        this.ec1 && this.ec1.dispose()
    },
    methods: {
        getBubbleIndex(size) {
            if (size < 70) return 1
            if (size < 80) return 2
            if (size < 90) return 3
            return 4
        },
        getOption () {
            const bubbleMap = {
                1: bubble1,
                2: bubble2,
                3: bubble3,
                4: bubble4,
            }
            const textColorMap = {
                1: '#0fbb92',
                2: '#42b8e3',
                3: '#ffbb38',
                4: '#e82457'
            }

            var chartdata = [
                { name: '交通管理1', sum: 231, size: 100 },
                { name: '交通管理2', sum: 80, size: 60 },
                { name: '钢铁1', sum: 108, size: 70 },
                { name: '碳排放1', sum: 80, size: 80 },
                { name: '碳排放1', sum: 80, size: 100 },
                { name: '碳排放1', sum: 80, size: 80 },
                { name: '碳排放1', sum: 80, size: 80 },
                { name: '碳排放1', sum: 80, size: 80 },
                { name: '碳排放1', sum: 80, size: 80 },
                { name: '钢铁2', sum: 108, size: 90 }
            ];

            const data = chartdata.map((item, index) => {
                const imgIndex = this.getBubbleIndex(item.size)   // 自动算出 1~4

                return {
                    name: item.name + '_' + index,
                    realName: item.name,
                    value: item.sum,
                    symbolSize: item.size,
                    draggable: true,

                    symbol: 'image://' + bubbleMap[imgIndex],

                    label: {
                        normal: {
                            show: true,
                            align: 'center',
                            verticalAlign: 'middle',
                            formatter: p => `{name|${p.data.realName}}\n{val|${p.data.value}}`,
                            rich: {
                                name: {
                                    fontSize: 14,
                                    color: textColorMap[imgIndex],
                                },
                                val: {
                                    fontSize: 14,
                                    color: '#ffffff',
                                }
                            },
                            fontSize: 14,
                            fontWeight: 'bold',
                        }
                    },

                    itemStyle: {
                        opacity: 1,
                        borderWidth: 0
                    }
                }
            })



            return {
                backgroundColor: 'transparent',

                animationDurationUpdate: idx => idx * 100,
                tooltip: {
                    show: false,
                },
                animationEasingUpdate: 'bounceIn',

                series: [
                    {
                        type: 'graph',
                        layout: 'force',
                        force: {
                            repulsion: 400,   // ⭐ 非常小的斥力（甚至可以设成 0）
                            gravity: 0.3,   // ⭐ 增大一点重力，让它们往中心吸
                            edgeLength: 40  // 随便给个小一点的就行
                        },
                        roam: true,
                        label: { normal: { show: true } },
                        data
                    }
                ]
            };
        },
        getOption1() {
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
                                fontSize: 36,
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
                        left: '26.5%',
                        top: '10%',
                        style: {
                            image: img,
                            width: 240,
                            height: 240,
                            opacity: 0.7
                        },
                        z: 0
                    }
                ],
                series: [
                    {
                        name: '联名信情况',
                        type: 'pie',
                        radius: [80, 100],
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
            color: #6bb5ff;
            height: 26px;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: flex-start;
            margin-bottom: 10px;
            .seg-wrap{
                margin-right: 30px;
            }
            p{
                font-size: 18px;
                vertical-align: top;
                margin: 0 5px 0 0;
                line-height: 24px;
            }
        }
        .sectionleft{
            .tabline {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 20px;
                gap: 34px;          /* 与图中间距接近 */
                line-height: 1;
                .tabline__item + .tabline__item {
                    position: relative;
                    margin-left: 34px;
                }
                .tabline__item + .tabline__item::before {
                    content: '';
                    position: absolute;
                    left: -34px;
                    top: 2px;
                    width: 2px;
                    height: 22px;
                    background: linear-gradient(180deg, transparent, #3aa0ff 45%, #3aa0ff 55%, transparent);
                    opacity: .6;
                    border-radius: 2px;
                }

            }
            .tabline__item {
                appearance: none;
                border: 0;
                background: transparent;
                padding: 0;
                font-size: 16px;
                letter-spacing: 2px;
                cursor: pointer;
                color: #3198f9;

                &.is-active {
                    color: #FFFFFF;

                }

                &:hover {
                    filter: brightness(1.1);
                }
            }
            .RankGradientBars{
                padding: 0 0 0 20px;
            }
        }
        .section{
            width: 1330px;
            height: 895px;
            display: inline-block;
            .section-list{
                background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                padding-bottom: 25px;
                border-radius: 10px;
                .sect-bubble-chart{
                    width: 400px;
                    height: 350px;
                    .bubble-chart {
                        width: 100%;
                        height: 100%;
                    }
                }
                .sect-desc{
                    color: #6bb5ff;
                    font-size: 16px;
                    width: 300px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    p{
                        padding: 0 20px 0 55px;
                    }
                    span{
                        color: white;
                        float: right;
                    }
                    .red{
                        color: red;
                    }
                }

                .sect-pie-chart{
                    width: 500px;
                    p{
                        margin: 0;
                        padding-left: 55px;
                        color: #FFFFFF;
                    }
                    .mag10{
                        margin: 0 10px;
                    }
                    .bulep{
                        color: #02498e;
                    }
                    .mint{
                        color: #5bdeab;
                    }
                }
            }


        }
    }
}
</style>

