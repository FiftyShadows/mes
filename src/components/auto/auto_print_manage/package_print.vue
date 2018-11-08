<template>
  <!-- 包装唛头打印 -->
  <div class="artificial">
    <el-tabs type="border-card">
      <el-tab-pane label="待打印">
        <no-print></no-print>
      </el-tab-pane>
      <el-tab-pane label="已打印">
        <have-print></have-print>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import HaveToPrint from './package_have_print.vue'
import NoToPrint from './package_no_print.vue'
export default {
  name: 'package_print',
  components: {
    'have-print': HaveToPrint,
    'no-print': NoToPrint
  }
}
</script>
<style lang="scss" scoped>

</style>
