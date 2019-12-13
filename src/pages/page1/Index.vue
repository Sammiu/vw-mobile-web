<template>
  <div>
    <div class="upload-file__wrap">
      <input type="file" ref="file" accept style="display: none" v-on:change="onFileChange"/>
      <div class="upload-select" @click.stop="selectFileHandle">
        <span class="icon-plus"><i class="fa fa-plus" aria-hidden="true"></i></span>
        <span>upload</span>
      </div>
    </div>
    <div class="bg__wrap">
      <div class="bg"></div>
    </div>
    <div class="user-data__wrap">
      <div>用户名：{{ userInfo.nickName }}</div>
      <div>授权码：{{ userInfo.token }}</div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'page1',
    data () {
      return {
        file: null
      }
    },
    asyncData ({store}) {
      return store.dispatch('fetchUserInfo')
    },
    computed: {
      ...mapState({
        userInfo: state => state.mutations.userInfo,
      })
    },
    methods: {
      selectFileHandle () {
        this.$refs.file.click()
      },
      onFileChange (event) {
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../styles/common.less';

  .bg__wrap {
    padding: 10px 0;
    background: #2dc1ff;
    text-align: center;
  }

  .bg {
    display: inline-block;
    height: 36px;
    width: 36px;
    .image__dpr('../assets/home_icon.png')
  }

  .upload-file__wrap {
    display: flex;
    flex: 1;
    margin: 50px 0 0 0;
    justify-content: center;

    & .upload-select {
      position: relative;
      display: flex;
      width: 180px;
      height: 180px;
      border-radius: 8px;
      color: #888;
      background: #fafafa;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .border_dpr(1px, #ff0000, 8px);

      & .icon-plus {
        font-size: 40px;
      }

      &:active {
        background: #f1f1f1;
      }
    }
  }

  .user-data__wrap {
    display: flex;
    height: 160px;
    color: #999;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
