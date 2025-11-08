<template>
    <div class="phoneformcont">
        <div class="phoneheat">
            <h2>拉萨市网格信访</h2>
            <p v-if="false">您所在网格：网格名称</p>
        </div>
        <el-form ref="form"  label-position="left" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="反映类别">
                <el-radio-group v-model="form.type" >
                    <el-radio label="0" :key="0">我要建议</el-radio>
                    <el-radio label="1" :key="1">我要投诉</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="form.mobile" placeholder="请输入手机号码" />
            </el-form-item>
            <el-form-item label="事发地址" prop="addressCode">
                <el-cascader
                    v-model="form.addressCode"
                    placeholder="请选择事发地址"
                    :props="zoneProps"
                    :options="zoneOptions"
                    clearable
                    style="width: 100%"
                    popper-class = 'addrcas'
                    @change="handleChange"
                />
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input v-model="form.address" placeholder="请输入详细地址" />
            </el-form-item>
            <el-form-item label="事项类别" prop="contentType">
                <el-select v-model="form.contentType" clearable filterable placeholder="请选择事项类别"
                    style="width: 100%">
                    <el-option
                        v-for="data in cententTypeList"
                        :key="data.id"
                        :label="data.name"
                        :value="data.id">{{ data.name }}
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="具体描述" prop="content">
                <el-input type="textarea" :rows="5" v-model="form.content" maxlength="2000" show-word-limit placeholder="请描述事情情况，期望得到什么帮助。"></el-input>
            </el-form-item>
            <el-form-item label="附件">
                <file-upload v-model="filePaths" :limit="3" :file-size="50" :file-type="['doc', 'docx', 'pdf', 'jpg', 'jpeg', 'png', 'mp4', 'avi', 'rmvb', 'mov', 'zip', 'rar']"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>


        <div class="dialogdiv" v-if="dialogdiv">
            <div>
                <h2>信访事项须知</h2>
                <p>根据国务院《信访工作条例》及有关法律、法规的规定，拉萨市信访局结合工作职责，受理、办理网上信访事项，对信访人提出的信访事项，按照“属地管理、分级负责，谁主管、谁负责”的原则，依法、及时、就地处理问题。</p>
                <p>网上信访是公民、法人或者其他组织通过党委和政府信访网站或电子信箱等反映情况，提出建议、意见或者投诉请求，依法由有关国家机关处理的活动。</p>
                <p>一、拉萨市信访局网上受理范围</p>
                <p>1、对政府政策、决策、重大举措及重大事件方面的意见、建议和咨询；</p>
                <p>2、对行政执行方面的反映；</p>
                <p>3、对侵害自身合法权益的行为提出控告或者申诉；</p>
                <p>4、对损害国家、社会、集体利益的行为提出控告或者检举；</p>
                <p>5、其他需要反映的情况、问题和要求。</p>
                <p>二、拉萨市信访局网上信访不予（不再）受理范围</p>
                <p>1、属各级人民代表大会以及县级以上各级人民代表大会常务委员会、人民法院、人民检察院职权范围内的。</p>
                <p>2、已经或依法应当通过诉讼、仲裁、行政复议等法定途径解决的。</p>
                <p>3、已经受理或者正在办理期限内的。</p>
                <p>4、已有处理意见且正在复查期限内的，或者已有复查意见且正在复核期限内的。</p>
                <p>5、已有复核意见的。</p>
                <p>3、需要向来信人求证而又无法与来信人取得联系的；</p>
                <p>4、无实际内容的。</p>
                <p>5、以盈利为目的的商业推销广告。</p>
                <p>6、各种恶意攻击性信息。</p>
                <p>7、不受理匿名以及事实不清、责任主体不明的信访事项。</p>
                <p>二、网上反映程序</p>
                <p>通过网上信访形式反映信访事项，应当根据情况选择相应的信访类型，认真填写表格（带＊项不能为空），并在注册时留下真实姓名（实名认证通过后方可在网上进行反映信访事项）、联系电话、信箱地址、以便更好地联系。</p>
                <p>三、网上办理程序</p>
                <p>按照《信访工作条例》等法律法规的要求，及时转送、交办信访人提出的请求事项，并督促有权处理的行政机关处理、及时回复。</p>
                <p>具体办理流程是：信访人在网上提交诉求或建议事项→拉萨市信访局网上接收并受理申请审核、审核通过后登记将有关事项转送、交办至有关单位或有权处理的行政机关→有关单位或有权处理的行政机关处理后→回复反馈处理情况→信访人网上查询有关情况。</p>
                <p>四、网上查询结果与评价</p>
                <p>网上信访形式反映提交的信访事项，信访人登录后可查询信访事项的办理情况和办理结果；通过来信、来访反映的信访事项可以通过“信访查询”功能，输入姓名和查询码，查询办理情况和办理结果，在有办理结果30日内信访人可以对办理结果进行评价。</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogdiv = false">已阅读</el-button>
          </span>
        </div>

        <GridBottomNavBar :active='glidbot' :community-id="communityId"/>
    </div>


</template>

<script>
import { getCententTypeList, addComplaint } from "@/api/datav/grid/complaint";
import {initZoneList} from "@/api/common/common";
import GridBottomNavBar from '@/components/GridBottomNavBar';
import {getDetail} from '@/api/grid/user';
export default {
name: "phoneform",
    data() {
        return {
            dialogdiv : true,
            dialogVisible : true,
            timer: null,
            form: {
                name: '',
                mobile: '',
                type: this.$route.query.type || '0',
                files:'',
                communityId:this.$route.query.communityId
            },
            filePaths: null,
            zoneProps: {
                label: "name",
                value: "id",
                emitPath: false,
                checkStrictly: true,
            },
            zoneOptions: [],
            //增加或修改操作属地下拉框
            zoneOperateOptions: [],
            cententTypeList:[],
            // 表单校验
            rules: {
                name: [
                    { required: true, message: "姓名不能为空", trigger: "blur" }
                ],
                addressCode: [
                    { required: true, message: "发生地不能为空", trigger: "blur" }
                ],
                address: [
                    { required: true, message: "发生地不能为空", trigger: "blur" }
                ],
                contentType: [
                    { required: true, message: "事项类别不能为空", trigger: "blur" }
                ],
                content: [
                    { required: true, message: "内容不能为空", trigger: "blur" }
                ],
                mobile: [
                    { required: true, message: "手机号不能为空", trigger: "blur" },
                    {
                        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                        message: "请输入正确的手机号码",
                        trigger: "blur"
                    }
                ],
            }
        }
    },
    created() {
        // 启动定时器，20 秒后关闭弹窗
        this.timer = setTimeout(() => {
            this.dialogdiv = false
        }, 20000);
        this.checkUserStatus();
        this.initZone();
        this.initCententTypeList();
    },
    components: {
        GridBottomNavBar,
    },
    methods: {
        checkUserStatus() {
            getDetail().then(res => {
                if (res && 200 === res.code) {
                    let user = res.data;
                    if (1 !== user.checkType) {
                        this.$modal.alertError("实名制认证暂时未通过，请先完成");
                        this.$router.push({
                            path: '/grid/personal',
                            query: {
                                communityId: this.communityId
                            }
                        });
                    } else {
                        this.form.name = user.realname;
                        this.form.mobile = user.mobile;
                    }
                }
            });
        },
        // 初始化行政区域
        initZone() {
            initZoneList({id: process.env.VUE_APP_ZONE_ID,depth:3}).then(response => {
                this.zoneOperateOptions = [];
                this.zoneOptions = [];
                if (response) {
                    response.forEach(obj => {
                        this.zoneOperateOptions.push({
                            id: obj.id,
                            name: obj.name,
                            parentId: obj.parentId,
                            children: null
                        })
                        this.zoneOperateOptions = this.zoneOperateOptions.concat(obj.children);
                    })
                }
                this.zoneOptions = response;
            })
        },
       initCententTypeList() {
            getCententTypeList({}).then(response => {
                this.cententTypeList = response.rows;
            });
        },
        onSubmit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.filePaths) {
                        let filesJson = [];
                        let files = this.filePaths.split(',');
                        for (let i = 0; i < files.length; i++) {
                            let filePath = files[i];
                            let fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
                            filesJson.push({
                                name: fileName,
                                url: filePath
                            });
                        }
                        this.form.files = JSON.stringify(filesJson);
                    }
                    console.log(this.form);
                    addComplaint(this.form).then(response => {
                        this.$modal.msgSuccess("提交成功");
                        this.cancel();
                    });
                }
            });
        },
        handleClose(done) {
            done();
        },
        // 取消按钮
        cancel() {
            this.resetForm("form");
            this.filesJson = [];
            this.form.communityId = this.$route.query.communityId;
        },
        handleChange(event) {
            this.$nextTick(() => {
                const scrollContainer = document.querySelector('.addrcas .el-cascader-panel');
                if (scrollContainer) {
                    scrollContainer.scrollLeft = scrollContainer.scrollWidth;
                }
            });
        },
    },
    watch: {
        dialogVisible(newVal) {
            // 当弹窗关闭时，清除定时器
            if (!newVal && this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
        },
        $route: {
            handler: function (route) {
                this.form.type = route.query && route.query.type || '0';
            },
            immediate: true
        }
    },
    computed: {
        // 计算属性直接返回路由参数
        communityId() {
            return this.$route.query.communityId
        },
        glidbot() {
            // 根据 form.type 动态返回 glidbot 值
            return this.form.type === '0' ? 'suggestion' : 'complaint';
        },
    }
}
</script>

<style lang="scss">
.phoneformcont{
    padding: 20px 10px;
    padding-bottom: 60px;
    .phoneheat{
        h2{
            font-size: 28px;
            margin: 10px 0;
        }
        p{
            font-size: 16px;
        }
    }
    .dialogdiv{
       position: fixed;
        z-index: 9;
       top: 0;
       right: 0;
       bottom: 0;
       left: 0;
       overflow: auto;
       padding: 25px 25px 30px;
       background: #fff;
       border-radius: 2px;
       box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
       box-sizing: border-box;
        width: 100%;
        font-size: 16px;
    }
}
.addrcas{
    width: 100%;
   overflow: auto;
    .el-cascader-panel{
        width: 100%;
        overflow: auto;
    }

}
</style>
