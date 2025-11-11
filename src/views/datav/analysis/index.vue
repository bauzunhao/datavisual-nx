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
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import DatavHead from '@/components/DatavHead/index.vue'
import StatTile from '@/components/StatTile/index.vue';

export default {
    name: 'index',
    components: { DatavHead ,StatTile},
    data() {
        return {
            options1: ['全系统', '全区', '国家局', '部委', '自治区信访局'],
            activeIndex1: 0,
            options2: ['今日', '本月', '本年'],
            activeIndex2: 0,
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
            }
            .cards{
                display: flex;
            }
        }
    }
}
</style>
