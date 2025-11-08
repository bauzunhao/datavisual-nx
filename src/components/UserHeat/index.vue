<template>
    <div class="userheat">
        <i class="el-icon-arrow-left" @click="goBack"></i>
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
name: "index",
    props: {
        message: {
            type: String,
            required: true
        }
    },
    methods: {
        goBack() {
            this.$router.back();
        }
    }
}
</script>

<style scoped lang="scss">
.userheat{
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: #2196f3;
    color: white;
    font-size: 18px;
    line-height: 40px;
    position: relative;
    i{
        position: absolute;
        left: 20px;
    }
}
</style>
