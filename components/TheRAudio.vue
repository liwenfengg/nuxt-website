<template>
  <div class="the-r-audio">
    <transition>
      <div v-if="switchShow" class="r-audio-circle" @click="handeleClickCircle">
        <div class="r-audio-circle-img" :class="[goRotate?'go':'']" :style="{'background-image': 'url('+player.pic+')'}" />
      </div>
      <div v-if="!switchShow" class="r-audio-bar" @click="handleClickBar">
        <div class="r-audio-bar-bgi" :style="{'background-image': 'url('+player.pic+')'}" />
        <div class="r-audio-bar-on" :class="[goRotate?'go':'']" @click.stop="handleClickOn">
          <svg-icon v-if="switchPlayShow" icon-class="play-audio" />
          <svg-icon v-if="!switchPlayShow" icon-class="pause-audio" />
        </div>
        <div class="r-audio-bar-next" @click.stop="handleClickNext">
          <svg-icon icon-class="next-audio" />
        </div>
        <div class="r-audio-bar-name">
          <div class="r-audio-bar-name-name">
            {{ player.name }}
          </div>
          <div class="r-audio-bar-name-art">
            {{ player.artists }}
          </div>
        </div>
      </div>
    </transition>
    <audio
      id="player"
      ref="player"
      src=""
    />
    <div v-if="mtShow" class="music-text-show">
      <div class="music-text-wrapper">
        <span class="music-text">{{ g }}</span> <span class="music-text-on" @click="handleClickText"><svg-icon icon-class="close-cicle" /></span>
      </div>
    </div>
  </div>
</template>

<script>
// TODO
// 当没有列表时 点击了下一首咋办？？？
// 1.点击圆形切换为长条
// 2.点击长条播放 和下一首  以外的地方 切换为圆形
// 3.两者切换的动画
// 4.播放时圆形会旋转
// 5.默认暂停 点击播放|>  icon变为暂停||  audio.paused === false
// 6.点击暂停||  icon变为播放|>  audio.paused === true
// 7.维护一份音乐 列表[]  当点击下一首  传入下一首歌曲的 相关信息
// 8.点击一首歌时 做一份列表 【】 当前歌曲的后面所有 + 从第一首到 当前歌曲  do7
// 9.每首歌的信息 src  pic  作者  歌名  在数组中的位置index
// 10.点击下一首 用index去数组中index+1 的歌的信息 并且把index = index+1
// 这个组件要做的事？
//  当在 list页面点击一首歌 时 生成 currentList 并传入 该组件！！！  该组件 播放该list的第一首歌
//    watch监听传入该组件的数据  发生变化 做上面一步
//  当在该组件点击 下一首时 生产 该组件自己的 currentList  该组件播放该list的第一首歌
//   所以该组件 唯一接受的 props  为 currentList
// 该组件自身并不操作 vuex
/*
ids: item.id,
 name: item.name,
 url,
 pic,
 artists: item.artists[0].name,
 album: item.album.name,
 duration: item.duration,
 lrc:""
*/
// 这个组件 接受的 就是歌曲列表 播放就放【】第一个
// 显示歌词/不显示歌词
/*
根据setting  store中的状态来判断  computed
添加一个 div fix定位 显示当前的歌词  根据setting  store中的状态来判断  是否显示

*/
export default {
  // 当项目使用keep-alive时，可搭配组件name进行缓存过滤 DOM做递归组件 vue-tools 等等
  name: 'TheRAudio',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // props 可以是数组或对象，用于接收来自父组件的数据
  props: {
    player: {
      type: Object,
      default () {
        return {
          ids: 26237342,
          name: 'River Flows in You',
          url: '//s128.xiami.net/129/24129/171792/2121966_1587721726925_7643.mp3?ccode=xiami_web_web&expire=86400&duration=188&psid=a48be6d8ad0c77c094c68854bc4ac241&ups_client_netip=2409:894c:c202:12e:ace7:5ccd:77f3:6479&ups_ts=1589856848&ups_userid=0&utid=DNV0Fkt2M1ECATHTLLHABd3t&vid=2121966&fn=2121966_1587721726925_7643.mp3&vkey=B718ba54ae493ebd0385adfbaa3d79af7',
          pic: '//p2.music.126.net/8ZRSyI0ZN_4ah8uzsNd1mA==/2324367581169008.jpg',
          artists: 'Yiruma',
          album: 'Absolute Romance',
          duration: 214000,
          lrc: '[00:00.000] 纯音乐'
        }
      }
    }
  },
  // 这里存放数据
  data () {
    return {
      switchShow: true,
      switchPlayShow: true,
      audio: undefined,
      goRotate: false,
      lrcObj: null,
      g: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {
    mtShow: {
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
  watch: {
    player (newV, oldV) {
      if (newV) {
        this.play()
      }
    }
  },
  // 生命周期 - 创建之前
  beforeCreate () {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载之前
  beforeMount () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.audio = this.$refs.player
    this.init()
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
  beforeDestroy () {
    this.audio.removeEventListener('ended', () => {
      this.next()
    })
    this.audio.removeEventListener('timeupdate', () => {
      this.next()
    })
  },
  // 生命周期 - 销毁完成
  destroyed () {},
  // 方法集合
  methods: {
    handeleClickCircle () {
      // console.log('handeleClickCircle')
      this.switchShow = !this.switchShow
    },
    handleClickBar () {
      // console.log('handleClickBar')
      this.switchShow = !this.switchShow
    },
    handleClickOn () {
      // console.log(this.audio.src)

      // console.log('handleClickOn')
      this.switchPlayShow = !this.switchPlayShow
      if (this.audio.paused) {
        this.switchPlayShow = false
        this.goRotate = true
        this.audio.play()
      } else {
        this.switchPlayShow = true
        this.goRotate = false
        this.audio.pause()
      }
    },
    handleClickNext () {
      // console.log('handleClickNext')
      this.next()
    },
    init () {
      this.audio.src = this.player.url
      this.audio.addEventListener('ended', () => {
        this.next()
      })
      this.setText(this.player.lrc)
    },
    play () {
      if (!this.player.url) {
        this.$notify.info({
          title: '消息',
          message: '亲爱的,没有版权',
          offset: 100
        })
        this.pause()
      } else if (this.player.url) {
        this.switchPlayShow = false
        this.goRotate = true

        this.audio.src = this.player.url
        // 设置歌词 start
        this.setText(this.player.lrc)
        // 设置歌词 end
        this.audio.play()
      }
    },
    pause () {
      this.switchPlayShow = true
      this.goRotate = false
      this.audio.pause()
    },
    next () {
      this.$emit('next')
      this.play()
    },
    setText (text) {
      // console.log(text)
      const _this = this
      this.lrcObj = this.jx(text)
      // console.log('_this.lrcObj', this.lrcObj)
      this.audio.addEventListener('timeupdate', function () {
        const obj = _this.lrcObj[Math.floor(this.currentTime)]
        if (obj !== undefined) {
          _this.g = obj
        }
      })
    },
    jx (text) {
      console.log(`%c${text.replace(/\[\d*:\d*((\.|:)\d*)*\]/g, '')}`, 'color:#7cc7bb;word-spacing:2px;text-indent:20px;')
      // console.log('%cmail:\n\n\n%cliwenfengsss@gmail.com\n\n\n', 'color:red', 'color:#7cc7bb;text-indent:20px;')
      console.log(`%c${'基于nuxt.js的个人网站'}  ---  ${'Ryan(liwenfengsss@gmail.com)'}`, 'background-image: url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuMCIgeTE9IjAuNSIgeDI9IjEuMCIgeTI9IjAuNSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzY2Y2NjYyIvPjxzdG9wIG9mZnNldD0iMjAlIiBzdG9wLWNvbG9yPSIjMzM5OTk5Ii8+PHN0b3Agb2Zmc2V0PSI0MCUiIHN0b3AtY29sb3I9IiNjY2NjOTkiLz48c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iIzk5Y2NmZiIvPjxzdG9wIG9mZnNldD0iODAlIiBzdG9wLWNvbG9yPSIjY2NjY2ZmIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmY5OWNjIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g\');background-size: 100%;background-image: -webkit-gradient(linear, 0% 50%, 100% 50%, color-stop(0%, #66cccc), color-stop(20%, #339999), color-stop(40%, #cccc99), color-stop(60%, #99ccff), color-stop(80%, #ccccff), color-stop(100%, #ff99cc));background-image: -moz-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: -webkit-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: linear-gradient(to right, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);padding:20px 40px;color:#fff;font-size:12px;')
      const lyrics = text.split('\n')
      const lrcObj = {}
      for (let i = 0; i < lyrics.length; i++) {
        const lyric = decodeURIComponent(lyrics[i])
        const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
        const timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) { continue }
        const clause = lyric.replace(timeReg, '')
        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
          const t = timeRegExpArr[k]
          const min = Number(String(t.match(/\[\d*/i)).slice(1))
          const sec = Number(String(t.match(/:\d*/i)).slice(1))
          const time = min * 60 + sec
          lrcObj[time] = clause
        }
      }
      // console.log(lrcObj)
      return lrcObj
    },
    handleClickText () {
      this.$store.commit('setting/CHANGE_SETTING', {
        key: 'musicTextShow',
        value: false
      })
    }
  },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured () {}
}
</script>
<style lang="stylus">
@keyframes rotate{
  0%{
    transform: (0deg)
  }
  100%{
    transform: (360deg)
  }
}

.go
  animation rotate 8s linear infinite
.the-r-audio
  position relative
  .r-audio-circle
    width 56px
    height 56px
    border-radius 50%
    border 3px solid rgba(216, 196, 188, 0.36)
    transition all .5s
    overflow hidden
    .r-audio-circle-img
      width 100%
      height 100%
      background-repeat no-repeat
      background-size cover
      background-position center
      transition all .3s
  .r-audio-bar
    position fixed
    bottom 50px
    left 50px
    width 240px
    height 56px
    border-radius 10px
    // border 3px solid rgba(216, 196, 188, 0.36)
    // background green
    display flex
    justify-content flex-start
    align-items center
    transition all .5s
    padding 4px 6px
    opacity 1
    visibility visible
    z-index 14
    overflow hidden
    .r-audio-bar-bgi
      background-size cover
      background-position center center
      filter: blur(8px)
      transform scale(1.5)
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      z-index 2
      opacity 0.9
    .r-audio-bar-on
      width 36px
      height 36px
      border-radius 50%
      cursor: pointer;
      background-color: rgba(0,0,0,.18)
      transition background-color .3s
      display flex
      align-items center
      justify-content center
      color #E1E1E1
      z-index 5
    .r-audio-bar-next
      // flex 0 0 34px
      width 28px
      height 28px
      border-radius 50%
      cursor: pointer;
      background-color: rgba(0,0,0,.18)
      transition: background-color .3s
      margin-left 10px
      color #E1E1E1
      display flex
      align-items center
      justify-content center
      z-index 5
    .r-audio-bar-name
      z-index 5
      line-height 1.5
      flex 1 1 auto
      // text-align right
      height: 100%;
      overflow: hidden;
      color: #fff;
      display flex
      flex-direction column
      justify-content center
      align-items center
      box-sizing: border-box;
      padding: 0 4px  0 8px;
      visibility: visible;
      opacity: 1;
      transform: translateZ(0);
      transition: all .5s;
      cursor: default;
      max-width 154px
      .r-audio-bar-name-name
        padding: 1px 0;
        font-weight: 200;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        text-align: center;
        font-size: 16px;
        margin: 0;
      .r-audio-bar-name-art
        font-size: 12px;
        color: hsla(0,0%,100%,.8);
        margin: 0 0 4px;
        padding: 1px 0;
        font-weight: 200;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        text-align: center;
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  all: 0;
}
</style>
<style lang="stylus">
.music-text-show
  >.music-text-wrapper
    position fixed
    background hsla(0,0%,100%,0.77)
    box-shadow 0 0 30px 0 #f0f0f0
    bottom 20px
    width 400px
    height 50px
    left 50%
    right 50%
    border-radius 5px
    display flex
    align-items center
    justify-content space-between
    transition: opacity .3s;
    transform: translate3d(-50%,0,0);
    >.music-text
      flex 1 1 auto
      overflow: hidden;
      padding: 0 10px 0 40px;
      color $primary
    >.music-text-on
      flex 0 0 75px
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all .3s;
      font-size: 12px;
      color $primary
      &:hover
        background #f0f0f0
</style>
