<template>
  <div class="app-container">
      <div class="head">
          <el-card class="box-card">
              <div class="item">
                  <el-row :gutter="100" class="numlist">
                      <el-col :span="8">
                          <div v-if="this.generalData.isDel == 2">
                              <p>{{generalData.stockNum}}/{{generalData.notEndStockNum}}/{{generalData.stockNum-generalData.notEndStockNum}}</p>
                              <p>减存量/未办结量/办结量</p>
                          </div>
                          <div v-if="this.generalData.isDel == 1">
                              <p>{{generalData.stockNum}}</p>
                              <p>减存量</p>
                          </div>
                      </el-col>
                      <el-col :span="8">
                          <div v-if="this.generalData.isDel == 2">
                              <p>{{generalData.incrementNum}}/{{generalData.notEndIncrementNum}}/{{generalData.incrementNum-generalData.notEndIncrementNum}}</p>

                              <p>控增量/未办结量/办结量</p>
                          </div>
                          <div v-if="this.generalData.isDel == 1">
                              <p>{{generalData.incrementNum}}</p>

                              <p>控增量</p>
                          </div>
                      </el-col>
                      <el-col :span="8">
                          <div v-if="this.generalData.isDel == 2">
                              <p>{{generalData.variableNum}}/{{generalData.notEndVariableNum}}/{{generalData.variableNum-generalData.notEndVariableNum}}</p>
                              <p>防变量/未办结量/办结量</p>
                          </div>
                          <div v-if="this.generalData.isDel == 1">
                              <p>{{generalData.variableNum}}</p>
                              <p>防变量</p>
                          </div>
                      </el-col>
                  </el-row>
              </div>
          </el-card>
      </div>
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="85px" style="margin-top:20px">
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
          placeholder="请输入信访人姓名"
          clearable
          style="width: 180px"
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
      <el-form-item label="证件号码" prop="certificateNumber">
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
      <el-row class="butlist">
        <el-col :span="12">
          <el-form-item label="办理类型：" class="flexstart">
            <el-radio-group v-model="queryParams.handleType" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="0">交办</el-radio-button>
              <el-radio-button label="4">督办</el-radio-button>
              <el-radio-button label="1">转送</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="信访目的：" class="flexstart">
            <el-radio-group v-model="queryParams.purposeType" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button
                v-for="dict in dict.type.sys_purpose_type"
                :key="dict.value"
                :label="dict.value"
              >{{dict.label}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="处理状态：" class="flexstart">
            <el-radio-group v-model="queryParams.end" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="1">已办结</el-radio-button>
              <el-radio-button label="0">处理中</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="信访形式：" class="flexstart">
            <el-radio-group v-model="queryParams.letterType" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button
                v-for="dict in dict.type.sys_letter_type"
                :key="dict.value"
                :label="dict.value"
              >{{dict.label}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登记级别：" class="flexstart">
            <el-radio-group v-model="queryParams.regLevel" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="1">国家</el-radio-button>
              <el-radio-button label="2">自治区</el-radio-button>
              <el-radio-button label="3">市级</el-radio-button>
              <el-radio-button label="4">区/县</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标记类型：" class="flexstart">
            <el-radio-group v-model="queryParams.markType" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="1">集体访</el-radio-button>
              <el-radio-button label="2">积案</el-radio-button>
              <el-radio-button label="3">扬言</el-radio-button>
              <el-radio-button label="4">最多访一次</el-radio-button>
              <el-radio-button label="5">专项件</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="初重标识：" class="flexstart">
            <el-radio-group v-model="queryParams.repeat" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="0">初件</el-radio-button>
              <el-radio-button label="1">重件</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="清单类别：" class="flexstart">
            <el-radio-group v-model="queryParams.dataType" size="small">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="1">减存量</el-radio-button>
              <el-radio-button label="2">控增量</el-radio-button>
              <el-radio-button label="3">防变量</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5" v-if="generalData.isDel == 2">
        <el-button
            type="info"
            plain
            icon="el-icon-upload2"
            size="mini"
            @click="add_dialogVisible = true"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
        <el-col :span="1.5" v-if="generalData.isDel == 2">
            <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple"
                @click="handleDelete"
            >删除</el-button>
        </el-col>
      <el-col :span="1.5">
          <el-button  type="primary" plain icon="el-icon-pie-chart" size="mini" @click="reportQuery">统计</el-button>
      </el-col>
      <el-col :span="4" style="float: right">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-col>
    </el-row>
    <div>
      <el-table ref="multipleTable" :data="threeListData" tooltip-effect="dark" style="width: 100%" v-loading="loading"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="name" label="姓名" width="120" ></el-table-column>
        <el-table-column prop="letterCode" label="信访件编号" show-overflow-tooltip></el-table-column>
        <el-table-column label="登记日期" >
          <template slot-scope="scope">{{ scope.row.registerTime }}</template>
        </el-table-column>
        <el-table-column prop="letterTypeName" label="信访形式"  width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="purposeTypeName" label="信访目的" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="zoneName" label="问题属地" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contentTypeName" label="内容分类" show-overflow-tooltip></el-table-column>
        <el-table-column prop="handleUnitName" label="最后办理单位" show-overflow-tooltip></el-table-column>
        <el-table-column prop="handleStateName" label="办理状态" show-overflow-tooltip></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="160"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope" >
            <el-button
                  v-if="generalData.isDel == 2"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
            >删除</el-button>
            <el-button
              icon="el-icon-document"
              size="mini"
              type="text">
              <router-link :to="{ path: '/workbenches/detailcomp/'+ scope.row.objectId }">详情</router-link>
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
      <el-dialog
            title="导入信访件（提示：请输入信访件编号，一行一个）"
            :visible.sync="add_dialogVisible"
            :close-on-click-modal="false"
            width="50%">

          <el-form :model="threeForm" :rules="rules" ref="threeForm">
              <el-form-item label="清单类型" prop="threeType" >
                  <el-select v-model="threeForm.threeType" placeholder="请选择">
                      <el-option label="减存量" value="1"></el-option>
                      <el-option label="控增量" value="2"></el-option>
                      <el-option label="防变量" value="3"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="信访件编号" prop="letterCodes">
                  <el-input
                      type="textarea"
                      :autosize="{ minRows: 16, maxRows: 24}"
                      placeholder="请输入信访件编号，一行一个"
                      v-model="threeForm.letterCodes" >
                  </el-input>
              </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="add_dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addThreeItemData">立即导入</el-button>
          </div>
      </el-dialog>
      <el-dialog title="统计" :visible.sync="dialogTableVisible">
        <el-table :data="threeReportList" :summary-method="getSummaries" show-summary >
          <el-table-column label="地区" align="center" prop="zoneName"/>
          <el-table-column label="三项清单落实情况" align="center">
            <el-table-column label="总量" align="center" prop="num"/>
            <el-table-column label="办理中" align="center" prop="blzNum"   />
            <el-table-column label="办结" align="center" key="bjNum" prop="bjNum"   />
            <el-table-column label="办结率" align="center" key="bjl" prop="bjl"  />
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import { initZoneList } from "@/api/common/common";
    import { listData,listReportData,getSummaryData,addThreeData,delByLetterCode  } from "@/api/backstage/work/three";
    export default {
        name: "ThreeList",
        dicts: ['sys_purpose_type', 'sys_letter_type'],
        data() {
            return {
                multiple: true,
                ids: [],
                loading :false,
                // 显示搜索条件
                showSearch: true,
                // 日期范围
                dateRange: [],
                // 总条数
                total: 0,
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    name: undefined,
                    letterCode: undefined,
                    zoneId: undefined,
                    certificateNumber: undefined,
                    handleType: "",
                    purposeType: "",
                    letterType: "",
                    repeat: "",
                    regLevel: "",
                    markType: "",
                    dataType: "",
                    end: ""
                },
                zoneProps:{
                    label: "name",
                    value: "id",
                    checkStrictly: true,
                    emitPath: false
                },
                zoneOptions: [],
                generalData: {
                    stockNum: 0,
                    incrementNum: 0,
                    variableNum: 0,
                    notEndStockNum: 0,
                    notEndIncrementNum: 0,
                    notEndVariableNum: 0,
                    isDel: 1, //是否显示删除按钮
                },
                threeListData: null,
                multipleSelection: [],
                threeReportList:[{}],
                dialogTableVisible: false,
                add_dialogVisible: false,
                threeForm:{
                    letterCodes:'',
                    threeType:'',
                },
                rules: {
                    threeType: [
                        { required: true, message: '请选择清单类型', trigger: 'change' }
                    ],
                    letterCodes: [
                        { required: true, message: '请输入信访件编号', trigger: 'blur' }
                    ]
                }
            };
        },
        created() {
            this.initZone();
            this.threeSummaryDataQuery();
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
            /** 查询列表 */
            getList() {
              this.loading = true;
              listData(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                  this.threeListData = response.rows;
                  this.total = response.total;
                  this.loading = false;
                }
              );
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageNum = 1;
                this.getList();
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.dateRange = [];
                this.queryParams.handleType = "";
                this.queryParams.purposeType = "";
                this.queryParams.letterType = "";
                this.queryParams.repeat = "";
                this.queryParams.regLevel = "";
                this.queryParams.markType = "";
                this.queryParams.dataType = "";
                this.queryParams.end = "";
                this.resetForm("queryForm");
                this.handleQuery();
            },
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.letterCode);
                this.single = selection.length!=1;
                this.multiple = !selection.length;
            },
            /** 导入弹窗*/
            addThreeItemData(){
                let letterCodesValue = this.threeForm.letterCodes.trim().replaceAll("\n", ";")
                let threeType = this.threeForm.threeType;
                this.$refs['threeForm'].validate((valid) => {
                    if (valid) {
                        if(letterCodesValue && threeType){
                            addThreeData({'letterCode':letterCodesValue,'type':threeType}).then(response => {
                                this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
                                this.add_dialogVisible = false;
                                this.getList();
                            });
                        }else{
                            this.$modal.msgError("请输入正确的信访件");
                        }
                    }
                })
            },
            /** 统计按钮操作 */
            reportQuery() {
              this.dialogTableVisible = true;
              this.loading = true;
              listReportData(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.threeReportList = [{}];
                if (response.data) {
                  this.threeReportList = response.data;
                }
                this.loading = false;
              });
            },
            getSummaries(param) {
              const { columns, data } = param;
              const sums = [];
              columns.forEach((column, index) => {
                if (index === 0) {
                  sums[index] = '合计';
                  return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                  sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                      return prev + curr;
                    } else {
                      return prev;
                    }
                  }, 0);
                } else {
                  sums[index] = 'N/A';
                }
              });
              sums[columns.length - 1]="";
              if(sums[1] > 0) {
                sums[columns.length - 1] = (sums[3] / sums[1] * 100.0).toFixed(2) + "%";
              }
              return sums;
            },
            /** 汇总数据查询 */
            threeSummaryDataQuery() {
              getSummaryData().then(response => {
                if (response.data) {
                  this.generalData = response.data;
                }
              });
          },
          /** 删除按钮操作 */
          handleDelete(row) {
                let letterCode = row.letterCode || this.ids;
                this.$modal.confirm('是否确认删除信访件编号为"' + letterCode + '"的数据项？').then(function() {
                    return delByLetterCode(letterCode);
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
            this.queryParams.letterCodes = this.ids;
            this.download('work/source/three/export', {
              ...this.queryParams
            }, `三项清单管理_${new Date().getTime()}.xlsx`,{timeout:120000});
          },
        }
    };
</script>
<style scoped lang="scss">

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

  .colorb {
    color: rgb(64, 158, 255);
  }

  .tips {
    padding: 5px;
    background-color: #e6f7ff;
    border-radius: 5px;
    border: 1px solid rgb(64, 158, 255);
    font-size: 14px;

    i {
      margin-right: 5px;
    }
  }
  .numlist {
      .el-col div {
          border: 1px solid #cccccc63;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px;
          border-radius: 5px;
          p {
              margin: 0;
              font-size: 15px;
              white-space: nowrap;
          }

          p:first-child {
              font-size: 30px;
              color: #1890ff;
              line-height: 35px;
          }
      }
  }
  .opspan{
      opacity: 0;
  }
</style>
