<template>
    <div class="app">
        <UserHeat message="我的建议"/>
        <div class="cont">
            <router-link :to="{path: '/grid/detail', query: {id: item.id}}" v-for="(item, index) in this.complaintList">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{item.complaintTime}}在{{item.communityName}}进行{{item.typeName}}</span>
                    </div>
                    <div class="text item">姓名：{{item.name}}</div>
                    <div class="text item">手机号码：{{item.mobile}}</div>
                    <div class="text item">详细地址：{{item.addressName}}</div>
                    <div class="text item">事项类别：{{item.contentTypeName}}</div>
                    <div class="text item">事项内容：{{item.content}}</div>
                    <div class="text item">办件状态：{{statusData[item.status]}}</div>
                    <div class="text item">流转状态：{{stateData[item.state]}}</div>
                    <div class="text item">办结状态：{{item.endStr}}</div>
                </el-card>
            </router-link>
        </div>
    </div>
</template>

<script>
import UserHeat from '@/components/UserHeat';
import {getList} from "@/api/grid/complaint";

export default {
    name: "GridComplaint",
    components: {
        UserHeat
    },
    data() {
        return {
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                type: 0
            },
            statusData: ["待办理", "办理中", "已办结"],
            stateData: ["待流转", "自办", "转政法委", "转其他网格片区"],
            endData: ["未办结", "已办结"],
            acceptData: ["受理", "不予受理", "存"],
            complaintList: []
        }
    },
    mounted() {
        this.loadList();
    },
    methods: {
        loadList() {
            getList(this.queryParams).then(response => {
                if (response && 200 === response.code) {
                    this.complaintList = response.rows;
                }
            });
        }
    }
}
</script>

<style scoped lang="scss">
.cont {
    padding: 20px;

    .box-card {
        margin-bottom: 10px;

        .clearfix span {
            font-size: 16px;
        }

        .text {
            font-size: 14px;
        }

        .item {
            padding: 5px 0;
        }
    }
}
</style>
