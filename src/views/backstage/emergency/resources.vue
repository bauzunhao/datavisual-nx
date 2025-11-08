<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px" @submit.native.prevent>
      <el-form-item label="流程名称" prop="resourceName">
        <el-input
          v-model="queryParams.resourceName"
          placeholder="请输入流程名称"
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
          v-hasPermi="['emergency:resources:add']"
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
          v-hasPermi="['emergency:resources:edit']"
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
          v-hasPermi="['emergency:resources:remove']"
        >删除
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="风险资源码" align="center" prop="resourceId"/>
      <el-table-column label="风险资源名称" align="center" prop="resourceName"/>
      <el-table-column label="风险资源文件" align="center" prop="resourceFile">
        <template slot-scope="scope">
          <image-preview :src="scope.row.resourceFile" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['emergency:resources:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['emergency:resources:remove']"
          >删除
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-setting"
            @click="handleSetDefault(scope.row)"
            v-if="0 == scope.row.defaultStatus"
            v-hasPermi="['emergency:resources:default']"
          >设为默认资源
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
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <el-form-item label="风险资源名称" maxlength="100" prop="resourceName">
          <el-input v-model.trim="form.resourceName" placeholder="请输入风险资源名称"/>
        </el-form-item>
        <el-form-item label="风险资源文件" prop="resourceFile">
          <el-upload
            v-model="form.resourceFile"
            ref="upload"
            :limit="1"
            accept=".jpg, .png"
            :action="upload.url"
            :headers="upload.headers"
            :file-list="upload.fileList"
            :before-upload="handleFileUploadBefore"
            :on-progress="handleFileUploadProgress"
            :on-success="handleFileSuccess"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" :loading="upload.isUploading" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
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
    import { getToken } from "@/utils/auth";
    import {listResources, getResources, delResources, addResources, updateResources, setDefaultResources} from "@/api/backstage/emergency/resources";

    export default {
        name: "Resources",
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
                // 表格数据
                tableList: [],
                // 弹出层标题
                title: "",
                // 是否显示弹出层
                open: false,
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    resourceName: undefined
                },
                // 上传参数
                upload: {
                    // 是否禁用上传
                    isUploading: false,
                    // 设置上传的请求头部
                    headers: { Authorization: "Bearer " + getToken() },
                    // 上传的地址
                    url: process.env.VUE_APP_BASE_API + "/common/upload",
                    // 上传的文件列表
                    fileList: []
                },
                // 表单参数
                form: {},
                // 表单校验
                rules: {
                    resourceName: [
                        {required: true, message: "风险资源名称不能为空", trigger: "blur"}
                    ],
                    resourceFile: [
                        {required: true, message: "请选择风险资源文件并将上传至服务器", trigger: "blur"}
                    ]
                }
            };
        },
        created() {
            this.getList();
        },
        methods: {
            /** 查询列表 */
            getList() {
                this.loading = true;
                listResources(this.queryParams).then(response => {
                    this.tableList = response.rows;
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
                    resourceId: undefined,
                    resourceName: undefined,
                    resourceFile: undefined
                };
                this.upload.fileList = [];
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
                this.ids = selection.map(item => item.resourceId);
                this.single = selection.length != 1;
                this.multiple = !selection.length;
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.reset();
                this.open = true;
                this.title = "添加风险资源";
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset();
                const resourceId = row.resourceId || this.ids;
                getResources(resourceId).then(response => {
                    this.form = response.data;
                    var filePath = this.form.resourceFile;
                    if (filePath) {
                        const fileName = new URL(filePath).pathname.split('/').pop();
                        this.upload.fileList = [{ name: fileName, url: filePath }];
                    }
                    this.open = true;
                    this.title = "修改风险资源";
                });
            },
            // 文件提交处理
            submitUpload() {
                this.$refs.upload.submit();
            },
            // 文件上传前处理
            handleFileUploadBefore(file) {
                const isImage = 'image/jpeg' === file.type || 'image/png' === file.type;
                if (!isImage) {
                    this.$message.error('只能上传是 JPG / PNG 格式文件!');
                }
                return isImage;
            },
            // 文件上传中处理
            handleFileUploadProgress(event, file, fileList) {
                this.upload.isUploading = true;
            },
            // 文件上传成功处理
            handleFileSuccess(response, file, fileList) {
                this.upload.isUploading = false;
                this.form.filePath = response.url;
                this.form.resourceFile = this.form.filePath;
                this.$modal.msgSuccess(response.msg);
            },
            /** 提交按钮 */
            submitForm: function () {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.resourceId != undefined) {
                            updateResources(this.form).then(response => {
                                this.$modal.msgSuccess("修改成功");
                                this.open = false;
                                this.getList();
                            });
                        } else {
                            addResources(this.form).then(response => {
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
                const resourceIds = row.resourceId || this.ids;
                this.$modal.confirm('是否确认删除风险资源？').then(function () {
                    return delResources(resourceIds);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("删除成功");
                }).catch(() => {
                });
            },
            /** 设置为默认流程操作 */
            handleSetDefault(row) {
                const resourceId = row.resourceId;
                this.$modal.confirm('是否确认设为默认风险资源？').then(function () {
                    return setDefaultResources(resourceId);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("设置为默认风险资源成功");
                }).catch(() => {
                });
            }
        }
    };
</script>
