<template>
  <div class="ms-profile-container">
    <div class="ms-profile__wrapper">
      <div class="profile-header-item left">
        <div class="avatar"></div>
      </div>
      <div class="profile-header-item right">
        <p class="profile-title">SamTT~~</p>
        <p class="profile-subtitle">手机号：13726563665</p>
      </div>
    </div>
    <div class="profile-pay-item">
      <svg class="pay-icon" viewBox="0 0 1024 1024">
        <path
          d="M510.686075 63.10934c-247.473301 0-448.840518 201.039759-448.840518 448.176392s201.3621 448.181509 448.840518 448.181509c247.472278 0 448.839495-201.044876 448.839495-448.181509S758.162446 63.10934 510.686075 63.10934L510.686075 63.10934 510.686075 63.10934 510.686075 63.10934 510.686075 63.10934 510.686075 63.10934zM510.686075 911.385153c-220.932832 0-400.662239-179.492-400.662239-400.099421 0-220.612537 179.729407-400.078954 400.662239-400.078954 220.931808 0 400.661216 179.466418 400.661216 400.078954S731.617883 911.385153 510.686075 911.385153L510.686075 911.385153 510.686075 911.385153 510.686075 911.385153 510.686075 911.385153 510.686075 911.385153zM619.266026 276.854469l-71.278393 131.145899c-19.022239 35.533284-30.617321 59.173704-34.874275 70.867024l-1.238201 0c-12.524245-28.465309-47.892777-95.782483-106.132202-202.012923l-67.041906 0 124.665301 213.826993-102.217033 0 0 47.27163 119.816876 0 0 65.107857L361.15341 603.060949l0 47.828308 119.816876 0 0 94.828762 59.438741 0 0-94.833879 115.585505 0 0-47.823192L540.41005 603.060949l0-65.107857 115.585505 0 0-47.27163L556.805462 490.681462l125.864616-213.826993L619.266026 276.854469 619.266026 276.854469 619.266026 276.854469 619.266026 276.854469 619.266026 276.854469 619.266026 276.854469zM619.266026 276.854469"
          p-id="11071" fill="#3bca72"></path>
      </svg>
      <span class="pay-text">支付</span>
      <svg class="arrow-icon" viewBox="0 0 1024 1024">
        <path d="M347.687 144.188l-52.761 52.238 313.928 316.082-316.568 313.42 52.314 52.673 369.322-365.663z"
              p-id="11899" fill="#999999"></path>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style scoped lang="less">
  @import '../../styles/common.less';

  .ms-profile-container {
    width: 100%;
    height: 100%;
    background-color: #eee;
  }

  .ms-profile__wrapper {
    display: flex;
    height: 180px;
    padding-bottom: 40px;
    background-color: #fff;
  }

  .profile-header-item {
    display: flex;

    &.left {
      display: flex;
      width: 160px;
      align-items: flex-end;
      justify-content: flex-end;
    }

    &.right {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      flex-direction: column;
    }
  }

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    .image__dpr('../assets/avatar.png')
  }

  .profile-title {
    padding-left: 60px;
    color: #333;
    font-weight: 600;
  }

  .profile-subtitle {
    padding: 10px 0 0 60px;
    font-size: 28px;
    color: #888;
  }

  .profile-pay-item {
    display: flex;
    margin: 20px 0;
    height: 80px;
    background-color: #fff;
    align-items: center;

    & .pay-icon {
      padding-left: 40px;
      width: 40px;
      height: 40px;
    }

    & .pay-text {
      padding-left: 30px;
    }

    .arrow-icon {
      margin-left: auto;
      padding-right: 20px;
      width: 36px;
      height: 36px;
    }
  }
</style>
