<template>
  <div class="page_wrap">
    <div>用户名：{{ userInfo.username }}</div>
    <div>授权码：{{ userInfo.token }}</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'page2',
    asyncData ({store}) {
      return store.dispatch('fetchUserInfo')
    },
    computed: {
      ...mapState({
        userInfo: state => state.mutations.userInfo,
      })
    },
    mounted () {
      console.log('这是页面2')
    }
  }
</script>

<style scoped lang="less">
  .page_wrap {
    display: flex;
    flex: 1;
    color: #fff;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: url('../../assets/page_601950.jpg');
    background-size: 100% 100%;
  }
</style>
