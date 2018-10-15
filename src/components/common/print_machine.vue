<template>
<!--<div class="printonly">-->
  <!--<div class="print" ref="printBox">-->
    <!--<div class="printTest">-->
      <!--&lt;!&ndash;<h3 class="title">打印标题</h3>&ndash;&gt;-->
      <!--&lt;!&ndash;<h4 class="line">打印内容1：hehehhheheheheheh</h4>&ndash;&gt;-->
      <!--&lt;!&ndash;<h4 class="line">打印内容2：12312312312312312312</h4>&ndash;&gt;-->
      <!--<div id="qrcode" ref="qrcode"></div>-->
    <!--</div>-->
    <!--<div class="box"></div>-->
  <!--</div>-->
  <!--&lt;!&ndash;<el-button type="primary" @click="batchPrint()">打印</el-button>&ndash;&gt;-->
<!--</div>-->
<div class="package-print" ref="printBox">
  <!--<ul>-->
    <!--<li >-->
      <!--<div class="left-box"></div>-->
      <!--<div class="center-box">-->
        <!--<div class="line1 bold">{{item.batch}}</div>-->
        <!--<div class="line1">{{item.spec}}</div>-->
        <!--<div class="line1 bold">{{item.grade}}</div>-->
        <!--<div class="line1">{{item.silkNum}}</div>-->
        <!--<div class="line1">{{item.color}}</div>-->
        <!--<div class="line1">{{item.date}}</div>-->
        <!--<div class="line2">-->
          <!--<div>{{item.code.substring(0, 12)}}</div>-->
          <!--<div>{{item.code.substring(12)}}</div>-->
        <!--</div>-->
        <!--<div class="qrcode" ref="qrcode"></div>-->
      <!--</div>-->
      <!--<div class="right-box">-->
        <!--<div class="line3">-->
          <!--<div class="p_label"></div>-->
          <!--<div class="p_value">{{item.boxNetWeight}}</div>-->
        <!--</div>-->
        <!--<div class="line3">-->
          <!--<div class="p_label"></div>-->
          <!--<div class="p_value">{{item.boxGrossWeight}}</div>-->
        <!--</div>-->
          <ul>
            <li v-for="(item,index) in printData" :key="index">
              <div class="qrcode" ref="qrcode"></div>
              <span>{{item.line.workshop.name}}-{{item.line.name}}-{{item.item}}-{{index}}</span>
              <div class="pageBreak" v-if="(index+1)%20 === 0"><!--如果需要强制换页就在上一页的未尾出加上此代码-->
              </div>
            </li>
          </ul>
      <!--</div>-->
    <!--</li>-->
  <!--</ul>-->
</div>
</template>
<script>
import 'jQuery.print'
import QRCode from 'qrcodejs2'
export default {
  name: 'print_machine',
  props: ['printData'],
  watch: {
    printData (data) {
      this.printData = data
      this.$nextTick(function () {
        let qrcodeDoms = this.$refs.qrcode
        // console.log(qrcodeDoms)
        for (let i = 0; i < this.printData.length; i++) {
          qrcodeDoms[i].innerHTML = ''
          let qrcode = new QRCode(qrcodeDoms[i], {
            text: JSON.stringify({
              'id': this.printData[i].id,
              'item': this.printData[i].item
            })
          })
          // console.log(qrcode)
        }
        this.$nextTick(function () {
          setTimeout(() => {
            $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/print-machine.css'})
          }, 10) // 0ms也可以,不加延时二维码生成出错
        })
      })
    }
  },
  methods: {
    // qrcode (data) {
    //   let qrcodeDoms = this.$refs.qrcode
    //   let qrcode = new QRCode(qrcodeDoms, {
    //     width: 200, // 设置宽度，单位像素
    //     height: 200, // 设置高度，单位像素
    //     text: 'https://www.baidu.com' // 设置二维码内容或跳转地址
    //   })
    // },
    // print (data) {
    //   this.$nextTick(() => {
    //     let qrcodeDoms = this.$refs.qrcode
    //     let qrcode = new QRCode(qrcodeDoms, {
    //       width: 200, // 设置宽度，单位像素
    //       height: 200, // 设置高度，单位像素
    //       text: 'https://www.baidu.com' // 设置二维码内容或跳转地址
    //     })
    //     console.log(qrcode)
    //     // for (let i = 0; i < data; i++) {
    //     //   qrcodeDoms[i].innerHTML = ''
    //     //   let qrcode = new QRCode(qrcodeDoms[i], {
    //     //     // text: data[i].code,
    //     //     text: 'https://www.baidu.com', // 设置二维码内容或跳转地址
    //     //     width: 250,
    //     //     height: 250
    //     //   })
    //     //   console.log(qrcode)
    //     // }
    //     this.$nextTick(() => {
    //       setTimeout(() => {
    //         $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/normalize.css'})
    //       }, 10)
    //     })
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
  /*@import '../../../static/css/print-12-10.css';*/
.print {
  display: none;
}
</style>
