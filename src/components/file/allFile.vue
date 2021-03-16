<template>
  <div id="backgrou2" style="padding-left: 4vh">
    <el-row style="padding-top: 1vh; padding-left: 3vh">
      <el-col :span="8">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.breadName">
            <span
              v-if="item.indexNum === 0"
              @click="reSetCurrentPid(item.currentPid, item.indexNum)"
              >{{ item.breadName }}</span
            >
            <span v-else @click="goToPage(item.currentPid, item.indexNum)">{{
              item.breadName
            }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="8" :offset="8">
        <span style="font-size: 13px; font-weight: bold"
          >人就是在不断的选择的矛盾中,戴上面具，焚烧过去,武装自己</span
        ><br />
        <span
          style="
            padding-bottom: 6vh;
            padding-left: 37vh;
            font-size: 13px;
            font-weight: bold;
          "
        >
          一夏目漱石
        </span>
      </el-col>
    </el-row>
    <el-row>
      <div style="float: left; padding-left: 0vh; padding-top: 2vh">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://localhost:8088/moondisk/file/upload"
          :limit="1"
          :show-file-list="true"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :auto-upload="true"
          :headers="importHeaders"
          :data="uploadData"
          style="float: left; padding-right: 1vh"
        >
          <el-button icon="el-icon-upload">上传</el-button>
        </el-upload>
        <el-button icon="el-icon-folder-add" @click="createDir"
          >新建文件夹</el-button
        >
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
        @row-dblclick="freshData"
        style="width: 100%"
        :header-cell-style="tableHeaderColor"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column label="文件名" width="800">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 'dir'">
              <i class="el-icon-folder"></i>
              <span>{{ scope.row.fileName }}</span>
            </div>
            <div v-else-if="scope.row.type === 'mp3'">
              <i class="el-icon-headset"></i>
              <span>{{ scope.row.fileName }}</span>
            </div>
            <div v-else-if="scope.row.type === 'pdf'">
              <i class="el-icon-reading"></i>
              <span>{{ scope.row.fileName }}</span>
            </div>
            <div v-else-if="scope.row.type === 'zip'">
              <i class="el-icon-film"></i>
              <span>{{ scope.row.fileName }}</span>
            </div>
            <div v-else-if="scope.row.type === 'txt'">
              <i class="el-icon-tickets"></i>
              <span>{{ scope.row.fileName }}</span>
            </div>

            <div
              v-else-if="scope.row.type === 'png' || scope.row.type === 'jpg'"
            >
              <i class="el-icon-picture"></i>
              <span>{{ scope.row.fileName }}</span>
            </div>
            <div v-else>
              <i class="el-icon-document-copy"></i>
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
  </div>
</template>

<script>
let Authorization = localStorage.getItem("Authorization");
let username = localStorage.getItem("username");
let dirPid = 0;
let currentPidForCreate = { currPidForCreate: 0 };
let downloadPath = "";

export default {
  name: "allFile",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      ideSelection: [],
      breadcrumbs: [{ breadName: "全部文件", currentPid: 0, indexNum: 0 }],
      importHeaders: { Authorization: Authorization, username: username },
      // currentPidForCreate:{currPidForCreate:0},
      uploadData: { username: username, dirPid: currentPidForCreate },
      isOff: false,
    };
  },
  mounted: function () {
    //查询文件信息
    this.$fetch("file/reloadFileInfo", {
      username: localStorage.getItem("username"),
      pid: 0,
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
    handleSelectionChange(val) {
      this.ideSelection = [];
      this.multipleSelection = val;
      this.multipleSelection.forEach((value) => {
        this.ideSelection.push({
          id: value.id,
          type: value.type,
          downloadPath: value.nginxViewPath,
        });
      });
    },
    freshData(row, column, event) {
      this.$fetch("file/reloadFileInfo", {
        username: username,
        pid: row.pid,
      }).then((resp) => {
        if (resp.result) {
          this.tableData = resp.data;
          // alert(row.fileName);
          //这里的pid是为了在我们双击时，传的当前的文件夹id作为下一页展示的时候的父id
          this.breadcrumbs.push({
            breadName: row.fileName,
            currentPid: row.pid,
            indexNum: this.breadcrumbs.length,
          });
          //这里的这个pid是为了我们子目录下创建文件夹时能取得他的父文件夹的id
          currentPidForCreate.currPidForCreate = row.pid;
        } else {
          this.$message({
            message: resp.message,
            type: "error",
          });
        }
      });
    },
    createDir() {
      this.$prompt("请输入文件名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        this.$fetch("file/createDir", {
          dirname: value,
          pid: currentPidForCreate.currPidForCreate,
          username: username,
        }).then((resp) => {
          if (resp.result) {
            this.$message({
              message: resp.message,
              type: "success",
            });
            this.tableData = resp.data;
          } else {
            this.$message({
              message: resp.message,
              type: "error",
            });
          }
        });
      });
    },
    handleSuccess(res, file, fileList) {
      this.$refs.upload.clearFiles();
      this.getPageInfo(currentPidForCreate.currPidForCreate);
    },
    goToPage(pid, indexNum) {
      let startIndex = indexNum + 1;
      for (let i = startIndex; i < this.breadcrumbs.length; i++) {
        let obj = this.breadcrumbs[i];
        this.breadcrumbs.splice(i);
      }
      this.getPageInfo(pid);
    },
    reSetCurrentPid(pid, indexNum) {
      this.goToPage(pid, indexNum);
      //当我们点击全部文件的时候还原我们的currentPid=0
      currentPidForCreate.currPidForCreate = 0;
    },
    beforeUpload(file) {
      this.uploadData.dirPid = currentPidForCreate.currPidForCreate;
    },
    deleteFiles() {
      this.$post("file/deleteFile", { data: this.ideSelection }).then(
        (resp) => {
          if (resp.result) {
            this.getPageInfo(currentPidForCreate.currPidForCreate);
            this.$message({
              message: resp.message,
              type: "success",
            });
          } else {
            this.$message({
              message: resp.message,
              type: "error",
            });
          }
        }
      );
    },
    downloadFile() {
      if (this.ideSelection.length > 1) {
        this.$message({
          message: "暂时只支持同时下载一个文件",
          type: "error",
        });
        return;
      }
      this.$fetch("file/queryByFileId", {
        fileId: this.ideSelection[0].id,
      }).then((resp) => {
        if (resp.result) {
          if (resp.data.indexOf("jpg") != -1 || resp.data.indexOf("png") != -1) {
            window.location.href = resp.data;

            // this.$http({
            //   method: "get",
            //   url: "file/downloadFile?id=" + this.ideSelection[0].id,
            //   responseType: "blob",
            // }).then((res) => {
            //   //获取文件名
            //   // let subBeginIndex = res.headers["content-disposition"].indexOf(
            //   //   "="
            //   // );
            //   // let fileNameStr = res.headers["content-disposition"].substring(
            //   //   subBeginIndex + 1,
            //   //   res.headers["content-disposition"].length
            //   // );
            //   // // console.log(res);
            //   // let link = document.createElement("a");
            //   // link.href = window.URL.createObjectURL(new Blob([res.data]));
            //   // link.target = "_blank";
            //   // //文件名和格式
            //   // link.download = fileNameStr;
            //   // document.body.appendChild(link);
            //   // link.click();
            //   // document.body.removeChild(link);



            //   // let subBeginIndex = res.headers['content-disposition'].indexOf('=');
            //   // let fileNameStr = res.headers['content-disposition'].substring(subBeginIndex + 1, res.headers['content-disposition'].length);
            //   // console.log(fileNameStr);
            //   // const blob = res.data;
            //   // const reader = new FileReader();
            //   // reader.readAsDataURL(blob);
            //   // reader.onload = (e) => {
            //   //   const a = document.createElement('a');
            //   //   a.download = fileNameStr;
            //   //   a.href = e.target.result;
            //   //   document.body.appendChild(a);
            //   //   a.click();
            //   //   document.body.removeChild(a);
            //   // }
            // window.location.href = resp.data;

            // });
          } else {
            window.location.href = resp.data;
          }
        }
      });
    },
    getPageInfo(pid) {
      this.$fetch("file/reloadFileInfo", { pid: pid, username: username }).then(
        (resp) => {
          if (resp.result) {
            this.tableData = resp.data;
          } else {
            this.$message({
              message: resp.message,
              type: "error",
            });
          }
        }
      );
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
