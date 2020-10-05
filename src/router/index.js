import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import DiskMain from '@/components/file/diskMain'
import AllFile from '@/components/file/allFile'
import ImageFile from '@/components/file/imageFile'
import ImageTimeLine from '@/components/file/image/imageTimeLine'
import ImageRecent from '@/components/file/image/imageRecent'
import ImageSearch from '@/components/file/image/imageSearch'
import MusicFile from '@/components/file/musicFile'

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
      path: "/diskMain",
      name: "diskMain",
      component: DiskMain,
      children: [
        {
          path: "/allFile",
          component: AllFile
        },
        {
          path: "/imageFile",
          component: ImageFile,
          children: [
            {
              path: "/imageTimeLine",
              component: ImageTimeLine

            },
            {
              path: "/imageRecent",
              component: ImageRecent
            },
            {
              path: "/imageSearch",
              component: ImageSearch
            }
          ]

        },
        {
          path: "/musicFile",
          component: MusicFile
        }
      ]
    },




  ]
});


