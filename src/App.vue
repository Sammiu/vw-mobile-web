<template>
  <div id="app">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <keep-alive>
        <router-view class="content__wrap"></router-view>
      </keep-alive>
    </transition>
    <div class="tab-bar__wrap">
      <div class="tab-bar_item" @click.stop="tabBarItemSelectedHandle('home')">
        <svg t="1571106906073" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M422.63 891.821V623.712h178.74v268.109h223.424V534.342h134.054L512 132.179 65.152 534.342h134.054V891.82H422.63z"
            p-id="3377" fill="#ffffff"></path>
        </svg>
        <span>首页</span>
      </div>
      <div class="tab-bar_item" @click.stop="tabBarItemSelectedHandle('project')">
        <svg t="1571108630865" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M760.32 524.8h-307.2c-25.6 0-46.08-20.48-46.08-46.08s20.48-46.08 46.08-46.08h307.2c25.6 0 46.08 20.48 46.08 46.08s-20.48 46.08-46.08 46.08zM235.52 660.48c0 28.16 20.48 48.64 48.64 48.64s48.64-23.04 48.64-48.64c0-25.6-20.48-48.64-48.64-48.64s-48.64 20.48-48.64 48.64z m0-181.76c0 28.16 20.48 48.64 48.64 48.64s48.64-23.04 48.64-48.64c0-25.6-20.48-48.64-48.64-48.64s-48.64 23.04-48.64 48.64z m524.8 227.84h-307.2c-25.6 0-46.08-20.48-46.08-46.08s20.48-46.08 46.08-46.08h307.2c25.6 0 46.08 20.48 46.08 46.08s-20.48 46.08-46.08 46.08z m209.92 148.48V279.04c0-69.12-64-64-64-64H545.28C524.8 215.04 512 204.8 512 204.8s-15.36-25.6-43.52-66.56c-25.6-46.08-58.88-38.4-58.88-38.4H130.56C51.2 99.84 51.2 174.08 51.2 174.08v675.84c0 84.48 64 74.24 64 74.24h798.72c66.56 0 56.32-69.12 56.32-69.12z"
            fill="#ffffff"></path>
        </svg>
        <span>项目</span>
      </div>
      <div class="tab-bar_item" @click.stop="tabBarItemSelectedHandle('statistical')">
        <svg t="1571108807009" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M832 64H192c-70.4 0-128 57.6-128 128v640c0 70.4 57.6 128 128 128h640c70.4 0 128-57.6 128-128V192c0-70.4-57.6-128-128-128zM320 800c0 17.6-14.4 32-32 32h-64c-17.6 0-32-14.4-32-32V480c0-17.6 14.4-32 32-32h64c17.6 0 32 14.4 32 32v320z m256.6 0c0 17.6-14.4 32-32 32h-64c-17.6 0-32-14.4-32-32V352c0-17.6 14.4-32 32-32h64c17.6 0 32 14.4 32 32v448z m255.4 0c0 17.6-14.4 32-32 32h-64c-17.6 0-32-14.4-32-32V416c0-17.6 14.4-32 32-32h64c17.6 0 32 14.4 32 32v384z"
            fill="#ffffff"></path>
        </svg>
        <span>统计</span>
      </div>
      <div class="tab-bar_item" @click.stop="tabBarItemSelectedHandle('mine')">
        <svg t="1571108881403" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M511.671 548.59c140.983 0 255.681-114.697 255.681-255.682 0-140.984-114.697-255.682-255.681-255.682S255.989 151.923 255.989 292.908c0 140.985 114.698 255.682 255.682 255.682zM716.545 579.272h-409.09C172.113 579.272 62 679.327 62 802.314v108.725c0 42.627 36.704 77.324 81.818 77.324h736.363c45.113 0 81.818-34.697 81.818-77.324V802.314C962 679.327 851.887 579.272 716.545 579.272z"
            p-id="4222" fill="#ffffff"></path>
        </svg>
        <span>我的</span>
      </div>
    </div>
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
      tabBarItemSelectedHandle (activeName) {
        if (this.activeName !== activeName) {
          this.activeName = activeName
          this.$router.push(this.mappingActivePage[activeName])
        }
      }
    }
  }
</script>

<style lang="less">
  @import "./styles/common.less";

  html {
    touch-action: manipulation;
  }

  body {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 28px;
  }

  .content__wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .icon {
    margin: 0 5px 0 0;
    height: 34px;
    width: 34px;
  }

  .tab-bar__wrap {
    position: fixed;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    z-index: 100;
    background: #2dc1ff;
    box-sizing: border-box;
    flex-direction: row;
    justify-items: baseline;
  }

  .tab-bar_item {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .home {
    position: relative;
    margin: 0 5px 0 0;
    width: 36px;
    height: 36px;
    .image__dpr('~/static/img/home_icon.png')
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
