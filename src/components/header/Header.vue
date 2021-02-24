<template>
  <div>
    <el-container>
      <el-header>
        <!--导航菜单-->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/index">主页</el-menu-item>
          <el-submenu v-if="changeLog" index="9" >
              <template  slot="title" >日志查看</template>
              <!-- <el-menu-item v-if="changeLog" index="/yuerChangeLog" >育儿日志</el-menu-item>
              <el-menu-item v-if="changeLog" index="/yiliaoChangeLog" >医疗日志</el-menu-item> -->
              <el-menu-item v-if="changeLogtest" index="/changeLog">测试日志</el-menu-item>

          </el-submenu>

          <!-- <el-menu-item v-if="yuer" index="/yuer">育儿</el-menu-item>
          <el-menu-item v-if="yiliao" index="/yiliao">医疗</el-menu-item>
          <el-menu-item v-if="rizhao" index="/rizhao">日照</el-menu-item> -->
          <el-menu-item v-if="test" index="/test">1级测试入口</el-menu-item>
          <el-menu-item v-if="test2" index="/test2">2级测试入口</el-menu-item>
          <el-submenu index="10">
              <template  slot="title">{{username}}</template>
              <el-menu-item @click="logoutSubmit" >登出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>


      </el-container>
  </div>
</template>

<script>
export default {
data() {
      return {
        yuer:true,
        yiliao:true,
        changeLog:true,
        test:true,
        rizhao:true,
        changeLogtest:true,
        test2:true,
       activeIndex:this.$route.path,
       username:sessionStorage.getItem("user")
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.$router.push(key);
      },
  logoutSubmit(){
      sessionStorage.clear("user"); //清除 sessionStorage 对象所有的项。
      this.$router.push("/login");
  }
    },
    created(){
      if(sessionStorage.getItem("pri") == 'yiliao'){
        this.yuer = this.rizhao =  this.changeLog  = this.test = false;
      }else if(sessionStorage.getItem("pri") == 'yuer'){
        this.yiliao = this.rizhao =  this.changeLog = this.test = false;
      }else if(sessionStorage.getItem("pri") == 'rizhao'){
        this.yiliao = this.yuer =  this.changeLog = this.test = false;
      }else if(sessionStorage.getItem("pri") == 'all'){
       this.test = this.changeLogtest =false;
      }else if(sessionStorage.getItem("pri") == 'test2'){
       this.test = this.changeLogtest =this.changeLog =false;
      }
    }
}
</script>

<style>

</style>
