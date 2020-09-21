import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import Main from '@/components/file/main'
import AllFile from '@/components/file/allFile'
import ImageFile from '@/components/file/imageFile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/main",
      name: "main",
      component: Main,
      children:[
        {
          path:"/allFile",
          component:AllFile
        },
        {
          path:"/imageFile",
          component:ImageFile
        }
      ]
    }
  ]
});


