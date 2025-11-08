<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="手机号码" prop="mobiles">
                <el-input
                    v-model="queryParams.mobiles"
                    placeholder="请输入接收手机号码"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="姓名" prop="recvName">
                <el-input
                    v-model="queryParams.recvName"
                    placeholder="请输入接收人姓名"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="短信内容" prop="content">
                <el-input
                    v-model="queryParams.content"
                    placeholder="请输入短信内容"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="recordList" @selection-change="handleSelectionChange">
            <el-table-column label="接收人姓名" align="center" width="200" prop="recvName" show-overflow-tooltip/>
            <el-table-column label="接收手机号码" align="center" width="200" prop="mobiles" show-overflow-tooltip/>
            <el-table-column label="短信内容" prop="content" show-overflow-tooltip/>
            <el-table-column label="发送时间" align="center" prop="createTime" width="180">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="发送状态" align="center" prop="status" width="200">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.remark" placement="left">
                        <span>{{ 1 === scope.row.status ? "发送成功" : "发送失败" }}</span>
                    </el-tooltip>
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

        <!-- 添加或修改短信发送记录对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="短信内容">
                    <editor v-model="form.content" :min-height="192"/>
                </el-form-item>
                <el-form-item label="接收手机号码" prop="mobiles">
                    <el-input v-model="form.mobiles" placeholder="请输入接收手机号码"/>
                </el-form-item>
                <el-form-item label="接收人姓名" prop="recvName">
                    <el-input v-model="form.recvName" type="textarea" placeholder="请输入内容"/>
                </el-form-item>
                <el-form-item label="业务ID，预留" prop="recId">
                    <el-input v-model="form.recId" placeholder="请输入业务ID，预留"/>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
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
import {listRecord, getRecord, delRecord, addRecord, updateRecord} from "@/api/system/sms";

export default {
    name: "Record",
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
            // 短信发送记录表格数据
            recordList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                content: null,
                mobiles: null,
                recvName: null,
                recvType: null,
                status: null,
                recId: null,
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {}
        };
    },
    created() {
        this.getList();
    },
    methods: {
        /** 查询短信发送记录列表 */
        getList() {
            this.loading = true;
            listRecord(this.queryParams).then(response => {
                this.recordList = response.rows;
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
                id: null,
                content: null,
                mobiles: null,
                recvName: null,
                recvType: null,
                status: null,
                recId: null,
                remark: null,
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
            this.ids = selection.map(item => item.id);
            this.single = selection.length !== 1;
            this.multiple = !selection.length;
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "添加短信发送记录";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const id = row.id || this.ids;
            getRecord(id).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改短信发送记录";
            });
        },
        /** 提交按钮 */
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != null) {
                        updateRecord(this.form).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        addRecord(this.form).then(response => {
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
            const ids = row.id || this.ids;
            this.$modal.confirm('是否确认删除短信发送记录编号为"' + ids + '"的数据项？').then(function () {
                return delRecord(ids);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {
            });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('system/sms/record/export', {
                ...this.queryParams
            }, `系统短信记录表_${new Date().getTime()}.xlsx`)
        }
    }
};
</script>
