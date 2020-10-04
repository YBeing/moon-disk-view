<template>
  <div id="backgrou2" style="padding-left: 4vh">
    <el-row style="padding-top: 2vh; padding-left: 3vh">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.breadName">
          <span v-if="item.indexNum === 0"
                @click="reSetCurrentPid(item.currentPid,item.indexNum)">{{item.breadName}}</span>
          <span v-else @click="goToPage(item.currentPid,item.indexNum)">{{item.breadName}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <div style="float: left; padding-left: 0vh; padding-top: 2vh">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://localhost:8088/file/upload"
          :limit="1"
          :show-file-list="true"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :auto-upload="true"
          :headers=importHeaders
          :data=uploadData
          style="float: left; padding-right: 1vh">
          <el-button icon="el-icon-upload" type="primary">上传</el-button>
        </el-upload>
        <el-button icon="el-icon-folder-add" @click="createDir">新建文件夹</el-button>
        <el-button icon="el-icon-download" @click="downloadFile">下载</el-button>
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
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          label="文件名"
          width="800">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 'dir'">
              <i class="el-icon-folder"></i>
              <span>{{ scope.row.fileName }}</span>
            </div>
            <div v-else-if="scope.row.type === 'music'">
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
            <div v-else-if="scope.row.type === 'doc'">
              <i class="el-icon-document-copy"></i>
              <span>{{ scope.row.fileName }}</span>
            </div>
            <div v-else-if="scope.row.type === 'png' || scope.row.type === 'jpg'">
              <i class="el-icon-picture"></i>
              <span>{{ scope.row.fileName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="大小"
          width="200">
          <!--prop="fileSize"-->
          <template slot-scope="scope">
            <span v-if="scope.row.type === 'dir'"></span>
            <span v-else>{{ parseFloat(scope.row.fileSize / 1024 /1024).toFixed(2)}} MB</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="创建日期"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  let Authorization = localStorage.getItem('Authorization');
  let username = localStorage.getItem('username');
  let dirPid = 0;
  let currentPidForCreate = {currPidForCreate: 0};

  export default {
    name: "allFile",
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        ideSelection: [],
        breadcrumbs: [
          {breadName: '全部文件', currentPid: 0, indexNum: 0}
        ],
        importHeaders: {'Authorization': Authorization, 'username': username},
        // currentPidForCreate:{currPidForCreate:0},
        uploadData: {'username': username, 'dirPid': currentPidForCreate}


      }
    },
    mounted: function () {
      this.$http.get('file/indexFilePage/?pid=0 &username=' + localStorage.getItem("username"))
        .then(resp => {
          if (resp.data.status === '0') {
            this.$message({
              message: resp.data.msg,
              type: 'error'
            });
          } else {
            this.tableData = resp.data.data;
          }

        });
    },
    methods: {

      handleSelectionChange(val) {
        console.log(val);
        this.ideSelection = [];
        this.multipleSelection = val;
        this.multipleSelection.forEach(value => {
          this.ideSelection.push({'id': value.id, 'type': value.type});

        });
      },
      freshData(row, column, event) {
        this.$http.get('file/indexFilePage/?pid=' + row.pid + '&username=' + localStorage.getItem("username"))
          .then(resp => {
            console.log(resp.data.status === '0');
            console.log(resp);
            if (resp.data.status === '0') {
              this.$message({
                message: resp.data.msg,
                type: 'error'
              });
            } else {
              this.tableData = resp.data.data;
              // alert(row.fileName);
              //这里的pid是为了在我们双击时，传的当前的文件夹id作为下一页展示的时候的父id
              this.breadcrumbs.push(
                {breadName: row.fileName, currentPid: row.pid, indexNum: this.breadcrumbs.length}
              );
              //这里的这个pid是为了我们子目录下创建文件夹时能取得他的父文件夹的id
              currentPidForCreate.currPidForCreate = row.pid;

            }

          });
      },
      createDir() {
        this.$prompt('请输入文件名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          this.$http.get('file/createDir/?dirname=' + value + '&pid=' + currentPidForCreate.currPidForCreate + ' &username=' + localStorage.getItem("username"))
            .then(resp => {
              if (resp.data.status === '0') {
                this.$message({
                  message: resp.data.msg,
                  type: 'error'
                });
              } else {
                this.$message({
                  message: resp.data.msg,
                  type: 'success'
                });
                this.tableData = resp.data.data;

              }

            }).catch(err => {
            console.log(err)
          })

        })
      },
      handleSuccess(res, file, fileList) {
        this.$refs.upload.clearFiles();
        this.tableData = res.data;


      },
      goToPage(pid, indexNum) {
        // alert(indexNum);
        for (let i = indexNum + 1; i < this.breadcrumbs.length; i++) {
          let obj = this.breadcrumbs[i];
          this.breadcrumbs.splice(i, 1);
        }
        ;
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

        this.$http({
          method: "post",
          url: "file/deleteFile",
          data: this.ideSelection,

        }).then(resp => {  //响应结果
          if (resp.data.status === '0') {
            this.$message({
              message: resp.data.msg,
              type: 'error'
            });
          } else {
            this.$message({
              message: resp.data.msg,
              type: 'success'
            });
            this.getPageInfo(currentPidForCreate.currPidForCreate);

          }


        }).catch(err => {
          this.$message({
            message: '请求失败：请检查服务是否可用',
            type: 'error'
          });
        });
      },
      downloadFile() {
        let goOnflag = false;
        let idStr = '';
        if (this.ideSelection.length > 1) {
          this.$message({
            message: '最多支持下载一个文件',
            type: 'error'
          });
        }
        this.ideSelection.forEach(value => {
          if (value.type === 'dir') {
            this.$message({
              message: '请选择文件进行操作',
              type: 'error'
            });
            goOnflag = true;
            return;
          } else {
            idStr = idStr + value.id;
          }

        });

        if (goOnflag) {
          return;
        }
        this.$http({
          method: "get",
          url: "file/downloadFile?id=" + idStr,
          responseType: 'blob'

        }).then(res => {
          let subBeginIndex = res.headers['content-disposition'].indexOf('=');
          let fileNameStr = res.headers['content-disposition'].substring(subBeginIndex + 1, res.headers['content-disposition'].length);
          console.log(fileNameStr);
          const blob = res.data;
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = (e) => {
            const a = document.createElement('a');
            a.download = fileNameStr;
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        })
      },
      getPageInfo(pid) {
        this.$http.get('file/indexFilePage/?pid=' + pid + '&username=' + localStorage.getItem("username"))
          .then(resp => {
            if (resp.data.status === '0') {
              this.$message({
                message: resp.data.msg,
                type: 'error'
              });
            } else {
              this.tableData = resp.data.data;
            }

          });
      },

      //设置表头行的样式
      tableHeaderColor({row, column, rowIndex, columnIndex}) {
        return 'background-color:transparent;font-size:15px;'

      }

    }
  }
</script>

<style scoped>


  .el-table-div /deep/  .el-table, .el-table__expanded-cell {
    background-color: transparent;
  }

  .el-table-div /deep/ .el-table tr {
    background-color: transparent!important;
  }
  .el-table-div /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
    background-color: transparent;
  }
  .el-table::before {//去除底部白线
  left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
  }
</style>
