<template>
  <div>
    <div class="login-header__wrap">
      <div class="header-icon"></div>
    </div>
    <div class="login-form__wrap">
      <div class="login-form__item">
        <input class="login-form_input" type="text" v-model="accNumber" placeholder="请输入账号">
      </div>
      <div class="login-form__item">
        <input class="login-form_input" type="password" v-model="password" placeholder="请输入密码">
      </div>
      <div class="login-form__item">
        <button class="login-button" @click="loginHandle">登 录</button>
      </div>
    </div>
  </div>
</template>

<script>
  import service from '@/api/login'

  export default {
    data () {
      return {
        accNumber: 'admin',
        password: 'tt123456'
      }
    },
    methods: {
      loginHandle () {
        const params = this.getParams()
        service.login(params).then(res => {
          this.$router.push('/')
        }, err => {
          this.$message.show(err.message)
        })
      },
      getParams () {
        return {accNumber: this.accNumber, password: this.password}
      }
    },
    mounted () {
    }
  }
</script>

<style scoped lang="less">
  @import "../../styles/common.less";

  .login-header__wrap {
    display: flex;
    height: 250px;
    padding-bottom: 40px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background: linear-gradient(top, #7dc7ff 0%, #f5fcff 100%);
    background: -moz-linear-gradient(top, #7dc7ff 0%, #f5fcff 100%);
    background: -webkit-linear-gradient(top, #7dc7ff 0%, #f5fcff 100%);

    & .header-icon {
      width: 128px;
      height: 128px;
      .image__dpr('../assets/login_header_icon.png')
    }
  }

  .login-form__wrap {
    display: flex;
    width: 100%;
    padding: 80px 0 0 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .login-form__item {
    position: relative;
    display: flex;
    margin: 30px 0;
    width: 75%;
    .border_dpr(1px, #50b0f7, 100px);
    border-radius: 100px;
    align-items: center;
    justify-content: center;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      border-width: 0;
      border-color: transparent;
    }

    & .login-form_input {
      position: relative;
      padding: 0 24px 0 50px;
      width: 100%;
      height: 70px;
      border-color: transparent;
      border-radius: 100px;
      font-size: inherit;

      &::-webkit-input-placeholder {
        color: #bbb;
      }
    }

    .login-button {
      position: relative;
      color: #fff;
      height: 64px;
      width: 100%;
      .border_dpr(1px, #20a0ff, 100px);
      background-color: #20a0ff;
      border-radius: 100px;
      box-sizing: content-box;
      font-size: 32px;

      &:active {
        .border_dpr(1px, #1d90e6, 100px);
        background: #1d90e6;
      }
    }
  }
</style>
