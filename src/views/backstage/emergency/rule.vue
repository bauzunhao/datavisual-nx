<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
      <el-form-item label="规则名称" prop="ruleName">
        <el-input
          v-model="queryParams.ruleName"
          placeholder="请输入风险规则名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="事件级别" prop="eventLevel">
        <el-select v-model="queryParams.eventLevel" placeholder="请选择事件级别">
          <el-option label="一级" value="1"/>
          <el-option label="二级" value="2"/>
          <el-option label="三级" value="3"/>
          <el-option label="四级" value="4"/>
          <el-option label="五级" value="5"/>
        </el-select>
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
          v-hasPermi="['emergency:rule:add']"
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
          v-hasPermi="['emergency:rule:edit']"
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
          v-hasPermi="['emergency:rule:remove']"
        >删除
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="ruleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="风险规则码" align="center" prop="ruleId"/>
      <el-table-column label="风险规则名称" align="center" prop="ruleName"/>
      <el-table-column label="事件级别" align="center" prop="eventLevel" width="100px">
        <template slot-scope="scope">{{parseEventLevel(scope.row.eventLevel)}}</template>
      </el-table-column>
      <el-table-column label="关联风险流程" align="center" prop="processName"/>
      <el-table-column label="关联风险资源" align="center" prop="resourceName"/>
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
            v-hasPermi="['emergency:rule:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['emergency:rule:remove']"
          >删除
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-setting"
            @click="handleStatus(scope.row)"
            v-hasPermi="['emergency:rule:status']"
          >{{1 == scope.row.status ? '启用' : '停用'}}
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

    <!-- 添加或修改风险规则对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="风险规则名称" prop="ruleName">
              <el-input v-model.trim="form.ruleName" maxlength="30" placeholder="请输入风险规则名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="事件级别" prop="eventLevel">
              <el-select v-model="form.eventLevel" placeholder="请选择事件级别">
                <el-option label="一级" value="1"/>
                <el-option label="二级" value="2"/>
                <el-option label="三级" value="3"/>
                <el-option label="四级" value="4"/>
                <el-option label="五级" value="5"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="信访人数" prop="petitionNumber">
          <el-input v-model="form.petitionNumber" placeholder="请输入信访人数" class="input-with-select">
            <template slot="prepend">大于等于</template>
          </el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idcardNo">
          <el-input v-model.trim="form.idcardNo" placeholder="请输入身份证号码"/>
        </el-form-item>
        <el-form-item label="关键词" prop="ruleKeyword">
          <el-input placeholder="请输入应急关键词，多个按英文'|'分隔" v-model="form.ruleKeyword" maxlength="100" class="input-with-select">
            <el-select v-model="form.keywordType" slot="prepend" placeholder="请选择" style="width: 110px;">
              <el-option label="投诉内容" value="1"></el-option>
              <el-option label="信访概况" value="2"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="事项类型" prop="letterType">
          <el-checkbox-group v-model="form.letterType" :max="1" size="medium" placeholder="请选择事项类型">
            <el-checkbox-button label="1">扬言</el-checkbox-button>
            <el-checkbox-button label="2">积案</el-checkbox-button>
            <el-checkbox-button label="3">初件</el-checkbox-button>
            <el-checkbox-button label="4">重件</el-checkbox-button>
            <el-checkbox-button label="5">赴区访</el-checkbox-button>
            <el-checkbox-button label="6">进京访</el-checkbox-button>
            <el-checkbox-button label="7">交办件</el-checkbox-button>
            <el-checkbox-button label="8">督办件</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
          <el-form-item label="登记级别" prop="levelType">
              <el-checkbox-group v-model="form.levelType" :max="1" size="medium" placeholder="请选择登记级别">
                  <el-checkbox-button label="1">国级</el-checkbox-button>
                  <el-checkbox-button label="2">省级</el-checkbox-button>
                  <el-checkbox-button label="3">市级</el-checkbox-button>
                  <el-checkbox-button label="4">县级</el-checkbox-button>
              </el-checkbox-group>
          </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="关联风险流程" prop="processId">
              <el-select v-model="form.processId" placeholder="请输入关联风险流程">
                <el-option
                  v-for="rec in this.generalData.processList"
                  :key="rec.processId"
                  :label="rec.processName"
                  :value="rec.processId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联风险资源" prop="resourceId">
              <el-select v-model="form.resourceId" placeholder="请输入关联风险资源">
                <el-option
                  v-for="rec in this.generalData.resourcesList"
                  :key="rec.resourceId"
                  :label="rec.resourceName"
                  :value="rec.resourceId"
                />
              </el-select>
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
    import { listRule, getRule, delRule, addRule, updateRule, setStatus, listProcess, listResources } from "@/api/backstage/emergency/rule";

    export default {
        name: "Rule",
        dicts: ['sys_normal_disable'],
        data() {
            var validateRule = (rule, value, callback) => {
                const reg = /^[1-9]\d*$/;
                const idcardReg = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
                if (!this.form.petitionNumber && this.form.letterType.length < 1 && this.form.levelType.length < 1 && !this.form.ruleKeyword && !this.form.idcardNo) {
                    callback(new Error('【信访人数、身份证号码、关键词、事项类型和登记级别】不能全为空'));
                } else if ("petitionNumber" == rule.field && this.form.petitionNumber && !reg.test(this.form.petitionNumber)) {
                    callback(new Error('信访人数必须为正整数数字'));
                } else if ("idcardNo" == rule.field && this.form.idcardNo && !idcardReg.test(this.form.idcardNo)) {
                    callback(new Error('身份证号码格式不正确'));
                } else if ("ruleKeyword" == rule.field && this.form.ruleKeyword && !this.form.keywordType) {
                    callback(new Error('请选择关键词的匹配来源'));
                } else {
                    // this.$refs.form.validateField('petitionNumber');
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
                // 总条数
                total: 0,
                // 风险规则表格数据
                ruleList: [],
                // 弹出层标题
                title: "",
                // 是否显示弹出层
                open: false,
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    ruleName: null,
                    eventLevel: null
                },
                generalData: {
                    processList: [],
                    resourcesList: [],
                    defaultValues: {
                        process: null,
                        resource: null
                    }
                },
                // 表单参数
                form: {},
                // 表单校验
                rules: {
                    ruleName: [
                        {required: true, message: "风险规则名称不能为空", trigger: "blur"}
                    ],
                    eventLevel: [
                        {required: true, message: "请选择应急事件级别", trigger: "change"}
                    ],
                    petitionNumber: [
                        {validator: validateRule, trigger: "blur"}
                    ],
                    letterType: [
                        {validator: validateRule, trigger: "change"}
                    ],
                    levelType: [
                        {validator: validateRule, trigger: "change"}
                    ],
                    ruleKeyword: [
                        {validator: validateRule, trigger: "blur"}
                    ],
                    idcardNo: [
                        {validator: validateRule, trigger: "blur"}
                    ],
                    processId: [
                        {required: true, message: "请选择关联的风险流程", trigger: "change"}
                    ],
                    resourceId: [
                        {required: true, message: "请选择关联的风险资源", trigger: "change"}
                    ]
                }
            };
        },
        created() {
            this.getList();
            this.loadProcess();
            this.loadResources();
        },
        methods: {
            // 解析事件等级
            parseEventLevel(eventLevel) {
                if (1 == eventLevel) return "一级";
                else if (2 == eventLevel) return "二级";
                else if (3 == eventLevel) return "三级";
                else if (4 == eventLevel) return "四级";
                else if (5 == eventLevel) return "五级";
                else return "其他";
            },
            loadProcess() {
                listProcess().then(data => {
                    if (data) {
                        this.generalData.processList = data;
                        this.generalData.defaultValues.process = this.generalData.processList.find(process => 1 === process.defaultStatus);
                    }
                });
            },
            loadResources() {
                listResources().then(data => {
                    if (data) {
                        this.generalData.resourcesList = data;
                        this.generalData.defaultValues.resource = this.generalData.resourcesList.find(resource => 1 === resource.defaultStatus);
                    }
                });
            },
            /** 查询风险规则列表 */
            getList() {
                this.loading = true;
                listRule(this.queryParams).then(response => {
                    this.ruleList = response.rows;
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
                    ruleId: null,
                    ruleName: null,
                    letterType: [],
                    levelType: [],
                    petitionNumber: null,
                    numberCondition: null,
                    keywordType: null,
                    ruleKeyword: null,
                    idcardNo: null,
                    eventLevel: null,
                    processId: null,
                    resourceId: null
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
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.ruleId);
                this.single = selection.length !== 1;
                this.multiple = !selection.length;
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.reset();
                if (this.generalData.defaultValues.process) {
                    this.form.processId = this.generalData.defaultValues.process.processId;
                }
                if (this.generalData.defaultValues.resource) {
                    this.form.resourceId = this.generalData.defaultValues.resource.resourceId;
                }
                this.open = true;
                this.title = "添加风险规则";
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset();
                const ruleId = row.ruleId || this.ids;
                getRule(ruleId).then(response => {
                    this.form = response.data;
                    if (this.form.eventLevel) {
                        this.form.eventLevel = this.form.eventLevel + "";
                    }
                    if (this.form.keywordType) {
                        this.form.keywordType = this.form.keywordType + "";
                    }
                    this.form.letterType = this.form.letterType ? [this.form.letterType] : [];
                    this.form.levelType = this.form.levelType ? [this.form.levelType] : [];
                    this.open = true;
                    this.title = "修改风险规则";
                });
            },
            /** 提交按钮 */
            submitForm() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.letterType) {
                            this.form.letterType = this.form.letterType.join("");
                        }
                        if (this.form.levelType) {
                            this.form.levelType = this.form.levelType.join("");
                        }
                        if (this.form.ruleId != null) {
                            updateRule(this.form).then(response => {
                                this.$modal.msgSuccess("修改成功");
                                this.open = false;
                                this.getList();
                            });
                        } else {
                            addRule(this.form).then(response => {
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
                const ruleIds = row.ruleId || this.ids;
                this.$modal.confirm('是否确认删除风险规则？').then(function () {
                    return delRule(ruleIds);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("删除成功");
                }).catch(() => {
                });
            },
            /** 设置为启停用状态操作 */
            handleStatus(row) {
                const ruleId = row.ruleId;
                this.$modal.confirm('是否确认设置风险规则状态？').then(function () {
                    return setStatus(ruleId);
                }).then(() => {
                    this.getList();
                    this.$modal.msgSuccess("设置风险规则状态成功");
                }).catch(() => {
                });
            }
        }
    };
</script>
