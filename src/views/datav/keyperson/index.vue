<template>
    <div class="home">
        <DatavHead />
        <div class="cont">

            <div class="conthead">
                <div style="display: flex;">
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
            </div>

            <div class="sectionleft">
                <div class="subtitle">
                    <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                    <h3>信访次数TOP20</h3>
                </div>
                <div style="text-align: center;">
                    <div class="seg-wrap">
                        <div class="seg-pill">
                            <button
                                v-for="(item, i) in options3"
                                :key="i"
                                :class="['seg-btn', { 'is-active': activeIndex3 === i }]"
                                @click="handleClick3(i)"
                            >
                                <span>{{ item }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="RankGradientBars">
                    <RankGradientBars :items="cityList" :barHeight="13" :rowicon="true" namewidth="55"/>
                </div>
            </div>

            <div class="section">
                <div class="info-wrapper">
                    <!-- 左侧：基本信息 -->
                    <div class="card base-info">
                        <h4 class="infotitle">基本信息</h4>
                        <div class="content">
                            <p><span>性别：</span>男   <span style="margin-left: 100px;">年龄：</span>56岁  </p>
                            <p><span>电话：</span>1397476383</p>
                            <p><span>身份证号：</span>64323232323232</p>
                            <p><span>户籍地：</span>拉萨市</p>
                            <p><span>居住地：</span>拉萨市郊风小区5栋B区</p>
                            <p><span>累计信访次数：</span>23</p>
                            <p><span>最新信访时间：</span>2025.09.09</p>
                        </div>
                    </div>

                    <!-- 中间：头像 + 标签 -->
                    <div class="card center-info">
                        <div class="avatar"></div>
                        <h4 class="username">张三</h4>

                        <div class="tag-list">
                            <span class="tag danger">进京访(4)</span>
                            <span class="tag warn">赴省</span>
                            <span class="tag warn">集体</span>
                            <span class="tag danger">扬言</span>
                        </div>
                    </div>

                    <!-- 右侧：概括信息 -->
                    <div class="card summary-info">
                        <h4 class="infotitle">概括信息</h4>
                        <div class="content">
                            概括信息内容
                        </div>
                    </div>
                </div>
                <div style="display: flex;margin: 20px;">
                    <div class="timelinecont">
                        <div class="title"> <h4>办理情况</h4></div>
                        <div class="timeline">
                            <!-- 中间那条线 -->
                            <div class="timeline-line"></div>

                            <!-- 时间节点 -->
                            <div
                                class="timeline-item"
                                v-for="(item, index) in timeList"
                                :key="item"
                                :class="{
                                'is-top': index % 2 === 1,   // 奇数在上
                                'is-bottom': index % 2 === 0 // 偶数在下
                              }"
                            >
                                <div class="timeline-circle"></div>
                                <div class="timeline-label">{{ item }}</div>
                            </div>
                        </div>
                        <div class="timeline-but">
                            <div>初访</div>
                            <div>全部</div>
                        </div>
                    </div>
                    <div class="lawcont">
                        <div class="title" style="margin-bottom: 0;"> <h4>信访规律</h4></div>
                        <LineChart
                            ref="chart"
                            height="220px"
                            left=5
                        />
                    </div>
                </div>

                <div class="info-msg">
                    <h4 style="margin-bottom: 20px">关联事项</h4>
                    <div class="info-row">
                        <div><span>信访编号：</span>232323233</div>
                        <div><span>信访时间：</span>2025-03-04</div>
                        <div><span>问题属地：</span>城关区</div>
                    </div>

                    <div class="info-row">
                        <div><span>信访目的：</span>求决</div>
                        <div><span>信访形式：</span>来信</div>
                        <div><span>登记单位：</span>人力资源和社会保障局</div>
                    </div>

                    <div class="info-row">
                        <div><span>内容分类：</span>劳动和社会保障_其他_其他</div>
                        <div><span>同概况：</span>1人</div>
                        <div><span>随访人：</span>1人</div>
                    </div>

                    <div class="info-row">
                        <div><span>信访人手机号：</span>18888888888</div>
                        <div><span>信访人住址：</span>拉萨市某某区某某小区</div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import DatavHead from '@/components/DatavHead/index.vue'
import RankGradientBars from '@/components/RankGradientBars/index.vue'
import LineChart from '@/components/LineChart/index.vue'
export default {
    name: 'index',
    components: { LineChart, RankGradientBars, DatavHead },
    data(){
        return {
            options1: ['全系统', '全区', '国家局', '部委', '自治区信访局'],
            activeIndex1: 0,
            options2: ['今日', '本月', '本年'],
            activeIndex2: 0,
            options3: ['全部', '来信', '来访','网络投诉'],
            activeIndex3: 0,
            cityList: [
                { name: '张三', value: 100 },
                { name: '姓名', value: 100 },
                { name: '张三丰', value: 100 },
                { name: '李四', value: 100 },
                { name: '王五', value: 100 },
                { name: '张三', value: 100 },
                { name: '姓名', value: 100 },
                { name: '张三丰', value: 100 },
                { name: '李四', value: 100 },
                { name: '王五', value: 100 },
                { name: '张三', value: 100 },
                { name: '张三', value: 100 },
                { name: '姓名', value: 100 },
                { name: '姓名', value: 100 },
                { name: '张三丰', value: 100 },
                { name: '张三丰', value: 100 },
                { name: '李四', value: 100 },
                { name: '李四', value: 100 },
                { name: '王五', value: 100 },
                { name: '王五', value: 100 }
            ]
            ,
            timeList: [
                '2024-01-10',
                '2024-03-02',
                '2024-07-15',
                '2024-12-06',
                '2025-03-01',
                '2025-08-06',
                '2025-09-15'
            ],
        }
    },
    methods:{
        handleClick1(i) {
            this.activeIndex1 = i
        },
        handleClick2(i) {
            this.activeIndex2 = i
        },
        handleClick3(i) {
            this.activeIndex3 = i
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
        }
        .sectionleft{
            .RankGradientBars{
                padding: 0 0 0 20px;
            }
        }
        .section{
            width: 1330px;
            height: 895px;
            display: inline-block;
            .info-wrapper {
                display: flex;
                -webkit-box-pack: justify;
                justify-content: space-between;
                -webkit-box-align: stretch;
                align-items: flex-end;
                padding: 0 38px;
                margin-top: 38px;
                width: 100%;
                box-sizing: border-box;
                flex-direction: row;
                .card {
                    border-radius: 12px;
                    padding: 20px 30px;
                    box-sizing: border-box;
                    backdrop-filter: blur(8px);
                    position: relative;
                    margin: 0 15px;

                    // 卡片标题
                    .infotitle {
                        font-size: 22px;
                        text-align: center;
                        color: #d1eaff;
                        margin-bottom: 20px;
                    }

                    .content {
                        font-size: 16px;
                        line-height: 30px;
                        color: #cbe0ff;
                    }
                }
                // 中间卡片更窄一些
                .center-info {
                    text-align: center;
                    height: 326px;
                    width: 436px;
                    background: url('../../../assets/images/center-info.png') center/cover no-repeat;
                    .avatar {
                        width: 140px;
                        height: 140px;
                        margin: 0 auto;
                        border-radius: 50%;
                        background: url('../../../assets/images/avatar.png') center/cover no-repeat;
                    }

                    .username {
                        margin-top: 15px;
                        font-size: 28px;
                        font-weight: bold;
                        color: #fff;
                    }

                    .tag-list {
                        margin-top: 15px;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 16px;
                    }

                    .tag {
                        padding: 6px 20px;
                        border-radius: 20px;
                        font-size: 16px;
                        color: #fff;

                        &.warn {
                            box-shadow:
                                inset 0 0 25px rgba(234 ,219, 83,0.7); /* 内发光核心 */
                            border: 1px solid #eadb53;
                        }
                        &.danger {
                        box-shadow:
                        inset 0 0 25px rgba(250 ,104 ,112,0.7); /* 内发光核心 */
                            border: 1px solid rgb(250 ,104 ,112);
                        }
                    }
                }

                .base-info , .summary-info{
                    background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                    transform: perspective(1000px) rotateY(15deg);
                    height: 300px;
                    width: 380px;
                    margin-top: 20px;
                    .content{
                        max-height: 210px;
                        overflow: auto;
                        p{
                            margin: 0;
                            font-size: 14px;
                        }
                        span{
                            color: #6bb5ff;
                        }
                    }
                }
                .summary-info{
                    transform: perspective(1000px) rotateY(-15deg);
                }
            }
            .timelinecont{
                width: 50%;
                .timeline {
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 40px; // 两边留点空
                    height: 120px;      // 根据你大屏高度调整
                    color: #fff;
                    font-size: 14px;
                }

                /* 中间那条黄线 */
                .timeline-line {
                    position: absolute;
                    left: 40px;
                    right: 40px;
                    top: 50%;
                    height: 2px;
                    background: #e0d632; // 黄线颜色
                    z-index: 0;
                }

                .timeline-item {
                    position: relative;
                    z-index: 1;             // 在黄线之上
                    flex: 1;
                    display: flex;
                    justify-content: center;
                }

                /* 圆点 */
                .timeline-circle {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    border: 3px solid #e0d632;   // 圆环黄色
                    background: #004285; // 中心透明/深色都行
                    box-sizing: border-box;
                }

                /* 时间文字 */
                .timeline-label {
                    position: absolute;
                    white-space: nowrap;
                    margin: 10px 0;
                }

                /* 在下面的日期 */
                .timeline-item.is-bottom .timeline-label {
                    top: calc(50% + 12px); // 圆点下方一点
                }

                /* 在上面的日期 */
                .timeline-item.is-top .timeline-label {
                    bottom: calc(50% + 12px); // 圆点上方一点
                }

                .timeline-but{
                    display: flex;
                    justify-content: space-between;
                    padding: 0 40px;
                    div{
                        padding: 3px 15px;
                        font-size: 14px;
                        color: #ebda55;
                        line-height: 25px;
                        border-radius: 5px;
                        cursor: pointer;
                        background-image: linear-gradient(0deg, #104e8f 0%, #024389 100%);
                    }
                }
            }
            .lawcont{
                width: 50%;
            }
            .info-msg{
                background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                border-radius: 10px;
                padding: 30px 25px;
                margin-top: 22px;
                .info-row {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    column-gap: 40px;
                    row-gap: 10px;
                    margin-bottom: 12px;
                    color: #cbe2ff;
                    font-size: 16px;
                }

                .info-row span {
                    color: #8fc4ff;
                    font-weight: 500;
                    margin-right: 6px;
                }
            }






        }
    }
}
</style>

