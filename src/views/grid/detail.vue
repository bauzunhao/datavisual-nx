<template>
    <div class="app">
        <UserHeat :message="pageTitle"/>
        <div class="cont">
            <div v-if="showDetail">
                <el-descriptions title="详细信息" :column="1">
                    <el-descriptions-item label="姓名">{{this.complaintDetail.name}}</el-descriptions-item>
                    <el-descriptions-item label="手机号码">{{this.complaintDetail.mobile}}</el-descriptions-item>
                    <el-descriptions-item label="所属网格社区">{{this.complaintDetail.communityName}}</el-descriptions-item>
                    <el-descriptions-item label="事项类别">{{this.complaintDetail.contentTypeName}}</el-descriptions-item>
                    <el-descriptions-item label="反映类型">{{this.complaintDetail.typeName}}</el-descriptions-item>
                    <el-descriptions-item label="投诉时间">{{this.complaintDetail.complaintTime}}</el-descriptions-item>
                    <el-descriptions-item label="事情发生地">{{this.complaintDetail.addressName}}</el-descriptions-item>
                    <el-descriptions-item label="当前办理状态">{{statusData[this.complaintDetail.status]}}</el-descriptions-item>
                    <el-descriptions-item label="流转状态">{{stateData[this.complaintDetail.state]}}</el-descriptions-item>
                    <el-descriptions-item label="事项内容">{{this.complaintDetail.content}}</el-descriptions-item>
                    <el-descriptions-item label="办理结果" v-if="1 === this.complaintDetail.isEnd">{{this.complaintDetail.solveResult}}</el-descriptions-item>
                    <el-descriptions-item label="评价状态" v-if="1 === this.complaintDetail.isEnd">{{this.complaintDetail.pjStatusStr}}</el-descriptions-item>
                    <el-descriptions-item label="评价结果" v-if="1 === this.complaintDetail.isEnd && 0 !== this.complaintDetail.pjStatus">{{this.complaintDetail.pjResultStr}}</el-descriptions-item>
                    <el-descriptions-item label="评价时间" v-if="1 === this.complaintDetail.isEnd && 0 !== this.complaintDetail.pjStatus">{{this.complaintDetail.pjTime}}</el-descriptions-item>
                </el-descriptions>
                <div style="text-align: center;margin-top: 20px;" v-if="1 === this.complaintDetail.isEnd && 0 === this.complaintDetail.pjStatus">
                    <el-button type="primary" @click="handledEvaluate">我要评价</el-button>
                </div>
            </div>
            <div v-if="!showDetail">
                <el-form label-position="top" label-width="80px">
                    <el-form-item label="满意度评价">
                        <el-radio-group v-model="evaluateValue">
                            <el-radio :label="0">满意</el-radio>
                            <el-radio :label="1">基本满意</el-radio>
                            <el-radio :label="2">不满意</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item class="submit">
                        <el-button type="primary" @click="submitEvaluate">提交</el-button>
                        <el-button @click="backDetail">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import UserHeat from '@/components/UserHeat';
import {getComplaint, updateEvaluate} from '@/api/grid/complaint'

export default {
    name: 'GridComplaintDetail',
    components: {
        UserHeat
    },
    data() {
        return {
            showDetail: true,
            pageTitle: "事项详情",
            statusData: ["待办理", "办理中", "已办结"],
            stateData: ["待流转", "自办", "转政法委", "转其他网格片区"],
            endData: ["未办结", "已办结"],
            acceptData: ["受理", "不予受理", "存"],
            complaintDetail: {},
            evaluateValue: 0
        }
    },
    mounted() {
        this.loadDetail();
    },
    methods: {
        loadDetail() {
            let id = this.$route.query.id;
            getComplaint(id).then(response => {
                if (response && 200 === response.code) {
                    this.complaintDetail = response.data;
                }
            });
        },
        handledEvaluate() {
            if (1 === this.complaintDetail.isEnd && 0 === this.complaintDetail.pjStatus) {
                this.showDetail = false;
                this.pageTitle = "我要评价";
            } else {
                this.$message.info("当前状态无法评价");
            }
        },
        submitEvaluate() {
            updateEvaluate(this.complaintDetail.id, this.evaluateValue).then(response => {
                if (response && 200 === response.code) {
                    this.$message.success("评价成功");
                    this.backDetail();
                } else {
                    this.$message.error("评价失败");
                }
            });
        },
        backDetail() {
            this.loadDetail();
            this.showDetail = true;
            this.pageTitle = "事项详情";
        }
    }
};
</script>

<style scoped lang="scss">
.app {
    .cont {
        padding: 20px;
    }

}
</style>
