<template>
  <div class="navelist">
    <el-menu
      :default-active="$route.path"
      :router="true"
      :active-text-color="'#7cc7bb'"
      class="list"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item v-for="val in currentList" :key="val.link" :index="val.link" class="item">
        <nuxt-link tag="li" :to="val.link">
          {{ val.name }}
        </nuxt-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import { HomeNav, MusicNav } from '@/config/nav'

export default {
  // 当项目使用keep-alive时，可搭配组件name进行缓存过滤 DOM做递归组件 vue-tools 等等
  name: 'TheHeaderNavList',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // props 可以是数组或对象，用于接收来自父组件的数据
  props: {},
  // 这里存放数据
  data () {
    return {
      type: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {
    currentList () {
      if (this.type === 'isHome' || this.$route.path === '/') {
        return HomeNav
      } else {
        return MusicNav
      }
    }
  },
  // 监控data中的数据变化
  watch: {
    $route () {
      const key = this.$route.path
      // console.log('key', key)
      if (key === '/music/search' || key === '/music/rank' || key === '/music/sheet') {
        this.type = 'isMusic'
      } else if (key === '/') {
        this.type = 'isHome'
      } else {
        this.type = 'isHome'
      }
    }
  },
  // 生命周期 - 创建之前
  beforeCreate () {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载之前
  beforeMount () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  // 生命周期 - 更新之前
  beforeUpdate () {},
  // 生命周期 - 更新之后
  updated () {},
  // 被 keep-alive 缓存的组件激活时调用。
  activated () {},
  // 被 keep-alive 缓存的组件停用时调用。
  deactivated () {},
  // 生命周期 - 销毁之前
  beforeDestroy () {},
  // 生命周期 - 销毁完成
  destroyed () {},
  // 方法集合
  methods: {
    handleSelect (key, keyPath) {
      if (key === '/music/search' || key === '/music/rank' || key === '/music/sheet') {
        this.type = 'isMusic'
      } else if (key === '/') {
        this.type = 'isHome'
      } else {
        this.type = 'isHome'
      }
    }
  },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured () {}
}
</script>
<style lang='stylus'>
.list
  width 636px
  height 64px
  display flex
  justify-content flex-end
  .item
    padding 0 20px
    a
      text-decoration none
.navelist>.el-menu.el-menu--horizontal
  border-bottom none
.navelist>.el-menu--horizontal>.el-menu-item
  transition all 0.3s linear
</style>
