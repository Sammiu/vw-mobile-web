<template>
  <div class="navbar-wrapper" :style="navbarStyle">
    <div class="navbar-left-item">
      <svg class="ios-back-icon" viewBox="0 0 1024 1024" @click.stop="clickBackHandle">
        <path
          d="M590.08 810.666667a42.666667 42.666667 0 0 1-33.28-15.786667l-206.08-256a42.666667 42.666667 0 0 1 0-54.186667l213.333333-256a42.666667 42.666667 0 0 1 65.706667 54.613334L439.04 512l184.32 228.693333a42.666667 42.666667 0 0 1-33.28 69.973334z"
          :fill="color"
        />
      </svg>
    </div>
    <div class="navbar-title__wrapper" :style="titleColor">{{ title }}</div>
    <div class="navbar-right-item"></div>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String },
    color: { type: String },
    bgColor: { type: String },
    borderBottomColor: { type: String }
  },
  data() {
    return {}
  },
  computed: {
    navbarStyle() {
      return {
        backgroundColor: this.bgColor || '#2dc1ff',
        color: this.color || '#fff',
        borderBottomColor: this.borderBottomColor || 'transparent'
      }
    },
    titleColor() {
      return { color: this.color || '#fff' }
    }
  },
  methods: {
    clickBackHandle() {
      this.$emit('onLeftArrowClick')
    }
  }
}
</script>
<style lang="less">
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 88px;
  z-index: 100;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.navbar-left-item {
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: center;

  & .ios-back-icon {
    width: 50px;
    height: 50px;
  }
}

.navbar-title__wrapper {
  display: flex;
  flex: 1 1;
  font-weight: 600;
  align-items: center;
  justify-content: center;
}

.navbar-right-item {
  position: relative;
  width: 100px;
}
</style>