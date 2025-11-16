<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="conthead">
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

            <div class="sectionleft">
                <ul class="proc-list">
                    <li data-v-7ebeb8c3="" class="proc-item">
                        <div data-v-7ebeb8c3="" class="proc-type">群众来访</div>
                        <div data-v-7ebeb8c3="" class="proc-extra">
                            <p data-v-7ebeb8c3=""> <span data-v-7ebeb8c3="" class="num green">3</span>批次</p>
                            <p data-v-7ebeb8c3=""> <span data-v-7ebeb8c3="" class="num yellow">4</span>人次</p>
                        </div>
                    </li>
                    <li data-v-7ebeb8c3="" class="proc-item">
                        <div data-v-7ebeb8c3="" class="proc-type">集体访</div>
                        <div data-v-7ebeb8c3="" class="proc-extra">
                            <p data-v-7ebeb8c3=""> <span data-v-7ebeb8c3="" class="num green">3</span>批次</p>
                            <p data-v-7ebeb8c3=""> <span data-v-7ebeb8c3="" class="num yellow">4</span>人次</p>
                        </div>
                    </li>
                </ul>
                <div class="sectionleft-item">
                    <div class="subtitle" style="margin: 0;">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>近12个月进京访态势分析</h3>
                    </div>
                    <div style="padding-right: 25px;">
                        <LineChart
                            ref="chart"
                            height="245px"
                            left="12"
                        />
                    </div>
                </div>
                <div class="sectionleft-item">
                    <div class="subtitle" style="margin: 0;">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>各地进京走访情况</h3>
                    </div>
                    <div style="padding-right: 25px;">
                        <RdwtChart
                            ref="chart"
                            :data-name="names"
                            :data-value="values"
                            height="245px"
                            left="12"
                            :bar-width="22"
                        />
                    </div>
                </div>
            </div>

            <div class="sectcont">
                <div class="subtitle subtitle2">
                    <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                    <h3>自治区信访局教育疏导情况</h3>
                </div>
                <div ref="ReasonDonutChart" style="width:100%;height:300px;"></div>
                <template>
                    <div class="table-panel">
                        <table class="blue-table">
                            <thead>
                            <tr>
                                <th style="width: 220px;">疏导情况（{{ tableData.length }}项）</th>
                                <th style="width: 420px;">具体情形（{{ totalItems }}项）</th>
                                <th style="width: 50px;">件次</th>
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
                                    <td class="cell-summary">{{ item.count }}</td>

                                </tr>
                            </template>
                            </tbody>
                        </table>
                    </div>
                </template>
            </div>

            <div class="sectionright">
                <div class="subtitle">
                    <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                    <h3>各地依法处置情况</h3>
                </div>
                <div class="duty-panel">
                    <div
                        class="duty-section"
                        v-for="(section, sIndex) in sections"
                        :key="sIndex"
                    >
                        <!-- 标题 -->
                        <div class="section-title">
                            <div class="title">
                                <h4>{{ section.title }} <span class="total">{{ section.total }}</span>{{ section.unit }} </h4>

                            </div>
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
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import DatavHead from '@/components/DatavHead/index.vue'
import LineChart from '@/components/LineChart/index.vue'
import RdwtChart from '@/components/BarChart/index.vue'
export default {
    name: 'index',
    components: { RdwtChart, LineChart, DatavHead },
    data(){
        return {
            options1: ['今日', '本月', '本年'],
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
            names: ['住房公积金','产权交易','土地转让','集体资产管理','大气污染','规划建设','辖区管理','土地转让','集体资产管理','规划建设'],
            values: [720,650,560,430,390,1360,300,260,190,110],
            rawList: [
                { value: 420, name: '来信',        color: '#36ffcc' },
                { value: 38, name: '来访',        color: '#06ffa1' },
                { value: 21332, name: '其他',    color: '#0080ff' },
                { value: 32, name: '其他',    color: '#1eabfb' },
                { value: 32, name: '其他',    color: '#dff3ff' },
                { value: 132, name: '其他',    color: '#74cbff' },
                { value: 32, name: '其他',    color: '#46fdff' },
                { value: 32, name: '其他',    color: '#3BB8FF' },
            ],
            tableData: [
                {
                    category: '工作原因（8项）',
                    items: [
                        { name: "未及时规范复查（复核）", count: 1 },
                        { name: "未落实处理（复查、复核）意见", count: 1 },
                        { name: "未及时规范导入相应程序或依法办理", count: 3 },
                        { name: "未及时规范登记", count: 4 },
                        { name: "未及时规范受理", count: 5 },
                        { name: "未及时准确转送、交办", count: 5 },
                        { name: "未及时规范办理", count: 5 },
                        { name: "未及时跟踪督办", count: 5 }
                    ]
                },{
                    category: '工作原因（8项）',
                    items: [
                        { name: "未及时规范复查（复核）", count: 1 },
                        { name: "未落实处理（复查、复核）意见", count: 1 },
                        { name: "未及时规范导入相应程序或依法办理", count: 3 },
                        { name: "未及时规范登记", count: 4 },
                        { name: "未及时规范受理", count: 5 },
                        { name: "未及时准确转送、交办", count: 5 },
                    ]
                },
            ],
            sections : [
                {
                    title: '治安管理处罚',
                    total: 357,
                    unit: '人次',
                    items: [
                        { label: '警告',   value: 350, unit: '人次' },
                        { label: '罚款',   value: 2,   unit: '人次' },
                        { label: '行政处罚', value: 5,   unit: '人次' }
                    ]
                },
                {
                    title: '追究刑事责任',
                    total: 358,
                    unit: '人次',
                    items: [
                        { label: '免予刑事责任', value: 350, unit: '人次' },
                        { label: '管制',       value: 2,   unit: '人次' },
                        { label: '拘役',       value: 5,   unit: '人次' },
                        { label: '有期徒刑',   value: 1,   unit: '人次' }
                    ]
                },
                {
                    title: '违反“两个一律”情况',
                    total: 35,
                    unit: '人次',
                    items: [
                    ]
                }
            ]

        }
    },
    computed: {
        pieData() {
            const gapValue = 5   // ⭐ 间隔宽度，可调

            const result = []

            this.rawList.forEach(item => {
                // 主扇区
                result.push({
                    ...item,
                    itemStyle: {
                        color: item.color,
                        shadowBlur: 0,
                    }
                })

                // 间隔扇区
                result.push({
                    value: gapValue,
                    name: 'gap',
                    itemStyle: {
                        color: 'rgba(0,0,0,0)'
                    },
                    tooltip: { show: false },
                    label: { show: false }
                })
            })

            return result
        },

        total() {
            return this.rawList.reduce((s, c) => s + c.value, 0)
        },
        // 具体情形总数（头部“18项”那个数字）
        totalItems () {
            return this.tableData.reduce((sum, group) => sum + group.items.length, 0)
        }
    },

    methods:{
        handleClick1(i){},
        getOption1() {
            return {
                backgroundColor: 'transparent',

                title: {
                    left: 'center',
                    top: '35%',
                    text: `{num|${this.total}}\n{name|总量}`,
                    textStyle: {
                        rich: {
                            num: {
                                fontFamily: 'DS-Digital, DSfont, monospace',
                                fontSize: 48,
                                color: '#ebda55',
                                lineHeight: 50
                            },
                            name: {
                                fontSize: 18,
                                color: '#fff'
                            }
                        }
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: p => p.name !== 'gap'
                        ? `${p.name}：${p.value}（${p.percent}%）`
                        : ''
                },

                series: [
                    {
                        name: '自治区信访局教育疏导情况',
                        type: 'pie',
                        radius: [80, 100],
                        center: ['50%', '50%'],
                        minAngle: 10,
                        startAngle: 90,
                        clockwise: true,
                        roseType: false,

                        labelLine: {
                            show: true,
                            length: 30,
                            length2: 120,
                            lineStyle: { color: 'rgba(120,170,255,.7)', width: 1.5 }
                        },

                        label: {
                            show: true,
                            formatter: p => {
                                if (p.name === 'gap') return ''
                                const idx = p.dataIndex / 2  // ⭐ 每两个数据是一组
                                return `{name|${p.name}${p.percent}%}\n {num${idx}|${p.value}}  `
                            },
                            rich: {
                                name: {
                                    color: '#6bb5ff',
                                    fontSize: 12
                                },

                                //  num0/num1/num2 样式
                                ...(() => {
                                    const r = {}
                                    this.rawList.forEach((item, i) => {
                                        r[`num${i}`] = {
                                            fontFamily: 'DS-Digital, DSfont, monospace',
                                            fontSize: 32,
                                            color: item.color,
                                        }
                                    })
                                    return r
                                })()
                            }
                        },

                        data: this.pieData
                    }
                ]
            }
        }

    },
    mounted() {
        this.ec1 = echarts.init(this.$refs.ReasonDonutChart)
        this.ec1.setOption(this.getOption1())
    },
    beforeDestroy() {
        this.ec1 && this.ec1.dispose()
    },
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
        }
        .sectionleft{
            background: none;
            .proc-list {
                margin: 0;
                list-style: none;
                padding: 0;

                .proc-item {
                    position: relative;
                    margin-bottom: 12px;
                    padding: 25px 20px;
                    overflow: hidden;
                    background: url("../../../assets/images/blnxblue.png") no-repeat center center;
                    background-size: 100% 100%;
                    display: grid;
                    grid-template-columns: 85px 1fr;
                    align-items: center;
                    color: #FFFFFF;

                }

                .proc-type {
                    font-size: 16px;
                    text-align: center;
                }

                .proc-extra {
                    text-align: right;
                    font-size: 14px;
                    color: #6bb5ff;
                    line-height: 1.6;
                    display: flex;
                    justify-content: flex-end;
                    p{margin: 0;}

                    .num {
                        margin-left: 20px;
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

            .sectionleft-item {
                margin-bottom: 25px;
                background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                border-radius: 10px;
                padding-bottom: 25px;
            }
        }
        .sectcont{
            background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
            width: 840px;
            border-radius: 10px;
            display: inline-block;
            vertical-align: top;

            .table-panel {
                width: 100%;
                padding: 0  20px 20px;
                box-sizing: border-box;
                height: 495px;
                overflow: auto;
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
        }
        .sectionright{
            .duty-panel {
                width: 100%;
                height: 750px;
                overflow: auto;
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
                .total{
                    margin-left: 10px;
                    background: #ebda55;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
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
    }
}
</style>

