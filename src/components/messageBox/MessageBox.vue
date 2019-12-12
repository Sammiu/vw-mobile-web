<template>
  <transition>
    <div class="message-box__wrapper" v-show="visible">
      <div class="message-box-mask" :style="{zIndex: maskZIndex}"></div>
      <div class="message-box__content" :style="{zIndex: contentZIndex}">
        <div class="message-box-header" v-show="options.title">
          {{ options.title }}
        </div>
        <div class="message-box-body">
          {{ message }}
        </div>
        <div class="message-box-footer" @click.stop="btnSureClickHandle">
          <span>确定</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        options: {},
        message: null,
        zIndex: 2000
      }
    },
    computed: {
      maskZIndex () {
        return this.zIndex + 1
      },
      contentZIndex () {
        return this.zIndex + 2
      }
    },
    methods: {
      show (message, options = {}) {
        this.options = options || {}
        this.message = message
        this.zIndex = this.zIndex + 1
        this.visible = true
      },
      btnSureClickHandle () {
        this.visible = false
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../styles/common.less';

  .message-box__wrapper {
    .fixed-full-screen;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .message-box-mask {
    .fixed-full-screen;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .message-box__content {
    position: relative;
    width: 500px;
    background-color: #fff;
    border: 0;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .message-box-body {
    padding: 30px 30px 40px 30px;
    color: #666;
    font-size: 32px;
    text-align: center;
  }

  .message-box-footer {
    position: relative;
    padding: 26px;
    font-size: 32px;
    color: #2dc1ff;
    .border-top__dpr(1px, #e2e2e2);
    text-align: center;

    &:active {
      background-color: #f9f9f9;
      border-radius: 0 0 10px 10px;
    }
  }
</style>
