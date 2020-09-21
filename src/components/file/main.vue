<template>
  <div>
    <el-row>
      <el-col>
        <h1 style="float: left; padding-left: 12vh">百度网盘</h1>
        <div style="padding-top: 3vh; padding-left: 170vh">
          <el-dropdown>
          <span class="el-dropdown-link">
            Elusive
            <i class="el-icon-arrow-down el-icon-user-solid"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">登录</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </el-col>

    </el-row>


    <el-row class="tac">
      <el-col :span="4">
        <h5>Learn More, Unknown More.</h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>全部文件</span>
            </template>
            <el-menu-item-group>
              <router-link to="/allFile">
                <el-menu-item index="1-1">
                  <span style=" text-decoration: none; color: #2c3e50">全部文件</span>
                </el-menu-item>
              </router-link>
              <router-link to="/imageFile">
                <el-menu-item index="1-2">
                  <span style=" text-decoration: none; color: #2c3e50">图片</span>
                </el-menu-item>
              </router-link>
              <el-menu-item index="1-3">
                音乐
              </el-menu-item>
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

      <el-col span="20">




        <el-row>
          <router-view></router-view>
        </el-row>

      </el-col>

    </el-row>

  </div>

</template>

<script>
  let Authorization =  localStorage.getItem('Authorization');
  let username =  localStorage.getItem('username');
  export default {
    name: "main",
    data() {
      return {
        importHeaders: {'Authorization': Authorization,'username':username}
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
      handleChange(file) {
        this.$refs.upload.clearFiles();
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      test() {
        this.$ajax.get('http://localhost:8088/test')
          .then(resp => {

          }).catch(err => {
          console.log(err)
        })
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
</style>
