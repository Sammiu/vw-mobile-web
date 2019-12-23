<template>
  <div class="pull-refresh" ref="scrollBox">
    <div class="pull-refreshing__wrapper" :style="style">
      <div class="pull-refreshing__content" ref="refreshingBox">
        <div class="refresh-loading-bar" :class="{animation: hasAnimation}"></div>
        <p>{{ refreshingText}}</p>
      </div>
    </div>
    <div :style="contentStyle">
      <slot/>
    </div>
  </div>
</template>

<script>
  const REFRESHING = 2
  const READY_REFRESH = 3
  const NONE_REFRESHING = 1

  export default {
    props: {
      enable: {default: true, type: Boolean},
      contentBackgroundColor: {default: '#fff', type: String}
    },
    data () {
      return {
        moving: false,
        moveDistance: 0,
        refreshingBoxHeight: null,
        pullState: NONE_REFRESHING
      }
    },
    computed: {
      refreshingText () {
        switch (this.pullState) {
          case REFRESHING:
            return '正在刷新'
          case READY_REFRESH:
            return '松开刷新'
          default:
            return '下拉刷新'
        }
      },
      style () {
        const style = {transform: `translate3d(0, ${this.moveDistance}px, 0)`}
        if (this.moving === false) {
          style.transition = 'all 300ms ease-out'
        }
        return style
      },
      contentStyle () {
        return Object.assign({backgroundColor: this.contentBackgroundColor}, this.style)
      },
      hasAnimation () {
        return this.pullState === REFRESHING
      }
    },
    methods: {
      touchStart (evt) {
        if (this.pullState === NONE_REFRESHING) {
          this.moveDistance !== 0 && (this.moveDistance = 0)
          this.recordStartYAxis(this.getScrollTop() <= 0, evt)
        }
      },
      touchMove (evt) {
        if (this.pullState === REFRESHING) return

        const scrollTop = this.getScrollTop()
        if (scrollTop > 0) return

        this.recordStartYAxis(this.startY === null, evt)

        const move = evt.targetTouches[0].clientY - this.startY

        if (move > 0) {
          evt.preventDefault()
          if (this.moving === false) {
            this.moving = true
          }
          this.moveDistance = Math.pow(move, 0.8)
          if (this.moveDistance > this.refreshingBoxHeight) {
            if (this.pullState === READY_REFRESH) return
            this.pullState = READY_REFRESH
          } else {
            if (this.pullState === NONE_REFRESHING) return
            this.pullState = NONE_REFRESHING
          }
        }
      },
      touchEnd (evt) {
        evt.canMove = false
        this.startY = null
        if (this.pullState === REFRESHING) return true
        this.moving = false
        if (this.moveDistance > this.refreshingBoxHeight) {
          this.pullState = REFRESHING
          this.moveDistance = this.refreshingBoxHeight
          this.$emit('onPullDownRefresh', () => {
            this.moveDistance = 0
            this.pullState = NONE_REFRESHING
          })
        } else {
          this.moveDistance = 0
        }
      },
      addPullDownEventListener () {
        if (this.enable) {
          const elem = this.$refs.scrollBox
          elem.addEventListener('touchstart', this.touchStartCallback = this.touchStart.bind(this))
          elem.addEventListener('touchmove', this.touchMoveCallback = this.touchMove.bind(this))
          elem.addEventListener('touchend', this.touchEndCallback = this.touchEnd.bind(this))
        }
      },
      removePullDownEventListener () {
        if (this.enable) {
          const elem = this.$refs.scrollBox
          elem.removeEventListener('touchstart', this.touchStartCallback)
          elem.removeEventListener('touchmove', this.touchMoveCallback)
          elem.removeEventListener('touchend', this.touchEndCallback)
        }
      },
      getScrollTop () {
        return document.documentElement.scrollTop || document.body.scrollTop
      },
      setRefreshingBoxHeight () {
        this.refreshingBoxHeight = this.$refs.refreshingBox.offsetHeight
      },
      recordStartYAxis (pass, evt) {
        if (pass) {
          evt.canMove = true
          this.startY = evt.targetTouches[0].clientY
        }
      }
    },
    mounted () {
      this.setRefreshingBoxHeight()
      this.addPullDownEventListener()
    },
    beforeDestroy () {
      this.removePullDownEventListener()
    }
  }
</script>

<style lang="less">
  .pull-refresh {
    position: relative;

    .pull-refreshing__wrapper {
      display: flex;
      margin-top: -35vh;
      height: 35vh;
      color: #666;
      background: #f1f1f1;
      align-items: flex-end;
      justify-content: center;
      will-change: transform;

      .pull-refreshing__content {
        display: flex;
        width: 200px;
        height: 130px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }

    .refresh-loading-bar {
      width: 30px;
      height: 10px;
      border-radius: 5px;
      background-color: #999;

      &.animation {
        animation: loadingJ 1.25s ease-in-out infinite alternate;
      }
    }
  }

  @keyframes loadingJ {
    0% {
      transform: translate(-30px, 0);
    }

    50% {
      background-color: #f5634a;
    }

    100% {
      transform: translate(30px, 0);
    }
  }
</style>
