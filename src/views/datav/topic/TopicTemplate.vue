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
            }
        }
    }
}
</style>

