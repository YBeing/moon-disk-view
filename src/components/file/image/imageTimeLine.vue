<template>
  <div>
    <div style="text-align: left" >
      <div  v-for="imageItem in imageInfo" >
        <h4>{{imageItem.modifyTime}}</h4>
        <!--<el-image v-for="urlStr in imageItem.nginxViewList"
          style="width: 100px; height: 100px"
          :src="urlStr"
          :preview-src-list="urlStr">
        </el-image>-->
        <div style="display: inline; width: 520px; height: 130px" v-for="urlStr in imageItem.nginxViewList"  >
          <el-image
            style="width: 130px; height: 130px;  "
            :src="urlStr"
            :preview-src-list="imageItem.nginxViewList">
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
        imageInfo: []
      }
    },
    mounted: function () {
      this.$http({
        method: "get",
        url: "http://localhost:8088/file/getImageGroupByDate",

      }).then(resp => {  //响应结果
        this.imageInfo = resp.data.data;
      });
    }
  }
</script>

<style scoped>

</style>
