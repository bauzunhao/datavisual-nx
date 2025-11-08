<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="110px"
                 @submit.native.prevent>
            <el-form-item label="单位名称" prop="joinUnitName">
                <el-input
                    v-model="queryParams.joinUnitName"
                    placeholder="请输入单位名称"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="单位属地" prop="zoneId">
                <el-cascader
                    v-model="queryParams.zoneId"
                    placeholder="请选择单位属地"
                    :props="zoneProps"
                    :options="zoneOptions"
                    :show-all-levels="false"
                    clearable
                    style="width: 180px"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                    type="primary"
                    plain
                    icon="el-icon-plus"
                    size="mini"
                    @click="handleAdd"
                    v-hasPermi="['leader:unit:add']"
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
                    v-hasPermi="['leader:petition:remove']"
                >删除
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning" plain
                    icon="el-icon-download"
                    size="mini"
                    @click="handleExport"
                    v-hasPermi="['leader:petition:export']"
                >导出
                </el-button>
            </el-col>
<!--            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
        </el-row>

        <el-table v-loading="loading" :data="unitList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column label="单位名称" align="center" prop="joinUnitName"/>
            <el-table-column label="单位联系人" align="center" prop="unitUser"/>
            <el-table-column label="联系电话" align="center" prop="phone"/>
            <el-table-column label="单位属地" align="center" prop="zoneName"/>
            <el-table-column label="状态" align="center" prop="status">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                        v-hasPermi="['leader:unit:edit']"
                    >修改
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['leader:unit:remove']"
                    >删除
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

        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="单位名称" prop="joinUnitName">
                    <el-input v-model.trim="form.joinUnitName" placeholder="请输入单位名称" maxlength="100"/>
                </el-form-item>
                <el-form-item label="单位联系人" prop="unitUser">
                    <el-input v-model.trim="form.unitUser" placeholder="请输入单位联系人" maxlength="100"/>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model.trim="form.phone" placeholder="请输入联系电话" maxlength="15"/>
                </el-form-item>
                <el-form-item label="单位属地" prop="zoneId">
                    <el-cascader
                        v-model="form.zoneId"
                        placeholder="请选择单位属地"
                        :props="zoneProps"
                        :options="zoneOptions"
                        :show-all-levels="false"
                        style="width: 300px"
                    />
                </el-form-item>
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

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {initZoneList} from "@/api/common/common";
    import {listUnit, getUnit, delUnit, addUnit, updateUnit, exportPost} from "@/api/backstage/leader/unit";

    export default {
        name: "Unit",
        dicts: ['sys_normal_disable'],
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
                // 包案参与单位信息表格数据
                unitList: [],
                // 弹出层标题
                title: "",
                // 是否显示弹出层
                open: false,
                zoneProps: {
                    label: "name",
                    value: "id",
                    checkStrictly: true,
                    emitPath: false,
                },
                zoneOptions: [],
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    joinUnitName: null,
                    unitUser: null,
                    phone: null,
                    zoneId: null,
                    zoneName: null,
                    status: undefined,
                },
                joinUnitIds: '',
                // 表单参数
                form: {},
                // 表单校验
                // 表单校验
                rules: {
                    joinUnitName: [
                        {required: true, message: "单位名称不能为空", trigger: "blur"},
                    ],
                    unitUser: [
                        {required: true, message: "单位联系人不能为空", trigger: "blur"}
                    ],
                    phone: [
                        {
                            required: true,
                            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                            message: "请输入正确的手机号码",
                            trigger: "blur"
                        }
                    ],
                    zoneId: [
                        {required: true, message: "单位属地不能为空", trigger: "blur"}
                    ],

                }
            };
        },
        created() {
            this.getList();
            this.initZone();
        },
        methods: {
            // 初始化行政区域
            initZone() {
                initZoneList({
                    id: process.env.VUE_APP_SUPER_ZONE_ID
                }).then(response => {
                    this.zoneOptions = [];
                    this.zoneOptions = response;
                });
            },
            /** 查询包案参与单位信息列表 */
            getList() {
                this.loading = true;
                listUnit(this.queryParams).then(response => {
                    this.unitList = response.rows;
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
                    status: "0",
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
                this.resetForm("queryForm");
                this.handleQuery();
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.joinUnitId)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.reset();
                this.open = true;
                this.title = "添加包案参与单位信息";
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset();
                const joinUnitId = row.joinUnitId || this.ids
                getUnit(joinUnitId).then(response => {
                    this.form = response.data;
                    this.open = true;
                    this.title = "修改包案参与单位信息";
                });
            },
            /** 提交按钮 */
            submitForm() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.joinUnitId != undefined) {
                            updateUnit(this.form).then(response => {
                                this.$modal.msgSuccess("修改成功");
                                this.open = false;
                                this.getList();
                            });
                        } else {
                            addUnit(this.form).then(response => {
                                this.$modal.msgSuccess("新增成功");
                                this.open = false;
                                this.getList();
                            });
                        }
                    }
                });
            },
            /** 删除按钮操作 */
            handleDelete(row) {
                const joinUnitIds = row.joinUnitId || this.ids;
                this.$modal.confirm('是否确认删除参与单位信息？').then(function () {
                    return delUnit(joinUnitIds);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("删除成功");
                }).catch(() => {
                });
            },

            /** 导出按钮操作 */
            handleExport(row) {
                this.queryParams.joinUnitIds = row.joinUnitId || this.ids;
                this.download('/leader/unit/exportId', {
                    ...this.queryParams
                }, `参与单位信息_${new Date().getTime()}.xlsx`)
            }
        }
    };
</script>
