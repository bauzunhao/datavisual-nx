<template>
  <div class="home">
    <datavhead></datavhead>
    <div class="cont">
      <div class="sectionleft">
        <div class="sec1-nav">
          <router-link to="/"><img src="../../../assets/images/general-home.png" alt=""></router-link>
          <ul>
            <li @click="openDialong()"><span>导航</span></li>
            <li><router-link to="/datav/firstpiece"><span>初次信访</span></router-link></li>
            <li><router-link to="/datav/repetition"><span>重复信访</span></router-link></li>
            <li><router-link to="/datav/threelist"><span>三项清单</span></router-link></li>
          </ul>
        </div>
        <div class="sec1-min">
          <h3>减存量</h3>
          <div class="min1">
            <div class="min1-0">
              <div class="min1-01">
                <p>
                  <span>{{threeData.stockNum}}</span>
                  <span>件</span>
                </p>
              </div>
              <div class="min1-02">
                <span v-if="this.isThreeListDataMode == 1">截止1月1日未办结件(求决)</span>
              </div>
            </div>
            <div class="min1list">
              <ul>
                <li><span>国家局</span><span>{{threeData.stockNationNum}}</span><span>{{threeData.stockNationZb}}</span></li>
                <li><span>自治区</span><span>{{threeData.stockProvinceNum}}</span><span>{{threeData.stockProvinceZb}}</span></li>
                <li><span>全地市</span><span>{{threeData.stockQdsNum}}</span><span>{{threeData.stockQdsZb}}</span></li>
              </ul>
            </div>
          </div>

          <h3>控增量</h3>
          <div class="min1">
            <div class="min1-0 min1-1">
              <div class="min1-01">
                <p>
                  <span>{{threeData.incrementNum}}</span>
                  <span>件</span>
                </p>
              </div>
              <div class="min1-02" style="line-height: 42px;">
                  <span v-if="this.isThreeListDataMode == 1">同比:{{threeData.incrementYOY}}</span><br/>
                  <span v-if="this.isThreeListDataMode == 1">(今年以来登记的求决申诉初件)</span>
              </div>
            </div>
            <div class="min1list">
              <ul>
                <li><span>国家局</span><span>{{threeData.incrementNationNum}}</span><span>{{threeData.incrementNationZb}}</span></li>
                <li><span>自治区</span><span>{{threeData.incrementProvinceNum}}</span><span>{{threeData.incrementProvinceZb}}</span></li>
                <li><span>全地市</span><span>{{threeData.incrementQdsNum}}</span><span>{{threeData.incrementQdsZb}}</span></li>
              </ul>
            </div>
          </div>

          <h3>防变量</h3>
          <div class="min1">
            <div class="min1-0 min1-1">
              <div class="min1-01">
                <p>
                  <span>{{threeData.variableNum}}</span>
                  <span>件</span>
                </p>
              </div>
              <div class="min1-02">
                  <span v-if="this.isThreeListDataMode == 1">同比:{{threeData.variableYOY}}</span>
              </div>
            </div>
            <div class="min1list">
              <ul>
                <li><span>扬言信</span><span>{{threeData.variableYyNum}}</span><span>{{threeData.variableYyZb}}</span></li>
                <li><span>集体访</span><span>{{threeData.variableJtfNum}}</span><span>{{threeData.variableJtfZb}}</span></li>
                <li><span>50人以上</span><span>{{threeData.variableInvolveNum}}</span><span>{{threeData.variableInvolveZb}}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <genpie-chart ref="child" v-if="tableData" :message="tableData" :height="1150" :viewType="viewName"></genpie-chart>
        <div class="simap_total">
          <p>全部件数</p>
          <p>{{threeData.total}}</p>
        </div>
        <div class="simap_tip">
          <div class="simap_tipli">
            <p>{{threeData.stockNum}}</p>
            <p>减存量</p>
          </div>
          <div class="simap_tipli">
            <p>{{threeData.incrementNum}}</p>
            <p>控增量</p>
          </div>
          <div class="simap_tipli">
            <p>{{threeData.variableNum}}</p>
            <p>防变量</p>
          </div>
        </div>
      </div>
      <div class="sectionrt">
        <div class="secrt-1 mabt70">
          <h3>逐月情况</h3>
          <div class="secrt-1chart" ref="secrt1chart"></div>
        </div>
        <div class="secrt-1">
          <h3>三项清单各区县办理情况</h3>
          <div class="secrt-1chart" ref="secrt2chart"></div>
        </div>
      </div>
    </div>
    <DialogNav ref="DialogNav"></DialogNav>
  </div>
</template>

<script>
import datavhead from '@/components/DatavHead/index'
import DialogNav from '@/components/DialogNav/index'
import genpieChart from '@/views/datav/petition/genpieChart'
import { getThreeItemsListData,getByZoneGroupData,getByZoneEndGroupData,getByMonthGroupData } from '@/api/datav/priorities/threeItemsList'
import * as echarts from 'echarts'

export default {
  name: "threelist" ,
  components: {'datavhead': datavhead, 'DialogNav': DialogNav,'genpieChart':genpieChart},
  data(){
    return{
      viewName:'threelistView',
      tableData: [],
      threeData:{
        total: 0,
        stockNum: 0,
        stockNationNum: 0,
        stockProvinceNum: 0,
        stockQdsNum: 0,
        stockNationZb: 0,
        stockProvinceZb: 0,
        stockQdsZb: 0,
        incrementNum: 0,
        incrementNationNum: 0,
        incrementNationZb: 0,
        incrementProvinceNum: 0,
        incrementProvinceZb: 0,
        incrementQdsNum: 0,
        incrementQdsZb: 0,
        incrementYOY: '',
        variableNum: 0,
        variableJtfNum: 0,
        variableYyNum: 0,
        variableInvolveNum: 0,
        variableJtfZb: 0,
        variableYyZb: 0,
        variableInvolveZb: 0,
        variableYOY: '',
      },
      zoneEndDataList:[],
      monthData:null,
      isThreeListDataMode: 2,
    }
  },
  mounted() {
    this.$modal.loading("");
    this.queryByZoneGroupData();
    this.queryThreeItemsListData();
    this.querByZoneEndGroupData();
    this.querByMonthGroupData();
  },
  methods:{
    openDialong() {
      this.$refs.DialogNav.handldOpen();
    },
    queryThreeItemsListData() {
      getThreeItemsListData({}).then(response => {
          this.threeData.stockNationZb = '0.00%'
          this.threeData.stockProvinceZb = '0.00%';
          this.threeData.stockQdsZb = '0.00%';
          this.threeData.incrementNationZb = '0.00%';
          this.threeData.incrementProvinceZb = '0.00%';
          this.threeData.incrementQdsZb = '0.00%';
          this.threeData.incrementYOY = '';
          this.threeData.variableJtfZb = '0.00%';
          this.threeData.variableYyZb = '0.00%';
          this.threeData.variableInvolveZb = '0.00%';
          this.threeData.variableYOY = '';
          if (response.data) {
              this.isThreeListDataMode = response.data.isThreeListDataMode;
              this.threeData.stockNum = response.data.stockMap.total;
              this.threeData.stockNationNum = response.data.stockMap.nationNum;
              this.threeData.stockProvinceNum = response.data.stockMap.provinceNum;
              this.threeData.stockQdsNum = response.data.stockRegisterTotal;
              if(this.threeData.stockNum * 1.0 > 0){
                  this.threeData.stockNationZb = (this.threeData.stockNationNum * 1.0 / this.threeData.stockNum * 1.0 * 100.0).toFixed(2)+"%";
                  this.threeData.stockProvinceZb = (this.threeData.stockProvinceNum * 1.0 / this.threeData.stockNum * 1.0 * 100.0).toFixed(2)+"%";
                  this.threeData.stockQdsZb = (this.threeData.stockQdsNum * 1.0 / this.threeData.stockNum * 1.0 * 100.0).toFixed(2)+"%";
              }
              this.threeData.incrementNum = response.data.incrementMap.total;
              this.threeData.incrementNationNum = response.data.incrementMap.nationNum;
              this.threeData.incrementProvinceNum = response.data.incrementMap.provinceNum;
              this.threeData.incrementQdsNum = response.data.incrementRegisterTotal;
              if(this.threeData.incrementNum * 1.0 > 0) {
                  this.threeData.incrementNationZb = (this.threeData.incrementNationNum * 1.0 / this.threeData.incrementNum * 1.0 * 100.0).toFixed(2) + "%";
                  this.threeData.incrementProvinceZb = (this.threeData.incrementProvinceNum * 1.0 / this.threeData.incrementNum * 1.0 * 100.0).toFixed(2) + "%";
                  this.threeData.incrementQdsZb = (this.threeData.incrementQdsNum * 1.0 / this.threeData.incrementNum * 1.0 * 100.0).toFixed(2) + "%";
              }
              this.threeData.incrementYOY = response.data.incrementYOY;
              this.threeData.variableNum = response.data.variableMap.total;
              this.threeData.variableJtfNum = response.data.variableMap.jointLetterNum;
              this.threeData.variableYyNum = response.data.variableMap.threatenNum;
              this.threeData.variableInvolveNum = response.data.variableMap.involveNum;
              if( this.threeData.variableNum * 1.0 > 0) {
                  this.threeData.variableJtfZb = (this.threeData.variableJtfNum * 1.0 / this.threeData.variableNum * 1.0 * 100.0).toFixed(2) + "%";
                  this.threeData.variableYyZb = (this.threeData.variableYyNum * 1.0 / this.threeData.variableNum * 1.0 * 100.0).toFixed(2) + "%";
                  this.threeData.variableInvolveZb = (this.threeData.variableInvolveNum * 1.0 / this.threeData.variableNum * 1.0 * 100.0).toFixed(2) + "%";
              }
              this.threeData.variableYOY = response.data.variableYOY;
              this.threeData.total = (this.threeData.stockNum * 1 + this.threeData.incrementNum * 1 + this.threeData.variableNum * 1);
          }
          this.$modal.closeLoading();
      })
    },
    queryByZoneGroupData(){
      getByZoneGroupData({}).then(response => {
        if (response.data) {
          this.tableData = this.ignoreCityData(response.data,'name');
          //加载地图数据
          setTimeout(()=> {
            this.$refs.child.initmap();
          }, 1000);
        }
      })
    },
    querByZoneEndGroupData(){
      getByZoneEndGroupData({}).then(response => {
        if (response.data) {
          this.zoneEndDataList = this.ignoreCityData(response.data,'name');
          this.initZoneEndDataChart();
        }
      })
    },
    querByMonthGroupData(){
      getByMonthGroupData({}).then(response => {
        if (response.data) {
          this.monthData = response.data;
          this.initMonthDataChart();
        }
      })
    },
    initMonthDataChart() {
      let stockNumData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let incrementNumData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let variableNumData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0, len =  this.monthData.stockMonthList.length; i < len; i++) {
        let rec = this.monthData.stockMonthList[i];
        let index = parseInt(rec.mon) - 1;
        stockNumData[index] = rec.num;
      }
      for (let i = 0, len =  this.monthData.incrementMonthList.length; i < len; i++) {
        let rec = this.monthData.incrementMonthList[i];
        let index = parseInt(rec.mon) - 1;
        incrementNumData[index] = rec.num;
      }
      for (let i = 0, len =  this.monthData.variableMonthList.length; i < len; i++) {
        let rec = this.monthData.variableMonthList[i];
        let index = parseInt(rec.mon) - 1;
        variableNumData[index] = rec.num;
      }
      let option = {
        legend: {
          icon: 'circle',
          top: 0,
          right: 0,
          itemWidth: 6,
          itemGap: 20,
          textStyle: {
            color: '#20c2f3',
              fontSize : 26
          }
        },
        grid: {
          top: 10,
          left: 0,
          right: 10,
          bottom: 50,
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLabel: {
                color : '#34d0ff',
                fontSize : 26
            },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba( 33, 142, 168, 0.302 )'
            }
          }

        },
        series: [
          {
            name: '存量',
            data: stockNumData,
            type: 'line',
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            color: '#ebda55',
          },
          {
            name: '增量',
            data: incrementNumData,
            type: 'line',
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            color: '#1acc83',
          },
          {
            name: '变量',
            data: variableNumData,
            type: 'line',
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            color: '#ef656e',
          },
        ]
      };
      echarts.init(this.$refs.secrt1chart).setOption(option);
    },
    initZoneEndDataChart() {
      let data1 = [];
      let data2 = [];
      let data3 = [];
      let zoneNames = [];
      for (let i = 0; i < this.zoneEndDataList.length; i++) {
        data1.push(this.zoneEndDataList[i].endNum);
        data2.push(this.zoneEndDataList[i].noEndNum);
        data3.push(this.zoneEndDataList[i].num);
        zoneNames.push(this.zoneEndDataList[i].name);
      }
      let option = {
        legend: {
          top: 0,
          right: 0,
          textStyle: {
            color: '#20c2f3',
              fontSize : 26,
          }
        },
        xAxis: {
          type: 'category',
          data: zoneNames,
          axisLine: {
            lineStyle: {
              color: '#228ea8' //
            },
          },
            axisLabel: {
                color : '#34d0ff',
                fontSize : 26,
                rotate: 45, // 旋转标签
                interval: 0 // 显示所有标签
            },
        },
        grid: {
          top: 10,
          left: 40,
          right: 10,
          bottom: 120,
        },
        yAxis: {
          type: 'value',
          // show :false
          axisLabel: {
            formatter: '{value}',
              color : '#34d0ff',
              fontSize : 24
          },
          axisLine: {
            lineStyle: {
              color: '#228ea8' //
            },
            nameTextStyle: '#20c2f0'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba( 33, 142, 168, 0.302 )'
            }
          }
        },
        series: [
          {
            data: data1,
            name: '已化解',
            type: 'bar',
            stack: 'Tik Tok',
            barWidth: 30,
            zlevel: 2,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgb(0,162,255)'},
              {offset: 1, color: 'rgba(17,102,255,0)'}
            ]),

            label: {
              normal: {
                show: true,
                position: 'insideRight',
                offset: [-10, 0],
                formatter: '{c}',
                textStyle: {
                  align: 'center',
                  baseline: 'middle',
                  fontSize: 26,
                  fontWeight: '400',
                  color: '#fff',
                  textShadowColor: '#000',
                  textShadowBlur: '0',
                  textShadowOffsetX: 1,
                  textShadowOffsetY: 1,
                }
              },
            },
          }, {
            name: '未化解',
            data: data2,
            type: 'bar',
            stack: 'Tik Tok',
            barWidth: 30,
            zlevel: 2,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(251,104,111)'
            },
              {
                offset: 1,
                color: 'rgba(251,104,111,0)'
              }
            ]),
            label: {
              normal: {
                show: true,
                position: 'insideRight',
                offset: [-10, 0],
                formatter: '{c}',
                textStyle: {
                  align: 'center',
                  baseline: 'middle',
                  fontSize: 20,
                  fontWeight: '400',
                  color: '#fff',
                  textShadowColor: '#000',
                  textShadowBlur: '0',
                  textShadowOffsetX: 1,
                  textShadowOffsetY: 1,
                }
              },
            },
          }, {
            type: 'bar',
            barWidth: 30,
            barGap: '-100%',
            label: {
              normal: {
                show: true,
                position: 'top',
                offset: [0, -3],
                formatter: '{c}',
                textStyle: {
                  align: 'center',
                  baseline: 'middle',
                  fontSize: 20,
                  fontWeight: '400',
                  color: '#ebda55',
                  textShadowColor: '#000',
                  textShadowBlur: '0',
                  textShadowOffsetX: 1,
                  textShadowOffsetY: 1,
                }
              },
            },
            data: data3,
            zlevel: 1,
            itemStyle: {
              normal: {
                color: '#06375f',
              }
            },
          },
        ]
      };
      echarts.init(this.$refs.secrt2chart).setOption(option);
    },
  }
}
</script>


<style scoped lang="scss">
p {
  margin: 0
}

$ft-color: #34d0ff;
$ye-color: #ebda55;
@font-face {
  font-family: "DSfont";
  src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
}

$sz-font-family: "DSfont";

.home {
  .cont {
    .sectionleft {
      .sec1-min {
        .min1{
          height: 400px;
          margin-top: 30px;
          margin-bottom: 70px;
          .min1-0{
            width: 370px;
            display: inline-block;
            background: url("../../../assets/images/szbackgd.png");
            background-size: 100% 100%;
            .min1-01{
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              align-content: center;
              justify-content: space-around;
              align-items: stretch;
              height: 200px;
              p{
                color: $ft-color;
                font-size: 24px;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                align-content: space-between;
                line-height: 200px;
                span:first-child{
                  font-family: $sz-font-family;
                  font-size: 80px;
                  color: $ye-color;
                }
                span:last-child{
                  line-height: 220px;
                }
              }
            }
            .min1-02{
              height: 130px;
              line-height: 130px;
              text-align: center;
              background-image: linear-gradient(to right, #042a4b, #054d73);
              color: $ft-color;
              font-size: 28px;
            }
          }
          .min1-1{
            .min1-01{
              p{
                span:first-child{
                  color: #1ad485;
                }
              }
            }
          }
          .min1-2{
            .min1-01{
              p{
                span:first-child{
                  color: #22b6e4;
                }
              }
            }
          }
          .min1list{
            display: inline-block;
            width: 400px;
            margin-left: 25px;
            height: 100%;
            vertical-align: top;
            ul{
              margin: 0;
              padding: 0;
              li{
                color: $ft-color;
                list-style: none;
                font-size: 30px;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-around;
                align-items: center;
                background-color: rgba(20, 43, 78, 0.38);
                height: 103px;
                border-left: 6px solid;
                margin-bottom: 10px;
                span{
                  display: inline-block;
                  width: 100px;
                  text-align: center;
                  white-space: nowrap;
                }
              }
              li:nth-child(1){
                border-color: #fb686f;
              }li:nth-child(2){
                border-color: #ebda55;
              }li:nth-child(3){
                border-color: #1ad084;
              }
            }
          }
        }
      }
    }
    .section{
      display: inline-block;
        width: 1500px;
        margin: 155px 100px 0 100px;
      vertical-align: top;
      height: 1500px;
      position: relative;
      .simap_total{
        position: absolute;
        right: 50px;
        top: 50px;
        p{
          margin: 0;
          color: $ft-color;
          font-size: 30px;
        }
        p:nth-child(2){
          font-size: 64px;
          color: white;
          font-family: $sz-font-family;
        }
      }
      .simap_tip{
        position: absolute;
        bottom: 0;
        left: 0;
        color: $ft-color;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        .simap_tipli{
          position: relative;
          width: 130px;
          margin-top: 30px;
          p{
            margin: 0;
          }
          p:first-child{
            color: $ye-color;
            font-size: 54px;
            font-family: $sz-font-family;
          }
          p:last-child{
            font-size: 23px;
          }
          :after{
            content: '';
            position: absolute;
            left: -20px;
            top: 30px;
            border: 4px solid $ye-color;
          }
        }
        .simap_tipli:nth-child(2){
          :after{
            border-color: #1ad485;
          }
          p:first-child{
            color: #1ad485;
          }
        }
        .simap_tipli:nth-child(3){
          :after{
            border-color: $ft-color;
          }
          p:first-child{
            color: $ft-color;
          }
        }
      }
    }
    .sectionrt {
      margin-top: 150px;
      width: 968px;
      display: inline-block;
      vertical-align: top;
      .secrt-1chart{
        height: 680px;
        width: 100%;
        margin: 20px 0;
      }
    }
  }
}
</style>
