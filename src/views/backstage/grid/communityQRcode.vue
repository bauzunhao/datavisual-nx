<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="网格名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入网格名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="属地" prop="zoneId">
          <el-cascader
              v-model="queryParams.zoneId"
              placeholder="请选择单位属地"
              :props="zoneProps"
              :options="zoneOptions"
              clearable
              style="width: 280px"
          />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>


    <el-table v-loading="loading" :data="communityList" >
      <el-table-column label="网格名称" align="center" prop="name" />
      <el-table-column label="网格属地" align="center" prop="zoneName" />
      <el-table-column label="网格人数" align="center" prop="num" />
      <el-table-column label="二维码" align="center"  prop="id">
          <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                  <qrcode-vue :value="getQRCode(scope.row.id)" :size="160" :level="'H'" :margin="0"/>
                  <div slot="reference" class="name-wrapper">
                      <qrcode-vue :value="getQRCode(scope.row.id)" :size="50" :level="'H'" :margin="0"/>
                  </div>
              </el-popover>
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
  </div>
</template>

<script>
import { listCommunity } from "@/api/backstage/grid/community";
import {initZoneList} from "@/api/common/common";
import QrcodeVue from "qrcode.vue";
export default {
  name: "CommunityQRcode",
  components: { QrcodeVue },
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
      // 总条数
      total: 0,
      // 网格社区表格数据
      communityList: [],

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        zoneId: null,
      },
      zoneProps: {
            label: "name",
            value: "id",
            emitPath: false,
      },
      zoneOptions: [],
      //增加或修改操作属地下拉框
      zoneOperateOptions: [],
    };
  },
  created() {
      this.initZone();
      this.getList();
  },
  methods: {
     // 初始化行政区域
     initZone() {
          initZoneList({id: process.env.VUE_APP_ZONE_ID,depth:2}).then(response => {
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
      getQRCode(id) {
         //后续调整路径
          //return 'http://192.168.2.179:80/phoneform?communityId='+id;
          return window.location.origin + '/grid/phoneform?communityId='+id;
      },
    /** 查询网格社区列表 */
    getList() {
      this.loading = true;
      listCommunity(this.queryParams).then(response => {
        this.communityList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
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
      this.ids = selection.map(item => item.id);
      this.single = selection.length!==1;
      this.multiple = !selection.length;
    },

  }
};
</script>
