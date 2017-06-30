import Vue from 'vue'
import Vuex from 'vuex'
import App from './house'
import store from '../../vuex/store'
import FastClick from 'fastclick'
FastClick.attach(document.body)
window.scroll(0,0)
Vue.use(Vuex)
new Vue({
	store:store,
	el:'body',
	components: {App}
})
