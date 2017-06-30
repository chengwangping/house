import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './action';
import modules from './modules';
import createLogger from 'vuex/logger';

Vue.use(Vuex);
Vue.config.debug = true;
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules:{
    modules,
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
})
