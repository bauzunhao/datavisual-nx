<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
            <el-form-item label="姓名" prop="recvName">
                <el-input
                    v-model="queryParams.recvName"
                    placeholder="请输入接收人姓名"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="手机号码" prop="recvMobile">
                <el-input
                    v-model="queryParams.recvMobile"
                    placeholder="请输入接收人手机号码"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="单位名称" prop="recvUnitName">
                <el-input
                    v-model="queryParams.recvUnitName"
                    placeholder="请输入接收人单位名称"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="职务" prop="recvJob">
                <el-input
                    v-model="queryParams.recvJob"
                    placeholder="请输入接收人职务"
                    clearable
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
                    v-hasPermi="['sms:receiver:add']"
                >新增
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="success"
                    plain
                    icon="el-icon-edit"
                    size="mini"
                    :disabled="single"
                    @click="handleUpdate"
                    v-hasPermi="['sms:receiver:edit']"
                >修改
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
                    v-hasPermi="['sms:receiver:remove']"
                >删除
                </el-button>
            </el-col>
            <el-col v-if="false" :span="1.5">
                <el-button
                    type="warning"
                    plain
                    icon="el-icon-download"
                    size="mini"
                    @click="handleExport"
                    v-hasPermi="['sms:receiver:export']"
                >导出
                </el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="receiverList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column label="姓名" align="center" prop="recvName"/>
            <el-table-column label="手机号码" align="center" prop="recvMobile"/>
            <el-table-column label="单位名称" align="center" prop="recvUnitName"/>
            <el-table-column label="职务" align="center" prop="recvJob"/>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                        v-hasPermi="['sms:receiver:edit']"
                    >修改
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['sms:receiver:remove']"
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

        <el-form :model="templeteForm" ref="smsTempleteForm" :rules="rules" :inline="true" size="small" label-width="160px" style="margin-top: 10px">
            <el-row>
                <el-form-item label="联动指挥短信模板" prop="smsTemplete">
                    <el-input type="textarea" v-model="templeteForm.smsTemplete" style="width: 600px;" maxlength="200" show-word-limit :rows="6" placeholder="请输入联动指挥短信模板"/>
                </el-form-item>
                <el-tooltip class="item" effect="dark" placement="right-start">
                    <div slot="content">
                        支持变量列表如下：<br/>[xfr]：信访人<br/>[nrfl]：内容分类<br/>[xfddrxm]：信访调度人姓名
                    </div>
                    <i class="el-icon-question" style="color:#66B1FF; margin-right:2px;'"></i>
                </el-tooltip>
            </el-row>
            <el-row style="padding-left: 160px;">
                <el-form-item>
                    <el-button type="primary" size="big" @click="saveTemplete">保 存</el-button>
                </el-form-item>
            </el-row>
        </el-form>

        <!-- 添加或修改短信常见接收人对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="姓名" prop="recvName">
                    <el-input v-model.trim="form.recvName" maxlength="20" placeholder="请输入接收人姓名"/>
                </el-form-item>
                <el-form-item label="手机号码" prop="recvMobile">
                    <el-input v-model.trim="form.recvMobile" placeholder="请输入接收人手机号码"/>
                </el-form-item>
                <el-form-item label="单位名称" prop="recvUnitName">
                    <el-input v-model.trim="form.recvUnitName" maxlength="50" placeholder="请输入接收人单位名称"/>
                </el-form-item>
                <el-form-item label="职务" prop="recvJob">
                    <el-input v-model.trim="form.recvJob" maxlength="50" placeholder="请输入接收人职务"/>
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
import {
    listReceiver,
    getReceiver,
    delReceiver,
    addReceiver,
    updateReceiver,
    loadSmsTemplete,
    saveSmsTemplete
} from "@/api/backstage/linkage/sms";

export default {
    name: "Sms",
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
            // 短信常见接收人表格数据
            receiverList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                recvName: null,
                recvMobile: null,
                recvUnitName: null,
                recvJob: null,
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                recvName: [
                    {required: true, message: "短信接收人姓名不能为空", trigger: "blur"}
                ],
                recvMobile: [
                    {required: true, message: "短信接收人手机号码不能为空", trigger: "blur"},
                    {pattern: /^(?:\+?86)?1[3-9]\d{9}$/, message: "请输入正确的手机号码", trigger: "change"}
                ],
                recvUnitName: [
                    {required: true, message: "短信接收人单位名称不能为空", trigger: "blur"}
                ],
                recvJob: [
                    {required: true, message: "短信接收人职务不能为空", trigger: "blur"}
                ],
                smsTemplete: [
                    {required: true, message: "联动指挥短信模板内容不能为空", trigger: "blur"}
                ]
            },
            templeteForm: {
                smsTemplete: null
            }
        };
    },
    created() {
        this.getList();
        this.initSmsTemplete();
    },
    methods: {
        initSmsTemplete() {
            loadSmsTemplete().then(response => {
                if (response.data) {
                    this.templeteForm.smsTemplete = response.data;
                }
            });
        },
        /** 查询短信常见接收人列表 */
        getList() {
            this.loading = true;
            listReceiver(this.queryParams).then(response => {
                this.receiverList = response.rows;
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
                recvId: null,
                recvName: null,
                recvMobile: null,
                recvUnitName: null,
                recvJob: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null
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
            this.ids = selection.map(item => item.recvId);
            this.single = selection.length !== 1;
            this.multiple = !selection.length;
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "添加短信常见接收人";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const recvId = row.recvId || this.ids;
            getReceiver(recvId).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改短信常见接收人";
            });
        },
        /** 提交按钮 */
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.recvId != null) {
                        updateReceiver(this.form).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        addReceiver(this.form).then(response => {
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
            const recvIds = row.recvId || this.ids;
            this.$modal.confirm('是否确认删除短信常见接收人数据项？').then(function () {
                return delReceiver(recvIds);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {
            });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('system/receiver/export', {
                ...this.queryParams
            }, `常用短信接收人_${new Date().getTime()}.xlsx`)
        },
        // 保存短信模板
        saveTemplete() {
            this.$refs["smsTempleteForm"].validate(valid => {
                if (valid) {
                    saveSmsTemplete(this.templeteForm.smsTemplete).then(response => {
                        this.$modal.msgSuccess("保存成功");
                    });
                }
            });
        }
    }
};
</script>
