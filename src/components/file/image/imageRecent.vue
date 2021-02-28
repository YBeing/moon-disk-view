<template>
  <div>
    <el-row style="text-align: left">
      <el-col :span="4">
        <el-button style="color: black; padding-left: 1vh" type="text"
          >全部文件</el-button
        >
      </el-col>
      <el-col :span="4" :offset="16">
        <span style="font-size: 13px"
          >已全部加载共{{ allImageInfo.length }}个</span
        >
      </el-col>
    </el-row>
    <el-row>
      <div style="text-align: left">
        <div
          style="
            display: inline;
            width: 520px;
            height: 130px;
            margin-right: 1vh;
          "
          v-for="urlStr in allImageInfo"
          :key="urlStr"
        >
          <el-image
            style="width: 130px; height: 130px"
            :src="urlStr"
            :preview-src-list="allImageInfo"
          >
          </el-image>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "imageRecent",
  data() {
    return {
      allImageInfo: [],
    };
  },
  mounted: function () {
    this.$fetch("file/queryFileInfoByType", {
      username: localStorage.getItem("username"),
      fileType: "image",
    }).then((resp) => {
      if (resp.result) {
        resp.data.forEach((element) => {
          this.allImageInfo.push(element.nginxViewPath);
        });
      } else {
        this.$message({
          message: resp.message,
          type: "error",
        });
      }
    });
  },
};
</script>

<style scoped>
</style>
