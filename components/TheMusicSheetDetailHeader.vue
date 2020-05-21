<template>
  <div class="the-music-sheet-detail-header">
    <div class="dh-left">
      <div class="detail-img" :style="{'background-image': 'url('+details.coverImgUrl+')'}" />
    </div>
    <div class="dh-right">
      <div class="detail-name">
        {{ details.name }}
      </div>
      <div class="detail-des">
        {{ details.description }}
      </div>
      <div class="detail-count">
        <span>共 {{ details.trackCount }} 首音乐</span><span>{{ details.playCount }} 人听过</span>
      </div>
      <div class="close-detail" @click="handleClose">
        <svg-icon icon-class="close" />
      </div>
    </div>
  </div>
</template>

<script>
/*
        description: '',
        name: '',
        playCount: null,
        trackCount: null,
        coverImgUrl: '' */
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
export default {
  // 当项目使用keep-alive时，可搭配组件name进行缓存过滤 DOM做递归组件 vue-tools 等等
  name: 'TheMusicSheetDetailHeader',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // props 可以是数组或对象，用于接收来自父组件的数据
  props: {
    details: {
      type: Object,
      default () {
        return {}
      }
    }
  },
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
  methods: {
    handleClose () {
      this.$router.push({ path: 'sheet' })
    }
  },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured () {}
}
</script>
<style lang='stylus'>
.the-music-sheet-detail-header
  height 200px
  display flex
  .dh-left
    margin-right 60px
    flex 0 0 200px
    .detail-img
      height 200px
      width 200px
      border-radius 8px
      background-repeat no-repeat
      background-position center center
      background-size cover
  .dh-right
    flex 1 1 auto
    display flex
    flex-direction column
    position relative
    // justify-content space-between
    .detail-name
      padding-top 10px
      margin-bottom 30px
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin-top: 0;
      color #666
      font-size 18px
      font-weight 700
    .detail-des
      width: 100%;
      height: 66px;
      line-height: 33px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      word-wrap: break-word;
      -webkit-box-orient: vertical;
      color #666
    .detail-count
      color #666
      margin-top: 20px;
      font-size: 14px;
      span
        margin-right 50px
    >.close-detail
      position absolute
      top 20px
      right 70px
      cursor pointer
</style>
