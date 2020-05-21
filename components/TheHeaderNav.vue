<template>
  <div class="nav">
    <the-header-nav-logo />
    <the-header-nav-list />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import TheHeaderNavLogo from '@/components/TheHeaderNavLogo'
import TheHeaderNavList from '@/components/TheHeaderNavList'
export default {
  // 当项目使用keep-alive时，可搭配组件name进行缓存过滤;DOM做递归组件;vue-tools
  name: 'XXX',
  // import引入的组件需要注入到对象中才能使用
  components: {
    TheHeaderNavLogo,
    TheHeaderNavList
  },
  // props 可以是数组或对象，用于接收来自父组件的数据
  props: {},
  // 这里存放数据
  data () {
    return {}
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建之前
  beforeCreate () {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
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
  methods: {},
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured () {}
}
</script>
<style lang='stylus'>
.nav
  width 786px
  margin 0 auto
  height 64px
  display flex
  justify-content flex-start
  align-items center
</style>
