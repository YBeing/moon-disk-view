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
        <router-link to="/imageSearch">
          <el-form-item>
            <el-button type="primary" @click="searchImage">查询</el-button>
          </el-form-item>
        </router-link>

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
      this.$router.push('/imageRecent');
    },
    methods: {
      searchImage(){
        let keywordTmp =this.formInline.keyWord;
        localStorage.setItem('keywordTmp',keywordTmp);
        //这里的跳转只是为了让再次查询的时候先跳转到其他的页面再通过routeLink跳转到查询页面
        //因为如果不这样的话，那么当我们第一次查询过后，后面再次查询的时候就无法触发页面加载的mount方法了
        this.$router.push('/imageRecent');
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
