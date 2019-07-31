<template>
  <div class="home">
    <div class="login">
      <input type="text" placeholder="请输入房间号">
      <button @click="joinRoom">进入</button>
    </div>
  </div>
</template>

<script>
import { Test } from '../api/vedio.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    joinRoom() {
      this.$router.push({name: 'Room', query: {id: 111}})
    }
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
