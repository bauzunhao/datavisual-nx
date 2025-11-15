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
                            <h3>调解情况 </h3>
                        </div>
                        <div ref="leftlist2chart" style="width:100%;height:320px;"></div>
                    </div>
                    <div class="section_left" style="height: 435px;">
                        <div class="subtitle">
                            <img src="@/assets/images/subtitle-left.png" class="subtitle-left" alt="">
                            <h3>处理情况和复查复核</h3>
                        </div>
                        <div style="margin-bottom: 18px;" class="title"> <h4>办理情况</h4></div>
                        <div class="category">
                            <p>99 <span>%</span> </p>
                            <span>一次性化解率</span>
                        </div>
                        <div style="margin-bottom: 18px;" class="title"> <h4>复查复核</h4></div>
                        <div class="review">
                            <div>
                                复查总量
                                <p>321</p>
                            </div>
                            <div>
                                复核总量
                                <p>321</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="sectcont">
                    <div class="transfer-panel">
                        <h4>转交申诉求决信访事项办理情况  </h4>
                        <div class="total-counter">
                            <div class="panel-subtitle">
                                转交总量
                            </div>
                            <div class="num-display">
                                <span v-for="(digit, i) in digits" :key="i">{{ digit }}</span>
                            </div>
                        </div>
                        <div class="category-stats">
                            <div class="category-item">
                                <div class="valdesc">18%</div>
                                <div class="value">52</div>
                                <div class="label">信访程序</div>
                            </div>
                            <div class="category-item">
                                <div class="valdesc">18%</div>
                                <div class="value">52</div>
                                <div class="label">重复件总量</div>
                            </div>
                            <div class="category-item">
                                <div class="valdesc">18%</div>
                                <div class="value">52</div>
                                <div class="label">其它法走程序</div>
                            </div>
                        </div>
                    </div>
                    <div class="sectcontlater">
                        <div style="margin-bottom: 10px" class="subtitle subtitle2">
                            <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                            <h3>应办理未办理情况</h3>
                        </div>
                        <div style="padding-right: 25px;">
                            <RdwtChart
                                ref="chart"
                                :data-name="names"
                                :data-value="values"
                                height="345px"
                                :bar-width="22"
                            />
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
import img from '@/assets/images/leftlist2chartbp_03.png'
import RdwtChart from '@/components/BarChart/index.vue'
export default {
    name: 'index',
    components: { RdwtChart, DatavHead },
    data(){
      return {
          options1: ['今日', '本月','本年'],
          activeIndex1: 0,
          options2: ['本区', '自治区信访局'],
          activeIndex2: 0,
          number: 21345,
          names: ['住房公积金','产权交易','土地转让','集体资产管理','大气污染'],
          values: [720,650,560,430,390],
      }
    },
    mounted() {
        this.ec1 = echarts.init(this.$refs.leftlist2chart)
        this.ec1.setOption(this.getOption1())
    },
    beforeDestroy() {
        this.ec1 && this.ec1.dispose()
    },
    methods :{
        handleClick1(i) {
            this.activeIndex1 = i
        },
        handleClick2(i) {
            this.activeIndex2 = i
        },
        getOption1 () {
            const rawData = [
                {
                    value: 150,
                    name: '达成协议',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#FFC557' },
                            { offset: 1, color: '#C8891A' }
                        ])
                    }
                },
                {
                    value: 36,
                    name: '未达成协议',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#2FE7BF' },
                            { offset: 1, color: '#0C7A5A' }
                        ])
                    }
                }
            ];

            //  计算总值 + 百分比
            const total = rawData.reduce((sum, item) => sum + item.value, 0);

            const pieData = rawData.map(item => {
                const percent = total === 0 ? 0 : ((item.value / total) * 100).toFixed(1);
                return {
                    ...item,
                    percent
                };
            });

            const option = {
                backgroundColor: 'transparent',
                toolbox: { show: true },

                title: {
                    text: `{total|${total}}\n{label|总量}`,
                    left: 'center',
                    top: '30%',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 28,
                        rich: {
                            // “总量：” 的样式
                            label: {
                                fontSize: 20,
                                color: '#ffffff',
                                fontFamily: 'sans-serif',
                                lineHeight: 28
                            },
                            //  total 数字的样式
                            total: {
                                fontFamily: 'DS-Digital, DSfont, monospace',
                                color: '#26c1fd',
                                fontSize: 54,
                                fontWeight: 'bold',
                                lineHeight: 44
                            }
                        }
                    }
                },


                legend: {
                    bottom: 20,
                    icon: 'circle',
                    itemWidth: 10,
                    itemHeight: 10,
                    textStyle: {
                        color: '#6bb5ff',
                        fontSize: 16,
                        rich: {
                            name: {
                                color: '#6bb5ff',
                                fontSize: 16,
                                lineHeight: 18
                            },
                            num: {
                                color: '#6bb5ff',
                                fontSize: 16,
                            },
                            unit: {
                                color: '#6bb5ff',
                                fontSize: 14,
                                padding: [0, 0, 0, 2]
                            }
                        }
                    },
                    data: pieData.map(d => d.name),
                    formatter: name => {
                        const item = pieData.find(d => d.name === name);
                        if (!item) return name;
                        return `{name|${item.name}}{num|${item.percent}}{unit|%}`;
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: p => `${p.name}：${p.value}（${p.percent}%）`
                },

                series: [
                    {
                        name: '调解情况',
                        type: 'pie',
                        radius: [100, 125],
                        center: ['50%', '40%'],
                        startAngle: 0,
                        clockwise: true,
                        roundCap: true,
                        avoidLabelOverlap: true,
                        roseType: false,

                        itemStyle: {
                            borderColor: '#ffffff10',
                            borderWidth: 6,
                            shadowBlur: 6,
                            shadowColor: 'rgba(0,0,0,.18)'
                        },

                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },


                        data: pieData
                    }
                ]
            };

            return option;
        },
    },
    computed: {
        digits() {
            return String(this.number).split('');
        }
    },
}
</script>

<style scoped lang="scss">
.home{
    .cont{
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
            .section_left{
                width: 450px;
                height: 417px;
                vertical-align: top;
                border-radius: 10px;
                margin-top: 10px;
                margin-bottom: 15px;
                position: relative;
                display: inline-block;
                background: linear-gradient( 180deg, rgba(0,61,136,0.3) 0%, rgba(0,29,65,0.1) 51%, rgba(0,61,136,0.3) 100%);
                }
            .category{
                font-size: 44px;
                font-family: "DS-Digital", "DIN Alternate", monospace;
                color: #f3e04c;
                background: url("../../../assets/images/LawHandle.png") no-repeat center;
                height: 112px;
                width: 237px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                flex-direction: column;
                p{margin: 0;}
                span{
                    font-size: 16px;
                    color: #26c1fd;
                }
            }
            .review{
                display: flex;
                justify-content: space-around;
                gap: 10px;
                padding: 0 40px;
                div{
                    flex: 1;
                    text-align: center;
                    color: #FFFFFF;
                    font-size: 16px;
                    padding: 20px 0;
                    background: linear-gradient(to bottom, rgba(25, 99, 173, 0.3), rgba(38, 102, 171, 0.01));
                    p{
                        font-family: "DS-Digital", "DIN Alternate", monospace;
                        font-size: 30px;
                        color: #f3e04c;
                        margin: 0;
                        line-height: 40px;
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
                    height: 417px;
                    margin-bottom: 25px;
                    padding-top: 60px;
                    text-align: center;
                    .total-counter{
                        padding: 30px 0;
                        .panel-subtitle{
                            font-size: 24px;
                            background: linear-gradient(to bottom, #ffffff, #97cbff);
                            -webkit-background-clip: text;   /* 背景裁剪成文字形状 */
                            -webkit-text-fill-color: transparent; /* 让文字透明，只显示背景 */
                        }
                        .num-display {
                            margin-bottom: 10px;
                            display: flex;
                            gap: 7px;
                            font-size: 52px;
                            color: #fff;
                            text-shadow: 0 0 10px #00baff, 0 0 25px #00baff;
                            font-family: "DS-Digital", "DIN Alternate", monospace;
                            text-align: center;
                            justify-content: center;
                            span{
                                display: block;
                                width: 50px;
                                height: 75px;
                                line-height: 70px;
                                background: url("../../../assets/images/num-display.png") no-repeat center ;
                                background-size: 100% ;
                            }
                        }
                    }
                    .category-stats{
                        width: 100%;
                        display: inline-flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        vertical-align: top;
                        align-items: center;
                        justify-content: center;
                        .category-item{
                            width: 240px;
                            height: 130px;
                            margin-bottom: 10px;
                            color: #d0e4ff;
                            text-align: center;
                            font-size: 20px;
                            background: url("../../../assets/images/glow-base.png") no-repeat center 100%;
                            background-size: 80%;
                            .valdesc{
                                color: #499bec;
                                font-size: 16px;
                                border-radius: 10px;
                                border: 1px solid #0a366f;
                                display: inline-block;
                                padding: 0 5px;
                                line-height: 20px;
                                height: 20px;
                            }
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
    }
}
</style>

