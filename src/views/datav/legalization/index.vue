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
                <div class="section_left">
                    <div class="subtitle">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left" alt="">
                        <h3>一、预防法治化</h3>
                        <div class="sectenter">
                            <p>进入 <span>▶</span></p>
                        </div>
                    </div>
                    <div class="seleftlist">
                        <div class="title"> <h4>报送信访工作法治化相关材料7件次</h4></div>
                        <div class="title"> <h4>报送矛盾纠纷排查化解情况材料11件次</h4></div>
                        <div class="title">
                            <h4>领导接访下访情况</h4>
                            <span>各地领导参与接访下访87294人次，涉及118327批次。</span>
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
export default {
    name: 'index',
    components: { DatavHead },
    data(){
        return {
            options1: ['今日', '本月','本年'],
            activeIndex1: 0,
            options2: ['全区', '自治区信访局'],
            activeIndex2: 0,
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
}
</script>

<style scoped lang="scss">
.home{
    .cont{
        .section {
            width: 1330px;
            height: 895px;
            .sectionhead{
                display: flex;
                color: #6bb5ff;
                height: 26px;
                .seg-wrap{
                    margin-right: 50px;
                }
                p{
                    font-size: 18px;
                    vertical-align: top;
                    margin: 0 5px 0 0;
                    line-height: 24px;
                }
            }
            .section_left{
                width: 450px;
                vertical-align: top;
                border-radius: 10px;
                margin-right: 40px;
                margin-top: 10px;
                position: relative;
                display: inline-block;
                background: linear-gradient( 180deg, rgba(0,61,136,0.3) 0%, rgba(0,29,65,0.1) 51%, rgba(0,61,136,0.3) 100%);
                .title{
                    position: relative;
                    z-index: 3;
                    margin-bottom: 40px;
                    background: url("../../../assets/images/zongliangbp.png") no-repeat;
                    padding-left: 55px;
                    h4{
                        font-size: 20px;
                        text-align: left;
                        line-height: 1.6;
                    }
                    span{
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
    }
}
</style>
