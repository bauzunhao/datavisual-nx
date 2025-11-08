<template>
    <div class="app-container">
        <el-form :model="formData" :rules="rules" :inline="true" ref="form" size="small" label-width="120px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="风险监控周期" prop="monitorCycle">
                        <el-select v-model="formData.monitorCycle">
                            <el-option label="5分钟" value="0 0/5 * * * ?"></el-option>
                            <el-option label="10分钟" value="0 0/10 * * * ?"></el-option>
                            <el-option label="15分钟" value="0 0/15 * * * ?"></el-option>
                            <el-option label="20分钟" value="0 0/20 * * * ?"></el-option>
                            <el-option label="25分钟" value="0 0/25 * * * ?"></el-option>
                            <el-option label="30分钟" value="0 0/30 * * * ?"></el-option>
                            <el-option label="1小时" value="0 0 0/1 * * ?"></el-option>
                            <el-option label="2小时" value="0 0 0/2 * * ?"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="风险监控属地" prop="monitorZone">
                        <el-select v-model="formData.monitorZone">
                            <el-option
                                v-for="item in zoneOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="风险管理员" prop="adminName">
                        <el-input v-model.trim="formData.adminName" maxlength="20" placeholder="请输入风险管理员姓名"/>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="手机号码" prop="adminPhone">
                        <el-input v-model.trim="formData.adminPhone" placeholder="请输入风险管理员手机号码"/>
                    </el-form-item>
                    <el-form-item label="" prop="adminRecvLevel">
                        <el-checkbox-group v-model="formData.adminRecvLevel">
                            <el-checkbox label="1">一级</el-checkbox>
                            <el-checkbox label="2">二级</el-checkbox>
                            <el-checkbox label="3">三级</el-checkbox>
                            <el-checkbox label="4">四级</el-checkbox>
                            <el-checkbox label="5">五级</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="分管领导" prop="leaderName">
                        <el-input v-model.trim="formData.leaderName" maxlength="20" placeholder="请输入分管领导手机号码"/>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="手机号码" prop="leaderPhone">
                        <el-input v-model.trim="formData.leaderPhone" placeholder="请输入分管领导手机号码"/>
                    </el-form-item>
                    <el-form-item label="" prop="leaderRecvLevel">
                        <el-checkbox-group v-model="formData.leaderRecvLevel">
                            <el-checkbox label="1">一级</el-checkbox>
                            <el-checkbox label="2">二级</el-checkbox>
                            <el-checkbox label="3">三级</el-checkbox>
                            <el-checkbox label="4">四级</el-checkbox>
                            <el-checkbox label="5">五级</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="短信告警模版" prop="smsTemplate">
                    <el-input type="textarea" style="width: 900px;" :rows="8" v-model="formData.smsTemplate" maxlength="200" show-word-limit/>
                </el-form-item>
                <el-tooltip class="item" effect="dark" placement="right-start">
                    <div slot="content">
                        支持变量列表如下：<br/>[xfr]：信访人<br/>[nrfl]：内容分类
                    </div>
                    <i class="el-icon-question" style="color:#66B1FF; margin-right:2px;'"></i>
                </el-tooltip>
            </el-row>
            <el-row>
                <el-form-item label="情况通报模版" prop="reportTemplate">
                    <el-input type="textarea" style="width: 900px;" :rows="10" v-model="formData.reportTemplate" maxlength="800" show-word-limit/>
                </el-form-item>
                <el-tooltip class="item" effect="dark" placement="right-start">
                    <div slot="content">
                        支持变量列表如下：<br/>[xfr]：信访人<br/>[xfrq]：信访日期<br/>[xfjbh]：信访件编号<br/>[wtsd]：问题属地<br/>[nrfl]：内容分类<br/>[djsj]：事件定级时间<br/>[level]：事件级别（一级、二级……）
                    </div>
                    <i class="el-icon-question" style="color:#66B1FF; margin-right:2px;'"></i>
                </el-tooltip>
            </el-row>
            <el-form-item style="display: block; padding-left: 400px;">
                <el-button type="primary" @click="submitForm">保 存</el-button>
                <el-button @click="reset">重 置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {initZoneList} from "@/api/common/common";
import {loadData, saveSetting} from "@/api/backstage/emergency/other";

export default {
    name: "Other",
    data() {
        var validatePhone = (rule, value, callback) => {
            const reg = /^(?:\+?86)?1[3-9]\d{9}$/;
            if (value && !reg.test(value)) {
                callback(new Error('手机号码格式错误'));
            } else {
                callback();
            }
        };
        return {
            zoneOptions: [],
            formData: {
                otherId: null,
                monitorCycle: null,
                monitorZone: null,
                adminName: null,
                adminPhone: null,
                adminRecvLevel: [],
                leaderName: null,
                leaderPhone: null,
                leaderRecvLevel: [],
                smsTemplate: null,
                reportTemplate: null
            },
            // 表单校验
            rules: {
                monitorCycle: [
                    {required: true, message: "请选择监控周期", trigger: "change"}
                ],
                monitorZone: [
                    {required: true, message: "请选择监控属地区域", trigger: "change"}
                ],
                adminName: [
                    {required: true, message: "风险管理员姓名不能为空", trigger: "blur"}
                ],
                adminPhone: [
                    {required: true, message: "风险管理员手机号码不能为空", trigger: "blur"},
                    {validator: validatePhone, trigger: "blur"}
                ],
                leaderName: [
                    {required: true, message: "分管领导姓名不能为空", trigger: "blur"}
                ],
                leaderPhone: [
                    {required: true, message: "分管领导手机号码不能为空", trigger: "blur"},
                    {validator: validatePhone, trigger: "blur"}
                ],
                smsTemplate: [
                    {required: true, message: "短信告警模板不能为空", trigger: "blur"}
                ],
                reportTemplate: [
                    {required: true, message: "通报情况模板不能为空", trigger: "blur"}
                ]
            }
        };
    },
    created() {
        this.openLoading();
        this.initZone();
        this.getData();
    },
    methods: {
        // 打开加载层
        openLoading() {
            this.$modal.loading("正在加载数据，请稍候！");
        },
        initZone() {
            initZoneList().then(arr => {
                this.zoneOptions = [];
                if (arr) {
                    for (var i = 0, len = arr.length; i < len; i++) {
                        this.zoneOptions.push({id: process.env.VUE_APP_SHORT_ZONE_ID, name: '全地市', parentId: process.env.VUE_APP_SHORT_PARENT_ZONE_ID});
                        this.zoneOptions.push(arr[i]);
                        if (arr[i].children && arr[i].children.length > 0) {
                            this.zoneOptions = [...this.zoneOptions, ...arr[i].children];
                        }
                    }
                }
            });
        },
        getData() {
            loadData().then(response => {
                this.$modal.closeLoading();
                if (response) {
                    this.formData = response.data;
                    this.formData.adminRecvLevel = this.formData.adminRecvLevel ? this.formData.adminRecvLevel.split(";") : [];
                    this.formData.leaderRecvLevel = this.formData.leaderRecvLevel ? this.formData.leaderRecvLevel.split(";") : [];
                }
            });
        },
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.openLoading();
                    if (this.formData.adminRecvLevel) {
                        this.formData.adminRecvLevel = this.formData.adminRecvLevel.join(";");
                    }
                    if (this.formData.leaderRecvLevel) {
                        this.formData.leaderRecvLevel = this.formData.leaderRecvLevel.join(";");
                    }
                    saveSetting(this.formData).then(response => {
                        this.$modal.msgSuccess("保存成功");
                        this.getData();
                    });
                }
            });
        },
        reset() {
            this.openLoading();
            this.getData();
        }
    }
};
</script>
