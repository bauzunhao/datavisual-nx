<template>
    <div class="rank-bars" :style="{ '--bar-height': barHeight + 'px' }">
        <div class="row" v-for="(it, i) in normalized" :key="i">
            <div class="name" :title="it[nameKey]">{{ it[nameKey] }}</div>

            <div class="bar-wrap">
                <!-- 背景网格/底座 -->
<!--                <div class="bar-bg"></div>-->

                <!-- 实际进度条 -->
                <div
                    class="bar"
                    :style="barStyle(it, i)"
                ></div>
            </div>

            <div class="val">{{ it._percent }}%</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RankGradientBars',
    props: {
        // 数据形如：[{ name:'拉萨市', value: 90 }, ...]
        items: {
            type: Array,
            default: () => ([])
        },
        // 对应名称与数值的字段名
        nameKey: { type: String, default: 'name' },
        valueKey: { type: String, default: 'value' },
        // 最大值（用于换算百分比，不传则以数据最大值为准）
        max: { type: Number, default: 0 },
        // 条高
        barHeight: { type: Number, default: 16 },
        // 颜色方案：返回 [start, end] 的数组；你也可以传入固定数组
        palette: {
            type: [Function, Array],
            default: () => (idx => {
                if (idx === 0) return ['#d84a4a', '#ff4d4d'];       // 红
                if (idx === 1) return ['#f3d46b', '#ffd66c'];       // 金
                return ['#33a7ff', '#0a77ff'];                      // 蓝
            })
        },
        // 是否开启动画
        animated: { type: Boolean, default: true }
    },
    computed: {
        normalized () {
            if (!this.items || !this.items.length) return [];
            const maxV = this.max > 0 ? this.max
                : Math.max.apply(null, this.items.map(it => Number(it[this.valueKey]) || 0));

            return this.items.map(it => {
                const v = Number(it[this.valueKey]) || 0;
                const pct = maxV === 0 ? 0 : Math.max(0, Math.min(100, Math.round(v / maxV * 100)));
                return { ...it, _percent: pct };
            });
        }
    },
    methods: {
        normalizeColors(idx) {
            // 组件内置的前两条专色 & 默认蓝
            const SPECIAL0 = ['#452946', '#fe3c3c']; // 红
            const SPECIAL1 = ['#4a5248', '#fdd95f']; // 金
            const FALLBACK = ['#054272', '#00a1fe']; // 蓝

            // 1) 优先保证前两条颜色固定
            if (idx === 0) return SPECIAL0;
            if (idx === 1) return SPECIAL1;

            // 2) 下面才读取用户传入的 palette（有就用，没有就蓝）
            let c = null;
            const p = this.palette;

            if (typeof p === 'function') c = p(idx);
            else if (Array.isArray(p)) {
                // 允许二维数组：[[c1,c2],[c1,c2],...]
                // 若误传一维数组（比如 ['#a','#b','#c']），这里给它按 idx 取相邻两色做渐变
                if (Array.isArray(p[0])) c = p[idx];
                else if (typeof p[0] === 'string') {
                    const s = p[idx % p.length];
                    const e = p[(idx + 1) % p.length];
                    c = [s, e];
                }
            } else if (typeof p === 'string') c = [p, p];
            else if (p && typeof p === 'object') {
                c = [p.from || p.c1 || p.start, p.to || p.c2 || p.end];
            }

            // 3) 统一成 [start, end]，否则回退蓝色
            if (Array.isArray(c) && c.length >= 2) return [c[0], c[1]];
            if (Array.isArray(c) && c.length === 1) return [c[0], c[0]];
            if (typeof c === 'string') return [c, c];
            if (c && typeof c === 'object') {
                const s = c[0] || c.from || c.c1 || c.start;
                const e = c[1] || c.to || c.c2 || c.end;
                if (s && e) return [s, e];
                if (s) return [s, s];
            }
            return FALLBACK;
        },

        barStyle (it, idx) {
            const [start, end] = this.normalizeColors(idx);
            return {
                '--w': it._percent + '%',
                '--c1': start,
                '--c2': end,
                animation: this.animated ? `grow .8s ease ${idx * 0.05}s both` : 'none'
            };
        }
    }


};
</script>

<style lang="scss" scoped>
.rank-bars {
    width: 100%;
    padding: 8px 30px;
    box-sizing: border-box;
    color: #9ed0ff;
    border-radius: 10px;

    .row {
        display: grid;
        grid-template-columns: 85px 1fr 45px;
        align-items: center;
        gap: 10px;
        height: calc(var(--bar-height) + 18px);
        margin: 6px 0;
    }

    .name {
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #6bb5ff;
    }

    .val {
        font-size: 14px;
        color: #6bb5ff;
        text-align: right;
    }

    .bar-wrap {
        position: relative;
        height: var(--bar-height);
        overflow: hidden;

        /* 底层网格背景（很淡） */
        .bar-bg {
            position: absolute;
            inset: 0;
            background:
                linear-gradient(180deg, rgba(0,0,0,.3), rgba(0,0,0,.22)),
                repeating-linear-gradient(
                        90deg,
                        rgba(120,180,255,.08) 0,
                        rgba(120,180,255,.08) 12px,
                        rgba(120,180,255,0) 12px,
                        rgba(120,180,255,0) 24px
                );
            border-radius: inherit;
        }

        /* 进度条本体 */
        .bar {
            position: absolute;
            inset: 0 auto 0 0;
            width: var(--w);
            height: 100%;
            background: linear-gradient(90deg, var(--c1), var(--c2));
            border-radius: inherit;

        }
    }
}

/* 入场宽度动画 */
@keyframes grow {
    from { width: 0%; }
    to   { width: var(--w); }
}
</style>
