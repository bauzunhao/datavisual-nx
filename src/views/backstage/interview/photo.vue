<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="100px">
                <el-form-item label="接访下访干部姓名" prop="cadreName" label-width="130px">
                    <el-input
                        v-model="queryParams.cadreName"
                        placeholder=""
                        clearable
                    />
                </el-form-item>
                <el-form-item label="信访件姓名" prop="letterName">
                    <el-input
                        v-model="queryParams.letterName"
                        placeholder=""
                        clearable
                    />
                </el-form-item>
                <el-form-item label="信访件编号" prop="letterCode">
                    <el-input
                        v-model="queryParams.letterCode"
                        placeholder=""
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
                <el-form-item label="接访下访日期" prop="interviewTime">
                    <el-date-picker
                        v-model="interviewTime"
                        style="width: 240px"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                    type="primary"
                    plain :disabled="single"
                    icon="el-icon-setting"
                    size="mini"
                    @click="phoneSetting"
                    v-hasPermi="['interview:photo:edit']"
                >大屏展示图片设置
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="danger"
                    plain :disabled="single"
                    icon="el-icon-delete"
                    size="mini"
                    @click="calcelAll"
                >取消全选
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="primary"
                    plain
                    icon="el-icon-plus"
                    size="mini"
                    @click="selectAll"
                >全选
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

        <div class="demo-image__placeholder">
            <div style="display:inline;padding: 10px" v-for="img in settingList" :key="img.settingId">
                <div style="width: 300px; height: 300px" class="el-image" @click="showImg(img)">
                    <img :src="img.fileUrl" class="el-image__inner" style="object-fit: fill;"/>
                    <div class="checkbox" style="position:absolute;top:0;right:0;z-index:10;padding-right:5px;">
                        <input type="checkbox" :value="img.uid" :checked="img.show"/>
                    </div>
                </div>
            </div>
        </div>
        <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
        />
        <!-- 添加或修改大屏照片设置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
            <el-form label-width="90px">
                <el-form-item>
                    <el-button type="default" plain icon="el-icon-plus" @click="selectImg(true)">选为固定图片</el-button>
                    <el-button type="default" plain icon="el-icon-plus" @click="selectImg(false)">选为轮播图片</el-button>
                    <span style="color: red;font-size: 14px">注: 大屏固定图片选择不能超过两张</span>
                </el-form-item>
                <el-form-item label="固定图片">
                    <div class="demo-image__placeholder">
                        <div style="display:inline;padding: 10px" v-for="img in checketList" :key="img.settingId"
                             v-if="img.regular">
                            <div style="width: 150px; height: 150px" class="el-image" @click="checkedImg(img)">
                                <img :src="img.fileUrl" class="el-image__inner" style="object-fit: fill;"/>
                                <div class="checkbox"
                                     style="position:absolute;top:0;right:0;z-index:10;padding-right:5px;">
                                    <input type="checkbox" :value="img.uid" :checked="img.show && img.checked"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="轮播图片">
                    <div class="demo-image__placeholder">
                        <div style="display:inline;padding: 10px" v-for="img in checketList" :key="img.settingId"
                             v-if="!img.regular">
                            <div style="width: 150px; height: 150px" class="el-image" @click="checkedImg(img)">
                                <img :src="img.fileUrl" class="el-image__inner" style="object-fit: fill;"/>
                                <div class="checkbox"
                                     style="position:absolute;top:0;right:0;z-index:10;padding-right:5px;">
                                    <input type="checkbox" :value="img.uid" :checked="img.show && img.checked"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitSetting">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {initNowDate} from "@/utils/index";
    import {initZoneList} from "@/api/common/common";
    import {listSetting, updateSetting} from "@/api/backstage/interview/photo";

    export default {
        name: "IPhoto",
        data() {
            return {
                // 遮罩层
                loading: true,
                // 显示搜索条件
                showSearch: true,
                // 总条数
                total: 0,
                single: true,// 非单个禁用
                // 大屏照片设置表格数据
                settingList: [],
                checketList: [],  //选择的图片
                // 弹出层标题
                title: "设置大屏照片",
                // 是否显示弹出层
                open: false,
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                },
                //地区参数
                zoneProps: {
                    label: "name",
                    value: "id",
                    checkStrictly: true,
                    emitPath: false,
                },
                zoneOptions: [],
                interviewTime: initNowDate(),
            };
        },
        created() {
            this.initZone();
            this.getList();
        },
        methods: {
            // 初始化行政区域
            initZone() {
                initZoneList({
                    id: process.env.VUE_APP_SUPER_ZONE_ID
                }).then(response => {
                    this.zoneOptions = [];
                    this.zoneOptions = response;
                });
            },
            /** 查询大屏照片设置列表 */
            getList() {
                this.loading = true;
                listSetting(this.addDateRange(this.queryParams, this.interviewTime)).then(response => {
                    this.settingList = response.rows;
                    let flag = false;
                    this.settingList.forEach(obj => {
                        if (obj.show) {
                            flag = true;
                        }
                    });
                    if (flag) {
                        this.single = false;
                    } else {
                        this.single = true;
                    }
                    this.total = response.total;
                    this.loading = false;
                });
            },
            // 取消按钮
            cancel() {
                this.open = false;
            },
            /** 搜索按钮操作 */
            handleQuery() {
                this.queryParams.pageNum = 1;
                this.getList();
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.resetForm("queryForm");
                this.interviewTime = initNowDate();
                this.handleQuery();
            },
            /** 新增按钮操作 */
            phoneSetting() {
                this.open = true;
                this.checketList = [];
                this.settingList.forEach(obj => {
                    if (obj.show) {
                        this.$set(obj, 'checked', false)
                        this.checketList.push(obj);
                    }
                })
            },//选中上大屏
            showImg(row) {
                row.show = !row.show;
                let flag = false;
                this.settingList.forEach(obj => {
                    if (obj.show) {
                        flag = true;
                    }
                });
                if (flag) {
                    this.single = false;
                } else {
                    this.single = true;
                }
            },//选择图片
            checkedImg(obj) {
                obj.checked = !obj.checked
            },
            //选为固定或轮播图片
            selectImg(regular) {
                this.checketList.forEach(obj => {
                    if (obj.checked) {
                        obj.regular = regular;
                        obj.checked = !obj.checked;
                    }
                })
            },
            /**设置*/
            submitSetting() {
                let regularList = [];
                this.checketList.forEach(obj => {
                    if (obj.show && obj.regular) regularList.push(obj);
                });
                if (regularList.length > 2) {
                    this.$modal.msgError("大屏固定图片选择不能超过两张");
                    return;
                }
                updateSetting(this.checketList).then(response => {
                    this.$modal.msgSuccess("设置成功");
                    this.open = false;
                    this.getList();
                });
            },//全选
            selectAll() {
                this.checketList = [];
                this.single = false;
                this.settingList.forEach(obj => {
                    obj.show = true;
                    this.checketList.push(obj);
                })
            },
            //取消全选
            calcelAll() {
                this.checketList = [];
                this.single = true;
                this.settingList.forEach(obj => {
                    obj.show = false;
                })
            }
        }
    };
</script>

