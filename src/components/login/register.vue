<template>
  <div id="background">
    <div id="loginForm">
      <h1 id="title" style="padding-bottom: 10px; color: aliceblue">
        Register
      </h1>
      <span style="color: white">账号</span>
      <el-input
        v-model="username"
        placeholder="请输入内容"
        style="width: 200px"
      ></el-input
      ><br /><br />
      <span style="color: white">密码</span>
      <el-input
        placeholder="请输入密码"
        v-model="password"
        style="width: 200px"
        show-password
      ></el-input>
    </div>
    <div style="text-align: center; margin-left: 30px">
      <br />
      <el-button icon="el-icon-s-custom" @click="register">注册</el-button>
      <el-button icon="el-icon-right" @click="login">已有账号？</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",

  data() {
    return {
      username: "",
      password: "",
      modal12: false,
      formInline: {
        username: "",
        password: "",
      },
      ruleInline: {
        user: [{ required: true, message: "账号不能为空！", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空！", trigger: "blur" },
        ],
      },
    };
  },
  mounted: function () {
    var _this = this;
    document.onkeydown = function (e) {
      let key = window.event.keyCode;
      if (key == 13) {
        window.event.preventDefault(); //关闭浏览器快捷键
        _this.register();
      }
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$fetch("user/register", {
        username: this.username,
        password: this.password,
      }).then((resp) => {
        if (resp.result) {
          this.$message({
            message: resp.message,
            type: "success",
          });
          this.$router.push("/login");
        } else {
          this.$message({
            message: resp.message,
            type: "error",
          });
        }
      });
    },
  },
};
</script>
<style scoped>
/*  正常我们设置的背景图 会自带margin 为8px的属性，也就是我们的背景图会有留白，无法全部铺满，
    需要在主文件下的index.html 设置他的body样式为 margin 为0*/
/*#background{
    text-align: center;
    height: 100%;
    width: 100%;
    background-image: url("../../assets/pexels-raphael-brasileiro-2920849.jpg");
    background-size: 100% 100%;
    position: fixed;

  }*/
#background {
  /*background: rgb(191, 166, 177);*/
  /*background: linear-gradient(227deg, rgba(191, 166, 177, 1) 0%, rgba(167, 213, 235, 1) 49%, rgba(234, 214, 214, 0.9867297260701156) 100%);*/
  background: rgb(191, 166, 177);
  background: linear-gradient(
    227deg,
    rgba(191, 166, 177, 1) 0%,
    rgba(167, 213, 235, 1) 49%,
    rgba(234, 214, 214, 0.9867297260701156) 100%
  );
  /*opacity: 0.1;*/
  height: 100vh;
  width: 100%;
}
#loginForm {
  padding-top: 15%;
}
</style>

