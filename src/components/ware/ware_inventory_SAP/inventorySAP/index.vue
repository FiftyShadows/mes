<template>
  <div class="inventorySAP">
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
