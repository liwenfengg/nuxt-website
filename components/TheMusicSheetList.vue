<template>
  <div class="the-music-sheet-list">
    <div class="the-music-sheet-list-item-wrapper">
      <div v-for="(item,index) in playlists" :key="index" class="the-music-sheet-list-item-content" @click="handleClickItem(item.id)">
        <div class="the-music-sheet-list-item-content-top">
          <div class="the-music-sheet-list-item-content-top-pic" :style="{'background-image': 'url('+item.coverImgUrl+')'}" />
          <!-- <div class="the-music-sheet-list-item-content-top-pic" :style="{'background-image': 'url('+(item.coverImgUrl).replace(/http/,`https`)+')'}" /> -->
        </div>
        <p class="the-music-sheet-list-item-content-bottom">
          {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TheMusicSheetList',
  props: {
    playlists: {
      type: Array,
      default () {
        return []
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
    handleClickItem (id) {
      // console.log(id)
      // 通过路由去歌单i详情 页面
      this.$router.push({ path: 'sheetDetail', query: { id } })
    }
  },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured () {}
}
</script>
<style lang='stylus'>
.the-music-sheet-list
  .the-music-sheet-list-item-wrapper
    display flex
    align-items center
    justify-content space-between
    flex-wrap wrap
    width 1080px
    // background-color red
    .the-music-sheet-list-item-content
      width 184px
      height 236px
      margin 0 0 40px 0
      // background blue
      // position relative
      border-radius 8px
      box-shadow 1px 1px 24px 0 #f0f0f0
      cursor pointer
      transition-property box-shadow,transform
      transition-duration  0.3s
      transition-timing-function linear
      &:hover
        transition all 0.3s linear
        box-shadow 8px 8px 24px 0 rgb(192, 196, 204, 0.5)
        transform translateY(-10px)
      .the-music-sheet-list-item-content-top
        height 184px
        width 184px
        .the-music-sheet-list-item-content-top-pic
          border-top-left-radius  8px
          border-top-right-radius  8px
          height 184px
          width 184px
          background-repeat no-repeat
          background-position center center
          background-size cover
          // background blue
      .the-music-sheet-list-item-content-bottom
        height 52px
        // background-color  green
        padding 8px
        font-size 14px
        overflow hidden
        line-height 20px
        text-overflow ellipsis
        word-wrap break-word
</style>
