<template xmlns="http://www.w3.org/1999/html">
    <div class="home">
        <DatavHead />
        <div class="cont">

            <div class="section">
                <div class="sectionhead">
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
                    <p>数据源:</p>
                    <div class="seg-wrap">
                        <div class="seg-pill">
                            <button
                                v-for="(item, i) in options2"
                                :key="i"
                                :class="['seg-btn', { 'is-active': activeIndex2 === i }]"
                                @click="handleClick2(i)"
                            >
                                <span>{{ item }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div style="display: inline-block;width: 450px;">
                    <div class="section_left">
                        <div class="subtitle">
                            <img src="@/assets/images/subtitle-left.png" class="subtitle-left" alt="">
                            <h3>一、预防法治化</h3>
                            <div class="sectenter">
                                <p>进入 <span>▶</span></p>
                            </div>
                        </div>
                        <div class="seleftlist">
                            <div class="title"> <h4>报送信访工作法治化相关材料7件次</h4></div>
                            <div class="title"> <h4>报送矛盾纠纷排查化解情况材料11件次</h4></div>
                            <div class="title">
                                <h4>领导接访下访情况</h4>
                                <span class="titledesc">各地领导参与接访下访87294人次，涉及118327批次。</span>
                            </div>
                        </div>
                    </div>
                    <div class="section_left" style="height: 435px;">
                        <div class="subtitle">
                            <img src="@/assets/images/subtitle-left.png" class="subtitle-left" alt="">
                            <h3>二、受理法治化</h3>
                            <div class="sectenter">
                                <router-link to="/datav/LawAccept">
                                    <p>进入 <span>▶</span></p>
                                </router-link>
                            </div>
                        </div>
                        <div class="slfzh">
                            <div class="slist">
                                <div>
                                    <p>登记</p>
                                    <p>265</p>
                                </div>
                                <div>
                                    <p>登记</p>
                                    <p>265</p>
                                </div>
                                <div>
                                    <p>登记</p>
                                    <p>265</p>
                                </div>
                                <div>
                                    <p>登记</p>
                                    <p>265</p>
                                </div>
                            </div>
                            <div class="gauge-list">
                                <div v-for="(item, i) in gaugeList" :key="i" class="gauge-item">
                                    <div class="chart" :ref="'chart' + i"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sectcont">
                    <div class="genpieChart">
                        <GenpieChart/>
                    </div>
                    <div class="sectcontlater">
                        <div style="margin-bottom: 10px" class="subtitle subtitle2">
                            <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                            <h3>三、办理法治化</h3>
                            <div class="sectenter">
                                <router-link to="/datav/LawHandle"> <p>进入 <span>▶</span></p></router-link>
                            </div>
                        </div>
                        <div style="margin-bottom: 18px;" class="title"> <h4>办理情况</h4></div>
                        <div class="category-stats">
                            <div class="category-item">
                                <div class="value">52</div>
                                <div class="label">涉法涉诉类</div>
                            </div>
                            <div class="category-item">
                                <div class="value">52</div>
                                <div class="label">仲裁类</div>
                            </div>
                            <div class="category-item">
                                <div class="value">52</div>
                                <div class="label">党员申诉类</div>
                            </div>
                            <div class="category-item">
                                <div class="value">52</div>
                                <div class="label">行政类</div>
                            </div>
                            <div class="category-item">
                                <div class="value">52</div>
                                <div class="label">依法履职类</div>
                            </div>
                        </div>
                        <div class="process-stats">
                            <p class="process-stats-head"> <span>登记</span> <span>复查</span> <span>复核</span> </p>
                            <div class="process-item">
                                <p>总量</p>
                                <p> 34 件次</p>
                                <p>办结后重复信访 </p>
                                <p> 34 件次</p>
                            </div>
                            <div class="process-item">
                                <p>复查总量 </p>
                                <p> 34 件次</p>
                                <p>复查后重复信访 </p>
                                <p> 34 件次</p>
                            </div>
                            <div class="process-item">
                                <p>复核总量</p>
                                <p> 34 件次</p>
                                <p>复核后重复信访 </p>
                                <p> 34 件次</p>
                            </div>
                        </div>
                        <div class="summary-info">
                            <div style="margin-bottom: 0" class="title"> <h4>调解情况</h4>
                                <span class="desc">调解总量 <strong>232</strong> 件次</span>
                            </div>
                            <div class="summary-item">
                                <div class="summary-item-desc">
                                    <span>应受理而不受理</span>
                                    <span>应办理而不办理</span>
                                    <span>应追责而不追责</span>
                                    <span>应查处而不查处</span>
                                </div>
                                <div class="summary-item-num">
                                    <span>23</span>
                                    <span>43</span>
                                    <span>23</span>
                                    <span>123</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div style="display: inline-block;width: 450px;vertical-align: top;">

                <div class="sectionright">
                    <div class="subtitle">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>四、监督追责法治化</h3>
                        <div class="sectenter">
                            <router-link to="/datav/LawSupervise">
                                <p>进入 <span>▶</span></p>
                            </router-link>
                        </div>
                    </div>
                    <div style="margin-bottom: 0" class="title"> <h4>自治区信访局督办</h4>
                        <span class="desc" style="left: 220px">总量   <strong>232</strong> 件次</span>
                    </div>
                    <div class="panel-stats3">
                        <div class="panel-stats3-item">
                            <p class="panel-stats3-title">处理意见明显不当或不执行处理意见</p>
                            <p class="panel-stats3-num">434</p>
                        </div>
                        <div class="panel-stats3-item">
                            <p class="panel-stats3-title">其他未落实“三到位一处理”</p>
                            <p class="panel-stats3-num">434</p>
                        </div>
                        <div class="panel-stats3-item">
                            <p class="panel-stats3-title">未按规定受理办理</p>
                            <p class="panel-stats3-num">434</p>
                        </div>
                    </div>

                    <div style="margin-bottom: 0" class="title"> <h4>各级信访工作联席会议及人大监督</h4>
                    </div>
                    <div class="panel-stats3">
                        <div class="panel-stats3-item">
                            <p class="panel-stats3-title">信访工作联席会议通报</p>
                            <p class="panel-stats3-num">434</p>
                        </div>
                        <div class="panel-stats3-item">
                            <p class="panel-stats3-title">信访工作联席会议约谈”</p>
                            <p class="panel-stats3-num">434</p>
                        </div>
                        <div class="panel-stats3-item">
                            <p class="panel-stats3-title">信访工作联席 会议监督挂牌</p>
                            <p class="panel-stats3-num">434</p>
                        </div>
                        <div class="panel-stats3-item">
                            <p class="panel-stats3-title">人大监督</p>
                            <p class="panel-stats3-num">434</p>
                        </div>
                    </div>

                    <div style="margin-bottom: 0" class="title"> <h4>各级纪检监察机关监督追责</h4>
                    </div>
                    <div class="panel-stats3">
                        <div class="panel-stats3-item">
                            <p class="panel-stats3-title">立案违反信访工作纪律</p>
                            <p class="panel-stats3-num">434</p>
                        </div>
                        <div class="panel-stats3-item">
                            <p class="panel-stats3-title">处分违反信访 工作纪律</p>
                            <p class="panel-stats3-num">434</p>
                        </div>
                        <div class="panel-stats3-item">
                            <p class="panel-stats3-title">信访问责</p>
                            <p class="panel-stats3-num">434</p>
                        </div>
                    </div>


                </div>

                <div class="sectionright" style="margin-top: 25px">
                    <div class="subtitle">
                        <img src="@/assets/images/subtitle-left.png" class="subtitle-left">
                        <h3>五、维护秩序法治化</h3>
                        <div class="sectenter">
                            <p>进入 <span>▶</span></p>
                        </div>
                    </div>
                    <div style="margin-bottom: 0" class="title"> <h4>自治区信访局教育疏导情况</h4>
                        <span class="desc" style="left: 310px">总量   <strong>232</strong> 件次</span>
                    </div>
                    <div style="padding: 0 20px">
                        <RdwtChart
                            ref="chart"
                            :data-name="names"
                            :data-value="values"
                            height="155px"
                            :bar-width="22"
                        />
                    </div>
                    <div style="margin: 10px 0" class="title"> <h4>各地依法处置情况</h4></div>

                    <div class="panel-punish">
                        <div class="panel-group">
                            <div class="panel-items">
                                <div class="panel-item"> 治安管理处罚 <br>总量 <span>11</span> 人次</div>
                                <div class="panel-item">警告 <span>3</span> 人次</div>
                                <div class="panel-item">处罚 <span>2</span> 人次</div>
                                <div class="panel-item">行政处罚 <span>4</span> 人次</div>
                            </div>
                        </div>

                        <div class="panel-divider"></div>

                        <div class="panel-group">
                            <div class="panel-items">
                                <div class="panel-item">追究刑事责任 <br>总量 <span>11</span> 人次</div>
                                <div class="panel-item">免于刑事责任 <span>6</span> 人次 <br>管制 <span>3</span> 人次</div>
                                <div class="panel-item">拘役 <span>7</span> <br>人次 有期徒刑 <span>8</span> 人次</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import DatavHead from '@/components/DatavHead/index.vue'
import RdwtChart from '@/components/BarChart/index.vue'
import GenpieChart from '@/components/GenpieChart/index.vue'
export default {
    name: 'index',
    components: { GenpieChart, RdwtChart, DatavHead },
    data(){
        return {
            options1: ['今日', '本月','本年'],
            activeIndex1: 0,
            options2: ['全区', '自治区信访局'],
            activeIndex2: 0,
            gaugeList: [
                { name: '来信', value: 25 },
                { name: '转交区直部门', value: 25 },
                { name: '涉法涉诉', value: 25 },
                { name: '已经复核', value: 25 }
            ],
            names: ['住房公积金','产权交易','土地转让','集体资产管理','大气污染'],
            values: [720,650,560,430,390],
        }
    },
    mounted () {
        this.$nextTick(() => {
            this._charts = []
            this.gaugeList.forEach((item, i) => {
                let el = this.$refs['chart' + i]

                // 兼容：如果是数组（极少数场景）取第一个
                if (Array.isArray(el)) el = el[0]
                // 兼容：如果是组件实例，取根元素
                if (el && el.$el) el = el.$el
                // 只接受原生 DOM
                if (!(el instanceof HTMLElement)) return

                const chart = echarts.init(el)
                chart.setOption(this.getOption(item))
                this._charts.push(chart)
            })
        })
    },
    beforeDestroy () {
        this._charts && this._charts.forEach(c => c.dispose())
        this._charts = null
    }
    ,
    methods : {
        handleClick1(i) {
            this.activeIndex1 = i
        },
        handleClick2(i) {
            this.activeIndex2 = i
        },
        getOption (item) {
            return {
                backgroundColor: 'transparent',
                series: [{
                    type: 'gauge',
                    startAngle: 180,
                    endAngle: 0,
                    radius: '130%',
                    center: ['60%', '65%'],
                    min: 0,
                    max: 100,
                    splitNumber: 0,
                    axisLine: {
                        lineStyle: {
                            width: 10,
                            color: [
                                [item.value / 100, '#f7b53d'], // 进度
                                [1, '#1d3163']                 // 底色
                            ]
                        }
                    },
                    pointer: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { show: false },

                    // 关键：给 data，让 title/detail 有参照
                    data: [{ value: item.value, name: item.name }],

                    // 标题
                    title: {
                        show: true,
                        offsetCenter: [0, '5%'],
                        fontSize: 12,
                        color: '#fff',
                        fontWeight: 500
                    },

                    // 百分比
                    detail: {
                        show: true,
                        valueAnimation: true,
                        offsetCenter: [0, '-40%'],
                        fontSize: 18,
                        color: '#42b6ff',
                        formatter: '{value}%'   // 或者 (val)=> `${val}%`
                    }
                }]
            }
        }

    },
}
</script>

<style scoped lang="scss">
@font-face {
    font-family: "DSfont";
    src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
}
$sz-font-family: "DSfont";

.home{
    .cont{
        .section {
            width: 1330px;
            height: 895px;
            display: inline-block;
            .sectionhead{
                display: flex;
                color: #6bb5ff;
                height: 26px;
                .seg-wrap{
                    margin-right: 50px;
                }
                p{
                    font-size: 18px;
                    vertical-align: top;
                    margin: 0 5px 0 0;
                    line-height: 24px;
                }
            }
            .section_left{
                width: 450px;
                height: 417px;
                vertical-align: top;
                border-radius: 10px;
                margin-top: 10px;
                margin-bottom: 15px;
                position: relative;
                display: inline-block;
                background: linear-gradient( 180deg, rgba(0,61,136,0.3) 0%, rgba(0,29,65,0.1) 51%, rgba(0,61,136,0.3) 100%);
                .slfzh{display: flex;}
                .slist{
                    width: 185px;
                    margin-left: 25px;
                    div{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        height: 75px;
                        background: linear-gradient(to bottom, rgba(25, 99, 173, 0.1), rgba(38, 102, 171, 0.01));
                        color: #FFFFFF;
                        font-size: 16px;
                        text-align: center;
                        p{margin: 0}
                        p:last-child{
                            color: #26c1fd;
                            font-size: 36px;
                            font-family: $sz-font-family, monospace;
                        }
                    }
                }
                .gauge-list {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .gauge-item {
                    width: 200px;
                    height: 80px;
                    .chart {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .sectcont{
                width: 840px;
                display: inline-block;
                margin-left: 40px;
                margin-top: 10px;
                vertical-align: top;
                .genpieChart{
                    height: 417px;
                    margin-bottom: 25px;
                }
                .sectcontlater{
                    background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
                    border-radius: 10px;
                    .category-stats{
                        width: 400px;
                        display: inline-flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        vertical-align: top;
                        align-items: center;
                        justify-content: center;
                        .category-item{
                            width: 130px;
                            height: 60px;
                            margin-bottom: 10px;
                            color: #FFFFFF;
                            text-align: center;
                            font-size: 12px;
                            background: url("../../../assets/images/glow-base.png") no-repeat center 100%;

                            .value{
                                color: #26c1fd;
                                font-size: 26px;
                                font-family: "DSfont", monospace;
                            }
                        }
                    }
                    .process-stats{
                        position: relative;
                        display: inline-grid;
                        grid-template-columns: auto auto auto ;
                        column-gap: 10px;
                        width: 420px;
                        color: #FFFFFF;
                        p{
                            margin: 0;
                        }
                        .process-stats-head {
                            position: absolute;
                            font-size: 18px;
                            text-align: center;
                            width: 420px;
                            top: -30px;

                            span {
                                display: inline-block;
                                width: 125px;
                                margin-right: 10px;
                                position: relative; // 让伪元素定位参考 span
                            }

                            span:nth-child(-n+2)::after {
                                content: "";
                                position: absolute;
                                right: -8px;      // 控制三角与文字的距离
                                top: 50%;
                                transform: translateY(-50%);
                                width: 0;
                                height: 0;
                                border-left: 6px solid #73b0ff;
                                border-top: 4px solid transparent;
                                border-bottom: 4px solid transparent;
                            }
                        }

                        .process-item{
                            width: 125px;
                            text-align: center;
                            padding-top: 15px;
                            font-size: 14px;
                            line-height: 26px;
                            background: linear-gradient(to bottom, rgba(0, 22, 50, 0.3), rgba(0, 22, 50, 0.01));
                            p:nth-child(odd) {
                                color: #4c8bd0;
                            }
                            p:nth-child(even) {
                                color: #40d2ff;
                            }
                        }
                    }
                    .summary-info{
                        padding-bottom: 1px;
                        .summary-item{
                            width: 797px;
                            height: 86px;
                            margin: 20px;
                            background: url("../../../assets/images/summary-info.png") no-repeat;
                            font-size: 18px;
                            color: #fff;
                            div{
                                display: flex;
                                flex-direction: row;
                                justify-content: space-around;
                                align-items: center;
                            }
                            .summary-item-desc{
                                padding-top: 15px;
                                span{
                                    background: linear-gradient(to bottom, #da9f98, #fff);
                                    -webkit-background-clip: text;   /* 背景裁剪成文字形状 */
                                    -webkit-text-fill-color: transparent; /* 让文字透明，只显示背景 */
                                }
                            }
                            .summary-item-num{
                                color: #ebda55;
                                font-size: 36px;
                                font-family: $sz-font-family, monospace;
                            }
                        }
                    }
                }
            }

        }

        .sectionright{
            height: auto;
            .panel-stats3 {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                text-align: center;
                color: #79cfff;
                position: relative;
                margin-top: 10px;
                margin-bottom: 20px;
                padding-left: 20px;

                &-item {
                    flex: 1;
                    position: relative;

                    &:not(:last-child)::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        right: 0;
                        transform: translateY(-50%);
                        width: 1px;
                        height: 70%;
                        background: linear-gradient(to bottom, transparent, rgba(120,200,255,0.8), transparent);
                    }
                }

                &-title {
                    font-size: 12px;
                    line-height: 1.4;
                    color: #79bfff;
                    height: 34px;
                    width: 80%;
                    margin: 0 auto;
                }

                &-num {
                    font-size: 16px;
                    margin: 3px 0 0;
                    color: #fff;
                }

            }
            .panel-punish {
                color: #9cd5ff;
                padding: 0 30px;
                font-size: 12px;
                .panel-group {
                    margin-bottom: 10px;
                }

                .panel-items {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    font-size: 13px;
                    color: #26c1fd;

                    .panel-item {
                        span {
                            color: #fff;
                            font-weight: bold;
                            margin: 0 3px;
                            text-shadow: 0 0 10px #00aaff;
                        }
                    }
                }

                .panel-divider {
                    height: 1px;
                    width: 100%;
                    background: linear-gradient(
                            to right,
                            transparent,
                            rgba(120,200,255,0.7),
                            transparent
                    );
                    margin: 10px 0;
                }
            }

        }
        .desc{
            position: absolute;
            top: 8px;
            left: 150px;
            color: #FFFFFF;
            font-size: 14px;
            display: inline-block;
        }
    }
}
</style>
