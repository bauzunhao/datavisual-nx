<template>
    <div class="app">
        <UserHeat message="修改密码"/>
        <div class="cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input type="password" v-model="form.oldPassword" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="form.newPassword" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input type="password" v-model="form.confirmPassword" show-password></el-input>
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
import { updateUserPwd } from "@/api/grid/user";

export default {
    name: "password",
    data() {
        var validateConfirmPassword = (rule, value, callback) => {
            if (value !== this.form.newPassword) {
                return callback(new Error('两次密码不一致'));
            }
            callback();
        };
        return {
            form: {
                oldPassword: undefined,
                newPassword: undefined,
                confirmPassword: undefined
            },
            rules: {
                oldPassword: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                    { validator: validateConfirmPassword, trigger: 'blur' }
                ]
            }
        }
    },
    components: {
        UserHeat
    },
    methods: {
        /** 提交按钮 */
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    updateUserPwd(this.form.oldPassword, this.form.newPassword).then(response => {
                        this.$modal.msgSuccess("修改成功");
                    });
                }
            });
        },
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
