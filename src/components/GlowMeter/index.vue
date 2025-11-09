<template>
    <div class="meter-wrap">
        <div
            class="meter"
            :class="['theme-' + theme, { 'has-anim': animate }]"
            :style="{ height: height + 'px' }"
        >
            <!-- 进度填充条 -->
            <div
                class="bar"
                :style="{
          width: pct + '%',
          height: height + 'px',
        }"
            >
                <!-- 流光（跟随条右缘） -->
                <i v-if="animate" class="shine"></i>
            </div>
        </div>

        <!-- 右侧百分比 -->
        <span v-if="showLabel" class="label">{{ pct }}%</span>
    </div>
</template>

<script>
export default {
    name: 'GlowMeter',
    props: {
        value: { type: Number, default: 0 },     // 0-100
        height: { type: Number, default: 18 },   // 进度条高度(px)
        theme:  { type: String, default: 'blue' }, // blue | gold | mint
        showLabel: { type: Boolean, default: true },
        animate: { type: Boolean, default: true }
    },
    computed: {
        pct () {
            const n = Math.round(this.value || 0)
            return Math.max(0, Math.min(100, n))
        },
    }
}
</script>

<style scoped>
/* 整体容器（进度条 + 右侧文字） */
.meter-wrap{
    position: relative;
    display: inline-flex;
    align-items: center;
    margin: 16px 0 16px 0;
}

/* 背景槽（带轻微从左亮到右暗的渐变，接近 HUD 风格） */
.meter{
    position: relative;
    width: 310px;
    background: #032148;
    overflow: hidden;

}

/* 填充条（宽度由 JS 绑定） */
.bar{
    position: relative;
    display: block;
}

/* 右侧百分比 */
.label{
    margin-left: 12px;
    font-size: 22px;
    letter-spacing: .5px;
    color: #6bb5ff;
}

/* —— 三套主题渐变 —— */
.theme-blue .bar{
    background: linear-gradient(90deg,#044984 0%, #00a1fe 100%);
}
.theme-gold .bar{
    background: linear-gradient(90deg,#425752 0%,  #ead955   100%);
}
.theme-mint .bar{
    background: linear-gradient(90deg,#0b6177 0%, #1df9d0 100%);
}



/* 轻微呼吸动画（可选） */
.has-anim .shine{
    animation: shineBreath 2.6s ease-in-out infinite;
}
@keyframes shineBreath{
    0%,100%{ opacity:.55; filter: blur(3px); }
    50%    { opacity:.90; filter: blur(5px); }
}
</style>
