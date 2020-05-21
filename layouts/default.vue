<template>
  <el-container class="el-container">
    <div class="el-header">
      <the-header />
    </div>
    <div class="el-main">
      <el-scrollbar style="height:100%;">
        <nuxt class="main-content" />
      </el-scrollbar>
    </div>
    <div id="player">
      <the-r-audio :player="player" @next="next" />
    </div>
    <div id="the-site-info">
      <the-site-info />
    </div>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import TheHeader from '@/components/TheHeader'
import TheRAudio from '@/components/TheRAudio'
import TheSiteInfo from '@/components/TheSiteInfo'
export default {
  components: {
    TheHeader,
    TheRAudio,
    TheSiteInfo
  },
  data () {
    return {
      player: {
        ids: 26237342,
        name: 'River Flows in You',
        url: '//s128.xiami.net/129/24129/171792/2121966_1587721726925_7643.mp3?ccode=xiami_web_web&expire=86400&duration=188&psid=a48be6d8ad0c77c094c68854bc4ac241&ups_client_netip=2409:894c:c202:12e:ace7:5ccd:77f3:6479&ups_ts=1589856848&ups_userid=0&utid=DNV0Fkt2M1ECATHTLLHABd3t&vid=2121966&fn=2121966_1587721726925_7643.mp3&vkey=B718ba54ae493ebd0385adfbaa3d79af7',
        pic: '//p2.music.126.net/8ZRSyI0ZN_4ah8uzsNd1mA==/2324367581169008.jpg',
        artists: 'Yiruma',
        album: 'Absolute Romance',
        duration: 214000,
        lrc: '[00:00.000] 纯音乐'
      },
      myCurrentList: [{
        ids: 26237342,
        name: 'River Flows in You',
        url: '//s128.xiami.net/129/24129/171792/2121966_1587721726925_7643.mp3?ccode=xiami_web_web&expire=86400&duration=188&psid=a48be6d8ad0c77c094c68854bc4ac241&ups_client_netip=2409:894c:c202:12e:ace7:5ccd:77f3:6479&ups_ts=1589856848&ups_userid=0&utid=DNV0Fkt2M1ECATHTLLHABd3t&vid=2121966&fn=2121966_1587721726925_7643.mp3&vkey=B718ba54ae493ebd0385adfbaa3d79af7',
        pic: '//p2.music.126.net/8ZRSyI0ZN_4ah8uzsNd1mA==/2324367581169008.jpg',
        artists: 'Yiruma',
        album: 'Absolute Romance',
        duration: 214000,
        lyric: '[00:00.000] 纯音乐'
      }, {
        ids: 404610,
        name: 'Town of Windmill',
        url: '//s128.xiami.net/238/105238/509628/1770969540_3236691_l.mp3?ccode=xiami_web_web&expire=86400&duration=141&psid=fe20d2c3cabd2648eb49f69df158d358&ups_client_netip=2409:894c:c202:12e:ace7:5ccd:77f3:6479&ups_ts=1589857050&ups_userid=0&utid=DNV0Fkt2M1ECATHTLLHABd3t&vid=1770969540&fn=1770969540_3236691_l.mp3&vkey=B286e467ec8de4457c98560971fe4cc8f',
        pic: '//p2.music.126.net/RAloNVx4neI7Od9-YBUqzA==/890604418498806.jpg',
        artists: 'a_hisa',
        album: 'Town of Windmill',
        duration: 141000,
        lyric: '[00:00.000] 纯音乐'
      }]
    }
  },
  computed: {
    ...mapGetters({ list: 'music/getCurrentList' })
  },
  watch: {
    list (newV, oldV) {
      if (newV) {
        this.myCurrentList = newV
        // console.log('watchlistnew', newV)
        const player = newV[0]
        const ids = newV[0].ids
        Promise.all([this.getPic(ids), this.getLrc(ids), this.getUrl(ids)]).then((result) => {
          // console.log('Promise.all', result)
          player.pic = result[0]
          player.lrc = result[1]
          player.url = result[2]
          this.player = player
        })
        // console.log('this.player', this.player)
        /* 拿到currentlist的第一个数据 用id请求他的url pic lrc
        请求到了跟第一条数据合并  合并后的数据就是player  把这个player 给播放器  播放器监听到了player开始播放
        播放器要播放下一首emit 要播放下一首的事件  在这个里面操作 然后把下一首的信息给播放器
        */
      }
    }
  },
  methods: {
    async getPic (ids) {
      const { code, songs } = await this.$axios.$get('//neteasecloudmusicapi.liwenfeng.net/song/detail', { // 获取pic
        params: {
          ids
        }
      })
      let pic
      if (code === 200 && songs.length !== 0 && songs[0] && songs[0].al) { pic = songs[0].al.picUrl }
      return pic
    },
    async getUrl (ids) {
      const { code, data } = await this.$axios.$get('//neteasecloudmusicapi.liwenfeng.net/song/url', { // 获取src 有可能为null  当为null  过滤掉
        params: {
          id: ids
        }
      })
      let url
      if (code === 200 && data.length !== 0) { url = data[0].url }
      return url
    },
    async  getLrc (ids) {
      const { code, lrc } = await this.$axios.$get('//neteasecloudmusicapi.liwenfeng.net/lyric', {
        params: {
          id: ids
        }
      })
      let lyric
      if (code === 200 && lrc) {
        lyric = lrc.lyric
        return lyric
      } else if (!lrc) {
        return '[00:00.000] 纯音乐'
      }
    },
    next () {
      /* 下一首

      */
      // console.log(12345)
      this.myCurrentList = (this.myCurrentList.slice(1, this.myCurrentList.length)).concat(this.myCurrentList.slice(0, 1))
      const player = this.myCurrentList[0]
      const ids = this.myCurrentList[0].ids
      Promise.all([this.getPic(ids), this.getLrc(ids), this.getUrl(ids)]).then((result) => {
        // console.log('Promise.all', result)
        player.pic = result[0]
        player.lrc = result[1]
        player.url = result[2]
        this.player = player
      })
    }
  }
}
</script>

<style lang="stylus">
.el-container
  height 100%
  .el-header
    padding 0
    height 64px
    position fixed
    top 0
    left 0
    right 0
    z-index 28
    overflow hidden
    background transparent
    box-shadow 1px 1px 25px 0 #f0f0f0
    transition background-color,color,box-shadow .3s
    margin-bottom 64px
  .el-main
    margin 0 auto
    margin-top 64px
    padding 0
    height calc(100vh - 64px)
    overflow auto
    .main-content
      margin 0 auto
      padding-top 40px
      padding-bottom 40px
#player
  position fixed
  left 50px
  bottom 50px
  z-index 88
.el-scrollbar>.el-scrollbar__wrap
  overflow-x: hidden;
</style>
<style lang="stylus">
#the-site-info
  position fixed
  bottom 10px
  right 10px
</style>
