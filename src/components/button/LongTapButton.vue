<template>
  <Button listener-touch
          :stop="stop"
          :prevent="prevent"
          :active-style="activeStyle"
          :active-class-name="activeClassName"
          @onClick="onclick"
          @touchstart="ontouchstart"
          @touchmove="ontouchmove"
          @touchend="ontouchend">
    <slot/>
  </Button>
</template>

<script>
  export default {
    name: 'LongTapButton',
    props: {
      activeClassName: {type: String},
      activeStyle: {type: [Object, String, Array]},
      duration: {type: Number, default: 2000},
      /** 阻止事件冒泡 */
      stop: {type: Boolean, default: false},
      /** 阻止浏览器默认行为 */
      prevent: {type: Boolean, default: false}
    },
    methods: {
      onclick (evt) {
        this.longTouch === false && this.$emit('click', evt)
      },
      ontouchstart (evt) {
        this.vueMoves = false
        this.vueLeave = false
        this.longTouch = false
        this.touchX = evt.changedTouches[0].pageX
        this.touchY = evt.changedTouches[0].pageY
        this.bindLongTapEvent()
      },
      ontouchmove (evt) {
        const disX = Math.abs(evt.changedTouches[0].pageX - this.touchX)
        const disY = Math.abs(evt.changedTouches[0].pageY - this.touchY)
        this.vueMoves = disX >= 5 && disY >= 5
      },
      ontouchend () {
        this.vueLeave = true
        clearTimeout(this.timer)
      },
      bindLongTapEvent () {
        this.timer = setTimeout(() => {
          if (this.vueLeave === false && this.vueMoves === false) {
            this.longTouch = true
            this.$emit('longTap')
          }
        }, this.duration)
      }
    }
  }
</script>

<style scoped>

</style>
