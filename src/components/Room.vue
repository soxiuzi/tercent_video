<template>
  <div class="room">
    <el-container>
      <el-header class="room_header">
        <h5>房间号（111）</h5>
        <div class="room_header-buttons">
          <el-button type="text" size="small">退出</el-button>
          <el-button @click="initVideo" type="text" size="small">初始化视频</el-button>
          <el-button type="text" size="small">停止视频</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <h4>视频成员</h4>
          <el-menu
            @select="handleOpen">
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
            主讲人
            <video></video>
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
import { push } from '../utils/video'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleOpen(index) {
      console.log('当前成员的索引：', index)
    },
    initVideo() {
      push()
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
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