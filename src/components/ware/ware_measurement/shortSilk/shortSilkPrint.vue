<template>
  <!-- 短丝唛头打印 -->
  <div class="shortSilk">
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
import HaveToPrint from './shortSilk_have_print.vue'
import NoToPrint from './shortSilk_no_print.vue'
export default {
  name: 'shortSilk',
  components: {
    'have-print': HaveToPrint,
    'no-print': NoToPrint
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>

</style>
