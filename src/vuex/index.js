import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
Vue.use(Vuex);

const  state = {
  isLogin: true, // 判断是否已经登录,
  lang: 'zh',
  collapse: false //控制左侧菜单是否折叠
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
