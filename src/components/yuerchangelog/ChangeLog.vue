<template>
<div style="max-width:80%;margin: 1% auto;">
  <el-table
  :default-sort = "{prop: 'date', order: 'descending'}"
   v-loading="companyLoading"
    height="500"
     :data="tableData"
    style="width: 100%">
    <el-table-column
      sortable
      fixed
      :sort-method="(a,b)=>{return a.id - b.id}"
      label="日期"
      prop="date"
       width="180">
    </el-table-column>
    <el-table-column
      label="修改人"
      prop="username"
       width="120">
    </el-table-column>
    <el-table-column
      label="页面链接"
      prop="link"
       width="320">
    </el-table-column>
     <el-table-column
      prop="pastwx"
      label="修改前微信号"
      width="250">
    </el-table-column>
    <el-table-column
      prop="nowwx"
      label="修改后微信号"
      width="300">
    </el-table-column>

  </el-table>
</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        companyLoading: true,
      }
    },
    methods:{
      findwxlogList(){
        //请求资质列表
      this.$http.get('/api/web/baidutg/start/yuer_loglist.php').then(res => {
          this.tableData = res.data;
          this.companyLoading = false;
        })
    }
    },
    created(){
      this.findwxlogList();

    }
  }
</script>

<style>

</style>
