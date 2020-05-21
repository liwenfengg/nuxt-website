<template>
  <div id="music-sheet">
    <div class="sheet-nav">
      <the-music-sheet-nav :musci-menu="MUSCI_MENU" @cat="cat" />
    </div>
    <div v-infinite-scroll="_.throttle(scrollLoad,3000,{ 'trailing': false })" infinite-scroll-immediate="false" class="sheet-list">
      <the-music-sheet-list :playlists="playlists" />
    </div>
    <div class="scrolllast" />
  </div>
</template>

<script>
/*
设置初始 limit 为 50
offset 50 下一页数据
        100  下下页数据
 */
import TheMusicSheetNav from '@/components/TheMusicSheetNav'
import TheMusicSheetList from '@/components/TheMusicSheetList'
import { MUSCI_MENU } from '@/config/cat'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { TheMusicSheetNav, TheMusicSheetList },
  // props 可以是数组或对象，用于接收来自父组件的数据
  props: {},
  // 这里存放数据
  data () {
    return {
      MUSCI_MENU,
      playlists: [],
      keyWords: '',
      offset: 0
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
    const loadingInstance = this.$loading({ target: '.sheet-list', text: '加载中...' })
    this.$nextTick(() => {
      this.getList().then(x =>
        x === 200 && loadingInstance.close()
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
    cat (keyWords) {
      const loadingInstance = this.$loading({ target: '.sheet-list', text: '加载中...' })
      this.$nextTick(() => {
        this.keyWords = keyWords
        this.playlists.length = 0
        this.offset = 0
        this.getList(this.keyWords, this.offset).then(x =>
          x === 200 && loadingInstance.close()
        )
      })
    },
    async getList (keyWords, offset) {
      try {
        const { code, playlists } = await this.$axios.$get(
          '//neteasecloudmusicapi.liwenfeng.net/top/playlist', {
            params: {
              cat: keyWords,
              offset
            }
          })
        if (code === 200) {
          // console.log(playlists)
          this.playlists = this.playlists.concat(playlists)
        }
        return code
      } catch (error) {

      }
    },
    scrollLoad () {
      const loadingInstance = this.$loading({ target: '.scrolllast', text: '加载中...' })
      this.$nextTick(() => {
        // console.log('load')
        // console.log(this.offset += 50)
        // console.log(this.offset)
        this.getList(this.keyWords, this.offset).then(x => x === 200 && loadingInstance.close())
      })
    }
  },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured () {}
}
</script>
<style lang='stylus'>
#music-sheet
  width 1080px
  .sheet-list
    margin-top 60px
  .scrolllast
    width 100%
    height 40px
</style>
