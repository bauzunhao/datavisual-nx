<template>
  <div class="home">
    <datavhead></datavhead>
    <div class="cont">
      <div class="sectionleft">
        <div class="sec1-nav">
          <router-link to="/"><img src="../../../assets/images/general-home.png" alt=""></router-link>
          <ul>
            <li @click="openDialong()"><span>导航</span></li>
            <li><router-link to="/datav/general"><span>信访概览</span></router-link></li>
            <li><router-link to="/datav/transact"><span>办理情况</span></router-link></li>
            <li><router-link to="/datav/perfmon"><span>绩效分析</span></router-link></li>
            <li><router-link to="/datav/contradiction"><span>突出矛盾</span></router-link></li>
          </ul>
        </div>
        <div class="secleft1 mabt70">
          <h3>突出矛盾TOP10</h3>
          <div class="secleft1list">
            <p class="ft26" v-for="(item, index) in contradictionDataTop10 "><span>{{(index+1)}}</span>{{item.name}}</p>
          </div>
          <div class="secleft1chart" ref="secleft1chart"></div>
        </div>
        <div class="secleft2 ">
          <h3>矛盾预测</h3>
          <div class="secleft2chart" ref="secleft2chart"></div>
          <div class="secleft2list ft30">
            <p  v-for="(item, index) in contradictionThreeDataTop5 "><span>{{(item.name)}}</span><span>{{item.num}}</span></p>
          </div>
          <div class="secleft3">
            <h3>矛盾热词TOP</h3>
            <div class="secleft3list" ref="secleft3Chart">
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <h3>{{this.tionName}}</h3>
        <div class="section-1 mabt70" ref="section1Chart"></div>
        <div class="section-2 mabt70">
          <h3>近12个月突出问题趋势-{{this.tionName}}</h3>
          <div ref="section2Chart" class="section2Chart"></div>
        </div>
        <div class="section-3">
          <ul class="section3Chart">
            <li>
                <p>{{ citylist[0] }}</p>
                <div class="selep">
                    <p v-for="res in zoneListData1" :key="res.id">{{res.name}}</p>
                </div>
                <div class="sectlistChart" ref="sectlistChart1"></div>
            </li>
            <li>
                <p>{{ citylist[1] }}</p>
                <div class="selep">
                    <p v-for="res in zoneListData2" :key="res.id">{{res.name}}</p>
                </div>
                <div class="sectlistChart" ref="sectlistChart2"></div>
            </li>
            <li>
                <p>{{ citylist[2] }}</p>
                <div class="selep">
                    <p v-for="res in zoneListData3" :key="res.id">{{res.name}}</p>
                </div>
                <div class="sectlistChart" ref="sectlistChart3"></div>
            </li>
            <li>
                <p>{{ citylist[3] }}</p>
                <div class="selep">
                    <p v-for="res in zoneListData4" :key="res.id">{{res.name}}</p>
                </div>
                <div class="sectlistChart" ref="sectlistChart4"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="sectionrt">
        <div class="secrt-nav ft30">
          <ul>
            <li @click="queryTimeMark(3)"><span :style="{ 'color': queryParams.params.timeMark===3? '#fff':''  }">本年</span></li>
            <li @click="queryTimeMark(6)"><span :style="{ 'color': queryParams.params.timeMark===6? '#fff':''  }">上年</span></li>
          </ul>
        </div>
        <div  class="secrt-0 mabt70">
          <h3>区县分布情况-{{this.tionName}}</h3>
          <div class="secrt-0chart " ref="secrt0Chart"></div>
        </div>
        <div  class="secrt-1 mabt70">
          <h3>其他突出问题</h3>
          <div class="secrt-1chart" >
            <div class="seclist" @click="opencontradvis(1)">
              <p class="ft30">重复件</p>
              <p class="ft26"><span class="ft30">{{contradictionData.endRepeatNum}}/{{contradictionData.repeatNum}}</span><span>办结/总量</span></p>
            </div>
            <div class="seclist" @click="opencontradvis(2)">
              <p class="ft30">集体访</p>
              <p class="ft26"><span class="ft30">{{contradictionData.endJtfNum}}/{{contradictionData.jtfNum}}</span><span>办结/总量</span></p>
            </div>
            <div class="seclist" @click="opencontradvis(3)">
              <p class="ft30">扬言件</p>
              <p class="ft26"><span class="ft30">{{contradictionData.endThreatenNum}}/{{contradictionData.threatenNum}}</span><span>办结/总量</span></p>
            </div>
            <div class="seclist" @click="opencontradvis(4)">
              <p class="ft30">专项件</p>
              <p class="ft26"><span class="ft30">{{contradictionData.endZxxdNum}}/{{contradictionData.zxxdNum}}</span><span>办结/总量</span></p>
            </div>
          </div>
        </div>
        <div class="secrt-2">
          <div class="secrtlist" :class="{ visible: visibleIndexes.includes(0) }" >
              <p>{{ citylist[4] }}</p>
              <div class="selep">
                  <p v-for="res in zoneListData5" :key="res.id">{{res.name}}</p>
              </div>
              <div class="secrtlistChart" ref="secrtlistChart1"></div>
          </div>
          <div class="secrtlist" :class="{ visible: visibleIndexes.includes(1) }">
              <p>{{ citylist[5] }}</p>
              <div class="selep">
                  <p v-for="res in zoneListData6" :key="res.id">{{res.name}}</p>
              </div>
              <div class="secrtlistChart" ref="secrtlistChart2"></div>
          </div>
            <div class="secrtlist" :class="{ visible: visibleIndexes.includes(2) }">
                <p>{{ citylist[6] }}</p>
                <div class="selep">
                    <p v-for="res in zoneListData7" :key="res.id">{{res.name}}</p>
                </div>
                <div class="secrtlistChart" ref="secrtlistChart3"></div>
            </div>
            <div class="secrtlist" :class="{ visible: visibleIndexes.includes(3) }">
                <p>{{ citylist[7] }}</p>
                <div class="selep">
                    <p v-for="res in zoneListData8" :key="res.id">{{res.name}}</p>
                </div>
                <div class="secrtlistChart" ref="secrtlistChart4"></div>
            </div>
            <div class="secrtlist" :class="{ visible: visibleIndexes.includes(4) }">
                <p>{{ citylist[8] }}</p>
                <div class="selep">
                    <p v-for="res in zoneListData9" :key="res.id">{{res.name}}</p>
                </div>
                <div class="secrtlistChart" ref="secrtlistChart5"></div>
            </div>
        </div>
      </div>
    </div>
    <DialogNav ref="DialogNav"></DialogNav>
  <el-dialog
      :visible.sync="contradvis"
      width="1200px"
      custom-class="contradvis"
      :title="this.otherTypeName"
      :before-close="contradClose">

      <div class="content">
          <el-table
              :data="otherDataList"
              style="width: 100%"
              :empty-text="detailEmptyText"
              size="medium">
              <el-table-column
                  prop="letterCode"
                  width="150"
                  label="编号" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="zoneName"
                  width="130"
                  label="区县" show-overflow-tooltip>
              </el-table-column>
              <el-table-column v-if="3 == this.otherType"
                  prop="threatenContent"
                  label="扬言内容" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="complaintContent"
                  label="概况" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="handleUnitName"
                  label="最后办理单位" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="userName"
                  width="100"
                  label="经办人">
              </el-table-column>
              <el-table-column
                  prop="telephone"
                  width="140"
                  label="经办人电话" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="end"
                  width="120"
                  label="办结状态">
                  <template slot-scope="scope">
                      {{ scope.row.end ? "办结" : "未办结" }}
                  </template>
              </el-table-column>
          </el-table>
          <pagination
              v-show="total>0"
              :total="total"
              :page.sync="queryTableParams.pageNum"
              :limit.sync="queryTableParams.pageSize"
              @pagination="queryOtherData(otherType)"
          />
      </div>
  </el-dialog>
  </div>
</template>

<script>
import DialogNav from '@/components/DialogNav/index'
import datavhead from '@/components/DatavHead/index'
import genpieChart from '@/views/datav/petition/genpieChart'
import * as echarts from 'echarts'
import interviewchart from '@/assets/images/interview-chart.png'
import img1 from '@/assets/images/contr1.png'
import img2 from '@/assets/images/contr2.png'
import img3 from '@/assets/images/contr3.png'
import img4 from '@/assets/images/contr4.png'
import {
    getByKeywordData,
    getByMonthGroupData,
    getByOneDataTop10,
    getByTypeData,
    getHighlightContradictionsData,
    getOtherData,
    getZoneGroupData
} from '@/api/datav/petition/contradiction'

export default {
name: "contradiction",
  data (){
    return {
        currentIndex: 0, // 当前显示的第一个元素的索引
        intervalId: null, // 存储定时器的 ID
        detailEmptyText: '正在加载中',
        secleft1chart : '',
        echartsInstance : '',
        contradvis : false,
        contradictionData:{
          endRepeatNum: 0,
          repeatNum: 0,
          endJtfNum: 0,
          jtfNum: 0,
          endThreatenNum: 0,
          threatenNum: 0,
          endZxxdNum: 0,
          zxxdNum: 0,
        },
        zoneListData: [],
        // 查询参数
        queryParams: {
          params: {
            timeMark:3
          },
        },
        contradictionDataTop8: [],
        contradictionDataTop10: [],
        contradictionTwoDataTop10: [],
        contradictionThreeDataTop5: [],
        tionName: '',
        contradictionMonthData: [],
        zoneListData1: [],
        zoneListData2: [],
        zoneListData3: [],
        zoneListData4: [],
        zoneListData5: [],
        zoneListData6: [],
        zoneListData7: [],
        zoneListData8: [],
        zoneListData9: [],
        otherDataList: [],
        otherType: 1,
        otherTypeName: "重复件明细",
        // 总条数
        total: 0,
        queryTableParams: {
            pageNum: 1,
            pageSize: 10,
            params: {
                timeMark:3,
            },
        },
        citylist:[],
    }},
  components: {'DialogNav': DialogNav, 'datavhead': datavhead, 'genpieChart': genpieChart},
  mounted() {
    this.queryTimeMark(3);
    this.intervalId = setInterval(this.next, 3000); // 每3秒调用一次 next 方法

  },
  methods:{
      next() {
          this.currentIndex = (this.currentIndex + 1) % 5; // 循环递增索引
      },
      contradClose(){
        this.contradvis = false
      },
      opencontradvis(type){
          this.contradvis = true;
          this.queryOtherData(type);
      },
    queryTimeMark(mark){
      this.$modal.loading("");
      this.queryParams.params.timeMark = mark;
      this.queryTableParams.params.timeMark = mark;
      this.queryHighlightContradictionsData(); //统计数据
      this.queryByOneDataTop10();
      this.queryByThreeDataTop5();
      this.queryByOneDataTop8();
      this.queryByZoneIdDataTop4('540102',1,"城关区");
      this.queryByZoneIdDataTop4('540103',2,"堆龙德庆区");
      this.queryByZoneIdDataTop4('540104',3,"达孜区");
      this.queryByZoneIdDataTop4('540121',4,"林周县");
      this.queryByZoneIdDataTop4('540122',5,"当雄县");
      this.queryByZoneIdDataTop4('540123',6,"尼木县");
      this.queryByZoneIdDataTop4('540124',7,"曲水县");
      this.queryByZoneIdDataTop4('540127',8,"墨竹工卡县");
      this.queryByZoneIdDataTop4('540172',9,"拉萨经济技术开发区");
    },
    queryHighlightContradictionsData(){
      getHighlightContradictionsData(this.queryParams).then(response => {
        if (response.data) {
            this.contradictionData = response.data;
        }
      })
    },
    queryZoneGroupData(id){
      if(id) {
        let contParam = {};
        let params ={timeMark:this.queryParams.params.timeMark};
        contParam.params = params;
        contParam.id = id;
        getZoneGroupData(contParam).then(response => {
          this.zoneListData = [];
          if (response.data) {
            this.zoneListData = this.ignoreCityData(response.data,'name');
            this.initsecrt0Chart();
          }
        })
      }
    },
    queryByTwoAllData(id){
      if(id) {
        let contParam = {};
        let params ={timeMark:this.queryParams.params.timeMark};
        contParam.params = params;
        contParam.id = id;
        contParam.type = 2;
        getByTypeData(contParam).then(response => {
          this.contradictionTwoDataTop10 = [];
          if (response.data) {
            this.contradictionTwoDataTop10 = response.data;
            this.initsection1Chart();
            this.$modal.closeLoading();
          }
        })
      }
    },
    queryByMonthGroupData(id){
      if(id) {
        let contParam = {};
        let params ={timeMark:this.queryParams.params.timeMark};
        contParam.params = params;
        contParam.id = id;
        getByMonthGroupData(contParam).then(response => {
          this.contradictionMonthData = [];
          if (response.data) {
            this.contradictionMonthData = response.data;
            this.initsection2Chart();
          }
        })
      }
    },
    queryByOneDataTop10(){
      getByOneDataTop10(this.queryParams).then(response => {
        this.contradictionDataTop10 = [];
        if (response.data) {
          this.contradictionDataTop10 = response.data;
          if(this.secleft1chart) this.secleft1chart.dispose() //销毁echarts
          this.initsecleft1chartchart();
        }
      })
    },

    queryByThreeDataTop5(){
      let contParam = {};
      let params ={timeMark:this.queryParams.params.timeMark};
      contParam.params = params;
      contParam.type = 3;
      contParam.limitNum = 5;
      getByTypeData(contParam).then(response => {
        this.contradictionThreeDataTop5 = [];
        if (response.data) {
          this.contradictionThreeDataTop5 = response.data;
          this.initsecleft2chart();
        }
      })
    },
    queryByOneDataTop8(){
      let contParam = {};
        contParam.params = { timeMark: this.queryParams.params.timeMark };
      contParam.limitNum = 5;
        getByKeywordData(contParam).then(response => {
        this.contradictionDataTop8 = [];
        if (response.data) {
          this.contradictionDataTop8 = response.data;
          this.initsecleft3Chart();
        }
      })
    },
    queryByZoneIdDataTop4(zoneId,index,zoneName){
      let contParam = {};
      let params ={timeMark:this.queryParams.params.timeMark};
      contParam.params = params;
      contParam.type = 3;
      contParam.limitNum = 4;
      contParam.zoneCode = zoneId;
      getByTypeData(contParam).then(response => {
        if(1 == index){
          this.zoneListData1 = [];
        }else if(2 == index){
          this.zoneListData2 = [];
        }else if(3 == index){
          this.zoneListData3 = [];
        }else if(4 == index){
          this.zoneListData4 = [];
        }else if(5 == index){
          this.zoneListData5 = [];
        }else if(6 == index){
          this.zoneListData6 = [];
        }else if(7 == index){
          this.zoneListData7 = [];
        }else if(8 == index){
          this.zoneListData8 = [];
        }else if(9 == index){
          this.zoneListData9 = [];
        }
        if (response.data) {
          if(1 == index){
            this.zoneListData1 = response.data;
            this.$set(this.citylist, index-1, zoneName);
          }else if(2 == index){
            this.zoneListData2 = response.data;
              this.$set(this.citylist, index-1, zoneName);
          }else if(3 == index){
            this.zoneListData3 = response.data;
              this.$set(this.citylist, index-1, zoneName);
          }else if(4 == index){
            this.zoneListData4 = response.data;
              this.$set(this.citylist, index-1, zoneName);
          }else if(5 == index){
            this.zoneListData5 = response.data;
              this.$set(this.citylist, index-1, zoneName);
          }else if(6 == index){
            this.zoneListData6 = response.data;
              this.$set(this.citylist, index-1, zoneName);
          }else if(7 == index){
            this.zoneListData7 = response.data;
              this.$set(this.citylist, index-1, zoneName);
          }else if(8 == index){
            this.zoneListData8 = response.data;
              this.$set(this.citylist, index-1, zoneName);
          }else if(9 == index){
              this.zoneListData9 = response.data;
              this.$set(this.citylist, index-1, zoneName);
          }
          this.initsectlistChart(index,zoneName);
        }
      })
    },
    queryOtherData(type){
      if(type != this.otherType){
          this.queryTableParams.pageNum = 1;
      }
      this.otherType = type;
      if(1 == this.otherType){
          this.otherTypeName = "重复件明细";
      }else if(2 == this.otherType){
          this.otherTypeName = "集体访明细";
      }else if(3 == this.otherType){
          this.otherTypeName = "扬言件明细";
      }else if(4 == this.otherType){
          this.otherTypeName = "专项件明细";
      }
      this.queryTableParams.otherType = this.otherType;
        this.otherDataList = [];
        this.total = 0;
      getOtherData(this.queryTableParams).then(response => {
          if (response.rows) {
              this.otherDataList = response.rows;
          }
          this.total = response.total;
          this.detailEmptyText = this.otherDataList && this.otherDataList.length > 0 ? "正在加载中" : "暂无数据";
      })
    },
    openDialong() {
      this.$refs.DialogNav.handldOpen();
    },
    initsecleft1chartchart() {
      let data = [];
      for (let i = this.contradictionDataTop10.length-1; i < this.contradictionDataTop10.length && i >= 0; i-- ) {
        let rec =  this.contradictionDataTop10[i];
        data.unshift({
          id: rec.id,
          name: rec.name,
          value: rec.num
        });
        if(0 == i){
          this.tionName = rec.name;
          this.queryZoneGroupData(rec.id); //地市分组
          this.queryByTwoAllData(rec.id);
          this.queryByMonthGroupData(rec.id);
        }
      }
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return params[0].name + ' : ' + params[0].value
          }
        },
        grid: {
          left: 0,
          top: 0,
          right:50,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: false,
        },
        yAxis: {
            type: 'category',
            data :[0,1,2,3,4,5,6,7,8,9],
            show: false,
            inverse: true,
        },
        series: [{
          name: 'barChart',
          barWidth: 30,
          type: 'bar',
          zlevel: 2,
          label: {
            normal: {
              show: true,
              position: 'insideRight',
              offset: [25, 2],
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
          itemStyle: {
            normal: {
              show: true,
              // 设置每个圆柱的渐变色填充
              color: function (params) {
                if (params.dataIndex === 0) {
                  return {
                    type: 'linear',
                    colorStops: [{
                      offset: 0,
                      color: 'rgba(251,104,111,.3)'
                    }, {
                      offset: 1,
                      color: 'rgba(251,104,111,1)'
                    }],
                  };
                }
                if (params.dataIndex === 2) {
                  return {
                    type: 'linear',
                    colorStops: [{
                      offset: 0,
                      color: 'rgba(42,222,176,.3)'
                    }, {
                      offset: 1,
                      color: 'rgba(42,222,176,1)'
                    }],
                  };
                }
                if (params.dataIndex === 1) {
                  return {
                    type: 'linear',
                    colorStops: [{
                      offset: 0,
                      color: 'rgba(243,230,115,.3)'
                    }, {
                      offset: 1,
                      color: 'rgb(243,230,115)'
                    }],
                  };
                }
                return {
                  type: 'linear',
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(0,162,255,.5)'
                  }, {
                    offset: 1,
                    color: 'rgb(0,162,255)'
                  }],
                };
              },
              borderWidth: 0,
              borderColor: '#333',
              barGap: '20%',
            }
          },
          data: data
        }]
      };
        this.secleft1chart = echarts.init(this.$refs.secleft1chart);
        this.secleft1chart.setOption(option);
        this.secleft1chart.on('click', (param)=> {
            this.tionName = param.data.name;
            this.queryZoneGroupData(param.data.id); //地市分组
            this.queryByTwoAllData(param.data.id);
            this.queryByMonthGroupData(param.data.id);
      })
    },
    initsecleft2chart() {
      let chartData =  [];
      for (let i = 0, len = this.contradictionThreeDataTop5.length; i < len; i++) {
        let rec =  this.contradictionThreeDataTop5[i];
        chartData.push({
            name: rec.name,
            value: rec.num
          })
      }
      let arrValue = this.getArrayValue(chartData, "value");
      let sumValue = eval(arrValue.join('+'));
      let optionData = this.getData(chartData, sumValue);
      let option = {
        // backgroundColor: '#000',
        legend: {
          show: false,
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{a}<br>{b}:{c}({d}%)"
        },
        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#093b5c' // 0% 处的颜色
            }, {
              offset: 1, color: '#1eadd9' // 100% 处的颜色
            }],
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#485341' // 0% 处的颜色
            }, {
              offset: 1, color: '#e3d354' // 100% 处的颜色
            }],
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#0d6859' // 0% 处的颜色
            }, {
              offset: 1, color: '#1ad385' // 100% 处的颜色
            }],
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#6e3b50' // 0% 处的颜色
            }, {
              offset: 1, color: '#f8676e' // 100% 处的颜色
            }],
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#0c2f6f' // 0% 处的颜色
            }, {
              offset: 1, color: '#1e5cd5' // 100% 处的颜色
            }],
          },
        ],
        xAxis: [{
          show: false
        }],
        series: optionData.series
      };
      echarts.init(this.$refs.secleft2chart).setOption(option)
    },
    getArrayValue(array, key) {
      var key = key || "value";
      var res = [];
      if (array) {
        array.forEach(function (t) {
          res.push(t[key]);
        });
      }
      return res;
    },
    getData(data, sumValue) {
      var res = {
        series: [],
        yAxis: []
      };
      for (let i = 0; i < data.length; i++) {
        res.series.push({
          name: '',
          type: 'pie',
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          width: '360',
          height: '360',
          radius: [75 - i * 15 + '%', 68 - i * 15 + '%'],
          center: ["50%", "40%"],
          Gap: '1%',
          label: {
            show: false
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false
            },
            borderWidth: 5,
            borderRadius: '50%',
          },
          data: [{
            value: data[i].value,
            name: data[i].name
          }, {
            value: sumValue - data[i].value,
            name: '',
            radius: [180, 180],
            itemStyle: {
              color: "rgba(0,0,0,0)",
              borderWidth: 0,
            },
            tooltip: {
              show: false
            },
            hoverAnimation: false
          }]
        });
        res.yAxis.push((data[i].value / sumValue * 100).toFixed(2) + "%");
      }
      return res;
    },
    initsection1Chart() {
      var img = interviewchart;
      var total = 0;
      var data = [];
      var scale = 1;
      var rich = {
        yellow: {
          color: "#ebda55",
          fontSize: 62 * scale,
          align: 'left',
          fontFamily: 'DSfont'
        },
        total: {
          color: "#ffc72b",
          fontSize: 46 * scale,
          align: 'left'
        },
        white: {
          color: "#bbbbbb",
          align: 'left',
          fontSize: 24 * scale,
        },
        blue: {
          color: '#34d0ff',
          fontSize: 22 * scale,
          align: 'left'
        },
        hr: {
          borderColor: '#0b5263',
          width: '100%',
          borderWidth: 1,
          height: 0,
        }
      };

      for (var i = 0; i < this.contradictionTwoDataTop10.length; i++) {
        total += this.contradictionTwoDataTop10[i].num;
        data.push({
          value: this.contradictionTwoDataTop10[i].num,
          name: this.contradictionTwoDataTop10[i].name,
          itemStyle: {
            normal: {
              borderWidth: 5,
            }
          }
        }, {
          value: 2,
          name: '',
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 0
            }
          }
        });
      }
      var seriesOption = [{
        name: '',
        type: 'pie',
        clockWise: false,
        radius: [135, 165],
        hoverAnimation: false,
        label: {
          show: true,
          position: 'outside',
          color: '#ddd',
          formatter: function (params) {
            var percent = 0;
            if (total > 0) {
              percent = ((params.value / total) * 100).toFixed(1);
            }
            if (params.name !== '') {
              return '{white|' + params.name + '}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
            } else {
              return '';
            }
          },
          rich: rich
        },
        itemStyle: {
          normal: {
            labelLine: {
              length: 50,
              length2: 150,
              show: true,
                smooth: true,
                color: '#00ffff'
            }
          },
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 100
        },
        data: data
      }];
      var option = {
        color: ['#46fdff', '#36ffcc', '#06ffa1', '#0080ff', '#1eabfb', '#dff3ff', '#74cbff', '#14cbff', '#15FF2E'],
        title: {
          text: total,
          top: '38%',
          textAlign: "center",
          left: "50%",
          textStyle: {
            color: '#ebda55',
            fontSize: 60,
            fontWeight: '500',
            fontFamily: 'DSfont'
          },
          subtext: this.tionName+'受理量',
          subtextStyle: {
            textAlign: "center",
            color: '#ffffff',
            fontSize: 22
          }
        },
        graphic: {
          elements: [{
            type: "image",
            z: 3,
            style: {
              image: img,
              width: 260,
              height: 260
            },
            left: 'center',
            top: 'center',
            position: [100, 100]
          }]
        },
        tooltip: {
          show: false
        },
        toolbox: {
          show: false
        },
        series: seriesOption
      };
      echarts.init(this.$refs.section1Chart).setOption(option);
    },
    initsection2Chart() {
      let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0, len = this.contradictionMonthData.length; i < len; i++) {
        let rec =  this.contradictionMonthData[i];
        let index = parseInt(rec.mon) - 1;
        data[index] = rec.num;
      }
      let option = {
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLine: {
            lineStyle: {
              color: '#228ea8'
            },
            nameTextStyle: '#20c2f0'
          },
          axisLabel:{
            fontSize:20,
            color : '#34d0ff'
          }
        },
        grid: {
          top: 10,
          left: 10,
          right: 30,
          bottom: 30,
        },
        yAxis: {
          type: 'value',
          show :false,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba( 33, 142, 168, 0.302 )'
            }
          },
          axisLabel:{
            fontSize:30,
            color : '#34d0ff'
          }
        },
        series: [
          {
            data: data,
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: 'rgb(0,212,193)'},
                {offset: 1, color: 'rgba(98,117,209,0)'}
              ])
            },
              label: {
                  show: true,
                  position: 'insideTop',
                  color: '#fff',
                  fontSize: 22,
                  formatter: function (params) {
                      // 如果数据为零，则不显示标签，或者可以设置为一个空字符串
                      return params.value === 0 ? '' : params.value;
                  },
                  // 或者调整标签的偏移量，避免重叠
                  offset: [0, 0]  // 如果需要微调位置可以设置偏移量
              }
          }
        ]
      };
      echarts.init(this.$refs.section2Chart).setOption(option);
    },
    initbarChartOption(yAxisdata,seriesdata){
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function(params) {
            return params[0].name  + ' : ' + params[0].value
          }
        },
        grid: {
          left: '0',
          top: '1%',
          right: 30,
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: false,
          position: 'top',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#34d0ff',
            }
          },
          splitLine: {
            show: false
          },
        },
        yAxis: [{
          axisLabel: {
              show: false,
            fontSize: 21  // 设置字体大小为20
          },
          type: 'category',
          axisTick: {
            show: false,
            alignWithLabel: false,
            length: 5,

          },
          "splitLine": { //网格线
            "show": false
          },
          inverse: 'true', //排序
          axisLine: {
            show: false,
            lineStyle: {
              color: '#34d0ff',
              fontSize:22
            }
          },
          data: yAxisdata
        },
        ],
        series: [{
          name: 'barChart',
          barWidth: 8,
          type: 'bar',
          zlevel: 2,
          itemStyle: {
            normal: {
              show: true,
              // 设置每个圆柱的渐变色填充
              color: function(params) {
                return {
                  type: 'linear',
                  colorStops: [{
                    offset: 0,
                    color: '#09476d'
                  }, {
                    offset: 1,
                    color: '#4bf3ff'
                  }],
                };
              },
              barBorderRadius: 10,
              borderWidth: 0,
              borderColor: '#333',
            }
          },
          emphasis: {
            zlevel: 2,
            itemStyle: {
              color: function(params) {
                return {
                  type: 'linear',
                  colorStops: [{
                    offset: 0,
                    color: '#09476d'
                  }, {
                    offset: 1,
                    color: '#4bf3ff'
                  }],
                };
              },
            },
          },
          barGap: '0%',
          barCategoryGap: '50%',
          label: {
            normal: {
              show: true,
              position: 'insideRight',
              offset: [20, 2],
              formatter: '{c}',
              textStyle: {
                align: 'center',
                baseline: 'middle',
                fontSize: 18,
                fontWeight: '400',
                color: '#8efafd',
                textShadowColor: '#000',
                textShadowBlur: '0',
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
              }
            },
          },
          data: seriesdata
        },
        ]
      };
    },
    initsectlistChart(index){
      let nameData = [];
      let seriesData = [];
      if(1 == index){
          for (let i = 0, len = this.zoneListData1.length; i < len; i++) {
          let rec =  this.zoneListData1[i];
          nameData.push(rec.name);
          seriesData.push(rec.num);
        }
        echarts.init(this.$refs.sectlistChart1).setOption(this.initbarChartOption(nameData,seriesData));
      }else if(2 == index){
          for (let i = 0, len = this.zoneListData2.length; i < len; i++) {
          let rec =  this.zoneListData2[i];
          nameData.push(rec.name);
          seriesData.push(rec.num);
        }
        echarts.init(this.$refs.sectlistChart2).setOption(this.initbarChartOption(nameData,seriesData));
      }else if(3 == index){
          for (let i = 0, len = this.zoneListData3.length; i < len; i++) {
          let rec =  this.zoneListData3[i];
          nameData.push(rec.name);
          seriesData.push(rec.num);
        }
        echarts.init(this.$refs.sectlistChart3).setOption(this.initbarChartOption(nameData,seriesData));
      }else if(4 == index){
          for (let i = 0, len = this.zoneListData4.length; i < len; i++) {
          let rec =  this.zoneListData4[i];
          nameData.push(rec.name);
          seriesData.push(rec.num);
        }
        echarts.init(this.$refs.sectlistChart4).setOption(this.initbarChartOption(nameData,seriesData));
      }else if(5 == index){
          for (let i = 0, len = this.zoneListData5.length; i < len; i++) {
          let rec =  this.zoneListData5[i];
          nameData.push(rec.name);
          seriesData.push(rec.num);
        }
        echarts.init(this.$refs.secrtlistChart1).setOption(this.initbarChartOption(nameData,seriesData));
      }else if(6 == index){
          for (let i = 0, len = this.zoneListData6.length; i < len; i++) {
          let rec =  this.zoneListData6[i];
          nameData.push(rec.name);
          seriesData.push(rec.num);
        }
        echarts.init(this.$refs.secrtlistChart2).setOption(this.initbarChartOption(nameData,seriesData));
      }else if(7 == index){
          for (let i = 0, len = this.zoneListData7.length; i < len; i++) {
              let rec =  this.zoneListData6[i];
              nameData.push(rec.name);
              seriesData.push(rec.num);
          }
          echarts.init(this.$refs.secrtlistChart3).setOption(this.initbarChartOption(nameData,seriesData));
      }else if(8 == index){
          for (let i = 0, len = this.zoneListData8.length; i < len; i++) {
              let rec =  this.zoneListData6[i];
              nameData.push(rec.name);
              seriesData.push(rec.num);
          }
          echarts.init(this.$refs.secrtlistChart4).setOption(this.initbarChartOption(nameData,seriesData));
      }else if(9 == index){
          for (let i = 0, len = this.zoneListData9.length; i < len; i++) {
              let rec =  this.zoneListData6[i];
              nameData.push(rec.name);
              seriesData.push(rec.num);
          }
          echarts.init(this.$refs.secrtlistChart5).setOption(this.initbarChartOption(nameData,seriesData));
      }
    },
    initsecrt0Chart() {
      let zoneNameData = [];
      let seriesData = [];
      for (let i = 0, len = this.zoneListData.length; i < len; i++) {
        let rec =  this.zoneListData[i];
        zoneNameData.push(rec.name);
        seriesData.push(rec.num);
      }
      let option = {
        xAxis: {
          type: 'category',
          data: zoneNameData,
          axisLine: {
            lineStyle: {
              color: '#228ea8' //
            },
            nameTextStyle: '#20c2f0'
          },
          axisLabel:{
            fontSize:20,
            color : '#34d0ff',
            rotate: 60, // 旋转角度
            interval: 0 // 显示所有标签，可调整或使用 'auto'
          }
        },
        grid: {
          top: 40,
          left: 60,
          right: 10,
          bottom: 100,
        },
        yAxis: {
          type: 'value',
          // show :false
          axisLabel: {
            formatter: '{value}',
            fontSize:20,
            color : '#34d0ff',
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
                  data: seriesData,
                  type: 'bar',
                  barWidth: 30,
                  label: {
                      show: true,
                      position: 'top',
                      color: '#ffffff',
                      fontSize: 18,
                      fontWeight: 'bold'
                  },
                  itemStyle: {
                      color: function (params) {
                          if (params.dataIndex % 2 === 0) {
                              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                  {offset: 0, color: 'rgb(0,162,255)'},
                                  {offset: 1, color: 'rgba(17,102,255,0)'}
                              ])
                          } else {
                              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                  {offset: 0, color: 'rgb(0,212,193)'},
                                  {offset: 1, color: 'rgba(98,117,209,0)'}
                              ])
                          }
                      }
                  }
              }
          ]

      };
      echarts.init(this.$refs.secrt0Chart).setOption(option);
    },
    initsecleft3Chart(){
        if (this.echartsInstance) {
            this.echartsInstance.dispose();
        }
      var chartdata = [];
      let size = 100;
      for (let i = 0, len = this.contradictionDataTop8.length; i < len; i++) {
        let rec =  this.contradictionDataTop8[i];
        size = (size-8);
        chartdata.push({name:rec.name,sum:rec.num,size:size});
      }
      var data=[]
      var img = [img1,img2,img3,img4,]
      var color = ['#ffbb17','#ff5858','#309dff','#00f6ff',]
      var links = []; // 用于连接气泡和"轴"节点
        chartdata.sort((a, b) => b.size - a.size); // 从大到小排序

        function computeFontSize(symbolSize, minSize, maxSize) {
            const minFontSize = 22;
            const maxFontSize = 26;

            // 根据气泡大小，计算在14到18之间的线性插值
            return minFontSize + (maxFontSize - minFontSize) * (symbolSize - minSize) / (maxSize - minSize);
        }

      chartdata.map((item,index)=>{
          var mathnum = Math.floor(Math.random() * 4);
          // 寻找最小和最大的气泡大小
          const minSize = Math.min(...chartdata.map(item => item.size));
          const maxSize = Math.max(...chartdata.map(item => item.size));
          let fontSize = computeFontSize(item.size, minSize, maxSize);
          fontSize = Math.min(Math.max(fontSize, 22), 26);  // 确保大小在16-20之间

          let xPosition;
          let yPosition = 0; // 初始化为0

          if(index === 0) { // 最大的气泡在中间
              xPosition = 0;
              yPosition = -25;  // 调整这个值来改变"偏上"的程度
          } else if (index % 4 === 1) { // 左边的第一个
              xPosition = -Math.ceil(index / 2) * 100;
              yPosition = 25;
          } else if (index % 4 === 2) { // 右边的第一个
              xPosition = Math.ceil(index / 2) * 100;
              yPosition = 25;
          } else if (index % 4 === 3) { // 左边的第二个
              xPosition = -Math.ceil(index / 2) * 100;
              yPosition = -25;
          } else { // 右边的第二个
              xPosition = Math.ceil(index / 2) * 100;
              yPosition = -25;
          }

          data.push(
          {
            name:item.name,
            value: index,
            x: xPosition,
            y: yPosition,
            fixed : true,
            symbolSize: item.size * 1.5,
            symbol: 'image://' + img[mathnum],
            draggable: false,
            label: {
              normal: {
                textStyle: {
                  fontSize: fontSize,
                  color: color[mathnum],
                },
              },
            },

          },
        );
        links.push({
          source: 'axis_node_' + index,
          target: chartdata[index].name
        });
      })

      var option = {
        animationDurationUpdate: function (idx) {
          return idx * 100;
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params, ticket, callback) {
            return params.data.tips || params.name;
          },
        },
          grid: {
              left: 150,
              top: 0,
              right:50,
              bottom: 0,
          },
        animationEasingUpdate: 'bounceIn',
        itemStyle: {
          // color: 'red',
        },
        cursor: 'pointer',
        series: [
          {
            type: 'graph',
            layout: 'force',
            cursor: 'pointer',
            force: {
              repulsion: 400,
              edgeLength: 100,
              gravity: 0.5,    // 增加此值以使气泡更倾向于留在中心
            },
            roam: false,
            label: {
              normal: {
                show: true,
              },
            },

            data,
            links: links, // 添加这个属性以连接气泡和"轴"节点
          },
        ],
      };
      this.echartsInstance = echarts.init(this.$refs.secleft3Chart);
        this.echartsInstance.setOption(option);
    }
  },
  computed: {
    visibleIndexes() {
        // 返回当前索引和下一个索引作为可见的
        return [
            this.currentIndex,
            (this.currentIndex + 1) % 5 // 确保索引是循环的
        ];
    }
  },
    beforeDestroy() {
        clearInterval(this.intervalId); // 清除定时器
    },
}
</script>

<style scoped lang="scss">
p {
  margin: 0
}

.colorred {
  color: #fb686f
}

.colorgreen {
  color: #1ad485
}

.coloryel {
  color: #ebda55
}

$ft-yel: #ebda55;
//$ft-color: #1aa1c5;
$ft-color: #34d0ff;
@font-face {
  font-family: "DSfont";
  src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
}

$ye-color: #ebda55;
$sz-font-family: "DSfont";

.home {
  .cont {
    .sectionleft {

      .secleft1{
          margin-top: 70px;
        .secleft1list {
          display: inline-block;
          width: 180px;
          overflow: hidden;

          p {
            color: $ft-color;
            line-height: 51px;
            height: 51px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
              display: inline-block;
              width: 30px;
              height: 30px;
              color: white;
              background: $ft-color;
              text-align: center;
              line-height: 30px;
              margin-right: 15px;
            }
          }

          p:first-child {
            span {
              background: linear-gradient(90deg, #47314a 0%, #f8676e 100%);
            }
          }

          p:nth-child(2) {
            span {
              background: linear-gradient(90deg, #546962 0%, #f3e674 100%);
            }
          }

          p:nth-child(3) {
            span {
              background: linear-gradient(90deg, #186673 0%, #23ae8d 100%);
            }
          }
        }

        .secleft1chart {
          display: inline-block;
          width: 788px;
          vertical-align: top;
          height: 520px;
        }
      }
      .secleft2{
        .secleft2chart{
          width: 360px;
          height: 360px;
          display: inline-block;
        }
        .secleft2list{
          display: inline-block;
          width: 608px;
          vertical-align: top;
          color: $ft-color;
          p{
            position: relative;
            width: 304px;
            display: inline-block;
            height: 60px;
            line-height: 60px;
            span{
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: inline-block;
            }
            span:first-child {
                width: 204px;
            }
            span:last-child{
              width: 100px;
              text-align: right;
              padding-right: 50px;
            }
            :after{
              content: "";
              position: absolute;
              top: 24px;
              left: -20px;
              width: 9px;
              height: 9px;
              background: #1eadd9;
            }
          }
          p:nth-child(2) :after{background: #e3d354;}
          p:nth-child(3) :after{background: #1ad385;}
          p:nth-child(4) :after{background: #f8676e;}
          p:nth-child(5) :after{background: #1e5cd5;}
        }
        .secleft3{
          margin-top: 30px;
          .secleft3list{
            height: 370px;
            position: relative;
            div{
              position: absolute;
              background-size: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
            }
            div:nth-child(1){
              top: 18px;
              left: 15px;
              background-image: url("../../../assets/images/contr3.png");
              width: 109px;
              height: 109px;
              font-size: 22px;
              color: #00f7fe;
              padding: 0 30px;
            }div:nth-child(2){
            top: 35px;
            left: 175px;
            background-image: url("../../../assets/images/contr1.png");
            background-size: 100%;
            width: 35px;
            height: 35px;
            }div:nth-child(3){

            }div:nth-child(4){

            }
          }
        }

      }
    }
    .section {
        width: 1500px;
      margin: 155px 100px 0 100px;
      display: inline-block;
      vertical-align: top;
      .section-1{
        height: 520px;
      }
      .section-2{
        margin-top: 35px;
        .section2Chart{
          height: 360px;
          margin-top: 5px;
        }
      }
      .section-3{
        height: 370px;
        ul{
            padding: 0;
            display: grid;
            grid-template-columns: repeat(4, 1fr); /* 创建四列，每列宽度相等 */
            grid-gap: 10px; /* 设置列与列之间的间隙为10px */
          li{
            list-style: none;
            color: white;
            font-size: 32px;
            display: inline-block;
            //width: 25%;
                div{
                  height: 370px;
                    display: inline-block;
                    width: 50%;
                    vertical-align: top;
                }
              .selep{
                  padding-top: 28px;
                  width: 50%;
              }
              .selep p {
                  text-align: justify;
                  text-justify: inter-word;
                  margin: 0; /* 移除默认的段落间距 */
                  line-height: 84px;
                  height: 84px;
                  font-size: 24px;
                  color: #34d0ff;
                  padding-right: 10px;
                  overflow: hidden;
              }

              /* 伪元素技巧用于单行文本的两端对齐 */
              .selep p::after {
                  content: '';
                  display: inline-block;
                  width: 100%;
              }
          }

        }
      }
    }
    .sectionrt{
        width: 968px;
      display: inline-block;
      vertical-align: top;
      .secrt-nav{
        height: 47px;
          margin-bottom: 80px;
        ul {
          text-align: right;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-content: center;
          justify-content: flex-end;
          align-items: center;
          li {
            font-size: 24px;
            /* margin: 0px; */
            padding: 0 22px;
            color: $ft-color;
            list-style: none;
            cursor: pointer;
          }
          li:first-child {
            border-left: 0;
          }
        }
      }
      .secrt-0{
        margin-top: 35px;
        .secrt-0chart{
          height: 520px;
        }
      }
      .secrt-1{
        .secrt-1chart{
          .seclist {
            height: 180px;
            width: 469px;
            display: inline-block;
              cursor: pointer;
            p {
              color: rgb(32, 194, 243);
              height: 60px;
              line-height: 60px;
              padding: 0 10px;
              span {
                color: $ft-yel;
              }

              span:last-child {
                color: rgb(32, 194, 243);
                float: right;
              }
            }
            p:last-child{
              background: rgb(96,98,102,10%);
            }
            p:first-child {
              border-radius: 2px;
              background-image: -webkit-linear-gradient(0deg, rgba(6, 178, 227, 0.3098) 0%, rgba(4, 186, 237, 0.302) 100%);
            }
          }
          .seclist:nth-child(odd){
            margin-right: 30px;
          }
        }
      }
      .secrt-2{
       display: flex;
       justify-content: space-between;
        .secrtlist{
          width: 450px;
          display: none;
          color: white;
          font-size: 32px;
            div{
                display: inline-block;
                width: 50%;
                vertical-align: top;
            }
            .selep{
                padding-top: 28px;
            }
            .selep p {
                text-align: justify;
                text-justify: inter-word;
                margin: 0; /* 移除默认的段落间距 */
                line-height: 84px;
                height: 84px;
                font-size: 24px;
                color: #34d0ff;
                padding-right: 10px;
                overflow: hidden;
            }

            /* 伪元素技巧用于单行文本的两端对齐 */
            .selep p::after {
                content: '';
                display: inline-block;
                width: 100%;
            }
          .secrtlistChart{
            height: 370px;
          }
        }
        //.visible:first-child{margin-right: 30px}
          .secrtlist.visible {
              display: inline-block; // 显示
          }
      }
    }
  }
}
</style>
<style lang="scss">

.home .contradvis{
    margin-top: 15vh !important;
    border: 1px solid rgb( 18, 121, 203 );
    border-top: 5px solid #20c2f3;
    background: none;
    background-image: linear-gradient( 180deg, rgba(18,121,203,.7) 0%, rgba(0,39,83,.7) 100%);
    .el-dialog__header{
        height: 70px;
        background-image: linear-gradient(to right, #033d6b, #076aa2);
        .el-dialog__title{
            font-size: 34px;
            line-height: 30px;
            color: white;
            //font-weight: bold;
            padding-left: 15px;
            border-left: 7px solid #20c2f3;
        }
        .el-dialog__headerbtn{
            top: 0;
            right: -50px;
            font-size: 40px;
            border: 1px solid rgb( 18, 121, 203 );
            line-height: 30px;
            background-color: rgba( 18, 121, 203, 0.149 );
            .el-dialog__close{
                color: #1279cb;
            }
        }
    }

    //.content::-webkit-scrollbar {
    //    width: 10px;
    //    height: 10px;
    //    background-color: #1379cb;
    //}

    ///* 滚动条滑块 */
    //.content::-webkit-scrollbar-thumb {
    //    background-color: #1379cb;
    //    border-radius: 0;
    //}
    //.content{
    //    height: 380px;
    //    overflow: auto;
    //}
    ///* 滚动条轨道 */
    //.content::-webkit-scrollbar-track {
    //    background-color: #122a4e;
    //    border-radius: 0;
    //}
    .el-dialog__body{
        padding: 30px 10px;
            .el-table, .el-table .el-table__header-wrapper th , .el-table tr {
                background: none;
                color: #1aa1c5;
                border-bottom: 0;
            }
        .el-table .el-table__header-wrapper th{
            color: white;
            font-size: 24px;
            text-align: center;
            font-weight: 400;
        }
        .el-table__header-wrapper{
                background: none;
            }
            .el-table td.el-table__cell{
                border-bottom: 0;
                line-height: 30px;
                text-align: center;
            }
            .el-table{
                font-size: 20px;
                .el-table::before{
                    display: none;
                }
                .cellcolor1{
                    color: #ebda55;
                }.cellcolor2{
                     color: #1ad485;
                 }
                .el-table__body-wrapper{

                }
            }
        .el-table::before{
            display: none;
        }
        .pagination-container{
            background: none;
            span{
                color: white;
            }
        }
    }
}
</style>

