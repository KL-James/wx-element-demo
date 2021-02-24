<template >
<div >
    <div class="login-container"  >
        <el-form  :model="ruleForm2" :rules="rules2"
         status-icon
         ref="ruleForm2"
         label-position="left"
         label-width="0px"
         class="demo-ruleForm login-page">
            <h3 class="title" style="text-align:center">微信管理系统</h3>
            <el-form-item prop="username">
                <el-input type="text"
                    v-model="ruleForm2.username"
                    auto-complete="off"
                    placeholder="用户名"
                    prefix-icon="el-icon-user"
                ></el-input>
            </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password"
                        v-model="ruleForm2.password"
                        auto-complete="off"
                        placeholder="密码"
                        prefix-icon="el-icon-lock"
                    ></el-input>
                </el-form-item>

            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining"  v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
            </el-form-item>
        </el-form>
    </div>

    </div>
</template>

<script>
import qs from 'qs';
export default {
    data(){
        return {
            logining: false,
            fullscreenLoading: false,
            ruleForm2: {
                username: '',
                password: '',
            },
            rules2: {
                username: [{required: true, message: '请输入你的账号！', trigger: 'blur'}],
                password: [{required: true, message: '请输入你的密码！', trigger: 'blur'}]
            },

        }
    },
    methods: {
        handleSubmit(event){
            this.$refs.ruleForm2.validate((valid) => {
                if(valid){
                    this.fullscreenLoading = true;
                    this.logining = true;
                    //登录请求
                    this.$http.post("http://www.yierjia.net/web/baidutg/login.php",
                    qs.stringify(this.ruleForm2),
                    {emulateJSON: true})
                    .then(res =>{
                      console.log(res);
                      if(res.data.code === 1){
                         setTimeout(() => {
                         this.fullscreenLoading = false;
                         this.logining = false;
                         this.$message.error(res.data.message);

                         }, 500);
                      }else if(res.data.code === 2){
                        //登录成功
                        setTimeout(() => {
                         this.fullscreenLoading = false;
                         this.logining = false;
                         this.$message.success(res.data.message);
                         sessionStorage.setItem('user', res.data.name);
                         sessionStorage.setItem('pri', res.data.pri);
                         this.$router.push({path: '/index'});
                         }, 500);
                      }else if(res.data.code === 0){
                        setTimeout(() => {
                         this.fullscreenLoading = false;
                         this.logining = false;
                         this.$message.error(res.data.message);

                         }, 500);
                      }
                    })

                }else{
                    console.log('error submit!');
                    return false;
                }
            })
        }
    }
};
</script>

<style scoped>

.login-container {
    width: 100%;
    height: 100%;

}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>
