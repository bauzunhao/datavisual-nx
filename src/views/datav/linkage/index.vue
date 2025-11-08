<template>
    <div class="home">
        <datavhead></datavhead>
        <div class="cont">
            <div class="sectionleft">
                <div class="sec1-nav">
                    <router-link to="/"><img src="../../../assets/images/general-home.png" alt=""></router-link>
                    <ul>
                        <li @click="openDialong()"><span>导航</span></li>
                        <li><router-link to="/datav/emergency"><span>风险播报</span></router-link></li>
                        <li><span>联动指挥</span></li>
                        <li><router-link to="/datav/publicityv"><span>宣传教育</span></router-link></li>
                    </ul>
                </div>
                <div class="sect1 mabt70">
                    <div class="sect1list">
                        <p>事件响应级别</p>
                        <p>{{ this.eventLevelList[this.eventDetail.customLevel] }}</p>
                    </div>
                    <div class="sect1list">
                        <p>风险事件名称</p>
                        <p>{{ this.eventDetail.ruleName }}</p>
                    </div>
                    <div class="sect1list">
                        <p>诉求类别</p>
                        <p>{{ this.eventDetail.letterDetail.contentTypeName }}</p>
                    </div>
                </div>
                <div class="sect2">
                    <h3>信访人基本详细</h3>
                    <div class="sect2min">
                        <img v-if="!this.eventDetail.letterDetail.jointly" src="../../../assets/images/grts.png" alt="">
                        <img v-if="this.eventDetail.letterDetail.jointly" src="../../../assets/images/jtf.png" alt="">
                        <div class="sect2minlist">
                            <p class="coloryel">姓名：{{ this.eventDetail.letterDetail.name }}<span v-if="this.eventDetail.letterDetail.sex">性别：{{this.eventDetail.letterDetail.sex}}</span></p>
                            <p v-if="this.eventDetail.letterDetail.age">年龄：{{ this.eventDetail.letterDetail.age }}岁</p>
                            <p v-if="this.eventDetail.letterDetail.nation">民族：{{ this.eventDetail.letterDetail.nation }}</p>
                            <p>电话：{{ this.eventDetail.letterDetail.mobile }}</p>
                            <p>住址：{{ this.eventDetail.letterDetail.address }}</p>
                        </div>
                    </div>
                </div>
                <div class="sect3">
                    <div class="leftmin3">
                        <p><span>信访次数</span><span>{{ this.eventDetail.letterDetail.detailStatis.totalCount }}</span>次，走访{{ this.eventDetail.letterDetail.detailStatis.visitCount }}件，来信{{ this.eventDetail.letterDetail.detailStatis.letterCount }}件，网投{{ this.eventDetail.letterDetail.detailStatis.onlineCount }}件</p>
                        <p>
                            <span>办理状态</span>
                            待办理<span>{{ this.eventDetail.letterDetail.detailStatis.todoCount }}</span>件，
                            已办理<span>{{ this.eventDetail.letterDetail.detailStatis.completedCount }}</span>件
                        </p>
                        <p>
                            <span>登记级别</span>
                            国<span>{{ this.eventDetail.letterDetail.detailStatis.guojiaCount }}</span>件，
                            区<span>{{ this.eventDetail.letterDetail.detailStatis.qujiCount }}</span>件，
                            市<span>{{ this.eventDetail.letterDetail.detailStatis.shijiCount }}</span>件，
                            县<span>{{ this.eventDetail.letterDetail.detailStatis.xianjiCount }}</span>件
                        </p>
                    </div>
                    <div @click="openLinkageDetail()" class="sect3bot">
                        <p>详细情况></p>
                    </div>
                </div>
            </div>
            <div class="sectionlink">
                <div class="sectionhead mabt70">
                    <el-form ref="form" :model="form" :inline='inline'>
                        <el-form-item label="信访件编号:">
                            <el-input v-model="form.letterCode" placeholder="请输入信访件编号搜索"></el-input>
                        </el-form-item>
                        <el-form-item label="信访人姓名:">
                            <el-input v-model="form.name" placeholder="请输入信访人姓名搜索"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码:">
                            <el-input v-model="form.mobile" placeholder="请输入信访人手机号码搜索"></el-input>
                        </el-form-item>
                        <el-form-item label="证件号码:">
                            <el-input v-model="form.idcard" placeholder="请输入信访人证件号码搜索"></el-input>
                        </el-form-item>
                        <el-form-item class="search">
                            <p @click="this.searchLinkageEventDetail"><i class="el-icon-search"></i></p>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="sectionmin1 mabt70">
                    <h3>投诉情况</h3>
                    <el-descriptions contentClassName="descrcon" labelClassName="desrlabel" :column=6>
                        <el-descriptions-item label="信访时间">{{ this.eventDetail.letterDetail.receiveTime }}</el-descriptions-item>
                        <el-descriptions-item label="所属系统">{{ this.eventDetail.letterDetail.belongToSystem }}</el-descriptions-item>
                        <el-descriptions-item label="发生地">{{ this.eventDetail.zoneName }}</el-descriptions-item>
                        <el-descriptions-item label="办理状态">{{ this.eventDetail.letterDetail.end ? "已办结" : "办理中" }}</el-descriptions-item>
                        <el-descriptions-item label="信访原因">{{ this.eventDetail.letterDetail.complaintReason }}</el-descriptions-item>
                        <el-descriptions-item label="关键词">{{ this.eventDetail.letterDetail.commonKeyword }}</el-descriptions-item>
                    </el-descriptions>
                    <p class="descrp">
                        信访概况：
                        <span>
                          信访件编号：{{ this.eventDetail.letterCode }}（涉及人数：{{ this.eventDetail.letterDetail.involveNumber || 0 }}人，
                          {{ this.eventDetail.letterDetail.repeat ? "重件" : "初件" }}{{ this.eventDetail.letterDetail.pendingCase ? "，积案" : "" }}
                          {{ this.eventDetail.letterDetail.sfssbz ? "，涉法涉诉" : "" }}）
                        </span>
                    </p>
                    <div class="min1cont">
                        <p>{{ this.eventDetail.letterDetail.complaintContent }}</p>
                        <p>备注：{{ this.eventDetail.letterDetail.remark }}<span @click="openLinkageDetail">详细情况></span></p>
                    </div>
                </div>
                <div class="sectionmin2">
                    <h3>关联单位详情</h3>
                    <el-descriptions contentClassName="descrcon" labelClassName="desrlabel" :column=4>
                        <template v-for="rec in this.relatedUnit">
                            <el-descriptions-item label="单位名字">{{ rec.unitName }}</el-descriptions-item>
                            <!-- <el-descriptions-item label="单位负责人">{{ rec.unitLeader }}</el-descriptions-item>-->
                            <el-descriptions-item label="联系电话">{{ rec.unitContact }}</el-descriptions-item>
                            <el-descriptions-item label="经办人姓名">{{ rec.handledName }}</el-descriptions-item>
                            <el-descriptions-item label="经办人联系电话">{{ rec.handledContact }}</el-descriptions-item>
                        </template>
                    </el-descriptions>
                </div>
                <div class="sectionmin3">
                    <span @click="openMessage">联动指挥短信</span>
                    <span><router-link :to="{path: '/datav/video', query: {eventId: this.eventDetail.eventId}}">视频联动指挥</router-link></span>
                </div>
            </div>
        </div>
        <DialogNav ref="DialogNav"></DialogNav>
        <el-dialog
            :visible.sync="this.linkageSms.dialog"
            width="1200px"
            custom-class="linkagedia"
            title="发送短信"
            :before-close="linkageClose">
            <div class="vishead">
                <el-input type="textarea" v-model="linkageSms.data.smsContent"></el-input>
            </div>
            <el-form>
                <div class="viscontent">
                    <div class="content">
                        <template v-for="rec in this.linkageSms.data.smsReceivers">
                            <p class="cheboxp">
                                <el-checkbox v-model="rec.checked" contentClassName="checkbox1"></el-checkbox>
                            </p>
                            <el-descriptions :column="4">
                                <el-descriptions-item label="姓名">{{rec.recvName}}</el-descriptions-item>
                                <el-descriptions-item label="手机号码">{{rec.recvMobile}}</el-descriptions-item>
                                <el-descriptions-item label="单位名称">{{rec.recvUnitName}}</el-descriptions-item>
                                <el-descriptions-item label="职务">{{rec.recvJob}}</el-descriptions-item>
                            </el-descriptions>
                        </template>
                    </div>
                    <p class="botmp">
                        <el-checkbox v-model="linkageSms.selectAll">全选</el-checkbox>
                    </p>
                    <div class="visbotm">
                        <div class="botmbutt">
                            <el-input v-model.trim="linkageSms.tempReceiver.recvName" maxlength="20" placeholder="临时联系人姓名"></el-input>
                            <el-input v-model.trim="linkageSms.tempReceiver.recvMobile" placeholder="手机号码"></el-input>
                            <p class="add" @click="addTempSmsReceiver">+</p>
                        </div>
                        <div class="submit">
                            <p @click="sendLinkageSms">发送</p>
                        </div>
                    </div>
                </div>
            </el-form>
        </el-dialog>
        <el-dialog
            :visible.sync="linkagePetitionDetail.dialog"
            width="1200px"
            custom-class="linkagedetail"
            title="详细情况"
            :before-close="linkageDetailClose">
            <el-tabs v-model="linkagePetitionDetail.activeName" type="card">
                <el-tab-pane label="办理情况" name="blqk">
                    <el-table :data="this.linkagePetitionDetail.statesList">
                        <el-table-column label="级别" type="index" width="50"/>
                        <el-table-column label="经办单位" align="center" key="handleUnitName" prop="handleUnitName" />
                        <el-table-column label="经办日期" align="center" key="stateTime" prop="stateTime" width="150" />
                        <el-table-column label="经办人" align="center" key="userName" prop="userName" width="150"/>
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
                <el-tab-pane label="处理情况" name="clqk" v-if="this.linkagePetitionDetail.replyOpinion && this.linkagePetitionDetail.replyOpinion.length > 0">
                    <template v-for="reply in this.linkagePetitionDetail.replyOpinion">
                        <el-descriptions contentClassName="descrcon" labelClassName="desrlabel">
                            <el-descriptions-item label="信访件编号">{{reply.letterCode}}</el-descriptions-item>
                            <el-descriptions-item label="经办机构">{{reply.createOrgName}}</el-descriptions-item>
                            <el-descriptions-item label="经办时间">{{reply.createTime}}</el-descriptions-item>
                            <el-descriptions-item label="送达方式">{{reply.deliveryWayName}}</el-descriptions-item>
                            <el-descriptions-item label="签收标志">{{reply.isSignReceive ? "签收":"拒收"}}</el-descriptions-item>
                            <el-descriptions-item label="信访人意见">{{reply.complainantOpinion == 0 ? "同意" : reply.complainantOpinion == 1 ? "不同意" : "无明确意见"}}</el-descriptions-item>
                            <el-descriptions-item label="经办人">{{reply.createUserName}}</el-descriptions-item>
                            <el-descriptions-item label="送达人">{{reply.deliveryUserName}}</el-descriptions-item>
                        </el-descriptions>
                        <el-descriptions  :column=1 contentClassName="descrcon" labelClassName="desrlabel">
                            <el-descriptions-item label="建议内容" v-if="0 == eventDetail.letterDetail.handleType">{{reply.blyj}}</el-descriptions-item>
                            <el-descriptions-item label="处理情况">{{ 1 == eventDetail.letterDetail.handleType ? reply.situation : reply.blqk}}</el-descriptions-item>
                            <el-descriptions-item label="意见书内容">{{1 == eventDetail.letterDetail.handleType ? reply.result : reply.cljdsnr}}</el-descriptions-item>
                        </el-descriptions>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="审批情况" name="spqk" v-if="this.linkagePetitionDetail.report && this.linkagePetitionDetail.report.length > 0">
                    <div class="tabscont">

                    </div>
                </el-tab-pane>
                <el-tab-pane label="回访情况" name="hfqk" v-if="this.linkagePetitionDetail.hfqkList && this.linkagePetitionDetail.hfqkList.length > 0">
                    <template v-for="hfqk in this.linkagePetitionDetail.hfqkList">
                        <el-descriptions contentClassName="descrcon" labelClassName="desrlabel">
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
                        <el-descriptions  :column=1 contentClassName="descrcon" labelClassName="desrlabel">
                            <el-descriptions-item label="回访情况">{{hfqk.hfqk}}</el-descriptions-item>
                        </el-descriptions>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="不满意原因" name="bmyyy" v-if ="this.linkagePetitionDetail.satisfyEvaluation && (this.linkagePetitionDetail.satisfyEvaluation.unitReasonName || this.linkagePetitionDetail.satisfyEvaluation.acceptReasonName)">
                    <div class="tabscont">
                        <p v-if ="this.linkagePetitionDetail.satisfyEvaluation && this.linkagePetitionDetail.satisfyEvaluation.unitReasonName">对信访机构：{{this.linkagePetitionDetail.satisfyEvaluation.unitReasonName}}</p>
                        <p v-if ="this.linkagePetitionDetail.satisfyEvaluation && this.linkagePetitionDetail.satisfyEvaluation.acceptReasonName">对责任单位：{{this.linkagePetitionDetail.satisfyEvaluation.acceptReasonName}}</p>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
import DialogNav from '@/components/DialogNav/index';
import datavhead from '@/components/DatavHead/index';
import {
    getLinkageEventDetail,
    getLinkageSmsReceiver,
    linkageSendSms,
    getLinkagePetitionInfo
} from '@/api/datav/linkage/index';

export default {
    name: "DataV-Emergency-Linkage",
    components: {'DialogNav': DialogNav, 'datavhead': datavhead,},
    data() {
        return {
            inline: true,
            eventLevelList: ['全部', '一级', '二级', '三级', '四级', '五级'],
            resultStatusList: ['', '转领导包案', '推进化解', '已经稳控'],
            form: {
                resultStatus: 0,
                eventId: null,
                letterCode: null,
                name: null,
                mobile: null,
                idcard: null
            },
            eventDetail: {
                letterDetail: { // 信访详情
                    detailStatis: {} // 详情统计
                }
            }, // 事件详情
            relatedUnit: [], // 关联单位
            linkageSms: { // 短信指挥调度
                dialog: false,
                selectAll: false,
                data: {
                    smsReceivers: [],
                    smsTemplete: null,
                    smsContent: null
                },
                tempReceiver: { // 临时短信接收人
                    recvName: null,
                    recvMobile: null,
                    checked: false
                }
            },
            linkagePetitionDetail: {
                dialog: false,
                activeName: "blqk",
                statesList: [],
                replyOpinion: [],
                report:[],
                hfqkList: [],
                satisfyEvaluation: {}
            }
        }
    },
    watch: {
        'linkageSms.selectAll': function(newVal, oldVal) {
            for (let i = 0, len = this.linkageSms.data.smsReceivers.length; i < len; i++) {
                this.linkageSms.data.smsReceivers[i].checked = newVal;
            }
        }
    },
    mounted() {
        let eventId = this.$route.query.eventId;
        this.form.eventId = eventId;
        this.loadLinkageEventDetail();
    },
    methods: {
        openDialong() {
            this.$refs.DialogNav.handldOpen();
        },
        openMessage() {
            this.linkageSms.tempReceiver = {
                recvName: null,
                recvMobile: null,
                checked: false
            };
            let data = {
                name: this.eventDetail.letterDetail.name,
                contentTypeName: this.eventDetail.letterDetail.contentTypeName
            };
            getLinkageSmsReceiver(data).then(result => {
                this.linkageSms.dialog = true;
                if (result) {
                    this.linkageSms.data = result;
                }
                if (this.relatedUnit) {
                    for (let i = 0, len = this.relatedUnit.length; i < len; i++) {
                        const rec = this.relatedUnit[i];
                        if (!rec.handledName) {
                            continue;
                        }
                        let regex = /^(?:\+?86)?1[3-9]\d{9}$/;
                        if (!rec.handledContact || !regex.test(rec.handledContact)) {
                            continue;
                        }
                        const tempReceiver = {
                            recvName: rec.handledName,
                            recvMobile: rec.handledContact,
                            recvUnitName: rec.unitName,
                            checked: false
                        };
                        this.linkageSms.data.smsReceivers.push(tempReceiver);
                    }
                }
            });
        },
        linkageClose() {
            this.linkageSms.dialog = false;
        },
        openLinkageDetail() {
            let query = {objectId: this.eventDetail.objectId};
            getLinkagePetitionInfo(query).then(result => {
                this.linkagePetitionDetail.dialog = true;
                if (result && result.code && 200 === result.code) {
                    let data = result.data;
                    if (data.states) {
                        this.linkagePetitionDetail.statesList = data.states;
                    }
                    //信访程序
                    if (1 === this.eventDetail.letterDetail.handleType) {
                        if (data.replyOpinion) {
                            this.linkagePetitionDetail.replyOpinion = data.replyOpinion;
                        }
                    } else if (data.classify) {
                        this.linkagePetitionDetail.replyOpinion = data.classify;
                    }
                    if (data.report) {
                        this.linkagePetitionDetail.report = data.report;
                    }
                    if (data.satisfyEvaluation) {
                        this.linkagePetitionDetail.satisfyEvaluation = data.satisfyEvaluation[0];
                    }
                    if (data.hfqk) {
                        this.linkagePetitionDetail.hfqkList = data.hfqk;
                    }
                }
            });
        },
        linkageDetailClose() {
            this.linkagePetitionDetail.dialog = false;
        },
        loadLinkageEventDetail() {
            getLinkageEventDetail(this.form).then(result => {
                if (result) {
                    this.eventDetail = result.eventDetail;
                    this.relatedUnit = result.relatedUnit;
                } else {
                    this.$modal.msgError("系统查找不到对应数据！");
                }
            });
        },
        searchLinkageEventDetail() {
            this.form.eventId = (this.form.letterCode || this.form.name || this.form.mobile || this.form.idcard) ? null : this.$route.query.eventId;
            this.loadLinkageEventDetail();
        },
        addTempSmsReceiver() {
            if (!this.linkageSms.tempReceiver.recvName) {
                this.$modal.msgError("临时联系人姓名不能为空！");
                return;
            }
            let regex = /^(?:\+?86)?1[3-9]\d{9}$/;
            if (!this.linkageSms.tempReceiver.recvMobile || !regex.test(this.linkageSms.tempReceiver.recvMobile)) {
                this.$modal.msgError("临时联系人手机号不能为空或格式不正确！");
                return;
            }
            this.linkageSms.data.smsReceivers.push(this.linkageSms.tempReceiver);
            this.linkageSms.tempReceiver = {
                recvName: null,
                recvMobile: null,
                checked: false
            };
        },
        sendLinkageSms() {
            let smsReceivers = this.linkageSms.data.smsReceivers.filter(receiver => receiver.checked);
            if (!smsReceivers || smsReceivers.length < 1) {
                this.$modal.msgError("请选择需要发送短信的联系人信息！");
                return;
            }
            let data = {
                smsReceivers: smsReceivers,
                smsContent: this.linkageSms.data.smsContent
            };
            linkageSendSms(data).then(result => {
                if (result && result.code && 200 === result.code) {
                    this.$modal.msgSuccess(result.msg);
                    this.linkageClose();
                } else {
                    this.$modal.msgError(result.msg);
                }
            });
        }
    }
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


            .sect1 {
                font-size: 36px;
                display: grid;
                grid-template-columns: repeat(3, 312px);
                grid-gap: 15px;
                text-align: center;

                p:first-child {
                    background-image: linear-gradient(to right, #042a4b, #054d73);
                    color: #34d0ff;
                    height: 100px;
                    line-height: 100px;
                }

                p:last-child {
                    height: 250px;
                    color: $ft-yel;
                    background-color: rgba(25, 54, 98, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding: 10px;
                }
            }

            .sect2 {
                margin-top: 30px;

                .sect2min {
                    background-color: rgba(25, 54, 98, 0.3);
                    padding: 25px;

                    img {
                        max-height: 480px;
                        margin-right: 25px;
                        width: 370px;
                    }

                    .sect2minlist {
                        display: inline-block;
                        font-size: 26px;
                        vertical-align: top;
                        color: $ft-color;
                        width: 520px;

                        p {
                            line-height: 40px;
                            height: 40px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;

                            span {
                                color: $ft-color;
                                float: right;
                            }
                        }
                    }
                }

            }

            .sect3 {
                margin-top: 70px;

                .leftmin3 {
                    font-size: 32px;
                    margin-top: 30px;
                    color: $ft-color;
                    background-color: rgba(25, 54, 98, 0.3);
                    padding: 45px 25px;

                    p {
                        margin-bottom: 85px;

                        span {
                            font-size: 30px;
                            color: $ft-yel;
                            margin-right: 5px;
                            vertical-align: middle;
                        }

                        span:first-child {
                            background-image: linear-gradient(to right, rgb(2, 49, 86), rgb(6, 85, 130));
                            padding: 6px 15px;
                            border-radius: 5px;
                            margin-right: 15px;
                            font-size: 24px;
                            color: $ft-color;
                            vertical-align: top;
                        }

                    }

                    p:last-child {
                        margin: 0;
                    }
                }

                .sect3bot {
                    height: 75px;
                    line-height: 75px;
                    text-align: right;
                    padding: 0 25px;
                    background-image: linear-gradient(to right, #042a4b, #054d73);
                    color: $ft-color;
                    cursor: pointer;
                    font-size: 32px;
                }
            }
        }

        .sectionlink {
            margin: 150px 0 0 100px;
            width: 2572px;
            display: inline-block;
            vertical-align: top;

            .sectionhead {
                .search {
                    p {
                        height: 60px;
                        cursor: pointer;
                        color: white;
                        width: 140px;
                        background-image: linear-gradient(90deg, rgba(6, 178, 227, 0.63137) 0%, rgb(4, 186, 237) 100%);
                        text-align: center;

                        i {
                            font-size: 32px;
                            line-height: 60px;
                        }
                    }
                }
            }

            .sectionmin1 {
                margin-top: 10px;

                .descrp {
                    font-size: 30px;
                    color: $ft-color;
                    margin-bottom: 20px;
                    span {
                        float: right;
                        color: #34d0ff;
                    }
                }

                .min1cont {
                    p:first-child {
                        color: $ft-color;
                        height: 430px;
                        overflow: auto;
                        background-color: rgba(25, 54, 98, 0.3);
                        padding: 25px;
                        font-size: 28px;
                        margin-top: 10px;
                    }

                    p:last-child {
                        height: 80px;
                        line-height: 80px;
                        padding: 0 25px;
                        background-image: linear-gradient(to right, rgba(6, 178, 227, 0.3098), rgba(4, 186, 237, .3));
                        color: $ft-color;
                        font-size: 28px;

                        span {
                            float: right;
                            cursor: pointer;
                        }
                    }

                    p::-webkit-scrollbar-track {
                        background-color: #122a4e;
                    }

                    /* 滚动条的滑块颜色 */
                    p::-webkit-scrollbar-thumb {
                        background-color: #1379ca;
                    }
                }
            }

            .sectionmin2 {
                margin-top: 25px;
            }

            .sectionmin3 {
                margin-top: 60px;
                text-align: right;

                span {
                    font-size: 28px;
                    height: 60px;
                    line-height: 60px;
                    display: inline-block;
                    color: white;
                    background-image: linear-gradient(90deg, rgba(6, 178, 227, 0.63137) 0%, #04baed 100%);
                    width: 290px;
                    text-align: center;
                    margin-left: 60px;
                    cursor: pointer;
                }
            }
        }
    }
}

</style>
<style lang="scss">
.sectionlink {
    .sectionhead {
        .el-form-item {
            margin-right: 60px;
        }

        .el-form-item__label {
            color: #20c2f3;
            font-size: 28px;
            font-weight: 400;
            line-height: 60px;
            height: 60px;
        }

        .el-input__inner {
            background-color: rgba(25, 54, 98, .38);
            border: 0;
            font-size: 28px;
            color: #20c2f3;
            line-height: 60px;
            height: 60px;
        }

        .el-input__inner::placeholder {
            color: rgba(32, 194, 243, 0.502);
        }
    }

    .sectionmin1 {
        .el-descriptions__body {
            background: none;
            padding-top: 5px;
            margin-bottom: 10px;
            .descrcon {
                font-size: 30px;
                color: white;
                max-width: 180px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                display: inline-block;
            }

            .desrlabel {
                font-size: 30px;
                color: #20c2f3;
            }
        }
    }

    .sectionmin2 {
        .el-descriptions__body {
            background-color: rgba(25, 54, 98, 0.3);
            padding: 30px;
            height: 400px;
            overflow: auto;
            .el-descriptions__table{
                height: 340px;
            }
            .descrcon {
                font-size: 28px;
                color: white;
                max-width: 180px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                display: inline-block;
            }

            .desrlabel {
                font-size: 28px;
                color: #20c2f3;
            }
        }

        .el-descriptions__body::-webkit-scrollbar-track {
            background-color: #122a4e;
        }

        .el-descriptions__body::-webkit-scrollbar-thumb {
            background-color: #1379ca;
        }
    }
}

$ft-color: #20c2f3;
$ft-yel: #ebda55;
.home .linkagedia {
    margin-top: 25vh !important;
    border: 1px solid rgb(18, 121, 203);
    border-top: 5px solid #20c2f3;
    background: none;
    background-image: linear-gradient(180deg, rgba(18, 121, 203, .7) 0%, rgba(0, 39, 83, .7) 100%);

    .el-dialog__header {
        height: 70px;
        background-image: linear-gradient(to right, #033d6b, #076aa2);

        .el-dialog__title {
            font-size: 34px;
            line-height: 30px;
            color: white;
            //font-weight: bold;
            padding-left: 15px;
            border-left: 7px solid #20c2f3;
        }

        .el-dialog__headerbtn {
            top: 0;
            right: -50px;
            font-size: 40px;
            border: 1px solid rgb(18, 121, 203);
            line-height: 30px;
            background-color: rgba(18, 121, 203, 0.149);

            .el-dialog__close {
                color: #1279cb;
            }
        }
    }

    .content::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background-color: #1379cb;
    }

    /* 滚动条滑块 */
    .content::-webkit-scrollbar-thumb {
        background-color: #1379cb;
        border-radius: 0;
    }

    /* 滚动条轨道 */
    .content::-webkit-scrollbar-track {
        background-color: #122a4e;
        border-radius: 0;
    }

    .el-dialog__body {
        padding: 30px 60px;

        .vishead {
           .el-textarea__inner{
               font-size: 24px;
               color: $ft-color;
               min-height: 55px;
               line-height: 30px;
               background-color: #032144;
               margin-bottom: 15px;
               padding: 10px 30px;
               resize: none;
           }
        }

        .viscontent {

            .content {
                padding: 20px 30px;
                background-color: #032144;
                height: 150px;
                overflow: auto;

                .cheboxp {
                    display: inline-block;
                    height: 25px;
                    line-height: 25px;
                    margin-right: 20px;
                    vertical-align: top;
                }

                .el-descriptions {
                    display: inline-block;
                    width: calc(100% - 34px);

                    .el-descriptions__body {
                        background: none;
                        font-size: 20px;
                        color: $ft-color;
                    }

                    .el-descriptions-item {
                        padding-bottom: 0;
                        line-height: 25px;
                    }
                }
            }

            .botmp {
                padding: 0 30px;
                background-color: #032144;
                line-height: 40px;
                height: 40px;

                .el-checkbox__label {
                    color: $ft-color;
                    font-size: 20px;
                }

                .el-checkbox:last-child {
                    float: right;
                }
            }

            .visbotm {
                margin-top: 15px;

                .botmbutt {
                    .el-input__inner {
                        background-color: #032449;
                        border: 0;
                        font-size: 20px;
                        color: #20c2f3;
                        line-height: 40px;
                        height: 40px;
                    }

                    .el-input:first-child {
                        display: inline-block;
                        width: 240px;
                    }

                    .el-input:nth-child(2) {
                        display: inline-block;
                        width: 705px;
                        margin: 0 15px;
                    }

                    .el-input__inner::placeholder {
                        color: rgba(32, 194, 243, 0.502);
                    }

                    .add {
                        width: 100px;
                        height: 40px;
                        line-height: 40px;
                        font-size: 40px;
                        color: white;
                        display: inline-block;
                        text-align: center;
                        vertical-align: top;
                        background-image: linear-gradient(90deg, rgba(6, 178, 227, 0.63137) 0%, rgb(4, 186, 237) 100%);
                        cursor: pointer;
                    }
                }

                .submit {
                    height: 50px;
                    cursor: pointer;
                    color: white;
                    font-size: 32px;
                    text-align: center;
                    line-height: 50px;
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;

                    p {
                        width: 220px;
                        background-image: linear-gradient(90deg, rgba(6, 178, 227, 0.63137) 0%, #04baed 100%);
                    }
                }
            }
        }


    }
}

.home .linkagedetail{
    margin-top: 25vh !important;
    border: 1px solid rgb(18, 121, 203);
    border-top: 5px solid #20c2f3;
    background: none;
    background-image: linear-gradient(180deg, rgba(18, 121, 203, .7) 0%, rgba(0, 39, 83, .7) 100%);

    .el-table, .el-table .el-table__header-wrapper th , .el-table tr , .tableback{
        background: none;
        color: #34d0ff;
        text-align: center;
        border-bottom: 0;
    }
    .el-table__header-wrapper{
       color: white;
    }
    .tableback .cell{
        text-align: center;
        line-height: 15px;
    }
    .el-table td.el-table__cell{
        border-bottom: 0;
        line-height: 15px;
    }
    .el-table{
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
    .el-dialog__header {
        height: 70px;
        background-image: linear-gradient(to right, #033d6b, #076aa2);

        .el-dialog__title {
            font-size: 34px;
            line-height: 30px;
            color: white;
            //font-weight: bold;
            padding-left: 15px;
            border-left: 7px solid #20c2f3;
        }

        .el-dialog__headerbtn {
            top: 0;
            right: -50px;
            font-size: 40px;
            border: 1px solid rgb(18, 121, 203);
            line-height: 30px;
            background-color: rgba(18, 121, 203, 0.149);

            .el-dialog__close {
                color: #1279cb;
            }
        }
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item  , .el-tabs--card > .el-tabs__header .el-tabs__nav , .el-tabs--card > .el-tabs__header{
        border: 0;
        font-size: 24px;
        color: rgba( 32, 194, 243, 0.502 );
        height: 52px;
        line-height: 52px;
        margin: 0;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active{
        background-color: #031f43;
        border-top: 4px solid #20c2f3;
        color: #20c2f3;
    }

    .el-tabs__content .el-tab-pane{
        background-color: #031f43;
        padding: 40px;
        height: 300px;
        overflow: auto;
        .tabscont{
            color:white;
            font-size: 22px;
            p{
                margin-top: 15px;
            }
            span{
                color: $ft-color;
            }
        }
    }

    .el-tab-pane::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background-color: #1379cb;
    }

    /* 滚动条滑块 */
    .el-tab-pane::-webkit-scrollbar-thumb {
        background-color: #1379cb;
        border-radius: 0;
    }

    /* 滚动条轨道 */
    .el-tab-pane::-webkit-scrollbar-track {
        background-color: #122a4e;
        border-radius: 0;
    }

    .el-descriptions__body {
        background: none;
        .descrcon {
            font-size: 18px;
            color: white;
            max-width: 180px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-block;
        }

        .desrlabel {
            font-size: 18px;
            color: #20c2f3;
        }
    }

}
</style>
