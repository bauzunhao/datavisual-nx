<template>
  <div class="app-container home">
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
        <div class="sec1-min">
          <div class="min1 mabt70">
            <div class="min1-head"><p class="ft40">在办件总量</p> <p><span class="ft40">{{inProcessTotal}}</span class="ft26">件</p></div>
            <div class="min1-litable"  ref="inproWrapper">
              <el-table
                :data="inProcessTableData"
                style="width: 100%"
                height="700"
                :row-class-name="tableRowClassName"
              >
                <el-table-column
                  prop="serial"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="区县">
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="数量">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="min1 min2">
            <div class="min1-head"><p class="ft40">办理预警</p> <p><span class="ft60">{{warningTotal}}</span><span class="ft26">件</span></p></div>
            <div class="min1-litable" ref="warWrapper">
              <el-table
                :data="warningTableData"
                style="width: 100%"
                height="700"
                :row-class-name="tableRowClassName"
              >
                <el-table-column
                  prop="serial"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="区县">
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="待答复">
                  <template slot-scope="scope">
                    <span style="padding: 0 7px;background-color: #fb686f;border-radius: 5px;color: white;display: inline-block;width: 60px;">{{ getnum(scope.$index, scope.row) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="pjNum"
                  label="未评价">
                  <template slot-scope="scope">
                    <span style="padding:0 7px;background-color: #22b6e4;border-radius: 5px;color: white;display: inline-block;width: 60px;">{{ getevaluate(scope.$index, scope.row) }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="sihead">
          <div class="headli" @click="opentransactvis(1)">
              <div>
                <p class="ft30">答复超期</p>
                <p class="colorred ft88">{{transact.dfcqNum}}</p>
              </div>
          </div>
          <div class="headli" @click="opentransactvis(2)">
            <div>
              <p class="ft30">评价超期</p>
              <p class="colorred ft88">{{transact.pjcqNum}}</p>
            </div>
          </div>
          <div class="headli" @click="opentransactvis(3)">
            <div>
              <p class="ft30">14日内待答复</p>
              <p class="colorgreen ft88">{{transact.dfyjNum}}</p>
            </div>
          </div>
          <div class="headli" @click="opentransactvis(4)">
            <div>
              <p class="ft30">9日未评价</p>
              <p class="colorgreen ft88">{{transact.pjyjNum}}</p>
            </div>
          </div>
        </div>
        <div class="chart" ref="chart"></div>
      </div>
    </div>
    <DialogNav ref="DialogNav"></DialogNav>
      <el-dialog
          :visible.sync="transactvis"
          width="1200px"
          custom-class="detailtable"
          :title="mxName"
          :before-close="transactvisClose">
          <el-table :data="tableDataList">
              <el-table-column label="编号" align="center" prop="letterCode" />
              <el-table-column label="区县" align="center" prop="zoneName" show-overflow-tooltip/>
              <el-table-column label="限办日期" align="center" prop="limitTime" v-if="1 == this.dfType || 3 == this.dfType"/>
              <el-table-column label="办结日期" align="center" prop="endTime" v-if="2 == this.dfType || 4 == this.dfType"/>
              <el-table-column label="天数" align="center" prop="day" v-if="3 == this.dfType || 4 == this.dfType"/>
              <el-table-column label="概括" align="center" prop="complaintContent" show-overflow-tooltip/>
          </el-table>
          <pagination
              v-show="total>0"
              :total="total"
              :page.sync="queryTableParams.pageNum"
              :limit.sync="queryTableParams.pageSize"
              @pagination="opentransactvis(dfType)"
          />
      </el-dialog>
  </div>
</template>

<script>
import datavhead from '@/components/DatavHead'
import * as echarts from 'echarts'
import DialogNav from '@/components/DialogNav'
import { getTransactData,getInProcessZoneGroupData,getWarningZoneGroupData,getByUnitAllData,getByNoResponseData,getByNotEvaluatedData} from "@/api/datav/transact/transact"
export default {
name: "transact",
  components : { 'DialogNav':DialogNav,'datavhead' :datavhead },
  data (){
    return{
        tableDataList: [],
        transactvis : false,
        exceedvis : false,
      transact:{
        dfcqNum: 0,
        dfyjNum: 0,
        pjcqNum: 0,
        pjyjNum: 0,
      },
      inProcessTableData :[],
      warningTableData :[],
      inProcessscrollTimer : null,
      warningscrollTimer : null,
      inProcessTotal: 0,
      warningTotal: 0,
      unitList:[],
      dfType: 0,
      pjType: 0,
        // 总条数
      total: 0,
      queryTableParams: {
        pageNum: 1,
        pageSize: 10,
      },
      mxName:"",
    }
  },
  mounted() {
    this.$modal.loading("");
    this.queryUnitAllData();
    this.queryData(); //统计数据
    this.queryInProcessZoneGroupData();//在办件地市分组数据
    this.queryWarningZoneGroupData();//办理预警地市分组数据

  },
  methods : {
      startAutoScroll(refs, scrollTimer) {
          const wrapper = refs.querySelector('.el-table__body-wrapper');

          if (!wrapper) return;
          let scrollStep = 2;
          let interval = 80;

          scrollTimer = setInterval(() => {
              if (wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight) {
                  wrapper.scrollTop  = 0; // 回到顶部
              } else {
                  wrapper.scrollTop += scrollStep; // 向下滚动
              }
          }, interval);
      },
      transactvisClose(){
        this.transactvis = false
      },
      opentransactvis(type){
        this.transactvis = true;
          if(type != this.dfType){
              this.queryTableParams.pageNum = 1;
          }
          this.dfType = type;
          if(1 == type){
              this.mxName = "答复超期明细";
          }else if(2 == type){
              this.mxName = "评价超期明细";
          }else if(3 == type){
              this.mxName = "答复预警明细";
          }else if(4 == type){
              this.mxName = "评价预警明细";
          }
          if(1 == type || 3 == type){
            this.queryByNoResponseData(1 == type ? 0 : 1);
          }else if(2 == type || 4 == type){
              this.queryByNotEvaluatedData(2 == type ? 0 : 1);
          }
      },
    queryData(){
      getTransactData().then(response => {
        if (response.data) {
          this.transact.dfcqNum = response.data.dfcqNum; //答复超期
          this.transact.dfyjNum = response.data.dfyjNum; //14日内待答复
          this.transact.pjcqNum = response.data.pjcqNum; //评价超期
          this.transact.pjyjNum = response.data.pjyjNum; //9日未评价
        }
      })
    },
    queryInProcessZoneGroupData(){
      getInProcessZoneGroupData().then(response => {
        this.inProcessTotal = 0 ;
        if (response.data) {
          this.inProcessTableData = this.ignoreCityData(response.data,'name');
          for(let i in this.inProcessTableData){
            this.inProcessTotal += this.inProcessTableData[i].num;
            this.inProcessTableData[i].serial = (i*1+1);
          }
            this.$nextTick(() => {
                this.startAutoScroll(this.$refs.inproWrapper , this.inProcessscrollTimer);
            });
        }
      })
    },
    queryWarningZoneGroupData(){
      getWarningZoneGroupData().then(response => {
        this.warningTotal = 0 ;
        if (response.data) {
          this.warningTableData = this.ignoreCityData(response.data,'name');
          for(let i in this.warningTableData){
            this.warningTotal += (this.warningTableData[i].num+this.warningTableData[i].pjNum);
            this.warningTableData[i].serial = (i*1+1);
          }
            this.$nextTick(() => {
                this.startAutoScroll(this.$refs.warWrapper , this.warningscrollTimer);
            });
        }
      })
    },
    queryUnitAllData(){
      getByUnitAllData().then(response => {
        this.unitList = [] ;
        if (response.data) {
          this.unitList = this.ignoreCityData(response.data,'name');
          this.initchart();
        }
        this.$modal.closeLoading();
      })
    },
    queryByNoResponseData(type){
      this.queryTableParams.type = type;
      getByNoResponseData(this.queryTableParams).then(response => {
        this.tableDataList = [];
        if (response.rows) {
           this.tableDataList = response.rows;
        }
        this.total = response.total;
      })
    },
    queryByNotEvaluatedData(type){
      this.queryTableParams.type = type;
        getByNotEvaluatedData(this.queryTableParams).then(response => {
          this.tableDataList = [];
          if (response.rows) {
              this.tableDataList = response.rows;
          }
          this.total = response.total;
      })
    },
    openDialong(){
      this.$refs.DialogNav.handldOpen();
    },
    tableRowClassName (){
      return 'tableback';
    },
    initchart(){
      let [dataArr, allArr, erArr, sanArr] = [[], [], [], []];
      // 行为标注 show first row
      let items = this.unitList;
      // 点
      items.forEach((el, ind) => {
        if (el.isCq === 2) {
          el.lineStyle = {
            color: 'red', // 超期 线红色
          }
        }else if (el.isCq === 1) {
            el.lineStyle = {
                color: '#ebda55', // 即将超期倒计时5天 线黄色
            }
        }
        if (el.pointType === "cloud") {
          // 云
          el.symbol = "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAhCAYAAACSllj+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTg5MEVERTdBNUZGMTFFOEIzNERDMzk3QjJGOEQ3REMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTg5MEVERThBNUZGMTFFOEIzNERDMzk3QjJGOEQ3REMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5ODkwRURFNUE1RkYxMUU4QjM0REMzOTdCMkY4RDdEQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5ODkwRURFNkE1RkYxMUU4QjM0REMzOTdCMkY4RDdEQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkQLbgwAAAtrSURBVHjajFndi2RXET917kd3T3fPOmN2drMhRNFd/EpAWElENoqKRPwIiOCLIkj0yQcRhIAvvvkXKATZB599UyK+iBC/gqCgEEyIK8q6idldezJ7u6f73r73lr+qU2fmTGd2dIbi3L597rn1O1X1q6rTRDN26R+50/9Ou3/iyfmsJEfXMPEaxsveuSnEQ9rMudve8YuZ4+cvT3bfGGK6SGGSJct0kDWkgdSQpclKhMM9+b41aWa3Ttc3AqMzwNB9wHEEN59dYfLfJKIPYc4EYDKRLIgvyGWFAGR+lZivX53s/CSCywUYhbVlrY6DwrWBEVALyKHJ0sDVBmxxH2D5aQrThmzeT63VzWcfBqjvAtTluCbmlN5RCYXzEp8BigeYWhI9kRM/+tf5/rs/Od35fplYLALrKQHGAZhswMDmyuJe5hvA+/3l9wPl7bPfuHaJEg0s5QGKid7T620aE7kR5uXYsQKKZADjVTHmDkB6fB7nWfbsb6r92RemO88VyTsUmFlC3G1FAdiADVS0cLQynwFsE5RPxlSyDSvOEVMZ3A/O/IFeviaaIj62EF855pPs2AAzR05vuiFRhl3PcqgPgNtD77/3s2r2+69Od/+Sbbh3jLNoKQRviEcOCkcd70sIKbAUUJaMRzu0Aa529BG431MMK8F9BtjlUS94YLJclQmgJgIMMqIYU+Q8syt8dpGZvzN27is+0bFPrFYkEmPR85l4TgLzCbAsMbkqmPh2noBbkPusJ7ooLqiWgsv16o2kcwYGTEBNKIyRCcnWXnv/9I+r/Wew9nsRk+d6x6+BPF5uHf8ZwF7+xnS3K5JNVR0tDniTlTeBnQYqglFXoPB5kIB9pZqVI589judGAOU7gGqwAkYn4DJ9nuB+YQ1xxbGtV0Ibb9qVWTbd9f5HMCCIou8bx/9es3sd442a+YXr1ewXX5/u3kh1jDHD/H8Ai6AKdwwius7IpDTJwvcZlL6YEeUSDy0Ulf81ZKnUTWphASfryPPCKiAQjZdIQi2H+KmhYutgcXYjdjzFCg96ck/iXeevV/s/Xzv+49dgPZcSDIXUcCYrpqCGBmqcxkfiRlmYN8G9oSguLxBrgRl1lJwj12IUMIoryAjALBhYEOozYg2f1xyVZRm3cHuMiymu7yEeLzLxR/F5gTVeiqA6i8HuLIttghpTAJSKAPvdfHYBL/oiSOHjO1l2pSB/KdecA9czF1xRIAe514f0HwiJYpyQMpunsPeZEQGbdcGEZR6sNsZ62wA1hRV3C6Krz1Wz1+GWsy4B1p7FivkGKPiByraNcu/X1f6nt8l/e0D+MYDZgfKFsJ8o3rmgvLxEmLCAlmsKlgxlDx3trMYKko8ApKTakHjpdYOZMA6EZcUtcT3G3CGA7uGd74Sesz4tp86wmI8xtWWWEjDnIG8Twb3fAtSU6FnQ3rssztaFPTO0HCMMKKDE3UpzSaQD11CQtUlHTi1LG4VAmmKM1WXZ3MYRhZsP/aCajVIeGJ7lipEoNkFt494vq9mVKflnoPg2Xtxi0QJjWUiuIlJ2Q5JWFRsFFmLpQIGFWi+WRrWSkQBn10t8pZUO7nlzVeS4nDS/s4SnkFsEKQQ9wfuXMa8NzgK2CUqFgiuOiJ7Gww8IqFIBuRIWwTMCzCtJCECW+IpMyKSarIwhDxNCUlbUdMBHOUmBscWirIQKBYWyhiUlhjSSK6KF882yaRPYeMNSEdRPq9n5MflHsFgDUHsoiR7E53IEQKWynsSR1zfWHABqleBJa7ulVeKHRveHHFx2kFYU+pyAVKoBQ5Lyq4Qd7jR9WEIMLpmh7kOl9ZZ69lRgk4QopkYek/DiMZS4AECXJwA4RWc1tFgSl+kp0LWQQ46LnE9WKwttOQL9D6IoODaScZoKNF6xQWJNqS0HwHXQ92/vXN+1zNJUNZDbHfPNb23v3mn+R2I+AhaBbBuo56vZw3jBNYD5FOTJiae9Lbx4y0BpbLnAhrHKyKMFzCIhuClU5la9xPtipcKCRug+ulZhJsg5bOCY/R4A7lXcv2/J/aOw5Us/rPb/BtP9B4z4BsquQ4yL9w9Gd8GO+6/Wy/lbLCaAflXNspGjzwDMlxBDHwSQh4Q0gpVOtgwxPnrN8GQFKh1XLlYnNtYcFpxU6HSc6L21HloYJxV7FhkPXlIyARztrZivosy6AxJ6bc0s3eW/kBL+ien/gPveeUc5ug0/vXmrWTZHMfYCWpAtR18GmM9BqYelrZDu97i6JrVG7oIbek3C7oS1jimYVKnY2i+S7+NccdssKa3kuYyP2xbxBM1vxKFgDiw6EZ4CsQjDeFT5FrLoYZnEg/FaLs6Xo7/fAbgcFYVY6ilY5hO5JkQ3gPKFNYsKIkuau8yslZkSZeydrDxqLCeurRbsDJzGICUtCId1Yv8V+yxJBZ3WjvI8aT3IOk/KMAlTmqD8qhHjCEGMjtb4LNN6XGPk/lw5uiHKX4J7PC5nE5mdVfiwm3Qa88SWI+2fBkk1sE7quN4K1UoaUxd6qWgpq6r0eRS5yaEO4xnGJrHeX0Eavda1pUWSwrvEOwqI9IHS4G5jnQcgKwCG1/I5AKPHIFtGoXKqJPpwer7hT6HYtDXvN4D0SRXO1mLcw/U9IQs+7hQFQCuKq+Wldgyul5ZNdZLkMa8HOG6Cq3tc522QkYCUvhDWzvD8jmT2C5I2vJU69ztd28wftGG12Ph1VlnEBY6uzHJvapJiBawuJ4kK4xCSGzA2wK1Zrlbw3EL5BlasQfkY3VqkDWBlEzyAFXBHCBfi9lLCtXbqZZsvPktt2AUO1XSkZqsWPIdCVqoFIRVRpqdQ8ErQu418I3TgzXIHTsAHYI0BG4g7MptHBHdsDSDA9dBlBR1qGQEEVM8Cqo2C9/Yq5jES0zXbcZ1kesghvlzC1YZYeNBoaxOr8WOFU1ekpFkdJOcWvb0khL7NhbICbt+sVWMReXm0mLqqPSHgICAHV0PpBcAsoNs9bMgBPldt0HWB62UX9O969YcATB68J4AgFRYaoSOuAEKLUUTiFvY3763PiilAFPCWrF3ogLVZdEktN3DHMadvs+/FugsWt2Rl0pXQHXFIA+qOthHMh0oIjpd4foFrgOBKxnAthuBVb+UW5oiR5JUZFHZ3cGMPsXG3DUdnKMClVAOdwiU7JOke4GC5rYFSNluNR7r74fzCaSHcGb13SdwdFawcCGJgpOGMQw6Dqyk5BFeUeNf6Ga/kpXpT2AeAYRnn0FcMgWuuOBhlLiFsIkutwSh8C652iTSvsLC8bO6qFxcgqqGElC5bkuMQwGPESQkwZcGh2pDOMICjE+y4Ts7gO7MSc+y9gnVKDpYBOTRtIIMWnrCIwCh0PqifeY6pS6ulobwCXBgQDVt8f8AhZcr+zoUqb2KX9khSBDavJ92lBcCKW0rCntoPDFuQoVzDUij/aIj+YmiGwDTKjqjfGkrtcoUAyHoy5laU78OUBms1iCtRRAihacK9FfQ59M7S2PHvEkiFXJvyC2sgDhRsAAXC5ZXt5X7+xGS3eXE+e8UpVbpD7OQc45tQWkBJbTxGHMFSLMC0rfJy1iMHUGBpPqqIlAvldE3Svzd3LJSSWZlL4qkTyu4CuCYcv7OychYsIvEu30vLUgeLcfqjS6zSwg8vrBnkMNzjlRHU665ZLunz+6wnUn+oZrtgi0dA3dMsWEZ+KZGzTrmWAl0K/BGdKNZpZGE05JQNcc9GsvyytoTbA2Rj9CzeAvrmxjZBGLnvQ2VWW9PdmgPULmSH2oCola1Jl/QUvf42QM2UfT8GYPGI7U+VnMdrx7xjPwVpsQ2L2UETW9lIJ44p2GrYBFwWqNdlCZl0AjD5XEA7fBY6l1NklloPVmRYnYQ41scJ/ujcpktqgqjD2iq2u84qe/n7rwADAKa7nMAwuTYsAAAAAElFTkSuQmCC";
          el.symbolSize = [56, 35];
          el.label = {
            normal: {
              show: true,
              position: "bottom",
              borderWidth: 1,
              borderRadius: 12,
              padding: [4, 8, 4, 8],
              distance: 10,
              color: "rgb(255,255,255)",
              borderColor: "rgb(89,197,238)",
                fontSize : 24,
            },
          };
          erArr.push(el);
        } else if (el.pointType === "point") {
          // 球
          el.itemStyle = {
            borderColor: el.pointColor ? el.pointColor : '#34d0ff',
            borderWidth: 3,
            color: "#0ceffd",
          };
          // 清除没有父节点的值
          // sanArr.push(el);
          if (el.belong && !items.some((iteP) => el.belong === iteP.name)) {
            items.splice(ind, 1);
          } else {
            sanArr.push(el);
          }
        }
        if (!el.belong) {
          el.children = [];
          items.forEach((es) => {
            if (es.belong === el.name) {
              el.children.push(es);
            }
          });
          allArr.push(el);
        }
      });

// 圆形分区
      function group(arr, r) {
        const newArray = [];
        const { length: arLen } = arr;
        arr.forEach((e, ind) => {
          // 按角度均匀分布
          const ang = 90 - (360 / arLen).toFixed(2) * (ind + 1);
          const x = (Math.cos(ang * Math.PI / 180)).toFixed(2) * r;
          const y = (Math.sin(ang * Math.PI / 180)).toFixed(2) * r;
          e.value = [x.toFixed(2), y.toFixed(2)];
          if (e.belong) {
            let rotate = '';
            const angle = (160 / arr.length).toFixed(2);
            if (x > 0 && y >= 0) {
              rotate = (r - angle * (ind)).toFixed(2);
              // rotate = (90 - 360 / arr.length * (ind + 1)).toFixed(2);
            } else if (x <= 0 && y > 0) {
              rotate = (-r + angle * (arr.length - ind)).toFixed(2);
            } else if (x < 0 && y <= 0) {
              rotate = (r - angle * (ind - arr.length * 0.5)).toFixed(2);
            } else if (x >= 0 && y < 0) {
              rotate = (-8 + angle * (arr.length * 0.25 - ind)).toFixed(2);
            }
            e.label = {
              show: true,
              width: 220,
                fontSize : 22,
              color: {
                lineColor: {
                  color: "rgb(24,163,239)",
                },
              },
              rotate,
              align: x > 0 ? 'left' : 'right',
              padding: x > 0 ? [0, 0, 0, 16] : [0, 16, 0, 0],
            };
          }
          newArray.push(e);
        });
        return newArray;
      }
// 线配置
      function linesConfig(arr) {
        const [dataArr, targetCoord] = [[], [0, 0]];
        arr.forEach((el) => {
          if (!el.belong) {
            dataArr.push([
              { coord: targetCoord },
              {
                coord: el.value,
                lineStyle: el.lineStyle,
                effect: {
                  symbolSize: [4, 16], // 动画的大小
                  period: 6, // 时间快慢
                  delay: 2, // 延时计算
                  ...el.effect,
                },
              },
            ]);
            arr.forEach((element) => {
              if (element.belong === el.name) {
                dataArr.push([
                  { coord: el.value },
                  {
                    coord: element.value,
                    lineStyle: element.lineStyle,
                    effect: {
                      symbolSize: [4, 8], // 动画的大小
                      period: 6, // 时间快慢
                      delay: 2, // 延时计算
                      ...element.effect,
                    },
                  },
                ]);
              }
            });
          }
        });
        return dataArr;
      }
// 点分布
      erArr = group(erArr, 30);
      sanArr = group(sanArr, 44);
      allArr = [...erArr, ...sanArr];
// 线坐标和配置
      dataArr = linesConfig(allArr);
      let option = {
        // backgroundColor: '#000',
        xAxis: {
          show: false,
          type: "value",
          max: 50,
          min: -51,
        },
        grid: {
          top: 100,
          bottom: 130,
          left: 130,
          right: 130,
        },
        yAxis: {
          show: false,
          type: "value",
          max: 50,
          min: -50,
        },
        series: [{
          type: "graph",
          coordinateSystem: "cartesian2d",
          z: 3,
          itemStyle: {
            normal: {
              shadowColor: "none",
            },
          },
          data: allArr,
        },
          {
            name: "",
            type: "lines",
            coordinateSystem: "cartesian2d",
            polyline: true,
            z: 1,
            lineStyle: {
              width: 2,
              color: '#1ad485',
              curveness: 0,
            },
            effect: {
              show: true,
              smooth: false,
              trailLength: 0, // 拖尾的长度
              symbol: 'pin', // 动画的类型
            },
            data: dataArr,
          },
        ],
      }
      echarts.init(this.$refs.chart).setOption(option);
    },
    getnum(index, row) {
      return row.num
    },
    getevaluate(index, row) {
      return row.pjNum
    },
  },
  beforeDestroy() {
        if (this.inProcessscrollTimer) {
            clearInterval(this.inProcessscrollTimer);
            this.inProcessscrollTimer = null;
        }

        if (this.warningscrollTimer) {
            clearInterval(this.warningscrollTimer);
            this.warningscrollTimer = null;
        }
  }

}
</script>

<style scoped lang="scss">
@font-face {
  font-family: "DSfont";
  src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
}
$sz-font-family: "DSfont";
$ft-color: #34d0ff;
p{margin: 0}
.colorred{color: #fb686f}
.colorgreen{color: #1ad485}
.home {

  .cont{

    .sectionleft {
      .min1{
        margin-top: 15px;
        .min1-head{
          color: white;
          padding-left: 15px;
          margin: 0;
          letter-spacing: 3px;
          font-weight: 400;
          background-image: linear-gradient(to right, #042a4b, #054d73);
          height: 80px;
          line-height: 80px;
          border-top: 5px solid $ft-color;
          P{
            display: inline-block;
          }
          p:first-child{
            border-left: 6px solid #20c2f3;
            height: 40px;
            line-height: 40px;
            margin: 20px 20px;
            padding: 0 20px;
          }
          p:last-child{
            float: right;
            color: $ft-color;
            span{
              font-family: $sz-font-family;
              color: #ebda55;
            }
          }
        }
        .min1-litable{
          background-color: rgba( 25, 54, 98,.38 );
        }
      }
      .min2{
          cursor: pointer;
        .min1-head{
          p:last-child{
            span{
              color: #fb686f;
            }
          }
        }
      }
    }
    .section{
      width: 2572px;
      height: 1797px;
      margin-left: 100px;
      display: inline-block;
      vertical-align:top;
      margin-top: 150px;
      .sihead{
          cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;
        background: #13355c;
        background: linear-gradient(90deg, rgba(57,83,127,0.5018382352941176) 0%, rgba(33,65,124,0.1881127450980392) 50%, rgba(57,83,127,0.4962359943977591) 100%);
        .headli{
          color: $ft-color;
          width: 100%;
          text-align: center;
          div{
            height: 115px;
            margin: 15px 0;
            border-left: 1px solid $ft-color;
            p:last-child{
              font-family: $sz-font-family;
            }
          }
          div:last-child{
            border-right: 1px solid $ft-color;
          }
        }
      }
      .chart{
        width: 100%;
        height: 1450px;
      }
    }
  }
}
</style>
<style lang="scss">
.min1-litable{
  .el-table, .el-table .el-table__header-wrapper th , .el-table tr , .tableback{
    background: none;
    color: #34d0ff;
    text-align: center;
    border-bottom: 0;
      font-size: 28px;
      height: 40px;
      padding: 0;
      div{
          height: 40px;
          line-height: 40px;
      }
  }
  .el-table__header-wrapper{
    //background-image: linear-gradient(to right, #042a4b, #054d73);
  }
  .tableback .cell{
    text-align: center;
    white-space: nowrap;
      //line-height: 15px;
  }
  .el-table td.el-table__cell{
    border-bottom: 0;
    padding: 4px 0;
    //line-height: 15px;
  }
  .el-table::before {
    display: none;
  }
.el-table__body-wrapper{
    overflow: auto;
    scrollbar-width: none;         /* Firefox */
    -ms-overflow-style: none;      /* IE */
}
.el-table__body-wrapper::-webkit-scrollbar {
    display: none;                 /* Chrome */
}
}
</style>
<style lang="scss">
    .detailtable{
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
        .el-dialog__body{
            padding: 30px 10px;
            .el-table, .el-table .el-table__header-wrapper th , .el-table tr {
                background: none;
                color: #34d0ff;
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
