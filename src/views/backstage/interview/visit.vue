<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="100px">
            <el-form-item label="信访件编号" prop="letterCode">
                <el-input
                    v-model="queryParams.letterCode"
                    placeholder="请输入信访件编号"
                    clearable
                />
            </el-form-item>
            <el-form-item label="信访人姓名" prop="letterName">
                <el-input
                    v-model="queryParams.letterName"
                    placeholder="请输入信访人姓名"
                    clearable
                />
            </el-form-item>
            <el-form-item label="问题属地" prop="letterZoneId">
                <el-cascader
                    v-model="queryParams.letterZoneId"
                    placeholder="请选择问题属地"
                    :props="zoneProps"
                    :options="zoneOptions"
                    :show-all-levels="false"
                    clearable
                    style="width: 180px"
                />
            </el-form-item>
            <el-form-item label="接访时间" prop="interviewTime">
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
            <el-form-item label="发布状态" prop="verifyStatus">
                <el-select v-model="queryParams.verifyStatus" size="small" clearable>
                    <el-option label="已下架" value="-1"></el-option>
                    <el-option label="未确认" value="0"></el-option>
                    <el-option label="已发布" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="接访下访类型" prop="type">
                <el-select v-model="queryParams.type" clearable placeholder="请选择">
                    <el-option
                        v-for="item in visitType"
                        :key="item.key"
                        :label="item.label"
                        :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-row class="butlist">
                <el-form-item label="接访下访干部级别：" label-width="175px" class="flexstart">
                    <el-radio-group v-model="queryParams.cadreLevel" size="small">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button
                            v-for="dict in dict.type.leader_level"
                            :key="dict.value"
                            :label="dict.value"
                        >{{ dict.label }}
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="接访下访干部机构类别：" label-width="200px" class="flexstart">
                    <el-radio-group v-model="queryParams.cadreUnitType" size="small">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button
                            v-for="dict in dict.type.leader_unit_type"
                            :key="dict.value"
                            :label="dict.value"
                        >{{ dict.label }}
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-row>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                    type="primary"
                    plain
                    icon="el-icon-plus"
                    size="mini"
                    @click="handleAdd"
                    v-hasPermi="['interview:visit:add']"
                >新增
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
                    v-hasPermi="['interview:visit:remove']"
                >删除
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning"
                    icon="el-icon-download"
                    size="mini" plain
                    @click="handleExport"
                    v-hasPermi="['interview:visit:export']"
                >导出
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-s-release" size="mini" @click="handleVerify(null, 1)" plain :disabled="multiple"
                           v-hasPermi="['interview:visit:verify']">发布
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-circle-close" size="mini" @click="handleVerify(null, -1)" plain :disabled="multiple"
                           v-hasPermi="['interview:visit:verify']">下架
                </el-button>
            </el-col>
            <el-col :span="1.5" style="float: right">
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-col>
            <el-col :span="1.5" style="float: right">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            </el-col>
            <!--      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
        </el-row>

        <el-table v-loading="loading" ref="petitionTable" :data="petitionList"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column label="干部领导" align="center" prop="cadreName"/>
            <el-table-column label="干部机构名称" align="center" prop="unitName"/>
            <el-table-column label="干部职务" align="center" prop="cadreDuties" :show-overflow-tooltip="true"/>
            <el-table-column label="职责范围简介" align="center" prop="introduction" :show-overflow-tooltip="true"/>
            <el-table-column label="信访人姓名" align="center" prop="letterName"/>
            <el-table-column label="信访件编号" align="center" prop="letterCode"/>
            <el-table-column label="问题属地名称" align="center" prop="letterZoneName"/>
            <el-table-column label="类型" align="center" prop="type">
                <template slot-scope="scope">
                    <span>{{ scope.row.type == 0 ? "接访" : "下访"}}</span>
                </template>
            </el-table-column>
            <el-table-column label="接访时间" align="center" prop="interviewTime" width="180">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.interviewTime)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                        v-hasPermi="['interview:visit:edit']"
                    >修改
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['interview:visit:remove']"
                    >删除
                    </el-button>
                    <el-button
                        size="mini" v-show="scope.row.verifyStatus != 1"
                        type="text"
                        icon="el-icon-s-release"
                        @click="handleVerify(scope.row, 1)"
                        v-hasPermi="['interview:visit:verify']"
                    >发布
                    </el-button>
                    <el-button
                        size="mini" v-show="scope.row.verifyStatus == 1"
                        type="text"
                        icon="el-icon-circle-close"
                        @click="handleVerify(scope.row, -1)"
                        v-hasPermi="['interview:visit:verify']"
                    >下架
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total.petition>0"
                    :total="total.petition"
                    :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize"
                    @pagination="getList"/>

        <!-- 添加或修改干部信访事项信息对话框 -->
        <el-dialog :title="title.petition" :visible.sync="open.petition" width="90%" append-to-body>
            <el-form ref="petitionFrom" :model="form" :rules="rules">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label-width="100px" prop="letterCode" label="信访件编号">
                            <el-input v-model="form.letterCode" placeholder="请选择信访件" :disabled="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-button
                            type="default"
                            plain
                            icon="el-icon-plus"
                            @click="selectLetterOpen"
                        >选择
                        </el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label-width="10px" prop="letterName">
                            <el-input v-model="form.letterName" placeholder="信访人姓名" :disabled="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label-width="10px" prop="certificateNumber">
                            <el-input v-model="form.certificateNumber" placeholder="身份证号码" :disabled="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label-width="10px" prop="mobile">
                            <el-input v-model="form.mobile" placeholder="手机号码" :disabled="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label-width="10px" prop="zoneName">
                            <el-input v-model="form.letterZoneName" placeholder="问题属地" :disabled="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label-width="10px" prop="familyAddress">
                            <el-input v-model="form.familyAddress" placeholder="户口所在地" :disabled="true"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12" class="addhand">
                        <el-form-item label="群众诉求概括内容" prop="complaintContent">
                            <el-input v-model.trim="form.complaintContent" type="textarea" placeholder="请输入内容"  @input="onInput"
                                      style="min-height: 300px; height: 100%"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="3">
                                <el-button icon="el-icon-plus" style="width: 192px" @click="selectInterviewOpen(0)">
                                    选择干部领导<span style="color: red; font-size: 13px;padding-left: 7px;">*</span>
                                </el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9">
                                <div v-if="selectCheckCadre.length > 0">
                                    <div class="bald" v-for="(item, index) in selectCheckCadre" :key="item.cadreId">
                                        <image-preview :width="100" :height="100" :src="item.portrait"/>
                                        <div>
                                            <h4 v-text="item.cadreName"></h4>
                                            <p><span v-text="item.unitName"></span><span
                                                v-text="item.cadreDuties"></span></p>
                                            <p v-text="item.introduction"></p>
                                        </div>
                                    </div>
                                </div>
                                <div v-else="selectCheckCadre.length = 0" style="width: 500px;">
                                    <div class="bald">
                                        <img style="width: 100px; height: 100px" src="@/assets/images/profile.jpg"
                                             fit="fill">
                                        <div>
                                            <h4>请选择干部领导</h4>
                                            <p><span>干部领导机构名称</span><span>干部领导职务</span></p>
                                            <p>职责范围介绍职责范围介绍</p>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="接访时间" prop="interviewTime">
                            <el-date-picker clearable
                                            v-model="form.interviewTime"
                                            type="datetime"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            placeholder="请选择干部日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="接访地址" prop="zoneId">
                            <el-cascader
                                v-model="form.zoneId"
                                placeholder="请选择接访地址"
                                :props="zoneProps"
                                :options="zoneOptions"
                                :show-all-levels="false"
                                style="width: 130px"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="servedName">
                            <el-input v-model.trim="form.servedName" placeholder="请输入详细地址" maxlength="30"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="联络员姓名" prop="contactName" label-width="90px" maxlength="100">
                            <el-input v-model.trim="form.contactName" placeholder="请输入姓名"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="联络员电话" prop="contactMobile" label-width="90px">
                            <el-input v-model.trim="form.contactMobile" placeholder="请输入联系电话" maxlength="11"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="接访下访类型" prop="type">
                            <el-select v-model="form.type" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in visitType"
                                    :key="item.key"
                                    :label="item.label"
                                    :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="办理情况" prop="number">
                            <div class="slidetip">
                                <span>办理情况附件:</span>
                                <el-form-item label="上传图片" prop="examineList">
                                    <el-upload ref="transactList" :file-list="transactJson.file" :action="file.action"
                                               :headers="file.headers" :before-upload="fileBeforeUpload"
                                               :on-success="transactFileSuccess" :before-remove="transactFileRemove"
                                               list-type="picture-card" accept=".jpg, .png">
                                        <i class="el-icon-plus"></i>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </el-form-item>
                            </div>
                            <el-input type="textarea" placeholder="请输入内容" v-model.trim="transactJson.textarea"
                                      class="slidertext"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="领导批示" prop="number">
                            <div class="slidetip">
                                <span>领导批示附件：</span>
                                <el-form-item label="上传图片" prop="coprocessingList">
                                    <el-upload ref="instructionsList" :file-list="instructionsJson.file"
                                               :action="file.action"
                                               :headers="file.headers"
                                               :on-success="instructionsFileSuccess"
                                               :before-remove="instructionsFileRemove"
                                               list-type="picture-card" accept=".jpg, .png">
                                        <i class="el-icon-plus"></i>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </el-form-item>
                            </div>
                            <el-input class="slidertext" type="textarea" placeholder="请输入内容"
                                      v-model.trim="instructionsJson.textarea"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="" prop="number">
                            <div class="slidetip">
                                <span>接访下访现场：</span>
                                <el-form-item label="上传图片" prop="workableList">
                                    <el-upload ref="workableList" :file-list="interviewSceneJson.file"
                                               :action="file.action"
                                               :headers="file.headers" :before-upload="fileBeforeUpload"
                                               :on-success="interviewSceneFileSuccess"
                                               :before-remove="interviewSceneFileRemove"
                                               list-type="picture-card" accept=".jpg, .png">
                                        <i class="el-icon-plus"></i>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
                <el-button @click="selectPrintOpen" v-show="printButton">打印登记表</el-button>
            </div>
        </el-dialog>

        <!-- 选择信访件 -->
        <el-dialog title="信访件选择" :visible.sync="open.letter" width="65%" append-to-body>
            <el-form ref="queryLetterForm" :model="queryLetterParams" label-width="90px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="信访件编号" prop="letterCode">
                            <el-input v-model="queryLetterParams.letterCode" placeholder="请输入信访件编号"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="信访人姓名" prop="name">
                            <el-input v-model="queryLetterParams.name" placeholder="请输入信访人姓名"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="false">
                        <el-form-item label="问题属地" prop="zoneId">
                            <el-select v-model="queryLetterParams.zoneId">
                                <el-option
                                    v-for="item in zoneOptionsd"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="8">
                      <el-form-item label="本机构" prop="isCurrentOrg">
                        <el-checkbox v-model="queryLetterParams.isCurrentOrg"></el-checkbox>
                      </el-form-item>
                    </el-col>-->
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <el-form-item label="到访规模" prop="complaintNumberStart">
                            <el-input type="number" v-model="queryLetterParams.complaintNumberStart" :min="0"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="至" prop="complaintNumberEnd">
                            <el-input type="number" v-model="queryLetterParams.complaintNumberEnd" :min="0"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="信访日期" prop="receiveTime">
                            <el-date-picker v-model="receiveTime" style="width: 240px" unlink-panels
                                            value-format="yyyy-MM-dd"
                                            type="daterange"
                                            range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item><!-- label="评价情况"-->
                            <!--<el-checkbox v-model="queryLetterParams.badEvaluationOrg">对信访机构不满意</el-checkbox>
                            <el-checkbox v-model="queryLetterParams.badEvaluationDuty">对责任单位不满意</el-checkbox>
                            <el-checkbox v-model="queryLetterParams.noSupportDuty">责任单位未解决</el-checkbox>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" size="mini" @click="searchLetter">搜索
                            </el-button>
                            <el-button icon="el-icon-refresh" size="mini" @click="resetQueryLetter">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table ref="letterTable" v-loading="loading" :data="letterList" @select="selectLetterCheck"
                      @selection-change="selectLetterChange">
                <el-table-column type="selection" width="55" align="center"/>
                <el-table-column label="信访件编号" width="180" align="center" prop="letterCode"/>
                <el-table-column label="信访人" align="center" prop="name"/>
                <el-table-column label="信访日期" align="center" prop="receiveTime">
                    <template slot-scope="scope">{{ parseTime(scope.row.receiveTime, '{y}-{m}-{d}') }}</template>
                </el-table-column>
                <el-table-column label="处理机构" align="center" prop="handleUnitName"/>
                <el-table-column label="送达日期" align="center" prop="deliveryTime"/>
                <el-table-column label="信件状态" align="center" prop="handleStateName"/>
                <!--<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-edit"
                      @click="handleUpdate(scope.row)"
                      v-hasPermi="['interview:visit:edit']"
                    >查看
                    </el-button>
                  </template>
                </el-table-column>-->
            </el-table>
            <pagination v-show="total.letter>0" :total="total.letter" :page.sync="queryLetterParams.pageNum"
                        :limit.sync="queryLetterParams.pageSize" @pagination="selectLetterList"/>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="selectLetterOK">确 定</el-button>
                <el-button @click="selectLetterClose">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 选择接访下访领导人员 -->
        <el-dialog :title="title.interview" :visible.sync="open.interview" width="50%" append-to-body
                   :before-close="selectInterviewClose">
            <el-form ref="queryInterviewForm" :model="queryVisitParams" label-width="90px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="领导姓名" prop="cadreName">
                            <el-input
                                v-model="queryVisitParams.cadreName"
                                placeholder="请输入干部领导姓名"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="领导机构名称" prop="unitName" label-width="100px">
                            <el-input
                                v-model="queryVisitParams.unitName"
                                placeholder="请输入干部领导机构名称"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="干部职务" prop="cadreDuties">
                            <el-input
                                v-model="queryVisitParams.cadreDuties"
                                placeholder="请输入干部职务"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="领导级别" prop="cadreLevel">
                            <el-select v-model="queryVisitParams.cadreLevel" placeholder="请选择领导级别">
                                <el-option
                                    v-for="dict in dict.type.leader_level"
                                    :key="dict.value"
                                    :label="dict.label"
                                    :value="dict.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="领导机构类别" prop="cadreUnitType" label-width="100px">
                            <el-select v-model="queryVisitParams.cadreUnitType" placeholder="请选择领导机构类别"
                                       style="width: 200px">
                                <el-option
                                    v-for="dict in dict.type.leader_unit_type"
                                    :key="dict.value"
                                    :label="dict.label"
                                    :value="dict.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" size="mini" @click="selectInterview">搜索
                            </el-button>
                            <el-button icon="el-icon-refresh" size="mini" @click="resetQueryInterview">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table ref="interviewTable" v-loading="loading" :data="interviewList" highlight-current-row
                      @current-change="selectInterviewOne">
                <el-table-column type="index" width="55" align="center"/>
                <el-table-column label="头像" align="center" prop="portrait" width="100">
                    <template slot-scope="scope">
                        <image-preview :src="scope.row.portrait" :width="50" :height="50"/>
                    </template>
                </el-table-column>
                <el-table-column label="领导姓名" align="center" prop="cadreName" width="100"
                                 :show-overflow-tooltip="true"/>
                <el-table-column label="领导机构名称" align="center" prop="unitName" width="120"/>
                <el-table-column label="领导职务" align="center" prop="cadreDuties" width="100"
                                 :show-overflow-tooltip="true"/>
                <el-table-column label="职责范围简介" align="center" prop="introduction" :show-overflow-tooltip="true"/>
                <el-table-column label="接访下访次数" align="center" prop="packCaseNums" width="80"/>
            </el-table>
            <pagination v-show="total.interview>0" :total="total.interview" :page.sync="queryVisitParams.pageNum"
                        :limit.sync="queryVisitParams.pageSize" @pagination="selectInterview"/>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="selectInterviewOK">确 定</el-button>
                <el-button @click="selectInterviewClose">取 消</el-button>
            </div>
        </el-dialog>


        <!--  打印登记表-->
        <el-dialog title="打印登记表" :visible.sync="open.print" width="50%" append-to-body>
            <div class="page print-div">
                <h2>接访下访干部登记表</h2>
                <div style="height:30px;margin:0 auto ">
                    <div style="float:right;text-align:right"></div>
                </div>
                <table class="tabPrint" cellSpacing="0" cellPadding="0" border="0" style='width:100%'>
                    <thead>
                    <tr>
                        <th style='width:10%'></th>
                        <th style='width:10%'></th>
                        <th style='width:10%'></th>
                        <th style='width:10%'></th>
                        <th style='width:10%'></th>
                        <th style='width:10%'></th>
                        <th style='width:10%'></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td align="center" colspan="2" class="nowrap">日期</td>
                        <td colspan="2"><p>{{ printData.interviewTime }}</p></td>
                        <td align="center" colspan="1">接访地点</td>
                        <td colspan="2"><p>{{ printData.cadreZoneName }}</p></td>
                        <td align="center" colspan="1">接访领导</td>
                        <td colspan="2"><p>{{ printData.cadreName }}</p></td>
                    </tr>
                    <tr>
                        <td align="center" colspan="2">来访群众姓名</td>
                        <td colspan="2"><p>{{ printData.letterName }}</p></td>
                        <td colspan="1" align="center">身份证号码</td>
                        <td colspan="5"><p>{{ printData.certificateNumber }}</p></td>
                    </tr>
                    <tr>
                        <td align="center" colspan="2">联系方式(手机号码)</td>
                        <td colspan="2">{{ printData.mobile }}</td>
                        <td align="center" colspan="1">户籍所在地</td>
                        <td colspan="5">{{ printData.familyAddress }}<p></p></td>
                    </tr>
                    <tr align="center" class="max-height">
                        <td colspan="2">群众诉求</td>
                        <td colspan="8" valign="top" align="left">
                            <p>{{ printData.complaintContent }}</p>
                        </td>
                    </tr>
                    <tr align="center">
                        <td colspan="2">办理情况</td>
                        <td colspan="8" class="tablesign" valign="top" align="left">
                            <p>{{ printData.transact }}</p>
                        </td>
                    </tr>
                    <tr align="center">
                        <td colspan="2">领导批示</td>
                        <td colspan="8" class="tablesign" valign="top" align="left">
                            <p>{{ printData.instructions }}</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" colspan="2">记录人</td>
                        <td colspan="3">
                            <p></p>
                        </td>
                        <td align="center" colspan="2">日期</td>
                        <td colspan="3">
                            <p></p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="print">打印</el-button>
                <el-button @click="selectPrintClose">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {
        listPetition,
        getVisitPetition,
        delPetition,
        addPetition,
        updatePetition,
        listLetter,verifyVisit
    } from "@/api/backstage/interview/visit";
    import {getToken} from "@/utils/auth";
    import {initZoneList} from "@/api/common/common";
    import {listCadre} from "@/api/backstage/interview/cadre";
    import {printHTML} from "@/utils/common";
    import {initNowDate} from "@/utils/index";
    import printTemplate from "@/api/backstage/interview/twig/petition.twig";
    import {isExternal} from "@/utils/validate";

    export default {
        name: "Visit",
        dicts: ['sys_normal_disable', 'leader_level', 'leader_unit_type', 'sys_normal_disable'],
        data() {
            var validatePhone = (rule, value, callback) => {
                const reg = /^(?:\+?86)?1[3-9]\d{9}$/;
                if (value && !reg.test(value)) {
                    callback(new Error('手机号码格式错误'));
                } else {
                    callback();
                }
            };
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
                //打印
                printButton: false,
                printData: {},
                // 总条数
                total: {
                    petition: 0,    //干部事项
                    letter: 0,    //信访件
                    unit: 0,     //参与单位
                    interview: 0,  //干部领导
                },
                // 干部信访事项信息表格数据
                petitionList: [],
                // 弹出层标题
                title: {
                    petition: "",
                    interview: ""
                },
                // 是否显示弹出层
                open: {
                    petition: false,  //接访下访事项
                    letter: false,   //信访事项弹框
                    interview: false,   //接访领导弹框
                    print: false,    //打印登记表
                },
                //地区参数
                zoneProps: {
                    label: "name",
                    value: "id",
                    checkStrictly: true,
                    emitPath: false,
                },
                zoneOptions: [],
                zoneOptionsd: [{
                    label: "全地市",
                    value: process.env.VUE_APP_SHORT_ZONE_ID,
                    key: process.env.VUE_APP_SHORT_ZONE_ID,
                }],
                // 接访下访事项查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    letterCode: null,
                    letterName: null,
                    letterZoneId: "",
                    cadreLevel: "",
                    cadreUnitType: "",
                    type: "",
                },
                // 多个Id
                visitIds: "",
                visitType: [
                    {key: 0, label: "接访"},
                    {key: 1, label: "下访"},
                ],
                // 日期范围
                dateRange: initNowDate(),
                // 表单参数
                form: {},
                transactJson: {number: 0, file: []},   //办理情况JSON
                instructionsJson: {number: 0, file: []},//领导批示JSON
                interviewSceneJson: {number: 0, file: []},    //接访下访现场JSON
                //上传文件
                file: {
                    action: process.env.VUE_APP_BASE_API + "/common/upload",
                    headers: {Authorization: "Bearer " + getToken()},// 设置上传的请求头部
                    fileType: 'image/jpeg,image/jpg,image/png',
                },
                // 表单校验
                rules: {
                    letterCode: [
                        {required: true, message: "请选择信访件", trigger: "blur"},
                    ],
                    interviewTime: [
                        {required: true, message: "接访下访时间不能为空", trigger: "blur"},
                    ],
                    zoneId: [
                        {required: true, message: "接访下访地址不能为空", trigger: "blur"},
                    ],
                    type: [
                        {required: true, message: "接访下访类型不能为空", trigger: "blur"},
                    ],
                    contactMobile: [{validator: validatePhone,}]
                },

                //信访事项表单查询参数
                queryLetterParams: {
                    pageNum: 1,
                    pageSize: 10,
                    // zoneId:"6401",
                    letterCode: null,
                    name: null,
                    complaintNumberEnd: "",
                    complaintNumberStart: "",
                },
                receiveTime: initNowDate(),
                letterList: [],
                letterOne: null,

                //干部领导查询参数
                queryVisitParams: {
                    pageNum: 1,
                    pageSize: 10,
                    unitName: null,
                    cadreName: null,
                    cadreDuties: "",
                    cadreLevel: "",
                    cadreUnitType: "",
                },
                interviewList: [],
                selectCheckCadre: [],//组长
                cadreZoneName: null,

            };
        },
        created() {
            this.initZone();
            this.getList();
        },
        methods: {
            // 初始化行政区域
            initZone() {
                initZoneList({id: process.env.VUE_APP_ZONE_ID}).then(response => {
                    this.zoneOptions = [];
                    this.zoneOptions = response;
                });
            },
            /** 查询干部信访事项信息列表 */
            getList() {
                this.loading = true;
                listPetition(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                    this.petitionList = response.rows;
                    this.total.petition = response.total;
                    this.loading = false;
                });
            },
            //实时刷新数据
            onInput() {
                this.$forceUpdate();
            },
            // 取消按钮
            cancel() {
                this.open.petition = false;
                this.reset();
            },
            // 表单重置
            reset() {
                this.resetForm("petitionForm");
                this.form = {};
                this.dateRange = initNowDate();
                this.transactJson = {number: 0, file: []};
                this.instructionsJson = {number: 0, file: []};
                this.interviewSceneJson = {number: 0, file: []};
                this.checketUnit = [];
                this.selectCheckCadre = [];//组长
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageNum = 1;
                this.getList();
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.queryParams.cadreLevel = "";
                this.queryParams.cadreUnitType = "";
                this.dateRange = initNowDate();
                this.resetForm("queryForm");
                this.handleQuery();
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.visitId);
                this.single = selection.length !== 1;
                this.multiple = !selection.length;
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.reset();
                this.open.petition = true;
                this.printButton = false;
                this.title.petition = "添加接访下访管理信息";
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset();
                this.printButton = true;
                const visitId = row.visitId || this.ids;
                getVisitPetition(visitId).then(response => {
                    this.form = response.data;
                    this.transactJson = JSON.parse(this.form.transactJson);
                    this.instructionsJson = JSON.parse(this.form.instructionsJson);
                    this.interviewSceneJson = JSON.parse(this.form.interviewSceneJson);

                    //处理干部领导信息
                    this.selectCheckCadre = this.form.interviewList;
                    this.open.petition = true;
                    this.title.petition = "修改接访下访管理信息";
                });
            },
            /** 提交按钮 */
            submitForm() {
                this.$refs["petitionFrom"].validate(valid => {
                    if (valid) {
                        this.form.transactJson = JSON.stringify(this.transactJson);
                        this.form.instructionsJson = JSON.stringify(this.instructionsJson);
                        this.form.interviewSceneJson = JSON.stringify(this.interviewSceneJson);
                        //处理干部组员
                        this.form.cadreId = this.selectCheckCadre.map(obj => obj.cadreId).join(",");

                        if (!this.form.cadreId) {
                            this.$message.error('请选择干部领导！');
                            return;
                        }

                        if (this.form.visitId != null) {
                            updatePetition(this.form).then(response => {
                                this.$modal.msgSuccess("修改成功");
                                this.open.petition = false;
                                this.getList();
                            });
                        } else {
                            addPetition(this.form).then(response => {
                                this.$modal.msgSuccess("新增成功");
                                this.open.petition = false;
                                this.getList();
                            });
                        }
                    }
                });
            },
            /** 删除按钮操作 */
            handleDelete(row) {
                const visitIds = row.visitId || this.ids;
                this.$modal.confirm('是否确认删除接访下访事项信息？').then(function () {
                    return delPetition(visitIds);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("删除成功");
                }).catch(() => {
                });
            },
            /** 导出按钮操作 */
            handleExport(row) {
                this.queryParams.visitIds = row.visitId || this.ids;
                this.download('interview/visit/export', {
                    ...this.queryParams
                }, `接访下访事项信息_${new Date().getTime()}.xlsx`)
            },
            /**  发布/下架  **/
            handleVerify(row, status){
                var data = {
                    visitIds : row ? [row.visitId] : this.ids,
                    verifyStatus: status,
                };
                const msg = status == 1 ? '发布' : '下架';
                this.$modal.confirm('确认 "'+msg+'" 接访下访事项？').then(function () {
                    return verifyVisit(data);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess(msg+"成功");
                }).catch(() => {
                });
            },
            /******************************* 信访件选择 ************************************* */
            searchLetter() {
                this.queryLetterParams.pageNum = 1;
                this.selectLetterList();
            },

            /** 重置按钮操作 */
            resetQueryLetter() {
                this.receiveTime = initNowDate();
                this.resetForm("queryLetterForm");
                this.searchLetter();
            },

            selectLetterOpen() {
                this.open.letter = true;
            },
            selectLetterList() {
                this.loading = true;
                listLetter(this.addDateRange(this.queryLetterParams, this.receiveTime)).then(response => {
                    this.letterList = response.rows;
                    this.total.letter = response.total;
                    this.loading = false;
                });
            },
            selectLetterClose() {
                this.open.letter = false;
            },
            selectLetterOK() {//确定按钮
                var letter = this.letterOne;
                if (letter) {
                    this.form.letterCode = letter.letterCode;//编号
                    this.form.letterName = letter.name;   //信访人名称
                    this.form.complaintContent = letter.complaintContent;//概况
                    //问题属地
                    this.form.letterZoneName = letter.zoneName;
                    this.form.letterZoneId = letter.zoneId;
                    this.form.objectId = letter.objectId;
                    this.form.certificateNumber = letter.certificateNumber;//证件号码
                    this.form.familyAddress = letter.familyAddress;//户口所在地
                    this.form.mobile = letter.mobile;   //手机号码
                    this.form.letterType = letter.letterType;   //信访形式
                    this.form.letterTypeName = letter.letterTypeName;   //信访形式
                    if (letter.registerTime) this.form.registerTime = new Date(letter.registerTime);   //登记日期
                    this.form.contentType = letter.contentType;   //内容分类
                    this.form.contentTypeName = letter.contentTypeName;   //内容分类
                    this.$refs.letterTable.clearSelection();
                    this.selectLetterClose();
                } else {
                    this.$message.error('请选择信访件！');
                }
            },
            selectLetterCheck(selection, row) {
                // 清除 所有勾选项
                this.$refs.letterTable.clearSelection();
                // 当表格数据都没有被勾选的时候 就返回
                // 主要用于将当前勾选的表格状态清除
                if (selection.length == 0) return;
                this.$refs.letterTable.toggleRowSelection(row, true);
            },
            selectLetterChange(val) {// 表格的选中 可以获得当前选中的数据
                this.letterOne = (val.length > 0) ? val[0] : null;
            },

            /*********************************************     干部领导选择     *****************************************************/
            selectInterview() {
                this.loading = true;
                listCadre(this.queryVisitParams).then(response => {
                    this.interviewList = response.rows;
                    this.total.interview = response.total;
                    this.loading = false;
                });
            },

            /** 重置按钮操作 */
            resetQueryInterview() {
                this.resetForm("queryInterviewForm");
                this.selectInterview();
            },

            selectInterviewOpen(type) {
                this.resetForm("queryInterviewForm");
                this.open.interview = true;
                this.queryVisitParams.pageNum = 1;
                this.title.interview = "选择干部领导";
                this.selectInterview();
            },
            selectInterviewClose() {
                this.selectCheckCadre = [];
                this.open.interview = false;
            },
            selectInterviewOK() {
                if (this.selectCheckCadre.length == 1) {
                    this.open.interview = false;
                } else if (this.selectCheckCadre.length == 0) {
                    this.$message.error('请选择干部领导！');
                } else {
                    this.$message.error('干部领导只能选择一个！');
                }
            },
            checkInterview(selection) {
                this.selectCheckCadre = selection;

            }, selectInterviewOne(row) {
                if (row)
                    this.selectCheckCadre = [row];
            },
            /**************************************************   上传图片    ****************************************/
            // 办理情况JSON   文件上传成功处理
            transactFileSuccess(response, file, fileList) {
                this.transactJson.file.push({
                    url: this.realImgSrc(response.fileName),
                    fileName: response.fileName
                });
            },//办理情况JSON   文件删除处理
            transactFileRemove(file, fileList) {
                if (file.status === 'ready' && this.file.fileType.indexOf(file.raw.type) < 0) {
                    this.$message.error('只能上传是 JPG / PNG 格式文件!');
                    return;
                }
                this.transactJson.file.splice(this.transactJson.file.indexOf(file), 1);
            },
            //领导批示JSON    文件上传成功处理
            instructionsFileSuccess(response, file, fileList) {
                this.instructionsJson.file.push({
                    url: this.realImgSrc(response.fileName),
                    fileName: response.fileName
                });
            },//领导批示JSON    文件删除处理
            instructionsFileRemove(file, fileList) {
                if (file.status === 'ready' && this.file.fileType.indexOf(file.raw.type) < 0) {
                    this.$message.error('只能上传是 JPG / PNG 格式文件!');
                    return;
                }
                this.instructionsJson.file.splice(this.instructionsJson.file.indexOf(file), 1);
            },
            //接访下访现场JSON    文件上传成功处理
            interviewSceneFileSuccess(response, file, fileList) {
                this.interviewSceneJson.file.push({
                    url: this.realImgSrc(response.fileName),
                    fileName: response.fileName
                });
            },//接访下访现场JSON    文件删除处理
            interviewSceneFileRemove(file, fileList) {
                if (file.status === 'ready' && this.file.fileType.indexOf(file.raw.type) < 0) {
                    this.$message.error('只能上传是 JPG / PNG 格式文件!');
                    return;
                }
                this.interviewSceneJson.file.splice(this.interviewSceneJson.file.indexOf(file), 1);
            },
            realImgSrc(src) {
                if (!src) {
                    return;
                }
                let real_src = src.split(",")[0];
                if (isExternal(real_src)) {
                    return real_src;
                }
                return process.env.VUE_APP_BASE_API + real_src;
            },
            //文件上传前处理
            fileBeforeUpload(file){
                return !(this.file.fileType.indexOf(file.type) < 0);
            },
            /*********************************************    打印登记表         **********************************************************/
            selectPrintOpen() {
                this.open.print = true;
                //信访件信息
                this.printData.letterName = this.form.letterName;
                this.printData.certificateNumber = this.form.certificateNumber;
                this.printData.complaintContent = this.form.complaintContent;
                this.printData.mobile = this.form.mobile;
                this.printData.familyAddress = this.form.familyAddress;

                //干部信息
                this.printData.interviewTime = this.form.interviewTime;
                this.printData.transact = this.transactJson.textarea;
                this.printData.instructions = this.instructionsJson.textarea;

                //人员信息
                this.printData.cadreName = this.selectCheckCadre.map(obj => obj.cadreName)[0];

                this.printData.cadreZoneName = this.form.cadreZoneName

            },
            selectPrintClose() {
                this.open.print = false;
            },
            print() {
                let html = printTemplate({
                    title: '领导干部登记表',
                    petition: this.printData
                })
                printHTML(html)
            }
        },
    };
</script>
<style scoped lang="scss">
    ///deep/ .custonStyle .el-dialog__body {
    //  border-top: 1px solid #ccc;
    //}
    //
    ///deep/ .el-transfer {
    //  display: flex;
    //}
    ///deep/ .el-button+.el-button{margin-left: 0px;}
    ///deep/ .el-button [class*=el-icon-]+span{margin-left: 0px;}
    ///deep/ .el-transfer__buttons {
    //
    //}
    //
    ///deep/ .el-transfer__buttons .is-with-texts {
    //  height: 40px;
    //  display: block;
    //  line-height: 40px;
    //  padding: 0 20px;
    //
    //}
    .bald {
        margin-top: 20px;
        display: flex;
        align-items: flex-start;

        img {
            width: 100px;
            height: 100px
        }

        div {
            margin-left: 20px;

            h4 {
                font-size: 16px;
                font-weight: bold;
                margin: 0 0 5px 0;
            }

            p {
                margin: 0;

                span {
                    margin-right: 10px;
                }
            }
        }
    }

    .slidernub {
        width: 100%;
        margin-top: 40px;

        .el-slider {
            width: calc(100% - 85px);;
            display: inline-block;
            vertical-align: middle;
        }

        p {
            display: inline-block;
            margin: 0;
            width: 85px;
        }
    }

    .slidetip {
        margin-top: 10px;

        button {
            margin-right: 10px;
        }
    }

    .el-checkbox-group {
        display: inline-block;
    }
</style>
<style lang="scss">
    .addhand textarea {
        height: 300px;
    }

    .slidertext {
        margin-top: 10px;

        textarea {
            height: 100px;
        }
    }

    .page {
        min-height: 20cm;
        padding: 0.5cm;
    }

    .page table {
        margin: 0 auto
    }

    .tabPrint {
        border-collapse: collapse;
    }

    .tabPrint td {
        border: #000000 solid 1px;
        height: 21px;
        padding: 2px;
    }

    table.tabPrint {
        border-right: #000000 solid 1px;
        border-bottom: #000000 solid 1px;
    }

    .linetd {
        border-bottom: solid 1px #000;
    }

    .print-div h2 {
        text-align: center;
        font-family: HeiTi
    }

    .print-div tbody tr {
        height: 50px
    }

    .tabPrint .max-height td {
        height: 100px;
    }

    .tabPrint .nowrap {
        white-space: nowrap;
    }

    .tablesign {
        position: relative;
        height: 1.5cm !important;
    }

    .butlist {
        .el-button--small {
            padding: 9px 15px;
            font-size: 12px;
            border-radius: 3px;
            margin-right: 10px;
            margin-bottom: 10px;
        }

        .el-button + .el-button {
            margin-left: 0;
        }

        .flexstart {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-content: center;
            justify-content: flex-start;
            align-items: flex-start;
        }

        label {
            white-space: nowrap !important;
        }
    }

    .print-div h2 {
        text-align: center;
        font-family: HeiTi
    }

    .print-div tbody tr {
        height: 50px
    }

    .tabPrint .max-height td {
        height: 100px;
    }

    .tabPrint .nowrap {
        white-space: nowrap;
    }

    .tablesign {
        position: relative;
        height: 1.5cm !important;
    }
</style>
