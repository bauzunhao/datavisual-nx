<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="sectionleft">
                <div class="sectionleft-item">
                    <div class="subtitle">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>自治区信访局督办情况</h3>
                    </div>
                    <div class="sectionleft-item-head">
                        <h4>总件数</h4>
                        <div class="num-display">
                            <span v-for="(digit, i) in digits" :key="i">{{ digit }}</span>
                        </div>
                    </div>
                    <div class="sectionleft-item-l1">
                        <p>督办后已汇报</p>
                        <p class="num">22319</p>
                        <p > <span class="num">80</span>  %</p>
                    </div>
                    <div class="sectionleft-item-l2">
                        <div class="info-item">
                            <div class="descblnx" >
                                <div class="label">来信</div>
                            </div>
                            <div class="value">
                                <span class="num">21</span>
                                <span class="unit">件</span>
                            </div>
                            <div class="value">
                                <span class="num">21</span>
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="descblnx" >
                                <div class="label">来访</div>
                            </div>
                            <div class="value">
                                <span class="num">21</span>
                                <span class="unit">件</span>
                            </div>
                            <div class="value">
                                <span class="num">21</span>
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="descblnx" >
                                <div class="label">网络投诉</div>
                            </div>
                            <div class="value">
                                <span class="num">21</span>
                                <span class="unit">件</span>
                            </div>
                            <div class="value">
                                <span class="num">21</span>
                                <span class="unit">%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="sectionleft-item">
                    <div class="subtitle">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>督办汇报后重复信访次数</h3>
                    </div>
                    <div style="height: 270px;overflow: auto;">
                        <RankGradientBars :items="cityList" :barHeight="14" />
                    </div>
                </div>
            </div>
            <div class="section">

                <div class="section-item">
                    <div class="subtitle subtitle2" style="margin-bottom: 0;">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>督办情形</h3>
                    </div>
                    <!-- 顶部 3 张卡片 -->
                    <div class="abnormal-handle-header">
                        <div class="header-item">
                            <p class="header-title">处理意见明显不当或不执行处理意见</p>
                            <p class="value">23499</p>
                        </div>

                        <div class="header-item">
                            <p class="header-title">其他未落实 “三到位一处理”</p>
                            <p class="value yellow">3320</p>
                        </div>

                        <div class="header-item">
                            <p class="header-title">未按规定受理办理</p>
                            <p class="value green">9988</p>
                        </div>
                    </div>
                    <!-- 底部内容区域：左表格 + 右图表 -->
                    <div class="abnormal-handle-body">
                        <!-- 左表格 -->
                        <div class="abnormal-handle-table">
                            <div class="title"> <h4>内容分类</h4></div>
                            <div class="datav-table">
                                <div class="table-header">
                                    <span>名称</span>
                                    <span>信访量</span>
                                    <span>占比</span>
                                </div>
                                <div class="table-body">
                                    <div class="table-row" v-for="(item, index) in tableData" :key="index">
                                        <div class="dot"></div>
                                        <span class="name">{{ item.name }}</span>
                                        <span class="value">{{ item.value }}</span>
                                        <span class="percent">{{ item.percent }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 右柱状图 -->
                        <div class="abnormal-handle-chart">
                            <div class="title"> <h4>督办各地市数据情况</h4></div>
                            <RdwtChart
                                ref="chart"
                                :data-name="names"
                                :data-value="values"
                                left=5
                                height="275px"
                                :bar-width="22"
                            />
                        </div>

                    </div>
                </div>
                <div class="section-item">
                    <div class="subtitle subtitle2" style="margin-bottom: 0;">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>地方自行督办情况 (总量:323232)</h3>
                    </div>
                    <div style="padding-right: 25px;">
                        <RdwtChart
                            ref="chart"
                            :data-name="names"
                            :data-value="values"
                            left=5
                            height="290px"
                            :bar-width="22"
                        />
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
import RdwtChart from '@/components/BarChart/index.vue'
export default {
    name: 'index',
    components: { RdwtChart, RankGradientBars, DatavHead },
    data(){
        return {
            number: 98765,
            cityList: [
                { name: '拉萨市', value: 90 },
                { name: '日喀则市', value: 85 },
                { name: '山南市', value: 70 },
                { name: '林芝市', value: 65 },
                { name: '昌都市', value: 50 },
                { name: '那曲市', value: 40 },
            ],
            tableData: [
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' },
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' },
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' },
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' },
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' },
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' },
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' },
            ],
            names: ['住房公积金','产权交易','土地转让','集体资产管理','大气污染','规划建设','辖区管理','土地转让','集体资产管理','规划建设'],
            values: [720,650,560,430,390,360,1300,260,190,110]
        }
    },
    computed: {
        digits() {
            return String(this.number).split('');
        }
    },
}
</script>

<style scoped lang="scss">
@font-face {
    font-family: "DSfont";
    src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
}
$sz-font-family: "DSfont";
.home{
    .cont{
        .sectionleft{
            background: none;
            .sectionleft-item{
                margin-bottom: 25px;
                background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                .sectionleft-item-head{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 25px;
                    h4{
                        white-space: nowrap;
                    }
                }
                .num-display {
                    display: flex;
                    gap: 7px;
                    font-size: 52px;
                    color: #fff;
                    text-shadow: 0 0 10px #00baff, 0 0 25px #00baff;
                    font-family: $sz-font-family, monospace;
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
                .sectionleft-item-l1{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 20px;
                    color: #ebda55;
                    padding: 25px;
                    p{margin: 0;}
                    .num{
                        font-size: 36px;
                        font-family: $sz-font-family, monospace;
                        span{
                            font-size: 20px;
                        }
                    }
                }
                .sectionleft-item-l2{
                    padding: 0 25px 25px 25px;
                    .info-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 20px;
                        border-radius: 10px;
                        height: 80px;
                        width: 100%;
                        line-height: 110px;
                        color: #6bb5ff;
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
                        font-family: "DS-Digital", monospace;
                    }

                    .unit {
                        font-size: 14px;
                        opacity: 0.9;
                        color: #6bb5ff;
                        line-height: 100px;
                    }
                }
            }
        }
        .section {
            width: 1330px;
            height: 895px;
            display: inline-block;
            .section-item{
                background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                border-radius: 10px;
                margin-bottom: 25px;
                .abnormal-handle-header{
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 25px;
                    margin-bottom: 25px;
                    color: #FFFFFF;
                    text-align: center;
                    .header-item{
                        background: linear-gradient(to bottom, rgba(25, 99, 173, 0.3), rgba(38, 102, 171, 0.01));
                        font-size: 18px;
                        .value {
                            font-size: 36px;
                            font-weight: bold;
                            color: #31e6ff;
                            margin: 0;
                            &.yellow { color: #ffd953; }
                            &.green  { color: #3cffc4; }
                            font-family: $sz-font-family, monospace;
                        }
                    }
                }
                .abnormal-handle-body{
                    display: flex;
                    grid-template-columns: repeat(2, 1fr);
                    .abnormal-handle-table{
                        width: 425px;
                        margin-right: 25px;
                        .datav-table{
                            padding: 0 25px 10px 35px;
                            font-size: 14px;
                            color: #FFFFFF;
                            height: 275px;
                            overflow: auto;
                            .table-header {
                                display: flex;
                                justify-content: space-between;
                                color: #FFFFFF;
                                font-size: 14px;
                                margin-bottom: 8px;
                                span {
                                    flex: 1;
                                    text-align: center;
                                }
                            }
                            .table-body {
                                .table-row {
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    position: relative;
                                    height: 30px;
                                    margin-bottom: 4px;
                                    border-radius: 6px;
                                    transition: background 0.3s;
                                    color: #6bb5ff;
                                    &:hover {
                                        background: rgba(0, 120, 255, 0.2);
                                    }
                                    .dot {
                                        width: 10px;
                                        height: 10px;
                                        position: absolute;
                                        left: -10px;
                                        background: #0d72dd;
                                    }
                                    .name {
                                        flex: 1;
                                        text-align: center;
                                    }
                                    .value {
                                        flex: 1;
                                        text-align: center;
                                    }
                                    .percent {
                                        flex: 1;
                                        text-align: center;
                                    }
                                }
                                .table-row:first-child { .dot{background: #ff3b3b;} }
                                .table-row:nth-child(2) { .dot{background: #ffdf33;} }
                            }
                        }
                    }
                    .abnormal-handle-chart{
                        flex: 1;
                        padding-right: 25px;
                    }
                }
            }
        }
    }
}
</style>

