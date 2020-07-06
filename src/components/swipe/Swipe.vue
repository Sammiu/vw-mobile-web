<template>
  <div>
    <slot/>
  </div>
</template>

<script>
  export default {
    props: {
      rightDisX: {type: Number, default: 10},
      enableSwipe: {type: Boolean, default: true},
      stopBubble: {type: Boolean, default: false},
      enablePreventDefault: {type: Boolean, default: false}
    },
    data () {
      return {}
    },
    methods: {
      stopPropagation (evt) {
        if (this.stopBubble) {
          evt.stopPropagation()
        }
      },
      preventDefault (evt) {
        if (this.enablePreventDefault) {
          evt.preventDefault()
        }
      },
      onTouchStart (e) {
        this.stopPropagation(e)
        this.preventDefault(e)
        this.vueMoves = true
        this.vueLeave = true
        this.vueTouches.x = e.changedTouches[0].pageX
        this.vueTouches.y = e.changedTouches[0].pageY
      },
      onTouchMove (e) {
        this.stopPropagation(e)
        this.preventDefault(e)
        this.vueMoves = false
        this.$emit('touchmove', e)
      },
      onTouchEnd (e) {
        this.stopPropagation(e)
        this.preventDefault(e)
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
      },
      bindEvent () {
        this.$el.addEventListener('touchstart', this.onTouchStart)
        this.$el.addEventListener('touchmove', this.onTouchMove)
        this.$el.addEventListener('touchend', this.onTouchEnd)
        this.$el.addEventListener('touchcancel', this.onTouchEnd)
      },
      unbindEvent () {
        this.$el.removeEventListener('touchstart', this.onTouchStart)
        this.$el.removeEventListener('touchmove', this.onTouchMove)
        this.$el.removeEventListener('touchend', this.onTouchEnd)
        this.$el.removeEventListener('touchcancel', this.onTouchEnd)
      }
    },
    created () {
      this.vueMoves = true
      this.vueLeave = true
      this.vueTouches = {x: 0, y: 0}
    },
    mounted () {
      this.enableSwipe && this.bindEvent()
    },
    beforeDestroy () {
      this.unbindEvent()
    }
  }
</script>

<style scoped>

</style>
