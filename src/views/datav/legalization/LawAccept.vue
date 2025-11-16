<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="section">

                <div class="sectionhead">
                    <p>时间设置:</p>
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
                    <p>数据源:</p>
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
                </div>

                <div style="display: inline-block;width: 450px;">
                    <div class="section_left">
                        <div class="subtitle">
                            <img src="@/assets/images/subtitle-left.png" class="subtitle-left" alt="">
                            <h3>总量占比</h3>
                        </div>
                        <div style="padding: 0 20px">
                            <RdwtChart
                                ref="chart"
                                :data-name="names"
                                :data-value="values"
                                height="320px"
                                :bar-width="22"
                                left="10"
                            />
                        </div>
                    </div>
                    <div class="section_left">
                        <div class="subtitle">
                            <img src="@/assets/images/subtitle-left.png" class="subtitle-left" alt="">
                            <h3>信访形式与目的</h3>
                        </div>
                        <div class="review">
                            <div>
                                登记
                                <p>22<span class="per">%</span></p>
                            </div>
                            <div>
                                来访
                                <p>22<span class="per">%</span></p>
                            </div>
                            <div>
                                网上投诉
                                <p>22<span class="per">%</span></p>
                            </div>
                        </div>
                        <div ref="leftlist2chart" style="width:100%;height:220px;"></div>
                    </div>
                </div>

                <div class="sectcont">
                    <div class="transfer-panel">
                        <h4>转交申诉求决信访事项办理情况  </h4>
                        <div class="category-stats">
                            <div
                                class="category-item"
                                v-for="(item, index) in list"
                                :key="index"
                            >
                                <div class="value">{{ item.value }}</div>
                                <div class="label">{{ item.label }}</div>
                            </div>
                        </div>

                    </div>
                    <div class="sectcontlater">
                        <div style="margin-bottom: 10px" class="subtitle subtitle2">
                            <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                            <h3>应办理未办理情况</h3>
                        </div>

                        <div style="padding: 0 20px">
                            <RdwtChart
                                ref="chart"
                                :data-name="names"
                                :data-value="values"
                                height="355px"
                                :bar-width="22"
                                left="5"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div style="display: inline-block;width: 450px;vertical-align: top;">

                <div class="sectionright">
                    <div class="subtitle">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>国家局认定应受理未受理情况</h3>
                    </div>
                    <div class="transfer-panel">
                        <div class="transfer-header">
                            <span class="titlepanel">转送交办管办</span>
                            <span class="count">
                              转地方信访<span class="num">350</span>件
                            </span>
                        </div>

                        <div class="transfer-divider"></div>

                        <div class="transfer-list">
                            <p class="item">不予受理1</p>
                            <p class="item">不予受理2</p>
                            <p class="item">不予受理3</p>

                            <p class="gap"></p>

                            <p class="item">不再受理1</p>
                            <p class="item">不再受理2</p>
                            <p class="item">不再受理3</p>
                        </div>
                    </div>

                </div>

                <div class="sectionright">
                    <div class="subtitle">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>地方应受理未受理情况</h3>
                    </div>
                    <div class="transfer-panel" style="height: 345px;">
                        <div class="transfer-header">
                            <span class="titlepanel">转送交办管办</span>
                            <span class="count">
                              转地方信访<span class="num">350</span>件
                            </span>
                        </div>

                        <div class="transfer-divider"></div>

                        <div class="transfer-list">
                            <p class="item">不予受理1</p>
                            <p class="item">不予受理2</p>
                            <p class="item">不予受理3</p>

                            <p class="gap"></p>

                            <p class="item">不再受理1</p>
                            <p class="item">不再受理2</p>
                            <p class="item">不再受理3</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import DatavHead from '@/components/DatavHead/index.vue'
import RdwtChart from '@/components/BarChart/index.vue'

export default {
    name: 'index',
    components: { RdwtChart, DatavHead },
    data (){
        return {
            options1: ['今日', '本月','本年'],
            activeIndex1: 0,
            options2: ['全区', '自治区信访局'],
            activeIndex2: 0,
            names: ['国家','自治区','市','县'],
            values: [720,650,560,1430],
            list: [
                { value: 52, label: "转送交办督办" },
                { value: 52, label: "不予受理" },
                { value: 52, label: "不再受理" },
                { value: 52, label: "国家局认定应受理未受理" },
                { value: 52, label: "地方应受理未受理上报" }
            ],
        }
    },
    mounted() {
        this.ec1 = echarts.init(this.$refs.leftlist2chart)
        this.ec1.setOption(this.getOption1())
    },
    beforeDestroy() {
        this.ec1 && this.ec1.dispose()
    },
    methods: {
        handleClick1(i) {
            this.activeIndex1 = i
        },
        handleClick2(i) {
            this.activeIndex2 = i
        },
        getOption1 () {
            const img = require('@/assets/images/leftlist2chartbp_03.png')

            return {
                backgroundColor: 'transparent',
                toolbox: { show: true },

                title: {
                    text: '信访\n目的',
                    left: 'center',
                    top: '35%',
                    textStyle: { color: '#ffffff', fontSize: 24, }
                },



                tooltip: {
                    trigger: 'item',
                    formatter: p => `${p.name}：${p.value}（${p.percent}%）`
                },
                graphic: [
                    {
                        type: 'image',
                        left: '30.5%',
                        top: '4.5%',
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
                        name: '信访目的',
                        type: 'pie',
                        radius: [65, 80],
                        center: ['50%', '45%'],
                        startAngle: 0,
                        clockwise: true,
                        // ECharts 5 支持，做圆角端点
                        roundCap: true,
                        avoidLabelOverlap: true,
                        // 取消玫瑰图样式
                        roseType: false,

                        itemStyle: {
                            borderColor: '#ffffff10',  // 分段之间的细缝
                            borderWidth: 6,
                            shadowBlur: 6,
                            shadowColor: 'rgba(0,0,0,.18)'
                        },

                        label: {
                            show: true,
                            position: 'outside',
                            formatter: p => {
                                return `{name|${p.name}}`
                            },
                            rich: {
                                name: {
                                    color: '#f0f0f0',
                                    fontSize: 16,
                                    lineHeight: 18
                                },
                                num: {
                                    fontFamily: 'DS-Digital, DSfont, monospace', // DSfont 字体
                                    color: '#FFD95C',
                                    fontSize: 26,
                                    textShadowColor: 'rgba(255,217,92,.6)',
                                    textShadowBlur: 6
                                },
                                unit: {
                                    color: '#5db0ff',   // 百分号颜色
                                    fontSize: 16,
                                    padding: [10, 0, 0, 0]  // 给数字和 % 之间一点间距
                                }
                            }
                        },

                        labelLine: {
                            show: true,
                            length: 22,
                            length2: 26,
                            lineStyle: { color: 'rgba(120,170,255,.7)', width: 1.5 }
                        },

                        data: [
                            {
                                value: 40, name: '建议',
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: '#FFC557' },
                                        { offset: 1, color: '#C8891A' }
                                    ])
                                }
                            },
                            {
                                value: 38, name: '检举举报',
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: '#2FE7BF' },
                                        { offset: 1, color: '#0C7A5A' }
                                    ])
                                }
                            },
                            {
                                value: 32, name: '其他',
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: '#3BB8FF' },
                                        { offset: 1, color: '#1C72FF' }
                                    ])
                                }
                            }
                        ]
                    }
                ]
            }
        },
    }
}
</script>

<style scoped lang="scss">
@font-face {
    font-family: "DSfont";
    src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
}
$sz-font-family: "DSfont";

.home {
    .cont {
        .section {
            width: 1330px;
            height: 895px;
            display: inline-block;

            .sectionhead {
                display: flex;
                color: #6bb5ff;
                height: 26px;

                .seg-wrap {
                    margin-right: 50px;
                }

                p {
                    font-size: 18px;
                    vertical-align: top;
                    margin: 0 5px 0 0;
                    line-height: 24px;
                }
            }

            .section_left {
                width: 450px;
                height: 430px;
                vertical-align: top;
                border-radius: 10px;
                margin-top: 10px;
                margin-bottom: 15px;
                position: relative;
                display: inline-block;
                background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);

                .review{
                    display: flex;
                    justify-content: space-around;
                    gap: 10px;
                    padding: 0 40px;
                    margin-bottom: 20px;
                    div{
                        flex: 1;
                        text-align: center;
                        color: #FFFFFF;
                        font-size: 16px;
                        padding: 10px 0;
                        background: linear-gradient(to bottom, rgba(25, 99, 173, 0.3), rgba(38, 102, 171, 0.01));
                        p{
                            font-family: "DS-Digital", "DIN Alternate", monospace;
                            font-size: 30px;
                            color: #f3e04c;
                            margin: 0;
                            line-height: 40px;
                            .per{font-size: 14px;}
                        }
                    }
                }
            }

            .sectcont {
                width: 840px;
                display: inline-block;
                margin-left: 40px;
                margin-top: 10px;
                vertical-align: top;

                .transfer-panel {
                    height: 430px;
                    margin-bottom: 25px;
                    padding-top: 60px;
                    text-align: center;
                    .category-stats{
                        width: 100%;
                        display: inline-flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        vertical-align: top;
                        align-items: center;
                        justify-content: center;
                        margin-top: 50px;

                        .category-item{
                            width: 260px;
                            height: 100px;
                            margin-bottom: 20px;
                            color: #d0e4ff;
                            text-align: center;
                            font-size: 18px;
                            background: url("../../../assets/images/glow-base.png") no-repeat center 100%;
                            background-size: 80%;
                            .value{
                                color: #f3e04c;
                                font-size: 44px;
                                font-family: "DSfont", monospace;
                            }
                        }
                    }
                }

                .sectcontlater {
                    background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                    border-radius: 10px;
                }
            }
        }
        .sectionright{
            height: auto;
            margin-bottom: 25px;
            .transfer-panel {
                width: 100%;
                padding: 0 25px 25px;
                color: #6bb5ff;
                font-size: 18px;
                height: 365px;
                overflow: auto;
            }

            /* 头部左右布局 */
            .transfer-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;

                .title {
                    color: #ffffff;
                }

                .count {
                    .num {
                        color: #ffd84d;     // 350 高亮
                    }
                }
            }

            /* 虚线分割线 */
            .transfer-divider {
                border-bottom: 1px dashed rgba(120, 200, 255, 0.5);
                margin-bottom: 12px;
            }

            /* 列表部分 */
            .transfer-list {
                .item {
                    line-height: 25px;
                    margin-bottom: 0;
                }

                /* 两组之间的间隔 */
                .gap {
                    height: 10px;
                    margin: 0;
                }
            }

        }

    }
}
</style>

