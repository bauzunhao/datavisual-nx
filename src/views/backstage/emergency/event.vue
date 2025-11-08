<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="110px">
      <el-form-item label="信访人姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入信访人姓名"
          clearable
          style="width: 180px"
          @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="信访件编号" prop="letterCode">
        <el-input
          v-model="queryParams.letterCode"
          placeholder="请输入信访件编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="问题属地" prop="zoneId">
        <el-cascader
          v-model="queryParams.zoneId"
          placeholder="请选择问题属地"
          :props="zoneProps"
          :options="zoneOptions"
          :show-all-levels="false"
          clearable
          style="width: 180px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="证件号码" prop="idcardNo">
        <el-input
          v-model="queryParams.certificateNumber"
          placeholder="请输入信访人证件号码"
          clearable
          style="width: 180px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="登记日期">
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
      <el-row>
        <el-col :span="12">
          <el-form-item label="办理类型：">
            <el-radio-group v-model="queryParams.handleType" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="0">交办</el-radio-button>
              <el-radio-button label="4">督办</el-radio-button>
              <el-radio-button label="1">转送</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="信访目的：">
            <el-radio-group v-model="queryParams.purposeType" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button
                v-for="dict in dict.type.sys_purpose_type"
                :key="dict.value"
                :label="dict.value"
              >{{dict.label}}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="处理状态：">
            <el-radio-group v-model="queryParams.end" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="1">已办结</el-radio-button>
              <el-radio-button label="0">处理中</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="信访形式：">
            <el-radio-group v-model="queryParams.letterType" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button
                v-for="dict in dict.type.sys_letter_type"
                :key="dict.value"
                :label="dict.value"
              >{{dict.label}}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="事件级别：">
            <el-radio-group v-model="queryParams.customLevel" size="small">
              <el-radio-button
                v-for="(item, index) in eventLevelList"
                :key="index"
                :label="index"
              >{{item}}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关闭类型：">
            <el-radio-group v-model="queryParams.resultStatus" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="0">进行中</el-radio-button>
              <el-radio-button label="1">转领导包案</el-radio-button>
              <el-radio-button label="2">推进化解</el-radio-button>
              <el-radio-button label="3">已经稳控</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mb8">
        <el-form-item style="float: right">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-table v-loading="loading" :data="eventList" @selection-change="handleSelectionChange">
      <!--<el-table-column type="selection" width="55" align="center"/>-->
      <!--<el-table-column label="应急事件码" align="center" prop="eventId"/>-->
      <el-table-column label="信访人" width="120" align="center" prop="name"/>
      <el-table-column label="信访件编号" width="140" align="center" prop="letterCode"/>
      <el-table-column label="信访人联系电话" width="140" align="center" prop="mobile"/>
      <el-table-column label="属地" width="200" align="center" prop="zoneName"/>
      <el-table-column label="信访日期" width="140" align="center" prop="receiveTime"/>
      <el-table-column label="发现时间" width="160" align="center" prop="createTime"/>
      <el-table-column label="事件级别" width="80" align="center" prop="customLevel">
        <template slot-scope="scope">{{eventLevelList[scope.row.customLevel]}}</template>
      </el-table-column>
      <el-table-column label="处理结果" width="160" align="center" prop="resultStatus">
        <template slot-scope="scope">{{resultStatusList[scope.row.resultStatus] || '进行中'}}</template>
      </el-table-column>
      <el-table-column label="风险规则名称" align="center" prop="ruleName"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-bell"
            @click="handleLevel(scope.row)"
            v-if="!scope.row.resultStatus"
            v-hasPermi="['emergency:event:level']"
          >定级处理
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-sunrise"
            @click="handleProcess(scope.row)"
            v-hasPermi="['emergency:event:process']"
          >风险流程
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-sunrise-1"
            @click="handleResource(scope.row)"
            v-hasPermi="['emergency:event:resource']"
          >风险资源
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-document"
            @click="handleReport(scope.row)"
            v-if="!scope.row.resultStatus"
            v-hasPermi="['emergency:event:report']"
          >情况通报
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-service"
            v-if="!scope.row.resultStatus"
            v-hasPermi="['emergency:event:command']"
          >
            <router-link target="_blank" :to="{path: '/datav/linkage', query: {eventId: scope.row.eventId}}">联动指挥</router-link>
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-switch-button"
            @click="handleClose(scope.row)"
            v-if="!scope.row.resultStatus"
            v-hasPermi="['emergency:event:close']"
          >关闭
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

    <!-- 图片预览对话框，主要用于显示风险流程、资源文件 -->
    <el-dialog :title="dialog.imgPreview.title" :visible.sync="dialog.imgPreview.open" width="600px" append-to-body>
      <div class="block" style="text-align: center">
        <image-preview :src="dialog.imgPreview.src"/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialog(dialog.imgPreview)">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 情况通报对话框 -->
    <el-dialog :title="dialog.report.title" :visible.sync="dialog.report.open" width="600px" append-to-body>
      <el-form ref="reportForm" :model="dialog.report" :rules="rules" label-width="20px">
        <el-form-item label="">
          <el-input type="textarea" :rows="12" v-model="dialog.report.content" resize="none" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="downloadReport" v-if="false">下 载</el-button>
        <el-button type="primary" @click="printReportPreview">打印预览</el-button>
        <el-button @click="closeDialog(dialog.report)">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 定级处理对话框 -->
    <el-dialog :title="dialog.level.title" :visible.sync="dialog.level.open" :close-on-click-modal="false" :close-on-press-escape="false" custom-class="levelForm" append-to-body>
      <el-form ref="levelForm" :model="dialog.level.form" :rules="dialog.level.rules" label-width="80px">
        <el-card class="box-card">
          <div>
            <el-descriptions>
              <el-descriptions-item label="信访时间">{{this.dialog.level.form.letterDetail.receiveTime}}</el-descriptions-item>
              <el-descriptions-item label="事项所属系统">{{this.dialog.level.form.letterDetail.belongToSystem}}</el-descriptions-item>
              <el-descriptions-item label="事情发生地">{{this.dialog.level.form.zoneName}}</el-descriptions-item>
              <el-descriptions-item label="当前办理状态">{{this.dialog.level.form.letterDetail.end ? "已办结" : "办理中"}}</el-descriptions-item>
              <el-descriptions-item label="信访原因">{{this.dialog.level.form.letterDetail.complaintReason}}</el-descriptions-item>
              <el-descriptions-item label="通用关键字">{{this.dialog.level.form.letterDetail.commonKeyword}}</el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
        <el-row style="margin: 20px 0" :gutter="20">
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>信访人基本信息</span>
              </div>
              <div class="item leuserinfo">
                <div>
                  <p><span>{{this.dialog.level.form.letterDetail.name}}</span><span>{{this.dialog.level.form.letterDetail.sex}}</span><span>{{this.dialog.level.form.letterDetail.nation}}</span><span v-if="this.dialog.level.form.letterDetail.age">{{this.dialog.level.form.letterDetail.age}}岁</span></p>
                  <p>电话：{{this.dialog.level.form.letterDetail.mobile}}</p>
                  <p>住址：{{this.dialog.level.form.letterDetail.address}}</p>
                </div>
                  <img v-if="!this.dialog.level.form.letterDetail.jointly" src="../../../assets/images/grts.png" alt="">
                  <img v-if="this.dialog.level.form.letterDetail.jointly" src="../../../assets/images/jtf.png" alt="">
              </div>
              <div class="histy">
                <div class="histy-li">
                  <span class="histy-tip">信访次数</span>
                  <p><span>{{this.dialog.level.form.letterDetail.detailStatis.totalCount}}</span>次</p>
                  <div>
                    <img src="@/assets/images/histy_tont3.png" alt="">
                    <p>走访 <span>{{this.dialog.level.form.letterDetail.detailStatis.visitCount}}</span>批</p>
                  </div>
                  <div>
                    <img src="@/assets/images/histy_tont4.png" alt="">
                    <p>来信 <span>{{this.dialog.level.form.letterDetail.detailStatis.letterCount}}</span>批</p>
                  </div>
                  <div>
                    <img src="@/assets/images/histy_tont5.png" alt="">
                    <p>网投 <span>{{this.dialog.level.form.letterDetail.detailStatis.onlineCount}}</span>批</p>
                  </div>
                </div>
                <div class="histy-li">
                  <span class="histy-tip">办理状态</span>
                  <p>待办理<span>{{this.dialog.level.form.letterDetail.detailStatis.todoCount}}</span> 件，已办理<span>{{this.dialog.level.form.letterDetail.detailStatis.completedCount}}</span> 件</p>
                </div>
                <div class="histy-li">
                  <span class="histy-tip">登记级别</span>
                  <p>国<span>{{this.dialog.level.form.letterDetail.detailStatis.guojiaCount}}</span> 件，区<span>{{this.dialog.level.form.letterDetail.detailStatis.qujiCount}}</span> 件，市<span>{{this.dialog.level.form.letterDetail.detailStatis.shijiCount}}</span> 件，县<span>{{this.dialog.level.form.letterDetail.detailStatis.xianjiCount}}</span> 件</p>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>投诉内容</span>
              </div>
              <div class="item lecontent">
                <p>信访件编号
                  <span>
                    {{this.dialog.level.form.letterCode}}（涉及人数：{{this.dialog.level.form.letterDetail.involveNumber || 0}}人，
                    {{this.dialog.level.form.letterDetail.repeat ? "重件": "初件"}}{{this.dialog.level.form.letterDetail.pendingCase ? "，积案" : ""}}
                    {{this.dialog.level.form.letterDetail.sfssbz ? "，涉法涉诉" : ""}}）
                  </span>
                </p>
                <div class="lecon">
                  投诉内容：<br/>{{this.dialog.level.form.letterDetail.complaintContent}}
                </div>
                <div class="lecontip">
                  备注内容：<br/>
                  {{this.dialog.level.form.letterDetail.remark}}
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card class="box-card">
          <el-descriptions>
            <el-descriptions-item label="事项响应级别">{{this.eventLevelList[this.dialog.level.form.eventLevel]}}</el-descriptions-item>
            <el-descriptions-item label="风险规则名称">{{this.dialog.level.form.ruleName}}</el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-form-item style="margin-top: 20px;padding-left: 50%;" label="事件定级" prop="customLevel">
          <el-select v-model="dialog.level.form.customLevel" placeholder="请选择">
            <el-option
              v-for="(item, index) in eventLevelList"
              v-if="index > 0"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="grading">定 级</el-button>
        <el-button @click="closeDialog(dialog.level)">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 事件关闭对话框 -->
    <el-dialog :title="dialog.close.title" :visible.sync="dialog.close.open" :close-on-click-modal="false" :close-on-press-escape="false" width="800px" append-to-body>
      <el-form ref="closeForm" :model="dialog.close.form.event" :rules="dialog.close.rules" label-width="120px" label-position="left">
        <el-descriptions>
          <el-descriptions-item label="信访编号">{{dialog.close.form.event.letterCode}}</el-descriptions-item>
          <el-descriptions-item label="信访人">{{dialog.close.form.event.name}}</el-descriptions-item>
          <el-descriptions-item label="属地">{{dialog.close.form.event.zoneName}}</el-descriptions-item>
          <el-descriptions-item label="风险规则">{{dialog.close.form.event.ruleName}}</el-descriptions-item>
          <el-descriptions-item label="事件级别">{{eventLevelList[dialog.close.form.event.customLevel]}}</el-descriptions-item>
        </el-descriptions>
        <el-form-item label="谈话记录">
          <el-upload
            class="upload-demo"
            :action="dialog.close.upload.url"
            :headers="dialog.close.upload.headers"
            :on-progress="handleFileUploadProgress"
            :on-success="(response, file, fileList)=>handleFileSuccess(response, file, fileList, 'talkUpload')"
            :on-remove="(file, fileList)=>handleFileRemove(file, fileList, 'talkUpload')"
            :multiple= false
            :limit="1"
            :file-list="dialog.close.upload.files.talkList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="视频图片">
          <el-upload
            class="upload-demo"
            :action="dialog.close.upload.url"
            :headers="dialog.close.upload.headers"
            :on-progress="handleFileUploadProgress"
            :on-success="(response, file, fileList)=>handleFileSuccess(response, file, fileList, 'mediumUpload')"
            :on-remove="(file, fileList)=>handleFileRemove(file, fileList, 'mediumUpload')"
            :multiple= false
            :limit="1"
            :file-list="dialog.close.upload.files.mediumList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="处置总结文件">
          <el-upload
            class="upload-demo"
            :action="dialog.close.upload.url"
            :headers="dialog.close.upload.headers"
            :on-progress="handleFileUploadProgress"
            :on-success="(response, file, fileList)=>handleFileSuccess(response, file, fileList, 'summaryUpload')"
            :on-remove="(file, fileList)=>handleFileRemove(file, fileList, 'summaryUpload')"
            :multiple= false
            :limit="1"
            :file-list="dialog.close.upload.files.summaryList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="其它记录文件">
          <el-upload
            class="upload-demo"
            :action="dialog.close.upload.url"
            :headers="dialog.close.upload.headers"
            :on-progress="handleFileUploadProgress"
            :on-success="(response, file, fileList)=>handleFileSuccess(response, file, fileList, 'otherUpload')"
            :on-remove="(file, fileList)=>handleFileRemove(file, fileList, 'otherUpload')"
            :multiple= true
            :limit="5"
            :file-list="dialog.close.upload.files.otherList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="处理结果" prop="resultStatus">
          <el-radio-group v-model="dialog.close.form.event.resultStatus">
            <el-radio :label="1">转领导包案</el-radio>
            <el-radio :label="2">推进化解</el-radio>
            <el-radio :label="3">已经稳控</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备 注">
          <el-input type="textarea" v-model="dialog.close.form.event.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="stopEvent">提 交</el-button>
        <el-button @click="closeDialog(dialog.close)">取 消</el-button>
      </div>
    </el-dialog>

      <!--  打印情况通报内容 -->
      <el-dialog title="打印预览" :visible.sync="dialog.print.open" :close-on-click-modal="false" :close-on-press-escape="false" width="50%" append-to-body>
          <div class="print-div" style="padding: 0.5cm;">
              <h2 style="text-align: center;">重点信访事项风险处置通报</h2>
              <div style="font-size: 18px; margin-top: 50px;">
                  <p>{{this.dialog.print.data.unitName}}：</p>
                  <p style="text-indent: 2em; line-height: 35px;">{{this.dialog.report.content}}</p>
                  <p style="text-indent: 2em">特此通报。</p>
                  <p style="text-align: right;padding-right: 50px;margin-top: 40px">拉萨市信访局（盖章）</p>
                  <p style="text-align: right;padding-right: 80px">{{this.dialog.print.data.currentTime}}</p>
              </div>
          </div>
          <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="printReportContent">打 印</el-button>
              <el-button @click="closeDialog(dialog.print)">取 消</el-button>
          </div>
      </el-dialog>
  </div>
</template>

<script>
    import { getToken } from "@/utils/auth";
    import {initZoneList} from "@/api/common/common";
    import {
        listEvent,
        getEvent,
        getEventDetail,
        delEvent,
        addEvent,
        updateEvent,
        reportContent,
        gradingEvent,
        closeEvent
    } from "@/api/backstage/emergency/event";
    import printTemplate from "@/api/backstage/emergency/twig/report.twig";
    import {printHTML} from "@/utils/common";

    export default {
        name: "Event",
        dicts: ['sys_purpose_type', 'sys_letter_type'],
        data() {
            return {
                // 遮罩层
                loading: true,
                dateRange: [],
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
                // 风险事件表格数据
                eventList: [],
                // 弹出层标题
                title: "",
                // 是否显示弹出层
                open: false,
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    customLevel: 0,
                    resultStatus: "",
                    name: undefined,
                    letterCode: undefined,
                    zoneId: undefined,
                    certificateNumber: undefined,
                    handleType: "",
                    purposeType: "",
                    letterType: "",
                    end: ""
                },
                zoneProps: {
                    label: "name",
                    value: "id",
                    checkStrictly: true,
                    emitPath: false
                },
                zoneOptions: [],
                eventLevelList: ['全部', '一级', '二级', '三级', '四级', '五级'],
                resultStatusList: ['', '转领导包案', '推进化解', '已经稳控'],
                // 表单参数
                form: {},
                // 表单校验
                rules: {},
                dialog: {
                    imgPreview: {
                        title: undefined,
                        open: false,
                        src: undefined
                    },
                    report: {
                        title: undefined,
                        open: false,
                        content: undefined
                    },
                    print: {
                        open: false,
                        data: {
                            eventDto: null,
                            unitDto: null,
                            unitName: null,
                            currentTime: null
                        }
                    },
                    level: {
                        title: undefined,
                        open: false,
                        form: {
                            letterDetail: {
                                detailStatis: {}
                            }
                        },
                        rules: {}
                    },
                    close: {
                        title: undefined,
                        open: false,
                        form: {
                            event: {},
                            eventFiles : []
                        },
                        rules: {
                            resultStatus: [
                                {required: true, message: "请选择风险事件关闭的处理结果", trigger: "blur"}
                            ]
                        },
                        // 上传参数
                        upload: {
                            // 是否禁用上传
                            isUploading: false,
                            // 设置上传的请求头部
                            headers: { Authorization: "Bearer " + getToken() },
                            // 上传的地址
                            url: process.env.VUE_APP_BASE_API + "/common/upload",
                            // 上传存储对象
                            files: {
                                talkList: [], // 谈话文件
                                mediumList: [], // 视频图片
                                summaryList: [], // 总结文件
                                otherList: [] // 其他文件
                            }
                        }
                    }
                },
            };
        },
        created() {
            this.initZone();
            this.getList();
        },
        methods: {
            // 初始化行政区域
            initZone() {
                initZoneList({
                    id: process.env.VUE_APP_SUPER_ZONE_ID
                }).then(response => {
                    this.zoneOptions = [];
                    if (response) {
                        this.zoneOptions = response;
                    }
                });
            },
            /** 查询风险事件列表 */
            getList() {
                this.loading = true;
                listEvent(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                    this.eventList = response.rows;
                    this.total = response.total;
                    this.loading = false;
                });
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageNum = 1;
                this.getList();
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.queryParams.resultStatus = "";
                this.queryParams.handleType = "";
                this.queryParams.purposeType = "";
                this.queryParams.letterType = "";
                this.queryParams.customLevel = 0;
                this.queryParams.end = "";
                this.dateRange = [];
                this.resetForm("queryForm");
                this.handleQuery();
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.eventId);
                this.single = selection.length !== 1;
                this.multiple = !selection.length;
            },
            // 定级
            handleLevel(row) {
                getEventDetail(row.eventId).then(response => {
                    this.dialog.level.form = response.data;
                    this.dialog.level.title = "风险事件定级处理";
                    this.dialog.level.open = true;
                });
            },
            // 流程
            handleProcess(row) {
                this.dialog.imgPreview.src = row.processFile;
                this.dialog.imgPreview.title = "查看关联的风险流程";
                this.dialog.imgPreview.open = true;
            },
            // 资源
            handleResource(row) {
                this.dialog.imgPreview.src = row.resourceFile;
                this.dialog.imgPreview.title = "查看关联的风险资源";
                this.dialog.imgPreview.open = true;
            },
            // 通报
            handleReport(row) {
                reportContent(row.eventId).then(response => {
                    this.dialog.report.title = "风险事件情况通报";
                    this.dialog.report.content = "";
                    this.dialog.print.data = {};
                    if (response && response.code && 200 === response.code) {
                        let result = response.data;
                        this.dialog.report.content = result.reportContent;
                        this.dialog.print.data.unitName = result.unitName;
                        this.dialog.print.data.unitDto = result.unitDto;
                        this.dialog.print.data.eventDto = result.eventDto;
                        this.dialog.print.data.currentTime = result.currentTime;
                    }
                    this.dialog.report.open = true;
                });
            },
            // 指挥
            handleCommand(row) {
                this.$modal.notifySuccess("待可视化大屏联动指挥完成后加链接！");
            },
            // 关闭事件
            handleClose(row) {
                this.dialog.close.form = {
                    event: {
                        eventId: row.eventId,
                        name: row.name,
                        letterCode: row.letterCode,
                        customLevel: row.customLevel,
                        zoneName: row.zoneName,
                        ruleName: row.ruleName
                    },
                    eventFiles: []
                };
                this.dialog.close.upload.files.talkList = [];
                this.dialog.close.upload.files.mediumList = [];
                this.dialog.close.upload.files.summaryList = [];
                this.dialog.close.upload.files.otherList = [];
                this.dialog.close.title = "风险事件关闭";
                this.dialog.close.open = true;
            },
            // 关闭弹窗
            closeDialog(dialog) {
                dialog.open = false;
            },
            // 下载情况通报文件
            downloadReport() {
                this.$modal.notifySuccess("正在开发中，敬请期待！");
            },
            // 打印情况通报预览
            printReportPreview() {
                this.dialog.print.open = true;
            },
            // 打印情况通报
            printReportContent() {
                let html = printTemplate({
                    title: '重点信访事项风险处置通报',
                    content: this.dialog.report.content,
                    reportData: this.dialog.print.data
                })
                printHTML(html);
                this.closeDialog(this.dialog.report);
            },
            // 定级数据操作
            grading() {
                const data = {
                    eventId: this.dialog.level.form.eventId,
                    customLevel: this.dialog.level.form.customLevel
                };
                gradingEvent(data).then(response => {
                    this.$modal.msgSuccess("定级成功");
                    this.closeDialog(this.dialog.level);
                    this.getList();
                });
            },
            // 文件上传中处理
            handleFileUploadProgress(event, file, fileList) {
                this.dialog.close.upload.isUploading = true;
            },
            // 文件上传成功处理
            handleFileSuccess(response, file, fileList, component) {
                this.dialog.close.upload.isUploading = false;
                this.$modal.msgSuccess(response.msg);
                this.handleFileList(component, fileList);
            },
            // 文件移除时处理
            handleFileRemove(file, fileList, component) {
                this.handleFileList(component, fileList);
            },
            // 处理文件集合，在文件上传成功和移除时
            handleFileList(component, fileList) {
                if ("talkUpload" === component) {
                    this.dialog.close.upload.files.talkList = [];
                } else if ("mediumUpload" === component) {
                    this.dialog.close.upload.files.mediumList = [];
                } else if ("summaryUpload" === component) {
                    this.dialog.close.upload.files.summaryList = [];
                } else if ("otherUpload" === component) {
                    this.dialog.close.upload.files.otherList = [];
                }
                for (var i = 0, len = fileList.length; i < len; i++) {
                    if (fileList[i].hasOwnProperty("response") && 200 === fileList[i].response.code) {
                        var data = fileList[i].response;
                        if ("talkUpload" === component) {
                            this.dialog.close.upload.files.talkList.push(
                                { name: data.originalFilename, url: data.url, evnetFileType: 1, eventFileName: data.newFileName, eventFilePath: data.url}
                            );
                        } else if ("mediumUpload" === component) {
                            this.dialog.close.upload.files.mediumList.push(
                                { name: data.originalFilename, url: data.url, evnetFileType: 2, eventFileName: data.newFileName, eventFilePath: data.url}
                            );
                        } else if ("summaryUpload" === component) {
                            this.dialog.close.upload.files.summaryList.push(
                                { name: data.originalFilename, url: data.url, evnetFileType: 3, eventFileName: data.newFileName, eventFilePath: data.url}
                            );
                        } else if ("otherUpload" === component) {
                            this.dialog.close.upload.files.otherList.push(
                                { name: data.originalFilename, url: data.url, evnetFileType: 4, eventFileName: data.newFileName, eventFilePath: data.url}
                            );
                        }
                    } else if (!fileList[i].hasOwnProperty("response")) {
                        var data = fileList[i];
                        if ("talkUpload" === component) {
                            this.dialog.close.upload.files.talkList.push(data);
                        } else if ("mediumUpload" === component) {
                            this.dialog.close.upload.files.mediumList.push(data);
                        } else if ("summaryUpload" === component) {
                            this.dialog.close.upload.files.summaryList.push(data);
                        } else if ("otherUpload" === component) {
                            this.dialog.close.upload.files.otherList.push(data);
                        }
                    }
                }
            },
            // 关闭事件数据操作
            stopEvent() {
                this.$refs["closeForm"].validate(valid => {
                    if (valid) {
                        const data = {
                            eventId: this.dialog.close.form.event.eventId,
                            resultStatus: this.dialog.close.form.event.resultStatus,
                            remark: this.dialog.close.form.event.remark,
                            eventFiles: [...this.dialog.close.upload.files.talkList, ...this.dialog.close.upload.files.mediumList, ...this.dialog.close.upload.files.summaryList, ...this.dialog.close.upload.files.otherList]
                        };
                        closeEvent(data).then(response => {
                            if (200 === response.code) {
                                this.$modal.msgSuccess("风险事件关闭成功");
                                this.closeDialog(this.dialog.close);
                                this.getList();
                                return;
                            }
                            this.$modal.msgError(response.msg);
                        });
                    }
                });
            },
            /** 删除按钮操作 */
            handleDelete(row) {
                const eventIds = row.eventId || this.ids;
                this.$modal.confirm('是否确认删除风险事件数据？').then(function () {
                    return delEvent(eventIds);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("删除成功");
                }).catch(() => {
                });
            },
            /** 导出按钮操作 */
            handleExport() {
                this.download('emergency/event/export', {
                    ...this.queryParams
                }, `风险事件列表_${new Date().getTime()}.xlsx`)
            }
        }
    };
</script>

<style lang="scss" scoped>
  .levelForm {
    width: 1000px;

    .el-dialog__body {
      padding: 10px 20px;
    }

    .leuserinfo {
      display: flex;
      justify-content: space-between;

      img {
        width: 100px;
        height: 100px;
        margin-left: 5px;
      }

      div {
        font-size: 14px;

        p {
          margin-top: 0;

          span {
            margin-right: 5px;
          }
        }
      }
    }

    .histy {
      .histy-li {
        display: flex;
        align-items: center;
        align-content: center;
        margin-top: 10px;

        p {
          margin: 0;

          span {
            color: #2166cc;
            font-size: 24px;
            margin: 0 5px;
          }
        }

        div {
          display: flex;
          flex-direction: column;
          align-items: center;

          p {
            font-size: 14px;

            span {
              font-size: 14px;
              margin: 0 5px;
            }
          }
        }

        .histy-tip {
          padding: 10px;
          background-color: #2166cc;
          color: white;
          border-radius: 8px;
          margin-right: 10px;
        }
      }

      .histy-li:first-child {
        justify-content: space-between;
      }

      .histy-li:nth-child(2) {
        margin-bottom: 25px;
      }
    }

    .lecontent {
      .lecon {
        height: 217px;
        overflow: auto;
        border: 1px #cccccc solid;
        padding: 10px;
      }

      .lecontip {
        min-height: 50px;
        border: 1px #cccccc solid;
        padding: 10px;
        border-top: 0;
      }

      p:first-child span {
        color: #2166cc;
      }
    }
  }

  .upload-demo{
    display: flex;
  }
</style>
