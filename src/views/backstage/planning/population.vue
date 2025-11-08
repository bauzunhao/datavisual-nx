<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="68px">
            <el-form-item label="所属地" prop="zoneId">
                <el-cascader :disabled="false"
                             v-model="queryParams.zoneId"
                             placeholder="请选择所属地"
                             :props="zoneProps"
                             :options="zoneOptions"
                             :show-all-levels="false"
                             clearable
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
                    v-hasPermi="['planning:population:add']"
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
                    v-hasPermi="['planning:population:remove']"
                >删除
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning"
                    plain
                    icon="el-icon-download"
                    size="mini"
                    @click="handleExport"
                    v-hasPermi="['planning:population:export']"
                >导出
                </el-button>
            </el-col>
            <!--      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
        </el-row>

        <el-table v-loading="loading" :data="populationList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column label="所属地" align="center" prop="zoneId">
                <template slot-scope="scope">
                    {{scope.row.zoneName}}
                </template>
            </el-table-column>
            <el-table-column label="人口数(人)" align="center" prop="population"/>
            <el-table-column label="GDP(万元)" align="center" prop="gdp"/>
            <el-table-column label="全国人口统计期数" align="center" prop="periods"/>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                        v-hasPermi="['planning:population:edit']"
                    >修改
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['planning:population:remove']"
                    >删除
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

        <!-- 添加或修改示范县人口信息对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属地" prop="zoneId">
                            <el-select :disabled="disabled" v-model="form.zoneId" placeholder="请选择所属地" clearable>
                                <el-option
                                    v-for="item in zoneOperateOptions"
                                    :label="item.name"
                                    :value="item.id"
                                    :key="item.id"
                                    :disabled="item.disabled"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="统计期数" prop="periods">
                            <el-tooltip class="item" placement="top">
                                <template slot="content">
                                    当前统计人口期数: {{initPeriods}}
                                    <el-button type="primary" @click="form.periods = initPeriods" size="mini">设置为当前期数
                                    </el-button>
                                </template>
                                <i class="el-icon-question" style="color:#66B1FF; margin-left:5px;"></i>
                            </el-tooltip>
                            <el-input v-model="form.periods" placeholder="请输入人口统计期数" style="width: 210px"
                                      @input="handlePeriodsInput" @keydown.native="limitInputValue"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="人口数(人)" prop="population">
                            <el-input v-model="form.population" placeholder="请输入人口数"
                                      @input="handlePopulationInput" @keydown.native="limitInputValue"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="GDP(万元)" prop="gdp">
                            <el-input v-model="form.gdp" placeholder="请输入GDP" :controls="false"
                                      @input="handleGDPInput" @keydown.native="limitInputValue"/>
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
    import {initZoneList} from "@/api/common/common";
    import {handleNumber} from "@/utils/index";
    import {
        listPopulation,
        getPopulation,
        delPopulation,
        addPopulation,
        updatePopulation
    } from "@/api/backstage/planning/population";

    export default {
        name: "Population",
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
                // 示范县人口信息表格数据
                populationList: [],
                // 弹出层标题
                title: "",
                // 是否显示弹出层
                open: false,
                //属地禁用
                disabled: true,
                //默认人口期数
                initPeriods: 0,
                //所属地选择
                zoneProps: {
                    label: "name",
                    value: "id",
                    checkStrictly: true,
                    emitPath: false
                },
                //查询下拉级联
                zoneOptions: [],
                //增加或修改操作属地下拉框
                zoneOperateOptions: [],
                //是否初始化完成
                initList: false,
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 20,
                    zoneId: null,
                    population: null,
                    gdp: null,
                },
                // 多个id查询
                populationIds: "",
                // 表单参数
                form: {},
                // 表单校验
                rules: {
                    zoneId: [
                        {required: true, message: "所属地不能为空", trigger: "blur"}
                    ],
                    population: [
                        {required: true, message: "人口数不能为空", trigger: "blur"}
                    ],
                    gdp: [
                        {required: true, message: "GDP不能为空", trigger: "blur"}
                    ],
                    periods: [
                        {required: true, message: "统计期数不能为空", trigger: "blur"}
                    ]
                },
                reg: /^[^0-9.]*$/
            };
        }, created() {
            this.initZone();
            this.getConfigKey("planning.population.periods").then(response => {
                this.initPeriods = response.msg;
            });
            this.getList();
        }, methods: {
            // 初始化行政区域
            initZone() {
                initZoneList({id: process.env.VUE_APP_ZONE_ID}).then(response => {
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
            /** 查询示范县人口信息列表 */
            getList() {
                this.loading = true;
                listPopulation(this.queryParams).then(response => {
                    this.populationList = response.rows;
                    this.total = response.total;
                    this.loading = false;
                    if (response.rows && !this.initList) {
                        this.initList = true;
                        this.zoneOperateOptions.forEach(zone => {
                            zone.disabled = false;
                            response.rows.forEach(obj => {
                                if (obj.zoneId == zone.id) {
                                    zone.disabled = true;
                                }
                            })
                        })
                    }
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
                    populationId: null,
                    zoneId: null,
                    population: null,
                    gdp: null,
                    periods: null,
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
                this.ids = selection.map(item => item.populationId);
                this.single = selection.length !== 1;
                this.multiple = !selection.length;
            },
            /** 新增按钮操作 */
            handleAdd() {
                this.reset();
                this.open = true;
                this.form.periods = this.initPeriods;
                this.disabled = false;
                this.title = "添加示范县人口信息";
                this.initList = false;
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset();
                const populationId = row.populationId || this.ids;
                getPopulation(populationId).then(response => {
                    this.form = response.data;
                    this.open = true;
                    this.disabled = true;
                    this.title = "修改示范县人口信息";
                });
            },
            /** 提交按钮 */
            submitForm() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.populationId != null) {
                            updatePopulation(this.form).then(response => {
                                this.$modal.msgSuccess("修改成功");
                                this.open = false;
                                this.getList();
                            });
                        } else {
                            addPopulation(this.form).then(response => {
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
                const populationIds = row.populationId || this.ids;
                this.$modal.confirm('是否确认删除示范县人口信息？').then(function () {
                    return delPopulation(populationIds);
                }).then(() => {
                    this.initList = false;
                    this.getList();
                    this.$modal.msgSuccess("删除成功");
                }).catch(() => {
                });
            },

            /** 导出按钮操作 */
            handleExport(row) {
                this.queryParams.populationIds = row.populationId || this.ids;
                this.download('planning/population/export', {
                    ...this.queryParams
                }, `示范县人口信息_${new Date().getTime()}.xlsx`)
            },

            limitInputValue(e) {
                let key = e.key;
                console.log(key);
                if (this.reg.test(key + "") && 'Backspace' !== key && 'Delete' !== key) {
                    e.returnValue = false
                    return false
                }
                return true
            },
            handleGDPInput(value) {
                let valStr = (value + "").replace(this.reg, '');
                this.form.gdp = handleNumber(valStr, 6);
            },
            handlePopulationInput(value) {
                let valStr = (value + "").replace(this.reg, '');
                this.form.population = handleNumber(valStr, 0);
            },
            handlePeriodsInput(value) {
                let valStr = (value + "").replace(this.reg, '');
                this.form.periods = handleNumber(valStr, 0);
            },
        }
    };
</script>
