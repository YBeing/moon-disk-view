<template>
  <div>
    <div style="text-align: left">
      <div v-for="imageItem in imageInfo" :key="imageItem.modifyTime">
        <h4>{{ imageItem.modifyTime }}</h4>
        <div
          style="display: inline; width: 520px; height: 130px"
          v-for="urlStr in imageItem.nginxViewPathList"
          :key="urlStr"
        >
          <el-image
            style="width: 130px; height: 130px"
            :src="urlStr"
            :preview-src-list="imageItem.nginxViewPathList"
          >
          </el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "imageTimeLine",
  data() {
    return {
      imageInfo: [],
    };
  },
  mounted: function () {
    // this.$http({
    //   method: "get",
    //   url: "image/getImageGroupByDate?username="+localStorage.getItem('username')

    // }).then(resp => {  //响应结果
    //   this.imageInfo = resp.data.data;
    // });

    this.$fetch("file/getImageGroupByDate", {
      username: localStorage.getItem("username"),
      fileType: "image",
    }).then((resp) => {
      if (resp.result) {
        console.log(resp.data)
        this.imageInfo = resp.data;
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

<style>
.el-input__inner {
  background-color: rgba(0, 0, 0, 0.2);
  /*background-color: transparent;*/
}
</style>
