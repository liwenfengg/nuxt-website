import Vue from 'vue'
import moment from 'moment'

moment.locale('zh-CN')

// MM:SS // sec 是秒数
Vue.filter('MMSS', (ms) => {
  const pad = (val) => {
    val = Math.floor(val)
    if (val < 10) {
      return '0' + val
    }
    return val + ''
  }
  const sec = ms / 1000
  const timeParse = (sec) => {
    let min = 0
    min = Math.floor(sec / 60)
    sec = sec - min * 60
    return pad(min) + ':' + pad(sec)
  }
  return timeParse(sec)
})

// HH:MM:SS // sec 是秒数
Vue.filter('HHMMSS', (ms) => {
  const pad = (val) => {
    val = Math.floor(val)
    if (val < 10) {
      return '0' + val
    }
    return val + ''
  }
  const sec = ms / 1000
  const timeParse = (sec) => {
    let min = 0
    min = Math.floor(sec / 60)
    let hr = 0
    hr = Math.floor(min / 60)
    sec = sec - min * 60
    return pad(hr) + ':' + pad(min) + ':' + pad(sec)
  }
  return timeParse(sec)
})
