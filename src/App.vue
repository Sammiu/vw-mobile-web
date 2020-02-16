<template>
  <div id="app">
    <transition
      :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"
      @after-enter="onRouteAfterEnter"
    >
      <keep-alive :include="['homepage', 'notFound']">
        <router-view ref="routerView" class="content__wrap"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      direction: state => state.mutations.direction
    })
  },
  methods: {
    onRouteAfterEnter() {
      const { onRouteAfterEnter } = this.$refs.routerView
      onRouteAfterEnter && onRouteAfterEnter()
    }
  }
}
</script>

<style lang="less">
@import './styles/common.less';

* {
  margin: 0;
  padding: 0;
}

html {
  width: 100%;
  height: 100%;
  touch-action: manipulation;
}

body {
  width: 100%;
  height: 100%;
  font-size: 28px;
  color: #333;
  background-color: #f2f2f2;
  -webkit-overflow-scrolling: touch;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app,
.content__wrap {
  width: 100%;
  height: 100%;
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
