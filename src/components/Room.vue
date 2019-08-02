<template>
  <div class="room">
    <el-container>
      <el-header class="room_header">
        <h5>房间号{{ roomId }}</h5>
        <div class="room_header-buttons">
          <el-button
            @click="startRTC"
            type="text"
            size="small"
          >开始推流</el-button>
          <el-button
            @click="push"
            type="text"
            size="small"
          >初始化视频</el-button>
          <el-button
            @click="stopRTC"
            type="text"
            size="small"
          >停止视频</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <h4>视频成员</h4>
          <el-menu @select="handleOpen">
            <el-menu-item index="1">
              <i class="el-icon-user"></i>
              <span slot="title">成员一</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-user"></i>
              <span slot="title">成员二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-user"></i>
              <span slot="title">成员三</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="main_anchor">
            <div id="remote-video-wrap">

            </div>
          </div>
          <div class="main_audience">
            观众
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import { push, onRemoteStreamUpdate, onLocalStreamAdd, onRemoteStreamRemove } from '../utils/video'
import { Test } from '../api/vedio.js'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      RTC: undefined,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleOpen (index) {
      console.log('当前成员的索引：', index)
    },
    /**
     * 登录被T
     */
    onKickout () {
      console.log('on kick out')
    },
    /**
     * 退出视频
     */
    quitRTC () {
      RTC.quit()
    },
    /**
     * 服务器超时
     */
    onRelayTimeout (msg) {
      console.log(`onRelayTimeout!${msg ? JSON.stringify(msg) : ""}`)
    },
    
    /**
     * 创建video对象
     */
    createVideoElement (id, isLocal) {
      let videoDiv = document.createElement("div");
      videoDiv.innerHTML = `<video id=${id} autoplay ${isLocal ? 'muted' : ''} playsinline></video>`;
      document.querySelector("#remote-video-wrap").appendChild(videoDiv);
      return document.getElementById(id)
    },
    /**
     * 本地添加视频流
     */
    onLocalStreamAdd (info) {
      if (info.stream && info.stream.active === true) {
        var id = "local";
        var video = document.getElementById(id);
        if (!video) {
          this.createVideoElement(id, true);
        }
        var video = document.getElementById(id)
        video.srcObject = info.stream;
        video.muted = true
        video.autoplay = true
        video.playsinline = true

      }
    },
    /**
     * 新增远端视频流
     */
    onRemoteStreamUpdate (info) {
      console.log('获取远端的视频流：', info)
      if (info.stream && info.stream.active === true) {
        let id = info.videoId;
        let video = document.getElementById(id);
        if (!video) {
          video = this.createVideoElement(id)
        }
        video.srcObject = info.stream
      }
    },
    /**
     * 移除远端视频流
     */
    onRemoteStreamRemove (info) {
      let videoNode = document.getElementById(info.videoId);
      if (videoNode) {
        videoNode.srcObject = null
        document.getElementById(info.videoId).parentElement.removeChild(videoNode)
      }
    },
    /**
     * websocket断开
     */
    onWebSocketClose () {
      this.RTC.quit()
    },
    /** 
     * 获取视频流
     */
    gotStream (opt, succ) {
      this.RTC.getLocalStream({
        video: true,
        audio: true,
        videoDevice: opt.videoDevice
      }, function (info) {
        let stream = info.stream;
        succ(stream)
      })
    },
    /**
     * RTC初始化
     */
    initRTC (opts) {
      console.log('开始初始化')
      let that = this
      this.RTC = new WebRTCAPI({
        userId: opts.userId,
        userSig: opts.userSig,
        sdkAppId: opts.sdkAppId,
        accountType: opts.accountType
      }, function () {
        console.log('进入房间')
        that.RTC.enterRoom({
          roomid: opts.roomId * 1,
          privateMapKey: opts.privateMapKey,
          role: "user"
        }, function (info) {
          console.log('房间信息：', info)
          // that.gotStream({
          //   audio: true,
          //   video: true
          // }, function (stream) {
          //   console.log('开始推流1')
          //   that.RTC.startRTC({
          //     stream,
          //     role: 'user'
          //   })
          // })
        }, function (err) {
          conosle.log('init error', err)
        })
      })
      // 远端流新增/更新
      this.RTC.on("onRemoteStreamUpdate", this.onRemoteStreamUpdate)
      // 本地流新增
      this.RTC.on("onLocalStreamAdd", this.onLocalStreamAdd)
      // 远端流断开
      this.RTC.on("onRemoteStreamRemove", this.onRemoteStreamRemove)
      // 重复登录被T
      this.RTC.on("onKickout", this.onKickout)
      // 服务器超时
      this.RTC.on("onRelayTimeout", this.onRelayTimeout)

    },
    /**
     * 开始视频
     */
    push (roomId, userId, sign) {
      this.initRTC({
        "userId": userId,
        "userSig": sign,
        "sdkAppId": '1400237934',
        "accountType": 1,
        "roomId": roomId
      })
      // this.initRTC({
      //   "userId": 1,
      //   "userSig": "eJw9j1FvgjAURv8Lry6mIK3ZEh*IYZahJDgerC9Ntbd4h0iH3aIs**9T1D3ecx6*c3*8Yv4*VNailsrJUau9F494Tz2Gk8UWpDIO2gv2KaUBIQ*LGg4ODd7cHR6xvFyLOJ8msRE5N0Kkgq2LIv3gr122HOBzNm0MNMFnuD8u633yFhWLCKOT6HCXVxy**QZ5WuoaRJXN4s6uNtYNktDF9DxXwHblZPIY05Xs068BISHBiI794C4d1tBHs5BRn-1ztd02Xwcn3dlC-*vvHwWQT3o_",
      //   "sdkAppId": '1400235712',
      //   "accountType": 1,
      //   "roomId": 111
      // })
    },
    /**
     * 停止视频
     */
    stopRTC () {
      this.RTC.stopRTC(0, function (info) {
        console.log('停止视频', info)
      })
    },
    /**
     * 开始推流
     */
    startRTC () {
      let that = this;
      this.gotStream({
        audio: true,
        video: true,
      }, function (stream) {
        that.RTC.startRTC({
          stream,
          role: 'user'
        })
      })
      // console.log('开始推流2')
      // this.RTC.startRTC(0, function (info) {
      //   console.log('succ', info)
      // }, function (info) {
      //   console.log('failed', info)
      // })
    }

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    let { roomId, userId, sign } = this.$route.params
    console.log('参数：', roomId, userId, sign)
    this.roomId = roomId
    this.push(roomId, userId, sign)
    // Test().then(res => {
    //   console.log('获取签名：',  res)
    // })
   },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },
  beforeCreate () { }, //生命周期 - 创建之前
  beforeMount () { }, //生命周期 - 挂载之前
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.room {
  .el-container {
    height: 100vh;
  }
  .room_header {
    background-color: #262626;
    color: #eee;
    h5 {
      display: inline-block;
    }
    .room_header-buttons {
      float: right;
      margin-top: 13px;
      .el-button--text {
        color: #eee;
        font-size: 14px;
      }
    }
  }
  .el-container {
    .el-aside {
      background-color: #333333;
      color: #eee;
      .el-menu {
        background-color: #333333;
        .el-submenu__title {
          color: #eee;
        }
      }
    }
  }
}
</style>