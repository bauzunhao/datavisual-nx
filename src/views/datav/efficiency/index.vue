<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="conthead">
                <p>时间设置:</p>
                <div class="seg-wrap">
                    <div class="seg-pill">
                        <button
                            v-for="(item, i) in options1"
                            :key="i"
                            :class="['seg-btn', { 'is-active': activeIndex1 === i }]"
                            @click="handleClick1(i)"
                        >
                            <span>{{ item }}</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="section">

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>
<script lang="ts">
import Vue from "vue";
import DatavHead from "@/components/DatavHead/index.vue";

export default Vue.extend({
    components: {DatavHead},
    data(){
        return {
            options1: ['今日', '本月','本年'],
            activeIndex1: 0,
        }
    },
    methods : {
        handleClick1(i) {
            this.activeIndex1 = i
        },
    }
})
</script>
<style scoped lang="scss">
.cont{
    position: relative;
    .conthead{
        position: absolute;
        top: -10px;
        left: 50px;
        display: flex;
        height: 26px;
        p{
            color: #6bb5ff;
            font-size: 16px;
            line-height: 26px;
            margin: 0 5px 0 0;
        }
    }
    .section {
        width: 1330px;
        height: 895px;
        display: inline-block;
    }
}
</style>
