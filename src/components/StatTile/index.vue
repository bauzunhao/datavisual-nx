<template>
    <div class="stat-tile" :style="tileStyle">
        <!-- 发光图标块 -->
        <div class="icon-box">
            <!-- 用 slot 或传入 icon 字体类 -->
            <slot name="icon">
                <i :class="icon" v-if="icon"></i>
            </slot>
        </div>

        <!-- 右侧信息 -->
        <div class="info">
            <div class="value">
                <span class="digital" :style="{ '--shadow': glow ? 1 : 0 }">{{ displayValue }}</span>
                <span v-if="unit" class="unit">{{ unit }}</span>
            </div>
            <div class="label-line">
                <span class="label">{{ label }}</span>
                <span class="sep">同比</span>
                <span class="yoy" :class="yoyClass">{{ yoyText }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "StatTile",
    props: {
        value: { type: Number, default: 0 },         // 目标值
        duration: { type: Number, default: 800 },    // 数字动画时长 ms
        decimals: { type: Number, default: 0 },      // 小数位
        label: { type: String, default: "" },
        yoy: { type: Number, default: 0 },           // 同比百分比（正负数）
        unit: { type: String, default: "" },
        icon: { type: String, default: "" },         // 也可以用 <slot name="icon">
        // 主题色（图标块渐变）
        colorFrom: { type: String, default: "#022e62" },
        colorTo:   { type: String, default: "#045491" },
        glow: { type: Boolean, default: true }
    },
    data() {
        return { now: 0, startTs: 0, rafId: 0 };
    },
    computed: {
        displayValue() {
            return this.now.toFixed(this.decimals);
        },
        yoyText() {
            const abs = Math.abs(this.yoy).toFixed(2);
            const sign = this.yoy > 0 ? "+" : this.yoy < 0 ? "-" : "";
            return `${sign}${abs}%`;
        },
        yoyClass() {
            return this.yoy > 0 ? "up" : this.yoy < 0 ? "down" : "flat";
        },
        tileStyle() {
            return {
                '--c1': this.colorFrom,
                '--c2': this.colorTo
            };
        }
    },
    watch: {
        value: {
            immediate: true,
            handler() { this.play(); }
        }
    },
    methods: {
        play() {
            cancelAnimationFrame(this.rafId);
            const start = 0;
            const end = Number(this.value) || 0;
            this.startTs = 0;
            const dur = Math.max(0, this.duration);

            const step = (ts) => {
                if (!this.startTs) this.startTs = ts;
                const t = Math.min(1, (ts - this.startTs) / dur);
                // easeOutCubic
                const p = 1 - Math.pow(1 - t, 3);
                this.now = start + (end - start) * p;
                if (t < 1) this.rafId = requestAnimationFrame(step);
            };
            this.rafId = requestAnimationFrame(step);
        }
    },
    beforeDestroy() { cancelAnimationFrame(this.rafId); }
};
</script>

<style lang="scss" scoped>
.stat-tile{
    //--c1:#022e62; --c2:#045491;
    display:flex; align-items:center;
    gap:18px;
    padding:10px 18px;
    border-radius:18px;
}

.icon-box{
    width:82px; height:82px; border-radius:10px;
    display:flex; align-items:center; justify-content:center;
    background:
        linear-gradient(180deg, #022e62, #045491);
    position:relative;
    overflow:hidden;
    box-shadow: 0 2px 6px rgba(20,180,255,.35);
    img{ width: 55px}
}


.info{display:flex; flex-direction:column; gap:6px;}
.value{display:flex; align-items:baseline; gap:8px;}
.unit{font-size:14px;color:#bfe5ff;opacity:.9}

/* 七段数码管风格数字 */
.digital{
    font-family: "DSfont","DS-Digital","orbitron", monospace;
    font-weight: 600;
    font-size: 36px;
    letter-spacing: 2px;
    line-height: 1;
    color: #ebda55;
}

.label-line{
    display:flex; align-items:center; gap:10px;
    white-space: nowrap;
}
.label{ color:#6bb5ff; font-size: 16px;}
.sep{ color:#7aa3c7; font-size:14px; }
.yoy{ font-size:14px;  }
.yoy.up{ color:#34d17a; }
.yoy.down{ color:#ff6565; }
.yoy.flat{ color:#d0e4ff; }
</style>
