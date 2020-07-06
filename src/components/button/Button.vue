<template>
  <div
    class="button"
    :class="[active && activeClassName]"
    :style="[active && activeStyle]"
    :disabled="disabled"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd">
    <slot/>
  </div>
</template>
<script>
  export default {
    props: {
      longPressTime: {type: Number, default: 2000},
      disabled: {default: false, type: Boolean},
      activeClassName: {default: '', type: String},
      activeStyle: {type: [Object, String, Array]},
      stopBubble: {type: Boolean, default: false},
      enablePreventDefault: {type: Boolean, default: false}
    },
    data () {
      return {
        active: false
      }
    },
    watch: {
      disabled (newVal) {
        if (newVal === false && this.active) {
          this.active = false
        }
      }
    },
    created () {
      this.vueTouches = {}
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
      triggerEvent (type, isActive, evt) {
        const eventType = `on${type}`
        this.$emit(eventType, evt)
        if (isActive !== this.active && !this.disabled) {
          this.active = isActive
        }
      },
      onClick (evt) {
        this.triggerEvent('Click', this.active, evt)
      },
      onTouchStart (evt) {
        this.preventDefault(evt)
        this.stopPropagation(evt)
        this.vueMoves = false
        this.vueLeave = false
        this.longTouch = false
        this.vueTouches.x = evt.changedTouches[0].pageX
        this.vueTouches.y = evt.changedTouches[0].pageY
        this.time = setTimeout(() => {
          if (!this.vueLeave && !this.vueMoves) {
            this.longTouch = true
            this.triggerEvent('LongPress', this.active, evt)
          }
        }, this.longPressTime)
        this.triggerEvent('TouchStart', true, evt)
      },
      onTouchMove (evt) {
        this.preventDefault(evt)
        this.stopPropagation(evt)
        if (evt.changedTouches[0].pageX === this.vueTouches.x && evt.changedTouches[0].pageY === this.vueTouches.y) {
          this.triggerEvent('TouchMove', true, evt)
        } else {
          this.vueMoves = true
          this.triggerEvent('TouchMove', false, evt)
        }
      },
      onTouchEnd (evt) {
        this.preventDefault(evt)
        this.stopPropagation(evt)
        this.vueLeave = true
        clearTimeout(this.time)
        this.triggerEvent('TouchEnd', false, evt)
        if (!this.vueMoves && !this.longTouch) {
          this.onClick(evt)
        }
      }
    }
  }
</script>
<style lang="less">
  .button {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>
