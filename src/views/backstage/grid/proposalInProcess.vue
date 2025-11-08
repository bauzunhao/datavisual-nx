<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="姓名" prop="name">
                <el-input
                    v-model="queryParams.name"
                    placeholder="请输入姓名"
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
            <el-form-item label="发生地" prop="addressCode">
                <el-cascader
                    v-model="queryParams.addressCode"
                    placeholder="请选择发生地"
                    :props="zoneProps"
                    :options="zoneOptions"
                    clearable
                    style="width: 215px"
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
            <el-form-item label="投诉日期">
                <el-date-picker
                    v-model="dateRange"
                    style="width: 240px"
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                    type="warning"
                    plain
                    icon="el-icon-download"
                    size="mini"
                    @click="handleExport"
                >导出</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="primary"
                    plain
                    icon="el-icon-document"
                    size="mini"
                    @click="handleCb"
                >催办</el-button>
            </el-col>
        </el-row>

        <el-table v-loading="loading" :data="complaintList" >
            <el-table-column label="姓名" align="center" prop="name" />
            <el-table-column label="手机号码" align="center" prop="mobile" />
            <el-table-column label="发生地" align="center" prop="addressName" />
            <el-table-column label="事项类别" align="center" prop="contentTypeName" />
            <el-table-column label="反映类型" align="center" prop="type" >
                <template slot-scope="scope">
                    <span>  {{ 0 == scope.row.type ? '建议' : '投诉' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="内容" align="center" prop="content" :show-overflow-tooltip="true"/>
            <el-table-column label="网格社区" align="center" prop="communityName" />
            <el-table-column label="投诉时间" align="center" prop="complaintTime" width="180">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.complaintTime, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-document"
                        @click="handleView(scope.row)"
                    >查看</el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-document"
                        @click="banliView(scope.row)"
                    >办理</el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-document"
                        @click="back(scope.row)"
                    >退回</el-button>
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
        <!-- 网格投诉详情对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
            <el-descriptions class="margin-top" :column="3">
                <el-descriptions-item label="姓名">{{this.complaint.name}}</el-descriptions-item>
                <el-descriptions-item label="手机号码">{{this.complaint.mobile}}</el-descriptions-item>
                <el-descriptions-item label="所属网格社区">{{this.complaint.communityName}}</el-descriptions-item>
                <el-descriptions-item label="事项类别">{{this.complaint.contentTypeName}}</el-descriptions-item>
                <el-descriptions-item label="反映类型">{{0 ==this.complaint.type ? '建议' : '投诉'}}</el-descriptions-item>
                <el-descriptions-item label="投诉时间">{{parseTime(this.complaint.complaintTime, '{y}-{m}-{d}')}}</el-descriptions-item>
                <el-descriptions-item label="事情发生地">{{this.complaint.addressName}}</el-descriptions-item>
                <el-descriptions-item label="当前办理状态">{{0 == this.complaint.status ? "待办理" : 1 == this.complaint.status ? "办理中" : 2 == this.complaint.status ? "办结" :""}}</el-descriptions-item>
            </el-descriptions>
            <el-descriptions
                class="margin-top"
                :column="1"
                title="附件列表"
                label-class-name="my-label"
                content-class-name="my-content">
                <template slot="label">
                    <i class="el-icon-s-order"></i>
                    附件
                </template>
                <el-descriptions-item v-for="(item, index) in filesList" :key="index" :label="item.name">
                    <a :href="getHref(item.url)" target="_blank" download>下载</a>
                </el-descriptions-item>
            </el-descriptions>
            <div class="gener">
                <p>{{this.complaint.content}}</p>
            </div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="办理情况" name="first" >
                    <el-table  :data="stateList">
                        <el-table-column label="网格单位名称" align="center" key="communityName" prop="communityName" />
                        <el-table-column label="经办日期" align="center" key="createTime" prop="createTime"/>
                        <el-table-column label="经办人" align="center" key="name" prop="name"/>
                        <el-table-column label="联系电话" align="center" key="mobile" prop="mobile"/>
                        <el-table-column label="办理状态" align="center" >
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>{{ scope.row.opinion? scope.row.opinion:""}}</p>
                                    <div slot="reference" class="name-wrapper">
                                        {{ 0 == scope.row.status ? "受理" : 1 == scope.row.status ? "不予受理" : 2 == scope.row.status ? "暂存" : 3 == scope.row.status ? "派件" : 4 == scope.row.status ? "退回" : 5 == scope.row.status ? "办理" : "" }}
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="办理结果" name="second">
                    <div class="gener">
                        <p>{{this.complaint.solveResult}}</p>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="评价情况" name="third">
                    <el-descriptions class="margin-top" :column="2">
                        <el-descriptions-item label="评价状态">{{this.complaint.pjStatus == 1 ? "已评价" : "未评价"}}</el-descriptions-item>
                        <el-descriptions-item label="评价结果">{{this.complaint.pjResult == 0 ? "满意" : this.complaint.pjResult == 1 ? "基本满意" : this.complaint.pjResult == 2 ? "不满意" : ""}}</el-descriptions-item>
                    </el-descriptions>
                </el-tab-pane>
            </el-tabs>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">关闭</el-button>
            </div>
        </el-dialog>

        <el-dialog title="办理" :visible.sync="banli" width="900px" append-to-body>
            <el-form label-position="top" label-width="80px" ref="form" :model="form" :rules="rules">
                <el-form-item label="办理意见" prop="handleResult">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.handleResult" maxlength="2000" show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item label="解决情况" prop="solveResult">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.solveResult" maxlength="2000" show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item label="给当事人短信反馈内容">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.smsContent" maxlength="50" show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center">
                <el-button type="primary" @click="handle">提交</el-button>
                <el-button @click="banli=false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { listComplaint, getComplaint,acceptComplaint,handleComplaint,stateList} from "@/api/backstage/grid/complaint";
    import { allList} from "@/api/backstage/grid/community";
    import {initZoneList} from "@/api/common/common";
    export default {
        name: "proposalInProcess",
        data() {
            return {
                // 遮罩层
                loading: true,
                // 选中数组
                ids: [],
                // 日期范围
                dateRange: [],
                // 非单个禁用
                single: true,
                // 非多个禁用
                multiple: true,
                // 显示搜索条件
                showSearch: true,
                // 总条数
                total: 0,
                // 网格投诉表格数据
                complaintList: [],
                // 弹出层标题
                title: "",
                // 是否显示弹出层
                open: false,
                banli: false,
                complaint: {},
                filesList: {},
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    name: null,
                    mobile: null,
                    addressCode: null,
                    address: null,
                    contentType: null,
                    type: "0",
                    status: 1,
                    state: null,
                    isEnd: null,
                    content: null,
                    communityId: null,
                    acceptTime: null,
                    endTime: null,
                    complaintId: null,
                },
                //网格社区数据
                communityList:[],
                // 查询网格社区参数
                queryCommunityParams: {
                },
                zoneProps: {
                    label: "name",
                    value: "id",
                    emitPath: false,
                    checkStrictly: true,
                },
                zoneOptions: [],
                //增加或修改操作属地下拉框
                zoneOperateOptions: [],
                form: {
                    id: "",
                },
                // 表单校验
                rules: {
                    handleResult: [
                        { required: true, message: "办理意见不能为空", trigger: "blur" }
                    ],
                    solveResult: [
                        { required: true, message: "解决情况不能为空", trigger: "blur" }
                    ],
                },
                stateList:[],
                activeName: 'first',
            };
        },
        created() {
            this.getList();
            this.initZone();
            this.getCommunityList();
        },
        methods: {
            // 初始化行政区域
            initZone() {
                initZoneList({id: process.env.VUE_APP_ZONE_ID,depth:3}).then(response => {
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
            getCommunityList() {
                allList(this.queryCommunityParams).then(response => {
                    this.communityList = response.rows;
                });
            },
            /** 查询网格建议列表 */
            getList() {
                this.loading = true;
                listComplaint(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                    this.complaintList = response.rows;
                    this.total = response.total;
                    this.loading = false;
                });
            },
            getHref(src){
                return window.location.origin + process.env.VUE_APP_BASE_API + src;
            },
            // 取消按钮
            cancel() {
                this.open = false;
            },

            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageNum = 1;
                this.getList();
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.resetForm("queryForm");
                this.dateRange = [];
                this.handleQuery();
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.id);
                this.single = selection.length!==1;
                this.multiple = !selection.length;
            },

            /** 查看按钮操作 */
            handleView(row) {
                const id = row.id || this.ids;
                getComplaint(id).then(response => {
                    this.complaint = response.data;
                    this.filesList = JSON.parse( this.complaint.files);
                    this.open = true;
                    this.title = "网格建议详情";
                });
                this.getStateList(id);
            },
            /** 查询网格建议流转记录列表 */
            getStateList(complaintId) {
                stateList({complaintId: complaintId}).then(response => {
                    this.stateList = response.rows;
                });
            },
            banliView(row){
                this.banli = true;
                this.form.id = row.id;
            },
            /** 导出按钮操作 */
            handleExport() {
                if(this.total > 5000){
                    this.$modal.msgWarning("您当前导出的数据量超过5000条数据，暂不提供导出！建议分批导出!");
                    return false;
                }
                this.download('grid/complaint/export', {
                    ...this.queryParams
                }, `网格建议管理_${new Date().getTime()}.xlsx`,{timeout:120000});
            },
            /** 办理*/
            handle() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        handleComplaint(this.form).then(response => {
                            this.$modal.msgSuccess("提交成功");
                            this.banli = false;
                            this.getList();
                        });
                    }
                })
            },
            back(row){
                this.$modal.confirm('是否确认退回？').then(function() {
                    return acceptComplaint({id:row.id,type:4});
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("处理成功");
                }).catch(() => {});
            },
            handleCb(){
                this.$modal.msgSuccess("催办成功");
            }
        }
    };
</script>
<style scoped lang="scss">
    .gener{
        height: 100px;
        overflow: auto;
        border: 1px solid #000000;
        margin: 10px 0;
        p{
            margin: 0;
            font-size: 14px;
            line-height: 20px;
            height: 20px;
        }
    }
</style>
