<template>
  <div @touchstart.passive="onTouchStart"
       @touchmove.passive="onTouchMove"
       @touchend.passive="onTouchEnd"
       @touchcancel.passive="onTouchEnd">
    <slot/>
  </div>
</template>

<script>
  export default {
    props: {
      rightDisX: {type: Number, default: 10},
      enableSwipe: {type: Boolean, default: true},
      /** 阻止事件冒泡 */
      stop: {type: Boolean, default: false}
    },
    methods: {
      stopPropagation (evt) {
        if (this.stop) {
          evt.stopPropagation()
        }
      },
      onTouchStart (e) {
        if (!this.enableSwipe) {
          return
        }
        this.stopPropagation(e)
        this.vueMoves = true
        this.vueLeave = true
        this.vueTouches.x = e.changedTouches[0].pageX
        this.vueTouches.y = e.changedTouches[0].pageY
      },
      onTouchMove (e) {
        this.stopPropagation(e)
        if (!this.enableSwipe) {
          return
        }
        this.vueMoves = e.changedTouches[0].pageX === this.vueTouches.x && e.changedTouches[0].pageY === this.vueTouches.y
        this.$emit('touchmove', e)
      },
      onTouchEnd (e) {
        this.stopPropagation(e)
        if (!this.enableSwipe) {
          return
        }
        const disX = e.changedTouches[0].pageX - this.vueTouches.x
        const disY = e.changedTouches[0].pageY - this.vueTouches.y
        if (Math.abs(disX) > 10 || Math.abs(disY) > 100) {
          if (Math.abs(disX) > Math.abs(disY)) {
            if (disX > this.rightDisX) {
              this.$emit('onSwipeRight', e, this.vueTouches)
            }
            if (disX < -10) {
              this.$emit('onSwipeLeft', e, this.vueTouches)
            }
          } else {
            if (disY > 10) {
              this.$emit('onSwipeDown', e, this.vueTouches)
            }
            if (disY < -10) {
              this.$emit('onSwipeUp', e, this.vueTouches)
            }
          }
        } else {
          if (this.vueMoves) {
            this.$emit('click', e)
          }
        }
      }
    },
    created () {
      this.vueMoves = true
      this.vueLeave = true
      this.vueTouches = {x: 0, y: 0}
    }
  }
</script>

<style scoped>

</style>
