<template>
  <div>
    <div class="upload-file__wrap">
      <input type="file" ref="file" accept style="display: none" v-on:change="onFileChange"/>
      <div class="upload-select" @click.stop="selectFileHandle">
        <span class="icon-plus"><i class="fa fa-plus" aria-hidden="true"></i></span>
        <span>upload</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        file: null
      }
    },
    methods: {
      selectFileHandle () {
        this.$refs.file.click()
      },
      onFileChange (event) {
        console.log(event)
      }
    }
  }
</script>

<style scoped lang="less">
  .upload-file__wrap {
    display: flex;
    flex: 1;
    margin: 50px 0 0 0;
    justify-content: center;

    & .upload-select {
      display: flex;
      width: 180px;
      height: 180px;
      border: 1.5px dashed #ccc;
      border-radius: 8px;
      color: #888;
      background: #fafafa;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      & .icon-plus {
        font-size: 40px;
      }

      &:active {
        background: #f1f1f1;
      }
    }
  }
</style>
