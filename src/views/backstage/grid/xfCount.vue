<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
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

      <el-tabs v-model="heatactiveName" @tab-click="handleClick">
          <el-tab-pane label="网格信访占比情况统计" name="first">
              <el-row :gutter="10" class="mb8">
                  <el-col :span="1.5">
                      <el-button
                          type="warning"
                          plain
                          icon="el-icon-download"
                          size="mini"
                          @click="handleExport(1)"
                      >导出</el-button>
                  </el-col>
              </el-row>
              <div ref="eltablesExport">
                  <el-table :data="endTableData" style="width: 100%"  >
                      <el-table-column label="问题发生地" align="center" prop="zoneName"/>
                      <el-table-column label="各地市占比分布" align="center">
                          <el-table-column label="总量" align="center" prop="num"/>
                          <el-table-column label="占比" align="center" prop="ratio"/>
                      </el-table-column>
                  </el-table>
              </div>
          </el-tab-pane>
          <el-tab-pane label="网格信访派件情况统计" name="delivery">
              <el-row :gutter="10" class="mb8">
                  <el-col :span="1.5">
                      <el-button
                          type="warning"
                          plain
                          icon="el-icon-download"
                          size="mini"
                          @click="handleExport(2)"
                      >导出</el-button>
                  </el-col>
              </el-row>
              <div ref="eltablesExport2">
                  <el-table :data="endTableData" style="width: 100%"  >
                      <el-table-column label="问题发生地" align="center" prop="zoneName"/>
                      <el-table-column label="派件情况各地市分布" align="center">
                          <el-table-column label="总件次" align="center" prop="num"/>
                          <el-table-column label="已派" align="center" prop="pjsNum"/>
                          <el-table-column label="未派" align="center" prop="noPjsNum"/>
                      </el-table-column>
                  </el-table>
              </div>
          </el-tab-pane>
          <el-tab-pane label="网格信访办结情况统计" name="second">
              <el-row :gutter="10" class="mb8">
                  <el-col :span="1.5">
                      <el-button
                          type="warning"
                          plain
                          icon="el-icon-download"
                          size="mini"
                          @click="handleExport(3)"
                      >导出</el-button>
                  </el-col>
              </el-row>
              <div ref="eltablesExport3">
                  <el-table :data="endTableData"style="width: 100%">
                      <el-table-column label="问题发生地" align="center" prop="zoneName"/>
                      <el-table-column label="办结情况各地市分布" align="center">
                          <el-table-column label="总量" align="center" prop="num"/>
                          <el-table-column label="已办结" align="center" prop="endNum"/>
                          <el-table-column label="未办结" align="center" prop="noEndNum"/>
                      </el-table-column>
                  </el-table>
              </div>
          </el-tab-pane>
          <el-tab-pane label="网格信访满意度统计" name="third">
              <el-row :gutter="10" class="mb8">
                  <el-col :span="1.5">
                      <el-button
                          type="warning"
                          plain
                          icon="el-icon-download"
                          size="mini"
                          @click="handleExport(4)"
                      >导出</el-button>
                  </el-col>
              </el-row>
              <div ref="eltablesExport4">
                  <el-table :data="endTableData"style="width: 100%">
                      <el-table-column label="问题发生地" align="center" prop="zoneName"/>
                      <el-table-column label="满意度情况各地市分布" align="center">
                          <el-table-column label="总量" align="center" prop="num"/>
                          <el-table-column label="满意" align="center" prop="myNum"/>
                          <el-table-column label="基本满意" align="center" prop="jbmyNum"/>
                          <el-table-column label="不满意" align="center" prop="bmyNum"/>
                      </el-table-column>
                  </el-table>
              </div>
          </el-tab-pane>
          <el-tab-pane label="网格信访事项类别统计" name="fourth">
              <el-row :gutter="10" class="mb8">
                  <el-col :span="1.5">
                      <el-button
                          type="warning"
                          plain
                          icon="el-icon-download"
                          size="mini"
                          @click="handleExport(5)"
                      >导出</el-button>
                  </el-col>
              </el-row>
              <div ref="eltablesExport5">
                  <el-table :data="contentTableData"style="width: 100%" >
                      <el-table-column label="事项类别" align="center" prop="contentTypeName"/>
                      <el-table-column label="事项类别情况分布" align="center">
                          <el-table-column label="总量" align="center" prop="num"/>
                          <el-table-column label="占比" align="center" prop="contentTypeRatio"/>
                      </el-table-column>
                  </el-table>
              </div>
          </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { listReportGroupByZone,listReportGroupByContentType} from "@/api/backstage/grid/complaint";
import { allList} from "@/api/backstage/grid/community";
import {initNowDate} from "@/utils/index";
import { downloadXlsx } from '@/utils/xlsx'
export default {
  name: "xfCount",
  data() {
    return {
      endTableData : [],
      contentTableData : [],
      heatactiveName: 'first',
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 日期范围
      dateRange: initNowDate(),
      // 评价日期范围
      pjDateRange: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 查询参数
      queryParams: {
        communityId: null,
      },
      //网格社区数据
      communityList:[],
      // 查询网格社区参数
      queryCommunityParams: {
      },

    };
  },
  created() {
    this.getList(1);
    this.getCommunityList();
  },
  methods: {
    getCommunityList() {
        allList(this.queryCommunityParams).then(response => {
            this.communityList = response.rows;
        });
    },
    handleClick(tab, event) {
          console.log(tab, event);
          if('fourth' == tab.name){
              this.getContentTypeList(5);
          }else{
              this.getList(1);
          }
    },
    /** 查询 */
    getList(type) {
        this.loading = true;
        // 添加日期范围查询参数
        this.queryParams = this.addDateRange(this.queryParams, this.dateRange);
        listReportGroupByZone(this.queryParams).then(response => {
            if (response && 200 == response.code) {
                const tableData = response.data;
                // 如果有数据，计算合计
                if (tableData.length >= 0) {
                    const totalNum = tableData.reduce((sum, item) => sum + item.num, 0);
                    const totalPjsNum = tableData.reduce((sum, item) => sum + item.pjsNum, 0);
                    const totalNoPjsNum = tableData.reduce((sum, item) => sum + item.noPjsNum, 0);
                    const totalEndNum = tableData.reduce((sum, item) => sum + item.endNum, 0);
                    const totalNoEndNum = tableData.reduce((sum, item) => sum + item.noEndNum, 0);
                    const totalmyNum = tableData.reduce((sum, item) => sum + item.myNum, 0);
                    const totaljbmyNum = tableData.reduce((sum, item) => sum + item.jbmyNum, 0);
                    const totalbmyNum = tableData.reduce((sum, item) => sum + item.bmyNum, 0);
                    // 创建合计行
                    const summaryRow = {
                        zoneName: '合计', // 显示在第一列
                        num: totalNum,
                        pjsNum: totalPjsNum,
                        noPjsNum: totalNoPjsNum,
                        endNum: totalEndNum,
                        noEndNum: totalNoEndNum,
                        myNum: totalmyNum,
                        jbmyNum: totaljbmyNum,
                        bmyNum: totalbmyNum,
                    };
                    // 将合计行添加到数据的最后一行
                    this.endTableData = tableData.map(item => ({ ...item }));
                    this.endTableData.push(summaryRow);
                }
                // 删除不需要的元素
                const unwantedElement = document.querySelector('.gutter');
                if (unwantedElement) {
                    unwantedElement.remove();
                }
            }
            this.loading = false;
        });
    },

      /** 查询内容分类数据 */
      getContentTypeList() {
          this.loading = true;
          this.queryParams = this.addDateRange(this.queryParams, this.dateRange);
          listReportGroupByContentType(this.queryParams).then(response => {
              if (response && 200 == response.code) {
                  const  tableData = response.data;
                  if (this.endTableData.length >= 0) {
                      const totalNum = tableData.reduce((sum, item) => sum + item.num, 0);
                      // 创建合计行
                      const summaryRow = {
                          contentTypeName: '合计', // 显示在第一列
                          num: totalNum
                      };
                      // 将合计行添加到数据的最后一行
                      this.contentTableData = tableData.map(item => ({...item}));
                      this.contentTableData.push(summaryRow);
                  }
                  // 删除不需要的元素
                  const unwantedElement = document.querySelector('.gutter');
                  if (unwantedElement) {
                      unwantedElement.remove();
                  }
              }
              this.loading = false;
          });
      },

    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
      this.getContentTypeList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.dateRange = initNowDate();
      this.pjDateRange = [];
      this.handleQuery();
    },

      /** 导出按钮操作 */
    handleExport(type) {
          if(1 == type){
              downloadXlsx(this.$refs.eltablesExport,"网格信访占比情况统计")
          }else if(2 == type){
              downloadXlsx(this.$refs.eltablesExport2,"网格信访派件情况统计")
          }else if(3 == type){
              downloadXlsx(this.$refs.eltablesExport3,"网格办结情况统计")
          }else if(4 == type){
              downloadXlsx(this.$refs.eltablesExport4,"网格满意度情况统计")
          }else if(5 == type){
              downloadXlsx(this.$refs.eltablesExport5,"网格事项类别情况统计")
          }

      },
  },
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
