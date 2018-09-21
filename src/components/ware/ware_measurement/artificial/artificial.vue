<template>
  <!-- 人工唛头 -->
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
import HaveToPrint from './artificial_have_print.vue'
import NoToPrint from './artificial_no_print.vue'
export default {
  name: 'artificial',
  components: {
    'have-print': HaveToPrint,
    'no-print': NoToPrint
  },
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('getDict', '班次')
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>

</style>
