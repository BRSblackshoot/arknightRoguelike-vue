import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'roll',
    component: () => import('../views/roll/index.vue'),
    meta:{
      title:'明日方舟-演习券碎纸机'
    }
  }
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
