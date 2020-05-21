<template>
  <el-input v-model="inputText" placeholder="想听的音乐？" class="box-input" @change="handleSearch">
    <el-button slot="append" icon="el-icon-search" />
  </el-input>
</template>

<script>
// import { mapMutations } from 'vuex'
// 1.点击搜索时 可得到搜索结果列表 维护该列表
// 2.排行榜页面  也有排行列表  专辑也一样 分析可知渲染出列表 并点击该列表中的 任何一首歌曲时  保存该列表到 store 即当前列表
// 3.serachlist 组件 负责 渲染上述列表  列表类型【搜索列表（关键词）、排行列表（按？排行）、专辑列表（专辑id？名字？）】
export default {
  // 当项目使用keep-alive时，可搭配组件name进行缓存过滤 DOM做递归组件 vue-tools 等等
  name: 'TheMusicSearchBox',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // props 可以是数组或对象，用于接收来自父组件的数据
  props: {},
  // 这里存放数据
  data () {
    return {
      inputText: ''
    }
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
  methods: {
    handleSearch (val) {
      this.$emit('search', this.inputText)
    }
  },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured () {}
}
</script>
<style lang='stylus'>

</style>
