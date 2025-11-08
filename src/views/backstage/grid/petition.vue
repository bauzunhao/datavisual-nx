<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="用户名" prop="username">
                <el-input
                    v-model="queryParams.username"
                    placeholder="请输入用户名"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="姓名" prop="realname">
                <el-input
                    v-model="queryParams.realname"
                    placeholder="请输入真实姓名"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input
                    v-model="queryParams.mobile"
                    placeholder="请输入手机号"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="地址" prop="contactAddress">
                <el-input
                    v-model="queryParams.contactAddress"
                    placeholder="请输入联系地址"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="证件号码" prop="certificateNumber">
                <el-input
                    v-model="queryParams.certificateNumber"
                    placeholder="请输入身份证号码"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
            <el-table-column label="用户名" align="center" prop="username"/>
            <el-table-column label="真实姓名" align="center" prop="realname"/>
            <el-table-column label="手机号" align="center" prop="mobile"/>
            <el-table-column label="性别" align="center" prop="sex">
                <template slot-scope="scope">{{sexList[scope.row.sex]}}</template>
            </el-table-column>
            <el-table-column label="联系地址" align="center" prop="contactAddress"/>
            <el-table-column label="身份证号码" align="center" prop="certificateNumber"/>
            <el-table-column label="证件正反面" align="center" prop="certificateFrontal">
                <template slot-scope="scope">
                    <image-preview v-if="scope.row.certificateFrontal" :src="scope.row.certificateFrontal" :width="50" :height="50"/>
                    <image-preview v-if="scope.row.certificateReverse" :src="scope.row.certificateReverse" :width="50" :height="50"/>
                </template>
            </el-table-column>
<!--            <el-table-column label="证件附件反面" align="center" prop="certificateReverse">
                <template slot-scope="scope">

                </template>
            </el-table-column>-->
            <el-table-column label="实名认证状态" align="center" prop="checkType">
                <template slot-scope="scope">{{checkTypeList[scope.row.checkType]}}</template>
            </el-table-column>
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
                        icon="el-icon-setting"
                        @click="handleStatus(scope.row)"
                        v-hasPermi="['petition:user:status']"
                    >{{1 == scope.row.status ? '启用' : '禁用'}}
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-setting"
                        @click="handleAuth(scope.row, 1)"
                        v-if="0 === scope.row.checkType"
                        v-hasPermi="['petition:user:auth']"
                    >实名认证通过
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-setting"
                        @click="handleAuth(scope.row, 2)"
                        v-if="0 === scope.row.checkType"
                        v-hasPermi="['petition:user:auth']"
                    >实名认证不通过
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

        <!-- 添加或修改网格信访用户对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码"/>
                </el-form-item>
                <el-form-item label="真实姓名" prop="realname">
                    <el-input v-model="form.realname" placeholder="请输入真实姓名"/>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="form.mobile" placeholder="请输入手机号"/>
                </el-form-item>
                <el-form-item label="联系地址" prop="contactAddress">
                    <el-input v-model="form.contactAddress" placeholder="请输入联系地址"/>
                </el-form-item>
                <el-form-item label="身份证号码" prop="certificateNumber">
                    <el-input v-model="form.certificateNumber" placeholder="请输入身份证号码"/>
                </el-form-item>
                <el-form-item label="证件附件正面" prop="certificateFrontal">
                    <el-input v-model="form.certificateFrontal" placeholder="请输入证件附件正面"/>
                </el-form-item>
                <el-form-item label="证件附件反面" prop="certificateReverse">
                    <el-input v-model="form.certificateReverse" placeholder="请输入证件附件反面"/>
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
import {listUser, getUser, delUser, addUser, updateUser, setStatus, setAuth} from "@/api/backstage/grid/petition";

export default {
    name: "GridPetitionUser",
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
            // 网格信访用户表格数据
            userList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                username: null,
                password: null,
                realname: null,
                mobile: null,
                sex: null,
                contactAddress: null,
                certificateNumber: null,
                certificateFrontal: null,
                certificateReverse: null,
                checkType: null,
                status: null,
            },
            sexList: ["未知", "男", "女"],
            checkTypeList: ["待认证", "认证通过", "认证未通过"],
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
        /** 查询网格信访用户列表 */
        getList() {
            this.loading = true;
            listUser(this.queryParams).then(response => {
                this.userList = response.rows;
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
                username: null,
                password: null,
                realname: null,
                mobile: null,
                sex: null,
                contactAddress: null,
                certificateNumber: null,
                certificateFrontal: null,
                certificateReverse: null,
                checkType: null,
                status: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
                remark: null
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
            this.title = "添加网格信访用户";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const id = row.id || this.ids;
            getUser(id).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改网格信访用户";
            });
        },
        /** 提交按钮 */
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != null) {
                        updateUser(this.form).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        addUser(this.form).then(response => {
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
            this.$modal.confirm('是否确认删除网格信访用户编号为"' + ids + '"的数据项？').then(function () {
                return delUser(ids);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {
            });
        },
        /** 导出按钮操作 */
        handleExport() {
            this.download('system/user/export', {
                ...this.queryParams
            }, `user_${new Date().getTime()}.xlsx`)
        },
        /** 设置为启停用状态操作 */
        handleStatus(row) {
            const id = row.id;
            this.$modal.confirm('是否确认设置网格信访用户状态？').then(function () {
                return setStatus(id);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("设置网格信访用户状态成功");
            }).catch(() => {
            });
        },
        /** 实名认证操作 */
        handleAuth(row, checkType) {
            const id = row.id;
            let data = {
                id: id,
                checkType: checkType
            }
            this.$modal.confirm('是否确认设置网格信访用户实名认证状态？').then(function () {
                return setAuth(data);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("设置网格信访用户实名认证状态成功");
            }).catch(() => {
            });
        }
    }
};
</script>
