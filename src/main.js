import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//导入element ui样式  使用import导入后需要使用element ui  Vue.use(ElementUI)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
//使用element
Vue.use(ElementUI)

import 'normalize.css/normalize.css'

//导入一些图标样式 基于https://gitee.com/cnovel/e-icon-picker
import eIconPicker from 'e-icon-picker';
import "e-icon-picker/lib/symbol.js"; //基本彩色图标库
import 'e-icon-picker/lib/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库
import 'element-ui/lib/theme-chalk/icon.css'; //element-ui 图标库
//使用图标样式
Vue.use(eIconPicker, {
  FontAwesome: true,
  ElementUI: true,
  eIcon: true,//自带的图标，来自阿里妈妈
  eIconSymbol: true,//是否开启彩色图标
  addIconList: [],
  removeIconList: [],
  zIndex: 3100//选择器弹层的最低层,全局配置
});

import VueTouch from "vue-touch";

Vue.use(VueTouch, {name:'v-touch'});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
