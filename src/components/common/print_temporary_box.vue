<template>
  <!--<div class="printonly">-->
  <!--<div class="print" ref="printBox">-->
  <!--<div class="printTest">-->
  <!--<h3 class="title">{{printData}}</h3>-->
  <!--<div id="qrcode" ref="qrcode"></div>-->
  <!--</div>-->
  <!--<div class="box"></div>-->
  <!--</div>-->
  <!--</div>-->
  <div class="package-print" ref="printBox">
    <ul>
      <li v-for="(item,index) in printData" :key="index">
        <div class="left-box"></div>
        <div>
          <div>批号：{{item.batch.batchNo}}</div>
          <div>暂存箱：{{item.code}}</div>
          <div>等级：{{item.grade.name}}</div>
          <div>丝锭数量：{{item.silkCount}}</div>
        </div>
        <div class="right-box">
          <!--<div class="line3">-->
          <!--<div class="p_label"></div>-->
          <!--<div class="p_value">{{item.boxNetWeight}}</div>-->
          <!--</div>-->
          <!--<div class="line3">-->
          <!--<div class="p_label"></div>-->
          <!--<div class="p_value">{{item.boxGrossWeight}}</div>-->
          <!--</div>-->
          <div>
            <div class="qrcode" ref="qrcode"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import 'jQuery.print'
import QRCode from 'qrcodejs2'

export default {
  name: 'print_temporary_box',
  props: ['printData'],
  watch: {
    printData (data) {
      this.printData = data
      this.$nextTick(function () {
        let qrcodeDoms = this.$refs.qrcode
        console.log(qrcodeDoms)
        console.log(this.printData)
        for (let i = 0; i < this.printData.length; i++) {
          qrcodeDoms[i].innerHTML = ''
          let ob = {type: 'TemporaryBox', batch: {}, grade: {}}
          ob.code = this.printData[i].code
          ob.batch.batchNo = this.printData[i].batch.batchNo
          ob.grade.name = this.printData[i].grade.name
          let qrcode = new QRCode(qrcodeDoms[i], {
            text: JSON.stringify(ob),
            width: 250,
            height: 250
          })
          console.log(qrcode)
        }
        this.$nextTick(function () {
          setTimeout(() => {
            $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/print-box-code.css'})
          }, 10) // 0ms也可以,不加延时二维码生成出错
        })
      })
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  @import '../../../static/css/print-12-10.css';

  .print {
    display: none;
  }
</style>
