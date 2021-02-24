<template>
<div>
  <!--资质列表-->
<div style="max-width:80%;margin: 1% auto;">
  <el-table
   v-loading="companyLoading"
    :row-class-name="tableRowClassName"
    :data="tableData.filter(data => !search || data.company_name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="id"
      prop="id">
    </el-table-column>
    <el-table-column
      label="主域名"
      prop="domain">
    </el-table-column>
    <el-table-column
      label="资质名"
      prop="company_name">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入资质名关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          @click="dialogTableVisible = true,handleEdit(scope.$index, scope.row)">查看</el-button>

        <el-button
          size="mini"
          @click="dialogPageVisible = true,handleTest(scope.$index, scope.row)"
          >操作</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button style="margin-top: 10px" size="mini" type="success" @click="dialogFormVisible = true">添加</el-button>
</div>

<div><!--具体链接列表-->
<el-dialog :title="this.gridDatatitle + '---查看微信号'" :visible.sync="dialogTableVisible">
   <el-dialog

      :title="this.ruleForm.link +' ---修改微信号'"
      :visible.sync="innerVisible"
      append-to-body>

<el-form ref="ruleForm" :model="ruleForm" :rules="rules" size="mini" v-loading="pageLoading">
  <el-form-item label="微信号：(多个微信号之间用 , 分隔)" prop="wxnumber">
    <br>
    <el-input v-model="ruleForm.wxnumber" style="width:500px"></el-input>
  </el-form-item>

   <el-form-item label="老师名：(没有可以不填)" >
    <br>
    <el-input v-model="ruleForm.tname" style="width:500px"></el-input>
  </el-form-item>

<div  v-if="mens">
  <el-time-select
    placeholder="起始时间"
    v-model="ruleForm.startTime"
    :picker-options="{
      start: '00:00',
      step: '01:00',
      end: '23:00'
    }">
  </el-time-select>
  --
  <el-time-select
    placeholder="结束时间"
    v-model="ruleForm.endTime"
    :picker-options="{
      start: '00:00',
      step: '01:00',
      end: '23:00',
      minTime: ruleForm.startTime
    }">
  </el-time-select>
  <br> <br>
    <el-select v-model="ruleForm.pageurl" placeholder="请选择选项" style="margin-bottom:10px">
      <el-option label="A页面" value="./a/"></el-option>
      <el-option label="B页面" value="./b/"></el-option>
    </el-select>
</div>



  <el-form-item size="large">
    <el-button type="primary" @click="onSubmit('ruleForm')">立即提交</el-button>
    <el-button @click="innerVisible = false,resetForm('ruleForm')">取 消</el-button>
  </el-form-item>
</el-form>

    </el-dialog>
  <el-table
   v-loading="pageLoading"

  :data="gridData">
    <el-table-column width="50" property="id" label="id" ></el-table-column>
    <el-table-column label="页面链接">
       <template slot-scope="scope">
        <a :href="scope.row.link" target="_blank" class="buttonText">{{scope.row.link}}</a>
      </template>
    </el-table-column>
    <el-table-column property="wxnumber" label="微信号" ></el-table-column>
    <el-table-column label="操作" width="120">
      <template slot-scope="scope">
       <el-button
          size="mini"
          type="primary" round
          @click="innerVisible = true,changewx(scope.$index, scope.row)"
          >修改微信号</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-dialog>
</div>


<div><!--添加新资质列表-->
<el-dialog  title="添加新资质" :visible.sync="dialogFormVisible">

  <el-form ref="comform" :model="comform" label-width="80px">
    <el-form-item label="资质名" prop="name">
      <el-input v-model="comform.name"></el-input>
    </el-form-item>

  <el-form-item label="主域名" prop="domain">
    <el-input v-model="comform.domain"></el-input>
  </el-form-item>

   <el-form-item>
     <el-popconfirm
  confirm-button-text='是的'
  cancel-button-text='不用了'
  icon="el-icon-info"
  icon-color="red"
  title="确定要添加吗？"
  @confirm="open"
>
  <el-button type="primary"  slot="reference">添加</el-button>
</el-popconfirm>
    <el-button @click=" dialogFormVisible = false,resetForm('comform')">取消</el-button>
</el-form-item>
  </el-form>
</el-dialog>

</div>

<div><!--资质下添加页面列表-->
<el-dialog  :title="pageform.domain + ' 添加新页面'" :visible.sync="dialogPageVisible">

  <el-form ref="pageform" :model="pageform" label-width="80px">
    <el-form-item label="页面链接" prop="link">
      <el-input v-model="pageform.link"></el-input>
    </el-form-item>

  <el-form-item label="微信号" prop="wxnumber">
    <el-input v-model="pageform.wxnumber"></el-input>
  </el-form-item>

   <el-form-item label="是否双页面" prop="ischange" label-width="100px">
  <el-select v-model="pageform.ischange" placeholder="请选择选项" style="margin-bottom:10px">
      <el-option label="是" value="1"></el-option>
      <el-option label="否" value="0"></el-option>
    </el-select>
  </el-form-item>

   <el-form-item>
         <el-popconfirm
  confirm-button-text='是的'
  cancel-button-text='不用了'
  icon="el-icon-info"
  icon-color="red"
  title="确定要添加吗？"
  @confirm="opencc"
>
  <el-button type="primary"  slot="reference">添加</el-button>
</el-popconfirm>
    <el-button @click=" dialogPageVisible = false,resetForm('pageform')">取消</el-button>
  </el-form-item>
  </el-form>
</el-dialog>

</div>

</div>
</template>

<script>
import qs from 'qs';
export default {
   data() {
      return {
        mens:false,
        tableData: [],//资质列表
        gridData:[],//资质下的具体链接列表

        gridDatatitle:"",
        gridDomain:"",
        innerVisible: false,//修改微信页面默认不显示
        search: '',
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogPageVisible: false,
        ruleForm: {//修改微信号表单
          link:'',
          wxnumber: '',
          startTime: '',
          endTime: '',
          pageurl: '',
          username: '',
          tname: '',
        },

        rules: {
                wxnumber: [{required: true, message: '请输入微信号！', trigger: 'blur'}],

        },
        comform: {//提交新资质表单
          name: '',
          domain:''
        },
        pageform: {//提交新链接表单
          link: '',
          wxnumber:'',
          domain:'',
          ischange:''
        },
      companyLoading: true,
      pageLoading: true,
      }
    },
    methods: {
      //请求 查看微信号 页面
      handleEdit(index, row) {
      this.gridDatatitle = row.domain;
        this.pageLoading = true;
          this.$http.get('http://www.yierjia.net/web/baidutg/test.php',{params:{domain:row.domain}}).then(res => {
            this.gridData = res.data;
             this.pageLoading = false;
        })
      },
      //自己写的 拿来调用的 刷新 查看微信号 页面的方法
      resetLinkPage(e) {
        this.pageLoading = true;
          this.$http.get('http://www.yierjia.net/web/baidutg/test.php',{params:{domain:e}}).then(res => {
            this.gridData = res.data;
             this.pageLoading = false;
        })
      },
      //打开修改微信界面
      changewx(index, row){
        console.log(index, row);
        this.ruleForm.link = row.link
        //请求 是否 显示 双页面选项
        this.pageLoading = true;
         this.$http.get('http://www.yierjia.net/web/baidutg/check.php',{params:{link:row.link}}).then(res => {
           console.log(res.data[0].ischange)
           if(res.data[0].ischange === "1"){
            this.mens = true;
            this.ruleForm.wxnumber = res.data[0].wxnumber;
            this.ruleForm.tname = res.data[0].tname;
            this.ruleForm.startTime = res.data[0].start;
            this.ruleForm.endTime = res.data[0].end;
            this.ruleForm.pageurl = res.data[0].pageurl;
            this.pageLoading = false;
           }else{
            this.mens = false;
            this.ruleForm.wxnumber = res.data[0].wxnumber;
            this.ruleForm.tname = res.data[0].tname;
            this.pageLoading = false;
           }


        })
      },
      //
      handleTest(index, row){
        console.log(index, row, row.domain);
        this.pageform.domain = row.domain;

      },
      //修改微信号方法(请求)
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          this.$http.post("http://www.yierjia.net/web/baidutg/changewx.php",
          qs.stringify(this.ruleForm),
          {emulateJSON: true})

          .then(res =>{
              this.$message({
              message: '(￣▽￣)' + res.data,
              type: 'success'
              });
              //清空表单信息
              this.resetForm('ruleForm');
              //隐藏表单
              this.innerVisible = false;
              //重新请求
              this.resetLinkPage(this.gridDatatitle);
          })
          //
          .catch(err => {
          console.log(err)
          this.$message.error('添加失败');
          }
          );
          //记录微信修改日志
            this.ruleForm.username = sessionStorage.getItem("user");

          this.$http.post("http://www.yierjia.net/web/baidutg/changewxlog.php",
          qs.stringify(this.ruleForm),
          {emulateJSON: true})

          .then(res =>{
            console.log('提交日志请求状态'+ res.data);
          })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消提交并重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //
      open() {

          //添加新资质
          this.$http.post("http://www.yierjia.net/web/baidutg/company.php",
          qs.stringify(this.comform),
          {emulateJSON: true})

          .then(res =>{
            console.log('提交新资质请求状态'+ res.data);
              this.$message({
              message: '(￣▽￣)' + res.data,
              type: 'success'
              });
              //清空表单信息
              this.comform = {};
              //隐藏表单
              this.dialogFormVisible = false;
              //重新请求
               this.findCompanyList();
          })
          //
          .catch(err => {
          console.log(err)
          this.$message.error('添加失败');
          }
          );
      },
        opencc() {

           //添加新页面
          this.$http.post("http://www.yierjia.net/web/baidutg/line.php",
          qs.stringify(this.pageform),
          {emulateJSON: true})

          .then(res =>{
            console.log('提交新页面请求状态'+ res.data);
              this.$message({
              message: '(￣▽￣)' + res.data,
              type: 'success'
              });
               //清空表单信息
              this.pageform = {};
              //隐藏表单
              this.dialogPageVisible = false;
          })

          .catch(err => {
          console.log(err)
          this.$message.error('添加失败');
          }
          );

      },

      findCompanyList(){ //请求资质列表
      this.$http.get('http://www.yierjia.net/web/baidutg/linklist.php').then(res => {
          this.tableData = res.data;
          this.companyLoading = false;
        })
    },
          tableRowClassName({row, rowIndex}) {
        if (rowIndex%2=== 1)  //=>这里可以改成 rowIndex%2=== 1，后面直接else即可达到隔行变色效果。
        {
          return 'warning-row';
        } else {
          return 'success-row';
        }
        return '';
      }
    },

    created(){
      this.findCompanyList();

    }
}
</script>

<style>
  .el-table .warning-row {
   background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
