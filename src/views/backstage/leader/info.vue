<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="110px">
            <el-form-item label="领导姓名" prop="leaderName">
                <el-input
                    v-model="queryParams.leaderName"
                    placeholder="请输入包案领导姓名"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="领导机构名称" prop="unitName" label-width="100px">
                <el-input
                    v-model="queryParams.unitName"
                    placeholder="请输入包案领导机构名称"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="领导职务" prop="duties">
                <el-input
                    v-model="queryParams.duties"
                    placeholder="请输入包案领导职务"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-row class="butlist">
                <el-form-item label="包案领导级别：" label-width="110px" class="flexstart">
                    <el-radio-group v-model="queryParams.leaderLevel" size="small">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button
                            v-for="dict in dict.type.leader_level"
                            :key="dict.value"
                            :label="dict.value"
                        >{{ dict.label }}
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="领导机构类别：" label-width="120px" class="flexstart">
                    <el-radio-group v-model="queryParams.leaderUnitType" size="small">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button
                            v-for="dict in dict.type.leader_unit_type"
                            :key="dict.value"
                            :label="dict.value"
                        >{{ dict.label }}
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-row>
        </el-form>
        <div>
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button
                        type="primary"
                        plain
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                        v-hasPermi="['leader:info:add']"
                    >新增
                    </el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button
                        type="danger"
                        plain
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                        v-hasPermi="['leader:info:remove']"
                    >删除
                    </el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button
                        size="mini"
                        plain
                        type="danger"
                        :disabled="multiple"
                        icon="el-icon-setting"
                        @click="handleStatusIds"
                        v-hasPermi="['leader:rule:status']"
                    >停用
                    </el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" v-hasPermi="['leader:info:export']">导出
                    </el-button>
                </el-col>
                <el-col :span="1.5" style="float: right">
                    <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                </el-col>
                <el-col :span="1.5" style="float: right">
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                </el-col>
<!--                <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
            </el-row>

            <el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"/>
                <el-table-column label="头像" align="center" prop="portrait" width="100">
                    <template slot-scope="scope">
                        <image-preview :src="scope.row.portrait" :width="50" :height="50"/>
                    </template>
                </el-table-column>
                <el-table-column label="领导姓名" align="center" prop="leaderName" width="100"
                                 :show-overflow-tooltip="true"/>
                <el-table-column label="领导机构名称" align="center" prop="unitName" width="120"/>
                <el-table-column label="领导职务" align="center" prop="duties" width="100" :show-overflow-tooltip="true"/>
                <el-table-column label="职责范围简介" align="center" prop="introduction" :show-overflow-tooltip="true"/>
                <el-table-column label="状态" align="center" prop="status">
                    <template slot-scope="scope">
                        <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
                    </template>
                </el-table-column>
                <el-table-column label="包案次数" align="center" prop="packCaseNums" width="80"/>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                            v-hasPermi="['leader:info:edit']"
                        >修改
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.row)"
                            v-hasPermi="['leader:info:remove']"
                        >删除
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-setting"
                            @click="handleStatus(scope.row)"
                            v-hasPermi="['leader:rule:status']"
                        >{{ 1 == scope.row.status ? '启用' : '停用' }}
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
            <!-- 添加或修改包案领导信息对话框 -->
            <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
                <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="领导姓名" prop="leaderName">
                                <el-input v-model.trim="form.leaderName" placeholder="请输入领导姓名" maxlength="100"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="领导机构名称" prop="unitName">
                                <el-input v-model.trim="form.unitName" placeholder="请输入领导机构名称" maxlength="150"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="领导职务" prop="duties">
                                <el-input v-model.trim="form.duties" type="textarea" placeholder="请输入领导职务"
                                          maxlength="150"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="领导级别" prop="leaderLevel">
                                <el-select v-model="form.leaderLevel" placeholder="请选择领导级别">
                                    <el-option
                                        v-for="dict in dict.type.leader_level"
                                        :key="dict.value"
                                        :label="dict.label"
                                        :value="dict.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="领导机构类别" prop="leaderUnitType">
                                <el-select v-model="form.leaderUnitType" placeholder="请选择领导机构类别">
                                    <el-option
                                        v-for="dict in dict.type.leader_unit_type"
                                        :key="dict.value"
                                        :label="dict.label"
                                        :value="dict.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="职责范围简介" prop="introduction">
                                <el-input v-model.trim="form.introduction" type="textarea" placeholder="请输入内容"
                                          maxlength="150"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="状态" prop="status">
                                <el-radio-group v-model="form.status">
                                    <el-radio
                                        v-for="dict in dict.type.sys_normal_disable"
                                        :key="dict.value"
                                        :label="dict.value"
                                    >{{ dict.label }}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item>
                                <el-checkbox v-model="form.checked" :disabled="form.disabledChecked">复制到接访下访
                                </el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="头像" prop="portrait">
                                <image-upload v-model="form.portrait" :limit="1"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        listInfo,
        getInfo,
        delInfo,
        addInfo,
        updateInfo,
        setStatus,
        setStatusIds
    } from "@/api/backstage/leader/info";
    import Treeselect from "@riophae/vue-treeselect";

    export default {
        name: "Info",
        components: {Treeselect},
        dicts: ['leader_level', 'leader_unit_type', 'sys_normal_disable'],
        data() {
            return {
                // 遮罩层
                loading: true,
                // 选中数组
                ids: [],
                // 非单个禁用
                single: true,
                // 非多个禁用
                multiple: true,
                // 显示搜索条件
                showSearch: true,
                // 总条数
                total: 0,
                // 包案领导信息表格数据
                infoList: [],
                // 弹出层标题
                title: "",
                // 是否显示弹出层
                open: false,
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    leaderName: null,
                    unitName: null,
                    duties: null,
                    leaderLevel: "",
                    leaderUnitType: "",
                    introduction: null,
                    status: null,
                    portrait: null,
                },
                leaderIds: "",
                // 表单参数
                form: {},
                // 表单校验
                rules: {
                    leaderName: [
                        {required: true, message: "领导姓名不能为空", trigger: "blur"},
                    ],
                    unitName: [
                        {required: true, message: "领导机构名称不能为空", trigger: "blur"},
                    ],
                    duties: [
                        {required: true, message: "领导职务不能为空", trigger: "blur"},
                    ],
                    leaderLevel: [
                        {required: true, message: "领导级别不能为空", trigger: "blur"},
                    ],
                    leaderUnitType: [
                        {required: true, message: "领导机构类别不能为空", trigger: "blur"},
                    ],
                    introduction: [
                        {required: true, message: "职责范围简介不能为空", trigger: "blur"},
                    ],
                    status: [
                        {required: true, trigger: "blur"},
                    ],
                }
            };
        },
        created() {
            this.getList();
        },
        methods: {
            /** 查询包案领导信息列表 */
            getList() {
                this.loading = true;
                listInfo(this.queryParams).then(response => {
                    this.infoList = response.rows;
                    this.total = response.total;
                    this.loading = false;
                });
            },
            // 取消按钮
            cancel() {
                this.open = false;
                this.reset();
            },
            // 表单重置
            reset() {
                this.form = {
                    leaderId: null,
                    leaderName: null,
                    unitName: null,
                    duties: null,
                    leaderLevel: null,
                    leaderUnitType: null,
                    introduction: null,
                    status: "0",
                    portrait: null,
                    checked: false,
                };
                this.resetForm("form");
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageNum = 1;
                this.getList();
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.queryParams.leaderLevel = "";
                this.queryParams.leaderUnitType = "";
                this.resetForm("queryForm");
                this.handleQuery();
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.leaderId);
                this.single = selection.length !== 1;
                this.multiple = !selection.length;
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.reset();
                this.open = true;
                this.form.disabledChecked = false;
                this.title = "添加包案领导信息";
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset();
                const leaderId = row.leaderId || this.ids;
                getInfo(leaderId).then(response => {
                    this.form = response.data;
                    this.open = true;
                    this.form.disabledChecked = true;
                    this.title = "修改包案领导信息";
                });
            },
            /** 提交按钮 */
            submitForm() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.leaderId != null) {
                            updateInfo(this.form).then(response => {
                                this.$modal.msgSuccess("修改成功");
                                this.open = false;
                                this.getList();
                            });
                        } else {
                            addInfo(this.form).then(response => {
                                this.$modal.msgSuccess("新增成功");
                                this.open = false;
                                this.getList();
                            });
                        }
                    }
                });
            },

            /** 设置为启停用状态操作 */
            handleStatusIds(row) {
                const leaderIds = row.leaderId || this.ids;
                this.$modal.confirm('是否确认停用包案领导信息？').then(function () {
                    return setStatusIds(leaderIds);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("设置包案领导信息状态成功");
                }).catch(() => {
                });
            },

            /** 设置为启停用状态操作 */
            handleStatus(row) {
                const leaderIds = row.leaderId || this.ids;
                let textStatus = row.status == 1 ? "启用" : "停用";
                this.$modal.confirm('是否确认' + textStatus + '包案领导信息？').then(function () {
                    return setStatus(leaderIds);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("设置包案领导信息状态成功");
                }).catch(() => {
                });
            },

            /** 删除按钮操作 */
            handleDelete(row) {
                const leaderIds = row.leaderId || this.ids;
                this.$modal.confirm('是否确认删除包案领导信息？').then(function () {
                    return delInfo(leaderIds);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("删除成功");
                }).catch(() => {
                });
            },

            /** 导出按钮操作 */
            handleExport(row) {
                this.queryParams.leaderIds = row.leaderId || this.ids;
                this.download('leader/info/export', {
                    ...this.queryParams
                }, `包案领导信息_${new Date().getTime()}.xlsx`)
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
</Style>
