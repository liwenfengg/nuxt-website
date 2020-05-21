<template>
  <div class="music-setting">
    <h4 class="music-setting-title">
      <svg-icon icon-class="shuxian" />音乐设置
    </h4>
    <div class="music-setting-content">
      <div class="music-setting-item-title">
        歌词显示
      </div>
      <div class="music-setting-item-on">
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="change"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* 默认为false
点击 显示变为true 触发change 事件
change事件里面 向 store 设置状态
音乐组件拿到当前 状态 看是否展示
*/
export default {
  // 当项目使用keep-alive时，可搭配组件name进行缓存过滤 DOM做递归组件 vue-tools 等等
  name: 'TheSettingMusic',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // props 可以是数组或对象，用于接收来自父组件的数据
  props: {},
  // 这里存放数据
  data () {
    return {
      // value: false
    }
  },
  // 监听属性 类似于data概念
  computed: {
    value: {
      get () {
        return this.$store.state.setting.musicTextShow
      },
      set (x) {
        this.$store.commit('setting/CHANGE_SETTING', {
          key: 'musicTextShow',
          value: x
        })
      }
    }
  },
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
  methods: {
    change (x) {
      this.$store.commit('setting/CHANGE_SETTING', {
        key: 'musicTextShow',
        value: x
      })
    }
  },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured () {}
}
</script>
<style lang='stylus'>
.music-setting
  width 786px
  display flex
  flex-direction column
  .music-setting-title
    font-weight: 500;
    color rgb(102, 102, 102);
    display: block;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  .music-setting-content
    padding 10px 0 10px 20px
    display flex
    align-items center
    border-bottom: 1px solid rgba(#ccc,0.3)
    .music-setting-item-title
      flex 1 1 auto
      color rgb(102, 102, 102);
    .music-setting-item-on
      flex 0 0 42px
</style>
