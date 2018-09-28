<template>
<div class="printonly">
  <div class="print" ref="printBox">
    <div class="printTest">
      <h3 class="title">打印标题</h3>
      <h4 class="line">打印内容1：hehehhheheheheheh</h4>
      <h4 class="line">打印内容2：12312312312312312312</h4>
  　</div>
    <div class="box"></div>
  </div>
  <el-button type="primary" @click="print()">打印</el-button>
</div>
</template>
<script>
// import $ from 'jquery'
import 'jQuery.print'
export default {
  name: 'print_marks',
  methods: {
    print () {
      // let bdhtml, sprnstr, eprnstr, prnhtml
      // bdhtml = window.document.body.innerHTML //获取当前页的html代码
      // sprnstr = "<!-- startprint -->" //设置打印开始区域
      // eprnstr = "<!-- endprint -->" //设置打印结束区域
      // prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr)) //从开始代码向后取html
      // prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr)) //从结束代码向前取html
      // console.log(prnhtml)
      // window.document.body.innerHTML = prnhtml
      // window.print()
      // window.document.body.innerHTML = bdhtml
      // $('.printonly').print()
      // console.log($(this.$refs.printBox))
      $(this.$refs.printBox).print({globalStyles: false, stylesheet: 'static/css/normalize.css'})
    }
  }
}
</script>
<style lang="scss" scoped>
.print {
  display: none;
}
</style>
