<template>
  <div class="home">
    <div class="login">
      <el-input placeholder="请输入房间号" v-model="roomId"></el-input>
      <el-input placeholder="请输入用户Id" v-model="userId"></el-input>
      <el-button @click="joinRoom">进入</el-button>
    </div>
  </div>
</template>

<script>
import { getSign } from '../api/vedio.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      userId: "",
      roomId: "",
    }
  },
  methods: {
    joinRoom() {
      let that = this;
      getSign(this.userId).then(res => {
        if(res.data) {
          that.$router.push({name: 'Room', params: {sign: res.data, roomId: that.roomId, userId: that.userId}})
        }
      })
    },
    
  },
  created() {
    // Test().then(res => {
    //   console.log('测试请求：', res)
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @import '@/styles/mixin.scss';
  .home {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 200px;
      height: 100px;
      border: 1px solid #eee;
      button {
        margin-top: 20px;
      }
    }
  }
</style>
