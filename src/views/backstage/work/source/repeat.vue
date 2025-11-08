<template>
    <div class="app-container">
        <div class="head">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>今年以来重件概览</span>
                </div>
                <div class="item">
                    <el-row :gutter="100" class="numlist">
                        <el-col :span="6">
                            <div>
                                <p>{{ generalData.newToday }}</p>
                                <p>今日新增重件</p>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div>
                                <p>{{ generalData.count }}</p>
                                <p>重件总量</p>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div>
                                <p>
                                    {{ generalData.nationNum }}/{{ generalData.provinceNum }}/{{ generalData.cityNum }}</p>
                                <p>国家/自治区/全地市</p>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div>
                                <p>{{ generalData.ratio }}</p>
                                <p>重件占比总量</p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="85px"
                 style="margin-top:20px">
            <el-form-item label="信访人姓名" prop="name">
                <el-input
                    v-model="queryParams.name"
                    placeholder="请输入信访人姓名"
                    clearable
                    style="width: 180px"
                    @keyup.enter.native="handleQuery"/>
            </el-form-item>
            <el-form-item label="信访件编号" prop="letterCode">
                <el-input
                    v-model="queryParams.letterCode"
                    placeholder="请输入信访件编号"
                    clearable
                    style="width: 180px"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="问题属地" prop="zoneId">
                <el-cascader
                    v-model="queryParams.zoneId"
                    placeholder="请选择问题属地"
                    :props="zoneProps"
                    :options="zoneOptions"
                    :show-all-levels="false"
                    clearable
                    style="width: 180px"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="证件号码" prop="certificateNumber">
                <el-input
                    v-model="queryParams.certificateNumber"
                    placeholder="请输入信访人证件号码"
                    clearable
                    style="width: 180px"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="登记日期">
                <el-date-picker
                    v-model="dateRange"
                    style="width: 240px"
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </el-form-item>
            <el-row class="butlist">
                <el-col :span="12">
                    <el-form-item label="办理类型：" class="flexstart">
                        <el-radio-group v-model="queryParams.handleType" size="small">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button label="0">交办</el-radio-button>
                            <el-radio-button label="4">督办</el-radio-button>
                            <el-radio-button label="1">转送</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="信访目的：" class="flexstart">
                        <el-radio-group v-model="queryParams.purposeType" size="small">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button
                                v-for="dict in dict.type.sys_purpose_type"
                                :key="dict.value"
                                :label="dict.value"
                            >{{ dict.label }}
                            </el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="处理状态：" class="flexstart">
                        <el-radio-group v-model="queryParams.end" size="small">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button label="1">已办结</el-radio-button>
                            <el-radio-button label="0">处理中</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="信访形式：" class="flexstart">
                        <el-radio-group v-model="queryParams.letterType" size="small">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button
                                v-for="dict in dict.type.sys_letter_type"
                                :key="dict.value"
                                :label="dict.value"
                            >{{ dict.label }}
                            </el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="登记级别：" class="flexstart">
                        <el-radio-group v-model="queryParams.regLevel" size="small">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button label="1">国家</el-radio-button>
                            <el-radio-button label="2">自治区</el-radio-button>
                            <el-radio-button label="3">市级</el-radio-button>
                            <el-radio-button label="4">区/县</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="标记类型：" class="flexstart">
                        <el-radio-group v-model="queryParams.markType" size="small">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button label="1">集体访</el-radio-button>
                            <el-radio-button label="2">积案</el-radio-button>
                            <el-radio-button label="3">扬言</el-radio-button>
                            <el-radio-button label="4">最多访一次</el-radio-button>
                            <el-radio-button label="5">专项件</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-pie-chart" size="mini" @click="reportQuery">统计</el-button>
            </el-col>
            <el-col :span="4" style="float: right">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-col>
        </el-row>
        <div>
            <el-table ref="multipleTable" :data="repeatLetterData" tooltip-effect="dark" style="width: 100%"
                      v-loading="loading">
                <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                <el-table-column prop="letterCode" label="信访件编号" show-overflow-tooltip></el-table-column>
                <el-table-column label="登记日期">
                    <template slot-scope="scope">{{ scope.row.registerTime }}</template>
                </el-table-column>
                <el-table-column prop="letterTypeName" label="信访形式" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="purposeTypeName" label="信访目的" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="zoneName" label="问题属地" show-overflow-tooltip></el-table-column>
                <el-table-column prop="contentTypeName" label="内容分类" show-overflow-tooltip></el-table-column>
                <el-table-column prop="handleUnitName" label="最后办理单位" show-overflow-tooltip></el-table-column>
                <el-table-column prop="handleStateName" label="办理状态" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width" >
                    <template slot-scope="scope">
                        <el-button icon="el-icon-document" size="mini" type="text">
                            <router-link :to="{ path: '/workbenches/detailcomp/' + scope.row.objectId }">详情</router-link>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination
                v-show="total>0"
                :total="total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getList"
            />
            <el-dialog title="统计" :visible.sync="dialogTableVisible">
                <el-table :data="repeatReportList" :summary-method="getSummaries" show-summary>
                    <el-table-column label="地区" align="center" prop="zoneName"/>
                    <el-table-column label="重件各地市分布" align="center">
                        <el-table-column label="总量" align="center" prop="num"/>
                        <el-table-column label="办理中" align="center" prop="blzNum"/>
                        <el-table-column label="办结" align="center" key="bjNum" prop="bjNum"/>
                        <el-table-column label="办结率" align="center" key="bjl" prop="bjl"/>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {initZoneList} from "@/api/common/common";
import {listRepeatData, listRepeatReportData, getRepeatSummaryData} from "@/api/backstage/work/repeat";

export default {
    name: "Repeat",
    dicts: ['sys_purpose_type', 'sys_letter_type'],
    data() {
        return {
            loading: false,
            dialogTableVisible: false,
            // 显示搜索条件
            showSearch: true,
            // 日期范围
            dateRange: [],
            // 总条数
            total: 0,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                name: undefined,
                letterCode: undefined,
                zoneId: undefined,
                certificateNumber: undefined,
                handleType: "",
                purposeType: "",
                letterType: "",
                repeat: 1,
                regLevel: "",
                markType: "",
                end: ""
            },
            zoneProps: {
                label: "name",
                value: "id",
                checkStrictly: true,
                emitPath: false
            },
            zoneOptions: [],
            generalData: {
                newToday: 0,
                count: 0,
                nationNum: 0,
                provinceNum: 0,
                cityNum: 0,
                ratio: "0.00%"
            },
            repeatLetterData: null,
            multipleSelection: [],
            repeatReportList: [{}],
        };
    },
    created() {
        this.initZone();
        this.repeatSummaryDataQuery();
    },
    methods: {
        // 初始化行政区域
        initZone() {
            initZoneList({
                id: process.env.VUE_APP_SUPER_ZONE_ID
            }).then(response => {
                this.zoneOptions = [];
                if (response) {
                    this.zoneOptions = response;
                }
            });
        },
        /** 查询列表 */
        getList() {
            this.loading = true;
            listRepeatData(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                    this.repeatLetterData = response.rows;
                    this.total = response.total;
                    this.loading = false;
                }
            );
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.dateRange = [];
            this.queryParams.handleType = "";
            this.queryParams.purposeType = "";
            this.queryParams.letterType = "";
            this.queryParams.repeat = 0;
            this.queryParams.regLevel = "";
            this.queryParams.markType = "";
            this.queryParams.end = "";
            this.resetForm("queryForm");
            this.handleQuery();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /** 导出按钮操作 */
        handleExport() {
            if (this.total > 5000) {
                this.$modal.msgWarning("您当前导出的数据量超过5000条数据，暂不提供导出！建议分批导出!");
                return false;
            }
            this.download('work/source/repeat/export', {
                ...this.queryParams
            }, `重件管理_${new Date().getTime()}.xlsx`, {timeout: 120000});
        },
        /** 统计按钮操作 */
        reportQuery() {
            this.dialogTableVisible = true;
            this.loading = true;
            listRepeatReportData(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.repeatReportList = [{}];
                if (response.data) {
                    this.repeatReportList = response.data;
                }
                this.loading = false;
            });
        },
        getSummaries(param) {
            const {columns, data} = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                } else {
                    sums[index] = 'N/A';
                }
            });
            sums[columns.length - 1] = "";
            if (sums[1] > 0) {
                sums[columns.length - 1] = (sums[3] / sums[1] * 100.0).toFixed(2) + "%";
            }
            return sums;
        },
        /** 重件汇总数据查询 */
        repeatSummaryDataQuery() {
            getRepeatSummaryData().then(response => {
                if (response.data) {
                    this.generalData = response.data;
                }
            });
        },
    }
};
</script>
<style scoped lang="scss">

.butlist {
    .el-button--small {
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .el-button + .el-button {
        margin-left: 0;
    }

    .flexstart {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: flex-start;
        align-items: flex-start;
    }

    label {
        white-space: nowrap !important;
    }
}

.colorb {
    color: rgb(64, 158, 255);
}

.tips {
    padding: 5px;
    background-color: #e6f7ff;
    border-radius: 5px;
    border: 1px solid rgb(64, 158, 255);
    font-size: 14px;

    i {
        margin-right: 5px;
    }
}

.numlist {
    .el-col div {
        border: 1px solid #cccccc63;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 40px;
        border-radius: 5px;

        p {
            margin: 0;
            font-size: 15px;
            white-space: nowrap;
        }

        p:first-child {
            font-size: 30px;
            color: #1890ff;
            line-height: 35px;
        }
    }
}

.opspan {
    opacity: 0;
}
</style>
