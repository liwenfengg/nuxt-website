<template>
  <div class="container">
    <vue-typed-js :strings="['嗨!']" :show-cursor="false">
      <h1 class="typing" />
    </vue-typed-js>
    <vue-typed-js :strings="['欢迎来到我的个人网站']" :show-cursor="false" :start-delay="500">
      <h2 class="typing" />
    </vue-typed-js>
    <vue-typed-js :strings="['自我介绍一下~']" :show-cursor="false" :start-delay="1500">
      <h2 class="typing" />
    </vue-typed-js>
    <vue-typed-js :strings="['95后，来自湖北随州，现在在上海工作，从事前端开发，个人比较活泼开朗吧，没事学学技术，打打游戏听听歌。。。']" :show-cursor="false" :start-delay="2500">
      <h4 class="typing" />
    </vue-typed-js>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus">
.container
  width 786px
  color #666
  line-height 1.5
  h1
    font-size 2em
    display: block
    margin-block-start: 0.67em
    margin-block-end: 0.67em
    margin-inline-start: 0px
    margin-inline-end: 0px
    font-weight: bold
  h2
    display: block
    font-size: 1.5em
    margin-block-start: 0.83em
    margin-block-end: 0.83em
    margin-inline-start: 0px
    margin-inline-end: 0px
    font-weight: bold
  h4
    display: block
    margin-block-start: 1.33em
    margin-block-end: 1.33em
    margin-inline-start: 0px
    margin-inline-end: 0px
    font-weight: bold
</style>
