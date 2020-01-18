<template>
  <div class="pro-list__wrapper">
    <div class="pro-list_row">
      <div class="pro-list__item">
        <span class="pro-list__item-name">管理协议</span>
      </div>
      <div class="pro-list__item">
        <span class="pro-list__item-name">项目投资</span>
      </div>
    </div>
    <div class="pro-list_row">
      <div class="pro-list__item">
        <span class="pro-list__item-name">项目计划</span>
      </div>
      <div class="pro-list__item">
        <span class="pro-list__item-name">项目信息</span>
      </div>
    </div>
    <div class="pro-list_row">
      <div class="pro-list__item">
        <span class="pro-list__item-name">管理信息</span>
      </div>
      <div class="pro-list__item">
        <span class="pro-list__item-name">投资信息</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped lang="less">
.pro-list__wrapper {
  height: calc(100% - 100px);
  background-color: #fff;

  .pro-list_row {
    display: flex;
    padding-top: 30px;
    align-items: center;
    justify-content: space-around;
  }

  & .pro-list__item {
    position: relative;
    display: flex;
    width: 280px;
    height: 200px;
    border: 1px solid #ddd;
    align-items: center;
    justify-content: center;

    & .pro-list__item-name {
      color: #666;
    }
  }
}
</style>
