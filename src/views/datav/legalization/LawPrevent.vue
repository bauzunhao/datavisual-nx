<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="conthead">
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
                <p>去向地区:</p>
                <el-select v-model="value" placeholder="请选择"  size ="mini">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"

                    >
                    </el-option>
                </el-select>
            </div>

            <div class="pre-left">
                <div class="subtitle subtitle2" style="margin: 0;">
                    <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                    <h3>全区信访分类</h3>
                </div>
                <h4>信访总量</h4>
                <div class="num-display">
                    <span v-for="(digit, i) in digits" :key="i">{{ digit }}</span>
                </div>

                <div class="charts-wrap">
                    <div class="chart-item" v-for="(item, index) in chartsData" :key="index">

                        <!-- 标题 -->
                        <div class="title chart-title">
                            <h4>{{ item.title }}</h4>
                        </div>
                        <!-- 指标文字区域 -->
                        <div class="stats">
                            <p><span class="label">{{ item.countLabel }}</span><span class="value">{{ item.count }}</span></p>
                            <p><span class="label">占总量比重</span><span class="value">{{ item.ratio }}</span></p>
                            <p>
                                <span class="label">同比</span>
                                <span
                                    class="value"
                                    :style="{ color: item.yoyColor }"
                                >
                                {{ item.yoy }}
                                </span>
                            </p>
                        </div>

                        <!-- 圆环图组件 -->
                        <RingChart
                            :percent="item.percent"
                            :color="item.color"
                            :id="'ring'+index"
                        />
                    </div>
                </div>

            </div>

            <div class="pre-right">
                <div class="subtitle subtitle2" style="margin: 0;">
                    <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                    <h3>全区信访分类</h3>
                </div>
                <div class="genpieChart">
                    <GenpieChart/>
                </div>
            </div>

            <div class="pre-bottom">
                <div class="subtitle subtitle2" style="margin: 0;">
                    <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                    <h3>领导接访下访情况</h3>
                </div>
                <div class="perbtmitem">
                    <div class="leader-visit">
                        <p class="leader-visit__summary">
                            各地领导参与接访下访日
                            <span class="num num-yellow">66</span>人次，
                            涉及<span class="num num-green">37</span>批次。
                        </p>

                        <div class="leader-visit__cards">
                            <div
                                class="leader-card"
                                v-for="(item, index) in leaderList"
                                :key="index"
                            >
                                <p class="leader-card__title">
                                    <span>{{ item.level }}</span><br />
                                    <span>{{ item.desc }}</span>
                                </p>

                                <p class="leader-card__stat">
                                    <span class="num num-yellow">{{ item.people }}</span>人次
                                    <span class="num num-green">{{ item.batches }}</span>批次
                                </p>
                            </div>
                        </div>
                    </div>
                    <RdwtChart
                        ref="chart"
                        :data-name="names"
                        :data-value="values"
                        height="240px"
                        :bar-width="22"
                        left="3"
                    />

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import DatavHead from '@/components/DatavHead/index.vue'
import RingChart  from '@/components/RingChart/index.vue'
import GenpieChart from '@/components/GenpieChart/index.vue'
import RdwtChart from '@/components/BarChart/index.vue'
export default {
    name: 'index',
    components: { RdwtChart, GenpieChart, DatavHead , RingChart  },
    data(){
        return {
            options1: ['去年', '本年'],
            activeIndex1: 0,
            number: 2312,
            value: '全部',
            chartsData: [
                {
                    title: "扬言件情况",
                    countLabel: "扬言件数量",
                    count: 15,
                    ratio: "2%",
                    yoy: "30%",
                    yoyColor: "#ebda55",
                    percent: 30,
                    color: ["#5c674b", "#e2d355"],
                },
                {
                    title: "集体访情况",
                    countLabel: "来访数量",
                    count: 15,
                    ratio: "2%",
                    yoy: "15%",
                    yoyColor: "#1ad485",
                    percent: 20,
                    color: ["#0d6d62", "#1ad385"],
                },
                {
                    title: "联名信情况",
                    countLabel: "联名件数量",
                    count: 15,
                    ratio: "2%",
                    yoy: "15%",
                    yoyColor: "#fb686f",
                    percent: 50,
                    color: ["#6d3f59", "#fa686f "],
                },
            ],
            options: [
                {
                    value: '全部',
                    label: '全部'
                }, {
                    value: '选项2',
                    label: '2'
                }, {
                    value: '选项3',
                    label: '3'
                }, {
                    value: '选项4',
                    label: '4'
                }, {
                    value: '选项5',
                    label: '5'
                }],
            leaderList: [
                { level: '省级领导', desc: '接访下访', people: 5,  batches: 21 },
                { level: '市级领导', desc: '接访下访', people: 5,  batches: 21 },
                { level: '县级领导', desc: '接访下访', people: 5,  batches: 21 }
            ],
            names: ['住房公积金','产权交易','土地转让','集体资产管理','大气污染'],
            values: [720,650,560,430,390],
        }
    },
    methods :{
        handleClick1(i) {
            this.activeIndex1 = i
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
.home {
    .cont {
        .conthead {
            display: flex;
            color: #6bb5ff;
            height: 26px;
            justify-content: flex-start;
            margin-bottom: 10px;
            align-items: center;

            .seg-wrap {
                margin-right: 30px;
            }

            p {
                font-size: 18px;
                vertical-align: top;
                margin: 0 5px 0 0;
                line-height: 24px;
            }

            .butlist {
                display: flex;

                .but-itme {
                    background: linear-gradient(to bottom, #071e45, #0346a2);
                    padding: 0 20px;
                    border-radius: 3px;
                    margin-left: 25px;
                    cursor: pointer;

                    p {
                        margin: 0;
                        font-size: 16px;
                        line-height: 26px;
                        background: linear-gradient(to bottom, #fdfeff, #a1d4ff);
                        -webkit-background-clip: text; /* 背景裁剪成文字形状 */
                        -webkit-text-fill-color: transparent; /* 让文字透明，只显示背景 */
                    }
                }
            }
        }
        .pre-left{
            display: inline-block;
            background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
            border-radius: 10px;
            width: 890px;
            padding-bottom: 20px;
            .num-display {
                margin: 10px 0;
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

            .charts-wrap {
                display: flex;
                justify-content: space-between;
                padding: 0 ;
            }

            .chart-item {
                width: 32%;
                text-align: left;
                color: #fff;
                .title{
                    background-size: 100% 100%;
                }
            }

            .chart-title {
                margin-bottom: 15px;
            }
            .stats{
                padding: 0 50px;
            }
            .stats p {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                font-size: 16px;
            }

            .label {
                color: #6bb5ff;
            }

            .value {
                color: #fff;
                min-width: 60px;
                text-align: right;
            }

        }
        .pre-right{
            display: inline-block;
            background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
            border-radius: 10px;
            width: 890px;
            vertical-align: top;
            margin-left: 40px;
            padding-bottom: 20px;
            .genpieChart{
                height: 423px;
            }
        }
        .pre-bottom{
            width: 100%;
            background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
            border-radius: 10px;
            margin-top: 40px;
            .perbtmitem{
                display: flex;
                .rdwt-chart{
                    flex: 1;
                }
            }

            .leader-visit {
                color: #fff;
                width: 500px;
                &__summary {
                    font-size: 18px;
                    text-align: center;
                    margin: 10px 0;


                    .num {
                        font-weight: bold;
                        &.num-yellow { color: #ffd94a; }
                        &.num-green  { color: #2ff89a; }
                    }
                }

                &__cards {
                    position: relative;
                    width: 100%;
                    height: 160px;
                    padding: 0 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;
                }
            }

            .leader-card {
                flex: 1;
                text-align: center;
                padding: 10px 0;
                position: relative;
                background: linear-gradient(to bottom, rgba(25, 99, 173, 0.2), rgba(38, 102, 171, 0.05));
                color: #6bb5ff;
                &__title {
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: 18px;
                }

                &__stat {
                    font-size: 14px;
                    .num-yellow { color: #ffd94a; margin-right: 4px; }
                    .num-green  { color: #2ff89a; margin: 0 4px 0 16px; }
                }
            }

        }
    }
}
</style>

