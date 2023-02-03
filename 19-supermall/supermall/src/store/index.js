import Vue from 'vue'
import Vuex from 'vuex'

import getters from "./getters";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import modules from "@/store/modules";

Vue.use(Vuex)

const state = {
  cartList:[] //将商品信息用数组存起来
  }

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  getters
})
export default store;