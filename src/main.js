// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less';
import AudioPlayer from '@liripeng/vue-audio-player';
import '@liripeng/vue-audio-player/lib/vue-audio-player.css';
import {post,fetch,patch,put} from './utils/http';

Vue.use(AudioPlayer);
Vue.use(ElementUI);
Vue.use(less);
Vue.config.productionTip = false;
// axios.defaults.withCredentials=true;
//开发环境路径
// axios.defaults.baseURL = 'http://localhost:8088/';
//生产环境路径
// axios.defaults.baseURL = 'http://121.196.29.156:8088/';

Vue.prototype.$http=axios;
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

/* eslint-disable no-new */






new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
