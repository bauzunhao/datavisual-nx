<template>
  <div ref="mapchart" :style="{width: '800px',height: height+'px',margin: '0 auto'}">
  </div>
</template>

<script>
    import * as echarts from 'echarts';
    import dataInJs from '@/api/datav/common/540100.json';
    import {loopShowTooltip} from '@/utils/echarts-tooltip-carousel';

    export default {
        name: "genpieChart",
        props: [ 'height', 'viewType'],
        data() {
            return {
                timerChart: null , // 定时器名称
                message : [
                    {
                    "num": 27,
                    "threatenNum": 2,
                    "jointNum": 0,
                    "jjfNum": 0,
                    "yoy": "-95.73%",
                    "ratio": "61.36%",
                    "rate": null,
                    "id": "640100",
                    "name": "银川市"
                },
                    {
                        "num": 27,
                        "threatenNum": 2,
                        "jointNum": 0,
                        "jjfNum": 0,
                        "yoy": "-95.73%",
                        "ratio": "61.36%",
                        "rate": null,
                        "id": "640200",
                        "name": "石嘴山市"
                    },
                    {
                        "num": 27,
                        "threatenNum": 2,
                        "jointNum": 0,
                        "jjfNum": 0,
                        "yoy": "-95.73%",
                        "ratio": "61.36%",
                        "rate": null,
                        "id": "640300",
                        "name": "吴忠市"
                    },
                    {
                        "num": 27,
                        "threatenNum": 2,
                        "jointNum": 0,
                        "jjfNum": 0,
                        "yoy": "-95.73%",
                        "ratio": "61.36%",
                        "rate": null,
                        "id": "640400",
                        "name": "中卫市"
                    },
                    {
                        "num": 27,
                        "threatenNum": 2,
                        "jointNum": 0,
                        "jjfNum": 0,
                        "yoy": "-95.73%",
                        "ratio": "61.36%",
                        "rate": null,
                        "id": "640500",
                        "name": "固原市"
                    },

                ],
            }
        },
        mounted() {
        },
        methods: {
            initmap() {
                if (this.timerChart) {
                    this.timerChart.clearLoop();
                }
                var geoCoordMap = {
                    640100:[106.22848,38.512996],
                    640200:[106.375659,39.009961],
                    640300:[106.200885,38.019825],
                    640500:[105.198232,37.523284],
                    640400:[106.246878,36.036011]
                }
                var customerBatteryCityData = [];
                for (let i in this.message) {
                    if (i > 0) {
                        if (process.env.VUE_APP_IGNORE_CITY_DATA.indexOf(this.message[i].name) > -1) {
                            continue;
                        }
                        if (this.viewType == 'threelistView') {
                            customerBatteryCityData.push({
                                id: this.message[i].id,
                                name: this.message[i].name,
                                value: this.message[i].num,
                                stockNum: this.message[i].stockNum,
                                incrementNum: this.message[i].incrementNum,
                                variableNum: this.message[i].variableNum,
                            });
                        } else if ("emergencyEvent" === this.viewType) {
                            customerBatteryCityData.push({
                                id: this.message[i].eventZone.slice(0,6),
                                name: this.message[i].zoneName,
                                value: this.message[i].total,
                                num1: this.message[i].num1,
                                num2: this.message[i].num2,
                                num3: this.message[i].num3,
                                num4: this.message[i].num4,
                                num5: this.message[i].num5,
                            });
                        } else {
                            customerBatteryCityData.push({
                                id: this.message[i].id,
                                name: this.message[i].name,
                                value: this.message[i].num,
                                threaten: this.message[i].threatenNum,
                                jjfNum: this.message[i].jjfNum,
                                jointNum: this.message[i].jointNum,
                            });
                        }
                    }
                }
                echarts.registerMap('lasa', dataInJs);
                var option = {
                    // backgroundColor: '#131C38',
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        enterable: true,
                        textStyle: {
                            fontSize: 20,
                            color: '#fff'
                        },
                        backgroundColor: '',
                        borderWidth: 0,
                        className: 'echarttoop',
                        extraCssText: 'box-shadow: 0 0 0 rgba(0, 0, 0, 0);',
                        formatter: params => {
                            console.log(params)
                            if (this.viewType === 'threelistView') {
                                return `<div class="maptool"><p>` + params.name + `</p><p><span>总量` + params.data.value + `</span><span>减存量` + params.data.stockNum + `</span><span>控增量` + params.data.incrementNum + `</span><span>防变量` + params.data.variableNum + `</span></p></div>`
                            } else if ("emergencyEvent" === this.viewType) {
                                return `<div class="maptool"><p>` + params.name + `</p><p><span>总量` + params.data.value + `</span><span>一级` + params.data.num1 + `</span><span>二级` + params.data.num2 + `</span><span>三级` + params.data.num3
                                    + `</span><span>四级` + params.data.num4 + `</span><span>五级` + params.data.num5 + `</span></p></div>`;
                            } else {
                                return `<div class="maptool"><p>` + params.name + `</p><p><span>总量` + params.data.value + `</span><span>扬言` + params.data.threaten + `</span><span>集体访` + params.data.jointNum + `</span><span>进京访` + params.data.jjfNum + `</span></p></div>`
                            }
                        }
                    },
                    grid: {
                        top: '5%',
                        bottom: '5%',
                        height: '500'
                    },
                    geo: [
                        {
                            map: 'lasa',
                            aspectScale: 0.9,
                            roam: false, // 是否允许缩放
                            zoom: 1.2, // 默认显示级别
                            layoutSize: '95%',
                            layoutCenter: ['55%', '50%'],
                            itemStyle: {
                                normal: {
                                    areaColor: {
                                        type: 'linear-gradient',
                                        x: 0,
                                        y: 400,
                                        x2: 0,
                                        y2: 0,
                                        colorStops: [{
                                            offset: 0,
                                            color: 'rgba(37,108,190,0.3)' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: 'rgba(15,169,195,0.3)' // 50% 处的颜色
                                        }],
                                        global: true // 缺省为 false
                                    },
                                    borderColor: '#4ecee6',
                                    borderWidth: 1
                                },
                                emphasis: {
                                    areaColor: {
                                        type: 'linear-gradient',
                                        x: 0,
                                        y: 300,
                                        x2: 0,
                                        y2: 0,
                                        colorStops: [{
                                            offset: 0,
                                            color: 'rgba(37,108,190,1)' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: 'rgba(15,169,195,1)' // 50% 处的颜色
                                        }],
                                        global: true // 缺省为 false
                                    }
                                }
                            },
                            emphasis: {
                                itemStyle: {
                                    areaColor: 'rgba(6,68,141,.4)'
                                },
                                label: {
                                    show: 0,
                                    color: '#fff'
                                }
                            },
                            zlevel: 3,
                            select:{//这个就是鼠标点击后，地图想要展示的配置
                                itemStyle:{
                                    color:"rgba(0,210,255 ,0.6)",
                                    areaColor:"rgba(0,210,255 ,0.6)",

                                },
                            },
                        },
                        {
                            map: 'lasa',
                            aspectScale: 0.9,
                            roam: false, // 是否允许缩放
                            zoom: 1.2, // 默认显示级别
                            layoutSize: '95%',
                            layoutCenter: ['55%', '50%'],
                            itemStyle: {
                                normal: {
                                    borderColor: 'rgba(192,245,249,.6)',
                                    borderWidth: 2,
                                    shadowColor: '#2C99F6',
                                    shadowOffsetY: 0,
                                    shadowBlur: 120,
                                    areaColor: 'rgba(29,85,139,.2)'
                                }
                            },
                            zlevel: 2,
                            silent: true,
                            select:{//这个就是鼠标点击后，地图想要展示的配置
                                itemStyle:{
                                    color:"rgba(0,210,255 ,0.6)",
                                    areaColor:"rgba(0,210,255 ,0.6)",

                                },
                            },
                        },
                        {
                            map: 'lasa',
                            aspectScale: 0.9,
                            roam: false, // 是否允许缩放
                            zoom: 1.2, // 默认显示级别
                            layoutSize: '100%',
                            layoutCenter: ['55%', '51.5%'],
                            itemStyle: {
                                // areaColor: '#005DDC',
                                areaColor: 'rgba(0,210,255 ,0.6)',
                                borderColor: '#004db5',
                                borderWidth: 1
                            },
                            zlevel: 1,
                            silent: true,
                            select:{//这个就是鼠标点击后，地图想要展示的配置
                                itemStyle:{
                                    color:"rgba(0,210,255 ,0.6)",
                                    areaColor:"rgba(0,210,255 ,0.6)",

                                },
                            },
                        }
                    ],
                    series: [
                        // map
                        {
                            geoIndex: 0,
                            // coordinateSystem: 'geo',
                            showLegendSymbol: true,
                            type: 'map',
                            roam: true,
                            label: {
                                normal: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },

                            itemStyle: {
                                normal: {
                                    borderColor: '#2ab8ff',
                                    borderWidth: 1.5,
                                    areaColor: '#12235c'
                                },
                                emphasis: {
                                    areaColor: '#2AB8FF',
                                    borderWidth: 0,
                                    color: 'red'
                                }
                            },
                            map: 'lasa', // 使用
                            data: customerBatteryCityData
                            // data: this.difficultData //热力图数据   不同区域 不同的底色
                        },
                        // 柱状体的主干
                        {
                            type: 'lines',
                            zlevel: 5,
                            effect: {
                                show: false,
                                // period: 4, //箭头指向速度，值越小速度越快
                                // trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                                // symbol: 'arrow', //箭头图标
                                // symbol: imgDatUrl,
                                symbolSize: 5 // 图标大小
                            },
                            lineStyle: {
                                width: 20, // 尾迹线条宽度
                                color: '#14f4fe',
                                opacity: 1, // 尾迹线条透明度
                                curveness: 0 // 尾迹线条曲直度
                            },
                            label: {
                                show: 0,
                                position: 'end',
                                formatter: '245'
                            },
                            silent: true,
                            data: lineData()
                        },
                        // 柱状体的顶部
                        {
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            geoIndex: 0,
                            zlevel: 5,
                            label: {
                                show: true,
                                formatter: function () {
                                    // return `顶部label`
                                    return ``
                                },
                                position: "top"
                            },
                            symbol: 'circle',
                            symbolSize: [20, 10],
                            itemStyle: {
                                color: 'rgb(22,255,255, 1)',
                                opacity: 1
                            },
                            silent: true,
                            data: scatterData()
                        },
                        // 柱状体的底部
                        {
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            geoIndex: 0,
                            zlevel: 4,
                            label: {
                                // 这儿是处理的
                                formatter: '{b}',
                                position: 'bottom',
                                color: '#fff',
                                fontSize: 12,
                                distance: 10,
                                show: true
                            },
                            symbol: 'circle',
                            symbolSize: [20, 10],
                            itemStyle: {
                                // color: '#F7AF21',
                                color: 'rgb(22,255,255, 1)',
                                opacity: 1
                            },
                            silent: true,
                            data: scatterData2()
                        },
                        // 底部外框
                        {
                            tooltip: {
                                show: false,
                            },
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            rippleEffect: {
                                scale: 10,
                                brushType: 'stroke',
                            },
                            showEffectOn: 'render',
                            itemStyle: {
                                normal: {
                                    shadowColor: '#0ff',
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    color : 'rgb(22,255,255, 1)',
                                },
                            },
                            label: {
                                normal: {
                                    color: '#fff',
                                },
                            },
                            symbol: 'circle',
                            symbolSize: [10, 5],
                            data: scatterData2(),
                            zlevel: 4,
                        },

                    ]
                }
                let mapechart = echarts.init(this.$refs.mapchart);
                mapechart.setOption(option);

                this.exceHighlight(mapechart, option)

                // 动态计算柱形图的高度（定一个max）
                function lineMaxHeight() {
                    const maxValue = Math.max(...customerBatteryCityData.map(item => item.value))
                    return 0.2 / maxValue
                }

                // 柱状体的主干
                function lineData() {
                    return customerBatteryCityData.map((item) => {
                        return {
                            coords: [geoCoordMap[item.id], [geoCoordMap[item.id][0], geoCoordMap[item.id][1] + item.value * lineMaxHeight()]]
                        }
                    })
                }

                // 柱状体的顶部
                function scatterData() {
                    return customerBatteryCityData.map((item) => {
                        return [geoCoordMap[item.id][0], geoCoordMap[item.id][1] + item.value * lineMaxHeight()]
                    })
                }

                // 柱状体的底部
                function scatterData2() {
                    return customerBatteryCityData.map((item) => {
                        return {
                            name: item.name,
                            value: geoCoordMap[item.id]
                        }
                    })
                }

            },
            exceHighlight(chart, chartOption, options) {
                this.timerChart = loopShowTooltip(chart, chartOption, options);
            },
        }
    }
</script>

<style lang="scss">
  .maptool {
    width: 460px;
    height: 80px;
    margin-left: -10px;
    margin-top: -10px;
    background:  url('../../../assets/images/maptooltip.png') no-repeat 0 0;
      background-size: cover; /* 或者使用 contain 或具体尺寸 */
      padding-left: 20px;

    p {
        font-size: 30px;
        margin: 0;
        line-height: 40px;
    }

    p:nth-child(2) {
      font-size: 20px;
      margin: 0;
      color: #00afff;

      span {
        margin-right: 13px;
      }
    }
  }

  .echarttoop {
    z-index: 9 !important;
  }
</style>
