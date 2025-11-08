<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="用户名称" prop="name">
                <el-input
                    v-model="queryParams.name"
                    placeholder="请输入用户名称"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input
                    v-model="queryParams.account"
                    placeholder="请输入账号"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
                <el-input
                    v-model="queryParams.mobile"
                    placeholder="请输入手机号码"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="网格社区" prop="communityId">
                <el-select v-model="queryParams.communityId" clearable filterable placeholder="请选择网格社区">
                    <el-option
                        v-for="community in communityList"
                        :key="community.id"
                        :label="community.name"
                        :value="community.id">{{ community.name }}
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="属地" prop="zoneId">
                <el-cascader
                    v-model="queryParams.zoneId"
                    placeholder="请选择单位属地"
                    :props="zoneProps"
                    :options="zoneOptions"
                    clearable
                    style="width: 215px"
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
                    v-hasPermi="['grid:user:add']"
                >新增</el-button>
            </el-col>
        </el-row>
        <el-table v-loading="loading" :data="userList">
            <el-table-column label="用户名称" align="center" prop="name" />
            <el-table-column label="账号" align="center" prop="account" />
            <el-table-column label="手机号码" align="center" prop="mobile" />
            <el-table-column label="网格社区" align="center" prop="communityName" />
            <el-table-column label="网格属地" align="center" prop="zoneName" />
            <el-table-column label="状态" align="center" prop="status" >
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
                        v-hasPermi="['grid:user:edit']"
                    >修改</el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-setting"
                        @click="handleStatus(scope.row)"
                        v-hasPermi="['grid:user:status']"
                    >{{ 1 == scope.row.status ? '启用' : '停用' }}
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['grid:user:remove']"
                    >删除</el-button>
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

        <!-- 添加或修改网格用户对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户名称" prop="name">
                            <el-input v-model="form.name" placeholder="请输入用户名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="网格社区" prop="communityId">
                            <el-select v-model="form.communityId" clearable filterable placeholder="请选择网格社区">
                                <el-option
                                    v-for="community in communityList"
                                    :key="community.id"
                                    :label="community.name"
                                    :value="community.id">{{ community.name }}
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="账号" prop="account" v-if="form.id == undefined">
                            <el-input v-model="form.account" placeholder="请输入账号" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户密码" prop="password" v-if="form.id == undefined">
                            <el-input v-model="form.password" placeholder="请输入密码" type="password" maxlength="20" show-password/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号码" prop="mobile">
                            <el-input v-model="form.mobile" placeholder="请输入手机号码" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态">
                            <el-radio-group v-model="form.status">
                                <el-radio
                                    v-for="dict in dict.type.sys_normal_disable"
                                    :key="dict.value"
                                    :label="dict.value"
                                >{{dict.label}}</el-radio>
                            </el-radio-group>
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
    import { listUser, getUser, delUser, addUser, updateUser,setStatus } from "@/api/backstage/grid/user";
    import { allList} from "@/api/backstage/grid/community";
    import {initZoneList} from "@/api/common/common";
    export default {
        name: "GridUser",
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
                // 网格用户表格数据
                userList: [],
                // 弹出层标题
                title: "",
                // 是否显示弹出层
                open: false,
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    name: null,
                    account: null,
                    mobile: null,
                    communityId: null,
                    status: null,
                    zoneId:null,
                },
                //网格社区数据
                communityList:[],
                // 查询网格社区参数
                queryCommunityParams: {
                    pageNum: 1,
                    pageSize: 10,
                },
                zoneProps: {
                    label: "name",
                    value: "id",
                    emitPath: false,
                },
                zoneOptions: [],
                //增加或修改操作属地下拉框
                zoneOperateOptions: [],
                // 表单参数
                form: {
                    status: "0"
                },
                // 表单校验
                rules: {
                    name: [
                        { required: true, message: "用户名称不能为空", trigger: "blur" }
                    ],
                    communityId: [
                        { required: true, message: "网格社区不能为空", trigger: "blur" }
                    ],
                    account: [
                        { required: true, message: "用户账号不能为空", trigger: "blur" },
                        { min: 2, max: 20, message: '用户账号长度必须介于 2 和 20 之间', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: "用户密码不能为空", trigger: "blur" },
                        { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: "手机号不能为空", trigger: "blur" },
                        {
                            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                            message: "请输入正确的手机号码",
                            trigger: "blur"
                        }
                    ],
                }
            };
        },
        created() {
            this.initZone();
            this.getList();
            this.getCommunityList();
        },
        methods: {
            // 初始化行政区域
            initZone() {
                initZoneList({id: process.env.VUE_APP_ZONE_ID,depth:2}).then(response => {
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
            /** 查询网格用户列表 */
            getList() {
                this.loading = true;
                listUser(this.queryParams).then(response => {
                    this.userList = response.rows;
                    this.total = response.total;
                    this.loading = false;
                });
            },
            getCommunityList() {
                allList(this.queryCommunityParams).then(response => {
                    this.communityList = response.rows;
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
                    name: null,
                    account: null,
                    mobile: null,
                    communityId: null,
                    userId: null,
                    status: "0",
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
            /** 新增按钮操作 */
            handleAdd() {
                this.reset();
                this.open = true;
                this.title = "添加网格用户";
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset();
                const id = row.id || this.ids;
                getUser(id).then(response => {
                    this.form = response.data;
                    this.form.status+="";
                    this.open = true;
                    this.title = "修改网格用户";
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
                this.$modal.confirm('是否确认删除网格用户数据项？').then(function() {
                    return delUser(ids);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("删除成功");
                }).catch(() => {});
            },
            /** 设置为启停用状态操作 */
            handleStatus(row) {
                const ids = row.id || this.ids;
                let textStatus = row.status == 1 ? "启用" : "停用";
                this.$modal.confirm('是否确认' + textStatus + '改网格用户？').then(function () {
                    return setStatus(ids);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess(textStatus+"状态成功");
                }).catch(() => {
                });
            },


        }
    };
</script>
