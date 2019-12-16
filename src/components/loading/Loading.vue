<template>
  <div class="ms-loader__wrapper" v-show="visible">
    <div class="ms-loader">
      <div class="ms-dot ms-dot-fist" :class="{animation: visible}"></div>
      <div class="ms-dot ms-dot-second" :class="{animation: visible}"></div>
      <div class="ms-dot ms-dot-third" :class="{animation: visible}"></div>
      <div class="ms-dot ms-dot-fourth" :class="{animation: visible}"></div>
      <div class="ms-dot ms-dot-fifth" :class="{animation: visible}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        zIndex: 100,
      }
    },
    methods: {
      show () {
        if (this.visible === false) {
          this.visible = true
        }
      },
      hide () {
        if (this.visible) {
          this.visible = false
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../styles/common.less';

  .md-dot-animation(@delay,@backgroundColor) {
    animation-delay: @delay;
    background-color: @backgroundColor;
  }

  .ms-loader__wrapper {
    display: flex;
    .fixed-full-screen;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .ms-loader {
    display: flex;
    width: 300px;
    height: 120px;
    background-color: #f9f9f9;
    border-radius: 10px;
    border: 1px solid #eee;
    box-shadow: 0 0 8px 4px #bbb;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }

  .ms-dot {
    margin: 0 2px;
    width: 24px;
    height: 24px;
    border-radius: 100%;
  }

  .animation {
    animation: slide 1s infinite;
  }

  @keyframes slide {
    0% {
      transform: scale(0.8);
    }
    50% {
      opacity: 0.3;
      transform: scale(1.7);
    }
    100% {
      transform: scale(0.8);
    }
  }

  .ms-dot-third {
    .md-dot-animation(0s, #32aacc)
  }

  .ms-dot-second {
    .md-dot-animation(0.1s, #64aacc)
  }

  .ms-dot-fist {
    .md-dot-animation(0.2s, #96aacc)
  }

  .ms-dot-fourth {
    .md-dot-animation(0.3s, #c8aacc)
  }

  .ms-dot-fifth {
    .md-dot-animation(0.4s, #faaacc)
  }
</style>
