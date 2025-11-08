<template>
  <div class="detailcont">
    <el-card class="box-card">
      <div>
        <el-descriptions >
          <el-descriptions-item label="信访日期">{{this.letterDetail.receiveTime}}</el-descriptions-item>
          <el-descriptions-item label="初重件">{{this.letterDetail.repeat ? "重件" : "初件"}}</el-descriptions-item>
          <el-descriptions-item label="信访形式">{{this.letterDetail.letterTypeName}}</el-descriptions-item>
          <el-descriptions-item label="事项所属系统">{{this.letterDetail.belongToSystem}}</el-descriptions-item>
          <el-descriptions-item label="事情发生地">{{this.letterDetail.zoneName}}</el-descriptions-item>
          <el-descriptions-item label="当前办理状态">{{this.letterDetail.end ? "已办结" : "办理中"}}</el-descriptions-item>
          <el-descriptions-item label="信访原因">{{this.letterDetail.complaintReason}}</el-descriptions-item>
          <el-descriptions-item label="通用关键字显示">{{this.letterDetail.commonKeyword}}</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
    <el-row style="margin: 20px 0" :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>信访人基本信息</span>
          </div>
          <div  class="item leuserinfo">
            <div>
              <p><span>{{this.letterDetail.name}}</span><span>{{this.letterDetail.sex}}</span><span>{{this.letterDetail.nation}}</span><span v-if="this.letterDetail.age">{{this.letterDetail.age}}岁</span></p>
              <p>住址：{{this.letterDetail.address}}</p>
              <p>联系电话：{{this.letterDetail.mobile}}</p>
            </div>
              <img v-if="!this.letterDetail.jointly" src="@/assets/images/grts.png" alt="">
              <img v-if="this.letterDetail.jointly" src="@/assets/images/jtf.png" alt="">
          </div>
          <div class="histy">
            <div class="histy-li">
              <span class="histy-tip">信访次数</span>
              <p><span>{{this.letterDetail.detailStatis.totalCount}}</span> 次</p>
              <div>
                <img src="@/assets/images/histy_tont3.png" alt="">
                <p>走访 <span>{{this.letterDetail.detailStatis.visitCount}}</span>批</p>
              </div>
              <div>
                <img src="@/assets/images/histy_tont4.png" alt="">
                <p>来信 <span>{{this.letterDetail.detailStatis.letterCount}}</span>批</p>
              </div>
              <div>
                <img src="@/assets/images/histy_tont5.png" alt="">
                <p>网信 <span>{{this.letterDetail.detailStatis.onlineCount}}</span>批</p>
              </div>
            </div>
            <div class="histy-li">
              <span class="histy-tip">办理状态</span>
              <p>待办理<span>{{this.letterDetail.detailStatis.todoCount}}</span> 件，已办理<span>{{this.letterDetail.detailStatis.completedCount}}</span> 件</p>
            </div>
            <div class="histy-li">
              <span class="histy-tip">登记级别</span>
              <p>国<span>{{this.letterDetail.detailStatis.guojiaCount}}</span> 件，区<span>{{this.letterDetail.detailStatis.qujiCount}}</span> 件，市<span>{{this.letterDetail.detailStatis.shijiCount}}</span> 件，县<span>{{this.letterDetail.detailStatis.xianjiCount}}</span> 件，</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>概况内容</span>
          </div>
          <div class="item lecontent">
            <p>信访件编号 <span>{{this.letterDetail.letterCode}}</span>（涉及人数：{{this.letterDetail.involveNumber}}   人{{this.letterDetail.sfssbz ? "，涉法涉诉" : ""}} {{this.letterDetail.pendingCase ? "，积案" : ""}}{{this.letterDetail.repeat ? "，重件" : "，初件"}}）</p>
            <div class="lecon">
              {{this.letterDetail.complaintContent}}
            </div>
            <div class="lecontip">
              备注内容： {{this.letterDetail.remark}}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <el-tabs v-model="activeName" >
        <el-tab-pane label="关联单位详情" name="third">
          <el-table  :data="relatedUnit">
            <el-table-column label="序号" type="index" width="50"/>
            <el-table-column label="单位名称" align="center" key="unitName" prop="unitName" />
            <!--<el-table-column label="单位负责人" align="center" key="unitLeader" prop="unitLeader"  />-->
            <el-table-column label="联系电话" align="center" key="unitContact" prop="unitContact"/>
            <el-table-column label="经办人姓名" align="center" key="handledName" prop="handledName"/>
            <el-table-column label="经办人联系电话" align="center" key="handledContact" prop="handledContact"/>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="办理情况" name="first">
          <el-table  :data="statesList">
            <el-table-column label="级别" type="index" width="50"/>
            <el-table-column label="经办单位" align="center" key="handleUnitName" prop="handleUnitName" />
            <el-table-column label="经办日期" align="center" key="stateTime" prop="stateTime">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>{{ scope.row.stateTimeStr }}</p>
                        <div slot="reference" class="name-wrapper">
                            {{ scope.row.stateTime }}
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="经办人" align="center" key="userName" prop="userName"/>
            <el-table-column label="办理方式" align="center" key="handelMethodName" prop="handelMethodName"/>
            <el-table-column label="办理状态" align="center" >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>{{ scope.row.orgIdea ? scope.row.orgIdea : scope.row.content ? scope.row.content:scope.row.stateName }}</p>
                  <div slot="reference" class="name-wrapper">
                    {{ scope.row.stateName }}
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="处理情况" name="second" v-if="this.replyOpinion && this.replyOpinion.length > 0">
            <div v-for="reply in replyOpinion ">
              <el-descriptions border>
                <el-descriptions-item label="信访件编号">{{reply.letterCode}}</el-descriptions-item>
                <el-descriptions-item label="经办机构">{{reply.createOrgName}}</el-descriptions-item>
                <el-descriptions-item label="经办时间">{{reply.createTime}}</el-descriptions-item>
                <el-descriptions-item label="送达方式">{{reply.deliveryWayName}}</el-descriptions-item>
                <el-descriptions-item label="签收标志">{{reply.isSignReceive ? "签收":"拒收"}}</el-descriptions-item>
                <el-descriptions-item label="信访人意见">{{reply.complainantOpinion == 0 ? "同意" : reply.complainantOpinion == 1 ? "不同意" : "无明确意见"}}</el-descriptions-item>
                <el-descriptions-item label="经办人">{{reply.createUserName}}</el-descriptions-item>
                <el-descriptions-item label="送达人">{{reply.deliveryUserName}}</el-descriptions-item>
              </el-descriptions>
              <el-descriptions border :column=1>
                <el-descriptions-item label="建议内容" v-if="0 == letterDetail.handleType">{{reply.blyj}}</el-descriptions-item>
                <el-descriptions-item label="处理情况">{{ 1 == letterDetail.handleType ? reply.situation : reply.blqk}}</el-descriptions-item>
                <el-descriptions-item label="意见书内容">{{1 == letterDetail.handleType ? reply.result : reply.cljdsnr}}</el-descriptions-item>
              </el-descriptions>
            </div>
        </el-tab-pane>
        <el-tab-pane label="回访情况" name="huifang" v-if="this.hfqkList && this.hfqkList.length > 0">
            <div v-for="hfqk in hfqkList ">
              <el-descriptions border>
                <el-descriptions-item label="回访机构">{{hfqk.hfjg}}</el-descriptions-item>
                <el-descriptions-item label="回访人">{{hfqk.name}}</el-descriptions-item>
                <el-descriptions-item label="回访状态">{{hfqk.stateName}}</el-descriptions-item>
                <el-descriptions-item label="回访方式">{{hfqk.hffs == 0 ? "当面回访" : hfqk.hffs == 1 ? "电话回访" : "其他"}}</el-descriptions-item>
                <el-descriptions-item label="回访时间">{{hfqk.huifangTime}}</el-descriptions-item>
                <el-descriptions-item label="已有回复告知">{{hfqk.yyhfgz == 0 ? "否" : "是"}}</el-descriptions-item>
                <el-descriptions-item label="已收到处理意见">{{hfqk.ysdclyj == 0 ? "否" : "是"}}</el-descriptions-item>
                <el-descriptions-item label="处理意见书已落实">{{hfqk.clyjsyls == 0 ? "否" : "是"}}</el-descriptions-item>
                <el-descriptions-item label="回访对信访部门满意度">{{hfqk.hfdxfbmmydName}}</el-descriptions-item>
                <el-descriptions-item label="回访对责任单位满意度">{{hfqk.hfdzrdwmydName}}</el-descriptions-item>
                <el-descriptions-item label="回访对信访部门不满意原因" v-if="'不满意' == hfqk.hfdxfbmmydName">{{hfqk.hfdxfdwbmyyy}}</el-descriptions-item>
                <el-descriptions-item label="回访对责任单位不满意原因" v-if="'不满意' == hfqk.hfdzrdwmydName">{{hfqk.hfdzrdwbmyyy}}</el-descriptions-item>
              </el-descriptions>
              <el-descriptions border :column=1>
                <el-descriptions-item label="回访情况">{{hfqk.hfqk}}</el-descriptions-item>
              </el-descriptions>
            </div>
        </el-tab-pane>
        <el-tab-pane label="不满意原因" name="fourth" v-if ="this.satisfyEvaluation && (this.satisfyEvaluation.unitReasonName || this.satisfyEvaluation.acceptReasonName)">
          <p v-if ="this.satisfyEvaluation && this.satisfyEvaluation.unitReasonName">对信访机构：{{this.satisfyEvaluation.unitReasonName}}</p>
          <p v-if ="this.satisfyEvaluation && this.satisfyEvaluation.acceptReasonName">对责任单位：{{this.satisfyEvaluation.acceptReasonName}}</p>
        </el-tab-pane>
        <el-tab-pane label="责任单位未解决原因" name="fourth2" v-if ="this.satisfyEvaluation && this.satisfyEvaluation.wjjyy">
          <p>对信访机构：{{this.satisfyEvaluation.wjjyy}}</p>
        </el-tab-pane>
      </el-tabs>

    </el-card>

  </div>
</template>

<script>
import { getInfoDetailData} from "@/api/backstage/work/detailcomp";
export default {
name: "DetailComp",
  data(){
    return{
      activeName: 'third',
      letterDetail:{
        detailStatis: {}
      },
      queryParams:{
         objectId :  this.$route.params && this.$route.params.objectId
      },
      replyOpinion: [],
      satisfyEvaluation: {},
      relatedUnit: [],
      statesList: [],
      hfqkList: [],
    }
  },
  mounted() {
    this.queryInfoDetailData();
  },
  methods: {
    queryInfoDetailData(){
      getInfoDetailData(this.queryParams).then(response => {
        if (response.data) {
          this.letterDetail = response.data.detail;
          if(response.data.states){
            this.statesList = response.data.states;
          }
          //信访程序
          if(1 === this.letterDetail.handleType){
            if(response.data.replyOpinion) {
              this.replyOpinion = response.data.replyOpinion;
            }
          }else{
            if(response.data.classify) {
              this.replyOpinion = response.data.classify;
            }
          }
          if(response.data.satisfyEvaluation){
            this.satisfyEvaluation = response.data.satisfyEvaluation[0];
          }
          if(response.data.relatedUnit){
            this.relatedUnit = response.data.relatedUnit;
          }
          if(response.data.hfqk){
            this.hfqkList = response.data.hfqk;
          }
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">
.detailcont{
  padding: 20px;

  .el-dialog__body {
    padding: 10px 20px;
  }

  .leuserinfo {
    display: flex;
    justify-content: space-between;

    img {
      width: 100px;
      height: 100px;
      margin-left: 5px;
    }

    div {
      font-size: 14px;

      p {
        margin-top: 0;

        span {
          margin-right: 5px;
        }
      }
    }
  }

  .histy {
    .histy-li {
      display: flex;
      align-items: center;
      align-content: center;
      margin-top: 10px;

      p {
        margin: 0;

        span {
          color: #2166cc;
          font-size: 24px;
          margin: 0 5px;
        }
      }

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 20px;
        p {
          font-size: 14px;

          span {
            font-size: 14px;
            margin: 0 5px;
          }
        }
      }

      .histy-tip {
        padding: 10px;
        background-color: #2166cc;
        color: white;
        border-radius: 8px;
        margin-right: 10px;
      }
    }

    .histy-li:nth-child(2) {
      margin-bottom: 25px;
    }
  }

  .lecontent {
    .lecon {
      height: 197px;
      border: 1px #cccccc solid;
      padding: 10px;
      overflow: auto;
    }

    .lecontip {
      min-height: 50px;
      border: 1px #cccccc solid;
      padding: 10px;
      border-top: 0;
    }

    p:first-child span {
      color: #2166cc;
    }
  }
}
</style>
