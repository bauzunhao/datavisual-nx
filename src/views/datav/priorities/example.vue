<template>
  <div class="home">
    <datavhead></datavhead>
    <div class="cont">
      <div class="sectionleft">
        <div class="sec1-nav">
          <router-link to="/"><img src="../../../assets/images/general-home.png" alt=""></router-link>
          <ul>
            <li @click="openDialong()"><span>导航</span></li>
            <li><router-link to="/datav/leader"><span>领导包案</span></router-link></li>
            <li><router-link to="/datav/priorities"><span>接访下访</span></router-link></li>
            <li><router-link to="/datav/focusmatter"><span>重点事项</span></router-link></li>
            <li><router-link to="/datav/example"><span>示范区县</span></router-link></li>
          </ul>
        </div>
        <div class="sec1-min">
          <h3>满足标准的示范县</h3>
          <div class="min1 mabt70">
            <div class="min1div">
              <img src="../../../assets/images/medal.png" alt="">
              <span>信访工作示范县创建</span>
<!--              <span v-text="planningShow.zoneName"></span>-->
              <span></span>
            </div>
            <div class="min1list">
              <p>赴国家局走访
                <span v-html="resultVal[standardMap.ENTER_JING_VISIT_ID]"></span>
              </p>
              <p>进京非访 <span>无</span></p>
              <p>向国家局写信 <span v-html="resultVal[standardMap.ENTER_JING_LETTER_ID]"></span></p>
              <p>大规模事项 <span>无</span></p>
              <p>向国家局网投 <span v-html="resultVal[standardMap.ENTER_JING_INTERNET_ID]"></span></p>
              <p>极端事项 <span>无</span></p>
              <p>进京集体访 <span  v-text="resultVal[standardMap.JOIN_LETTER_COUNTRY_ID]">无</span></p>
              <p>负面炒作 <span>无</span></p>
              <p>赴区、市50人集体访 <span v-text="resultVal[standardMap.JOIN_LETTER_NO_COUNTRY]">无</span></p>
            </div>
          </div>
          <div class="min2">
            <h3>拉萨市人口分布</h3>
            <div class="min2chart" ref="min2chart"></div>
            <div class="min2list">
              <p v-for="zone in population.children" :key="zone.zoneId" v-html="zone.zoneName+'<span>'+zone.population+'</span>'"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
          <div class="sectionmin1 mabt70">
              <div class="min1div-img">
                  <img src="../../../assets/images/example.png" alt="">
              </div>
          </div>
          <div class="sectionmin2">
              <ul>
                  <li  v-for="honor in honorList" :title="honor.year + honor.name">
                      {{honor.year}}年
                      <span >{{honor.name}}</span>
                  </li>
              </ul>
          </div>
        <div class="sectionmin">
          <h3>各区县数据情况</h3>
          <div class="sectionchart" ref="sectionchart"></div>
        </div>
      </div>
    </div>
    <DialogNav ref="DialogNav"></DialogNav>
  </div>
</template>

<script>
    import datavhead from '@/components/DatavHead/index';
    import DialogNav from '@/components/DialogNav/index';
    import interviewchart from '@/assets/images/interview-chart.png';
    import * as echarts from 'echarts';
    import {getPopulation, getShow, getHistogram,getHonorListTop5} from "@/api/datav/priorities/example";

    export default {
        name: "DataV-Example",
        components: {'datavhead': datavhead, 'DialogNav': DialogNav},
        data(){
            return {
                standardMap:{
                    ENTER_JING_VISIT_ID:"59811fb2995f48d5829a85cdc982b213",/** 赴国家走访 ID */
                    ENTER_JING_LETTER_ID: "a8baad8ec87f40ffa37067f7b0e912e0", /*向国家写信 ID*/
                    ENTER_JING_INTERNET_ID :"bab30392cc5f4244bb0824c3d2e3afd3",/** 向国家局网投 ID*/
                    JOIN_LETTER_COUNTRY_ID:"5ce8755accc8489c89059d94e333d4e6",/** 赴国家集体访 ID*/
                    JOIN_LETTER_PRIVINCE_ID:"52ebbb716af247a4b9c83bb37deeeb2d",/** 赴自治区集体访 ID*/
                    JOIN_LETTER_CITY_ID:"19d111bb00554afa89fd8ec957bba374",/** 赴市集体访 ID */
                    JOIN_LETTER_NO_COUNTRY: "87094a236e46c76b6f2d5453ddeb16db",//包含赴自治区和市集体访内容
                },
                standardName:{},
                standardValue:{},
                //已选中的示范县数据
                planningShow:{
                    zoneName:''
                },
                resultVal:{},
                //人口数量
                population: {
                    children:[],
                },
                //柱状图
                histogram:[],
                honorList:[],
            };
        },
        mounted() {
            this.$modal.loading("");
            this.handleHistogram();
            this.handlePopulation();
            this.handleHonorListTop5();
        },
        created(){
        },
        methods: {
            openDialong() {
                this.$refs.DialogNav.handldOpen();
            },
            handleHonorListTop5(){
                getHonorListTop5().then(response => {
                    this.honorList = response.data;
                });
            },
            handlePopulation(){
                getPopulation().then(response => {
                    let data = this.ignoreCityData(response.data, "zoneName");
                    if(data){
                        data.forEach(obj => {
                            if(obj.zoneId.lastIndexOf("00000000") > 0){
                                this.population.zoneId = obj.zoneId;
                                this.population.zoneName = obj.zoneName;
                                this.population.population = obj.population;
                            }else{
                                let population = {};
                                population.zoneId = obj.zoneId;
                                population.zoneName = obj.zoneName;
                                population.population = obj.population;
                                this.population.children.push(population);
                            }
                        })
                    }
                    this.initminChart();
                });
            },
            handleShow(){
                getShow().then(response => {//查询被选中示范县, 以创建时间排序
                    let data = response.data;
                    var standardValue = 10000;
                    if(data){
                        this.planningShow = data;
                        let jingJson = JSON.parse(this.planningShow.jingJson);
                        for(let key in jingJson){//获取进京访数据
                            if(key == this.standardMap.ENTER_JING_VISIT_ID){
                                if(this.standardValue[key] && this.standardValue[key] !== 0) standardValue = 10000 / this.standardValue[key];
                                this.resultVal[key] = (jingJson[key].length > 0 && jingJson[key][0] > 0 ? jingJson[key][0] : 1) + '/'+parseInt(standardValue)+'<i class="el-icon-bottom"></i>';
                            }else if(key == this.standardMap.ENTER_JING_LETTER_ID){
                                if(this.standardValue[key] && this.standardValue[key] !== 0) standardValue = 10000 / this.standardValue[key];
                                this.resultVal[key] = (jingJson[key].length > 0 && jingJson[key][0] > 0 ? jingJson[key][0] : 1) + '/'+parseInt(standardValue)+'<i class="el-icon-bottom"></i>';
                            }else if(key == this.standardMap.ENTER_JING_INTERNET_ID){
                                if(this.standardValue[key] && this.standardValue[key] !== 0) standardValue = 10000 / this.standardValue[key];
                                this.resultVal[key] = (jingJson[key].length > 0 && jingJson[key][0] > 0 ? jingJson[key][0] : 1) + '/'+parseInt(standardValue)+'<i class="el-icon-bottom"></i>';
                            }
                        }
                        let resultJson = JSON.parse(this.planningShow.resultJson);
                        for(let key in resultJson){//获取集体访数据
                            if(key == this.standardMap.JOIN_LETTER_COUNTRY_ID){
                                this.resultVal[key] = resultJson[key] && resultJson[key] > 0 ? (resultJson[key]+"") : "无";
                            }else if(key == this.standardMap.JOIN_LETTER_PRIVINCE_ID || key == this.standardMap.JOIN_LETTER_CITY_ID){
                                this.resultVal[this.standardMap.JOIN_LETTER_NO_COUNTRY] = resultJson[key] && resultJson[key] > 0 ? (resultJson[key]+"") : "无";
                            }
                        }
                    }else{
                        this.planningShow.zoneName = "无";
                        if(this.standardValue[this.standardMap.ENTER_JING_VISIT_ID] && this.standardValue[this.standardMap.ENTER_JING_VISIT_ID] !== 0)
                            standardValue = 10000 / this.standardValue[this.standardMap.ENTER_JING_VISIT_ID];
                        this.resultVal[this.standardMap.ENTER_JING_VISIT_ID] = 1  + '/'+parseInt(standardValue)+'<i class="el-icon-bottom"></i>';
                        if(this.standardValue[this.standardMap.ENTER_JING_LETTER_ID] && this.standardValue[this.standardMap.ENTER_JING_LETTER_ID] !== 0)
                            standardValue = 10000 / this.standardValue[this.standardMap.ENTER_JING_LETTER_ID];
                        this.resultVal[this.standardMap.ENTER_JING_LETTER_ID] = 1  + '/'+parseInt(standardValue)+'<i class="el-icon-bottom"></i>';
                        if(this.standardValue[this.standardMap.ENTER_JING_INTERNET_ID] && this.standardValue[this.standardMap.ENTER_JING_INTERNET_ID] !== 0)
                            standardValue = 10000 / this.standardValue[this.standardMap.ENTER_JING_INTERNET_ID];
                        this.resultVal[this.standardMap.ENTER_JING_INTERNET_ID] = 1  + '/'+parseInt(standardValue)+'<i class="el-icon-bottom"></i>';
                        this.resultVal[this.standardMap.JOIN_LETTER_COUNTRY_ID] = '无';
                        this.resultVal[this.standardMap.JOIN_LETTER_NO_COUNTRY] = '无';
                    }

                });
            },
            handleHistogram(){
                getHistogram().then(response => {
                    this.$modal.closeLoading();
                    let data = this.ignoreCityData(response.data, "zoneName");
                    if(data){
                        data.forEach(obj => {
                            if(obj.zoneId.lastIndexOf("00000000") < 0){
                                let show = {
                                    zoneId: obj.zoneId,
                                    zoneName: obj.zoneName,
                                };
                                let resultJson = obj.resultJson;
                                resultJson.forEach(result => {
                                    show[result.id] = result.value;
                                    if(!this.standardName[result.id])
                                      this.standardName[result.id] = result.standard.quotaName;
                                    if(!this.standardValue[result.id] && result.standard.type === 0){
                                        this.standardValue[result.id] = result.standard.value;
                                    }
                                });
                                this.histogram.push(show);
                            }
                        });
                    }
                    this.initsectionchart();
                    this.handleShow();
                });
            },
            initminChart() {
                var total = 0;
                var data = [];
                var ycTotal = this.population.population;
                var chartData = this.population.children;
                for (var i = 0; i < chartData.length; i++) {
                    total += chartData[i].population;
                    data.push({
                        value: chartData[i].population,
                        itemStyle: {
                            normal: {
                                borderWidth: 5,
                                // shadowBlur: 20,
                                // borderColor:color[i],
                                // shadowColor: color[i]
                            },
                        }
                    });
                }
                var seriesOption = [{
                    name: '',
                    type: 'pie',
                    clockWise: false,
                    radius: [180, 170],
                    hoverAnimation: false,
                    data: data,
                    label: {
                        show: false
                    }
                }];
                var option = {
                    color: ['#fb686f', '#189fd7', '#ebda55', '#1e55c5', '#18b27a', '#a5a6a8',],
                    title: {
                        text: (ycTotal && ycTotal > 0  ? ycTotal : total),
                        top: '30%',
                        textAlign: "center",
                        left: "50%",
                        textStyle: {
                            color: '#1ab9f4',
                            fontSize: 80,
                            fontWeight: '500',
                            fontFamily: 'DSfont'
                        },
                        subtext: '拉萨市总人口数',
                        subtextStyle: {
                            textAlign: "center",
                            color: '#ffffff',
                            fontSize: 32
                        }
                    },
                    tooltip: {
                        show: false
                    },
                    toolbox: {
                        show: false
                    },
                    series: seriesOption
                };
                echarts.init(this.$refs.min2chart).setOption(option);
            },
            initsectionchart() {
                let chartData = this.histogram;
                let zoneNameData = [];
                let letterNumData = [], visitNumData = [], internetNumData = [], countryNumData = [], privinceNumData = [], cityNumData = [];
                let onlineNumData = [];
                for (let i = 0, len = chartData.length; i < len; i++) {
                    let rec = chartData[i];
                    zoneNameData.push(rec.zoneName);
                    visitNumData.push(rec[this.standardMap.ENTER_JING_VISIT_ID]);
                    letterNumData.push(rec[this.standardMap.ENTER_JING_LETTER_ID]);
                    internetNumData.push(rec[this.standardMap.ENTER_JING_INTERNET_ID]);
                    countryNumData.push(rec[this.standardMap.JOIN_LETTER_COUNTRY_ID]);
                    privinceNumData.push(rec[this.standardMap.JOIN_LETTER_PRIVINCE_ID]);
                    cityNumData.push(rec[this.standardMap.JOIN_LETTER_CITY_ID]);
                }
                let standardName = this.standardName;
                let series = [];
                for(let key in standardName){
                    let temp = (key == this.standardMap.ENTER_JING_VISIT_ID
                    || key == this.standardMap.ENTER_JING_LETTER_ID
                    || key == this.standardMap.ENTER_JING_INTERNET_ID );
                    let serieMap = {
                        name: (temp ? '进京访' : '集体访') + '('+standardName[key]+')',
                        type: 'bar',
                        stack: temp ? 'col1' : 'col2',
                        barWidth: 75,
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                offset: [-35, 0],
                                formatter: '{c}',
                                textStyle: {
                                    align: 'center',
                                    baseline: 'middle',
                                    fontSize: 28,
                                    fontWeight: '400',
                                    color: '#fff',
                                    textShadowColor: '#000',
                                    textShadowBlur: '0',
                                    textShadowOffsetX: 1,
                                    textShadowOffsetY: 1,
                                }
                            },
                        },
                        data: key == this.standardMap.ENTER_JING_VISIT_ID ? visitNumData :
                                key == this.standardMap.ENTER_JING_LETTER_ID  ? letterNumData :
                                key == this.standardMap.ENTER_JING_INTERNET_ID  ? internetNumData :
                                key == this.standardMap.JOIN_LETTER_COUNTRY_ID  ? countryNumData :
                                key == this.standardMap.JOIN_LETTER_PRIVINCE_ID  ? privinceNumData :
                                key == this.standardMap.JOIN_LETTER_CITY_ID  ? cityNumData : [],
                    };
                    series.push(serieMap);
                }
                let option = {
                    tooltip:{show: true},
                    legend: {
                        top: '0',
                        right: '0',
                        textStyle: {
                            color: '#a4a8b4',
                            fontSize : 30,
                        },
                    },
                    grid: {
                        left: '0',
                        top: '5%',
                        right: '1%',
                        bottom: 1,
                        containLabel: true
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            // margin: 10,
                            color: '#1fc4f2',
                            fontSize : 30,
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: zoneNameData,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#1fc4f2',
                            },

                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            // margin: 10,
                            color: 'rgb(72, 197, 231)',
                            fontSize : 30,
                            rotate: 0, // 旋转标签
                            interval: 0 // 显示所有标签

                        }
                    },
                    color: [
                        new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(251,104,112)'
                        },
                            {
                                offset: 1,
                                color: 'rgba(251,104,112,0)'
                            }
                        ]),
                        new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(33,174,139)'
                        },
                            {
                                offset: 1,
                                color: 'rgba(33,174,139,0)'
                            }
                        ]),
                        new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(233,214,85)'
                        },
                            {
                                offset: 1,
                                color: 'rgba(233,214,85,0)'
                            }
                        ]),

                        new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(25,188,247)'
                        },
                            {
                                offset: 1,
                                color: 'rgba(25,188,247,0)'
                            }
                        ]),
                        new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(33,96,225)'
                        },
                            {
                                offset: 1,
                                color: 'rgba(33,96,225,0)'
                            }
                        ]),
                        new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(173,175,174)'
                        },
                            {
                                offset: 1,
                                color: 'rgba(173,175,174,0)'
                            }
                        ]),
                    ],
                    //old:到国家局走访/到国家局走访/到国家局走访/进京集体访/赴区和赴市50人集体访/其他非访
                    //new:PlanningStandard
                    series: series
                };
                echarts.init(this.$refs.sectionchart).setOption(option);
            },
        }
    }
</script>

<style scoped lang="scss">
  p {
    margin: 0
  }

  $ft-color: #34d0ff;
  @font-face {
    font-family: "DSfont";
    src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
  }

  $sz-font-family: "DSfont";

  .home {
    .cont {
      .sectionleft {

        .sec1-min {
          margin-top: 30px;

          .min1 {
            width: 100%;
            padding: 30px 60px 0 60px;
            background: url("../../../assets/images/szbackgd.png");
            background-size: 100% 100%;

            .min1div {
              height: 67px;
              line-height: 67px;
              color: white;
                margin-bottom: 20px;
                img{
                    height: 67px;
                    width: 67px;
                }
              span {
                vertical-align: top;
                font-size: 34px;
                margin-left: 10px;
              }

              span:last-child {
                float: right;
              }
            }

            .min1list {
              p {
                color: $ft-color;
                font-size: 30px;
                height: 58px;
                line-height: 58px;
                margin-bottom: 40px;
                width: 404px;
                display: inline-block;
                padding-left: 15px;
                background-color: rgba(25, 54, 98, 0.38);

                span {
                  float: right;
                  color: #ebda55;
                  padding-right: 10px;

                  i {
                    color: #1ad385;
                  }
                }
              }

              p:nth-child(odd) {
                margin-right: 40px;
                border-left: 5px solid;
              }

              p:nth-child(even) {
                border-left: 5px solid #a5a6a8;
              }

              p:nth-child(1) {
                border-color: #fb686f;
              }

              p:nth-child(3) {
                border-color: #c4ba53;
              }

              p:nth-child(5) {
                border-color: #1ad084;
              }

              p:nth-child(7) {
                border-color: #1ab9f4;
              }

              p:nth-child(9) {
                border-color: #1e55c5;
              }
            }
          }

          .min2 {
            .min2chart {
              height: 360px;
              width: 100%;
            }

            .min2list {
              margin-top: 70px;

              p {
                color: $ft-color;
                font-size: 30px;
                height: 68px;
                line-height: 68px;
                margin-bottom: 40px;
                  margin-right: 20px;
                width: 300px;
                white-space: nowrap;
                display: inline-block;
                padding-left: 15px;
                background-color: rgba(25, 54, 98, 0.38);
                border-left: 5px solid;

                span {
                  float: right;
                  padding-right: 10px;
                }
              }

              p:nth-child(odd) {
                //margin-right: 40px;
              }

              p:nth-child(1) {
                border-color: #fb686f;
              }

              p:nth-child(2) {
                border-color: #189fd7;
              }

              p:nth-child(3) {
                border-color: #ebda55;
              }

              p:nth-child(4) {
                border-color: #1e55c5;
              }

              p:nth-child(5) {
                border-color: #18b27a;
              }

              p:nth-child(5) {
                border-color: #a5a6a8;
              }
            }
          }
        }
      }

      .section {
        display: inline-block;
        width: 2572px;
        vertical-align: top;
        margin-left: 100px;
        margin-top: 235px;
          .sectionmin1{
              display: inline-block;
              .min1div-img{
                  width: 2000px;
                  height: 607px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  img{
                      width: 100%;
                      height: 100%;
                  }
              }
          }
          .sectionmin2{
              vertical-align: top;
              display: inline-block;
              width: 572px;
              height: 607px;
              ul{
                  list-style: none;
                  padding: 40px 0;
                  color: #34d0ff;
                  font-size: 32px;
                  line-height: 121px;
                  cursor: pointer;
                  span{
                      float: right;
                      display: inline-block;
                      width: 300px;
                      overflow: hidden;
                      text-align: right;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                  }
              }
          }

        .sectionchart {
          height: 800px;
          width: 100%;
        }
      }


    }
  }

  .my-tooltip {

  }
</style>
<style scoped>
.tooltip-no-wrap {
    white-space: nowrap; /* 不换行 */
    width: 200px;
    max-width: none;     /* 去掉最大宽度限制 */
    background: #787be8;
}
</style>
