<template>
  <Button class="pay-service_item" @click="onTouchHandle" :activeStyle="itemActiveStyle">
    <svg class="service-item_icon" viewBox="0 0 1024 1024">
      <slot />
    </svg>
    <label class="service-item_label">{{ label }}</label>
  </Button>
</template>
<script>
import Button from '@/components/button/Button'

export default {
  props: {
    label: { type: String }
  },
  data() {
    return {
      itemActiveStyle: { 'background-color': '#f1f1f1' }
    }
  },
  components: {
    Button
  },
  methods: {
    onTouchHandle() {
      this.$emit('onClick')
    }
  }
}
</script>
<style lang="less" scoped>
& .pay-service_item {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;

  & .service-item_label {
    padding-top: 10px;
    font-size: 24px;
  }

  & .service-item_icon {
    width: 44px;
    height: 44px;
  }

  &.center {
    border-left: 1px solid #f3f3f3;
    border-right: 1px solid #f3f3f3;
  }
}
</style>