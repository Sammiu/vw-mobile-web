<template>
  <div class="login-comp-container">
    <div class="login-header__wrap">
      <div class="header-icon"></div>
    </div>
    <div class="login-form__wrap">
      <div class="login-form__item">
        <input class="login-form_input" type="text" maxlength="25" v-model="accNumber" placeholder="请输入账号" />
      </div>
      <div class="login-form__item">
        <input class="login-form_input" type="password" maxlength="20" v-model="password" placeholder="请输入密码" />
      </div>
      <div class="login-form__item">
        <Button class="login-button" activeClassName="login-button-active" @onClick="loginHandle" :disabled="btnDisable">登 录</button>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/api/login'
import Button from '@/components/button/Button'

export default {
  data() {
    return {
      accNumber: 'admin',
      password: 'tt123456'
    }
  },
  computed: {
    btnDisable() {
      return !(this.accNumber && this.password)
    }
  },
  components: {
    Button
  },
  methods: {
    loginHandle() {
      this.$loadingBox.show()
      const params = this.getParams()
      service.login(params).then(
        res => {
          this.$router.push('/')
        },
        err => {
          this.$loadingBox.hide()
          this.$message.show(err.message)
        }
      )
    },
    getParams() {
      return { accNumber: this.accNumber, password: this.password }
    }
  },
  deactivated() {
    this.$loadingBox.hide()
  },
  destroyed() {
    this.$loadingBox.hide()
  }
}
</script>

<style lang="less">
@import '../../styles/common.less';

.login-comp-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
}

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
    .image__dpr('../assets/login_header_icon.png');
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
  padding: 30px 0;
  width: 75%;
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
    border: 1px solid #20a0ff;
    border-radius: 100px;
    font-size: inherit;
    outline: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &::-webkit-input-placeholder {
      color: #bbb;
    }
  }

  .login-button {
    position: relative;
    display: flex;
    color: #fff;
    height: 70px;
    width: 100%;
    border: 1px solid #20a0ff;
    background-color: #20a0ff;
    border-radius: 100px;
    box-sizing: content-box;
    font-size: 32px;
    outline: none;
    justify-content: center;
    align-items: center;
    user-select: none;

    &[disabled] {
      border: 1px solid #ccc;
      background-color: #ccc;
    }

    &.login-button-active {
      color: hsla(0,0%,100%,.3);
      background-color: #0e80d2;
      border-color: #0e80d2;
    }
  }
}


</style>
