<template>
  <el-dialog :visible="dialogVisible" :title="code">
    <div>
      <div id="qrCode"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'qr-code-dialog',
  created () {
    console.log('created' + this.code)
  },
  data () {
    return {
      dialogVisible: false,
      code: '',
      test: null
    }
  },
  methods: {
    showDialog (code) {
      this.code = code
      this.dialogVisible = true
      let self = this
      this.$nextTick(function () {
        // setTimeout(() => {
        $('#qrCode').empty()
        self.test = new QRCode('qrCode', {
          text: code,
          width: 250,
          height: 250
        })
        console.log(self.test)
        // }, 20)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../static/css/print-12-10.css';
  .print {
    display: none;
  }
</style>
