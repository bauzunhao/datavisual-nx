<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="conthead">
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
            <div class="sectionleft">
                <div class="subtitle">
                    <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                    <h3>监督追责情况</h3>
                </div>
                <div class="duty-panel">
                    <div
                        class="duty-section"
                        v-for="(section, sIndex) in sections"
                        :key="sIndex"
                    >
                        <!-- 标题 -->
                        <div class="section-title">
                            <div class="title"><h4>{{ section.title }}</h4></div>
                        </div>

                        <!-- 条目列表 -->
                        <ul class="section-list">
                            <li
                                class="section-item"
                                v-for="(item, iIndex) in section.items"
                                :key="iIndex"
                            >
                                <span class="item-label">{{ item.label }}</span>

                                <span class="item-value">
                                <span class="item-num">{{ item.value }}</span>
                                <span class="item-unit">{{ item.unit }}</span>
                              </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="section">

                <div class="section-item">
                    <div class="subtitle subtitle2" style="margin-bottom: 0;">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>国家信访局督办情况</h3>
                    </div>
                    <div class="review">
                        <div>
                            处理意见明显不当或不执行处理意见
                            <p class="blue">321</p>
                        </div>
                        <div>
                            其他未落实“三到位一处理〞
                            <p>321</p>
                        </div>
                        <div>
                            未按规定受理办理
                            <p class="mint">321</p>
                        </div>
                    </div>

                    <template>
                        <div class="table-panel">
                            <table class="blue-table">
                                <thead>
                                <tr>
                                    <th style="width: 220px;">督办类型（{{ tableData.length }}项）</th>
                                    <th style="width: 420px;">具体情形（{{ totalItems }}项）</th>
                                    <th style="width: 80px;">件次</th>
                                    <th style="width: 120px;">数量和占比</th>
                                </tr>
                                </thead>

                                <tbody>
                                <!-- 每一类 -->
                                <template v-for="(group, gIndex) in tableData" >
                                    <!-- 每一行具体情形 -->
                                    <tr v-for="(item, iIndex) in group.items" >
                                        <!-- 左边大类：只在每组第一行显示 + rowspan 合并 -->
                                        <td
                                            v-if="iIndex === 0"
                                            :rowspan="group.items.length"
                                            class="cell-category"
                                        >
                                            {{ group.category }}
                                        </td>

                                        <!-- 具体情形 -->
                                        <td>{{ item.name }}</td>

                                        <!-- 件次 -->
                                        <td>{{ item.count }}</td>

                                        <!-- 右边合计：只在每组第一行显示 + rowspan 合并 -->
                                        <td
                                            v-if="iIndex === 0"
                                            :rowspan="group.items.length"
                                            class="cell-summary"
                                        >
                                            <div>{{ group.total }}</div>
                                            <div>{{ group.percent }}</div>
                                        </td>
                                    </tr>
                                </template>
                                </tbody>
                            </table>
                        </div>
                    </template>

                </div>

                <div class="section-item">
                    <div class="subtitle subtitle2" style="margin-bottom: 0;">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>督办汇报后重复信访情况</h3>
                        <div class="legend-wrap">
                            <div class="legend-item">
                                <span class="legend-dot legend-dot--blue"></span>
                                <span class="legend-text">总量</span>
                            </div>

                            <div class="legend-item">
                                <span class="legend-dot legend-dot--orange"></span>
                                <span class="legend-text">督办后重复信访量</span>
                            </div>
                        </div>
                    </div>

                    <div style="padding-right: 25px;">
                        <Bartwo-Chart
                            :dataName="names"
                            :dataValue="values1"
                            :dataValue2="values2"
                            :gradient="['#1f73e1', '#1ccaf7']"
                            :gradient2="['#ffcf4a', '#ff8f4a']"
                            height="310px"
                            width="100%"
                            left="5"
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
import BartwoChart from '@/components/BartwoChart/index.vue'
export default {
    name: 'index',
    components: { RankGradientBars, DatavHead ,BartwoChart},
    data (){
        return {
            options1: ['全区', '自治区信访局'],
            activeIndex1: 0,
            options2: ['今日', '本月', '本年'],
            activeIndex2: 0,
            sections : [
                {
                    title: '信访部门履行三项建议职责',
                    items: [
                        { label: '提出改进工作建议', value: 15, unit: '件次' },
                        { label: '提出完善政策建议', value: 15, unit: '件次' },
                        { label: '提出追究责任建议', value: 15, unit: '件次' }
                    ]
                },
                {
                    title: '各级信访工作联席会议监督',
                    items: [
                        { label: '信访工作联席会议通报', value: 15, unit: '件次' },
                        { label: '信访工作联席会议约谈', value: 15, unit: '件次' },
                        { label: '信访工作联席会议挂牌督办', value: 15, unit: '件次' }
                    ]
                },
                {
                    title: '人大监督',
                    items: [
                        { label: '人大监督', value: 15, unit: '件次' }
                    ]
                },
                {
                    title: '各级纪检监察机关监督追责',
                    items: [
                        { label: '立案违反信访工作纪律', value: 15, unit: '件次' },
                        { label: '处分违反信访工作纪律', value: 15, unit: '件次' },
                        { label: '信访问责', value: 15, unit: '件次' }
                    ]
                }
            ],
            tableData: [
                {
                    category: '处理意见明显不当或不执行处理意见',
                    total: 19,
                    percent: '10%',
                    items: [
                        { name: '政策法规适用错误', count: 1 },
                        { name: '未全面回应群众诉求', count: 1 },
                        { name: '以处理意见代替结果性意见', count: 3 },
                        { name: '不执行处理意见', count: 4 },
                        { name: '未落实“三到位一处理”', count: 5 }
                    ]
                },
                {
                    category: '其他未落实“三到位一处理”',
                    total: 19,
                    percent: '10%',
                    items: [
                        { name: '未落实“三到位一处理”', count: 3 },
                        { name: '需进一步关注大规模聚集隐患或负面舆论风险', count: 1 }
                    ]
                }
            ],
            // X轴的名字
            names: ['住房公积金','产权交易','土地转让','集体资产管理','大气污染',
                '规划建设','辖区管理','土地转让','集体资产管理','规划建设'],

            // 第一根柱子的数据
            values1: [720,650,560,430,390,360,300,260,190,110],

            // 第二根柱子，用于对比（颜色不一样的柱子）
            values2: [500,480,420,300,260,240,200,180,120,80]
        }
    },
    methods :{
        handleClick1(i) {
            this.activeIndex1 = i
        },
        handleClick2(i) {
            this.activeIndex2 = i
        },
    },
    computed: {
        // 具体情形总数（头部“18项”那个数字）
        totalItems () {
            return this.tableData.reduce((sum, group) => sum + group.items.length, 0)
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
            justify-content: flex-start;
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
            .duty-panel {
                // 整体背景可以根据你的大屏背景来调整
                width: 100%;
                padding: 20px 40px 20px 0;
                box-sizing: border-box;
                font-family: 'Microsoft YaHei', sans-serif;
                color: #e6f7ff;
            }

            .duty-section {
                margin-bottom: 36px;

                &:last-child {
                    margin-bottom: 0;
                }
            }


            /* 列表 */
            .section-list {
                list-style: none;
                margin: 0;
                padding: 0 0 0 18px; // 左缩进，和标题对齐好看一点
            }

            .section-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                color: #6bb5ff;
                padding-left: 40px;

                // 行间距
                &:not(:last-child) {
                    margin-bottom: 6px;
                }

                .item-label {
                    flex: 1;
                    // 文字过长时省略号
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .item-value {
                    min-width: 110px;
                    text-align: right;
                    display: inline-flex;
                    justify-content: flex-end;
                    align-items: baseline;
                }

                .item-num {
                    color: #ffd15c; // 右侧数字的黄色
                    margin-right: 4px;
                }

                .item-unit {
                    font-size: 14px;
                }
            }
        }
        .section {
            width: 1330px;
            height: 895px;
            display: inline-block;

            .section-item {
                background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                border-radius: 10px;
                margin-bottom: 25px;
                .review{
                    display: flex;
                    justify-content: space-around;
                    gap: 40px;
                    padding: 0 40px;
                    div{
                        flex: 1;
                        text-align: center;
                        color: #FFFFFF;
                        font-size: 18px;
                        padding: 20px 0;
                        background: linear-gradient(to bottom, rgba(25, 99, 173, 0.2), rgba(38, 102, 171, 0.01));
                        p{
                            font-family: "DS-Digital", "DIN Alternate", monospace;
                            font-size: 36px;
                            color: #f3e04c;
                            margin: 10px 0 0 ;
                            line-height: 40px;
                        }
                        .blue{color: #26c1fd }
                        .mint{color: #1dfbd1}
                    }
                }

                .table-panel {
                    width: 100%;
                    padding: 25px 20px;
                    box-sizing: border-box;
                }

                .blue-table {
                    width: 100%;
                    border-collapse: collapse;
                    table-layout: fixed;
                    font-size: 14px;
                    color: #e9f4ff;

                    th {
                        height: 36px;
                        background: rgba(0, 90, 180, 0.8);
                        border: 1px solid #2a6dc5;
                        text-align: center;
                        font-weight: 600;
                    }

                    td {
                        border: 1px solid #2a6dc5;
                        background: rgba(0, 60, 150, 0.5);
                        padding: 4px 8px;
                        line-height: 1.4;
                    }

                    .cell-category {
                        background: rgba(0, 80, 180, 0.7);
                        font-weight: 600;
                        text-align: center;
                    }

                    .cell-summary {
                        background: rgba(0, 80, 180, 0.7);
                        text-align: center;
                        font-weight: 600;
                        line-height: 20px;
                    }
                }
                .legend-wrap {
                    display: flex;
                    align-items: center;
                    // 和图之间的间距自己调
                    margin-bottom: 8px;
                    font-size: 14px;
                    position: absolute;
                    right: 40px;
                    top: 20px;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    margin-right: 40px; // 两个 legend 之间的间距

                    &:last-child {
                        margin-right: 0;
                    }
                }

                .legend-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    display: inline-block;
                }

                /* 蓝色圆点 */
                .legend-dot--blue {
                    background: #18c3ff;
                }

                /* 橙色圆点 */
                .legend-dot--orange {
                    background: #ff8c2a;
                }

                .legend-text {
                    margin-left: 6px;
                    color: #ffffff;
                }
            }
        }
    }
}
</style>

