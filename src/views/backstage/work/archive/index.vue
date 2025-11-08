<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="85px">
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
            <el-form-item label="证件号码" prop="idcardNo">
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
                    <el-form-item label="初重标识：" class="flexstart">
                        <el-radio-group v-model="queryParams.repeat" size="small">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button label="0">初件</el-radio-button>
                            <el-radio-button label="1">重件</el-radio-button>
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
                <el-col :span="12">
                    <el-form-item label="处理状态：" class="flexstart">
                        <el-radio-group v-model="queryParams.end" size="small">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button label="1">已办结</el-radio-button>
                            <el-radio-button label="0">处理中</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div>
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" v-hasPermi="['work:focus:export']">导出</el-button>
                </el-col>
                <el-col :span="4" style="float: right">
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                </el-col>
            </el-row>
            <el-table ref="multipleTable" :data="archiveLetterData" tooltip-effect="dark" style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                <el-table-column prop="letterCode" label="信访件编号" width="140" show-overflow-tooltip></el-table-column>
                <el-table-column label="登记日期" width="120">
                    <template slot-scope="scope">{{ scope.row.registerTime }}</template>
                </el-table-column>
                <el-table-column prop="letterTypeName" label="信访形式" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="purposeTypeName" label="信访目的" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="zoneName" label="问题属地" show-overflow-tooltip></el-table-column>
                <el-table-column prop="repeatName" label="初重标志" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="contentTypeName" label="内容分类" show-overflow-tooltip></el-table-column>
                <el-table-column prop="handleUnitName" label="最后办理单位" show-overflow-tooltip></el-table-column>
                <el-table-column prop="handleStateName" label="办理状态" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-document" size="mini" type="text">
                            <router-link :to="{ path: '/workbenches/detailcomp/' + scope.row.objectId }">详情</router-link>
                        </el-button>
                        <el-button size="mini" type="text" icon="el-icon-document" @click="handleGenerate(scope.row)" v-hasPermi="['work:archive:generate']">生成</el-button>
                        <el-button size="mini" type="text" icon="el-icon-download" v-if="scope.row.archiveUrl" @click="handleDownload(scope.row)" v-hasPermi="['work:archive:download']">下载</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList"/>
        </div>
    </div>
</template>
<script>
import {initZoneList} from "@/api/common/common";
import {listArchiveData, generateArchive} from "@/api/backstage/work/archive";

export default {
    name: "Archive",
    dicts: ['sys_purpose_type', 'sys_letter_type'],
    data() {
        return {
            loading: false,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
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
                repeat: "",
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
            archiveLetterData: [],
            multipleSelection: []
        };
    },
    created() {
        this.initZone();
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
            listArchiveData(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                    this.archiveLetterData = response.rows;
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
            this.queryParams.repeat = "";
            this.queryParams.regLevel = "";
            this.queryParams.markType = "";
            this.queryParams.end = "";
            this.resetForm("queryForm");
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.letterCode);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        /** 导出按钮操作 */
        handleExport() {
            if (this.total > 5000) {
                this.$modal.msgWarning("您当前导出的数据量超过5000条数据，暂不提供导出！建议分批导出!");
                return false;
            }
            this.download('work/archive/export', {
                ...this.queryParams
            }, `智能卷宗管理_${new Date().getTime()}.xlsx`, {timeout: 120000})
        },
        handleGenerate(row) {
            let $that = this;
            this.$modal.confirm('确认' + (row.archiveId ? '重新' : '') + '生成该信访件的卷宗？').then(function () {
                $that.$modal.loading("卷宗正在生成中，请稍候……");
                let data = {
                    objectId: row.objectId,
                    archiveId: row.archiveId,
                    letterCode: row.letterCode
                };
                return generateArchive(data);
            }).then(() => {
                $that.$modal.closeLoading();
                this.getList();
                this.$modal.msgSuccess("卷宗生成成功！");
            }).catch(() => {
                $that.$modal.closeLoading();
            });
        },
        handleDownload(row) {
            this.download('common/download/resource', {
                resource: row.archiveUrl
            }, `卷宗_${row.letterCode}.doc`, {timeout: 120000})
        }
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
