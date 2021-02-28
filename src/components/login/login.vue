<template>
  <div id="background">
    <div id="loginForm">
      <h1 id="title" style="padding-bottom: 10px; color: aliceblue">Login</h1>
      <span style="color: white">账号</span>
      <el-input
        v-model="username"
        placeholder="请输入内容"
        style="width: 200px"
      ></el-input>
      <br /><br />
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
      <el-button icon="el-icon-right" @click="login">登录</el-button>
      <el-button icon="el-icon-s-custom" @click="register">注册</el-button>
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
  methods: {
    register() {
      this.$router.push("/register");
    },
    login() {
      this.$fetch("user/login", {
        username: this.username,
        password: this.password,
      }).then((resp) => {
        console.log(resp.data);
        if (resp.result) {
          this.$message({
            message: resp.message,
            type: "success",
          });
          localStorage.setItem("username", resp.data);
          this.$router.push("/allFile");
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
#background {
  background: rgb(191, 166, 177);
  background: linear-gradient(
    227deg,
    rgba(191, 166, 177, 1) 0%,
    rgba(167, 213, 235, 1) 49%,
    rgba(234, 214, 214, 0.9867297260701156) 100%
  );
  height: 100vh;
  width: 100%;
}

#loginForm {
  padding-top: 15%;
}
</style>

