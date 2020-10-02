// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less';

Vue.use(ElementUI);
Vue.use(less);
Vue.config.productionTip = false;
// axios.defaults.withCredentials=true;
//开发环境路径
// axios.defaults.baseURL = 'http://localhost:8088/';
//生产环境路径
axios.defaults.baseURL = 'http://121.196.29.156:8088/';

Vue.prototype.$http=axios;

/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    // 这里的meta就是我们刚刚在路由里面配置的meta, key为登录token验证,未获取到token则强制跳转到登录页面（key需先在登录页面本地存储）
    if (!localStorage.getItem('Authorization')) {

      next({
        path: '/login'
      })
    } else {

      // 无需登录的页面，可以继续访问
      next()
    }
  }
});
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
      config.headers.username = localStorage.getItem('username');
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    console.log(response.data);
    if (response.data.errorCode === '401') {
      alert(response.data.msg);
      localStorage.removeItem("Authorization");
      router.replace('/');

    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
