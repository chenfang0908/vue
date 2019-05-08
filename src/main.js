import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui';
import http from './utils/http';
import Scroll from '@/directive/scroll';
import infiniteScroll from 'vue-infinite-scroll';
Vue.use(infiniteScroll)

import '../theme/index.css';
import '@/assets/css/element.less';

import FullCalendar from 'vue-full-calendar';
import '@/assets/css/fullcalendar.css';
Vue.use(FullCalendar)

Vue.use(ElementUI);
Vue.use(http);
Vue.use(Scroll);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
