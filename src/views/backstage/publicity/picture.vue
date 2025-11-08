<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="上传时间" prop="educateTime">
                <el-date-picker
                    v-model="educateTime"
                    style="width: 240px"
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="图片名称" prop="videoImageName">
                <el-input
                    v-model="queryParams.videoImageName"
                    placeholder="请输入图片名称"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="图片类别" prop="informationCategory">
                <el-select v-model="queryParams.informationCategory" placeholder="请选择" clearable style="width: 240px">
                    <el-option
                        v-for="dict in dict.type.information_picture_category"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="简介内容" prop="videoImageProfile">
                <el-input
                    v-model="queryParams.videoImageProfile"
                    placeholder="请输入图片简介内容"
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
                    v-hasPermi="['publicity:picture:add']"
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
                    v-hasPermi="['publicity:picture:edit']"
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
                    v-hasPermi="['publicity:picture:remove']"
                >删除
                </el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="pictureResourcesList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column label="图片名称" align="center" prop="videoImageName" :show-overflow-tooltip="true"/>
            <el-table-column label="图片类别" align="center" prop="informationCategory">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.information_picture_category" :value="scope.row.informationCategory"/>
                </template>
            </el-table-column>
            <el-table-column label="图片简介" align="center" prop="videoImageProfile" :show-overflow-tooltip="true"/>
            <el-table-column label="图片预览" align="center" prop="videoImageUrl">
                <template slot-scope="scope">
                    <image-preview :src="scope.row.videoImageUrl" :width="50" :height="50"/>
                </template>
            </el-table-column>
            <el-table-column label="预览二维码" align="center" prop="videoImageUrl">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <qrcode-vue :value="getQRCode(scope.row.videoImageUrl)" :size="160" :level="'H'" :margin="0"/>
                        <div slot="reference" class="name-wrapper">
                            <qrcode-vue :value="getQRCode(scope.row.videoImageUrl)" :size="50" :level="'H'" :margin="0"/>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="是否展示大屏" align="center" prop="largeScreen" width="120px">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.largeScreen"/>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" prop="status" width="100px">
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
                        v-hasPermi="['publicity:picture:edit']"
                    >修改
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['publicity:picture:remove']"
                    >删除
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-setting"
                        @click="handleStatus(scope.row)"
                        v-hasPermi="['publicity:picture:status']"
                    >{{1 == scope.row.status ? '启用' : '停用'}}
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-setting"
                        @click="handleSetLargeScreen(scope.row)"
                        v-hasPermi="['publicity:picture:screen']"
                    >{{'Y' == scope.row.largeScreen ? '撤下大屏' : '选上大屏'}}
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

        <!-- 添加或修改视频图片资源对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="图片资料名称" prop="videoImageName">
                            <el-input v-model="form.videoImageName" placeholder="请输入图片资料名称"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="图片资料类别" prop="informationCategory">
                            <el-select v-model="form.informationCategory" placeholder="请选择图片资料类别">
                                <el-option
                                    v-for="dict in dict.type.information_picture_category"
                                    :key="dict.key"
                                    :label="dict.label"
                                    :value="dict.value">{{ dict.label }}
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="图片简介" prop="videoImageProfile">
                    <el-input type="textarea" style="resize: none;" :rows="10" v-model="form.videoImageProfile" maxlength="200" show-word-limit/>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="form.status">
                        <el-radio v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.value">{{dict.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="图片附件" prop="videoImageUrl">
                    <image-upload v-model="form.videoImageUrl" :limit="1"/>
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
    listPictureResources,
    getPictureResources,
    delPictureResources,
    addPictureResources,
    updatePictureResources,
    setPictureResourcesStatus,
    setPictureResourcesLargeScreen
} from "@/api/backstage/publicity/picture";
import {initNowDate} from "@/utils/index";
import QrcodeVue from "qrcode.vue";
import {isExternal} from "@/utils/validate";

export default {
    name: "PictureResources",
    dicts: ['sys_normal_disable', 'sys_yes_no', 'information_picture_category'],
    components: { QrcodeVue },
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
            // 视频图片资源表格数据
            pictureResourcesList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                videoImageUrl: null,
                videoAttachments: null,
                videoImageName: null,
                videoImageProfile: null,
                informationCategory: null,
                largeScreen: null,
                regular: null,
                status: null,
                type: 1,
            },
            educateTime: initNowDate(),
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                videoImageName: [
                    {required: true, message: "图片资料名称不能为空", trigger: "blur"}
                ],
                informationCategory: [
                    {required: true, message: "请选择图片资料类别", trigger: "change"}
                ],
                status: [
                    {required: true, message: "图片资料状态不能为空", trigger: "blur"}
                ],
                videoImageUrl: [
                    {required: true, message: "图片附件不能为空", trigger: "blur"}
                ]
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getQRCode(src) {
            if (!src) {
                return;
            }
            let real_src = src.split(",")[0];
            if (isExternal(real_src)) {
                return real_src;
            }
            return window.location.origin + process.env.VUE_APP_BASE_API + real_src;
        },
        /** 查询视频图片资源列表 */
        getList() {
            this.loading = true;
            listPictureResources(this.addDateRange(this.queryParams, this.educateTime)).then(response => {
                this.pictureResourcesList = response.rows;
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
                videoImageId: null,
                videoImageUrl: null,
                videoAttachments: null,
                videoImageName: null,
                videoImageProfile: null,
                informationCategory: null,
                largeScreen: null,
                regular: null,
                status: "0",
                type: 1,
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
            this.educateTime = initNowDate();
            this.resetForm("queryForm");
            this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.videoImageId);
            this.single = selection.length !== 1;
            this.multiple = !selection.length;
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "添加图片资源";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const videoImageId = row.videoImageId || this.ids;
            getPictureResources(videoImageId).then(response => {
                this.form = response.data;
                this.form.status += "";
                this.open = true;
                this.title = "修改图片资源";
            });
        },
        /** 提交按钮 */
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.videoImageId != null) {
                        updatePictureResources(this.form).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        addPictureResources(this.form).then(response => {
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
            const videoImageIds = row.videoImageId || this.ids;
            this.$modal.confirm('确认删除图片资源数据项？').then(function () {
                return delPictureResources(videoImageIds);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {
            });
        },
        /** 设置为启停用状态操作 */
        handleStatus(row) {
            const videoImageIds = row.videoImageId || this.ids;
            this.$modal.confirm('是否确认设置图片资源状态？').then(function () {
                return setPictureResourcesStatus(videoImageIds);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("设置图片资源状态成功");
            }).catch(() => {
            });
        },
        /** 设置为上下大屏操作 */
        handleSetLargeScreen(row) {
            const videoImageIds = row.videoImageId || this.ids;
            this.$modal.confirm('是否对图片资源上下大屏进行设置？').then(function () {
                return setPictureResourcesLargeScreen(videoImageIds);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("设置图片资源上下大屏成功");
            }).catch(() => {
            });
        }
    }
};
</script>
