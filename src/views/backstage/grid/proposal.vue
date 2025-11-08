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
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['grid:proposal:remove']"
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
            </el-descriptions>
            <el-descriptions class="margin-top" :column="3"  >
                <el-descriptions-item label="内容描述">{{this.complaint.content}}</el-descriptions-item>
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

            <div slot="footer" class="dialog-footer">
                <el-button type="primary">确 定</el-button>
                <el-button @click="cancel">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { listComplaint, getComplaint, delComplaint, addComplaint, updateComplaint } from "@/api/backstage/grid/complaint";
    import { allList} from "@/api/backstage/grid/community";
    import {initZoneList} from "@/api/common/common";
    export default {
        name: "Proposal",
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
                    status: null,
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
            },

            /** 删除按钮操作 */
            handleDelete(row) {
                const ids = row.id || this.ids;
                this.$modal.confirm('是否确认删除网格建议的数据项？').then(function() {
                    return delComplaint(ids);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("删除成功");
                }).catch(() => {});
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
        }
    };
</script>
