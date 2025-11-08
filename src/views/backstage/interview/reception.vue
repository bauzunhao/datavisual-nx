<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="110px"
                 @submit.native.prevent>
            <el-form-item label="单位名称" prop="flatsName">
                <el-input
                    v-model="queryParams.flatsName"
                    placeholder="请输入单位名称"
                    clearable
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
                    v-hasPermi="['interview:reception:add']"
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
                    v-hasPermi="['interview:reception:remove']"
                >删除
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning" plain
                    icon="el-icon-download"
                    size="mini"
                    @click="handleExport"
                    v-hasPermi="['interview:reception:export']"
                >导出
                </el-button>
            </el-col>
            <!--      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
        </el-row>

        <el-table v-loading="loading" :data="interviewList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column label="单位名称" align="center" prop="flatsName"/>
            <el-table-column label="详细接待地址" align="center" prop="zoneNameAddress"/>
            <el-table-column label="领导接待频率（周/月）" align="center" prop="servedFrequency">
                <template slot-scope="scope">
                    {{(scope.row.servedFrequency == "month" ? "每月" : "每周") + " / "+ scope.row.weekDate}}
                </template>
            </el-table-column>
            <el-table-column label="接待时间" align="center" prop="visitsTime" width="180"/>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                        v-hasPermi="['interview:reception:edit']"
                    >修改
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['interview:reception:remove']"
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

        <!-- 添加或修改领导接待日信息对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="单位名称" prop="flatsName">
                            <el-input v-model.trim="form.flatsName" placeholder="请输入单位名称" maxlength="100"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属地" prop="zoneId">
                            <el-select v-model="form.zoneId" placeholder="请选择所属地" clearable>
                                <el-option
                                    v-for="item in zoneOperateOptions"
                                    :label="item.name"
                                    :value="item.id"
                                    :key="item.id"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form prop="servedName">
                            <el-input v-model.trim="form.servedName" placeholder="请输入详细地址" maxlength="250"/>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="接待频率 周/月" prop="servedFrequency">
                            <el-select v-model="form.servedFrequency" placeholder="请选择 周/月" @change="handleChange">
                                <el-option label="每月" value="month"/>
                                <el-option label="每周" value="week"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="星期/日期" prop="weekDate">
                            <el-select v-model="form.weekDate" placeholder="请选择 星期/日期">
                                <el-option v-for="item in symbolOptions[form.servedFrequency]"
                                           :label="item.symbolName"
                                           :value="item.symbolValue"
                                           :key="item.symbolValue"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="接待时间" prop="dateRange">
                            <el-time-picker
                                is-range
                                :clearable="false"
                                v-model="dateRange"
                                range-separator="至"
                                format="HH:mm" value-format="HH:mm"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="接待时间">
                            </el-time-picker>
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
</template>

<script>
    import {
        listInterview,
        getInterview,
        delInterview,
        addInterview,
        updateInterview
    } from "@/api/backstage/interview/reception";
    import {initHouseTime} from "@/utils/index";
    import {initZoneList} from "@/api/common/common";

    export default {
        name: "Reception",
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
                // 领导接待日信息表格数据
                interviewList: [],
                // 弹出层标题
                title: "",
                zoneProps: {
                    label: "name",
                    value: "id",
                    checkStrictly: true,
                    emitPath: false,
                },
                zoneOptions: [],
                //增加或修改操作属地下拉框
                zoneOperateOptions: [],
                // 是否显示弹出层
                open: false,
                // 选择日期符号数据
                symbolOptions: {
                    month: [],
                    week: [
                        {symbolName: "周一", symbolValue: "周一"},
                        {symbolName: "周二", symbolValue: "周二"},
                        {symbolName: "周三", symbolValue: "周三"},
                        {symbolName: "周四", symbolValue: "周四"},
                        {symbolName: "周五", symbolValue: "周五"},
                        {symbolName: "周六", symbolValue: "周六"},
                        {symbolName: "周日", symbolValue: "周日"}
                    ],
                },
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    flatsName: null,
                    zoneId: "",
                },

                servedIds: "",
                dateRange: initHouseTime(),
                // 表单参数
                form: {},
                // 表单校验
                rules: {
                    flatsName: [
                        {required: true, message: "单位名称不能为空", trigger: "blur"},
                    ],
                    zoneId: [
                        {required: true, message: "单位属地名称不能为空", trigger: "blur"},
                    ],
                    servedFrequency: [
                        {required: true, message: "请选择 周/月", trigger: "blur"},
                    ],
                    weekDate: [
                        {required: true, message: "请选择 星期/日期", trigger: "blur"},
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
                initZoneList({id: process.env.VUE_APP_ZONE_ID}).then(response => {
                    this.zoneOperateOptions = [];
                    this.zoneOptions = [];
                    if (response) {
                        response.forEach(obj => {
                            this.zoneOperateOptions.push({
                                id: obj.id,
                                name: obj.name,
                                parentId: obj.parentId,
                                children: null
                            })
                            this.zoneOperateOptions = this.zoneOperateOptions.concat(obj.children);
                        })
                    }
                    this.zoneOptions = response;
                })
            },
            /** 查询领导接待日信息列表 */
            getList() {
                this.loading = true;
                listInterview(this.queryParams).then(response => {
                    this.interviewList = response.rows;
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
                    servedFrequency: null,
                    weekDate: null
                };
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageNum = 1;
                this.getList();
            },

            /** 分类二级 */
            handleChange() {
                this.symbolOptions.month = []
                for (var i = 1; i <= 31; i++) {
                    this.symbolOptions.month.push({symbolValue: i, symbolName: i + "日"});
                }
                this.form.weekDate = ""
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.resetForm("queryForm");
                this.handleQuery();
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.servedId);
                this.single = selection.length !== 1;
                this.multiple = !selection.length;
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.reset();
                this.dateRange = initHouseTime();
                this.open = true;
                this.title = "添加领导接待日信息";
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset();
                const servedId = row.servedId || this.ids;
                getInterview(servedId).then(response => {
                    this.form = response.data;
                    if (this.form.originateTime && this.form.finishesTime) {
                        this.dateRange = [this.form.originateTime, this.form.finishesTime];
                    } else {
                        this.dateRange = initHouseTime();
                    }
                    this.open = true;
                    this.title = "修改领导接待日信息";
                });
            },
            /** 提交按钮 */
            submitForm() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.servedId != null) {
                            updateInterview(this.addDateRange(this.form, this.dateRange)).then(response => {
                                this.$modal.msgSuccess("修改成功");
                                this.open = false;
                                this.getList();
                            });
                        } else {
                            addInterview(this.addDateRange(this.form, this.dateRange)).then(response => {
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
                const servedIds = row.servedId || this.ids;
                this.$modal.confirm('是否确认删除领导接待日信息？').then(function () {
                    return delInterview(servedIds);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("删除成功");
                }).catch(() => {
                });
            },
            /** 导出按钮操作 */
            handleExport(row) {
                this.queryParams.servedIds = row.servedId || this.ids;
                this.download('interview/reception/export', {
                    ...this.queryParams
                }, `领导接待日信息_${new Date().getTime()}.xlsx`)
            },
        }
    };
</script>
