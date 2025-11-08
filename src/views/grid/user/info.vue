<template>
    <div class="app">
        <UserHeat message="个人资料"/>
        <div class="cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="form.realname" placeholder="请输入真实姓名"/>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option
                            v-for="item in sexOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系地址" prop="contactAddress">
                    <el-input v-model="form.contactAddress" placeholder="请输入联系地址"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import UserHeat from '@/components/UserHeat';
import {updateUser, getDetail} from '@/api/grid/user';

export default {
    name: "info",
    data() {
        return {
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                realname: [
                    {required: true, message: "网格信访用户姓名不能为空", trigger: "blur"}
                ],
                sex: [
                    {required: true, message: "请选择您的性别", trigger: "change"}
                ]
            },
            sexOptions: [{
                value: 1,
                label: '男'
            }, {
                value: 2,
                label: '女'
            }]
        }
    },
    components: {
        UserHeat
    },
    mounted() {
        this.initUserDetail();
    },
    methods: {
        initUserDetail() {
            getDetail().then(response => {
                if (response && 200 === response.code) {
                    let userData = response.data;
                    this.form = {
                        id: userData.id,
                        realname: userData.realname,
                        sex: userData.sex,
                        contactAddress: userData.contactAddress
                    };
                }
            });
        },
        /** 提交按钮 */
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != null) {
                        updateUser(this.form).then(response => {
                            this.$modal.msgSuccess("修改成功");
                        });
                    }
                }
            });
        }
    }
}
</script>

<style scoped lang="scss">
.app {
    .cont {
        padding: 20px 20px;
    }
}
</style>
