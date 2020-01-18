<template>
  <div class="container">
    <Button class="profile-pay-item" :activeStyle="itemActiveStyle" @onClick="handleOpenDatepicker">
      <svg class="pay-icon" viewBox="0 0 1024 1024">
        <path
          d="M861.448 233.721H732.883V97.55c0-15.378-12.443-27.822-27.821-27.822S677.24 82.17 677.24 97.55V233.72H348.604V94.751c0-15.377-12.443-27.822-27.822-27.822s-27.821 12.444-27.821 27.822v138.97H162.55c-52.763 0-95.69 42.927-95.69 95.69v531.97c0 52.763 42.927 95.69 95.69 95.69h698.897c52.763 0 95.69-42.927 95.69-95.69v-531.97c0-52.763-42.927-95.69-95.69-95.69z m40.047 627.66c0 22.088-17.959 40.047-40.047 40.047H162.551c-22.088 0-40.047-17.959-40.047-40.047v-531.97c0-22.09 17.959-40.049 40.047-40.049h698.897c22.088 0 40.047 17.96 40.047 40.048v531.971z"
          p-id="1221"
          fill="#666666"
        />
        <path
          d="M288.75 485.605v55.642h55.643v-55.642h-13.91zM483.69 485.605h55.642v55.642H483.69v-55.642zM483.69 652.695h55.642v55.643H483.69v-55.643zM288.75 652.695h55.643v55.643h-55.642v-55.643zM678.41 484.736h55.642v55.642H678.41v-55.642zM678.572 652.804h55.643v55.642h-55.643v-55.642z"
          p-id="1222"
          fill="#666666"
        />
      </svg>
      <span class="pay-text">支付</span>
      <span class="pay-text">{{ defaultPickerVal }}元</span>
      <svg class="arrow-icon" viewBox="0 0 1024 1024">
        <path
          d="M347.687 144.188l-52.761 52.238 313.928 316.082-316.568 313.42 52.314 52.673 369.322-365.663z"
          p-id="11899"
          fill="#999999"
        />
      </svg>
    </Button>
    <Picker ref="picker" :data="pickerItems" @onOk="onValueChanged" />
  </div>
</template>

<script>
import Button from '@/components/button/Button'
import Picker from '@/components/picker/Picker'

export default {
  data() {
    return {
      count: 1,
      pickerItems: null,
      defaultPickerVal: 5,
      itemActiveStyle: { 'background-color': '#f1f1f1' }
    }
  },
  components: {
    Button,
    Picker
  },
  methods: {
    handleOpenDatepicker() {
      this.$refs.picker.open({ value: this.defaultPickerVal })
    },
    onValueChanged(item) {
      this.defaultPickerVal = item.value
    }
  },
  mounted() {
    const items = []
    for (let index = 1; index <= 20; index++) {
      items.push(index)
    }
    this.pickerItems = items
  }
}
</script>

<style scoped lang="less">
.container {
  height: calc(100% - 100px);
  background-color: #fff;
}

.profile-pay-item {
  display: flex;
  padding: 20px 0;
  height: 80px;
  align-items: center;
  border-top: 1px solid #e1e1e1;

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
