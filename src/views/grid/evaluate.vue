<template>
    <div class="app">
        <div class="phoneheat">
            <h2>拉萨市网格信访</h2>
            <p v-if="false">您所在网格：网格名称</p>
        </div>
        <div class="cont">
            <el-form label-position="top" label-width="80px" >
                <el-form-item label="满意度评价码">
                    <el-radio-group>
                        <el-radio label="满意"></el-radio>
                        <el-radio label="基本满意"></el-radio>
                        <el-radio label="不满意"></el-radio>
                    </el-radio-group>
                    <el-form-item class="submit">
                        <el-button type="primary" >提交</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form-item>
            </el-form>
        </div>
        <GridBottomNavBar active='evaluate' :community-id="communityId"/>
    </div>
</template>

<script setup>
import GridBottomNavBar from '@/components/GridBottomNavBar';
export default {
    name: "evaluate",
    components: {
        GridBottomNavBar,
    },
    computed: {
        communityId() {
            return this.$route.query.communityId
        }
    }
}
</script>

<style scoped lang="scss">
.app{
    padding: 20px 10px;
    padding-bottom: 60px;
    .phoneheat{
        h2{
            font-size: 28px;
            margin: 10px 0;
        }
        p{
            font-size: 16px;
        }
    }
    .submit{
        text-align: center;
        margin-top: 10px;
    }
}
</style>
