<template>
  <div id="backgru">
    <el-row>
      <el-col>

        <h1 style="float: left; padding-left: 4vh"><i class="el-icon-moon-night"></i> MoonDisk</h1>
        <div style="padding-top: 3vh; padding-left: 170vh">
          <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-arrow-down el-icon-user-solid"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-top" command="login">登出</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus" command="register">注册</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </el-col>

    </el-row>


    <el-row class="tac">
      <div id="tabs">
        <el-col :span="4">
          <h5>Learn More, Unknown More.</h5>
          <el-menu
            default-active="1-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span>首页</span>
              </template>
              <el-menu-item-group>
                <router-link to="/allFile">
                  <el-menu-item index="1-1">
                    <span style=" text-decoration: none; ">全部文件</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/imageFile">
                  <el-menu-item index="1-2">
                    <span style=" text-decoration: none; ">图片</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/musicFile">
                  <el-menu-item index="1-3">
                    音乐
                  </el-menu-item>
                </router-link>
                <el-menu-item index="1-4">
                  文档
                </el-menu-item>
              </el-menu-item-group>

            </el-submenu>

            <el-menu-item index="2">
              <i class="el-icon-delete"></i>
              <span slot="title">回收站</span>
            </el-menu-item>

          </el-menu>
        </el-col>
      </div>
      <el-col :span="20">


        <el-row>
          <router-view></router-view>
        </el-row>

      </el-col>

    </el-row>

  </div>

</template>

<script>
  let Authorization = localStorage.getItem('Authorization');
  let username = localStorage.getItem('username');
  export default {
    name: "diskMain",
    data() {
      return {
        importHeaders: {'Authorization': Authorization, 'username': username},
        username:localStorage.getItem('username')
      };
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleCommand(command){
        if (command === 'login'){
          this.$router.push("/login");
        }else if (command === 'register'){
          this.$router.push("/register");
        }
      }
    }
  }

</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }

  #backgru {
    /*background: rgb(191, 166, 177);
    background: linear-gradient(227deg, rgba(191, 166, 177, 1) 0%, rgba(167, 213, 235, 1) 49%, rgba(234, 214, 214, 0.9867297260701156) 100%);
    !*opacity: 0.1;*!
    height: 100vh;*/
    width: 100%;

  }

  #backgru >>> .el-menu {
    background-color: transparent;
  }

  #backgru >>> .el-button {
    background-color: transparent;
  }


</style>
