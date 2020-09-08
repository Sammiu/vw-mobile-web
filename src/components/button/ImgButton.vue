<template>
  <img
    class="button"
    :class="[active && activeClassName]"
    :style="[active && activeStyle]"
    :disabled="disabled"/>
</template>
<script>
  /** IOS webView组件用的是 UIWebView
   * 还存在 300ms 延迟bug ,针对bug, 采用了touch事件处理模拟点击
   * 模拟事件对IOS有效,  Android不做任何处理
   **/
  export default {
    name: 'ImgButton',
    props: {
      activeClassName: {type: String},
      activeStyle: {type: [Object, String, Array]},
      /** 按钮禁用 */
      disabled: {type: Boolean, default: false},
      /** 阻止事件冒泡 */
      stop: {type: Boolean, default: false},
      /** 阻止浏览器默认行为 */
      prevent: {type: Boolean, default: false},
      /** 监听touch 事件 默认：false */
      listenerTouch: {type: Boolean, default: false}
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
      this.isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1
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
        if (eventType === 'onClick' || this.listenerTouch) {
          this.$emit(eventType, evt)
        }
        if (isActive !== this.active && !this.disabled) {
          this.active = isActive
        }
      },
      onclick (evt) {
        if (this.disabled === false) {
          this.triggerEvent('onClick', this.active, evt)
        }
      },
      ontouchstart (evt) {
        this.stopPropagation(evt)
        this.vueMoves = false
        this.vueTouches.x = evt.changedTouches[0].pageX
        this.vueTouches.y = evt.changedTouches[0].pageY
        this.triggerEvent('touchstart', true, evt)
      },
      ontouchmove (evt) {
        this.preventDefault(evt)
        this.stopPropagation(evt)
        const disX = Math.abs(evt.changedTouches[0].pageX - this.vueTouches.x)
        const disY = Math.abs(evt.changedTouches[0].pageY - this.vueTouches.y)
        if (disX <= 5 && disY <= 5) {
          this.triggerEvent('touchmove', true, evt)
        } else {
          this.vueMoves = true
          this.triggerEvent('touchmove', false, evt)
        }
      },
      ontouchend (evt) {
        this.preventDefault(evt)
        this.stopPropagation(evt)
        this.triggerEvent('touchend', false, evt)
        if (this.isAndroid === false && this.vueMoves === false) {
          this.onclick(evt)
        }
      },
      bindEvent () {
        if (this.isAndroid) {
          this.$el.addEventListener('click', this.onclick)
        }

        if (this.isAndroid === false || this.listenerTouch) {
          this.$el.addEventListener('touchstart', this.ontouchstart)
          this.$el.addEventListener('touchmove', this.ontouchmove)
          this.$el.addEventListener('touchend', this.ontouchend)
          this.$el.addEventListener('touchcancel', this.ontouchend)
        }
        this.$once('hook:beforeDestroy', this.unbindEvent)
      },
      unbindEvent () {
        if (this.isAndroid) {
          this.$el.removeEventListener('click', this.onclick)
        }

        if (this.isAndroid === false || this.listenerTouch) {
          this.$el.removeEventListener('touchstart', this.ontouchstart)
          this.$el.removeEventListener('touchmove', this.ontouchmove)
          this.$el.removeEventListener('touchend', this.ontouchend)
          this.$el.removeEventListener('touchcancel', this.ontouchend)
        }
      }
    },
    mounted () {
      this.bindEvent()
    }
  }
</script>
<style lang="less">
  .button {
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>
