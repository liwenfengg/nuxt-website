export const state = () => ({
  searchList: [], // 保存 搜索、分类排行 、指定专辑里面   的原始列表结果  item里面 有 歌曲名name 作者artists[0].name  时长duration  专辑名album.name  播放地址src 需要通过 ids去获取  pic 需要动过ids去获取[][0].al.picUrl
  currentList: [], // 保存 当前播放 的 列表结果 点击index [ index前面的 +index +index后面的]其中一首播放 把该首idnex 变为第一首 []变为[index index后面的 + index 前面的]
  ids: null // 当前的歌曲的 id 使用这个来获取 歌曲的详细信息 歌曲名  作者 专辑名 src pic 时长
})

export const mutations = {
  setData (state, payload) {
    state[payload.key] = payload.value
  },
  setId (state, data) {
    state.ids = data
  }
}

/*
// setData mutations 方法
// use
this.$store.commit('music/setData', {
   key: 'member',
   value: data.member,
})
*/

export const getters = {
  getIds (state) {
    return state.ids
  },
  getCurrentList (state) {
    return state.currentList
  },
  getSearchList (state) {
    return state.searchList
  }
}
