<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="conthead">
                <div style="display: flex;">
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
                </div>
                <div class="butlist">
                    <div class="but-itme">
                        <p>信息预警</p>
                    </div>
                    <div class="but-itme">
                        <p>热词分析</p>
                    </div>
                    <div class="but-itme">
                        <p>分析报告</p>
                    </div>
                </div>
            </div>
            <div class="section-left">
                <div class="section-left-itme">
                    <div class="subtitle subtitle2">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>全区信访量情况</h3>
                    </div>

                    <div class="cards">
                        <StatTile :value="8800" label="信访件次" :yoy="4.56" unit="" colorFrom="#1f86ff" colorTo="#22d0ff">
                            <template #icon>
                                <img src="@/assets/images/zllist1.png" alt="">
                            </template>
                        </StatTile>

                        <StatTile :value="880" label="信访事项" :yoy="4.56">
                            <template #icon>
                                <img src="@/assets/images/zllist2.png" alt="">
                            </template>
                        </StatTile>

                        <StatTile :value="880" label="来访人次" :yoy="-4.56">
                            <template #icon>
                                <img src="@/assets/images/zllist5.png" alt="">
                            </template>
                        </StatTile>
                    </div>
                </div>

                <div class="section-left-itme">
                    <div class="subtitle subtitle2">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>办理情况</h3>
                    </div>
                    <div class="category-stats">
                        <div class="category-item">
                            <div class="value">52</div>
                            <div class="label">登记件次</div>
                        </div>
                        <div class="category-item">
                            <div class="value">52</div>
                            <div class="label">转送件次</div>
                        </div>
                        <div class="category-item">
                            <div class="value">52</div>
                            <div class="label">交办件次</div>
                        </div>
                        <div class="category-item">
                            <div class="value">52</div>
                            <div class="label">督办件次</div>
                        </div>
                    </div>
                    <template>
                        <div class="section-left-chart">
                            <div class="title"> <h4>办理情况</h4></div>
                            <div class="datav-table">
                                <div class="table-header">
                                    <span>名称</span>
                                    <span>信访量</span>
                                    <span>占比</span>
                                </div>
                                <div class="table-body">
                                    <div class="table-row" v-for="(item, index) in tableData" :key="index">
                                        <div class="dot" :style="{ backgroundColor: item.color }"></div>
                                        <span class="name">{{ item.name }}</span>
                                        <span class="value">{{ item.value }}</span>
                                        <span class="percent">{{ item.percent }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="section-left-chart">
                            <div  class="title"> <h4>信访形式</h4></div>
                            <div ref="sectionleftchart1" style="width:100%;height:160px;"></div>
                            <div  class="title"> <h4>信访目的</h4></div>
                            <div ref="sectionleftchart2" style="width:100%;height:160px;"></div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="section-right">
                <div class="subtitle subtitle2" style="margin-bottom: 0;">
                    <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                    <h3>全区信访量情况</h3>
                </div>
                <div class="genpieChart">
                    <GenpieChart/>
                </div>
                <div class="title" style="margin-bottom: 0;margin-top: -40px;"> <h4>办理情况</h4></div>
                <div style="padding: 0 25px;">
                    <RdwtChart
                        ref="chart"
                        :data-name="names"
                        :data-value="values"
                        left=5
                        height="220px"
                        :bar-width="22"
                    />
                <div class="title" style="margin-bottom: 0;"> <h4>近12个月信访量走势</h4></div>
                    <LineChart
                        ref="chart"
                        height="220px"
                        left=5
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import DatavHead from '@/components/DatavHead/index.vue'
import StatTile from '@/components/StatTile/index.vue';
import GenpieChart from '@/components/GenpieChart/index.vue'
import RdwtChart from '@/components/BarChart/index.vue'
import LineChart from '@/components/LineChart/index.vue'
export default {
    name: 'index',
    components: { RdwtChart, DatavHead ,StatTile,GenpieChart,LineChart},
    data() {
        return {
            options1: ['全系统', '全区', '国家局', '部委', '自治区信访局'],
            activeIndex1: 0,
            options2: ['今日', '本月', '本年'],
            activeIndex2: 0,
            tableData: [
                { color: '#ff3b3b', name: '劳动关系二级内容', value: 1000, percent: '25%' },
                { color: '#ffdf33', name: '劳动关系二级内容', value: 1000, percent: '25%' },
                { color: '#0d72dd', name: '劳动关系二级内容', value: 1000, percent: '25%' },
                { color: '#0d72dd', name: '劳动关系二级内容', value: 1000, percent: '25%' },
                { color: '#0d72dd', name: '劳动关系二级内容', value: 1000, percent: '25%' },
                { color: '#0d72dd', name: '劳动关系二级内容', value: 1000, percent: '25%' },
                { color: '#0d72dd', name: '劳动关系二级内容', value: 1000, percent: '25%' },
                { color: '#0d72dd', name: '劳动关系二级内容', value: 1000, percent: '25%' }
            ],
            names: ['住房公积金','产权交易','土地转让','集体资产管理','大气污染','规划建设','辖区管理','土地转让','集体资产管理','规划建设'],
            values: [720,650,560,430,390,360,1300,260,190,110]
        }
    },
    mounted() {
        this.ec1 = echarts.init(this.$refs.sectionleftchart1)
        this.ec1.setOption(this.getOption1())
        this.ec2 = echarts.init(this.$refs.sectionleftchart2)
        this.ec2.setOption(this.getOption1())
    },
    methods: {
        getOption1 () {
            const option = {
                backgroundColor: 'transparent',
                toolbox: { show: true },
                tooltip: {
                    trigger: 'item',
                    formatter: p => `${p.name}：${p.value}（${p.percent}%）`
                },
                series: [
                    {
                        name: '信访形式',
                        type: 'pie',
                        radius: [45, 60],
                        center: ['50%','40%'],
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

            return option
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
        .conthead{
            display: flex;
            color: #6bb5ff;
            height: 26px;
            justify-content: space-between;
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
            .butlist{
                display: flex;
                .but-itme{
                    background: linear-gradient(to bottom, #071e45, #0346a2);
                    padding: 0 20px;
                    border-radius: 3px;
                    margin-left: 25px;
                    cursor: pointer;
                    p{
                        margin: 0;
                        font-size: 16px;
                        line-height: 26px;
                        background: linear-gradient(to bottom, #fdfeff, #a1d4ff);
                        -webkit-background-clip: text;   /* 背景裁剪成文字形状 */
                        -webkit-text-fill-color: transparent; /* 让文字透明，只显示背景 */
                    }
                }
            }
        }
        .section-left{
            width: 890px;
            display: inline-block;
            border-radius: 10px;
            .section-left-itme{
                background: linear-gradient( 180deg, rgba(0,61,136,0.3) 0%, rgba(0,29,65,0.1) 51%, rgba(0,61,136,0.3) 100%);
                margin-bottom: 25px;
                border-radius: 10px;
                padding-bottom: 18px;
                .category-stats{
                    width: 100%;
                    display: inline-flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    vertical-align: top;
                    align-items: center;
                    justify-content: center;
                    .category-item{
                        width: 200px;
                        height: 80px;
                        margin-bottom: 10px;
                        color: #6bb5ff;
                        text-align: center;
                        font-size: 16px;
                        background: url("../../../assets/images/glow-base.png") no-repeat center 100%;
                        background-size: 80%;
                        .value{
                            color: #26c1fd;
                            font-size: 36px;
                            font-family: "DSfont", monospace;
                        }
                    }
                }
                .section-left-chart{
                    width: 50%;
                    display: inline-block;
                    margin-top: 5px;
                    vertical-align: top;
                    .datav-table {
                        padding: 0 25px 0 35px;
                        font-size: 14px;
                        color: #FFFFFF;
                        .table-header {
                            display: flex;
                            justify-content: space-between;
                            color: #FFFFFF;
                            font-size: 14px;
                            margin-bottom: 8px;
                            span {
                                flex: 1;
                                text-align: center;
                            }
                        }
                        .table-body {
                            .table-row {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                position: relative;
                                height: 40px;
                                margin-bottom: 4px;
                                    border-radius: 6px;
                                transition: background 0.3s;
                                color: #6bb5ff;
                                &:hover {
                                    background: rgba(0, 120, 255, 0.2);
                                }
                                .dot {
                                    width: 10px;
                                    height: 10px;
                                    position: absolute;
                                    left: -10px;
                                }
                                .name {
                                    flex: 1;
                                    text-align: center;
                                }
                                .value {
                                    flex: 1;
                                    text-align: center;
                                }
                                .percent {
                                    flex: 1;
                                    text-align: center;
                                }
                            }
                        }
                    }

                }
            }
            .cards{
                display: flex;
            }
        }
        .section-right{
            width: 890px;
            margin-left: 40px;
            display: inline-block;
            border-radius: 10px;
            background: linear-gradient( 180deg, rgba(0,61,136,0.3) 0%, rgba(0,29,65,0.1) 51%, rgba(0,61,136,0.3) 100%);
            height: 885px;
            vertical-align: top;
            .genpieChart{
                width: 100%;
                height: 330px;
            }
        }
        .title{
            position: relative;
            z-index: 3;
            margin-bottom: 18px;
            background: url("../../../assets/images/zongliangbp.png") no-repeat;
            padding-left: 55px;
            h4{
                font-size: 20px;
                text-align: left;
                line-height: 1.6;
            }
            .titledesc{
                font-size: 16px;
                color: #5093d9;
                display: inline-block;
                margin-top: 10px;
            }
            &::before {
                content: "";
                position: absolute;
                left: 30px;
                top: 17px;
                width: 14px;
                height: 14px;
                background: linear-gradient(to bottom, #277dd1, #0b3665);
                transform: translateY(-50%) rotate(45deg); // 居中 + 旋转成菱形
                border-radius: 2px; // 可选：让边稍圆润
            }
        }

    }
}
</style>
