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
            </div>
            <div class="section">
                <div class="sectlist">
                    <div class="subtitle subtitle2">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>各处室工作量统计</h3>
                    </div>
                    <h4>信访件总数</h4>
                    <div class="num-display">
                        <span v-for="(digit, i) in digits" :key="i">{{ digit }}</span>
                    </div>
                    <div class="sectprog">
                        <div class="proglist">
                            <p>接访处 <span class="gold">2452</span></p>
                            <GlowMeter :value="65" theme="gold" :height="20"/>
                        </div>
                        <div class="proglist">
                            <p>网上投诉 <span class="blue">3666</span></p>
                            <GlowMeter :value="65" theme="blue" :height="20"/>
                        </div>
                        <div class="proglist">
                            <p>办信处 <span class="mint">1455</span></p>
                            <GlowMeter :value="65" theme="mint" :height="20"/>
                        </div>
                    </div>
                </div>
                <div class="sectlist" style="margin-top: 25px;">
                    <div class="subtitle subtitle2">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>个人工作量统计</h3>
                    </div>
                    <RdwtChart
                        ref="chart"
                        :data-name="names"
                        :data-value="values"
                        height="360px"
                        :bar-width="22"
                    />
                </div>
            </div>
            <div class="sectionright">
                <div class="subtitle">
                    <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                    <h3>办理效能统计</h3>
                </div>
                <div class="seg-wrap" style="display: block;width: 238px;margin: 0 auto;">
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
                <div class="blnx">
                    <div class="info-list">
                        <div
                            v-for="(item, i) in dataList"
                            :key="i"
                            class="info-item"
                        >
                            <h4 class="label">{{ item.label }}</h4>
                            <div class="value">
                                <span class="num">{{ item.value }}</span>
                                <span class="unit">{{ item.unit }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>
<script >
import DatavHead from '@/components/DatavHead/index.vue'
import GlowMeter from '@/components/GlowMeter/index.vue'
import RdwtChart from '@/components/BarChart/index.vue'

export default {
    components: { RdwtChart, DatavHead,GlowMeter},
    data(){
        return {
            options1: ['今日', '本月','本年'],
            activeIndex1: 0,
            options2: ['来信', '来访','网络投诉'],
            activeIndex2: 0,
            number: 987654,
            names: ['住房公积金','产权交易','土地转让','集体资产管理','大气污染','规划建设','辖区管理','土地转让','集体资产管理','规划建设'],
            values: [720,650,560,430,390,360,300,260,190,110],
            dataList: [
                { label: "信访件办结件次", value: 5860, unit: "件次" },
                { label: "最长办结时长", value: 60, unit: "小时" },
                { label: "平均办结时长", value: 60, unit: "小时" },
                { label: "信访件逾期件次", value: 5860, unit: "件次" },
                { label: "最长逾期时长", value: 60, unit: "小时" },
                { label: "平均逾期时长", value: 60, unit: "小时" },
                { label: "信访事项一次性化解率", value: "92", unit: "%" },
                { label: "四应四不情况", value: 5860, unit: "件次" }
            ]
        }
    },
    methods : {
        handleClick1(i) {
            this.activeIndex1 = i
        },
        handleClick2(i) {
            this.activeIndex2 = i
        },
    },
    computed: {
        digits() {
            return String(this.number).split('');
        }
    }
}
</script>
<style scoped lang="scss">
@font-face {
    font-family: "DSfont";
    src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
}
$sz-font-family: "DSfont";
.cont{
    position: relative;
    .conthead{
        position: absolute;
        top: -10px;
        left: 50px;
        display: flex;
        height: 26px;
        p{
            color: #6bb5ff;
            font-size: 16px;
            line-height: 26px;
            margin: 0 5px 0 0;
        }
    }
    .section {
        width: 1330px;
        height: 895px;
        display: inline-block;
        .sectlist{
            border-radius: 10px;
            background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
            .num-display {
                display: flex;
                gap: 25px;
                font-size: 80px;
                color: #fff;
                margin-top: 15px;
                text-shadow: 0 0 10px #00baff, 0 0 25px #00baff;
                font-family: $sz-font-family, monospace;
                text-align: center;
                width: 100%;
                justify-content: center;
                span{
                    display: block;
                    width: 82px;
                    height: 102px;
                    line-height: 102px;
                    background: url("../../../assets/images/num-display.png") no-repeat;
                }
            }
            .sectprog{
                margin-top: 55px;
                display: flex;
                gap: 35px;
                justify-content: space-around;
                .proglist{
                    padding: 10px;
                    background: linear-gradient(to bottom, rgba(25,99,173,0.3), rgba(38,102,171,0.01));
                }
                p{
                    font-size: 22px;
                    color: #fff;
                    font-weight: bold;
                    margin: 0;
                    span{
                        float: right;
                        font-size: 36px;
                        font-family: $sz-font-family, monospace;
                    }
                }
                .gold{color: #ead955;}
                .blue{color: #00a1fe;}
                .mint{color: #1df9d0;}
            }
        }
    }
    .sectionright{
        .blnx{
            .info-list {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1px;
                margin-top: 10px;
            }

            .info-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                border-radius: 10px;
                height: 91px;
                width: 386px;
                line-height: 91px;
                color: #ffffff;
                background: url("../../../assets/images/blnxblue.png") no-repeat;
            }

            /* 左侧标题 */
            .label {
                font-size: 18px;
                font-weight: 600;
                letter-spacing: 0.5px;
            }

            /* 右侧数值 */
            .value {
                display: flex;
                align-items: flex-end;
                gap: 4px;
            }

            .num {
                font-size: 30px;
                font-weight: bold;
                color: #ffde5a; /* 数字金黄色 */
                font-family: "DS-Digital", monospace;
            }

            .unit {
                font-size: 14px;
                opacity: 0.9;
                color: #6bb5ff;
            }
        }
    }
}
</style>
