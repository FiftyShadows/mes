<template>
  <div class="printonly">
    <div id="printTest">
  　　<p>锄禾日当午</p>
  　　<p>汗滴禾下土 </p>
  　　<p>谁知盘中餐</p>
  　　<p>粒粒皆辛苦</p>
  　</div>
    <el-button type="primary" v-print="'#printTest'">打印</el-button>
  </div>
</template>
<script>
export default {
  name: 'print_marks',
  methods: {
    print () {
      window.print()
    }
  }
}
</script>
<style lang="scss" scoped>
@media print {
  input, .noprint {
    display: none;
  }
  .printonly {
    display: block;
    width: 50%;
  }
}
@page {
  size: 5.5in 8.5in;
  size: A4 landscape;
}
</style>
