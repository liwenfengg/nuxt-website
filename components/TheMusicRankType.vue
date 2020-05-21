<template>
  <div class="the-music-rank-type">
    <div class="type-current">
      <span :style="tspan1"> 分类:</span>
      <span :style="tspan2" @click="handleClickCurrent">{{ currentType }}</span>
    </div>
    <div class="type-list" :class="{active:isActive}" @click="handleClickWrapper">
      <div class="list-wrapper">
        <div v-for="(val,key,index) in musicRankType" :key="index" :class="[key === typekey?'item-active':'']" class="list-item" @click.stop="handleClickItem(val,key)">
          {{ val }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
这个组件 从父组件 接受config 里面的type list
渲染默认的 1
给点击事件 点击时 向 父组件 emit 出去一个值 这个值就是 列表的key value
点击时  重新渲染 分类{{云音热歌榜}}
*/
export default {
  // 当项目使用keep-alive时，可搭配组件name进行缓存过滤 DOM做递归组件 vue-tools 等等
  name: 'TheMusicRankType',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // props 可以是数组或对象，用于接收来自父组件的数据
  props: {
    musicRankType: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  // 这里存放数据
  data () {
    return {
      isActive: false,
      typekey: 1,
      tspan1: {
        color: '#666'
      },
      tspan2: {
        color: '#333',
        cursor: 'pointer'
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {
    currentType () {
      return this.musicRankType[this.typekey]
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
    handleClickWrapper () {
      this.isActive = !this.isActive
    },
    handleClickCurrent () {
      this.isActive = !this.isActive
    },
    handleClickItem (val, key) {
      this.isActive = !this.isActive
      this.typekey = key
      this.$emit('item', val, key)
    }
  },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured () {}
}
</script>
<style lang='stylus'>
.the-music-rank-type
  .type-current
    margin 0 55px 0 30px
    text-align right
  .type-list
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background #FFFFFF
    opacity: 0;
    visibility: hidden;
    display flex
    justify-content center
    align-items center
    z-index 29
    transition opacity .3s
    .list-wrapper
      width 400px
      height 400px
      display flex
      align-items center
      justify-content flex-start
      flex-wrap wrap
      .list-item
        margin 0 10px
        cursor pointer
        padding 10px 10px

.the-music-rank-type .type-list .list-wrapper .item-active
  color $primary
.the-music-rank-type .active
  opacity 1
  visibility visible
  transition opacity .3s
.the-music-rank-type .type-list .list-wrapper .list-item:hover
  background-color $primary
  border-radius 5px
  transition background-color .5s linear
  color #FFFFFF
  cursor pointer
</style>
