<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="conthead">
                <p>请选择:</p>
                <el-select v-model="value" placeholder="请选择"  size ="mini">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                <p style="margin-left: 30px;">报告内型: 全区信访形势总体情况     全区网上信访情况分析</p>
            </div>
            <div class="section">
                <div class="analysis-menu">
                    <div class="analysis-card" v-for="item in list" :key="item.value">
                        <div class="analysis-icon">
                            <img :src="item.icon" alt="" />
                        </div>
                        <h4 class="analysis-title">{{ item.label }}</h4>
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
            value : '全部',
            list: [
                {
                    value: 'all',
                    label: '全区信访情况分析',
                    icon: require('@/assets/images/icon-mail.png')
                },
                {
                    value: 'season',
                    label: '信访情况季度分析报告',
                    icon: require('@/assets/images/icon-calendar.png')
                },
                {
                    value: 'problem',
                    label: '信访突出问题分析',
                    icon: require('@/assets/images/icon-question.png')
                },
                {
                    value: 'beijing',
                    label: '进京访分析',
                    icon: require('@/assets/images/icon-walk.png')
                },
                {
                    value: 'key',
                    label: '重点信访事项办理分析',
                    icon: require('@/assets/images/icon-mail2.png')
                },
                {
                    value: 'effect',
                    label: '信访事项办理绩效分析',
                    icon: require('@/assets/images/icon-chart.png')
                }
            ],
        }
    }
}
</script>

<style scoped lang="scss">
.home{
    .cont{
        .conthead {
            display: flex;
            color: #6bb5ff;
            height: 26px;
            justify-content: flex-start;
            margin-bottom: 10px;

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
        .section {
            .analysis-menu {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                padding: 120px 160px;
            }

            .analysis-card {
                width: 456px;
                height: 144px;
                margin-bottom: 40px;
                padding: 20px 40px;
                display: flex;
                align-items: center;

                border-radius: 18px;
                background: url("../../../assets/images/analysis-card.png") no-repeat;
                box-shadow: 0 10px 30px rgba(0, 0, 0, .35);
                cursor: pointer;

                // 鼠标经过一点亮起来
                transition: transform .2s ease, box-shadow .2s ease, background .2s ease;

                &:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 16px 40px rgba(0, 0, 0, .5);
                    //background: linear-gradient(90deg, #0b5fcb 0%, #1a7dff 100%);
                }

                .analysis-icon {
                    width: 64px;
                    height: 64px;
                    margin-right: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        width: 68px;
                        height: 68px;
                    }
                }

                .analysis-title {
                    font-size: 28px;
                    font-weight: 600;
                    color: #ffffff;
                    letter-spacing: 1px;
                    white-space: nowrap;  // 不换行，和你图上效果一样
                }
            }

        }
    }
}
</style>

