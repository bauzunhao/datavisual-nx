<template>
<div class="home">
    <DatavHead :show-title="false" />
    <div class="cont">
        <div class="login-box">
            欢迎登录：<span class="username">{{ username }}</span>
            <button class="logout-btn" >退出</button>
        </div>
        <div class="sectionleft">
            <div class="subtitle">
                <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                <h3>今日信访情况</h3>
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
            <div class="leftlist1">
                <h4>总 量</h4>
                <img class="zongliangbp" src="@/assets/images/zongliangbp.png" alt="">
                <div class="leftlist1data">
                    <div class="nxk-grid">
                        <div class="nxk-item">
                            <div class="nxk-ic"><img src="@/assets/images/zllist1.png" alt=""></div>
                            <div class="nxk-txt">
                                <div class="nxk-num">860</div>
                                <div class="nxk-lab">信访件次</div>
                            </div>
                        </div>

                        <div class="nxk-item">
                            <div class="nxk-ic"><img src="@/assets/images/zllist2.png" alt=""></div>
                            <div class="nxk-txt">
                                <div class="nxk-num">860</div>
                                <div class="nxk-lab">信访事项</div>
                            </div>
                        </div>

                        <div class="nxk-item">
                            <div class="nxk-ic"><img src="@/assets/images/zllist3.png" alt=""></div>
                            <div class="nxk-txt">
                                <div class="nxk-num">860</div>
                                <div class="nxk-lab">扬言件次</div>
                            </div>
                        </div>

                        <div class="nxk-item">
                            <div class="nxk-ic"><img src="@/assets/images/zllist4.png" alt=""></div>
                            <div class="nxk-txt">
                                <div class="nxk-num">860</div>
                                <div class="nxk-lab">信访人次</div>
                            </div>
                        </div>

                        <div class="nxk-item">
                            <div class="nxk-ic"><img src="@/assets/images/zllist5.png" alt=""></div>
                            <div class="nxk-txt">
                                <div class="nxk-num">860</div>
                                <div class="nxk-lab">来访人次</div>
                            </div>
                        </div>

                        <div class="nxk-item">
                            <div class="nxk-ic"><img src="@/assets/images/zllist6.png" alt=""></div>
                            <div class="nxk-txt">
                                <div class="nxk-num">860</div>
                                <div class="nxk-lab">集体访人次</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="leftlist2">
                <h4>信访形式</h4>
                <img class="zongliangbp" src="@/assets/images/zongliangbp.png" alt="">
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

                <div ref="leftlist2chart" style="width:100%;height:320px;"></div>

            </div>
        </div>
        <div class="section">
            <div class="card-grid">
                <div
                    class="card-item"
                    v-for="(item, index) in cards"
                    :key="index"
                    @click="$router.push(item.link)"
                >
                    <div class="card-title">
                        {{ item.title }}
                        <span class="arrow">▶</span>
                    </div>
                    <div class="card-desc">{{ item.desc }}</div>
                </div>
            </div>
            <div class="rdwt">
                <h4>热点问题 <span style="font-size: 16px;">(三级内容分类情况 )  </span></h4>
                <div>
                    <RdwtChart
                        ref="chart"
                        :data-name="names"
                        :data-value="values"
                        left="3"
                        height="260px"
                        :bar-width="22"
                        :showLabel =  "true"
                    />
                </div>
            </div>

        </div>
    </div>

</div>
</template>

<script>
import '@/assets/font/DS-DIGIB-2.TTF'
import * as echarts from 'echarts'
import DatavHead from '@/components/DatavHead/index.vue'
import RdwtChart from '@/components/BarChart/index.vue'

export default {
    name: 'index',
    components: { DatavHead , RdwtChart },
    data() {
        return {
            username: '张三',
            options1: ['全区', '自治区信访局'],
            activeIndex1: 1,
            options2: ['信访件', '信访事项'],
            activeIndex2: 1,

            cards: [
                {
                    title: '大数据分析研判',
                    desc: '实时监测信访数据变化趋势进行多维度的数据分析和预警预测',
                    link: '/datav/analysis'
                },
                {
                    title: '信访工作法治化',
                    desc: '推进信访工作依法规范运行提供法律依据和法治化解决方案',
                    link: '/datav/legalization'
                },
                {
                    title: '源头治理分析',
                    desc: '分析信访问题产生的根源，推动前端预防和源头化解机制建设',
                    link: '/datav/governance'
                },
                {
                    title: '数据中心',
                    desc: '整合信访业务数据资源，提供数据管理和决策支持服务',
                    link: '/datav/datacenter'
                },
                {
                    title: '工作考核',
                    desc: '建立科学考核评价体系，对信访工作进行全面量化评估',
                    link: '/datav/assessment'
                },
                {
                    title: '集中督办',
                    desc: '对重要信访事项进行跟踪督办，确保问题解决和工作落实',
                    link: '/datav/supervise'
                },
                {
                    title: '日常督查',
                    desc: '对信访案件办理过程进行规范化评查，提升工作标准和质量',
                    link: '/datav/inspection'
                },
                {
                    title: '工作质效',
                    desc: '评估信访工作质量和效率优化资源配置和工作流程',
                    link: '/datav/efficiency'
                },
                {
                    title: '重点人员',
                    desc: '建立重点人员管理档案，实施精准服务和动态管理',
                    link: '/datav/keyperson'
                },
                {
                    title: '信访专题',
                    desc: '聚焦热点难点问题，开展专题研究和专项治理行动',
                    link: '/datav/topic'
                }
            ],
            names: ['住房公积金','产权交易','土地转让','集体资产管理','大气污染','规划建设','辖区管理','土地转让','集体资产管理','规划建设'],
            values: [1720,650,560,430,390,360,300,260,190,110]
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
                    text: '占比',
                    left: 'center',
                    top: '35%',
                    textStyle: { color: '#ffffff', fontSize: 28, }
                },

                legend: {
                    bottom: 2,
                    icon: 'circle',
                    itemWidth: 10, itemHeight: 10,
                    textStyle: { color: '#6bb5ff', fontSize: 16 },
                    data: ['来信', '来访', '网上信访']
                },

                tooltip: {
                    trigger: 'item',
                    formatter: p => `${p.name}：${p.value}（${p.percent}%）`
                },
                graphic: [
                    {
                        type: 'image',
                        left: '29.5%',
                        top: '10.5%',
                        style: {
                            image: img,
                            width: 190,
                            height: 190,
                            opacity: 0.7
                        },
                        z: 0
                    }
                ],
                series: [
                    {
                        name: '信访形式',
                        type: 'pie',
                        radius: [65, 80],
                        center: ['50%', '40%'],
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
                                return `{name|${p.name}}\n{num|${p.percent}}{unit|%}`
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
                                value: 40, name: '来信',
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: '#FFC557' },
                                        { offset: 1, color: '#C8891A' }
                                    ])
                                }
                            },
                            {
                                value: 38, name: '来访',
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: '#2FE7BF' },
                                        { offset: 1, color: '#0C7A5A' }
                                    ])
                                }
                            },
                            {
                                value: 32, name: '网上信访',
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

.home{
    .cont{
        position: relative;
        .login-box {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 8px 16px;
            color: #fff;
            font-size: 16px;
            position: absolute;
            right: 50px;
            top: -90px;
            .welcome {
                margin-right: 4px;
            }

            .username {
                color: #fff;
                margin-right: 12px;
            }

            .logout-btn {
                background-color: transparent;
                border: 1px solid #00aaff;
                color: #00aaff;
                border-radius: 4px;
                padding: 4px 10px;
                cursor: pointer;
                transition: all 0.3s;
            }

            .logout-btn:hover {
                background-color: #00aaff;
                color: #fff;
                box-shadow: 0 0 8px #00aaff;
            }
        }



        .sectionleft{
            .subtitle{
                .seg-wrap{
                    position: absolute;
                    top: 15px;
                    right: 20px;
                }
            }
            .leftlist1{
                position: relative;
                .zongliangbp{
                    position: absolute;
                    top: -7px;
                    left: 61px;
                    z-index: 1;
                }
                .leftlist1data{
                    .nxk-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        column-gap: 80px;
                        row-gap: 30px;
                        padding: 35px 25px;
                    }

                    .nxk-item {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }

                    /* 左侧图标方块 */
                    .nxk-ic {
                        position: relative;
                        width: 55px;
                        height: 55px;
                        border-radius: 10px;
                        background-color: rgba( 15, 53, 75, 0.1);
                        border: 2px solid #0e375a;
                        overflow: hidden;
                        flex: 0 0 auto;
                    }

                    .nxk-ic::before {
                        content: "";
                        position: absolute;
                        width: 32px;
                        height: 32px;
                        top: 10%;
                        left: 10%;
                        border-radius: 50%;
                        background: radial-gradient(rgba(0, 136, 255, 0.45), rgba(0, 136, 255, 0));
                        filter: blur(10px);
                        pointer-events: none;
                    }

                    .nxk-ic img {
                        width: 36px;
                        height: 36px;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        opacity: 0.9;
                    }

                    /* 右侧文字区 */
                    .nxk-txt {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }

                    /* 数字样式 */
                    .nxk-num {
                        font-family: $sz-font-family;
                        font-weight: 700;
                        font-size: 36px;
                        color: #ebda55;
                        letter-spacing: 2px;
                        line-height: 1;
                    }

                    /* 标签 */
                    .nxk-lab {
                        font-size: 16px;
                        color: #83c5ff;
                    }

                }
            }
            .leftlist2{
                position: relative;
                margin-top: 35px;
                .zongliangbp{
                    position: absolute;
                    top: -7px;
                    left: 61px;
                    z-index: 1;
                }
                .seg-wrap{
                    display: block;
                    width: 186px;
                    margin: 25px auto;
                    text-align: center;
                }
            }
        }

        .section{
            width: 1330px;
            height: 895px;
            display: inline-block;
            .card-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 24px;
                width: 1330px;
                margin: 0 auto;
            }

            .card-item {
                height: 170px;
                padding: 30px 20px  0;
                border-radius: 10px;
                cursor: pointer;
                position: relative;
                background: url("../../../assets/images/carditembp.png");
                border: 1px solid rgba(0, 160, 255, 0.3);
                transition: all 0.3s ease;
                box-shadow: inset 0 0 10px rgba(0, 140, 255, 0.15);
                overflow: hidden;

                &:hover {
                    transform: translateY(-3px);
                    border-color: #33ccff;
                    box-shadow: 0 0 15px rgba(0, 180, 255, 0.3);
                }


                &:hover::before {
                    content: "";
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(
                            120deg,
                            transparent 0%,
                            rgba(255, 255, 255, 0.7) 30%,
                            transparent 60%
                    );
                    transform: rotate(25deg) translateX(-100%);
                    animation: shine-move 1s ease forwards;
                    pointer-events: none;
                    z-index: 1;
                }
                /* ✨ 高光动画 */
                @keyframes shine-move {
                    0% {
                        transform: rotate(25deg) translateX(-100%);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: rotate(25deg) translateX(100%);
                        opacity: 0;
                    }
                }

                .card-title {
                    font-size: 32px;
                    font-weight: 700;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    background: linear-gradient(to bottom, #ffffff, #66c4ff);
                    -webkit-background-clip: text;   /* 背景裁剪成文字形状 */
                    -webkit-text-fill-color: transparent; /* 让文字透明，只显示背景 */
                    .arrow {
                        color: #ffda2f;
                        font-size: 14px;
                        -webkit-text-fill-color: #ffda2f !important;
                        margin-left: 6px;
                    }
                }

                .card-desc {
                    font-size: 16px;
                    line-height: 22px;
                    color: #5093d9;
                    max-width: 95%;
                }
            }
            .rdwt{
                width: 100%;
                height: 315px;
                padding: 10px;
                margin-top: 25px;
                background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                border-radius: 10px;
            }
        }
    }
}









</style>

