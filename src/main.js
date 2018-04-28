// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueEditor from 'vue-ueditor'
import VueLazyLoad from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css?12'
import './assets/css/total.css'
import './assets/font/iconfont.css'
import './assets/icon/iconfont.css'
import './assets/css/animate.min.css'
import Vuex from 'vuex'
import {Loading,Message,MessageBox} from 'element-ui';
import './assets/js'//引入全局js
import './assets/requestApi'
import errorImg from './assets/images/error.jpg'
import loadingImg from './assets/images/loading.gif'
import store from './vuex/store';
import Crypto from 'crypto';
Vue.config.productionTip = false
Vue.component('VueEditor',VueEditor)
var moment = require('moment');
Vue.prototype.moment = moment;
Vue.use(ElementUI)
Vue.use(Vuex);
Vue.use(Crypto);
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: errorImg,
  loading: loadingImg,
  attempt: 1
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },//注册组件  index.html中的body的id为app的才能使用
  // beforeCreate:function () {
  //   router.push('/login')
  // }
})
