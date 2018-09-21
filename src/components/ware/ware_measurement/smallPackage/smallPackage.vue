<template>
  <!-- 小包装唛头 -->
  <div class="smallPackage">
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
import NoPrint from './smallPackage_no_print.vue'
import HavePrint from './smallPackage_have_print.vue'
export default {
  name: 'smallPackage',
  components: {
    'no-print': NoPrint,
    'have-print': HavePrint
  },
  data () {
    return {

    }
  },
  created () {}
}
</script>
<style lang="scss" scoped>

</style>
