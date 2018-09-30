<template>
<div class="printonly">
  <div class="print" ref="printBox">
    <div class="printTest">
      <h3 class="title">打印标题</h3>
      <h4 class="line">打印内容1：hehehhheheheheheh</h4>
      <h4 class="line">打印内容2：12312312312312312312</h4>
      <div id="qrcode" ref="qrcode"></div>
    </div>
    <div class="box"></div>
  </div>
  <el-button type="primary" @click="print()">打印</el-button>
</div>
</template>
<script>
import 'jQuery.print'
import QRCode from 'qrcodejs2'
export default {
  name: 'print_marks',
  methods: {
    qrcode () {
      let qrcodeDoms = this.$refs.qrcode
      qrcodeDoms.innerHTML = ''
      let qrcode = new QRCode(qrcodeDoms, {
        width: 200, // 设置宽度，单位像素
        height: 200, // 设置高度，单位像素
        text: 'https://www.baidu.com'   // 设置二维码内容或跳转地址
      })
      console.log(qrcode)
    },
    print () {
      this.$nextTick(() => {
          this.qrcode()
      })
      this.$nextTick(() => {
        setTimeout(() => {
          $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/normalize.css'})
        }, 10)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.print {
  display: none;
}
</style>
