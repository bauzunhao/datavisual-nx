<template>
    <div class="app">
        <UserHeat message="实名认证"/>
        <div class="cont">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="form.realname" placeholder="请输入真实姓名"/>
                </el-form-item>
                <el-form-item label="身份证号码" prop="certificateNumber">
                    <el-input v-model="form.certificateNumber" placeholder="请输入身份证号码"/>
                </el-form-item>
                <el-form-item label="身份证正面" prop="certificateFrontal">
                    <image-upload v-model="form.certificateFrontal" :limit="1" :file-size="50"/>
                </el-form-item>
                <el-form-item label="身份证反面" prop="certificateReverse">
                    <image-upload v-model="form.certificateReverse" :limit="1" :file-size="50"/>
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
import {getDetail, updateUser} from "@/api/grid/user";

export default {
    name: "info",
    data() {
        return {
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                realname: [
                    {required: true, message: "用户姓名不能为空", trigger: "blur"}
                ],
                certificateNumber: [
                    {required: true, message: "用户身份证号码不能为空", trigger: "blur"}
                ],
                certificateFrontal: [
                    {required: true, message: "请选择上传身份证正面照片", trigger: "blur"}
                ],
                certificateReverse: [
                    {required: true, message: "请选择上传身份证反面照片", trigger: "blur"}
                ]
            }
        }
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
                        certificateNumber: userData.certificateNumber,
                        certificateFrontal: userData.certificateFrontal,
                        certificateReverse: userData.certificateReverse
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
    },
    components: {
        UserHeat
    }
}
</script>

<style scoped lang="scss">
.app {
    .cont {
        padding: 20px 20px;

        .id-upload-container {
            text-align: center;
        }

        .el-upload {
            width: 100px;
            height: 100px;
        }

        .el-upload i {
            font-size: 28px;
            color: #8c939d;
        }
    }
}
</style>
