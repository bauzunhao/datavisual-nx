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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['grid:community:add']"
        >新增</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="communityList" >
      <el-table-column label="网格名称" align="center" prop="name" />
      <el-table-column label="网格属地" align="center" prop="zoneName" />
      <el-table-column label="网格人数" align="center" prop="num" />
      <el-table-column label="描述" align="center" prop="describe" :show-overflow-tooltip="true"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['grid:community:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['grid:community:remove']"
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

    <!-- 添加或修改网格社区对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="网格名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入网格名称" />
        </el-form-item>
        <el-form-item label="属地" prop="zoneId">
            <el-cascader
                v-model="form.zoneId"
                placeholder="请选择单位属地"
                :props="zoneProps"
                :options="zoneOptions"
                clearable
                style="width: 380px"
            />
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input v-model="form.describe" type="textarea"  :rows="7" maxlength="250" show-word-limit placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listCommunity, getCommunity, delCommunity, addCommunity, updateCommunity } from "@/api/backstage/grid/community";
import {initZoneList} from "@/api/common/common";

export default {
  name: "Community",
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
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
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
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "网格名称不能为空", trigger: "blur" }
        ],
        zoneId: [
          { required: true, message: "属地不能为空", trigger: "blur" }
        ],
      }
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
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        zoneId: null,
        describe: null,
        status: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
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
      this.ids = selection.map(item => item.id);
      this.single = selection.length!==1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加网格社区";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getCommunity(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改网格社区";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCommunity(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCommunity(this.form).then(response => {
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
      if(row.num > 0){
          this.$modal.msgError("当前要删除网格社区存在网格人员，不能删除！");
          return
      }
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除网格社区数据项？').then(function() {
        return delCommunity(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/community/export', {
        ...this.queryParams
      }, `community_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
