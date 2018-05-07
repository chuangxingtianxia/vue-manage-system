import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueProgressBar from 'vue-progressbar';  // 进度条
import store from './vuex/index'
import App from './App';
import router from './router';

Vue.use(ElementUI,{ size: 'small' });
Vue.use(VueProgressBar, { // 进度条
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
});
Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
