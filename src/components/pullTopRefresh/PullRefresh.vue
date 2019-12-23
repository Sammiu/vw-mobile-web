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
        YDistance: 0,
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
        const style = {transform: `translate3d(0, ${this.YDistance}px, 0)`}
        if (this.pullState === REFRESHING) {
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
      triggerLoading () {
        this.pullState = REFRESHING
        this.YDistance = this.refreshingBoxHeight
        this.emitRefreshEvent()
      },
      emitRefreshEvent () {
        this.$emit('onPullDownRefresh', () => {
          this.YDistance = 0
          this.pullState = NONE_REFRESHING
        })
      },
      touchStart (evt) {
        if (this.pullState === NONE_REFRESHING) {
          this.YDistance !== 0 && (this.YDistance = 0)
          this.recordStartYAxis(this.getScrollTop() <= 0, evt)
        }
      },
      touchMove (evt) {
        if (this.pullState === REFRESHING || this.getScrollTop() > 0) {
          return
        }
        this.recordStartYAxis(this.startY === null, evt)

        const moveY = evt.targetTouches[0].clientY - this.startY
        if (moveY > 0) {
          evt.preventDefault()
          this.YDistance = Math.pow(moveY, 0.8)
          if (this.YDistance > this.refreshingBoxHeight) {
            if (this.pullState !== READY_REFRESH) {
              this.pullState = READY_REFRESH
            }
          } else {
            if (this.pullState !== NONE_REFRESHING) {
              this.pullState = NONE_REFRESHING
            }
          }
        }
      },
      touchEnd (evt) {
        this.startY = null
        evt.canMove = false

        if (this.pullState === REFRESHING) return
        if (this.YDistance > this.refreshingBoxHeight) {
          this.triggerLoading()
        } else {
          this.YDistance = 0
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
