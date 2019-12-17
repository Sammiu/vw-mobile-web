<template>
  <div id="app">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <keep-alive :include="['page1', 'page2', 'page3', 'notFound']">
        <router-view class="content__wrap"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        activeName: null,
        transitionName: null,
        mappingActivePage: {
          home: '/',
          project: '/page2',
          statistical: '/page3',
          mine: '/page4'
        },
      }
    },
    computed: {
      ...mapState({
        direction: state => state.mutations.direction,
      })
    },
    methods: {
      setActiveName (path) {
        for (let key in this.mappingActivePage) {
          if (this.mappingActivePage.hasOwnProperty(key) && this.mappingActivePage[key] === path) {
            this.activeName = key
            return
          }
        }
      }
    },
    mounted () {
      this.setActiveName(this.$route.path)
    }
  }
</script>

<style lang="less">
  @import "./styles/common.less";

  * {
    margin: 0;
    padding: 0;
  }

  html {
    /*width: 100%;*/
    /*height: 100%;*/
    touch-action: manipulation;
  }

  body {
    /*width: 100%;*/
    /*height: 100%;*/
    font-size: 28px;
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }


  .content__wrap, #app {
    width: 100%;
    height: 100%;
  }

  .icon {
    margin: 0 5px 0 0;
    height: 34px;
    width: 34px;
  }


  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 300ms;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>
