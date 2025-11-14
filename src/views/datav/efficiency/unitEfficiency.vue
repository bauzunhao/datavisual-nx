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
                <div style="margin-right: 30px;">
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
                <p>限办日期:</p>
                <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="sectionleft">
                <div class="sectionleft-item">
                    <div class="subtitle">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>受理情况</h3>
                    </div>
                    <ul class="org-list">
                        <li class="org-item" v-for="(item, i) in orgList" >
                            <!-- 左边名称 -->
                            <span class="org-name">{{ item.name }}</span>
                            <!-- 右边数据 -->
                            <span class="org-count">
                              <span class="label">总量</span>
                              <span class="num">{{ item.total }}</span>
                            </span>
                            <span class="org-count">
                              <span class="label">及时受理</span>
                              <span class="num">{{ item.handle }}</span>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="sectionleft-item" >
                    <div class="subtitle">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>受理情况</h3>
                    </div>
                    <ul class="org-list">
                        <li class="org-item" v-for="(item, i) in orgList" >
                            <!-- 左边名称 -->
                            <span class="org-name">{{ item.name }}</span>
                            <!-- 右边数据 -->
                            <span class="org-count">
                              <span class="label">总量</span>
                              <span class="num">{{ item.total }}</span>
                            </span>
                            <span class="org-count">
                              <span class="label">及时受理</span>
                              <span class="num">{{ item.handle }}</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="section">
                <div class="section-item">
                    <div class="eval-wrap">
                        <!-- 左侧指标 -->
                        <div class="eval-left">
                            <div class="metric-item" v-for="i in leftList" >
                                <p class="metric-title">责任单位及时受理率</p>
                                <div class="metric-bottom">
                                    <span class="metric-value">100%</span>
                                    <span class="metric-compare">同比：+10%</span>
                                </div>
                            </div>
                        </div>

                        <!-- 中间大圆 -->
                        <div class="eval-center">
                            <div class="center-circle">
                                <p class="center-num"><span>50</span> 天/件</p>
                                <p class="center-desc">全区责任单位办理</p>
                            </div>
                            <!-- 这里也可以放一个 echarts 的容器 -->
                            <!-- <div class="center-chart" ref="circleChart"></div> -->
                        </div>

                        <!-- 右侧：上指标 -->
                        <div class="eval-right">
                            <div class="eval-right-top">
                                <div class="metric-item" v-for="i in rightList" >
                                    <p class="metric-title">按期答复率</p>
                                    <div class="metric-bottom">
                                        <span class="metric-value">100%</span>
                                        <span class="metric-compare">同比：+10%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="eval-list">
                        <div class="subtitle">
                            <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                            <h3>评价情况</h3>
                        </div>
                        <ul class="org-list">
                            <li class="org-item" v-for="(item, i) in orgList" >
                                <!-- 左边名称 -->
                                <span class="org-name">{{ item.name }}</span>
                                <!-- 右边数据 -->
                                <span class="org-count">
                              <span class="label">总量</span>
                              <span class="num">{{ item.total }}</span>
                            </span>
                                <span class="org-count">
                              <span class="label">及时受理</span>
                              <span class="num">{{ item.handle }}</span>
                            </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="section-item section-item1">
                    <div class="subtitle subtitle2">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>重复件top20</h3>
                    </div>
                    <RdwtChart
                        ref="chart"
                        :data-name="names"
                        :data-value="values"
                        height="315px"
                        left="4"
                        :bar-width="22"
                    />
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
    data(){
        return {
            options1: ['去年', '本年'],
            activeIndex1: 0,
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
            value: '全部',
            value1: '',
            orgList: [
                { name: '西藏自治区残疾人联合会', total: 23, handle: 5 },
                { name: '西藏自治区残疾人联合会', total: 23, handle: 5 },
                { name: '西藏自治区残疾人联合会', total: 23, handle: 5 },
                { name: '西藏自治区残疾人联合会', total: 23, handle: 5 },
                { name: '西藏自治区残疾人联合会', total: 23, handle: 5 },
                { name: '西藏自治区残疾人联合会', total: 23, handle: 5 },
                { name: '西藏自治区残疾人联合会', total: 23, handle: 5 },
                { name: '西藏自治区残疾人联合会', total: 23, handle: 5 },
                { name: '西藏自治区残疾人联合会', total: 23, handle: 5 },
            ],
            leftList: [
                { title: "责任单位及时受理率", value: "100%", compare: "+10%" },
                { title: "初件同比变化", value: "100%", compare: "+10%" },
                { title: "一次性化解率", value: "100%", compare: "+10%" }
            ],
            rightList: [
                { title: "按期答复率", value: "100%", compare: "+10%" },
                { title: "群众满意率（责任单位）", value: "100%", compare: "+10%" },
                { title: "参评率（责任单位）", value: "100%", compare: "+10%" }
            ],
            names: ['住房公积金','产权交易','土地转让','集体资产管理','大气污染','规划建设','辖区管理','土地转让','集体资产管理','规划建设'],
            values: [720,650,560,430,390,1360,300,260,190,110],


        }
    },
    methods :{
        handleClick1(i) {
            this.activeIndex1 = i
        },
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
            justify-content: flex-start;
            margin-bottom: 10px;
            align-items: center;
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

        .sectionleft {
            background: none;
            .sectionleft-item {
                margin-bottom: 25px;
                background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                border-radius: 10px;
                padding-bottom: 25px;
            }

        }
        .section {
            width: 1330px;
            height: 895px;
            display: inline-block;

            .section-item {
                border-radius: 10px;
                margin-bottom: 25px;
                display: flex;
                width: 100%;
                .eval-wrap {
                    display: flex;
                    flex: 1;
                    padding: 20px 30px;
                    margin-top: 40px;
                    color: #cfe8ff;
                    height: 100%;   // 放在某个 section 里时方便撑满
                    box-sizing: border-box;
                }

                /* 左列固定宽度 */
                .eval-left {
                    width: 260px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                /* 中间大圆 区域可固定宽度 */
                .eval-center {
                    width: 300px;
                    margin: 0 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .center-circle{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        background: url("../../../assets/images/unitEfficiency.png") no-repeat center;
                        height: 280px;
                        width: 282px;
                        p{
                            margin: 0;
                        }
                        .center-num{
                            color: #67aef6;
                            font-size: 20px;
                            span{
                                color: #ffeb4e;
                                font-size: 50px;
                                font-family: "DS-Digital", "DIN Alternate", monospace;
                                font-weight: bold;
                            }
                        }
                    }
                }

                /* 右列占剩余所有空间 */
                .eval-right {
                    width: 260px;
                    display: flex;
                    flex-direction: column;
                }
                .metric-item {
                    height: 80px;
                    margin-bottom: 30px;

                    .metric-title {
                        font-size: 18px;
                        height: 38px;
                        margin: 0;
                        padding-left: 10px;
                        line-height: 38px;
                        color: #6bb5ff;
                        background: linear-gradient(to right, rgba(2,65,126,0.2) , rgba(0,112,218,0.4) );
                    }

                    .metric-bottom {
                        display: flex;
                        align-items: baseline;
                        justify-content: space-between;
                        padding: 0 10px;
                        height: 40px;
                        line-height: 40px;
                        background: linear-gradient(to right,  rgba(15,59,126,0.1) , rgba(15,59,126,0.3) );
                        .metric-value {
                            font-size: 24px;
                            color: #ebda55;
                        }
                        .metric-compare {
                            font-size: 14px;
                            color: #1384eb;
                        }
                    }
                }

                /* 让最后一个没 margin-bottom */
                .eval-left .metric-item:last-child,
                .eval-right-top .metric-item:last-child {
                    margin-bottom: 0;
                }
                .eval-list{
                    width: 450px;
                    padding-bottom: 25px;
                    border-radius: 10px;
                    background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                }


            }
            .section-item1{
                background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                display: block;
            }
        }

        .org-list {
            padding: 0;
            margin: 0;
            list-style: none;
            font-size: 14px;
            color: #6bb5ff;
            height: 290px;
            overflow: auto;
            .org-item {
                display: flex;
                align-items: center;
                height: 32px;                // 每行高度
                padding: 0 20px;

            }

            .org-name {
                flex: 1;                      // 左边占满剩余空间
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .org-count {
                margin-left: 30px;
                .label {
                    margin-right: 4px;
                }
                .num {
                    color: #ffd640;             // 数字黄色高亮
                    margin-right: 8px;
                }
            }
        }

    }
}
</style>
