<template>
  <!-- 人工唛头 -->
  <div class="artificial">
    <el-tabs type="border-card">
      <el-tab-pane label="待打印">
        <no-print></no-print>
      </el-tab-pane>
      <el-tab-pane label="已待印">
        <to-print></to-print>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import HaveToPrint from './artificial_have_to_print.vue'
import NoToPrint from './artificial_no_to_print.vue'
export default {
  name: 'artificial',
  components: {
    'to-print': HaveToPrint,
    'no-print': NoToPrint
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>

</style>
