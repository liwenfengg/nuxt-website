<template>
  <div class="the-music-search-list">
    <div v-if="show">
      <div v-for="(item,index) in list" :key="index" class="list-item" @click.stop="handleClick(item.ids,index)">
        <div class="name">
          {{ item.name }}
          <span @click="handleClick(item.ids,index)">
            播放
          </span>
          <span>
            <a :href="'//music.163.com/song/media/outer/url?id='+item.ids+'.mp3'" target="_blank">下载</a>
          </span>
        </div>
        <div class="artists">
          {{ item.artists }}
        </div>
        <div class="album">
          {{ item.album }}
        </div>
        <div class="duration">
          {{ item.duration | MMSS }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
渲染根据 传进来的 lsit 或者 store中的searchList 渲染就好

当点击列表中的一首歌时 做list 【index + ！！index +index】 动作 保存到store中 currentList

ids: item.id,
 name: item.name,
 url,
 pic,
 artists: item.artists[0].name,
 album: item.album.name,
 duration: item.duration
*/
export default {
  // 当项目使用keep-alive时，可搭配组件name进行缓存过滤 DOM做递归组件 vue-tools 等等
  name: 'TheMusicSearchList',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // props 可以是数组或对象，用于接收来自父组件的数据
  props: {},
  // 这里存放数据
  data () {
    return {
      show: true
    }
  },
  // 监听属性 类似于data概念
  computed: {
    list () {
      return this.$store.state.music.searchList
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
    handleClick (x, y) {
      // console.log(x, y)
      // console.log(this.list)
      // 数组的截取 合并方法
      const arrLast = this.list.slice(y, this.list.length)
      const arrPre = this.list.slice(0, y)
      const nowArr = arrLast.concat(arrPre)
      // console.log(nowArr)
      // 把这个新数组存到currentList
      this.$store.commit('music/setData', {
        key: 'currentList',
        value: nowArr
      })
      this.$store.commit('music/setData', {
        key: 'ids',
        value: x
      })
    }
  },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured () {}
}
</script>
<style lang='stylus'>
.the-music-search-list
  padding 0 20px
  .list-item
    display flex
    align-items center
    flex-direction row
    justify-content flex-start
    padding 15px
    font-size 14px
    color #666666
    border-bottom 1px solid rgba(33,33,33,0.03)
    width 1000px
    height 45px
    box-sizing border-box
    .name
      flex 0 0 400px
      padding-right 120px
      position relative
      span:first-child
        position absolute
        right 80px
        top 0
        bottom 0
        display none
      span:last-child
        position absolute
        right 40px
        top 0
        bottom 0
        display none
    .artists
      flex 1 1 auto
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    .album
      flex 0 0 200px
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    .duration
      flex 0 0 120px
      text-align right
.the-music-search-list .list-item:hover
  background-color $primary
  border-radius 24px
  transition background-color .5s linear
  color #FFFFFF
  cursor pointer
  .name>span
    display inline
    padding 0 10px
    a
      color #ffffff
      text-decoration none
</style>
