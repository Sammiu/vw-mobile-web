<template>
  <div
    class="button"
    :class="[active && activeClassName]"
    :style="[active && activeStyle]"
    :disabled="disabled"
    @click.top="onClick"
  >
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    disabled: { default: false, type: Boolean },
    activeClassName: { default: '', type: String },
    activeStyle: { type: [Object, String, Array] }
  },
  data() {
    return {
      active: false
    }
  },
  watch: {
    disabled(newVal) {
      if (newVal === false && this.active) {
        this.active = false
      }
    }
  },
  methods: {
    triggerEvent(type, isActive, evt) {
      const eventType = `on${type}`
      this.$emit(eventType, evt)

      if (isActive !== this.active && !this.disabled) {
        this.active = isActive
      }
    },
    onClick(evt) {
      this.triggerEvent('Click', this.active, evt)
    },
    onTouchStart(evt) {
      this.triggerEvent('TouchStart', true, evt)
    },
    onTouchMove(evt) {
      this.triggerEvent('TouchMove', false, evt)
    },
    onTouchEnd(evt) {
      this.triggerEvent('TouchEnd', false, evt)
    },
    bindEvent() {
      this.$el.addEventListener('touchstart', this.onTouchStart)
      this.$el.addEventListener('touchmove', this.onTouchMove)
      this.$el.addEventListener('touchend', this.onTouchEnd)
      this.$el.addEventListener('touchcancel', this.onTouchEnd)
    },
    unbindEvent() {
      this.$el.removeEventListener('touchstart', this.onTouchStart)
      this.$el.removeEventListener('touchmove', this.onTouchMove)
      this.$el.removeEventListener('touchend', this.onTouchEnd)
      this.$el.removeEventListener('touchcancel', this.onTouchEnd)
    }
  },
  mounted() {
    this.bindEvent()
  },
  beforeDestroy() {
    this.unbindEvent()
  }
}
</script>
<style lang="less">
.button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>