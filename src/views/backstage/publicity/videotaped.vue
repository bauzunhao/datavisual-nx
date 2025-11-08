<template>
    <div class="app-container">
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
            <el-form-item label="资料类别" class="flexstart" prop="informationCategory">
                <el-select v-model="queryParams.informationCategory" placeholder="请选择">
                    <el-option
                        v-for="dict in dict.type.information_video_category"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资料名称" prop="videoImageName">
                <el-input
                    v-model="queryParams.videoImageName"
                    placeholder="请输入视频资料名称"
                    clearable
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="简介内容" prop="videoImageName">
                <el-input
                    v-model="queryParams.videoImageProfile"
                    placeholder="请输入视频简介内容"
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
                    icon="el-icon-plus"
                    size="mini"
                    @click="handleAdd"
                    v-hasPermi="['publicity:videotaped:add']"
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
                    v-hasPermi="['publicity:videotaped:edit']"
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
                    v-hasPermi="['publicity:videotaped:remove']"
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
            <el-table-column label="视图" align="center" prop="videoImageUrl" >
                <template slot-scope="scope">
                    <image-preview :src="scope.row.videoImageUrl" :width="50" :height="50"/>
                </template>
            </el-table-column>
            <el-table-column label="视频资料名称" align="center" prop="videoImageName" :show-overflow-tooltip="true"/>
            <el-table-column label="视频资料简介" align="center" prop="videoImageProfile"
                             :show-overflow-tooltip="true"/>
            <el-table-column label="资料类别" align="center" prop="informationCategory">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.information_video_category" :value="scope.row.informationCategory"/>
                </template>
            </el-table-column>
            <el-table-column label="二维码" align="center" prop="videoImageCode">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <qrcode-vue :value="getQRCode(scope.row.videoAttachments)" :size="160" :level="'H'" :margin="0"/>
                        <div slot="reference" class="name-wrapper">
                            <qrcode-vue :value="getQRCode(scope.row.videoAttachments)" :size="50" :level="'H'" :margin="0"/>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="是否展示大屏" align="center" prop="largeScreen" >
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.largeScreen"/>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" prop="status">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="300">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                        v-hasPermi="['publicity:videotaped:edit']"
                    >修改
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['publicity:videotaped:remove']"
                    >删除
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-setting"
                        @click="handleStatus(scope.row)"
                        v-hasPermi="['publicity:videotaped:status']"
                    >{{ 1 == scope.row.status ? '启用' : '停用' }}
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-setting"
                        @click="handleSetLargeScreen(scope.row)"
                        v-hasPermi="['publicity:videotaped:screen']"
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

        <!-- 添加视频对话框 -->
        <el-dialog :title="title" :visible.sync="videoOpen" width="1200px" append-to-body>
            <el-form :model="videoForm" :rules="videoRules" :inline="true" ref="videoForm" size="small" label-width="120px">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="视频资料名称" prop="videoImageName">
                            <el-input v-model="videoForm.videoImageName" placeholder="请输入视频图片资料名称"
                                      style=" width:300px"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span=10>
                        <el-form-item label="视频资料类别" class="flexstart" prop="informationCategory">
                            <el-select v-model="videoForm.informationCategory" clearable placeholder="请选择视频资料类别">
                                <el-option
                                    v-for="dict in dict.type.information_video_category"
                                    :key="dict.key"
                                    :label="dict.label"
                                    :value="dict.value">{{ dict.label }}
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="视频简介" prop="videoImageProfile">
                            <el-input type="textarea" style="width: 800px;" :rows="8" v-model="videoForm.videoImageProfile"
                                      maxlength="200" show-word-limit placeholder="请输入内容"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="状态" prop="status">
                            <el-radio-group v-model="videoForm.status" >
                                <el-radio
                                    v-for="dict in dict.type.sys_normal_disable"
                                    :key="dict.value"
                                    :label="dict.value"
                                >{{ dict.label }}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="视频附件" prop="videoAttachments">
                            <el-upload
                                v-model="videoForm.videoAttachments"
                                class="avatar-uploader el-upload--text"
                                :action="videoUpload.url"
                                :headers="videoUpload.headers"
                                accept=".mp4, .avi,.rmvb"
                                :show-file-list="false"
                                :on-success="handleVideoSuccess"
                                :before-upload="beforeUploadVideo"
                                :on-progress="uploadVideoProcess"
                            >
                                <!--视频区域，:src里面存放视频上传成功后的存储地址-->
                                <video v-if="this.showVideoPath !='' && !this.videoFlag"
                                       :src="this.videoUpload.url2 + videoForm.videoAttachments"
                                       class="avatar video-avatar" controls="controls">
                                    您的浏览器不支持视频播放
                                </video>
                                <!-- 变量showVideoPath如果不存在，就不显示，存在就显示视频 -->
                                <i v-else-if="this.showVideoPath =='' && !this.videoFlag"
                                   class="el-icon-plus avatar-uploader-icon"/>
                                <!--上传进度条区域-->
                                <el-progress :stroke-width="10" class="progressType" v-if="videoFlag == true"
                                             type="circle" :percentage="videoUploadPercent" style="margin-top:30px;">
                                </el-progress>
                                <!--此为视频点击上传按钮 isShowUploadVideo代表按钮显示与否-->
                                <el-button class="video-btn" slot="trigger" size="small" v-if="isShowUploadVideo"
                                           type="primary">点击上传视频
                                </el-button>
                                <div class="el-upload__tip" slot="tip" v-if="showTip">
                                    请上传
                                    <template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
                                    </template>
                                    <template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
                                    </template>
                                    的文件
                                </div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="视频封面" prop="videoImageUrl">
                            <image-upload v-model="videoForm.videoImageUrl":limit="1"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item style="display: block; padding-left: 400px;">
                    <el-button type="primary" @click="videoSubmitForm">保 存</el-button>
                    <el-button @click="reset">重 置</el-button>
                </el-form-item>
            </el-form>
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
        addResources, updateResources, getResources,
        setVideoResourcesLargeScreen
    } from "@/api/backstage/publicity/educate";
    import {initNowDate} from "@/utils/index";
    import {getToken} from "@/utils/auth";
    import QrcodeVue from "qrcode.vue";
    import {isExternal} from "@/utils/validate";
    export default {
        dicts: ['sys_normal_disable', 'information_video_category', 'sys_yes_no'],
        name: "PublicityVideo",
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
                    type: 0,
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
                videoOpen:false,
                videoForm: {
                    status: "0"
                },
                // 表单校验
                videoRules: {
                    videoImageName: [
                        {required: true, message: "视频资料名称不能为空", trigger: "blur"},
                    ],
                    informationCategory: [
                        {required: true, message: "视频资料类别不能为空", trigger: "blur"},
                    ],
                    status: [
                        {required: true, message: "状态不能为空", trigger: "blur"},
                    ],
                    videoAttachments:[
                        {required: true, message: "视频附件不能为空", trigger: "blur"},
                    ],
                    videoImageUrl:[
                        {required: true, message: "视频封面不能为空", trigger: "blur"},
                    ],
                },
                // 时间
                educateTime: initNowDate(),
                //***上传视频 *******************************
                //拿到当前环境的请求前缀
                videoUpload: {
                    // 设置上传的请求头部
                    headers: {Authorization: "Bearer " + getToken()},
                    // 上传的地址
                    url: process.env.VUE_APP_BASE_API + "/common/upload",
                    url2: process.env.VUE_APP_BASE_API
                },
                videoUploadPercent: "", //进度条的进度，
                isShowUploadVideo: false, //显示上传按钮
                showVideoPath:"",
                videoFlag:false,
            };
        },
        props: {
            // 大小限制(MB)
            fileSize: {
                type: Number,
                default: 300,
            },
            // 文件类型, 例如['png', 'jpg', 'jpeg']
            fileType: {
                type: Array,
                default: () => ["mp4"],
            },
            // 是否显示提示
            isShowTip: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            showTip() {
                return this.isShowTip && (this.fileType || this.fileSize);
            },
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
                this.videoForm = {
                    videoImageId: null,
                    videoImageUrl: null,
                    videoAttachments: null,
                    videoImageName: null,
                    videoImageProfile: null,
                    informationCategory: "",
                    regular: null,
                    status: "0",
                    type: 0,
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null
                };
                this.resetForm("videoForm");
                this.showVideoPath = "";
                this.isShowUploadVideo = false;
            },
            /** 提交按钮 */
            videoSubmitForm() {
                this.$refs["videoForm"].validate(valid => {
                    if (valid) {
                        if (this.videoForm.videoImageId != null) {
                            updateResources(this.videoForm).then(response => {
                                this.videoOpen = false;
                                this.getList();
                            });
                        } else {
                            addResources(this.videoForm).then(response => {
                                this.$modal.msgSuccess("新增成功");
                                this.videoOpen = false;
                                this.getList();
                            });
                        }
                    }
                });
            },

            /** 上传视频  *************************************************************/
            //上传前回调
            beforeUploadVideo(file) {
                const isLtM = (file.size / 1024 / 1024) < this.fileSize;
                this.videoForm.videoSize = file.size / 1024 / 1024;
                //判断是不是MP4格式视频
                if ([
                    "video/mp4",
                ].indexOf(file.type) != 0) {
                    this.$message.error('请上传正确的视频格式');
                    return false;
                }
                //单个视频大小限制在300M以内
                if (!isLtM) {
                    this.$message.error('上传视频大小不能超过'+this.fileSize+'MB哦!');
                    return false;
                }
                this.isShowUploadVideo = false;
            },

            //进度条
            uploadVideoProcess(event, file, fileList) {
                this.videoFlag = true;
                this.videoUploadPercent = file.percentage.toFixed(0) * 1;
            },

            //上传成功回调
            handleVideoSuccess(res, file) {
                this.isShowUploadVideo = true;
                this.videoFlag = false;
                this.videoUploadPercent = 0;
                if (res != "") {
                    this.showVideoPath = res.fileName;
                    this.videoForm.videoAttachments = res.fileName;
                } else {
                    this.$message.error('视频上传失败，请重新上传！');
                }
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageNum = 1;
                this.getList();
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.queryParams.informationCategory = "";
                this.queryParams.videoImageProfile="";
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
                const videoImageId = row.videoImageId || this.ids;
                getResources(videoImageId).then(response => {
                    if(response.data){
                        this.videoForm = response.data;
                        this.videoForm.status+="";
                        this.showVideoPath = response.data.videoFormvideoAttachments;
                        this.isShowUploadVideo = true;
                        this.videoOpen = true;
                        this.title = "修改视频资源";
                    }
                });
            },
            /** 删除按钮操作 */
            handleDelete(row) {
                const videoImageIds = row.videoImageId || this.ids;
                this.$modal.confirm('是否确认删除视频资源数据项？').then(function () {
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
                this.$modal.confirm('是否确认停用视频资源？').then(function () {
                    return setStatusIds(videoImageIds);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("设置视频资源状态成功");
                }).catch(() => {
                });
            },

            /** 设置为启停用状态操作 */
            handleStatus(row) {
                const videoImageIdst = row.videoImageId || this.ids;
                let textStatus = row.status == 1 ? "启用" : "停用";
                this.$modal.confirm('是否确认' + textStatus + '视频资源？').then(function () {
                    return setStatus(videoImageIdst);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("设置视频资源状态成功");
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

            /** 设置为上下大屏操作 */
            handleSetLargeScreen(row) {
                const videoImageIds = row.videoImageId || this.ids;
                this.$modal.confirm('是否对视频资源上下大屏进行设置？').then(function () {
                    return setVideoResourcesLargeScreen(videoImageIds);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("设置视频资源上下大屏成功");
                }).catch(() => {
                });
            },
            handleAdd() {
                this.reset();
                this.videoOpen = true;
                this.title = "添加视频信息";
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
<style scoped>
    .avatar-uploader-icon {
        border: 1px dashed #d9d9d9 !important;
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
        width: 800px;
        height: 400px;
        display: block;
    }
</style>

