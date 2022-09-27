<template>
  <div id="wrap" class="canvas-page">
    <canvas id="canvas" ref="canvas" />
  </div>
</template>

<script>
  import backgroundImage from '@images/back.jpg'

  export default {
    name: 'pp-canvas',
    mounted () {
      const cSSStyleDeclaration = window.getComputedStyle(document.querySelector('#wrap'))
      const width = parseInt(cSSStyleDeclaration.getPropertyValue('width'))
      const height = parseInt(cSSStyleDeclaration.getPropertyValue('height'))
      const canvas = this.$refs.canvas
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      canvas.width = width
      canvas.height = height

      const image = new Image()

      if (canvas.getContext) {
        const context = canvas.getContext('2d')

        let offset = 9

        context.translate(0, 0.5)

        image.src = backgroundImage
        image.onload = function () {
          context.drawImage(image, 120, 30, 54, 86)
        }

        // eslint-disable-next-line no-inner-declarations
        function draw () {
          context.clearRect(0, 0, canvas.width, canvas.height)
          context.setLineDash([6, 4])
          context.lineWidth = 1
          context.lineDashOffset = -offset
          context.moveTo(80, 120)
          context.lineTo(300, 120)
          context.stroke()

          context.drawImage(image, 120, 60, 54, 86)
        }

        // eslint-disable-next-line no-inner-declarations
        function march () {
          offset--
          if (offset < 0) {
            offset = 9
          }
          draw()
          setTimeout(march, 100)
        }

        march()
      }
    }
  }
</script>

<style lang="less" scoped>
  .canvas-page {
    width: 100%;
    height: 10rem;
    background-color: #eee;
    border: 1px dashed #FF0000;
  }
</style>
