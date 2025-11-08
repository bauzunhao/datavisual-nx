<template>
    <div class="app-container">
        <!-- 两个按钮，用于切换类型 -->
        <el-button class='el-buttons'  type="primary" @click="filterByType(0)">视频资源</el-button>
        <el-button class='el-buttons'  @click="filterByType(1)">图片资源</el-button>

        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="68px">
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
            <el-form-item label="资料类型" class="flexstart" prop="informationCategory">
                <el-select v-model="queryParams.informationCategory" placeholder="请选择">
                    <el-option
                        v-for="dict in dict.type.information_category"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资料名称" prop="videoImageName">
                <el-input
                    v-model="queryParams.videoImageName"
                    placeholder="请输入视频图片资料名称"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="简介内容" prop="videoImageName">
                <el-input
                    v-model="queryParams.videoImageProfile"
                    placeholder="请输入视频图片简介内容"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="是否展示" class="flexstart" prop="largeScreen">
                <el-select v-model="queryParams.largeScreen" placeholder="请选择">
                    <el-option
                        v-for="dict in dict.type.sys_yes_no"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                    type="primary"
                    plain
                    :disabled="multiple"
                    icon="el-icon-setting"
                    size="mini"
                    @click="educateSetting"
                    v-hasPermi="['publicity:educate:edit']"
                >大屏展示设置
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="danger"
                    plain
                    :disabled="multiple"
                    icon="el-icon-delete"
                    size="mini"
                    @click="educateAll"
                >取消展示
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
                    v-hasPermi="['publicity:educate:status']"
                >停用
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
                    v-hasPermi="['publicity:educate:remove']"
                >删除
                </el-button>
            </el-col>
            <el-col :span="1.5" style="float: right">
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-col>
            <el-col :span="1.5" style="float: right">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            </el-col>
        </el-row>

        <el-table v-loading="loading" :data="resourcesList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column label="视图" align="center" prop="videoImageUrl" width="100">
                <template slot-scope="scope">
                    <image-preview :src="scope.row.videoImageUrl" :width="50" :height="50"/>
                </template>
            </el-table-column>
            <el-table-column :label="idLabel" align="center" prop="videoImageName" width="100"/>
            <el-table-column :label="nameLabel" align="center" prop="videoImageProfile" width="130"
                             :show-overflow-tooltip="true"/>
            <el-table-column label="资料类别" align="center" prop="informationCategory" width="90">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.information_category" :value="scope.row.informationCategory"/>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" prop="status" width="70px">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="是否展示" align="center" prop="largeScreen" width="85">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.largeScreen"/>
                </template>
            </el-table-column>
            <el-table-column label="二维码" align="center" prop="videoImageCode" width="100"/>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                        v-hasPermi="['publicity:educate:edit']"
                    >修改
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['publicity:educate:remove']"
                    >删除
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-setting"
                        @click="educateAll(scope.row)"
                        v-hasPermi="['publicity:educate:status']"
                    >取消展示
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-setting"
                        @click="handleStatus(scope.row)"
                        v-hasPermi="['publicity:educate:status']"
                    >{{ 1 == scope.row.status ? '启用' : '停用' }}
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-thumb"
                        @click="handleQRCode(scope.row)"
                        v-hasPermi="['publicity:educate:add']"
                    >生成二维码
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

        <!-- 添加或修改大屏照片设置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
            <el-form label-width="90px">
                <el-form-item label="大屏设置">
                    <!--                    <span style="color: red;font-size: 14px">注: 大屏视频选择不能超过11张</span>-->
                    <div class="demo-image__placeholder">
                        <div style="display:inline;padding: 10px" v-for="img in checketImgList" :key="img.videoImageId">
                            <div style="width: 150px; height: 150px" class="el-image">
                                <img :src="videoUpload.url2 + img" class="el-image__inner"
                                     style="object-fit: fill;"/>
                            </div>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitSetting">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    listResources,
    delResources,
    setStatusIds,
    setStatus,
    getResourcesIds,
    setVideoImgSetting,
    setVideoImgSet
} from "@/api/backstage/publicity/educate";
import {initNowDate} from "@/utils/index";
import {getToken} from "@/utils/auth";

export default {
    dicts: ['sys_normal_disable', 'information_category', 'sys_yes_no'],
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
            // 弹出层标题
            title: "",
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                videoImageUrl: null,
                videoAttachments: null,
                videoImageName: null,
                videoImageProfile: null,
                videoImageCode: null,
                informationCategory: "",
                largeScreen: null,
                regular: null,
                status: null,
                type: null,
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {},
            // 时间
            educateTime: initNowDate(),
            // 内容切换
            number: 0, //点击后的值，与下标同步，为0表示默认第一个按钮与div为选中状态
            dataList: [
                {option: '视频资料'},
                {option: '图片资料'},
            ],
            checketImgList: [],  //图片
            // 是否显示弹出层
            open: false,
            //拿到当前环境的请求前缀
            videoUpload: {
                url2: process.env.VUE_APP_BASE_API
            },
            allData: [], // 存储从数据库获取的所有数据
            // 存储筛选后的视频图片资源表格数据
            resourcesList: [],
            currentType: 0,
            loadingTwo:false,
            labels: {
                animal: {
                    idLabel: '视频资料名称',
                    nameLabel: '视频资料简介'
                },
                plant: {
                    idLabel: '图片资料名称',
                    nameLabel: '图片资料简介'
                }
            },
        };
    },
    computed: {
        idLabel() {
            return this.labels[this.currentType === 0 ? 'animal' : 'plant'].idLabel;
        },
        nameLabel() {
            return this.labels[this.currentType === 0 ? 'animal' : 'plant'].nameLabel;
        }
    },
    created() {
        this.getList();
    },
    methods: {
        /** 查询视频图片资源列表 */
        getList() {
            this.loading = true;
            listResources(this.addDateRange(this.queryParams, this.educateTime)).then(response => {
                this.allData = response.rows;
                this.resourcesList = response.rows;
                this.filterByType(this.currentType);
                this.total = response.total;
                this.loading = false;
            });
        },
        // 筛选数据的方法
        filterByType(type) {
            this.currentType = type;
            this.resourcesList = this.allData.filter(item => item.type === type);
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
                videoImageCode: null,
                informationCategory: "",
                regular: null,
                status: "0",
                type: null,
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
            this.queryParams.informationCategory = "";
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

        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            if (row.type == 0) {
                this.$router.push({path: `/publicity/videotaped/${row.videoImageId}`});
            } else if (row.type == 1) {
                this.$router.push({path: `/publicity/picture/${row.videoImageId}`});
            }
        },

        /** 删除按钮操作 */
        handleDelete(row) {
            const videoImageIds = row.videoImageId || this.ids;
            this.$modal.confirm('是否确认删除名称为"' + row.videoImageName + '"的数据项？').then(function () {
                return delResources(videoImageIds);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {
            });
        },

        /** 设置为停用状态操作 */
        handleStatusIds(row) {
            const videoImageIds = row.videoImageId || this.ids;
            this.$modal.confirm('是否确认停用信访宣传教育信息？').then(function () {
                return setStatusIds(videoImageIds);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("设置信访宣传教育信息状态成功");
            }).catch(() => {
            });
        },

        /** 设置为启停用状态操作 */
        handleStatus(row) {
            const videoImageIdst = row.videoImageId || this.ids;
            let textStatus = row.status == 1 ? "启用" : "停用";
            this.$modal.confirm('是否确认' + textStatus + '访宣传教育信息？').then(function () {
                return setStatus(videoImageIdst);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("设置访宣传教育信息状态成功");
            }).catch(() => {
            });
        },


        /** 设置上传图片按钮操作 */
        educateSetting(row) {
            this.open = true;
            this.checketList = [];
            const videoImageIds = row.videoImageId || this.ids;
            getResourcesIds(videoImageIds).then(response => {
                this.$set(response, 'checked', false)
                this.checketImgList = response.data.imagerUrl;
            })
        },

        submitSetting(row) {
            const videoImageIds = row.videoImageId || this.ids;
            this.$modal.confirm('是否确认信访宣传教育视频/图片设置为大屏展示？').then(function () {
                return setVideoImgSetting(videoImageIds);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("设置信访宣传教育视频/图片大屏成功");
                this.open = false
            }).catch(() => {
            });
        },

        /** 设置为启停用状态操作 */
        educateAll(row) {
            const videoImageIdst = row.videoImageId || this.ids;
            this.$modal.confirm('是否确认取消展示信访宣传教育视频/图片？').then(function () {
                return setVideoImgSet(videoImageIdst);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("取消成功");
            }).catch(() => {
            });
        },
    }
};
</script>
<style scoped>
.el-buttons {
    background: #a2d2fe;
    color: #575757;
    border: 1px solid #9cc1d7;
    opacity: 1;
    margin-bottom: 5px;
}

.el-button:active {
    background: #126c9e !important;
    font-weight: bold;
}
/*按钮悬浮*/
.el-button:hover {
    background: #72a7d8 !important;
    color: white !important;
    font-weight: bold;
    border-color: #01a8f9 !important;
}
/*按钮点击*/
.el-button:focus {
    background: #72a7d8 !important;
    color: white !important;
    font-weight: bold;

    border-color: #01a8f9 !important;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px !important;
    position: relative !important;
    overflow: hidden !important;
}

.avatar-uploader .el-upload:hover {
    border: 1px dashed #d9d9d9 !important;
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}

.avatar {
    width: 300px;
    height: 178px;
    display: block;
}
</style>

