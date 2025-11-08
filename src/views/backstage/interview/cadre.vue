<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="110px">
            <el-form-item label="干部姓名" prop="cadreName">
                <el-input
                    v-model="queryParams.cadreName"
                    placeholder="请输入干部姓名"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="干部机构名称" prop="unitName">
                <el-input
                    v-model="queryParams.unitName"
                    placeholder="请输入干部机构名称"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="干部职务" prop="cadreDuties">
                <el-input
                    v-model="queryParams.cadreDuties"
                    placeholder="请输入干部职务"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-row class="butlist">
                <el-form-item label="接访下访干部级别：" label-width="175px" class="flexstart">
                    <el-radio-group v-model="queryParams.cadreLevel" size="small">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button
                            v-for="dict in dict.type.leader_level"
                            :key="dict.value"
                            :label="dict.value"
                        >{{ dict.label }}
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="接访下访干部机构类别：" label-width="200px" class="flexstart">
                    <el-radio-group v-model="queryParams.cadreUnitType" size="small">
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
                        v-hasPermi="['interview:cadre:add']"
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
                        v-hasPermi="['interview:cadre:remove']"
                    >删除
                    </el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button
                        size="mini"
                        plain
                        type="danger"
                        icon="el-icon-setting"
                        :disabled="multiple"
                        @click="handleStatusIds"
                        v-hasPermi="['leader:rule:status']"
                    >停用
                    </el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button
                        type="warning" plain
                        icon="el-icon-download"
                        size="mini"
                        @click="handleExport"
                        v-hasPermi="['interview:cadre:export']"
                    >导出
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

            <el-table v-loading="loading" :data="cadreList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"/>
                <el-table-column label="头像" align="center" prop="portrait" width="100">
                    <template slot-scope="scope">
                        <image-preview :src="scope.row.portrait" :width="50" :height="50"/>
                    </template>
                </el-table-column>
                <el-table-column label="干部姓名" align="center" prop="cadreName" width="100"
                                 :show-overflow-tooltip="true"/>
                <el-table-column label="干部机构名称" align="center" prop="unitName" width="120"
                                 :show-overflow-tooltip="true"/>
                <el-table-column label="干部职务" align="center" prop="cadreDuties" width="120"
                                 :show-overflow-tooltip="true"/>
                <el-table-column label="职责范围简介" align="center" prop="introduction" :show-overflow-tooltip="true"/>
                <el-table-column label="状态" align="center" prop="status">
                    <template slot-scope="scope">
                        <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
                    </template>
                </el-table-column>
                <el-table-column label="接访下访次数" align="center" prop="packCaseNums" width="80"/>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                            v-hasPermi="['interview:cadre:edit']"
                        >修改
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.row)"
                            v-hasPermi="['interview:cadre:remove']"
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

            <!-- 添加或修改接访下访干部信息对话框 -->
            <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
                <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="干部姓名" prop="cadreName">
                                <el-input v-model.trim="form.cadreName" placeholder="请输入干部姓名" maxlength="50"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="干部机构名称" prop="unitName">
                                <el-input v-model.trim="form.unitName" placeholder="请输入干部机构名称"
                                          maxlength="150"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="干部职务" prop="cadreDuties">
                                <el-input v-model.trim="form.cadreDuties" placeholder="请输入干部职务" type="textarea"
                                          maxlength="150"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="领导级别" prop="cadreLevel">
                                <el-select v-model="form.cadreLevel" placeholder="请选择领导级别">
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
                            <el-form-item label="领导机构类别" prop="cadreUnitType">
                                <el-select v-model="form.cadreUnitType" placeholder="请选择领导机构类别">
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
                                <el-checkbox v-model="form.checked" :disabled="form.disabledChecked">复制到领导包案
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
        listCadre,
        getCadre,
        delCadre,
        addCadre,
        updateCadre,
        setStatus,
        setStatusIds
    } from "@/api/backstage/interview/cadre";

    export default {
        name: "Cadre",
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
                // 接访下访干部信息表格数据
                cadreList: [],
                // 弹出层标题
                title: "",
                // 是否显示弹出层
                open: false,
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    cadreLevel: "",
                    cadreUnitType: "",
                },
                // 多个id数据
                cadreIds: "",
                // 表单参数
                form: {},
                // 表单校验
                rules: {
                    cadreName: [
                        {required: true, message: "干部姓名不能为空", trigger: "blur"},
                    ],
                    unitName: [
                        {required: true, message: "干部机构名称不能为空", trigger: "blur"},
                    ],
                    cadreDuties: [
                        {required: true, message: "干部职务不能为空", trigger: "blur"},
                    ],
                    cadreLevel: [
                        {required: true, message: "干部级别不能为空", trigger: "blur"},
                    ],
                    cadreUnitType: [
                        {required: true, message: "干部机构类别不能为空", trigger: "blur"},
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
            /** 查询接访下访干部信息列表 */
            getList() {
                this.loading = true;
                listCadre(this.queryParams).then(response => {
                    this.cadreList = response.rows;
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
                this.resetForm("form");
                this.form = {
                    status: "0",
                    checked: false,
                };
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageNum = 1;
                this.getList();
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.queryParams.cadreLevel = "";
                this.queryParams.cadreUnitType = "";
                this.resetForm("queryForm");
                this.handleQuery();
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.cadreId);
                this.single = selection.length !== 1;
                this.multiple = !selection.length;
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.reset();
                this.open = true;
                this.form.disabledChecked = false;
                this.title = "添加接访下访干部信息";
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset();
                const cadreId = row.cadreId || this.ids;
                getCadre(cadreId).then(response => {
                    this.form = response.data;
                    this.open = true;
                    this.form.disabledChecked = true;
                    this.title = "修改接访下访干部信息";
                });
            },
            /** 提交按钮 */
            submitForm() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.cadreId != null) {
                            updateCadre(this.form).then(response => {
                                this.$modal.msgSuccess("修改成功");
                                this.open = false;
                                this.getList();
                            });
                        } else {
                            addCadre(this.form).then(response => {
                                this.$modal.msgSuccess("新增成功");
                                this.open = false;
                                this.getList();
                            });
                        }
                    }
                });
            },

            /** 设置为停用状态操作 */
            handleStatusIds(row) {
                const cadreIdsy = row.cadreId || this.ids;
                this.$modal.confirm('是否确认停用接访下访干部信息？').then(function () {
                    return setStatusIds(cadreIdsy);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("设置接访下访干部信息状态成功");
                }).catch(() => {
                });
            },

            /** 设置为启停用状态操作 */
            handleStatus(row) {
                const cadreIdst = row.cadreId || this.ids;
                let textStatus = row.status == 1 ? "启用" : "停用";
                this.$modal.confirm('是否确认' + textStatus + '接访下访干部信息？').then(function () {
                    return setStatus(cadreIdst);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("设置接访下访干部信息状态成功");
                }).catch(() => {
                });
            },
            /** 删除按钮操作 */
            handleDelete(row) {
                const cadreIds = row.cadreId || this.ids;
                this.$modal.confirm('是否确认删除接访下访干部信息？').then(function () {
                    return delCadre(cadreIds);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("删除成功");
                }).catch(() => {
                });
            },
            /** 导出按钮操作 */
            handleExport(row) {
                this.queryParams.cadreIds = row.cadreId || this.ids;
                this.download('interview/cadre/export', {
                    ...this.queryParams
                }, `接访下访干部信息_${new Date().getTime()}.xlsx`)
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

