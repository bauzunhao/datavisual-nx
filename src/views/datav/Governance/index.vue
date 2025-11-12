<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="section">
                <div class="sectionhead">
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
                <div class="section_left">
                    <div class="blnx">
                        <div class="info-list">

                            <div class="info-item">
                                <div class="descblnx" >
                                    <span>国家信访局</span>
                                    <h4 class="label">登记占比</h4>
                                </div>
                                <div class="value">
                                    <span class="unit">占比</span>
                                    <span class="num">21</span>
                                    <span class="unit">%</span>
                                </div>
                            </div>

                            <div class="info-item info-item-desc">
                                <div class="descblnx" >
                                    <span>赴国家信访局走访</span>
                                    <p class="label">集体访</p>
                                </div>
                                <div class="value">
                                    <span class="num">21</span>
                                    <span class="unit">人次</span>
                                </div>
                            </div>
                            <div class="info-item info-item-desc">
                                <div class="descblnx" >
                                    <span>赴自治区走访</span>
                                    <p class="label">集体访</p>
                                </div>
                                <div class="value">
                                    <span class="num">21</span>
                                    <span class="unit">人次</span>
                                </div>
                            </div>
                            <div class="info-item info-item-desc">
                                <div class="descblnx" >
                                    <span>赴市走访</span>
                                    <p class="label">集体访</p>
                                </div>
                                <div class="value">
                                    <span class="num">21</span>
                                    <span class="unit">人次</span>
                                </div>
                            </div>
                            <div class="info-item info-item-desc">
                                <div class="descblnx" >
                                    <span>赴县区走访</span>
                                    <p class="label">集体访</p>
                                </div>
                                <div class="value">
                                    <span class="num">21</span>
                                    <span class="unit">人次</span>
                                </div>
                            </div>

                            <div class="info-item">
                                <div class="descblnx" >
                                    <h4 class="label">信访事项一次性化解率</h4>
                                </div>
                                <div class="value">
                                    <span class="num">21</span>
                                    <span class="unit">%</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="descblnx" >
                                    <h4 class="label">发生初次信访情况同比</h4>
                                </div>
                                <div class="value">
                                    <span class="num">21</span>
                                    <span class="unit">%</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="descblnx" >
                                    <h4 class="label">群众满意率</h4>
                                </div>
                                <div class="value">
                                    <span class="num">21</span>
                                    <span class="unit">%</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="sectcont">
                    <div class="genpieChart">
                        <GenpieChart/>
                    </div>
                </div>
            </div>

            <div style="display: inline-block;width: 450px;vertical-align: top;">

                <div class="sectionright" >
                    <div class="subtitle">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>赴国家信访局走访</h3>
                        <div class="h4desc">
                            结果排序
                        </div>
                    </div>
                    <RankGradientBars :items="cityList" :barHeight="18" />
                </div>

                <div class="sectionright" style="margin-top: 25px;" >
                    <div class="subtitle">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>赴国家信访局集体访</h3>
                        <div class="h4desc">
                            结果排序
                        </div>
                    </div>
                    <RankGradientBars :items="cityList" :barHeight="18" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import DatavHead from '@/components/DatavHead/index.vue'
import RdwtChart from '@/components/BarChart/index.vue'
import RankGradientBars from  '@/components/RankGradientBars/index.vue'
import GenpieChart from '@/components/GenpieChart/index.vue'

export default {
    name: 'index',
    components: { RdwtChart, DatavHead, RankGradientBars, GenpieChart },
    data() {
        return {
            options1: ['全区', '自治区信访局'],
            activeIndex1: 0,
            cityList: [
                { name: '拉萨市', value: 90 },
                { name: '日喀则市', value: 85 },
                { name: '山南市', value: 70 },
                { name: '林芝市', value: 65 },
                { name: '昌都市', value: 50 },
                { name: '那曲市', value: 40 },
                { name: '阿里地区', value: 20 }
            ],
        }
    },
    methods: {
        handleClick1(i) {
            this.activeIndex1 = i
        },
    },
}
</script>

<style scoped lang="scss">
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
                    margin-right: 30px;
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
                vertical-align: top;
                border-radius: 10px;
                margin-top: 10px;
                margin-bottom: 15px;
                position: relative;
                display: inline-block;

                .blnx {
                    .info-list {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                        margin-top: 10px;
                    }

                    .info-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 20px;
                        border-radius: 10px;
                        height: 100px;
                        width: 100%;
                        line-height: 110px;
                        color: #ffffff;
                        background: url("../../../assets/images/blnxblue.png") no-repeat center center;
                        background-size: 100% 100%;
                        .descblnx{
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            span{
                                line-height: 14px;
                                font-size: 14px;
                                margin-bottom: 10px;
                                color: #6bb5ff;
                            }
                        }
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
                        font-size: 36px;
                        font-weight: bold;
                        color: #ffde5a; /* 数字金黄色 */
                        font-family: "DS-Digital", monospace;
                    }

                    .unit {
                        font-size: 14px;
                        opacity: 0.9;
                        color: #6bb5ff;
                        line-height: 100px;
                    }
                    .info-item-desc{
                        background-image: linear-gradient( 90deg, rgba(0,43,119,0.2) 0%, rgba(0,43,119,0.05) 100%);
                        padding:0 20px 0 50px;
                        .label{
                            font-size: 18px;
                            margin: 0;
                            color: #6bb5ff;
                            line-height: 18px;
                        }
                        .num{
                            color: #00e4ff;
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
                text-align: center;
                padding-top: 25px;

                .tabline {
                    display: inline-flex;
                    align-items: center;
                    gap: 34px; /* 与图中间距接近 */
                    line-height: 1;
                    background: url("../../../assets/images/zongliangbp.png") no-repeat center center;

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
                        height: 34px;
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
                    font-size: 26px;
                    letter-spacing: 2px;
                    cursor: pointer;
                    color: #8fc3ff; /* 未选中：淡蓝 */

                    &.is-active {
                        color: #ffd648;

                    }

                    &:hover {
                        filter: brightness(1.1);
                    }
                }

                .genpieChart {
                    height: 620px;
                    margin-bottom: 25px;
                }

                .seg {
                    /* 容器 */
                    --count: 2; /* 段数 */
                    --index: 0; /* 当前索引，父绑定 */
                    position: relative;
                    display: grid;
                    grid-template-columns: repeat(var(--count), 1fr);
                    align-items: center;
                    height: 70px;
                    width: 520px;
                    margin: 10px auto;
                    border-radius: 999px;
                    padding: 6px; /* 内边距做出“外层深色圆角” */
                    background: linear-gradient(180deg, #051a3b, #0d40a9);
                    overflow: hidden;
                }

                /* 滑动的“背景” */
                .seg__track {
                    position: absolute;
                    inset: 0; /* 顶/右/底/左 与容器 padding 对齐 */
                    width: calc((100%) / var(--count));
                    border-radius: 999px;
                    background: linear-gradient(180deg, #3cabff, #0a71e8);
                    transform: translateX(calc(#{'var(--index) * 100%'}));
                    transition: transform .35s cubic-bezier(.22, .61, .36, 1), background-position .35s; /* 平移动画 */
                    pointer-events: none; /* 防止遮挡点击 */
                }

                /* 按钮本体：透明，只变文字颜色 */
                .seg__btn {
                    position: relative;
                    z-index: 1; /* 在 track 上层 */
                    height: 100%;
                    border: 0;
                    background: transparent;
                    color: #7fb7ff;
                    font-size: 24px;
                    letter-spacing: 1px;
                    cursor: pointer;
                    border-radius: 999px;
                    transition: color .25s ease, text-shadow .25s ease;
                }

                .seg__btn.is-active {
                    color: #fff;
                }

                /* 可选：悬浮微亮 */
                .seg__btn:hover {
                    filter: brightness(1.08);
                }
            }

        }

        .sectionright {
            height: 442px;
            transition: height 0.3s ease;

            .h4desc {
                position: absolute;
                right: 30px;
                top: 20px;
                color: #6bb5ff;
                font-size: 16px;
                cursor: pointer;
            }
        }
    }
}
</style>
<style lang="scss">
.cont {
    .minidate {
        .el-input__inner {
            vertical-align: top;

            background: #01306f;
            border: 1px solid #3096f6;

            .el-input__icon {
                color: #6bb5ff;
            }

            .el-range-input {
                background: #06347f;
                color: #6bb5ff;
            }

            .el-range-separator {
                color: #6bb5ff;
            }
        }
    }


}
</style>
