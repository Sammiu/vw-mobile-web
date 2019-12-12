<template>
  <div>
    这是首页
  </div>
</template>

<script>

  export default {
    data () {
      return {
        viewName: 'home'
      }
    },
    tabBarItemSelectedHandle (activeName) {
      if (this.activeName !== activeName) {
        this.activeName = activeName
        this.$router.push(this.mappingActivePage[activeName])
      }
    }
  }
</script>

<style lang="less">
  @import "../../styles/common.less";

  .tab-bar__wrap {
    position: fixed;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    z-index: 100;
    background: #2dc1ff;
    box-sizing: border-box;
    flex-direction: row;
    justify-items: baseline;
  }

  .tab-bar_item {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #fff;

    &:active {
      opacity: .7;
      background: #7bd7fd;
      transition: 100ms;
    }
  }

  .home {
    position: relative;
    margin: 0 5px 0 0;
    width: 36px;
    height: 36px;
    .image__dpr('~/static/img/home_icon.png')
  }
</style>
