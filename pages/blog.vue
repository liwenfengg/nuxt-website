<template>
  <div id="blog">
    <h1>
      博客地址:<a href="https://github.liwenfeng.net"> https://github.liwenfeng.net</a>
    </h1>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
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
  beforeCreate () {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载之前
  beforeMount () {
    // window.location.href = 'http://github.liwenfeng.net'
    // window.location.href = 'https://github.liwenfeng.net's
    window.open('https://github.liwenfeng.net')
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  },
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
#blog
  width 1080px
  color #666
  line-height 1.5
  h1,a
    font-size 1em
    display: block
    margin-block-start: 0.67em
    margin-block-end: 0.67em
    margin-inline-start: 0px
    margin-inline-end: 0px
    font-weight: bold
    text-align center
  a
    color $primary
</style>
