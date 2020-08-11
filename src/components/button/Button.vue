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
  import {isFunction} from '@utils'

  export default {
    name: 'Button',
    props: {
      touchstart: {type: Function},
      touchmove: {type: Function},
      touchend: {type: Function},
      enableLongTap: {type: Boolean, default: false},
      longPressTime: {type: Number, default: 2000},
      disabled: {type: Boolean, default: false},
      activeClassName: {type: String, default: ''},
      activeStyle: {type: [Object, String, Array]},
      /** 阻止事件冒泡 */
      stop: {type: Boolean, default: false},
      /** 阻止浏览器默认行为 */
      prevent: {type: Boolean, default: false}
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
      preventDefault (evt) {
        if (this.prevent) {
          evt.preventDefault()
        }
      },
      stopPropagation (evt) {
        if (this.stop) {
          evt.stopPropagation()
        }
      },
      triggerEvent (eventType, isActive, evt) {
        if (eventType === 'onClick') {
          this.$emit(eventType, evt)
        } else if (isFunction(this[eventType])) {
          this[eventType](evt)
        }
        if (isActive !== this.active && !this.disabled) {
          this.active = isActive
        }
      },
      onClick (evt) {
        if (!this.disabled) {
          this.triggerEvent('onClick', this.active, evt)
        }
      },
      bindLongTapEvent (evt) {
        if (this.enableLongTap && !this.disabled) {
          this.time = setTimeout(() => {
            if (!this.vueLeave && !this.vueMoves) {
              this.longTouch = true
              this.active = false
              this.time = null
              this.$emit('onLongPress')
            }
          }, this.longPressTime)
        }
      },
      onTouchStart (evt) {
        this.preventDefault(evt)
        this.stopPropagation(evt)
        this.vueMoves = false
        this.vueLeave = false
        this.longTouch = false
        this.vueTouches.x = evt.changedTouches[0].pageX
        this.vueTouches.y = evt.changedTouches[0].pageY
        this.bindLongTapEvent()
        this.triggerEvent('touchstart', true, evt)
      },
      onTouchMove (evt) {
        this.preventDefault(evt)
        this.stopPropagation(evt)
        if (evt.changedTouches[0].pageX === this.vueTouches.x && evt.changedTouches[0].pageY === this.vueTouches.y) {
          this.triggerEvent('touchmove', true, evt)
        } else {
          this.vueMoves = true
          this.triggerEvent('touchmove', false, evt)
        }
      },
      onTouchEnd (evt) {
        this.preventDefault(evt)
        this.stopPropagation(evt)
        this.vueLeave = true
        this.time && clearTimeout(this.time)
        this.triggerEvent('touchend', false, evt)
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
