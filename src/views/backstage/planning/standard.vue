<template>
  <div class="app-container">
    <el-row>
      <div>
        <h2>进京访指标</h2>
        <el-form :model="queryJingParams" ref="queryJingForm" size="small" :inline="true" v-show="showSearch.enterJing" label-width="68px">
        </el-form>
        <el-row  :gutter="10" class="mb8">
<!--          <el-col :span='1.5'><el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd(0)" >新增</el-button></el-col>-->
          <el-col :span='1.5'><el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport(0)" >导出</el-button></el-col>
<!--          <right-toolbar :showSearch.sync="showSearch.enterJing" @queryTable="getList(0)"></right-toolbar>-->
        </el-row>
        <el-table style="width: 100%" :data="standardList.enterJing"  v-loading="loading.enterJing" ref="jingTable">
          <el-table-column label="序号" prop="index"></el-table-column>
          <el-table-column label="指标" prop="quotaName"></el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="上升/下降" prop="symbolName">
            <template slot-scope="scope">
              {{ scope.row.symbolName =  getSymbol(scope.row.symbol)}}
            </template>
          </el-table-column>
          <el-table-column prop="value">
            <template slot-scope="scope" slot="header">
              <span>
                人口数(人)
                <el-tooltip :aa="scope" class="item" effect="dark" content="例：人口数 = 0.5，代表：0.5/10000" placement="top-start">
                  <i class="el-icon-warning" style="color:#66B1FF; margin-right:2px;'"></i>
                </el-tooltip>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" v-hasPermi="['planning:standard:edit']">修改</el-button>
              <!--<el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" v-hasPermi="['planning:standard:remove']">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total.enterJing>0" :total="total.enterJing" :page.sync="queryJingParams.pageNum" :limit.sync="queryJingParams.pageSize" @pagination="getList(0)"/>
      </div>
    </el-row>
    <el-row>
      <div>
        <h2>集体访指标</h2>
        <el-form :model="queryCollectivenessParams" ref="queryCollectivenessForm" size="small" :inline="true" v-show="showSearch.collectiveness" label-width="68px">
        </el-form>
        <el-row  :gutter="10" class="mb8">
<!--          <el-col :span="1.5"><el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd(1)" >新增</el-button></el-col>-->
          <el-col :span="1.5"><el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport(1)" >导出</el-button></el-col>
<!--          <right-toolbar :showSearch.sync="showSearch.collectiveness" @queryTable="getList(1)"></right-toolbar>-->
        </el-row>
        <el-table style="width: 100%" :data="standardList.collectiveness"  v-loading="loading.collectiveness" ref="collectivenessTable">
          <el-table-column label="序号" prop="index"></el-table-column>
          <el-table-column label="指标" prop="quotaName"></el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="人数(人)" prop="value">
            <template slot="header">
              <span>
                人数(人)
                <el-tooltip effect="dark" content="例：人数 = 5，代表：指标 > 5 人" placement="top-start">
                  <i class="el-icon-warning" style="color:#66B1FF; margin-right:2px;'"></i>
                </el-tooltip>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" v-hasPermi="['planning:standard:edit']">修改</el-button>
              <!--<el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" v-hasPermi="['planning:standard:remove']">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total.collectiveness>0" :total="total.collectiveness" :page.sync="queryCollectivenessParams.pageNum" :limit.sync="queryCollectivenessParams.pageSize" @pagination="getList(1)"/>
      </div>
    </el-row>

    <!-- 添加或修改指标信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="40%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="指标名称" prop="quotaName">
              <el-input v-model="form.quotaName" placeholder="请输入指标名称" maxlength="30"  :disabled="quotaDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="序号" prop="index">
              <el-input v-model="form.index" placeholder="请输入序号" type="number" :controls="false" @input="handleIndexInput" @keydown.native="limitInputValue"/>
            </el-form-item>
          </el-col>
          <div v-if="type == 0">
            <el-col :span="12">
              <el-form-item label="人口数(人)" prop="value">
                <el-tooltip class="item" effect="dark" content="例：人口数 = 0.5，代表：0.5/10000" placement="top-start">
                  <i class="el-icon-question" style="color:#66B1FF; margin-right:2px;'"></i>
                </el-tooltip>
                <el-input v-model="form.value" placeholder="请输入人口数" style="width: 200px" maxlength="10"   @input="handleValuePointInput" @keydown.native="limitInputValue"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上升/下降" prop="symbol">
                <el-select v-model="form.symbol" placeholder="请选择">
                  <el-option v-for="obj in symbol" :label="obj.label" :value="obj.key" :key="obj.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </div>
          <div  v-if="type == 1">
            <el-col :span="12">
              <el-form-item label="人数(人)" prop="value">
                <el-tooltip class="item" effect="dark" content="例：人数 = 5，代表：指标 > 5 人" placement="top-start">
                  <i class = "el-icon-question" style="color:#66B1FF; margin-left:5px;"></i>
                </el-tooltip>
                <el-input v-model="form.value" placeholder="请输入人数" maxlength="10" style="width: 220px"  @input="handleValueInput" @keydown.native="limitInputValue"/>
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="12">
            <el-form-item  label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.value">
                  {{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFrom">确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { handleNumber } from "@/utils/index";
  import {listStandard, getStandard, delStandard, addStandard, updateStandard} from "@/api/backstage/planning/standard";
  export default {
    name: "Standard",
    dicts: ['sys_normal_disable'],
    data() {
      return {
        // 遮罩层
        loading:{
          enterJing:true,
          collectiveness: true
        },
        showSearch:{
          enterJing:true,
          collectiveness: true
        },
        quotaDisabled: true,
        // 总条数
        total: {
          enterJing:0,
          collectiveness: 0
        },
        type: null,
        // 表格数据
        standardList: {
          enterJing: [],
          collectiveness: []
        },
        queryJingParams:{
          pageNum: 1,
          pageSize: 10,
        },
        queryCollectivenessParams:{
          pageNum: 1,
          pageSize: 10,
        },
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {
          status: "0",
        },
        // 表单校验
        rules: {
          quotaName: {required: true, message: "请输入指标名称", trigger: "blur"},
          index: {required: true, message: "请输入序号", trigger: "blur"},
          value: {required: true, message: "请输入人口数/人数", trigger: "blur"},
          symbol: {required: true, message: "请选择上升/下降", trigger: "blur"},
        },
        symbol:[
          {key:'up', label: '上升'},
          {key: 'down', label: '下降'},
        ]
      };
    },
    created() {
      this.getList(0);
      this.getList(1);
    },
    methods: {
      getList(type){
        if(0 == type) {
          this.queryJingParams.type = type;
          this.loading.enterJing = true;
          listStandard(this.queryJingParams).then(response => {
            this.standardList.enterJing = response.rows;
            this.total.enterJing = response.total;
            this.loading.enterJing = false;
          });
        }else if(1 == type){
          this.loading.collectiveness = true;
          this.queryCollectivenessParams.type = type;
          listStandard(this.queryCollectivenessParams).then(response => {
            this.standardList.collectiveness = response.rows;
            this.total.collectiveness = response.total;
            this.loading.collectiveness = false;
          });
        }
      },getSymbol(key){
        let name = "";
        this.symbol.forEach(obj =>{
          if(obj.key == key)
            name = obj.label;
        })
        return name;
      },
      handleDelete(row) {
        const standardIds = row.standardId;
        this.$modal.confirm('是否确认删除指标信息？').then(function () {
          return delStandard(standardIds);
        }).then(() => {
          this.getList(row.type);
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      openDialog(){
        this.open = true;
      },reset() {
        this.resetForm("form");
        this.form = {
          status: "0",
        };
      },closeDialog(){
        this.open = false;
      },handleAdd(type){
        this.reset();
        this.quotaDisabled = false;
        this.type = type;
        if(this.type == 0)
          this.title = "新增进京访指标";
        else if(this.type == 1)
          this.title = "新增集体访指标";
        this.openDialog();
      },handleUpdate(row){
        this.reset();
        this.quotaDisabled = true;
        this.type = row.type;
        if(this.type == 0)
          this.title = "修改进京访指标";
        else if(this.type == 1)
          this.title = "修改集体访指标";
        const standardId = row.standardId;
        getStandard(standardId).then(response => {
          this.form = response.data;
          this.openDialog();
        });
      },submitFrom(){
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.standardId != null) {
              updateStandard(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList(this.form.type);
              });
            } else {
              this.form.type = this.type;
              addStandard(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList(this.form.type);
              });
            }
          }
        });
      },limitInputValue(e) {
        let key = e.key
        if (key === 'e' || key === 'E') {
          e.returnValue = false
          return false
        }
        return true
      },handleIndexInput(value){
        this.form.index = handleNumber(value, 0);
      },handleValueInput(value){
        this.form.value = handleNumber(value, 0);
      },handleValuePointInput(value){
        this.form.value = handleNumber(value, 2);
      },handleExport(type) {
        if(type == 0) {
          this.queryJingParams.type = type;
          this.download('/planning/standard/export', {...this.queryJingParams}, `进京访指标_${new Date().getTime()}.xlsx`)
        }else if(type == 1) {
          this.queryCollectivenessParams.type = type;
          this.download('/planning/standard/export', {...this.queryCollectivenessParams}, `集体访指标_${new Date().getTime()}.xlsx`)
        }

      }
    },
  };
</script>
