<template>
  <!-- SAP信息 -->
  <div class="autoPackage">
    <el-tabs type="border-card">
      <el-tab-pane label="物料查询">
        <Material></Material>
      </el-tab-pane>
      <el-tab-pane label="SAP库位">
        <Localtion></Localtion>
      </el-tab-pane>
      <el-tab-pane label="SAP状态">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Material from './sapMaterial.vue'
import Localtion from './sapLocation.vue'
export default {
  name: 'autoPackage',
  components: {
    Material,
    Localtion
  },
  data () {
    return {

    }
  },
  created () {},
  methods: {
    // seachTableData (formName) { // 搜索列表数据
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //     } else {
    //       return false
    //     }
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>

</style>
