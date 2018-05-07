import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/common/Home'
import page404 from '@/components/page/page404'
import page403 from '@/components/page/page403'
import login from '@/components/page/Login'

Vue.use(Router)

const router= new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component:Home,
            meta: { title: '首页' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                }
               
            ]
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/404',
            component: page404
        },
        {
            path: '/403',
            component: page403
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})

//使用钩子函数对路由进行是否登陆跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if(!role && to.path !== '/login'){
        next('/login');
    }else{
      next();
    }
})

export default router;