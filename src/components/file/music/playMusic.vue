<template>
  <div id="backgrou2" style="padding-left: 4vh">
      <div>
        <AudioPlayer :audio-list="audioList" :before-play="onBeforePlay" />
      </div>
  </div>
</template>

<script>
import { AudioPlayer } from "@liripeng/vue-audio-player";
import "@liripeng/vue-audio-player/lib/vue-audio-player.css";

export default {
  components: {
    AudioPlayer,
  },
  name: "playMusic",
  data() {
    return {
      currentMusic:
        "http://121.196.29.156:8888/group1/M00/00/00/ecQdnF954FGAf0SmALSNZFjOUsI437.mp3",
      dialog: false,
      tableData: [],
      audioList: [
      ],
      ideSelection: [],
      musicPath: ''
    };
  },
  mounted: function () {
    this.getParams();
    this.playMusic();
  },
  methods: {
    playMusic() {
      this.audioList = [];
      this.audioList.push(this.musicPath);
    },
    getParams() {
      // 取到路由带过来的参数
      this.musicPath = this.$route.query.musicPath;
    },
  },
};
</script>


