<template>
  <div class="the-music-sheet-nav">
    <ul class="the-music-sheet-nav-main">
      <li class="the-music-sheet-nav-main-item" :class="[currenKey===5?'active':'']" @click="handleClickMainItem('全部',5)">
        全部
      </li>
      <li
        v-for="(val, ky, ind) in menuMain"
        :key="ind"
        class="the-music-sheet-nav-main-item"
        :class="[currenKey===Number(ky)?'active':'']"
        @click="handleClickMainItem(val,ky)"
      >
        {{ val }}
      </li>
    </ul>
    <ul class="the-music-sheet-nav-cat">
      <li
        v-for="(val, ind) in menuCat"
        :key="ind"
        class="the-music-sheet-nav-cat-item"
        :class="[catCurrenIndex===ind?'active':'']"
        @click="handleClickCatItem(val.name,ind)"
      >
        {{ val.name }}
      </li>
    </ul>
  </div>
</template>

<script>
/*
首先渲染上面的ul
根据一个值
渲染下面的ul
点击下面ul item  时 emit 出去 点击的内容  父组件axios
*/
export default {
  // 当项目使用keep-alive时，可搭配组件name进行缓存过滤 DOM做递归组件 vue-tools 等等
  name: 'TheMusicSheetNav',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // props 可以是数组或对象，用于接收来自父组件的数据
  props: {
    musciMenu: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  // 这里存放数据
  data () {
    return {
      currenKey: 5,
      catCurrenIndex: null
    }
  },
  // 监听属性 类似于data概念
  computed: {
    menuMain () {
      return this.musciMenu.categories
    },
    menuCat () {
      let k
      if (this.currenKey === 5) {
        k = this.musciMenu.sub.slice(0, 10)
      }
      k = this.musciMenu.sub.filter((item) => {
        return item.category === this.currenKey
      })
      return k
    }
  },
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
    handleClickMainItem (val, ky) {
      // console.log(val, ky)
      this.currenKey = Number(ky)
      // console.log(this.currenKey)
      this.catCurrenIndex = null
    },
    handleClickCatItem (val, ind) {
      // console.log(val, ind)
      this.catCurrenIndex = ind
      this.$emit('cat', val)
    }
  }
}
</script>
<style lang="stylus">
.the-music-sheet-nav
  .the-music-sheet-nav-main
    display flex
    align-items center
    justify-content center
    margin 6px auto
    .the-music-sheet-nav-main-item
      margin 0 8px
      padding 10px 5px
      position relative
      cursor pointer
      font-size 14px
      color #666
      transition all .3s
      font-weight 500
  .the-music-sheet-nav-cat
    display flex
    align-items center
    justify-content center
    margin 6px auto
    .the-music-sheet-nav-cat-item
      margin 0 8px
      padding 10px 5px
      position relative
      cursor pointer
      font-size 14px
      color #666
      transition all .3s
      font-weight 500
.the-music-sheet-nav .the-music-sheet-nav-main .the-music-sheet-nav-main-item:before
  content: "";
  position: absolute;
  background: red
  bottom: 3px;
  left: 50%;
  width: 0;
  height: 2px;
  border-radius: 4px;
  transition: all .3s;
  transform: translate(-50%,400%);
.the-music-sheet-nav .the-music-sheet-nav-main .the-music-sheet-nav-main-item.active:before
  width: 50%;
  transform: translate(-50%);
.the-music-sheet-nav .the-music-sheet-nav-cat .the-music-sheet-nav-cat-item:before
  content: "";
  position: absolute;
  background: red
  bottom: 3px;
  left: 50%;
  width: 0;
  height: 2px;
  border-radius: 4px;
  transition: all .3s;
  transform: translate(-50%,400%);
.the-music-sheet-nav .the-music-sheet-nav-cat .the-music-sheet-nav-cat-item.active:before
  width: 50%;
  transform: translate(-50%);
</style>
