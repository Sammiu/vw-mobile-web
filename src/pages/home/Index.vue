<template>
  <PullToRefresh @onPullDownRefresh="onPullDownRefresh">
    <div class="ms-home-header__wrapper">
      <div class="home-header__item">
        <div class="project-info">
          <span class="text">10</span>
          <span class="text">总数</span>
          <span class="text">(个)</span>
        </div>
        <div class="project-info">
          <span class="text">10</span>
          <span class="text">申请</span>
          <span class="text">(个)</span>
        </div>
      </div>
      <div class="home-header__item">
        <div class="project-info">
          <span class="text">10</span>
          <span class="text">通过</span>
          <span class="text">(个)</span>
        </div>
        <div class="project-info">
          <span class="text">10</span>
          <span class="text">未通过</span>
          <span class="text">(个)</span>
        </div>
      </div>
    </div>
    <div class="home-body__wrapper">
      <div class="statistics-segmented__wrapper">
        <div class="statistics-segmented__item">
          <span>300.00</span>
          <span>总金额</span>
          <span>(元)</span>
        </div>
        <div class="statistics-segmented__item">
          <span>1560.00</span>
          <span>申请金额</span>
          <span>(元)</span>
        </div>
        <div class="statistics-segmented__item">
          <span>263.00</span>
          <span>通过金额</span>
          <span>(元)</span>
        </div>
        <div class="statistics-segmented__item">
          <span>561.00</span>
          <span>通过金额</span>
          <span>(元)</span>
        </div>
      </div>
    </div>

    <div class="home-footer_wrapper">
      <div v-for="num in count" class="list-item" @click="onJumpToPaymentPage">项目--{{ num }}</div>
    </div>
  </PullToRefresh>
</template>

<script>
import PullToRefresh from '@/components/pullTopRefresh/PullRefresh'

export default {
  data() {
    return {
      count: 20
    }
  },
  components: {
    PullToRefresh
  },
  methods: {
    onPullDownRefresh(done) {
      setTimeout(done, 3000)
    },
    onJumpToPaymentPage() {
      this.$router.push('/pay')
    }
  }
}
</script>

<style scoped lang="less">
.ms-home-header__wrapper {
  display: flex;
  flex-direction: column;

  & .home-header__item {
    display: flex;
    padding-top: 30px;
    justify-content: center;
    flex-direction: row;

    & .project-info {
      display: flex;
      width: 150px;
      height: 150px;
      border: 1px solid #ddd;
      border-radius: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      &:first-child {
        margin-right: 40px;
      }

      &:last-child {
        margin-left: 40px;
      }
    }
  }
}

.home-body__wrapper {
  padding-top: 30px;

  & .statistics-segmented__wrapper {
    display: table;
    width: 92%;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-collapse: collapse;

    & .statistics-segmented__item {
      display: table-cell;
      width: 25%;
      padding: 10px;
      border: 1px solid #ccc;
      background: #f3f3f3;
      vertical-align: middle;

      & > span {
        display: block;
        font-size: 24px;
        text-align: center;
      }
    }
  }
}

.home-footer_wrapper {
  padding-top: 30px;

  & .list-item {
    display: flex;
    padding-left: 50px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid #ccc;
    -webkit-tap-highlight-color: transparent;

    &:last-child {
      border-bottom-color: transparent;
    }
  }
}
</style>
