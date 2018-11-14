<template>
  <div class="inventorySAP">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px; margin-top: 10px; font-weight: bolder;">
      <el-breadcrumb-item>仓储</el-breadcrumb-item>
      <el-breadcrumb-item>盘点SAP</el-breadcrumb-item>
      <el-breadcrumb-item>盘点</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs type="border-card">
      <el-tab-pane label="盘点记录">
        <inventoryRecord></inventoryRecord>
      </el-tab-pane>
      <el-tab-pane label="开始盘点">
        <InventoryStart></InventoryStart>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import inventoryRecord from './inventoryRecord'
import InventoryStart from './InventoryStart'
export default {
  name: 'inventorySAP',
  components: {
    inventoryRecord,
    InventoryStart
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>

</style>
