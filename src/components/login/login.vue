<template>
  <div id="background">
    <div id="loginForm">
      <h1 id="title" style="  padding-bottom: 10px; color: aliceblue">Login</h1>
      <span style="color: white;">账号</span> <el-input v-model="username" placeholder="请输入内容" style="width: 200px"></el-input><br><br>
      <span style="color: white;">密码</span> <el-input placeholder="请输入密码" v-model="password" style="width: 200px" show-password></el-input>
    </div>
    <div style="text-align: center; margin-left: 30px">
      <br>
      <el-button   icon="el-icon-right"  @click="login" >登录</el-button>
      <el-button   icon="el-icon-s-custom"  @click="register">注册</el-button>
    </div>

  </div>

</template>
<script>
  export default {
    name: "Login",

    data () {
      return {
        username: '',
        password: '',
        modal12: false,
        formInline: {
          username: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '账号不能为空！', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空！', trigger: 'blur' },
          ]
        }

      }
    },

    methods: {

      login(){
       /*this.$http.get('http://localhost:8088/login?username='+this.username+'&password='+this.password)
        .then( resp => {
          console.log(resp.data.status ==='0');
          console.log(resp);
          if(resp.data.status === '0'){
            this.$message({
              message: resp.data.msg,
              type: 'error'
            });
          }else{
            this.$message({
              message: resp.data.msg,
              type: 'success'
            });

            localStorage.setItem("Authorization",resp.data.data.token);
            localStorage.setItem("username",resp.data.data.username);
            this.$router.push('/main');
          }

        }).catch(err => {
          console.log(err)
        })*/
        this.$http({
          method:"post",
          url: "http://localhost:8088/user/login",
          data: {
            username: this.username,
            password: this.password
          }

        }).then(resp => {  //响应结果
          localStorage.removeItem("Authorization");
          console.log(resp.data.status ==='0');
          console.log(resp);
          if(resp.data.status === '0'){
            this.$message({
              message: resp.data.msg,
              type: 'error'
            });
          }else{
            this.$message({
              message: resp.data.msg,
              type: 'success'
            });

            localStorage.setItem("Authorization",resp.data.data.token);
            localStorage.setItem("username",resp.data.data.username);
            this.$router.push('/diskMain');
          }


        }).catch(err => {
          this.$message({
            message: '请求失败：请检查服务是否可用',
            type: 'error'
          });
        });
      },
      register(){
        this.$router.push("/register");
      }
    }
  }
</script>
<style scoped>
/*  正常我们设置的背景图 会自带margin 为8px的属性，也就是我们的背景图会有留白，无法全部铺满，
  需要在主文件下的index.html 设置他的body样式为 margin 为0*/
  #background{
    text-align: center;
    height: 100%;
    width: 100%;
    background-image: url("../../assets/pexels-raphael-brasileiro-2920849.jpg");
    background-size: 100% 100%;
    position: fixed;

  }
  #loginForm{
    padding-top: 15%;
  }



</style>

