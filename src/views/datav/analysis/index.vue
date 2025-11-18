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
                        <router-link to="/datav/Warning">
                            <p>信息预警</p>
                        </router-link>
                    </div>
                    <div class="but-itme">
                        <router-link to="/datav/Hotwords">
                            <p>热词分析</p>
                        </router-link>
                    </div>
                    <div class="but-itme">
                        <router-link to="/datav/Report">
                            <p>分析报告</p>
                        </router-link>
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

                <div class="section-left-itme">
                    <div class="subtitle subtitle2">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>办理情况</h3>
                    </div>
                    <div class="category-stats">
                        <div class="category-item">
                            <div class="value">52</div>
                            <div class="label">登记件次</div>
                        </div>
                        <div class="category-item">
                            <div class="value">52</div>
                            <div class="label">转送件次</div>
                        </div>
                        <div class="category-item">
                            <div class="value">52</div>
                            <div class="label">交办件次</div>
                        </div>
                        <div class="category-item">
                            <div class="value">52</div>
                            <div class="label">督办件次</div>
                        </div>
                    </div>
                    <template>
                        <div class="section-left-chart">
                            <div class="title"> <h4>办理情况</h4></div>
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


                        <div class="section-left-chart">
                            <div  class="title"> <h4>信访形式</h4></div>
                            <div ref="sectionleftchart1" style="width:100%;height:160px;"></div>
                            <div  class="title"> <h4>信访目的</h4></div>
                            <div ref="sectionleftchart2" style="width:100%;height:160px;"></div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="section-right">
                <div class="subtitle subtitle2" style="margin-bottom: 0;">
                    <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                    <h3>全区信访量情况</h3>
                </div>
                <div class="genpieChart">
                    <genpie-chart :enableClick="true" />
                </div>
                <div class="title" style="margin-bottom: 0;margin-top: -40px;"> <h4>办理情况</h4></div>
                <div style="padding: 0 25px;">
                    <RdwtChart
                        ref="chart"
                        :data-name="names"
                        :data-value="values"
                        left=5
                        height="220px"
                        :bar-width="22"
                    />
                <div class="title" style="margin-bottom: 0;"> <h4>近12个月信访量走势</h4></div>
                    <LineChart
                        ref="chart"
                        height="220px"
                        left=5
                    />
                </div>
            </div>
        </div>
        <!-- ElementUI 弹框 -->
        <div class="visit-dialog">
            <el-dialog
                :visible.sync="dialogVisible"
                :show-close="false"
                width="1300px"
            >
                <div class="subtitle subtitle2" style="margin: 0;">
                    <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                    <h3>信访件详情
                        <span @click="dialogVisible = false" class="dialog-close">X</span>
                    </h3>
                </div>

                <div class="case-panel">
                    <!-- 左侧 -->
                    <div class="case-left">
                           <!-- 头像卡片 -->
                           <div class="avatar-card">
                               <img src="../../../assets/images/grts.png" alt="">
                           </div>

                           <!-- 基本信息 -->
                           <div class="base-info">
                               <p><span class="label">
                                   姓名：</span><span class="value stat-main">张三</span>
                                    <span style="margin-left: 60px;">性别：男</span>
                               </p>
                               <p><span class="label">
                                   民族：</span><span class="value">汉族</span>
                                   <span style="margin-left: 60px;">籍贯：拉萨</span>
                               </p>
                               <p><span class="label">年龄：</span><span class="value">56岁</span></p>
                               <p><span class="label">住址：</span><span class="value">拉萨市动风小区5栋B区</span></p>
                               <p><span class="label">联系电话：</span><span class="value">18910951000</span></p>
                           </div>

                        <div class="left-divider"></div>

                        <!-- 统计条 -->
                        <div class="stat-list">
                            <div class="stat-item">
                                <span class="stat-tag">信访次数</span>
                                <span class="stat-main">258</span>次，走访214件，来信15件，网信80件
                            </div>
                            <div class="stat-item">
                                <span class="stat-tag">办理状态</span>
                                待办理<span class="stat-main">20</span>，已办理 <span class="stat-main">100</span> 件
                            </div>
                            <div class="stat-item">
                                <span class="stat-tag">登记级别</span>
                                    国<span class="stat-main">12</span>件，区<span class="stat-main">32</span>件，市<span class="stat-main">123</span>件，县<span class="stat-main">43</span>件
                            </div>
                        </div>

                        <div class="left-divider"></div>

                        <div class="case-info">
                            <p>扬言情况</p>
                            <p>扬言情况扬言情况扬言情况扬言情况扬言情况扬言情况扬言情况扬言情况扬言情况扬言情况</p>
                        </div>

                    </div>

                    <!-- 右侧 -->
                    <div class="case-right">
                        <!-- 上方字段两列 -->
                        <div class="right-top">
                            <div class="right-col">
                                <p><span class="label">信访时间：</span><span class="value">2023年1月1日</span></p>
                                <p><span class="label">事情发生地：</span><span class="value">金凤区</span></p>
                                <p><span class="label">信访原因：</span><span class="value">信访人因素</span></p>
                            </div>
                            <div class="right-col">
                                <p><span class="label">事项所属系统：</span><span class="value">建设</span></p>
                                <p><span class="label">当前办理状态：</span><span class="value">办理中</span></p>
                                <p><span class="label">内容分类：</span><span class="value">拖欠工资</span></p>
                            </div>
                        </div>

                        <!-- 投诉内容 + 概括内容区域 -->
                        <div class="content-block">
                            <p class="content-title">
                                投诉内容与概括登记情况：信访件编号：202000000000000<span class="extra"> （涉及人数：250人，涉法涉诉、积案、初件）</span>
                            </p>

                            <div class="summary-box">
                                <div class="summary-placeholder">概 括 内 容</div>
                            </div>
                        </div>

                        <!-- 右下“详细情况”按钮区域 -->
                        <div class="detail-link">
                            <span style="float: left;">工作人员办理意见级备注内容：</span>
                            详细情况 &gt;
                        </div>
                    </div>

                </div>

                <div class="visit-tabs">
                    <el-tabs type="card">
                        <el-tab-pane label="关联单位详情">
                            <div class="visit-tabs-content">
                                <p>信访机构名称:</p>
                                <p>单位负责人: </p>
                                <p>联系电话:</p>
                                <p>经办人姓名:</p>
                                <p>经办人联系电话:</p>

                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="办理情况">关联单位详情</el-tab-pane>
                        <el-tab-pane label="处理情况 ">角色管理</el-tab-pane>
                        <el-tab-pane label="汇报情况">定时任务补偿</el-tab-pane>
                        <el-tab-pane label="回访情况">定时任务补偿</el-tab-pane>
                        <el-tab-pane label="不满意原因">定时任务补偿</el-tab-pane>
                        <el-tab-pane label="责任单位未解决原因">定时任务补偿</el-tab-pane>
                    </el-tabs>
                </div>

            </el-dialog>
        </div>
    </div>

</template>

<script>
import * as echarts from 'echarts'
import DatavHead from '@/components/DatavHead/index.vue'
import StatTile from '@/components/StatTile/index.vue';
import GenpieChart from '@/components/GenpieChart/index.vue'
import RdwtChart from '@/components/BarChart/index.vue'
import LineChart from '@/components/LineChart/index.vue'
export default {
    name: 'index',
    components: { RdwtChart, DatavHead ,StatTile,GenpieChart,LineChart},
    data() {
        return {
            options1: ['全系统', '全区', '国家局', '部委', '自治区信访局'],
            activeIndex1: 0,
            options2: ['今日', '本月', '本年'],
            activeIndex2: 0,
            dialogVisible: true,
            tableData: [
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' },
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' },
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' },
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' },
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' },
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' },
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' },
                {  name: '劳动关系二级内容', value: 1000, percent: '25%' }
            ],
            names: ['住房公积金','产权交易','土地转让','集体资产管理','大气污染','规划建设','辖区管理','土地转让','集体资产管理','规划建设'],
            values: [720,650,560,430,390,360,1300,260,190,110]
        }
    },
    mounted() {
        this.ec1 = echarts.init(this.$refs.sectionleftchart1)
        this.ec1.setOption(this.getOption1())
        this.ec2 = echarts.init(this.$refs.sectionleftchart2)
        this.ec2.setOption(this.getOption1())
    },
    methods: {
        handleClick1(i) {
            this.activeIndex1 = i
        },
        handleClick2(i) {
            this.activeIndex2 = i
        },
        getOption1 () {
            const option = {
                backgroundColor: 'transparent',
                toolbox: { show: true },
                tooltip: {
                    trigger: 'item',
                    formatter: p => `${p.name}：${p.value}（${p.percent}%）`
                },
                series: [
                    {
                        name: '信访形式',
                        type: 'pie',
                        radius: [45, 60],
                        center: ['50%','40%'],
                        startAngle: 0,
                        clockwise: true,
                        // ECharts 5 支持，做圆角端点
                        roundCap: true,
                        avoidLabelOverlap: true,
                        // 取消玫瑰图样式
                        roseType: false,

                        itemStyle: {
                            borderColor: '#ffffff10',  // 分段之间的细缝
                            borderWidth: 6,
                            shadowBlur: 6,
                            shadowColor: 'rgba(0,0,0,.18)'
                        },

                        label: {
                            show: true,
                            position: 'outside',
                            formatter: p => {
                                return `{name|${p.name}}`
                            },
                            rich: {
                                name: {
                                    color: '#f0f0f0',
                                    fontSize: 16,
                                    lineHeight: 18
                                },
                                num: {
                                    fontFamily: 'DS-Digital, DSfont, monospace', // DSfont 字体
                                    color: '#FFD95C',
                                    fontSize: 26,
                                    textShadowColor: 'rgba(255,217,92,.6)',
                                    textShadowBlur: 6
                                },
                                unit: {
                                    color: '#5db0ff',   // 百分号颜色
                                    fontSize: 16,
                                    padding: [10, 0, 0, 0]  // 给数字和 % 之间一点间距
                                }
                            }
                        },

                        labelLine: {
                            show: true,
                            length: 22,
                            length2: 26,
                            lineStyle: { color: 'rgba(120,170,255,.7)', width: 1.5 }
                        },

                        data: [
                            {
                                value: 40, name: '来信',
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: '#FFC557' },
                                        { offset: 1, color: '#C8891A' }
                                    ])
                                }
                            },
                            {
                                value: 38, name: '来访',
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: '#2FE7BF' },
                                        { offset: 1, color: '#0C7A5A' }
                                    ])
                                }
                            },
                            {
                                value: 32, name: '网上信访',
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: '#3BB8FF' },
                                        { offset: 1, color: '#1C72FF' }
                                    ])
                                }
                            }
                        ]
                    }
                ]
            }

            return option
        },
    }

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
                .category-stats{
                    width: 100%;
                    display: inline-flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    vertical-align: top;
                    align-items: center;
                    justify-content: center;
                    .category-item{
                        width: 200px;
                        height: 80px;
                        margin-bottom: 10px;
                        color: #6bb5ff;
                        text-align: center;
                        font-size: 16px;
                        background: url("../../../assets/images/glow-base.png") no-repeat center 100%;
                        background-size: 80%;
                        .value{
                            color: #26c1fd;
                            font-size: 36px;
                            font-family: "DSfont", monospace;
                        }
                    }
                }
                .section-left-chart{
                    width: 50%;
                    display: inline-block;
                    margin-top: 5px;
                    vertical-align: top;
                    .datav-table {
                        padding: 0 25px 0 35px;
                        font-size: 14px;
                        color: #FFFFFF;
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
                                height: 40px;
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
            }
            .cards{
                display: flex;
            }
        }
        .section-right{
            width: 890px;
            margin-left: 40px;
            display: inline-block;
            border-radius: 10px;
            background: linear-gradient( 180deg, rgba(0,61,136,0.3) 0%, rgba(0,29,65,0.1) 51%, rgba(0,61,136,0.3) 100%);
            height: 885px;
            vertical-align: top;
            .genpieChart{
                width: 100%;
                height: 330px;
            }
        }

    }

    .visit-dialog ::v-deep .el-dialog {
        .case-panel {
            display: flex;
            padding: 10px 35px;
            border-radius: 10px;
            color: #fff;
            font-size: 14px;
        }
        p{margin: 0;}
        /* 左侧 */
        .case-left {
            width: 360px; // 固定宽度
            margin-right: 24px;
            padding: 20px 15px;
            border-radius: 10px;
            background: linear-gradient(to bottom, rgba(2, 22, 50, 0.5), rgba(1, 27, 64, 0.5));
        }

        .avatar-card {
            width: 80px;
            height: 110px;
            display: inline-block;
            vertical-align: top;
            img{
                width: 100%;
                height: 100%;
            }
        }

        .base-info {
            line-height: 1.8;
            width: 220px;
            display: inline-block;
            margin-left: 20px;
            font-size: 12px;
            color: #6bb5ff;
            p{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .stat-main{
                color: #ffd45b;
            }
            .label {
                margin-right: 4px;
            }
            .value {
            }
        }

        .left-divider {
            margin: 16px 0;
            border-bottom: 1px dashed rgba(107, 181, 255, 0.149);
        }

        .stat-list {
            .stat-item {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                color: #6bb5ff;
                font-size: 12px;
                line-height: 14px;

                .stat-tag {
                    color: white;
                    min-width: 80px;
                    text-align: center;
                    padding: 6px 15px;
                    border-radius: 3px;
                    margin-right: 10px;
                    background: linear-gradient(to right, #02224a, #012d5f);

                }

                .stat-main {
                    vertical-align: top;
                    color: #ffd45b;
                }

                .unit {
                    color: #c7ddff;
                }
            }
        }

        .case-info{
            color: #6bb5ff;
            font-size: 12px;
            p{
                margin-top: 10px;
                display: -webkit-box;
                -webkit-line-clamp: 2;     // 限制显示 2 行
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        /* 右侧 */
        .case-right {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .right-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 18px;
            font-size: 14px;

            .right-col {
                width: 50%;
                p + p {
                    margin-top: 10px;
                }
            }

            .label {
                color: #6bb5ff;
                margin-right: 6px;
            }
            .value {
            }
        }

        .content-block {
            flex: 1;
            display: flex;
            flex-direction: column;

            .content-title {
                margin-bottom: 12px;
                color: #6bb5ff;
                .extra {
                    margin-left: 12px;
                    font-size: 12px;
                    color: #c7ddff;
                }
            }

            .summary-box {
                flex: 1;
                border-radius: 10px;
                background: rgba(2, 22, 50, 0.6);
                position: relative;
                overflow: hidden;
                padding: 20px;

                .summary-placeholder {
                    font-size: 14px;
                    color: rgba(255,255,255,0.7);
                }
            }
        }

        .detail-link {
            margin-top: 10px;
            text-align: right;
            font-size: 14px;
            color: #4fb6ff;
            cursor: pointer;
        }

        .visit-tabs{
            padding: 10px 35px;
            .el-tabs--card > .el-tabs__header{
                margin: 0;
                border: 0;
            }
            .el-tabs--card > .el-tabs__header .el-tabs__nav{border: 0;}
            .el-tabs__item{
                border: 0;
                color: #6bb5ff;
            }
            .is-active{
                color: white;
                background: #021632;
            }
            .visit-tabs-content{
                background: #021632;
                color: #6bb5ff;
                padding: 35px 25px 10px 25px;
                font-size: 14px;
                background: linear-gradient(to bottom, #021632, #021c40);
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 16px;
                max-height: 180px;
                overflow: auto;
            }

        }
    }
}
</style>
