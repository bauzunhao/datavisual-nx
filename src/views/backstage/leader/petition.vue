<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="100px">
            <el-form-item label="信访件编号" prop="letterCode" >
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
            <el-form-item label="包案起始时间" prop="leaderTime">
                <el-date-picker
                    v-model="leaderTime"
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
            <el-row class="butlist">
                <el-form-item label="包案领导级别：" label-width="110px" class="flexstart">
                    <el-radio-group v-model="queryParams.leaderLevel" size="small">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button
                            v-for="dict in dict.type.leader_level"
                            :key="dict.value"
                            :label="dict.value"
                        >{{ dict.label }}
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="领导机构类别：" label-width="110px" class="flexstart">
                    <el-radio-group v-model="queryParams.leaderUnitType" size="small">
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
                    v-hasPermi="['leader:petition:add']"
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
                    v-hasPermi="['leader:petition:remove']"
                >删除
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport" plain
                           v-hasPermi="['leader:petition:export']">导出
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" icon="el-icon-s-release" size="mini" @click="handleVerify(null, 1)" plain :disabled="multiple"
                           v-hasPermi="['leader:petition:verify']">发布
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" icon="el-icon-circle-close" size="mini" @click="handleVerify(null, -1)" plain :disabled="multiple"
                           v-hasPermi="['leader:petition:verify']">下架
                </el-button>
            </el-col>
            <el-col :span="1.5" style="float: right">
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-col>
            <el-col :span="1.5" style="float: right">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            </el-col>
<!--            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
        </el-row>

        <el-table v-loading="loading" ref="petitionTable" :data="petitionList"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column label="包案领导" align="center" prop="leaderName"/>
            <el-table-column label="领导机构名称" align="center" prop="unitName"/>
            <el-table-column label="领导职务" align="center" prop="duties" :show-overflow-tooltip="true"/>
            <el-table-column label="职责范围简介" align="center" prop="introduction" :show-overflow-tooltip="true"/>
            <el-table-column label="参与单位" align="center" prop="joinUnitName" :show-overflow-tooltip="true"/>
            <el-table-column label="信访件编号" align="center" prop="letterCode"/>
            <el-table-column label="信访人姓名" align="center" prop="letterName"/>
            <el-table-column label="问题属地" align="center" prop="letterZoneName"/>
            <el-table-column label="包案开始时间" align="center" prop="startLeaderTime" width="180">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.startLeaderTime, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="包案结束时间" align="center" prop="endLeaderTime" width="180">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.endLeaderTime, '{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                        v-hasPermi="['leader:petition:edit']"
                    >修改
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['leader:petition:remove']"
                    >删除
                    </el-button>
                    <el-button
                        size="mini" v-show="scope.row.verifyStatus != 1"
                        type="text"
                        icon="el-icon-s-release"
                        @click="handleVerify(scope.row, 1)"
                        v-hasPermi="['leader:petition:verify']"
                    >发布
                    </el-button>
                    <el-button
                        size="mini" v-show="scope.row.verifyStatus == 1"
                        type="text"
                        icon="el-icon-circle-close"
                        @click="handleVerify(scope.row, -1)"
                        v-hasPermi="['leader:petition:verify']"
                    >下架
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total.petition>0" :total="total.petition" :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize" @pagination="getList"/>

        <!-- 添加或修改包案信访事项信息对话框 -->
        <el-dialog :title="title.petition" :visible.sync="open.petition" width="90%" append-to-body>
            <el-form ref="petitionFrom" :model="form" :rules="rules">
                <el-row>
                    <el-col :span="5">
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
                    <el-col :span="2">
                        <el-form-item label-width="5px" prop="letterName">
                            <el-input v-model="form.letterName" placeholder="信访人姓名" :disabled="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label-width="5px" prop="certificateNumber">
                            <el-input v-model="form.certificateNumber" placeholder="身份证号码" :disabled="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label-width="5px" prop="mobile">
                            <el-input v-model="form.mobile" placeholder="手机号码" :disabled="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label-width="5px" prop="zoneName">
                            <el-input v-model="form.letterZoneName" placeholder="问题属地" :disabled="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label-width="80px" prop="leaderTime" label="包案日期">
                            <el-date-picker v-model="dialogLeaderTime" style="width: 240px" unlink-panels
                                            value-format="yyyy-MM-dd"
                                            type="daterange"
                                            range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="50">
                    <el-col :span="9" class="addhand">
                        <el-form-item label="概况内容" prop="complaintContent">
                            <el-input v-model.trim="form.complaintContent" type="textarea" placeholder="请输入内容"  @input="onInput"
                                      style="min-height: 300px; height: 100%"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="15">
                        <el-form-item label-position="top" label="参与单位选择" prop="checketHandelUnit">
                            <el-transfer style="text-align: left; display: inline-block;width: 100%"
                                         v-model="checketHandelUnit"
                                         :titles="['经办单位', '包案参与单位']"
                                         :button-texts="['移除', '加入']"
                                         :data="handleUnit"/>
                            <div style="position: absolute;right: -60px;top: 36px;width: 200px">
                                <el-button @click="selectUnitOpen" icon="el-icon-plus">选择参与单位</el-button>
                                <div v-if="checketUnit.length > 0">
                                    <p v-for="(item, index) in checketUnit">
                                        <span v-text="item.joinUnitName"></span>
                                    </p>
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <el-form-item prop="selectCheckLeader" label="">
                            <el-button icon="el-icon-plus" style="width: 192px" @click="selectLeaderOpen(0)"> 选择包案领导
                                <span style="color: red; font-size: 13px;padding-left: 7px;">*</span>
                            </el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-button icon="el-icon-plus" style="width: 192px" @click="selectLeaderOpen(1)"> 选择副组长
                            </el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-button icon="el-icon-plus" style="width: 192px" @click="selectLeaderOpen(2)"> 选择组员
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <div v-if="selectCheckLeader.length > 0">
                            <div class="bald" v-for="(item, index) in selectCheckLeader" :key="item.leaderId">
                                <image-preview :width="100" :height="100" :src="item.portrait"/>
                                <div>
                                    <h4 v-text="item.leaderName"></h4>
                                    <p><span v-text="item.unitName"></span><span v-text="item.duties"></span></p>
                                    <p v-text="item.introduction"></p>
                                </div>
                            </div>
                        </div>
                        <div v-else="selectCheckLeader.length = 0">
                            <div class="bald">
                                <img style="width: 100px; height: 100px" src="@/assets/images/profile.jpg" fit="fill">
                                <div>
                                    <h4>请选择包案领导</h4>
                                    <p><span>包案领导机构名称</span><span>包案领导职务</span></p>
                                    <p>职责范围介绍职责范围介绍</p>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="9">
                        <div v-if="selectCheckDeputy.length > 0">
                            <div class="bald" v-for="(item, index) in selectCheckDeputy" :key="item.leaderId">
                                <image-preview :width="100" :height="100" :src="item.portrait"/>
                                <div>
                                    <h4 v-text="item.leaderName"></h4>
                                    <p><span v-text="item.unitName"></span><span v-text="item.duties"></span></p>
                                    <p v-text="item.introduction"></p>
                                </div>
                            </div>
                        </div>
                        <div v-else="selectCheckDeputy.length = 0">
                            <div class="bald">
                                <img style="width: 100px; height: 100px" src="@/assets/images/profile.jpg" fit="fill">
                                <div>
                                    <h4>请选择副组长</h4>
                                    <p><span>包案领导机构名称</span><span>包案领导职务</span></p>
                                    <p>职责范围介绍职责范围介绍</p>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="bald">
                            <div>
                                <h4>组员名单</h4>
                                <div v-if="selectCheckTeam.length > 0">
                                    <p v-for="(item, index) in selectCheckTeam" :key="item.leaderId">
                                        <span v-text="item.leaderName">组员姓名</span><span v-text="item.duties">职务</span>
                                    </p>
                                </div>
                                <div v-else="selectCheckTeam.length = 0">
                                    <p><span>请选择组员</span></p>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="50" style="display: flex;flex-wrap: wrap;">
                    <el-col :span="12">
                        <el-form-item label="包案进展" prop="number">
                            <div class="slidernub">
                                <p>摸排调查</p>
                                <el-slider v-model="examineJson.number" show-input></el-slider>
                            </div>
                            <el-input type="textarea" placeholder="请输入文本内容，建议文本内容不超过55个字符" v-model.trim="examineJson.textarea"
                                      class="slidertext" maxlength="250" show-word-limit/>
                            <div class="slidetip">
                                <span>摸排调查现场：</span>
                                <el-form-item label="上传图片" prop="examineList">
                                    <el-upload ref="examineList" :file-list="examineJson.file" :action="file.action"
                                               :headers="file.headers" :before-upload="fileBeforeUpload"
                                               :on-success="examineFileSuccess" :before-remove="examineFileRemove"
                                               list-type="picture-card" accept=".jpg, .png">
                                        <i class="el-icon-plus"></i>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="" prop="number">
                            <div class="slidernub">
                                <p>协调处理</p>
                                <el-slider v-model="coprocessingJson.number" show-input></el-slider>
                            </div>
                            <el-input class="slidertext" type="textarea" placeholder="请输入文本内容，建议文本内容不超过55个字符"
                                      v-model.trim="coprocessingJson.textarea"  maxlength="250" show-word-limit/>
                            <div class="slidetip">
                                <span>协调处理现场：</span>
                                <el-form-item label="上传图片" prop="coprocessingList">
                                    <el-upload ref="coprocessingList" :file-list="coprocessingJson.file"
                                               :action="file.action"
                                               :headers="file.headers" :before-upload="fileBeforeUpload"
                                               :on-success="coprocessingFileSuccess"
                                               :before-remove="coprocessingFileRemove"
                                               list-type="picture-card" accept=".jpg, .png">
                                        <i class="el-icon-plus"></i>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="" prop="number">
                            <div class="slidernub">
                                <p>督查落实</p>
                                <el-slider
                                    v-model="workableJson.number"
                                    show-input>
                                </el-slider>
                            </div>
                            <el-input class="slidertext" type="textarea" placeholder="请输入文本内容，建议文本内容不超过55个字符"
                                      v-model.trim="workableJson.textarea" maxlength="250" show-word-limit/>
                            <div class="slidetip">
                                <span>督查落实现场：</span>
                                <el-form-item label="上传图片" prop="workableList">
                                    <el-upload ref="workableList" :file-list="workableJson.file" :action="file.action"
                                               :headers="file.headers" :before-upload="fileBeforeUpload"
                                               :on-success="workableFileSuccess" :before-remove="workableFileRemove"
                                               list-type="picture-card" accept=".jpg, .png">
                                        <i class="el-icon-plus"></i>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="" prop="number">
                            <div class="slidernub">
                                <p>包清情况</p>
                                <el-slider
                                    v-model="situationJson.number"
                                    show-input>
                                </el-slider>
                            </div>
                            <el-input class="slidertext" type="textarea" placeholder="请输入文本内容，建议文本内容不超过280个字符"
                                      v-model.trim="situationJson.textarea" maxlength="2000" show-word-limit/>
                            <div class="slidetip">
                                <span>包清情况：</span>
                                <el-radio-group style="display: inline-block;" v-model="situationJson.checkRadio"
                                                size="medium">
                                    <el-radio border label="推进化解"></el-radio>
                                    <el-radio border label="已化解"></el-radio>
                                    <el-radio border label="信访人满意"></el-radio>
                                </el-radio-group>
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
                      v-hasPermi="['leader:petition:edit']"
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

        <!-- 选择包案人员 -->
        <el-dialog :title="title.leader" :visible.sync="open.leader" width="50%" append-to-body
                   :before-close="selectLeaderClose">
            <el-form ref="queryLeaderForm"
                     :model="queryLeaderParams" label-width="90px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="领导姓名" prop="leaderName">
                            <el-input
                                v-model="queryLeaderParams.leaderName"
                                placeholder="请输入包案领导姓名"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="领导机构名称" prop="unitName" label-width="100px">
                            <el-input
                                v-model="queryLeaderParams.unitName"
                                placeholder="请输入包案领导机构名称"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="领导职务" prop="duties">
                            <el-input
                                v-model="queryLeaderParams.duties"
                                placeholder="请输入包案领导职务"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="领导级别" prop="leaderLevel">
                            <el-select v-model="queryLeaderParams.leaderLevel" placeholder="请选择领导级别" clearable>
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
                        <el-form-item label="领导机构类别" prop="leaderUnitType" label-width="100px">
                            <el-select v-model="queryLeaderParams.leaderUnitType" placeholder="请选择领导机构类别"
                                       style="width: 200px" clearable>
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
                            <el-button type="primary" icon="el-icon-search" size="mini" @click="selectLeader">搜索
                            </el-button>
                            <el-button icon="el-icon-refresh" size="mini" @click="resetQueryLeader">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table ref="leaderTable" v-show="leaderType == 2" v-loading="loading" :data="leaderList"
                      @selection-change="checkLeader">
                <el-table-column type="selection" width="55" align="center"/>
                <el-table-column label="头像" align="center" prop="portrait" width="100">
                    <template slot-scope="scope">
                        <image-preview :src="scope.row.portrait" :width="50" :height="50"/>
                    </template>
                </el-table-column>
                <el-table-column label="领导姓名" align="center" prop="leaderName" width="100"
                                 :show-overflow-tooltip="true"/>
                <el-table-column label="领导机构名称" align="center" prop="unitName" width="120"
                                 :show-overflow-tooltip="true"/>
                <el-table-column label="领导职务" align="center" prop="duties" width="100" :show-overflow-tooltip="true"/>
                <el-table-column label="职责范围简介" align="center" prop="introduction" :show-overflow-tooltip="true"/>
                <el-table-column label="包案次数" align="center" prop="packCaseNums" width="80"/>
            </el-table>
            <el-table ref="leaderTable" v-show="leaderType != 2" v-loading="loading" :data="leaderList"
                      highlight-current-row @current-change="selectLeaderOne">
                <el-table-column type="index" width="55" align="center"/>
                <el-table-column label="头像" align="center" prop="portrait" width="100">
                    <template slot-scope="scope">
                        <image-preview :src="scope.row.portrait" :width="50" :height="50"/>
                    </template>
                </el-table-column>
                <el-table-column label="领导姓名" align="center" prop="leaderName" width="100"
                                 :show-overflow-tooltip="true"/>
                <el-table-column label="领导机构名称" align="center" prop="unitName" width="120"
                                 :show-overflow-tooltip="true"/>
                <el-table-column label="领导职务" align="center" prop="duties" width="100" :show-overflow-tooltip="true"/>
                <el-table-column label="职责范围简介" align="center" prop="introduction" :show-overflow-tooltip="true"/>
                <el-table-column label="包案次数" align="center" prop="packCaseNums" width="80"/>
            </el-table>
            <pagination v-show="total.leader>0" :total="total.leader" :page.sync="queryLeaderParams.pageNum"
                        :limit.sync="queryLeaderParams.pageSize" @pagination="selectLeader"/>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="selectLeaderOK">确 定</el-button>
                <el-button @click="selectLeaderClose">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 选择包案参与单位 -->
        <el-dialog title="参与单位选择" :visible.sync="open.unit" width="50%" append-to-body :before-close="selectUnitClose">
            <el-form ref="queryUnitForm" :model="queryUnitParams" label-width="90px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="单位名称" prop="joinUnitName">
                            <el-input v-model="queryUnitParams.joinUnitName" placeholder="请输入单位名称"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="单位属地" prop="zoneId">
                            <el-cascader
                                v-model="queryUnitParams.zoneId"
                                placeholder="请选择单位属地"
                                :props="zoneProps"
                                :options="zoneOptions"
                                :show-all-levels="false"
                                clearable
                                style="width: 180px"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" size="mini" @click="selectUnit">搜索
                            </el-button>
                            <el-button icon="el-icon-refresh" size="mini" @click="resetSelectUnit">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table ref="unitTable" v-loading="loading" :data="unitList" @selection-change="checkUnit">
                <el-table-column type="selection" width="55" align="center"/>
                <el-table-column label="单位名称" align="center" prop="joinUnitName"/>
                <el-table-column label="单位联系人" align="center" prop="unitUser"/>
                <el-table-column label="联系电话" align="center" prop="phone"/>
                <el-table-column label="单位属地" align="center" prop="zoneName"/>
                <el-table-column label="状态" align="center" prop="status">
                    <template slot-scope="scope">
                        <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
                    </template>
                </el-table-column>
                <!--<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-edit"
                    >查看
                    </el-button>
                  </template>
                </el-table-column>-->
            </el-table>
            <pagination v-show="total.unit>0" :total="total.unit" :page.sync="queryUnitParams.pageNum"
                        :limit.sync="queryUnitParams.pageSize" @pagination="selectUnit"/>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="selectUnitOK">确 定</el-button>
                <el-button @click="selectUnitClose">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 打印登记表 -->
        <el-dialog title="打印登记表" :visible.sync="open.print" width="50%" append-to-body>
            <div class="page print-div">
                <h2>领导包案登记表</h2>
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
                        <th style='width:10%'></th>
                        <th style='width:10%'></th>
                        <th style='width:10%'></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td align="center" colspan="2" class="nowrap">包案开始时间：</td>
                        <td colspan="2"><p>{{ printData.leaderTime }}</p></td>
                        <td align="center" colspan="1">包案领导</td>
                        <td colspan="2"><p>{{ printData.leaderName }}</p></td>
                        <td align="center" colspan="1">副组长</td>
                        <td colspan="2"><p>{{ printData.deputyName }}</p></td>
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
                    <tr style='height:120px'>
                        <td align="center" colspan="2">包案组员</td>
                        <td colspan="3"><p>{{ printData.teamName }}</p></td>
                        <td colspan="2" align="center">参与单位</td>
                        <td colspan="3"><p>{{ printData.juinUnit }}</p></td>
                    </tr>
                    <tr align="center">
                        <td colspan="2">摸排调查</td>
                        <td colspan="8" class="tablesign" valign="top" align="left">
                            <p>{{ printData.examine }}</p>
                        </td>
                    </tr>
                    <tr align="center">
                        <td colspan="2">协调处理情况</td>
                        <td colspan="8" class="tablesign" valign="top" align="left">
                            <p>{{ printData.coprocessing }}</p>
                        </td>
                    </tr>
                    <tr align="center">
                        <td colspan="2">督查落实情况</td>
                        <td colspan="8" class="tablesign" valign="top" align="left">
                            <p>{{ printData.workable }}</p>
                        </td>
                    </tr>
                    <tr align="center">
                        <td colspan="2">包清情况</td>
                        <td colspan="8" class="tablesign" valign="top" align="left">
                            <p>{{ printData.situation }}</p>
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
    import {getToken} from "@/utils/auth";
    import {initZoneList} from "@/api/common/common";
    import {
        listPetition,
        listLetter,
        getPetition,
        delPetition,
        addPetition,
        updatePetition,verifyPetition
    } from "@/api/backstage/leader/petition";
    import {listUnit} from "@/api/backstage/leader/unit";
    import {listInfo} from "@/api/backstage/leader/info";
    import {printHTML} from "@/utils/common";
    import printTemplate from "@/api/backstage/leader/twig/petition.twig";
    import {initNowDate, initEqualDate} from "@/utils/index";
    import {isExternal} from "@/utils/validate";

    export default {
        name: "Petition",
        dicts: ['sys_normal_disable', 'leader_level', 'leader_unit_type'],
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
                //打印
                printButton: false,
                printData: {},
                // 总条数
                total: {
                    petition: 0,    //包案事项
                    letter: 0,    //信访件
                    unit: 0,     //参与单位
                    leader: 0,  //包案领导
                },
                // 包案信访事项信息表格数据
                petitionList: [],
                // 弹出层标题
                title: {
                    petition: "",
                    leader: ""
                },
                // 是否显示弹出层
                open: {
                    petition: false,   //包案事项
                    letter: false, //信访事项弹框
                    leader: false,   //包案领导弹框
                    unit: false,    //包案参与单位弹框
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
                /*zoneOptionsd: [
                    {
                        label: "全地市",
                        value: process.env.VUE_APP_SHORT_ZONE_ID,
                        key: process.env.VUE_APP_SHORT_ZONE_ID,
                    }
                ],*/
                // 包案事项查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    letterCode: null,
                    letterName: null,
                    letterZoneId: null,
                    leaderTime: null,
                    leaderLevel: "",
                    leaderUnitType: "",
                },
                petitionIds: "",
                leaderTime: initNowDate(),
                dialogLeaderTime: initEqualDate(),
                // 表单参数
                form: {
                    joinUnitIds: "",
                    handUnitName: "",
                },
                examineJson: {number: 0, file: []},   //摸排调查
                coprocessingJson: {number: 0, file: []},//协调处理
                workableJson: {number: 0, file: []},    //督查落实
                situationJson: {number: 0},   //包清情况
                //上传文件
                file: {
                    action: process.env.VUE_APP_BASE_API + "/common/upload",
                    headers: {Authorization: "Bearer " + getToken()},// 设置上传的请求头部
                    fileType: 'image/jpeg,image/png',
                },
                // 表单校验
                rules: {
                    letterCode: [
                        {required: true, message: "信访件编号不能为空", trigger: "blur"},
                    ],
                },

                //信访事项表单查询参数
                queryLetterParams: {
                    pageNum: 1,
                    pageSize: 10,
                    // zoneId: process.env.VUE_APP_SHORT_ZONE_ID,
                    letterCode: null,
                    name: null,
                    complaintNumberEnd: "",
                    complaintNumberStart: "",
                },
                receiveTime: initNowDate(),
                letterList: [],
                letterOne: null,
                handleUnit: [],   //信访件的经办单位
                checketHandelUnit: [],   //选中的经办单位

                //参与单位查询参数
                queryUnitParams: {
                    pageNum: 1,
                    pageSize: 10,
                    zoneId: "",
                    joinUnitName: null,
                },
                unitList: [],
                checketUnit: [],//选中的参与单位

                //包案领导查询参数
                queryLeaderParams: {
                    pageNum: 1,
                    pageSize: 10,
                    unitName: null,
                    leaderName: null,
                    duties: null,
                    leaderLevel: "",
                    leaderUnitType: "",
                },
                leaderList: [],
                leaderType: 0,   //0：组长；1：副组长；2：组员
                selectCheckLeader: [],//组长
                selectCheckDeputy: [],//副组长
                selectCheckTeam: [],   //组员
                joinUnitList: []   //经办单位和参与单位ID List
            };
        },
        created() {
            this.initZone();
            this.getList();
        },
        methods: {
            // 初始化行政区域
            initZone() {
                initZoneList({id: process.env.VUE_APP_SUPER_ZONE_ID}).then(response => {
                    this.zoneOptions = [];
                    // this.zoneOptionsd = [];
                    /*if(response && response.children){
                        for (var i = 0, len = response.length; i < len; i++) {
                            this.zoneOptionsd.push({id: process.env.VUE_APP_SHORT_ZONE_ID, name: '全地市', parentId: process.env.VUE_APP_SHORT_ZONE_ID});
                            this.zoneOptionsd.response(arr[i]);
                            if (response[i].children && response[i].children.length > 0) {
                                this.zoneOptionsd = [...this.zoneOptionsd, ...response[i].children];
                            }
                        }
                    }*/
                    this.zoneOptions = response;
                });
            },
            /** 查询包案信访事项信息列表 */
            getList() {
                this.loading = true;
                listPetition(this.addDateRange(this.queryParams, this.leaderTime)).then(response => {
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
                this.form = {
                    letterCode: null,
                    letterName: null,
                    letterZoneId: null,
                    joinUnitIds: "",
                    handUnitName: "",
                    examineJson: null,   //摸排调查
                    coprocessingJson: null,  //协调处理
                    workableJson: null,   //督查落实
                    situationJson: null,  //包清情况
                };
                this.examineJson = {number: 0, file: []};
                this.coprocessingJson = {number: 0, file: []};
                this.workableJson = {number: 0, file: []};
                this.situationJson = {number: 0};
                this.handleUnit = [];
                this.checketHandelUnit = [];
                this.checketUnit = [];
                this.selectCheckLeader = [],//组长
                    this.selectCheckDeputy = [],//副组长
                    this.selectCheckTeam = [],   //组员
                    this.joinUnitList = []   //经办单位和参与单位ID List
                this.dialogLeaderTime = initEqualDate();
                this.resetForm("queryForm");
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageNum = 1;
                this.getList();
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.queryParams.leaderLevel = "";
                this.queryParams.leaderUnitType = "";
                this.leaderTime = initNowDate();
                this.resetForm("queryForm");
                this.handleQuery();
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.petitionId);
                this.single = selection.length !== 1;
                this.multiple = !selection.length;
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.reset();
                this.open.petition = true;
                this.printButton = false;
                this.title.petition = "添加包案事项信息";
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset();
                this.printButton = true;
                const petitionId = row.petitionId || this.ids;
                getPetition(petitionId).then(response => {
                    this.form = response.data;
                    this.dialogLeaderTime = [this.form.startLeaderTime, this.form.endLeaderTime];
                    this.examineJson = JSON.parse(this.form.examineJson);
                    this.coprocessingJson = JSON.parse(this.form.coprocessingJson);
                    this.workableJson = JSON.parse(this.form.workableJson);
                    this.situationJson = JSON.parse(this.form.situationJson);
                    //处理包案领导信息
                    this.selectCheckLeader = this.form.leaderList;
                    this.selectCheckDeputy = this.form.deputyList;
                    this.selectCheckTeam = this.form.teamList;
                    //处理参与单位信息
                    this.checketUnit = this.form.joinUnitList;
                    this.joinUnitList = this.form.joinUnitList.map(obj => obj.joinUnitId);
                    var handleUnit = this.form.handleUnitMap;
                    for (var key in handleUnit) {//经办单位
                        this.handleUnit.push({
                            key: key,
                            label: handleUnit[key]
                        });
                        if (this.form.joinUnitIds.indexOf(key) >= 0) {
                            this.checketHandelUnit.push(key);
                        }
                    }
                    this.open.petition = true;
                    this.title.petition = "修改包案事项信息";
                });
            },
            /** 提交按钮 */
            submitForm() {
                this.$refs["petitionFrom"].validate(valid => {
                    if (valid) {
                        this.form.examineJson = JSON.stringify(this.examineJson);
                        this.form.coprocessingJson = JSON.stringify(this.coprocessingJson);
                        this.form.workableJson = JSON.stringify(this.workableJson);
                        this.form.situationJson = JSON.stringify(this.situationJson);
                        this.joinUnitList.push(...this.checketHandelUnit);
                        this.form.joinUnitIds = this.joinUnitList.join(",");
                        let handUnitName = "";
                        this.handleUnit.forEach(obj => {
                            if (this.checketHandelUnit.indexOf(obj.key) >= 0) {
                                handUnitName += obj.label + ",";
                            }
                        })
                        this.form.handUnitName = handUnitName.substring(0, handUnitName.length - 1);
                        //处理包案组员
                        this.form.leaderId = this.selectCheckLeader.map(obj => obj.leaderId).join(",");
                        this.form.deputyId = this.selectCheckDeputy.map(obj => obj.leaderId).join(",");
                        this.form.teamIds = this.selectCheckTeam.map(obj => obj.leaderId).join(",");
                        if (!this.form.letterCode) {
                            this.$message.error('请选择信访件！');
                            return;
                        }
                        if (!this.form.leaderId) {
                            this.$message.error('请选择包案领导！');
                            return;
                        }
                        if (!this.dialogLeaderTime || this.dialogLeaderTime.length < 2) {
                            this.$message.error('请选择包案时间！');
                            return;
                        } else {
                            this.form.startLeaderTime = this.dialogLeaderTime[0];
                            this.form.endLeaderTime = this.dialogLeaderTime[1];
                        }

                        if (this.form.petitionId != null) {
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
                const petitionIds = row.petitionId || this.ids;
                this.$modal.confirm('是否确认删除包案信访事项信息？').then(function () {
                    return delPetition(petitionIds);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("删除成功");
                }).catch(() => {
                });
            },
            /** 导出按钮操作 */
            handleExport(row) {
                this.queryParams.petitionIds = row.petitionId || this.ids;
                this.download('leader/petition/export', {
                    ...this.queryParams
                }, `包案信访事项信息_${new Date().getTime()}.xlsx`)
            },
            /**  发布/下架  **/
            handleVerify(row, status){
                var data = {
                    petitionIds : row ? [row.petitionId] : this.ids,
                    verifyStatus: status,
                };
                const msg = status == 1 ? '发布' : '下架';
                this.$modal.confirm('确认 "'+msg+'" 包案事项？').then(function () {
                    return verifyPetition(data);
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
                    this.form.mobile = letter.mobile;   //手机号码
                    this.form.letterType = letter.letterType;   //信访形式
                    this.form.letterTypeName = letter.letterTypeName;   //信访形式
                    if (letter.registerTime) this.form.registerTime = new Date(letter.registerTime);   //登记日期
                    this.form.contentType = letter.contentType;   //内容分类
                    this.form.contentTypeName = letter.contentTypeName;   //内容分类
                    this.handleUnit = [];
                    this.checketHandelUnit = [];
                    var handleUnit = letter.handleUnit;
                    for (var key in handleUnit) {//经办单位
                        this.handleUnit.push({
                            key: key,
                            label: handleUnit[key]
                        });
                    }
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
            /****************************************    参与单位选择   ****************************************/
            selectUnit() {
                this.loading = true;
                listUnit(this.queryUnitParams).then(response => {
                    this.unitList = response.rows;
                    this.total.unit = response.total;
                    this.loading = false;
                    this.zoneOptionsd.forEach(zone => {
                        zone.disabled = false;
                        response.rows.forEach(obj => {
                            if (obj.zoneId == zone.id) {
                                zone.disabled = true;
                            }
                        })
                    })
                });
            },

            /**重置按钮操作*/
            resetSelectUnit() {
                this.resetForm("queryUnitForm");
                this.selectUnit();
            },

            selectUnitOpen() {
                this.checketUnit = [];
                this.resetForm("queryUnitForm");
                this.open.unit = true;
                this.queryUnitParams.pageNum = 1;
                this.selectUnit();
            },
            selectUnitClose() {
                this.open.unit = false;
                this.checketUnit = [];
                this.joinUnitList = [];
            },
            selectUnitOK() {
                if (this.checketUnit.length > 0) {
                    this.open.unit = false;
                } else {
                    this.$message.error('请选择参与单位！');
                }
            },
            checkUnit(selection) {
                this.checketUnit = selection
                this.joinUnitList = selection.map(obj => obj.joinUnitId)
            },
            /*********************************************     包案领导选择     *****************************************************/
            selectLeader() {
                this.loading = true;
                listInfo(this.queryLeaderParams).then(response => {
                    this.leaderList = response.rows;
                    this.total.leader = response.total;
                    this.loading = false;
                });
            },

            /** 重置按钮操作 */
            resetQueryLeader() {
                this.resetForm("queryLeaderForm");
                this.selectLeader();
            },

            selectLeaderOpen(type) {
                this.resetForm("queryLeaderForm");
                this.open.leader = true;
                this.leaderType = type;
                this.queryLeaderParams.pageNum = 1;
                this.title.leader = type == 0 ? "选择包案领导" : type == 1 ? "选择副组长" : "选择组员";
                this.selectLeader();
            },
            selectLeaderClose() {
                if (this.leaderType == 0)
                    this.selectCheckLeader = [];
                else if (this.leaderType == 1)
                    this.selectCheckDeputy = [];
                else if (this.leaderType == 2)
                    this.selectCheckTeam = [];
                this.open.leader = false;
            },
            selectLeaderOK() {
                if (this.leaderType == 0) {
                    if (this.selectCheckLeader.length == 1) {
                        this.open.leader = false;
                    } else if (this.selectCheckLeader.length == 0) {
                        this.$message.error('请选择包案领导！');
                    } else {
                        this.$message.error('包案领导只能选择一个！');
                    }
                } else if (this.leaderType == 1) {
                    if (this.selectCheckDeputy.length == 1) {
                        this.open.leader = false;
                    } else if (this.selectCheckDeputy.length == 0) {
                        this.$message.error('请选择副组长！');
                    } else {
                        this.$message.error('副组长只能选择一个！');
                    }
                } else if (this.leaderType == 2) {
                    this.open.leader = false;
                }
            },
            checkLeader(selection) {
                if (this.leaderType == 0)
                    this.selectCheckLeader = selection;
                else if (this.leaderType == 1)
                    this.selectCheckDeputy = selection;
                else if (this.leaderType == 2)
                    this.selectCheckTeam = selection;
            }, selectLeaderOne(row) {
                if (row) {
                    if (this.leaderType == 0)
                        this.selectCheckLeader = [row];
                    else if (this.leaderType == 1)
                        this.selectCheckDeputy = [row];
                }
            },
            /**************************************************   上传图片    ****************************************/
            // 摸排调查   文件上传成功处理
            examineFileSuccess(response, file, fileList) {
                this.examineJson.file.push({
                    url: this.realImgSrc(response.fileName),
                    fileName: response.fileName
                });
            },//摸排调查   文件删除处理
            examineFileRemove(file, fileList) {
                if (file.status === 'ready' && this.file.fileType.indexOf(file.raw.type) < 0) {
                    this.$message.error('只能上传是 JPG / PNG 格式文件!');
                    return;
                }
                this.examineJson.file.splice(this.examineJson.file.indexOf(file), 1);
            },
            //协调处理    文件上传成功处理
            coprocessingFileSuccess(response, file, fileList) {
                this.coprocessingJson.file.push({
                    url: this.realImgSrc(response.fileName),
                    fileName: response.fileName
                });
            },//协调处理    文件删除处理
            coprocessingFileRemove(file, fileList) {
                if (file.status === 'ready' && this.file.fileType.indexOf(file.raw.type) < 0) {
                    this.$message.error('只能上传是 JPG / PNG 格式文件!');
                    return;
                }
                this.coprocessingJson.file.splice(this.coprocessingJson.file.indexOf(file), 1);
            },
            //督查落实    文件上传成功处理
            workableFileSuccess(response, file, fileList) {
                this.workableJson.file.push({
                    url: this.realImgSrc(response.fileName),
                    fileName: response.fileName
                });
            },//督查落实    文件删除处理
            workableFileRemove(file, fileList) {
                if (file.status === 'ready' && this.file.fileType.indexOf(file.raw.type) < 0) {
                    this.$message.error('只能上传是 JPG / PNG 格式文件!');
                    return;
                }
                this.workableJson.file.splice(this.workableJson.file.indexOf(file), 1);
            }, realImgSrc(src) {
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
                //包案信息
                this.printData.leaderTime = this.dialogLeaderTime && this.dialogLeaderTime.length > 0 ? this.dialogLeaderTime[0] : "";
                this.printData.examine = this.examineJson.textarea;
                this.printData.coprocessing = this.coprocessingJson.textarea;
                this.printData.workable = this.workableJson.textarea;
                this.printData.situation = this.situationJson.textarea;
                //人员信息
                this.printData.leaderName = this.selectCheckLeader.map(obj => obj.leaderName)[0];
                this.printData.deputyName = this.selectCheckDeputy.map(obj => obj.leaderName)[0];
                this.printData.teamName = this.selectCheckTeam.map(obj => obj.leaderName).join(' , ');
                //单位信息
                var strIds = this.checketHandelUnit.join(",");
                var unitName = this.checketUnit.map(obj => obj.joinUnitName);
                this.handleUnit.forEach(obj => {
                    if (strIds.indexOf(obj.key) >= 0) {
                        unitName.push(obj.label);
                    }
                })
                this.printData.juinUnit = unitName.join(" , ");
            },
            selectPrintClose() {
                this.open.print = false;
            },
            print() {
                let html = printTemplate({
                    title: '领导包案登记表',
                    petition: this.printData
                })
                printHTML(html)
            }
        }
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
</style>
