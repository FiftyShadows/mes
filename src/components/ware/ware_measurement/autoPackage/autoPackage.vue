<template>
  <!-- 自动打包 -->
  <div class="autoPackage">
    <el-tabs type="border-card">
      <el-tab-pane label="已打印">
        <have-print></have-print>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import HaveToPrint from './auto_have_print.vue'
export default {
  name: 'autoPackage',
  components: {
    'have-print': HaveToPrint
  },
  data () {
    return {

    }
  },
  created () {},
  methods: {
    seachTableData (formName) { // 搜索列表数据
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
