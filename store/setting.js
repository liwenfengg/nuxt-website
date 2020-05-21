// import variables from '@/styles/variables.styl'

export const state = () => ({
  // theme: variables.theme
  musicTextShow: false
})

export const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
    }
  }
}
