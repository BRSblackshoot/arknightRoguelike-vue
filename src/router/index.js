import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/main/index.vue'
import roll from '../views/roll/index.vue'
import welcome from '../views/welcome/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    //path:设置该页面的访问路径，访问服务器时默认访问/路径的页面，所以这里等于让用户访问服务器时直接来到这个页面
    path: '/',
    //随便给个名字
    name: 'Main',
    //component:指向具体的页面
    component:Home,
    //设置用户访问这个页面时，浏览器标题
    meta:{
      title:'BRSblackshoot的个人网站'
    },
    //设置挂载在这个页面下的其他页面，会被这个页面的<router-view/>动态渲染
    children: [
      {
        //当地址栏为服务器ip:端口号/welcome时 <router-view/>动态渲染这个component
        path: '/welcome',
        name: 'welcome',
        component:welcome,
        meta:{
          title:'BRSblackshoot的个人网站'
        },
      },
      {
        //访问服务器时默认访问/路径的页面 以后再调整为个人介绍为默认访问 现在先用这个虚拟肉鸽
        path: '/',
        name: 'roll',
        component:roll,
        meta:{
          title:'明日方舟虚拟肉鸽'
        },
      },

    ]
  }
  // {
  //   path: '/',
  //   name: 'roll',
  //   component: () => import('../views/roll/index.vue'),
  //   meta:{
  //     title:'明日方舟-演习券碎纸机'
  //   }
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//路由守护route.beforeEach的位置必须写在const router = new VueRouter之后
router.beforeEach((to, form, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'arknight-ui' //此处写默认的title
  }
  next()
});

export default router
