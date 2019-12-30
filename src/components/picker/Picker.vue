<template>
  <div :style="{ visibility: visible ? 'visible': 'hidden'}">
    <transition name="picker-fade">
      <div class="ms-picker-popup__mask" v-show="show"></div>
    </transition>
    <div class="ms-picker-popup__wrapper">
      <transition name="slide-in-up" @after-leave="visible = false" @after-enter="setMaxScrollTop">
        <div class="ms-picker-popup" v-show="show">
          <div class="ms-picker-popup__header">
            <div class="ms-picker-popup_button" @click.stop="close">取消</div>
            <div class="ms-picker-popup_title">时间选择器</div>
            <div class="ms-picker-popup_button" @click.stop="close">确定</div>
          </div>
          <div class="ms-picker" ref="container">
            <div class="ms-picker-mask"></div>
            <div class="ms-picker-indicator" ref="indicator"></div>
            <div class="ms-picker-content" :class="location" ref="content">
              <div class="ms-picker-item" v-for="i in count">{{ i }}</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 20,
      show: false,
      visible: false,
      isAnimating: false
    };
  },
  computed: {
    location() {
      return this.isAnimating ? "location" : "";
    },
  },
  methods: {
    init() {
      const { container, indicator, content } = this.$refs;
      this.offset = 50;
      this.translateY = 0;
      this.itemHeight = parseFloat(window.getComputedStyle(indicator).height);
      content.style.top = `${this.itemHeight * 2}px`;

      container.addEventListener(
        "touchstart",
        this.touchStartHandler.bind(this),
        false
      );
      container.addEventListener(
        "touchmove",
        this.touchMoveHandler.bind(this),
        false
      );
      container.addEventListener(
        "touchend",
        this.touchEndHandler.bind(this),
        false
      );
      content.addEventListener(
        "transitionend",
        () => (this.isAnimating = false)
      );
    },
    setMaxScrollTop(){
     this.maxScrollTop =
        parseFloat(window.getComputedStyle(this.$refs.content).height) - this.itemHeight;
    },
    open() {
      this.visible = true;
      this.$nextTick(() => setTimeout(() => (this.show = true)));
    },
    close() {
      this.show = false;
    },
    setTransform(top) {
      this.$refs.content.style.transform = "translate3d(0, " + top + "px, 0)";
    },
    touchStartHandler(evt) {
      evt.preventDefault();
      if (this.isAnimating) return;
      clearInterval(this.timer);
      this.verticalY = 0;
      this.preTouchEvt = evt;
      this.startTouchTop = this.getPageY(evt);
      this.clientY = this.startTouchTop;
    },
    touchMoveHandler(evt) {
      const pageY = this.getPageY(evt);
      const moveY = pageY - this.startTouchTop;
      this.preTouchEvt = evt;

      let translateY = moveY + this.translateY;
      if (Math.abs(translateY) > this.maxScrollTop || translateY > 0) {
        if (moveY < 0) {
          translateY = Math.pow(Math.abs(moveY), 0.8) * -1 + this.translateY;
        } else {
          translateY = Math.pow(moveY, 0.8) + this.translateY;
        }
      }
      this.setTransform(translateY);
      this.verticalY = pageY - this.clientY;
      this.clientY = pageY;
    },
    touchEndHandler() {
      this.translateY = this.getPageY(this.preTouchEvt) - this.startTouchTop + this.translateY;
      this.touchLeave();
      this.preTouchEvt = null;
    },
    touchLeave() {
      const friction = ((this.verticalY >> 31) * 2 + 1) * 0.5;
      this.timer = setInterval(() => {
        this.verticalY -= friction;
        this.translateY += this.verticalY;
        this.setTransform(this.translateY);

        if (Math.abs(this.translateY) > this.maxScrollTop + this.offset) {
          clearInterval(this.timer);
          this.locationReset(-this.maxScrollTop);
          return;
        } else if (this.translateY > this.offset) {
          clearInterval(this.timer);
          this.locationReset(0);
          return;
        }
        if (Math.abs(this.verticalY) < 1) {
          clearInterval(this.timer);
          if (Math.abs(this.translateY) > this.maxScrollTop) {
            this.locationReset(-this.maxScrollTop);
          } else if (this.translateY > 0) {
            this.locationReset(0);
          }else{
            this.locationReset(this.translateY)
          }
        }
      }, 10);
    },
    getPageY(evt) {
      const target = evt.touches ? evt.touches[0] : evt;
      return target.pageY;
    },
    locationReset(translateY) {
      const currentIndex = Math.abs(Math.round(translateY / this.itemHeight));
      this.isAnimating = true;
      this.translateY = currentIndex * this.itemHeight * -1;
      this.setTransform(this.translateY);
      this.$emit("onValueChange", {
        key: currentIndex,
        value: currentIndex
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="less">
.picker-fade-enter-active,
.picker-fade-leave-active {
  transition: opacity 0.5s;
}

.picker-fade-enter,
.picker-fade-leave-to {
  opacity: 0;
}

.slide-in-up-enter-active {
  animation: slideInUp 0.3s ease-in-out;
}

.slide-in-up-leave-active {
  animation: slideInUp 0.3s ease-in-out reverse;
}

@keyframes slideInUp {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

.ms-picker-popup__mask,
.ms-picker-popup__wrapper {
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
  background-color: rgba(0, 0, 0, 0.4);
}

.ms-picker-popup {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1001;
  background-color: #fff;
  padding-bottom: env(safe-area-inset-bottom);
}

.ms-picker-popup__header {
  position: relative;
  display: flex;
  height: 80px;
  border-bottom: 1px solid #ddd;
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
    background-color: #ddd;
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
  background-image: -webkit-linear-gradient(
      top,
      hsla(0, 0%, 100%, 0.95),
      hsla(0, 0%, 100%, 0.6)
    ),
    -webkit-linear-gradient(bottom, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6));
  background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(hsla(0, 0%, 100%, 0.95)),
      to(hsla(0, 0%, 100%, 0.6))
    ),
    -webkit-gradient(linear, left bottom, left top, from(hsla(0, 0%, 100%, 0.95)), to(hsla(0, 0%, 100%, 0.6)));
  background-image: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0.95),
      hsla(0, 0%, 100%, 0.6)
    ),
    linear-gradient(0deg, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6));
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
  background-image: linear-gradient(
      to bottom,
      #d0d0d0,
      #d0d0d0,
      transparent,
      transparent
    ),
    linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
  background-position: top, bottom;
  background-size: 100% 1px;
  background-repeat: no-repeat;
}
</style>
