<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="登记日期">
        <el-date-picker
          v-model="dateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="信访形式" prop="letterType">
        <el-select v-model="queryParams.letterType" clearable>
          <el-option label="全部" value="" ></el-option>
          <el-option v-for="dict in dict.type.sys_letter_type" :label="dict.label" :value="dict.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登记单位" prop="registerIds">
        <div style="display: inline-block;width: 300px;">
          <treeselect
            v-model="queryParams.registerOrgIds"
            :options="registerUnitData"
            :normalizer="normalizer"
            :multiple="true"
            :flat="true"
            placeholder="选择登记单位"
          />
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button type="primary" icon="el-icon-download" size="mini" @click="exportlist">导出</el-button>
      </el-form-item>
    </el-form>

   <div ref="eltables" >
     <el-table  :data="officeList" v-loading="loading">
       <el-table-column label="件次" align="center" key="num" prop="num" />
       <el-table-column label="人次" align="center" key="rcNum" prop="rcNum"  />
       <el-table-column label="办结" align="center" key="bjNum" prop="bjNum"   />
       <el-table-column label="办结率" align="center" key="bjl" prop="bjl"  />
       <el-table-column label="同期件次" align="center" key="oldNum" prop="oldNum"  />
       <el-table-column label="同期人次" align="center" key="rcOldNum" prop="rcOldNum"  />
       <el-table-column label="同比（件次）" align="center" key="numTb" prop="numTb"  />
       <el-table-column label="同比（人次）" align="center" key="rcNumTb" prop="rcNumTb"  />
       <el-table-column label="主要诉求分类占比前五（不含其他类）" align="center" key="contenTypeNames" prop="contenTypeNames"  width="360"/>
     </el-table>
     <div v-html="ht_html" class="ht_html"></div>
   </div>
  </div>
</template>
<script>
  import { listData,listRegisterUnit } from "@/api/backstage/work/office";
  import { initNowDate } from "@/utils/index";
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";

  import { downloadXlsx } from '@/utils/xlsx'

  export default {
    name: "Office",
    dicts: ['sys_letter_type'],
    components: { Treeselect },
    data() {
      return {
        loading: false,
        officeList:[{}],
        // 显示搜索条件
        showSearch: true,
        // 日期范围
        dateRange:initNowDate(),
        // 查询参数
        queryParams: {
          letterType: "",
          registerOrgIds:[]
        },
        ht_html:null,
        registerUnitData: [{}]
      };
    },
    created() {
      this.initRegisterUnit();
      this.handleQuery();
    },
    methods: {
      initRegisterUnit(){
        listRegisterUnit().then(response => {
          this.registerUnitData = [{}];
          if (response.data) {
            this.registerUnitData=response.data;
          }
        });
      },
      /** 转换菜单数据结构 */
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.id,
          label: node.name,
          children: node.children
        };
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.loading = true;
        this.ht_html = "";
        listData(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.officeList = [{}];
          if (response.data) {
            this.officeList[0] = response.data;
            this.ht_html = response.data.ht_html;
          }
          this.loading = false;
        });
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.dateRange = initNowDate();
        this.resetForm("queryForm");
        this.handleQuery();
      },
      //导出
      exportlist(){
        downloadXlsx(this.$refs.eltables,"办公常用")
      },

    }
  };
</script>
<style lang="scss">
  .ht_html{
    padding: 20px 60px;
    p{
      line-height: 2em;
    }
  }

</style>


