<template>
  <div class="app-container">
    <el-form :model="formData" :rules="rules" :inline="true" ref="form" size="small" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="视频会议URL" prop="videoUrl">
            <el-input style="width: 360px" v-model.trim="formData.videoUrl" maxlength="200" placeholder="请输入视频会议URL"/>
          </el-form-item>
          <el-form-item label="" prop="defaultEnable">
            <el-checkbox v-model="formData.defaultEnable">默认开启视频</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="padding-left: 10%;">
          <el-form-item>
            <el-button type="primary" @click="submitForm">保 存</el-button>
            <el-button @click="reset">重 置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
    import { loadData, saveConfig} from "@/api/backstage/linkage/video";

    export default {
        name: "Video",
        data() {
            return {
                formData: {
                    videoUrl: null,
                    defaultEnable: false
                },
                // 表单校验
                rules: {
                    videoUrl: [
                        {required: true, message: "视频URL地址不允许为空", trigger: "blur"}
                    ]
                }
            };
        },
        created() {
            this.openLoading();
            this.getData();
        },
        methods: {
            // 打开加载层
            openLoading() {
                this.$modal.loading("正在加载数据，请稍候！");
            },
            getData() {
                loadData().then(response => {
                    this.$modal.closeLoading();
                    if (response && response.data) {
                        var arr = response.data.split("||");
                        this.formData.videoUrl = arr[1];
                        this.formData.defaultEnable = JSON.parse(arr[0]);
                    }
                });
            },
            submitForm() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        this.openLoading();
                        var data = this.formData.defaultEnable + "||" + this.formData.videoUrl;
                        saveConfig(data).then(response => {
                            this.$modal.msgSuccess("保存成功");
                            this.getData();
                        });
                    }
                });
            },
            reset() {
                this.openLoading();
                this.getData();
            }
        }
    };
</script>
