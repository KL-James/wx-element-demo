// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios';


Vue.prototype.$http = axios;
Vue.use(ElementUI);


Vue.config.productionTip = false;

//路由守卫
router.beforeEach((to, from, next)=>{
  //路由中设置的needLogin字段就在to当中
  if(sessionStorage.getItem("user")){
    if(sessionStorage.getItem("pri") === 'all'){
    if(to.path === '/test' || to.path === '/changeLog'){

      next({path: '/404'});
    }else{
      next();
    }
    }else if(sessionStorage.getItem("pri") === 'yuer'){
      if(to.path === '/test' || to.path === '/yiliao' || to.path === '/changeLog' || to.path === '/yiliaochangeLog' || to.path === '/yuerchangeLog' || to.path === '/rizhao'){

        next({path: '/404'});
      }else{
        next();
      }
    }else if(sessionStorage.getItem("pri") === 'yiliao'){
      if(to.path === '/test' || to.path === '/yuer' || to.path === '/changeLog' || to.path === '/yiliaochangeLog' || to.path === '/yuerchangeLog' || to.path === '/rizhao'){

        next({path: '/404'});
      }else{
        next();
      }
    }else if(sessionStorage.getItem("pri") === 'rizhao'){
      if(to.path === '/test' || to.path === '/yuer' || to.path === '/changeLog' || to.path === '/yiliaochangeLog' || to.path === '/yuerchangeLog' || to.path === '/yiliao'){

        next({path: '/404'});
      }else{
        next();
      }
    }else if(sessionStorage.getItem("pri") === 'test2'){
      if(to.path === '/test'){

        next({path: '/404'});
      }else{
        next();
      }
    }
    // console.log(to.path) //每次跳转的路径
    if(to.path === '/'){
      //登录状态下 访问login.vue页面 会跳到index.vue
      next({path: '/index'});
    }else{
      next();
    }
  }else{
    // 如果没有session ,访问任何页面。都会进入到 登录页
    if (to.path === '/') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
      next();
    } else { // 否则 跳转到登录页面
      next({ path: '/' });
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})
