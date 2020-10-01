<template>
  <div>
    <el-row>
      <router-link to="/imageTimeLine">
        <el-button size="medium" style="float: left; margin-left: 1vh">时光轴
        </el-button>
      </router-link>
      <router-link to="/imageRecent">
        <el-button size="medium" style="float: left; margin-left: 2vh">最近上传
        </el-button>
      </router-link>
      <el-input
        placeholder="搜索你的图片~"
        prefix-icon="el-icon-search"
        v-model="input2" style="width: 200px; padding-left: 70vh; margin-bottom: 2vh">
      </el-input>

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
        url: 'http://192.168.0.105:8888/group1/M00/00/00/wKgAaV90ocCAJxg-AAcppDDlZRk425.png',
        srcList: [
          'http://192.168.0.105:8888/group1/M00/00/00/wKgAaV90ocCAJxg-AAcppDDlZRk425.png'
        ],
        imageInfo: []
      }
    },
    mounted: function () {
      this.$router.push('/imageTimeLine');
    }
  }
</script>

<style scoped>

</style>
