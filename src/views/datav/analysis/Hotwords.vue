<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
           <div class="conthead">
               <p>登记时间:</p>
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
            <div class="section">
                <div class="subtitle subtitle2" style="margin-bottom: 0;">
                    <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                    <h3>热词分析</h3>
                </div>

                <div class="visit-container">

                    <el-table
                        :data="tableData"
                        style="width: 100%;"
                        row-key="id"
                        class="visit-table"
                    >
                        <el-table-column prop="id" label="ID" width="60" />
                        <el-table-column prop="mainIssue" label="群众主要反映问题" width="300" />
                        <el-table-column prop="firstCount" label="初次反映件次" />
                        <el-table-column prop="repeatCount" label="多次反映件次" />
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <span class="action-btn">查看详情</span>
                            </template>
                        </el-table-column>

                    </el-table>

                    <div class="block">
                        <el-pagination
                            layout="prev, pager, next"
                            :total="1000">
                        </el-pagination>
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
            options2: ['今日', '本月', '本年'],
            activeIndex2: 0,
            tableData: [
                {
                    id: 1,
                    mainIssue: " 关于”拉萨市医院退休职工待遇“问题",
                    firstCount: 3,
                    repeatCount: 1,
                    action: "查看"
                },
                {
                    id: 2,
                    mainIssue: " 关于”拉萨市医院退休职工待遇“问题",
                    firstCount: 1,
                    repeatCount: 0,
                    action: "查看"
                },
                {
                    id: 3,
                    mainIssue: " 关于”拉萨市医院退休职工待遇“问题",
                    firstCount: 2,
                    repeatCount: 1,
                    action: "查看"
                }
            ],

        }
    },
    methods:{
        handleClick2(i) {
            this.activeIndex2 = i
        },
    }
}
</script>

<style scoped lang="scss">
.home {
    .cont {
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
        .section{
            width: 100%;
            background: linear-gradient( 180deg, rgba(0,61,136,0.3) 0%, rgba(0,29,65,0.1) 51%, rgba(0,61,136,0.3) 100%);
            border-radius: 10px;
            .visit-container{
                height: 800px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

        }
    }
}
</style>
<style lang="scss">
.visit-container {
    padding: 0 25px;
    overflow: auto;
    border: none !important;
    background: transparent;

    // 所有表格元素统一无背景、无边框
    th,
    td,
    tr,
    .el-table,
    .el-table__body tr:hover > td,
    th.is-leaf {
        background: transparent !important;
        border: none !important;
    }

    // 表格区域
    .visit-table {
        background: transparent;

        // 表头样式
        .has-gutter tr,
        .has-gutter th {
            color: #fff;
            border: 0;
            text-align: center;
        }
        .has-gutter{
            background: #023673;
        }

        // 表格行样式
        .el-table__row {
            td,
            tr {
                color: #6bb5ff;
                text-align: center;
            }
        }


        .el-table__expanded-cell {
            background: #071934;
        }


    }

    // 历史记录样式
    .history-list {
        padding: 10px 0;
        color: #ffffff;
        font-size: 14px;
        margin-top: 40px;
    }

    .history-item {
        display: flex;
        padding: 4px 0;
        align-items: center;
        gap: 30px;
    }

    .history-date {
        width: 120px;
        flex-shrink: 0;
    }

    .history-row {
        margin: 0;
        line-height: 1.8;
        color: #6bb5ff;
    }

    .highlight {
        color: #ffd94a;
    }
    .action-btn {
        color: #ffd94a;
        cursor: pointer;

        &:hover {
            color: #fff08a;
            text-decoration: underline;
        }
    }


    // 分页组件
    .block {
        padding: 20px 0;
        text-align: right;

        .el-pagination {
            color: #6bb5ff;

            .active {
                background: #2e73a8;
                color: #fff;
            }
        }

        .btn-prev,
        .btn-next {
            background: #0c3b71;
            color: #6bb5ff;
            border-radius: 3px;
            margin: 0 5px;
            padding: 0 6px;
        }

        .el-pager li {
            background: #0c3b71;
            border-radius: 3px;
            margin: 0 5px;
        }

        .el-icon-more {
            color: #6bb5ff;
        }
    }
}
.el-table::before{height: 0;}
</style>

