<template>
  <div>
    <div class="ms-picker-popup__mask"></div>
    <div class="ms-picker-popup__wrapper">
      <div class="ms-picker-popup">
        <div class="ms-picker-popup__header">
          <div class="ms-picker-popup_button">取消</div>
          <div class="ms-picker-popup_title">时间选择器</div>
          <div class="ms-picker-popup_button">确定</div>
        </div>
        <div class="ms-picker" ref="container">
          <div class="ms-picker-mask"></div>
          <div class="ms-picker-indicator" ref="indicator"></div>
          <div class="ms-picker-content" :class="location" ref="content">
            <div class="ms-picker-item" v-for="i in count">{{ i }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        count: 100,
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49],
        isAnimating: false
      }
    },
    computed: {
      location () {
        return this.isAnimating ? 'location' : ''
      }
    },
    methods: {
      init () {
        const {container, indicator, content} = this.$refs
        this.translateY = 0
        this.itemHeight = parseFloat(window.getComputedStyle(indicator).height)
        this.maxScrollTop = parseFloat(window.getComputedStyle(content).height) - this.itemHeight

        content.style.top = `${this.itemHeight * 2}px`

        container.addEventListener('touchstart', this.touchStartHandler.bind(this), false)
        container.addEventListener('touchmove', this.touchMoveHandler.bind(this), false)
        container.addEventListener('touchend', this.touchEndHandler.bind(this), false)
        content.addEventListener('transitionend', () => this.isAnimating = false)
      },
      setTransform (top) {
        this.$refs.content.style.transform = 'translate3d(0, ' + top + 'px, 0)'
      },
      touchStartHandler (evt) {
        evt.preventDefault()
        if (this.isAnimating) return
        clearInterval(this.timer)
        this.verticalY = 0
        this.preTouchEvt = evt
        this.startTouchTop = this.getPageY(evt)
        this.clientY = this.startTouchTop
      },
      touchMoveHandler (evt) {
        const pageY = this.getPageY(evt)
        const moveY = pageY - this.startTouchTop
        this.preTouchEvt = evt

        let translateY = moveY + this.translateY
        if (Math.abs(translateY) > this.maxScrollTop || translateY > 0) {
          if (moveY < 0) {
            translateY = Math.pow(Math.abs(moveY), 0.8) * -1 + this.translateY
          } else {
            translateY = Math.pow(moveY, 0.8) + this.translateY
          }
        }
        this.setTransform(translateY)
        this.verticalY = pageY - this.clientY
        this.clientY = pageY
      },
      touchEndHandler () {
        this.translateY = this.getPageY(this.preTouchEvt) - this.startTouchTop + this.translateY
        this.touchLeave()
        this.preTouchEvt = null
        // this.locationReset(this.translateY)
      },
      ease (translateY) {
        this.isAnimating = true
        this.translateY = translateY
        this.setTransform(this.translateY)
      },
      touchLeave () {
        const friction = ((this.verticalY >> 31) * 2 + 1) * 0.5
        this.timer = setInterval(() => {
          this.verticalY -= friction
          this.translateY += this.verticalY
          this.setTransform(this.translateY)

          if (Math.abs(this.translateY) > this.maxScrollTop) {
            console.log(1)
            clearInterval(this.timer)
            this.ease(-this.maxScrollTop)
            return
          } else if (this.translateY > 0) {
            console.log(2)
            clearInterval(this.timer)
            this.ease(0)
            return
          }

          if (Math.abs(this.verticalY) < 1) {
            console.log(3)
            clearInterval(this.timer)
            if (Math.abs(this.translateY) > this.maxScrollTop) {
              this.ease(-this.maxScrollTop)
            } else if (this.translateY > 0) {
              this.ease(0)
            }
          }
        }, 10)
      },
      getPageY (evt) {
        const target = evt.touches ? evt.touches[0] : evt
        return target.pageY
      },
      locationReset (translateY) {
        const currentIndex = Math.abs(Math.round(translateY / this.itemHeight))
        this.translateY = currentIndex * this.itemHeight * -1
        this.setTransform(this.translateY)
        this.$emit('onValueChange', {key: currentIndex, value: this.data[currentIndex]})
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style scoped lang="less">

  .ms-picker-popup__mask, .ms-picker-popup__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    transform: translateZ(1px);
  }

  .ms-picker-popup__mask {
    height: 100%;
    background-color: rgba(0, 0, 0, .2);
  }

  .ms-picker-popup {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    padding-bottom: env(safe-area-inset-bottom);
  }

  .ms-picker-popup__header {
    position: relative;
    display: flex;
    height: 80px;
    border-bottom: 1px solid #ddd;
    box-shadow: 10px 10px #ccc;
  }

  .ms-picker-popup_title {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  .ms-picker-popup_button {
    display: flex;
    width: 120px;
    color: #108ee9;
    align-items: center;
    justify-content: center;

    &:active {
      background-color: #ddd
    }
  }

  .ms-picker {
    position: relative;
    display: flex;
    height: 350px;
    width: 100%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .ms-picker-content {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;

    &.location {
      transition: all 350ms ease-out;
    }
  }

  .ms-picker-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    z-index: 3;
    background-image: -webkit-linear-gradient(top, hsla(0, 0%, 100%, .95), hsla(0, 0%, 100%, .6)), -webkit-linear-gradient(bottom, hsla(0, 0%, 100%, .95), hsla(0, 0%, 100%, .6));
    background-image: -webkit-gradient(linear, left top, left bottom, from(hsla(0, 0%, 100%, .95)), to(hsla(0, 0%, 100%, .6))), -webkit-gradient(linear, left bottom, left top, from(hsla(0, 0%, 100%, .95)), to(hsla(0, 0%, 100%, .6)));
    background-image: linear-gradient(180deg, hsla(0, 0%, 100%, .95), hsla(0, 0%, 100%, .6)), linear-gradient(0deg, hsla(0, 0%, 100%, .95), hsla(0, 0%, 100%, .6));
    background-position: top, bottom;
    background-repeat: no-repeat;
    background-size: 100% 35%;
  }

  .ms-picker-item {
    display: flex;
    height: 70px;
    font-weight: 600;
    align-items: center;
    justify-content: center;
  }

  .ms-picker-indicator {
    width: 100%;
    height: 70px;
    z-index: 3;
    background-image: linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent),
    linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
    background-position: top, bottom;
    background-size: 100% 1px;
    background-repeat: no-repeat;
  }
</style>
