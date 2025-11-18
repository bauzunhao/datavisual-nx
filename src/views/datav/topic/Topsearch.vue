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
                    <h3>查询结果 deepseek</h3>
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

        <div ref="drag" class="deepseekbtn" @click="handleClick3($event)">
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
                    <h3>分析助手 deepseek
                        <span @click="dialogVisible = false" class="dialog-close">X</span>
                    </h3>
                </div>
                <div class="visit-container">
                    <p class="deepseekdesc">在这里，可以对查询结果进行分析!</p>
                    <div class="visit-tabs">
                        <el-tabs type="card">
                            <el-tab-pane label="总体分析">
                                <div class="visit-tabs-content">
                                    <img class="deepseektip" src="../../../assets/images/deepseek.png" alt="">
                                    <div>
                                        一、总体情况
                                        推据提供的改增，2025年1月1日至2025年8月5日系网，访总量为258件，信访事项总警为183件，涉及信访人281人次，其中，是访7人次，目这7人左均去北京国家信销县免访，总体承看，信访总量和临访事项总显较为接近，设明大部分信协事项是由单一信谓人理的回时，走访人数较少，但全部集中在国家临访局，表明婴分临访人可能对地方处理这菜不满意，这择向上级部门反软园.
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="重点人员">重点人员</el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </el-dialog>
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
            options2: ['近7日', '近15日', '近30日'],
            activeIndex2: 0,
            dialogVisible: false,
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
            hasMoved: false,
            startX: 0,
            startY: 0,
        }
    },
    mounted() {
        const el = this.$refs.drag

        el.addEventListener('mousedown', e => {
            this.hasMoved = false       // 重置
            this.startX = e.clientX
            this.startY = e.clientY

            const offsetX = e.clientX - el.offsetLeft
            const offsetY = e.clientY - el.offsetTop

            const move = ev => {
                const dx = ev.clientX - this.startX
                const dy = ev.clientY - this.startY

                // 移动超过 3px => 认为是拖动
                if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                    this.hasMoved = true
                }

                el.style.left = ev.clientX - offsetX + 'px'
                el.style.top = ev.clientY - offsetY + 'px'
            }

            document.addEventListener('mousemove', move)

            document.addEventListener(
                'mouseup',
                () => {
                    document.removeEventListener('mousemove', move)
                },
                { once: true }
            )
        })
    },
    methods:{
        handleClick2(i) {
            this.activeIndex2 = i
        },
        handleClick3(e){
            if (this.hasMoved) {
                // 拖动 => 不触发点击事件
                e.stopImmediatePropagation()
                e.preventDefault()
                return
            }
            this.dialogVisible = true;

        }
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
    .deepseekbtn{
        position: fixed;
        right: 0;
        z-index: 2;
        bottom: 10%;
        cursor: pointer;
        background: url("../../../assets/images/deepseekbtn.png") no-repeat;
        height: 225px;
        width: 225px;
        border-radius: 50px;
    }
}

.visit-dialog ::v-deep .el-dialog {
    .el-dialog__header{display: none;}
    background: rgba(5, 24, 55, 0.9);
    .el-dialog__body {
        padding: 0;
        border-radius: 10px;
        background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);

        h3 {
            width: calc(100% - 55px);
        }

        .dialog-close {
            float: right;
            margin-right: 25px;
            cursor: pointer;
        }

        .deepseekdesc{
            color: #6bb5ff;
            font-size: 18px;
            margin-bottom: 10px;
        }
        .visit-container{
            padding: 35px;

            .visit-tabs{
                padding: 10px 0;
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
                    position: relative;
                    padding: 35px 25px 10px 25px;
                    font-size: 14px;
                    background: linear-gradient(to bottom, #021632, #021c40);
                    max-height: 400px;
                    overflow: auto;
                    border-top-right-radius : 10px;
                    .deepseektip{
                        position: absolute;
                        top: 0;
                        right: 0;
                    }
                }

            }
        }
    }

    p {
        margin: 0;
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

