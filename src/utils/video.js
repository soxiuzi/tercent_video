// 操作视频方法
import {
  Message
} from 'element-ui'

/**
 * 退出房间
 */
export function quitRoom(RTC, Router) {
  RTC.quit()
  Router.push({
    name: 'home'
  })
}

/**
 * 服务器超时
 */
export function onRelayTimeot(msg) {
  Message({
    type: 'warning',
    message: msg ? JSON.stringify(msg) : ""
  })
}

/**
 * 添加新用户
 */
export function addNewUser(users, id) {
  return users.push({
    id,
    autoplay: true,
    muted: false,
    playsinline: true
  })
}

/**
 * 添加本地流
 */
export function onLocalStreamAdd(info, users) {
  console.log('本地流信息：', info)
  if (info.stream && info.stream.active === true) {
    let id = "local";
    let video = document.getElementById(id);
    if (!video) {
      addNewUser(users, id)
    }
    video.srcObject = info.stream;
  }
}

/**
 * 远端视频流新增/更新通知
 */
export function onRemoteStreamUpdate(info, id) {
  console.log('远端视频流信息：', info)
  if (info.stream && info.stream.active === true) {
    let id = info.videoId;
    let video = document.getElementById(id)
    if (!video) {
      video = addNewUser(users, id)
    }
    video.srcObject = info.stream
  } else {

  }
}

/**
 * 远端视频流断开通知
 */

export function onRemoteStreamRemove(info, users) {
  let videoNode = document.getElementById(info.videoId);
  if (videoNode) {
    videoNode.srcObject = null;
    users.filters(item => item.id == info.videoId)
  }
}

/**
 * webSocket断开通知
 */
export function onWebSocketClose(RTC) {
  RTC.quit();
}

/**
 * 获取本地音频或视频流
 */
export function getStream(opt, succ, RTC) {
  RTC.getLocalStream({
    video: true,
    audio: true,
    videoDevice: opt.videoDevice
  }, function (info) {
    let stream = info.stream;
    succ(stream)
  })
}

function onKickout() {
  console.log('onKick out')
}

/**
 * 初始化RTC
 */
export function initRTC(opts) {
  let RTC = new WebRTCAPI({
    userId: 1,
    userSig: 'eJw1j19vgjAUR78LryxLqS3g3hA1GpU4NUyemtJWuP4pTa2Zuuy76xg*3nMefuf*eJv5*p0bA5Jxx3pWeh8e8t5arK4GrGJ855R94oBSihF6WZBKO9jBv*vgGarntRgV6fRzmMZlLHRG-OFpdL8GsW1WeUlTfzP72pZnKGr-e7zVk3zWJNM6WQ78kOQ8udws7ispMlNVxWCPdARLideiiVCQ1eXxOF*8xuSBtel-AQQh3KNRgDvp4KTa6JCQsI9D2nEuRHPRjrmbUe2vvw8-e03x',
    sdkAppId: '1400235712',
    accountType: 1
  }, function () {
    RTC.enterRoom({
      roomid: opts.roomid * 1,
      privateMapKey: opts.privateMapKey,
      role: 'user',
    }, function (info) {
      console.log('init succ', info)
      getStream({
        audio: true,
        video: true
      }, function (stream) {
        RTC.startRTC({
          stream: stream,
          role: 'user'
        })
      }, RTC)
    }, function (err) {
      console.error('init error', err)
    })
  })
  // 远端流新增/更新
  RTC.on("onRemoteStreamUpdate", onRemoteStreamUpdate)
  // 本地流新增
  RTC.on("onLocalStreamAdd", onLocalStreamAdd)
  // 远端流断开
  RTC.on("onRemoteStreamRemove", onRemoteStreamRemove)
  // 重复登录被T
  RTC.on("onKickout", onKickout)
  // 服务器超时
  RTC.on("onRelayTimeout", onRelayTimeot)
  // 错误事件通知
  RTC.on("onErrorNotify", function (info) {
    console.error(info)
    if (info.errorCode === RTC.getErrorCode().GET_LOCAL_CANDIDATE_FAILED) {
      console.log('错误：', info.errorMsg)
    }
  })
  // 视频流事件通知
  RTC.on("onStreamNotify", function (info) {
    console.warn("onStreamNotify", info)
  })
  // websocket事件通知
  RTC.on("onWebSocketNotify", function (info) {
    console.warn("onWebSocketNotify", info)
  })
}

// 开始视频
export function push() {
  initRTC({
    "userId": 1,
    "userSig": 'eJw1j19vgjAUR78LryxLqS3g3hA1GpU4NUyemtJWuP4pTa2Zuuy76xg*3nMefuf*eJv5*p0bA5Jxx3pWeh8e8t5arK4GrGJ855R94oBSihF6WZBKO9jBv*vgGarntRgV6fRzmMZlLHRG-OFpdL8GsW1WeUlTfzP72pZnKGr-e7zVk3zWJNM6WQ78kOQ8udws7ispMlNVxWCPdARLideiiVCQ1eXxOF*8xuSBtel-AQQh3KNRgDvp4KTa6JCQsI9D2nEuRHPRjrmbUe2vvw8-e03x',
    "sdkappid": '1400235712',
    "accountType": 1, // 随便传一个值，现在没有啥用处
    "roomid": '111'
  })
}

// 停止视频
export function stopRTC(RTC) {
  RTC.stopRTC(0, function (info) {
    console.log('stop succ')
  }, function (info) {
    console.log('stop end')
  })
}

// 开始视频 
export function startRTC(RTC) {
  RTC.startRTC(0, function (info) {
    console.log('start succ')
  }, function (info) {
    console.log('failed')
  })
}
