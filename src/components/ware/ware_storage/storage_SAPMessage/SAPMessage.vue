<template>
  <!-- SAP信息 -->
  <div class="autoPackage">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px; margin-top: 10px; font-weight: bolder;">
      <el-breadcrumb-item>仓储</el-breadcrumb-item>
      <el-breadcrumb-item>库位库存</el-breadcrumb-item>
      <el-breadcrumb-item>SAP信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs type="border-card">
      <el-tab-pane label="物料查询">
        <Material></Material>
      </el-tab-pane>
      <el-tab-pane label="SAP库位">
        <Localtion></Localtion>
      </el-tab-pane>
      <el-tab-pane label="SAP状态">
        <Status></Status>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Material from './sapMaterial.vue'
import Localtion from './sapLocation.vue'
import Status from './sapStatus.vue'
export default {
  name: 'autoPackage',
  components: {
    Material,
    Localtion,
    Status
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
