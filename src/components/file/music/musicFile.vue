<template>
  <div id="backgrou2" style="padding-left: 4vh">
    <el-row>
      <div style="float: left; padding-left: 0vh; padding-top: 2vh">
        <el-button icon="el-icon-download" @click="downloadFile"
          >下载</el-button
        >
        <el-button icon="el-icon-delete" @click="deleteFiles">删除</el-button>
      </div>
    </el-row>
    <div class="el-table-div">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @row-dblclick="playMusic"
        style="width: 100%"
        :header-cell-style="tableHeaderColor"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column label="文件名" width="800">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 'mp3' || scope.row.type === 'flac'">
              <i class="el-icon-headset"></i>
              <span>{{ scope.row.fileName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="大小" width="200">
          <!--prop="fileSize"-->
          <template slot-scope="scope">
            <span v-if="scope.row.type === 'dir'"></span>
            <span v-else
              >{{
                parseFloat(scope.row.fileSize / 1024 / 1024).toFixed(2)
              }}
              MB</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="创建日期"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
    <el-drawer :visible.sync="dialog" direction="btt" size="23%">
      <div>
        <AudioPlayer :audio-list="audioList" :before-play="onBeforePlay" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { AudioPlayer } from "@liripeng/vue-audio-player";
import "@liripeng/vue-audio-player/lib/vue-audio-player.css";
let downloadPath = "";
export default {
  components: {
    AudioPlayer,
  },
  name: "musicFile",
  data() {
    return {
      currentMusic:"",
      dialog: false,
      tableData: [],
      audioList: [],
      ideSelection: [],
    };
  },
  mounted: function () {
    this.$fetch("file/queryFileInfoByType", {
      username: localStorage.getItem("username"),
      fileType: "music",
    }).then((resp) => {
      console.log(resp.data);
      if (resp.result) {
        this.tableData = resp.data;
      } else {
        this.$message({
          message: resp.message,
          type: "error",
        });
      }
    });
  },
  methods: {
    test() {},
    playMusic(row, column, event) {
      // this.dialog = true;
      // this.audioList = [];
      // this.audioList.push(row.nginxViewPath);
      let { href } = this.$router.resolve({
        path: "/playMusic",
        // query: { musicPath: row.nginxViewPath}
        query: { musicPath: row.nginxViewPath}
      });

      window.open(href, "_blank");
    },
    downloadFile() {
      let goOnflag = false;
      if (this.ideSelection.length > 1) {
        this.$message({
          message: "最多支持下载一个文件",
          type: "error",
        });
        goOnflag = true;
      }
      this.ideSelection.forEach((value) => {
        if (value.type === "dir") {
          this.$message({
            message: "请选择文件进行操作",
            type: "error",
          });
          goOnflag = true;
          return;
        } else {
          if (value.downloadPath == null) {
            this.getFileInfoById(value.id);
            if (downloadPath == "") {
              goOnflag = true;
            }
          } else {
            downloadPath = downloadPath + value.downloadPath;
          }
        }
      });

      if (goOnflag) {
        return;
      } else {
        window.location.href = downloadPath;
      }
    },
    handleSelectionChange(val) {
      this.ideSelection = [];
      this.multipleSelection = val;
      this.multipleSelection.forEach((value) => {
        this.ideSelection.push({
          downloadPath: value.nginxViewPath,
          type: value.type,
        });
      });
    },
    getFileInfoById(id) {
      this.$fetch("file/queryByFileId", { fileId: id }).then((resp) => {
        if (resp.result) {
          downloadPath = resp.data;
        } else {
          this.$message({
            message: resp.message,
            type: "error",
          });
        }
      });
    },
    //设置表头行的样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return "background-color:transparent;font-size:15px;";
    },
  },
};
</script>

<style scoped>
.el-table-div /deep/ .el-table,
.el-table__expanded-cell {
  background-color: transparent;
}

.el-table-div /deep/ .el-table tr {
  background-color: transparent !important;
}

.el-table-div /deep/ .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent;
}

.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
</style>
