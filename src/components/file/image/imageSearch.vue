<template>
  <div>
    <el-row style="text-align: left">
      <el-col :span="4">
        <el-button style="color: black; padding-left: 1vh" type="text">查询结果</el-button>
      </el-col>
      <el-col :span="4" :offset="16">
        <span style="font-size: 13px">已全部加载共{{allImageInfoSearch.length}}个</span>
      </el-col>
    </el-row>
    <el-row>

      <div style="text-align: left; ">
        <div style="display: inline;width: 520px; height: 130px; margin-right: 1vh" v-for="urlStr in allImageInfoSearch" :key="urlStr">
          <el-image
            style="width: 130px; height: 130px;  "
            :src="urlStr"
            :preview-src-list="allImageInfoSearch">
          </el-image>

        </div>
      </div>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "imageSearch",
    data() {
      return {
        allImageInfoSearch: []
      }
    },
    mounted: function () {
      let keywordTmp=localStorage.getItem('keywordTmp');
      this.$http.get('image/searchImage?keyWord='+keywordTmp +'&&username='+localStorage.getItem('username'))
        .then( resp => {
          this.allImageInfoSearch = resp.data.data.nginxViewList;

        });
    }
  }
</script>

<style scoped>

</style>
