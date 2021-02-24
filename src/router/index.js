import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/login/Login'
import List from '@/components/user/List'
import ChangeLog from '@/components/changelog/ChangeLog'
import YuerChangeLog from '@/components/yuerchangelog/ChangeLog'
import YiliaoChangeLog from '@/components/yiliaochangelog/ChangeLog'
import Yiliao from '@/components/yiliao/Yiliao'
import Yuer from '@/components/yuer/Yuer'
import Rizhao from '@/components/rizhao/Rizhao'
import Test from '@/components/test/test'
import Test2 from '@/components/test2/test2'
import Error from '@/components/Error/404'

Vue.use(Router)
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)

}


export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      name:'login',
      component: Login,
      meta: {
        keepAlive: false,
        needLogin: false
      }
    },
    {
      path: '/index',
      name:'index',
      component: Index,
      meta: {
        keepAlive: true,
        needLogin: true
      }
    },
    {
      path: '/userList',
      component: List,
      meta: {
        keepAlive: true,
        needLogin: true
      }
    },

    {
      path: '/changeLog',
      component: ChangeLog,
      meta: {
         keepAlive: true,
        needLogin: true
      }
    },
    {
      path: '/yiliaochangeLog',
      component: YiliaoChangeLog,
      meta: {
         keepAlive: true,
        needLogin: true
      }
    },
    {
      path: '/yuerchangeLog',
      component: YuerChangeLog,
      meta: {
         keepAlive: true,
        needLogin: true
      }
    },
    {
      path: '/yiliao',
      component: Yiliao,
      meta: {
         keepAlive: true,
        needLogin: true
      }
    },
    {
      path: '/yuer',
      component: Yuer,
      meta: {
         keepAlive: true,
        needLogin: true
      }
    },
    {
      path: '/rizhao',
      component: Rizhao,
      meta: {
         keepAlive: true,
        needLogin: true
      }
    },
    {
      path: '/test',
      component: Test,
      meta: {
         keepAlive: true,
        needLogin: true
      }
    },
    {
      path: '/test2',
      component: Test2,
      meta: {
         keepAlive: true,
        needLogin: true
      }
    },
    {
      path: '/404',
      component: Error,
      meta: {
         keepAlive: true,
        needLogin: true
      }
    }

  ]
})
