<template>
  <div>
    <el-row>
      <router-link to="/imageTimeLine">
        <el-button size="medium" style="float: left; margin-left: 1vh" @click="viewBind0">时光轴
        </el-button>
      </router-link>
      <router-link to="/imageRecent">
        <el-button size="medium" style="float: left; margin-left: 2vh" @click="viewBind1">最近上传
        </el-button>
      </router-link>

      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 100vh">
        <el-form-item >
          <el-input style="width: 250px" v-model="formInline.keyWord" placeholder="条件:日期:yyyy-MM-dd,名称:xxx"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="searchImage">查询</el-button>
        </el-form-item>
      </el-form>

    </el-row>
    <el-row>
      <router-view></router-view>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "imageFile",
    data() {
      return {
        formInline: {
          keyWord: ''
        },
        nginxViewList:[],
        searchViewBind:0
      }
    },
    mounted: function () {
      this.$router.push('/imageTimeLine');
    },
    methods: {
      searchImage(){
        this.$http.get('file/searchImage?keyWord='+this.formInline.keyWord)
          .then( resp => {
            this.nginxViewList = resp.data.data.nginxViewList;
              this.$router.push({
                name:'imageRecent',
                query : {
                routeParams:  this.nginxViewList
              }
              }
            );


          })
      },
      viewBind0(){
        this.searchViewBind=0;
      },
      viewBind1(){
        this.searchViewBind=1;
      }
    }
  }
</script>

<style scoped>

</style>
