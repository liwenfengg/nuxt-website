<template>
  <div id="music-search">
    <div class="the-music-search-box">
      <the-music-search-box @search="handleSearch" />
    </div>
    <div class="the-music-search-list">
      <the-music-search-list />
    </div>
  </div>
</template>

<script>
/*
// TODO
box 页面的keywords 传过来
axios 得到数据 传给 list 或者 传给store  list去 store 里面取
*/
import TheMusicSearchBox from '@/components/TheMusicSearchBox'
import TheMusicSearchList from '@/components/TheMusicSearchList'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    TheMusicSearchBox,
    TheMusicSearchList
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
  methods: {
    async search (keywords) {
      // const _this = this
      const { code, result } = await this.$axios.$get(
        '//neteasecloudmusicapi.liwenfeng.net/search', {
          params: {
            keywords,
            limit: 50
          }
        })
      const data = result.songs.map((item) => {
        return ({
          ids: item.id,
          name: item.name,
          artists: item.artists[0].name,
          album: item.album.name,
          duration: item.duration
        })
      })
      this.$store.commit('music/setData', {
        key: 'searchList',
        value: data
      })
      return code
    },
    handleSearch (keywords) {
      const loadingInstance = this.$loading({ target: '.the-music-search-list', text: '加载中...' })
      this.$nextTick(() => {
        this.search(keywords).then((x) => {
          x === 200 && loadingInstance.close()
        })
      })
    }
  },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured () {}
}
</script>
<style lang='stylus'>
#music-search
  width 1080px
  .the-music-search-box
    width 500px
    margin 0 auto
  .the-music-search-list
    margin-top 40px
</style>
