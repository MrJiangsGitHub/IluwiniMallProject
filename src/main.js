import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'
import Vant from 'vant';
import 'vant/lib/index.css';
import './asster/scss/normalize.css'
import'../src/asster/scss/common.scss';

import { Lazyload } from 'vant';
Vue.use(Vant);
Vue.use(Lazyload, {
  lazyComponent: true,
});
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')