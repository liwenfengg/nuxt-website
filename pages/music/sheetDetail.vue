<template>
  <div id="sheet-detail">
    <div class="sheet-detail-header">
      <the-music-sheet-detail-header :details="details" />
    </div>
    <div class="search-list">
      <the-music-search-list />
    </div>
  </div>
</template>

<script>
import TheMusicSheetDetailHeader from '@/components/TheMusicSheetDetailHeader'
import TheMusicSearchList from '@/components/TheMusicSearchList'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { TheMusicSheetDetailHeader, TheMusicSearchList },
  // props 可以是数组或对象，用于接收来自父组件的数据
  props: {},
  // 这里存放数据
  data () {
    return {
      details: {
        description: '',
        name: '',
        playCount: null,
        trackCount: null,
        coverImgUrl: ''
      }
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
    const loadingInstance = this.$loading({ target: '.search-list', text: '加载中...' })
    this.$nextTick(() => {
      // console.log(this.$route.query)
      this.id = Number(this.$route.query.id)
      this.getList(this.id).then(x => x === 200 && loadingInstance.close())
    })
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
    async getList (id) {
      const { code, playlist } = await this.$axios.$get('//neteasecloudmusicapi.liwenfeng.net/playlist/detail', {
        params: {
          id
        }
      })
      this.details = {
        description: playlist.description,
        name: playlist.name,
        playCount: playlist.playCount,
        trackCount: playlist.trackCount,
        coverImgUrl: playlist.coverImgUrl
      }
      if (code === 200) {
        const data = playlist.tracks.map((item) => {
          return ({
            name: item.name,
            ids: item.id,
            artists: item.ar[0].name,
            album: item.al.name,
            duration: item.dt
          })
        })
        this.$store.commit('music/setData', {
          key: 'searchList',
          value: data
        })
      }
      return code
    }
  },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured () {}
}
</script>
<style lang='stylus'>
#sheet-detail
  width 1080px
  >.sheet-detail-header
    margin-bottom 60px
  >.search-list
    margin-top 30px
  >.close-detail
    position fixed
    top 100px
    left 1080px
</style>
