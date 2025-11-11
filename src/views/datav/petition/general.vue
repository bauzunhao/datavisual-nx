<template>
    <div class="app-container home">
        <datavhead></datavhead>

        <div class="cont">

            <div class="sectionleft">
                <div class="sec1-nav ">
<!--                    <router-link to="/"><img src="../../../assets/images/general-home.png" alt=""></router-link>-->
<!--                    <ul>-->
<!--                        <li @click="openDialong()"><span>导航</span></li>-->
<!--                        <li><router-link to="/datav/general"><span>信访概览</span></router-link></li>-->
<!--                        <li><router-link to="/datav/transact"><span>办理情况</span></router-link></li>-->
<!--                        <li><router-link to="/datav/perfmon"><span>绩效分析</span></router-link></li>-->
<!--                        <li><router-link to="/datav/contradiction"><span>突出矛盾</span></router-link></li>-->
<!--                    </ul>-->
                </div>
                <div class="sec1-min">

                    <div class="min1 mabt70">
                        <div class="min1-0" @click="openfjfDialong(1)">
                            <div class="min1-01" style="cursor: pointer">
                                <p>
                                    <span class="ft67">{{overview.jjfNum}}</span>
                                    <span class="ft24">进京访</span>
                                </p>
                                <p>
                                    <span class="ft67">{{overview.bwfNum}}</span>
                                    <span class="ft24">部委访</span>
                                </p>
                            </div>
                            <div class="min1-02 ft26">
                                同比: {{overview.jjfYOY}}
                            </div>
                        </div>
                        <div class="min1-0 min1-1" >
                            <div class="min1-01">
                                <p>
                                    <span class="ft67">{{overview.fqfNum}}</span>
                                    <span class="ft24">赴区访</span>
                                </p>
                            </div>
                            <div class="min1-02 ft26">
                                同比: {{overview.fqfYOY}}
                            </div>
                        </div>
                        <div class="min1-0 min1-1 min1-2">
                            <div class="min1-01">
                                <p>
                                    <span class="ft67">{{overview.qdsbjlfNum}}</span>
                                    <span class="ft24">全地级市来访</span>
                                </p>
                            </div>
                            <div class="min1-02 ft26">
                                同比: {{overview.qdsbjlfYOY}}
                            </div>
                        </div>
                        <div class="min1-0 min1-1 min1-2">
                            <div class="min1-01">
                                <p>
                                    <span style="color: #fb686f" class="ft67">{{overview.xqlfNum}}</span>
                                    <span class="ft24">县区来访</span>
                                </p>
                            </div>
                            <div class="min1-02 ft26">
                                同比: {{overview.xqlfYOY}}
                            </div>
                        </div>
                    </div>

                    <div class="min2 mabt70">
                        <div class="min2-0">
                            <h3 >信访事项总量</h3>
                            <div class="min2-0chart" ref="minchart"></div>
                            <div class="charttip ft24">
                                <p>来信 <span>{{overview.lxNum}}</span> 占比 {{this.overview.lxzb}}%</p>
                                <p>来访 <span>{{overview.lfNum}}</span> 占比 {{this.overview.lfzb}}%</p>
                                <p>网投 <span>{{overview.wsNum}}</span> 占比 {{this.overview.wszb}}%</p>
                            </div>
                            <div class="charttip1">
                                <p class="ft30"><span class="ft67">{{overview.total}}</span>件次</p>
                                <p class="ft24">环比：{{overview.totalQOQ}}</p>
                            </div>
                        </div>
                        <div class="min2-1">
                            <div class="min2-10">
                                <h3>四级总量分布</h3>
                                <div class="min2-10chart" ref="min2_10chart">
                                </div>
                            </div>
                            <div class="min2-11">
                                <h3>办理动态</h3>
                                <div class="min2-11tip">
                                    <p class="ft24">初件: <span class="ft40">{{overview.firstNum}}</span></p>
                                    <p class="ft24">重件: <span class="ft40">{{overview.repeatNum}}</span></p>
                                </div>
                                <div style="overflow: hidden;display: inline-block;vertical-align: top;">
                                    <div class="min2-11chart" ref="min2_11chart">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="min3 mabt70">
                        <h3>三率</h3>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div class="min3li">
                                    <p class="ft26">及时受理率</p>
                                    <p class="ft40">{{overview.xfbmsll}}</p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="min3li min3li-1">
                                    <p class="ft26">按期答复率</p>
                                    <p class="ft40">{{overview.aqdfl}}</p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="min3li min3li-2">
                                    <p class="ft26">满意率</p>
                                    <p class="ft40">{{overview.myl}}</p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="min4">
                        <h3 style="margin-bottom: 5px">{{timeMarkTitles.timeMarkName}}</h3>
                        <div class="min4chart" ref="min4chart">
                        </div>
                    </div>

                </div>

            </div>

            <div class="section">

                <div class="sihead">
                    <div class="headli">
                        <img src="../../../assets/images/sihead1.png">
                        <div>
                            <p class="ft88">{{overview.toDayNum}}</p>
                            <p class="ft60">今日登记</p>
                        </div>
                    </div>
                    <div class="headli">
                        <img src="../../../assets/images/sihead2.png">
                        <div>
                            <p class="ft88">{{overview.accumulateEndNum}}</p>
                            <p class="ft60">累计办结</p>
                        </div>
                    </div>
                    <div class="headli">
                        <img src="../../../assets/images/sihead3.png">
                        <div>
                            <p class="ft80">{{overview.accumulateTotal}}</p>
                            <p class="ft60">累计总量</p>
                        </div>
                    </div>
                </div>

                <div class="simap">
                    <genpie-chart ref="child" v-if="tableData" :message="tableData" :height="1050" :viewType="viewName"></genpie-chart>
                    <div class="simap_total">
                        <p class="ft26">{{timeMarkTitles.timeMarkTotalName}}</p>
                        <p class="ft83">{{overview.total}}</p>
                    </div>
                    <div class="simap_tip">
                        <div class="simap_tipli" @click="openfjfDialong(2)">
                            <p>{{ overview.maptip.yy }}</p>
                            <p>扬言</p>
                        </div>
                        <div class="simap_tipli" @click="openfjfDialong(3)">
                            <p>{{ overview.maptip.jtf }}</p>
                            <p>集体访</p>
                        </div>
                        <div class="simap_tipli" @click="openfjfDialong(1)">
                            <p>{{ overview.maptip.jjf }}</p>
                            <p>进京访</p>
                        </div>
                    </div>
                </div>
                <div class="sifooter">
                    <el-row >
                        <el-col :span="12">
                            <div class="sifooter-lt">
                                <h3 style="margin-bottom: 5px">{{timeMarkTitles.timeMarkName2}}</h3>
                                <div class="footerchart" ref="footerchart">
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="sifooter-rt">
                                <h3 style="margin-bottom: 5px">{{timeMarkTitles.timeMarkName3}}</h3>
                                <div class="footerchart" ref="footerchart1">
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>

            <div class="sectionrt">
                <div class="secrt-nav ft30">
                    <ul>
                        <li @click="queryTimeMark(1)"><span :style="{ 'color': queryParams.params.timeMark===1? '#fff':''  }">今日</span></li>
                        <li @click="queryTimeMark(4)"><span :style="{ 'color': queryParams.params.timeMark===4? '#fff':''  }">昨天</span></li>
                        <li @click="queryTimeMark(2)"><span :style="{ 'color': queryParams.params.timeMark===2? '#fff':''  }">本月</span></li>
                        <li @click="queryTimeMark(5)"><span :style="{ 'color': queryParams.params.timeMark===5? '#fff':''  }">上月</span></li>
                        <li @click="queryTimeMark(3)"><span :style="{ 'color': queryParams.params.timeMark===3? '#fff':''  }">本年</span></li>
                        <li @click="openmorevis()"><span>更多></span></li>
                    </ul>
                </div>
                <div  class="secrt-0 mabt70">
                    <div class="secrt-0li">
                        <div class="secrt-0chart" ref="secrt0chart"></div>
                        <div>
                            <p class="ft30">5-10人</p>
                            <p class="ft30">集体访</p>
                        </div>
                    </div>
                    <div class="secrt-0li">
                        <div class="secrt-0chart" ref="secrt1chart"></div>
                        <div>
                            <p class="ft30">10人以上</p>
                            <p class="ft30">集体访</p>
                        </div>
                    </div>
                </div>
                <div class="secrt-1 mabt70">
                    <h3>突出矛盾</h3>
                    <div class="secrt-1chart" ref="ctdtchart"></div>
                    <div class="secrt-1li">
                        <ul >
                            <li v-for="contentData in contentTypeData ">
                                <p><span>{{contentData.name}}</span><span>{{contentData.value}}</span><span>{{contentData.ratio}}</span></p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="secrt-2 mabt70">
                    <h3>地市占比 <span style="float: right;font-size: 22px;cursor: pointer;" @click="propVisible=true;">更多></span></h3>
                    <div class="secrt-1chart">
                        <!-- 固定前三行 -->
                        <el-table
                            :data="fixedData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName"
                        >
                            <el-table-column
                                prop="name"
                                label="地区"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="num"
                                label="信访量"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="ratio"
                                label="占比">
                            </el-table-column>
                            <el-table-column
                                prop="yoy"
                                label="同比">
                            </el-table-column>
                        </el-table>

                        <!-- 循环滚动展示 -->
                        <el-table
                            :data="scrollingData"
                            style="width: 100%"
                            :show-header="false"
                        >
                            <el-table-column
                                prop="name"
                                label="地区"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="num"
                                label="信访量"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="ratio"
                                label="占比">
                            </el-table-column>
                            <el-table-column
                                prop="yoy"
                                label="同比">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="secrt-3">
                    <h3>四级登记总量对比</h3>
                    <div class="secrt-3li">
                        <div ref="secrtli1" class="secrt-3lichart"></div>
                        <div ref="secrtli2"  class="secrt-3lichart"></div>
                        <div ref="secrtli3"  class="secrt-3lichart"></div>
                        <div ref="secrtli4"  class="secrt-3lichart"></div>
                        <!--<div ref="secrtli5"  class="secrt-3lichart"></div>-->
                    </div>
                </div>
            </div>

        </div>

        <DialogNav ref="DialogNav"></DialogNav>

        <el-dialog
            :visible.sync="fjfVisible"
            width="1200px"
            custom-class="fjfdialog"
            :title="takeTitle"
            :before-close="handlefjfClose">
            <div class="content">
                <div class="conleft">
                    <div class="min1">
                        <div class="min1-0 min1-1" :style="2 == this.takeType ? 'width:545px;' : 'width:175px;'">
                            <div class="min1-01">
                                <p>
                                    <span v-if="1 == this.takeType">{{this.overview.bwfNum+this.overview.jjfNum}}</span>
                                    <span v-else>{{this.takeData.total}}</span>
                                </p>
                            </div>
                            <div class="min1-02">
                                总量
                            </div>
                        </div>
                    </div>
                    <div class="min2">
                        <p v-if="1 == this.takeType">初件:<span>{{this.overview.jjfFirstNum}}</span>件次，<span>{{this.overview.jjfFirstRcNum}}</span>人次</p>
                        <p v-if="1 == this.takeType">重件:<span>{{this.overview.jjfRepeatNum}}</span>件次，<span>{{this.overview.jjfRepeatRcNum}}</span>人次</p>
                        <p v-if="1 == this.takeType">部 委 走 访:<span>{{this.overview.bwfNum}}</span>件次，<span>{{this.overview.bwfRcNum}}</span>人次</p>
                        <p v-if="1 == this.takeType">国家信访局:<span>{{this.overview.jjfNum}}</span>件次，<span>{{this.overview.jjfRcNum}}</span>人次</p>
                        <!--<p v-if="2 == this.takeType">扬言集体访:<span>{{this.takeData.jtfNum}}</span></p>
                        <p v-if="2 == this.takeType">扬言进京访:<span>{{this.takeData.jjfNum}}</span></p>
                        <p v-if="2 == this.takeType">扬言采取极端访:<span>{{this.takeData.jdNum}}</span></p>-->
                        <p v-if="3 == this.takeType">初件:<span>{{this.takeData.firstNum}}</span>重件:<span>{{this.takeData.repeatNum}}</span></p>
                        <p v-if="3 == this.takeType">自治区:<span>{{this.takeData.qjNum}}</span></p>
                        <p v-if="3 == this.takeType">国家信访局:<span>{{this.takeData.gjNum}}</span></p>
                    </div>
                    <div class="min3">
                        <h3>热点</h3>
                        <div class="fjfletf" ref="fjfletfchart">
                        </div>
                        <div class="fjfletfli">
                            <ul >
                                <li v-for="contentData in jjfContentTypeData ">
                                    <p><span>{{contentData.name}}</span><span>{{contentData.value}}</span></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="conright">
                    <h3>分区数量</h3>
                    <div class="fjfrightchart" ref="fjfrightchart"></div>
                </div>
            </div>
        </el-dialog>

        <el-dialog
            :visible.sync="moreVisible"
            width="1200px"
            custom-class="fjfdialog"
            title="三年信访量趋势"
            :before-close="morevisClose">
            <div>
                <div class="morechart" ref="morechart"></div>
            </div>
        </el-dialog>

        <el-dialog
            :visible.sync="propVisible"
            width="1200px"
            custom-class="fjfdialog"
            title="地市占比详细"
            :before-close="morevisClose">
            <div class="secrt-2">
                <div class="secrt-1chart">
                    <el-table
                        :data="tableData"
                        style="width: 100%"
                        size="medium"
                        :row-class-name="tableRowClassName"
                    >
                        <el-table-column
                            prop="name"
                            label="地区"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="num"
                            label="信访量"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="ratio"
                            label="占比">
                        </el-table-column>
                        <el-table-column
                            prop="yoy"
                            label="同比">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import '@/assets/font/DS-DIGIB-2.TTF'
import * as echarts from 'echarts'
import { getStatisticsData,getZoneGroupData,getContentTypeOneData,getJjfIsRepeatData,getJjfZoneGroupData,
    getMonthGroupData,getThreatenData,getJointData,getTakeTypeContentTypeOneData } from "@/api/datav/petition/general"
import genpieChart from '@/views/datav/petition/genpieChart'
import datavhead from '@/components/DatavHead'
import DialogNav from '@/components/DialogNav'
export default {
    name: "DataV-General",
    data (){
        return {
            intervalId : null ,
            propVisible : false,
            viewName:'generalView',
            tableData: null,
            fixedData: [],  // 固定的前三行数据
            scrollingData: [],  // 滚动的三行数据
            startIndex: 3,  // 滚动部分开始的索引
            dialogTableVisible : true,
            moreVisible : false,
            fjfVisible : false,
            pieChart : [],
            overview:{
                jjfNum: 0,
                bwfNum: 0,
                jjfRcNum: 0,
                bwfRcNum: 0,
                fqfNum: 0,
                total: 0,
                qdsbjlfNum: 0,
                xqlfNum: 0,
                jjfYOY: 0,
                fqfYOY: 0,
                qdsbjlfYOY: 0,
                xqlfYOY: 0,
                totalQOQ: 0,
                endNum: 0,
                toDayNum: 0,
                firstNum: 0,
                repeatNum: 0,
                lxNum: 0,
                lfNum: 0,
                wsNum: 0,
                lxzb:0,
                lfzb:0,
                wszb:0,
                nationNum: 0,
                provinceNum: 0,
                cityNum: 0,
                countyNum: 0,
                townshipNum: 0,
                nationLxNum: 0,
                provinceLxNum: 0,
                cityLxNum: 0,
                countyLxNum: 0,
                townshipLxNum: 0,
                nationLfNum: 0,
                provinceLfNum: 0,
                cityLfNum: 0,
                countyLfNum: 0,
                townshipLfNum: 0,
                nationWsNum: 0,
                provinceWsNum: 0,
                cityWsNum: 0,
                countyWsNum: 0,
                townshipWsNum: 0,
                nationzb: 0,
                provincezb: 0,
                cityzb: 0,
                countyzb: 0,
                jointNum: 0,
                jointNum20: 0,
                accumulateTotal: 0,
                accumulateEndNum: 0,
                xfbmsll: 0,
                aqdfl: 0,
                myl: 0,

                maptip :{
                    jtf :0,
                    yy :0,
                    jjf : 0
                }


            },
            timeMarkTitles:{
                timeMarkName:"本年来信",
                timeMarkName2:"本年来访",
                timeMarkName3:"本年网投",
                timeMarkTotalName:"本年总量",
            },
            contentTypeData : [],
            jjfContentTypeData : [],
            jjfContentTypeNumData:[],
            jjfZoneData : [],
            // 查询参数
            queryParams: {
                params: {
                    timeMark:3
                },
            },
            jjfFirstNum: 0,
            jjfFirstRcNum: 0,
            jjfRepeatNum: 0,
            jjfRepeatRcNum: 0,
            takeType: 1,
            takeData: {
                total: 0,
                firstNum: 0,
                repeatNum: 0,
                gjNum: 0,
                qjNum: 0,
                jtfNum: 0,
                jdNum: 0,
                jjfNum: 0,
            },
            takeTitle: "赴京访",
        }
    },
    components : { 'genpieChart':genpieChart ,'DialogNav':DialogNav,'datavhead':datavhead },
    mounted() {
        this.queryTimeMark(3);

    },
    beforeDestroy() {
        this.$modal.closeLoading();
        clearInterval(this.intervalId); // 清除定时器
    },
    methods:{
        openDialong(){
            this.$refs.DialogNav.handldOpen();
        },
        openfjfDialong(type){
            this.takeType = type;
            if(1 == type){
                this.takeTitle = "赴京访";
                this.queryJjfZoneGroupData();
            }else {
                if (2 == type) {
                    this.takeTitle = "扬言";
                    this.queryThreatenData();
                } else if (3 == type) {
                    this.takeTitle = "集体访";
                    this.queryJointData();
                }
                this.queryTakeTypeZoneGroupData();
            }
            this.queryTakeTypeContentTypeOneData();
            this.fjfVisible=true;
        },
        handlefjfClose(done){
            done()
        },
        morevisClose(done){
            done()
        },
        openmorevis(){
            this.moreVisible = true;
            this.$nextTick(()=>{
                this.queryMonthGroupData();
            })
        },
        queryTimeMark(mark){
            // this.$modal.loading("");
            this.queryParams.params.timeMark = mark;
            if(1 == mark){
                this.timeMarkTitles.timeMarkName ="今日来信";
                this.timeMarkTitles.timeMarkName2 ="今日来访";
                this.timeMarkTitles.timeMarkName3 ="今日网投";
                this.timeMarkTitles.timeMarkTotalName="今日总量";
            }else if(4 == mark){
                this.timeMarkTitles.timeMarkName ="昨日来信";
                this.timeMarkTitles.timeMarkName2 ="昨日来访";
                this.timeMarkTitles.timeMarkName3 ="昨日网投";
                this.timeMarkTitles.timeMarkTotalName="昨日总量";
            }else if(2 == mark){
                this.timeMarkTitles.timeMarkName ="本月来信";
                this.timeMarkTitles.timeMarkName2 ="本月来访";
                this.timeMarkTitles.timeMarkName3 ="本月网投";
                this.timeMarkTitles.timeMarkTotalName="本月总量";
            }else if(5 == mark){
                this.timeMarkTitles.timeMarkName ="上月来信";
                this.timeMarkTitles.timeMarkName2 ="上月来访";
                this.timeMarkTitles.timeMarkName3 ="上月网投";
                this.timeMarkTitles.timeMarkTotalName="上月总量";
            }else if(3 == mark){
                this.timeMarkTitles.timeMarkName ="本年来信";
                this.timeMarkTitles.timeMarkName2 ="本年来访";
                this.timeMarkTitles.timeMarkName3 ="本年网投";
                this.timeMarkTitles.timeMarkTotalName="本年总量";
            }
            this.queryOverviewData(); //概览统计数据
            this.queryZoneGroupData(); //地市分组
            this.queryContentTypeOneData(); //内容分类一级前5
        },
        queryOverviewData(){
            getStatisticsData(this.queryParams).then(response => {
                this.pieChart=[];
                this.overview.lxzb = 0; //来信占比
                this.overview.lfzb = 0; //来访占比
                this.overview.wszb = 0; //网投占比
                this.overview.nationzb = 0; //国家级占比
                this.overview.provincezb = 0; //省级占比
                this.overview.cityzb = 0; //市级占比
                this.overview.countyzb = 0; //区县占比(包含乡镇)
                if (response.data) {
                    this.overview.jjfNum = response.data.jjfNum; //进京访总量
                    this.overview.bwfNum = response.data.bwfNum; //部委访总量
                    this.overview.jjfRcNum = response.data.jjfRcNum; //进京访人次
                    this.overview.bwfRcNum = response.data.bwfRcNum; //部委访人次
                    this.overview.jjfFirstNum = response.data.jjfFirstNum;
                    this.overview.jjfRepeatNum = response.data.jjfRepeatNum;
                    this.overview.jjfFirstRcNum = response.data.jjfFirstRcNum;
                    this.overview.jjfRepeatRcNum = response.data.jjfRepeatRcNum;
                    this.overview.fqfNum = response.data.fqfNum; //赴区访总量
                    this.overview.qdsbjlfNum = response.data.qdsbjlfNum; //全地市本级来访总量
                    this.overview.xqlfNum = response.data.xqlfNum; //县区来访总量
                    this.overview.jjfYOY = response.data.jjfYOY //进京访部委访同比
                    this.overview.fqfYOY = response.data.fqfYOY; //赴区访同比
                    this.overview.qdsbjlfYOY = response.data.qdsbjlfYOY; //全地市本级来访同比
                    this.overview.xqlfYOY = response.data.xqlfYOY; //县区来访同比
                    this.overview.accumulateTotal = response.data.accumulateTotal; //累计总量
                    this.overview.accumulateEndNum = response.data.accumulateEndNum; //累计办结量
                    this.overview.total = response.data.total; //根据时间选择总量
                    this.overview.totalQOQ = response.data.totalQOQ; //根据时间选择总量环比
                    this.overview.endNum = response.data.endNum; //根据时间选择办结总量
                    this.overview.toDayNum = response.data.toDayNum; //今日登记量
                    this.overview.firstNum = response.data.firstNum; //初件
                    this.overview.repeatNum = response.data.repeatNum; //重件
                    this.overview.lxNum = response.data.lxNum; //来信
                    this.overview.lfNum = response.data.lfNum; //来访
                    this.overview.wsNum = response.data.wsNum; //网上投诉
                    this.pieChart.push({name:"来信",value:this.overview.lxNum},{name:"来访",value:this.overview.lfNum},{name:"网上",value:this.overview.wsNum});
                    this.overview.nationNum = response.data.nationNum; //国家级
                    this.overview.provinceNum = response.data.provinceNum; //省级
                    this.overview.cityNum = response.data.cityNum; //市级
                    this.overview.countyNum = response.data.countyNum; //县级
                    this.overview.townshipNum = response.data.townshipNum; //乡镇级
                    this.overview.nationLxNum = response.data.nationLxNum; //国家级来信
                    this.overview.provinceLxNum = response.data.provinceLxNum; //省级来信
                    this.overview.cityLxNum = response.data.cityLxNum; //市级来信
                    this.overview.countyLxNum = response.data.countyLxNum; //县级来信
                    this.overview.townshipLxNum = response.data.townshipLxNum; //乡镇级来信
                    this.overview.nationLfNum = response.data.nationLfNum; //国家级来访
                    this.overview.provinceLfNum = response.data.provinceLfNum; //省级来访
                    this.overview.cityLfNum = response.data.cityLfNum; //市级来访
                    this.overview.countyLfNum = response.data.countyLfNum; //县级来访
                    this.overview.townshipLfNum = response.data.townshipLfNum; //乡镇级来访
                    this.overview.nationWsNum = response.data.nationWsNum; //国家级网投
                    this.overview.provinceWsNum = response.data.provinceWsNum; //省级网投
                    this.overview.cityWsNum = response.data.cityWsNum; //市级网投
                    this.overview.countyWsNum = response.data.countyWsNum; //县级网投
                    this.overview.townshipWsNum = response.data.townshipWsNum; //乡镇级网投
                    if(this.overview.total > 0 ) {
                        this.overview.lxzb = (this.overview.lxNum * 1.0 / this.overview.total * 1.0 * 100.0).toFixed(2); //来信占比
                        this.overview.lfzb = (this.overview.lfNum * 1.0 / this.overview.total * 1.0 * 100.0).toFixed(2); //来访占比
                        this.overview.wszb = (this.overview.wsNum * 1.0 / this.overview.total * 1.0 * 100.0).toFixed(2); //网投占比
                        this.overview.nationzb = (this.overview.nationNum * 1.0 / this.overview.total * 1.0 * 100.0).toFixed(2); //国家级占比
                        this.overview.provincezb = (this.overview.provinceNum * 1.0 / this.overview.total * 1.0 * 100.0).toFixed(2); //省级占比
                        this.overview.cityzb = (this.overview.cityNum * 1.0 / this.overview.total * 1.0 * 100.0).toFixed(2); //市级占比
                        this.overview.countyzb = ((this.overview.countyNum * 1.0 + this.overview.townshipNum * 1.0) / this.overview.total * 1.0 * 100.0).toFixed(2); //区县占比(包含乡镇)
                    }
                    this.overview.jointNum = response.data.jointNum; //5-10人集体访
                    this.overview.jointNum20 = response.data.jointNum20; //20人以上集体访
                    this.overview.xfbmsll = response.data.xfbmsll; //信访部门及时受理率
                    this.overview.aqdfl = response.data.aqdfl; //按期答复率
                    this.overview.myl = response.data.zrdwmyl; //责任单位满意率
                    this.initLetterTypeChart(); //信访形式分类
                    this.initRegisterLevelChart5();//五级总量分类
                    this.initRegisterLevelChart4();//四级总量分类
                    this.initLxRegisterLevelChart();//网投五级总量分类
                    this.initLfRegisterLevelChart();//网投五级总量分类
                    this.initWtRegisterLevelChart();//网投五级总量分类
                    this.initFristRepeatChart();//办理动态
                    this.initsecrt0chart();
                    this.initsecrt1chart();
                    this.$modal.closeLoading();
                }
            });
        },
        queryZoneGroupData(){
            getZoneGroupData(this.queryParams).then(response => {
                this.overview.maptip.jtf = 0 ;
                this.overview.maptip.yy = 0 ;
                this.overview.maptip.jjf = 0 ;
                if (response.data) {
                    for(let i in response.data){
                        this.overview.maptip.jtf += response.data[i].jointNum;
                        this.overview.maptip.yy += response.data[i].threatenNum;
                        this.overview.maptip.jjf += response.data[i].jjfNum;
                    }
                    this.tableData = this.ignoreCityData(response.data,'name');
                    //加载地图数据
                    setTimeout(()=> {
                        this.$refs.child.initmap();
                    }, 1000);
                    // 初始化数据
                    this.fixedData = this.tableData.slice(0, 3);
                    this.scrollingData = this.tableData.slice(this.startIndex, this.startIndex + 2);
                    // 启动定时器，循环滚动
                    this.startScrolling();
                }
            })
        },
        queryContentTypeOneData(){
            getContentTypeOneData(this.queryParams).then(response => {
                this.contentTypeData = [];
                if (response.data) {
                    let dataList = response.data;
                    for(let i in dataList) {
                        this.contentTypeData.push({name:dataList[i].name,value:dataList[i].num,ratio:dataList[i].ratio});
                    }
                    this.initctdtchart();
                }
            })
        },
        queryJjfZoneGroupData(){
            getJjfZoneGroupData(this.queryParams).then(response => {
                if (response.data) {
                    this.jjfZoneData = this.ignoreCityData(response.data,'name');
                    this.initfjfrightchart();
                }
            })
        },
        queryThreatenData(){
            getThreatenData(this.queryParams).then(response => {
                if (response.data) {
                    this.takeData = response.data;
                }
            })
        },
        queryJointData(){
            getJointData(this.queryParams).then(response => {
                if (response.data) {
                    this.takeData = response.data;
                }
            })
        },
        queryTakeTypeZoneGroupData(){
            let contParam = {};
            let params ={timeMark:this.queryParams.params.timeMark};
            contParam.params = params;
            if(2 == this.takeType){
                contParam.threaten = 1;
            }else if(3 == this.takeType){
                contParam.jointLetter = 1;
            }
            getZoneGroupData(contParam).then(response => {
                if (response.data) {
                    this.jjfZoneData = this.ignoreCityData(response.data,'name');
                    this.initfjfrightchart();
                }
            })
        },
        queryTakeTypeContentTypeOneData(){
            let contParam = {};
            let params ={timeMark:this.queryParams.params.timeMark};
            contParam.params = params;
            if(1 == this.takeType){
                contParam.jjf = 1;
            }else if(2 == this.takeType){
                contParam.threaten = 1;
            }else if(3 == this.takeType){
                contParam.jointLetter = 1;
            }
            getTakeTypeContentTypeOneData(contParam).then(response => {
                this.jjfContentTypeData = [];
                this.jjfContentTypeNumData = [];
                if (response.data) {
                    let dataList = response.data;
                    for(let i in dataList) {
                        this.jjfContentTypeData.push({name:dataList[i].name,value:dataList[i].num,ratio:dataList[i].ratio});
                        this.jjfContentTypeNumData.push(dataList[i].num);
                    }
                    this.initfjfletfchart();
                }
            })
        },
        queryMonthGroupData(){
            getMonthGroupData().then(response => {
                if (response.data) {
                    this.initmorechart(response.data);
                }
            })
        },
        // tableRowClassName({row, rowIndex}) {
        //   if (rowIndex === 0) {
        //     return 'cellcolor1 tableback';
        //   } else if (rowIndex === 1) {
        //     return 'cellcolor2 tableback';
        //   }
        //   return 'tableback';
        // },

        getArrayValue(array, key) {
            var key = key || "value";
            var res = [];
            if (array) {
                array.forEach(function(t) {
                    res.push(t[key]);
                });
            }
            return res;
        },


        getData(data,sumValue) {
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
                    width : '450',
                    height : '450',
                    radius: [75 - i * 15 + '%', 68 - i * 15 + '%'],
                    center: ["35%", "45%"],
                    Gap : '1%',
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
                        borderRadius : '50%',
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
        initLetterTypeChart(){
            let arrValue = this.getArrayValue(this.pieChart, "value");
            let sumValue = eval(arrValue.join('+'));
            let optionData = this.getData(this.pieChart,sumValue)
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
                ],
                xAxis: [{
                    show: false
                }],
                series: optionData.series
            };

            echarts.init(this.$refs.minchart).setOption(option)
        },
        initbarChartOption(yAxisdata,seriesdata,per,barWidth,fontSize){
            let seriesformatter = '{value}'
            var salvProMax =[];//背景按最大值

            if(per){
                seriesformatter = '{value} %'
                for (let i = 0; i < seriesdata.length; i++) {
                    salvProMax.push(100)
                }
            }else {
                for (let i = 0; i < seriesdata.length; i++) {
                    salvProMax.push(Math.max(...seriesdata) ? Math.max(...seriesdata) :1 )
                }
            }

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
                    right: '2%',
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
                        fontSize: fontSize ? fontSize : 24 ,
                        formatter: function (value) {
                            // 格式化标签
                            return value.toLocaleString() ;
                        },
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
                            fontSize:24
                        }
                    },
                    data: yAxisdata,
                },
                    {
                        type: 'category',
                        inverse: true,
                        axisTick: 'none',
                        axisLine: 'none',
                        show: true,
                        axisLabel: {
                            formatter: seriesformatter,
                            textStyle: {
                                color: '#34d0ff',
                                fontSize: '24'
                            },
                        },
                        data:seriesdata
                    }

                ],
                series: [{
                    name: 'barChart',
                    barWidth: barWidth,
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
                    data: seriesdata
                },
                    {
                        name: '背景',
                        type: 'bar',
                        barWidth: barWidth,
                        barGap: '-100%',
                        data: salvProMax,
                        zlevel: 1,
                        itemStyle: {
                            normal: {
                                color: '#06375f',
                                barBorderRadius: 30,
                            }
                        },
                    },
                ]
            };
        },
        initFristRepeatChart(){
            let yAxisdata = [];
            let firstNumzb = this.overview.total ? (this.overview.firstNum/this.overview.total*100).toFixed(2) : 0;
            let repeatNumzb = this.overview.total ? (this.overview.repeatNum/this.overview.total*100).toFixed(2) : 0;
            let seriesdata =  [firstNumzb,repeatNumzb];
            echarts.init(this.$refs.min2_11chart).setOption(this.initbarChartOption(yAxisdata,seriesdata,true,9));
        },

        initRegisterLevelChart4(){
            let yAxisdata =['国  家 级', '自治区级', '拉萨市级', '县       级'];
            let seriesdata =  [this.overview.nationzb, this.overview.provincezb, this.overview.cityzb, this.overview.countyzb];
            echarts.init(this.$refs.min2_10chart).setOption(this.initbarChartOption(yAxisdata,seriesdata,true,9,20));
        },
        initLxRegisterLevelChart (){
            //let yAxisdata =['国家级', '省级', '市级', '县级','乡镇级'];
            //let seriesdata =  [this.overview.nationLxNum,this.overview.provinceLxNum,this.overview.cityLxNum,this.overview.countyLxNum,this.overview.townshipLxNum];
            let yAxisdata =['国  家 级', '省       级', '市       级', '县       级'];
            let seriesdata =  [this.overview.nationLxNum,this.overview.provinceLxNum,this.overview.cityLxNum,this.overview.countyLxNum];
            echarts.init(this.$refs.min4chart).setOption(this.initbarChartOption(yAxisdata,seriesdata,false,9,20));
        },
        initLfRegisterLevelChart(){
            //let yAxisdata =['国家级', '省级', '市级', '县级','乡镇级'];
            //let seriesdata =  [this.overview.nationLfNum,this.overview.provinceLfNum,this.overview.cityLfNum,this.overview.countyLfNum,this.overview.townshipLfNum];
            let yAxisdata =['国  家 级', '省       级', '市       级', '县       级'];
            let seriesdata =  [this.overview.nationLfNum,this.overview.provinceLfNum,this.overview.cityLfNum,this.overview.countyLfNum];
            echarts.init(this.$refs.footerchart).setOption(this.initbarChartOption(yAxisdata,seriesdata,false,9,20));
        },
        initWtRegisterLevelChart(){
            //let yAxisdata =['国家级', '省级', '市级', '县级','乡镇级'];
            //let seriesdata =  [this.overview.nationWsNum,this.overview.provinceWsNum,this.overview.cityWsNum,this.overview.countyWsNum,this.overview.townshipWsNum];
            let yAxisdata =['国  家 级', '省       级', '市       级', '县       级'];
            let seriesdata =  [this.overview.nationWsNum,this.overview.provinceWsNum,this.overview.cityWsNum,this.overview.countyWsNum];
            echarts.init(this.$refs.footerchart1).setOption(this.initbarChartOption(yAxisdata,seriesdata,false,9,20));
        },
        initsecrtchartOption(totalNum,secrt0chart,Colors,n){
            //n 换行
            var echartData = [{
                value: secrt0chart,//时间
                name: ''
            }, {
                value: totalNum-secrt0chart,
                name: ''
            }];
//蓝色
            var innerColor = Colors[0]; //内层颜色
            var outColor = Colors[0]; //外层边框色粗
            var textColor = Colors[0]; //文字颜色
            var startColor = Colors[1]; //中间饼图渐变开始颜色
            var endColor = Colors[2]; //中间饼图渐变结束颜色
            /*---------------------缩放----------------------------*/
            var scale = 1;

            /*---------------------颜色配置----------------------------*/
            var color = [{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: startColor // 0% 处的颜色
                }, {
                    offset: 1,
                    color: endColor // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
            }, 'none'];
            /*---------------------富文本----------------------------*/
            var rich = {
                time: {
                    color: innerColor,
                    fontSize: 56 * scale,
                    padding: [0, 0],
                    fontWeight:'bold',
                },
                unit:{
                    color: innerColor,
                    fontSize: 28 * scale,
                    padding: [0,0,0, 0],
                    verticalAlign:'bottom',
                }
            }

            return  {
                grid: {
                    top: 0,
                    left: 0,
                    right : 0,
                    bottom :0,
                    containLabel: true
                },
                legend: {
                    show: false,
                    itemGap: 12,
                    data: ['', '']
                },
                series: [
                    //内圈圆环
                    {
                        name: 'Line 0',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        center: ['50%', '50%'],
                        radius: ['0', '0'],
                        itemStyle: {
                            normal: {
                                color: innerColor
                            }
                        },
                        data: [{
                            value: 10,
                            name: '',
                        }],
                        label: {
                            normal: {
                                formatter: function(params) {
                                    var time = echartData[0].value;
                                    if(n){
                                        return '{time|' + time + '}\n{unit|'+n+'}';
                                    }else {
                                        return '{time|' + time + '}{unit|}';
                                    }
                                },
                                position: 'center',
                                textStyle: {
                                    fontSize: 38 * scale,
                                    fontWeight: 'bold',
                                    color: textColor
                                },
                                rich:rich
                            }
                        }
                    },
                    //中间圆环
                    {
                        name: 'Line 1',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        center: ['50%', '50%'],
                        radius: ['90%', '80%'],
                        color: color,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                            },
                            borderWidth: 5,
                            borderRadius : 50,
                        },
                        data:echartData,
                    },
                    //外层圆环
                    {
                        name: 'Line 2',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        center: ['50%', '50%'],
                        radius: ['90%', '90%'],
                        itemStyle: {
                            normal: {
                                borderWidth: 2* scale,
                                borderColor: outColor,
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                            }
                        },
                        data: [{
                            value: 10,
                            name: '',

                        }]
                    }
                ],
            };
        },

        initsecrt0chart(){
            let totalNum = (this.overview.jointNum + this.overview.jointNum20) * 1 == 0 ? 100 :(this.overview.jointNum + this.overview.jointNum20) * 1;
            echarts.init(this.$refs.secrt0chart).setOption(this.initsecrtchartOption(totalNum,this.overview.jointNum,['#13add7','#0a5377','#03bcf0']))
        },
        initsecrt1chart(){
            let totalNum = (this.overview.jointNum + this.overview.jointNum20) * 1 == 0 ? 100 :(this.overview.jointNum + this.overview.jointNum20) * 1;
            echarts.init(this.$refs.secrt1chart).setOption(this.initsecrtchartOption(totalNum,this.overview.jointNum20,['#ebda55','#5e6645','#e4d454']))
        },
        initctdtchart(){
            let data = this.contentTypeData;
            let option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    show :false
                },

                grid: {
                    top: '0',
                    left: '0',
                    containLabel: true
                },

                series: [
                    {
                        name: '突出矛盾',
                        type: 'pie',
                        radius: ['50%', '100%'],
                        color: ['#ec5d51', '#59abe1', '#f4cf42', '#3dc6a8','#9E85C6'],
                        width : '220',
                        height : '220',
                        label: {
                            normal: {
                                position: 'inner',
                                formatter: '{d}%',
                                textStyle: {
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 16
                                }
                            }
                        },
                        data: data
                    }
                ]
            };
            echarts.init(this.$refs.ctdtchart).setOption(option);
        },



        initRegisterLevelChart5(){
            let totalNum = (this.overview.nationNum+this.overview.provinceNum+this.overview.cityNum+this.overview.countyNum+this.overview.townshipNum) * 1;
            totalNum = totalNum == 0 ? 100 : totalNum;
            echarts.init(this.$refs.secrtli1).setOption(this.initsecrtchartOption(totalNum,this.overview.nationNum,['#13add7','#0a5377','#03bcf0'],'国家级'));
            echarts.init(this.$refs.secrtli2).setOption(this.initsecrtchartOption(totalNum,this.overview.provinceNum,['#13add7','#0a5377','#03bcf0'],'省级'));
            echarts.init(this.$refs.secrtli3).setOption(this.initsecrtchartOption(totalNum,this.overview.cityNum,['#13add7','#0a5377','#03bcf0'],'市级'));
            echarts.init(this.$refs.secrtli4).setOption(this.initsecrtchartOption(totalNum,this.overview.countyNum,['#13add7','#0a5377','#03bcf0'],'县级'));
            //echarts.init(this.$refs.secrtli5).setOption(this.initsecrtchartOption(totalNum,this.overview.townshipNum,['#13add7','#0a5377','#03bcf0'],'乡级'));
        },

        initfjfletfchart(){
            let option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    show :false
                },

                grid: {
                    top: '0',
                    left: '0',
                    containLabel: true
                },

                series: [
                    {
                        name: '突出矛盾',
                        type: 'pie',
                        radius: ['50%', '100%'],
                        color: ['#ec5d51', '#59abe1', '#f4cf42', '#3dc6a8','#9E85C6'],
                        width : '170',
                        height : '170',
                        label: {
                            normal: {
                                position: 'inner',
                                formatter: '{d}%',
                                textStyle: {
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 14
                                }
                            }
                        },
                        data: this.jjfContentTypeNumData
                    }
                ]
            };
            echarts.init(this.$refs.fjfletfchart).setOption(option);
        },

        initfjfrightchart(){
            let yAxisdata = [];
            let seriesdata = [];
            for (let i = 0, len =  this.jjfZoneData.length; i < len; i++) {
                yAxisdata.push(this.jjfZoneData[i].name);
                seriesdata.push(this.jjfZoneData[i].num);
            }
            echarts.init(this.$refs.fjfrightchart).setOption(this.initbarChartOption(yAxisdata,seriesdata,false,10,22));
        },
        initmorechart(chartData) {
            let yearData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let yearData2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let yearData3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let yearName = chartData.yearName;
            let yearName2 = chartData.yearName2;
            let yearName3 = chartData.yearName3;
            if (chartData && chartData.yearList) {
                let yearList = chartData.yearList;
                for (let i = 0, len = yearList.length; i < len; i++) {
                    let rec = yearList[i];
                    let index = parseInt(rec.mon) - 1;
                    yearData[index] = rec.num;
                }
            }
            if (chartData && chartData.yearList2) {
                let yearList2 = chartData.yearList2;
                for (let i = 0, len = yearList2.length; i < len; i++) {
                    let rec = yearList2[i];
                    let index = parseInt(rec.mon) - 1;
                    yearData2[index] = rec.num;
                }
            }
            if (chartData && chartData.yearList3) {
                let yearList3 = chartData.yearList3;
                for (let i = 0, len = yearList3.length; i < len; i++) {
                    let rec = yearList3[i];
                    let index = parseInt(rec.mon) - 1;
                    yearData3[index] = rec.num;
                }
            }
            let option = {
                legend: {
                    icon: 'circle',
                    top: 0,
                    right: 150,
                    itemWidth: 6,
                    itemGap: 20,
                    textStyle: {
                        color: '#20c2f3'
                    }
                },
                grid: {
                    top: 30,
                    left: 40,
                    right: 80,
                    bottom: 50,
                },
                xAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    axisLabel: {
                        color: '#20c2f3',
                        fontSize: 20,
                    }
                },
                yAxis: [{
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba( 33, 142, 168, 0.302 )'
                        }
                    },
                    axisLabel: {
                        color: '#20c2f3',
                    }
                }],
                series: [
                    {
                        name: yearName,
                        data: yearData,
                        type: 'line',
                        symbolSize: 10,
                        symbol: 'circle',
                        smooth: true,
                        yAxisIndex: 0,
                        showSymbol: true,
                        color: '#ebda55'
                    },
                    {
                        name: yearName2,
                        data: yearData2,
                        type: 'line',
                        symbolSize: 10,
                        symbol: 'circle',
                        smooth: true,
                        yAxisIndex: 0,
                        showSymbol: true,
                        color: '#ef656e'
                    },
                    {
                        name: yearName3,
                        data: yearData3,
                        type: 'line',
                        symbolSize: 10,
                        symbol: 'circle',
                        smooth: true,
                        yAxisIndex: 0,
                        showSymbol: true,
                        color: '#20c2f3'
                    }
                ]
            };
            echarts.init(this.$refs.morechart).setOption(option);
        },

        startScrolling() {
            this.intervalId = setInterval(() => {
                this.startIndex = (this.startIndex + 1) % (this.tableData.length - 3) + 3; // 更新滚动部分的开始索引，跳过前三行
                this.scrollingData = this.tableData.slice(this.startIndex, this.startIndex + 2);

                // 处理末尾数据循环
                if (this.startIndex + 2 > this.tableData.length) {
                    const endIndex = this.startIndex + 2 - this.tableData.length;
                    this.scrollingData = this.tableData.slice(this.startIndex).concat(this.tableData.slice(3, 3 + endIndex));
                }
            }, 3000);  // 每2秒滚动一次，可以根据需求调整
        },
        tableRowClassName({row, rowIndex }) {
            // return rowIndex < 3 ? 'fixed-row' : '';
            // 固定前三行的样式
            if (rowIndex === 0) {
                return 'cellcolor1 tableback';
            } else if (rowIndex === 1) {
                return 'cellcolor2 tableback';
            }
            return 'tableback';
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
$ft-color: #34d0ff;
$ye-color: #ebda55;


.left{
    margin-left: 115px;
    width: 400px;
}
.sectionleft{
    .sec1-min{
        .min1{
            //height: 125px;
            .min1-0{
                width: 200px;
                display: inline-block;
                background: url("../../../assets/images/szbackgd.png");
                background-size: 100% 100%;
                //cursor: pointer;
                .min1-01{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-content: center;
                    justify-content: space-around;
                    align-items: stretch;
                    height: 210px;
                    p{
                        color: $ft-color;
                        display: flex;
                        flex-direction: column;
                        flex-wrap: nowrap;
                        align-content: space-between;
                        justify-content: center;
                        align-items: center;
                        span:first-child{
                            font-family: $sz-font-family;
                            color: $ye-color;
                        }
                    }
                }
                .min1-02{
                    height: 80px;
                    line-height: 80px;
                    text-align: center;
                    background-image: linear-gradient(to right, #042a4b, #054d73);
                    color: $ft-color;
                }
            }
            .min1-1{
                width: 229px;
                margin-left: 27px;
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
        }

        .min2{
            .min2-0{
                width: 484px;
                display: inline-block;
                position: relative;
                .charttip{
                    position: absolute;
                    color: $ft-color;
                    top: 110px;
                    right: 90px;
                    p{
                        margin: 0;
                        font-family: $sz-font-family;
                        span{
                            color: $ye-color;
                            display: inline-block;
                            min-width: 30px;
                        }
                    }
                    p:nth-child(2) span{
                        color: #1ad485;
                    }
                    p:nth-child(3) span{
                        color: #fb686f;
                    }
                }
                .charttip1{
                    position: absolute;
                    color: $ft-color;
                    top: 235px;
                    right: 235px;
                    p{
                        margin: 0;
                        span{
                            color: white;
                            font-family: $sz-font-family;
                        }
                    }
                }
                .min2-0chart{
                    width: 400px;
                    height: 400px;
                }
            }
            .min2-1{
                display: inline-block;
                height: 335px;
                width: 484px;
                vertical-align: top;
                .min2-10chart{
                    height: 145px;
                }
                .min2-11{
                    margin-top: 20px;
                    .min2-11tip{
                        display: inline-block;
                        width: 150px;
                        color: $ft-color;
                        margin-top: 10px;
                        //padding-left: 10px;
                        span{
                            color: $ye-color;
                            font-family: $sz-font-family;
                        }
                        p{
                            margin: 10px 0;
                        }
                    }
                    .min2-11tip p:first-child{
                        span{
                            color: #1ad485;
                        }
                    }
                    .min2-11chart{
                        height: 120px;
                        display: inline-block;
                        width: 282px;
                        margin-left: -10px;
                    }
                }
            }
        }

        .min3{
            .min3li{
                background: url("../../../assets/images/szbackgd.png");
                background-size: 100% 100%;
                height: 250px;
                padding-top: 15px;
                border-top: 3px solid $ye-color;
                display: flex;
                flex-direction: column;
                justify-content: center;
                p{
                    color: $ft-color;
                    margin: 0;
                    text-align: center;
                    line-height: 60px;
                }
            }
            .min3li-1{
                border-top-color: #1ad485;
            }
            .min3li-2{
                border-top-color: $ft-color;
            }
        }

        .min4{
            .min4chart{
                height: 270px;
            }
        }
    }
}

.section{
    width: 1500px;
    margin: 155px 100px 0 100px;
    display: inline-block;
    vertical-align: top;
    .sihead{
        height: 200px;
        width: 100%;
        margin-bottom: 20px;
        background: #13355c;
        background: linear-gradient(90deg, rgba(57,83,127,0.5018382352941176) 0%, rgba(33,65,124,0.1881127450980392) 50%, rgba(57,83,127,0.4962359943977591) 100%);
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: space-around;
        align-items: center;
        .headli{
            display: flex;
            align-items: center;
            img{
                width: 74px;
                height: 71px;
                margin-right: 10px;
            }
            p{
                margin: 0;
                color: $ft-color;
                font-size: 21px;
            }
            p:first-child{
                font-family: $sz-font-family;
                color: $ye-color;
                font-size: 66px;
            }
        }
        .headli:nth-child(2){
            p:first-child{
                color: #1ad485;
            }
        }
        .headli:nth-child(3){
            p:first-child{
                color: $ft-color;
            }
        }
    }
    .sihead:after{
        position: absolute;
        content : '';
        top: 50px;
        left: 0;
        height: 100px;
        width: 1px;
        border-left: 1px solid $ft-color;
    }
    .sihead:before{
        position: absolute;
        content : '';
        top: 50px;
        right: 0;
        height: 100px;
        width: 1px;
        border-left: 1px solid $ft-color;
    }

    .simap{
        height: 1025px;
        width: 100%;
        position: relative;
        .simap_total{
            position: absolute;
            right: 50px;
            top: 50px;
            p{
                margin: 0;
                color: $ft-color;
                font-size: 22px;
            }
            p:nth-child(2){
                font-size: 54px;
                color: white;
                font-family: $sz-font-family;
            }
        }
        .simap_tip{
            position: absolute;
            bottom: 50px;
            left: 0;
            color: $ft-color;
            font-size: 20px;
            display: flex;
            .simap_tipli{
                position: relative;
                width: 130px;
                cursor: pointer;
                p{
                    margin: 0;
                }
                p:first-child{
                    color: white;
                    font-size: 36px;
                    font-family: $sz-font-family;
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
            }
            .simap_tipli:nth-child(3){
                :after{
                    border-color: $ft-color;
                }
            }
        }
    }
    .sifooter{
        margin-top: 70px;
        .el-col:first-child{
            padding-right: 50px;
            margin: 0;
        }
        .el-col:nth-child(2){
            padding-left: 50px;
            margin: 0;
        }

        .footerchart{
            height: 270px;
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
        margin-top: 30px;
        height: 290px;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: space-around;
        align-items: center;
        background: url("../../../assets/images/szbackgd.png");
        background-size: 100% 100%;
        .secrt-0li{
            display: flex;
            align-items: center;
            .secrt-0chart{
                height: 175px;
                width: 175px;
                margin: 20px 0 ;
            }
            p{
                margin: 0;
                color: $ft-color;
            }
            p:first-child{
                color: white;
            }
        }

    }
    .secrt-1{
        .secrt-1chart{
            height: 250px;
            width: 250px;
            display: inline-block;
        }
        .secrt-1li{
            display: inline-block;
            width: 700px;
            height: 160px;
            vertical-align: top;
            color: $ft-color;
            ul{
                margin: 0;
                padding: 0 10px 0 40px;
                li{
                    list-style: none;
                    position: relative;
                    //list-style-type: square;
                    p{
                        margin: 0;
                        line-height: 50px;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        align-content: center;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        span{
                            width: 80px;
                            white-space: nowrap;
                        }
                        span:first-child{
                            width: 250px;
                        }
                    }
                }
                li:after{
                    content: '';
                    border: 5px solid;
                    position: absolute;
                    left: -20px;
                    top: 13px;
                    //['#ec5d51', '#59abe1', '#f4cf42', '#3dc6a8','#FFCC67']
                    border-color: #ec5d51;
                }
                li:nth-child(2):after{border-color: #59abe1;}
                li:nth-child(3):after{border-color: #f4cf42;}
                li:nth-child(4):after{border-color: #3dc6a8;}
                li:nth-child(5):after{border-color: #9E85C6;}
            }
        }
    }
    .secrt-2{
        .secrt-1chart{
            height: 390px;
            background: url("../../../assets/images/szbackgd.png");
            background-size: 100% 100%;
            .el-table ::v-deep .el-table__header th {
                font-size: 24px;    /* 字体大小 */
                height: 50px;       /* 表头行高 */
                padding: 0;
                div{
                    height: 50px;
                    line-height: 50px;
                }
            }
            /* 设置固定表格的行高 */
            .el-table ::v-deep .el-table__body tr {
                height: 70px;  /* 行高 */
                font-size: 24px;
                td  {
                    height: 100%;
                    div{
                        height: 50px;
                        line-height: 50px;
                    }
                }
            }

            /* 设置滚动表格的行高 */
            .el-table:last-child ::v-deep .el-table__body tr {
                height: 70px;  /* 行高 */
                font-size: 24px;
                td  {
                    height: 100%;
                    div{
                        height: 50px;
                        line-height: 50px;
                    }
                }

            }
        }
    }
    .secrt-3{
        margin-top: 20px;
        .secrt-3li{
            height: 270px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-content: center;
            justify-content: space-between;
            align-items: center;
            .secrt-3lichart{
                width: 200px;
                height: 200px;
            }
        }
    }
}


</style>



<style lang="scss">
@font-face {
    font-family: "DSfont";
    src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
}
$sz-font-family: "DSfont";
$ft-color: #34d0ff;
$ye-color: #ebda55;
.secrt-2{
    .el-table, .el-table .el-table__header-wrapper th , .el-table tr {
        background: none;
        color: #34d0ff;
        text-align: center;
        border-bottom: 0;
    }
    .el-table__header-wrapper{
        background-image: linear-gradient(to right, #042a4b, #054d73);
    }
    .el-table, .el-table .el-table__header-wrapper th , .el-table tr .cell{
        text-align: center;
        line-height: 15px;
    }
    .el-table td.el-table__cell{
        border-bottom: 0;
        line-height: 15px;
    }
    .el-table{
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
}

.gendialog {
    background-color: #00afff;
}

.home .fjfdialog{
    margin-top: 30vh !important;
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
    .content{
        .conleft{
            width: 50%;
            display: inline-block;
            .min1{display: inline-block}
            .min1-0{
                width: 175px;
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
                    height: 140px;
                    background-image: -webkit-linear-gradient( 0deg, rgba(7,48,79,0.4) 0%, rgba(7,48,79,0.3) 100%);
                    p{
                        color: $ft-color;
                        font-size: 18px;
                        display: flex;
                        flex-direction: column;
                        flex-wrap: nowrap;
                        align-content: space-between;
                        justify-content: center;
                        align-items: center;
                        span:first-child{
                            font-family: $sz-font-family;
                            font-size: 50px;
                            color: $ye-color;
                        }
                    }
                }
                .min1-02{
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background-image: linear-gradient(to right, #042a4b, #054d73);
                    color: $ft-color;
                    font-size: 16px;
                }
            }
            .min2{
                display: inline-block;
                font-size: 18px;
                color: $ft-color;
                margin-left: 20px;
                p{
                    margin-top: 0;
                }
                span{
                    color: white;
                    font-family: $sz-font-family;
                    font-size: 30px;
                    margin: 0 30px 0 10px;
                }
            }
            .min3{
                margin-top: 20px;
                .fjfletf{
                    width: 175px;
                    height: 175px;
                    display: inline-block;
                }
                .fjfletfli{
                    display: inline-block;
                    width: 370px;
                    height: 180px;
                    vertical-align: top;
                    color: $ft-color;
                    ul{
                        margin: 0;
                        padding: 0 10px 0 40px;
                        li{
                            list-style: none;
                            position: relative;
                            //list-style-type: square;
                            p{
                                margin: 0;
                                line-height: 30px;
                                display: flex;
                                flex-direction: row;
                                flex-wrap: nowrap;
                                align-content: center;
                                justify-content: space-between;
                                align-items: center;
                                width: 100%;
                                font-size: 22px;
                                span{
                                    width: 80px;
                                    white-space: nowrap;
                                }
                                span:first-child{
                                    width: 200px;
                                    display: inline-block;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                            }
                        }
                        li:after{
                            content: '';
                            border: 5px solid;
                            position: absolute;
                            left: -20px;
                            top: 13px;
                            //['#ec5d51', '#59abe1', '#f4cf42', '#3dc6a8','#FFCC67']
                            border-color: #ec5d51;
                        }
                        li:nth-child(2):after{border-color: #59abe1;}
                        li:nth-child(3):after{border-color: #f4cf42;}
                        li:nth-child(4):after{border-color: #3dc6a8;}
                        li:nth-child(5):after{border-color: #9E85C6;}
                    }
                }
            }
        }
        .conright{
            display: inline-block;
            width: 50%;
            vertical-align: top;
            .fjfrightchart{
                width: 95%;
                height: 335px;
            }
        }
    }

    .morechart{
        height: 300px;
    }
}

</style>
