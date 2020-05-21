<template>
  <div id="music-rank">
    <div><the-music-rank-type :music-rank-type="MUSIC_RANK_TYPE" @item="item" /></div>
    <div class="the-music-search-list">
      <the-music-search-list />
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import TheMusicRankType from '@/components/TheMusicRankType'
import TheMusicSearchList from '@/components/TheMusicSearchList'
import { MUSIC_RANK_TYPE } from '@/config/musicRankType'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { TheMusicRankType, TheMusicSearchList },
  // props 可以是数组或对象，用于接收来自父组件的数据
  props: {},
  // 这里存放数据
  data () {
    return {
      MUSIC_RANK_TYPE,
      defaultType: 1
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
    this.$nextTick(() => {
      const loadingInstance = this.$loading({ target: '.the-music-search-list', text: '加载中...' })
      // console.log(this.defaultType)
      this.getRankList(this.defaultType).then(
        x => x === 200 && loadingInstance.close()
      )
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
    async getRankList (val) {
      const { code, playlist } = await this.$axios.$get(
        '//neteasecloudmusicapi.liwenfeng.net/top/list', {
          params: {
            idx: val
          }
        })
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
      return code
    },
    item (x, y) {
      this.$nextTick(() => {
        const loadingInstance = this.$loading({ target: '.the-music-search-list', text: '加载中...' })
        this.defaultType = y
        this.getRankList(this.defaultType).then(
          x => x === 200 && loadingInstance.close()
        )
      })
    }
  },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured () {}
}
</script>
<style lang='stylus'>
#music-rank
  width 1080px
  .the-music-search-list
    margin-top 40px
</style>
