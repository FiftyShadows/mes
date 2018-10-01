<template>
  <div class="inventorySAP">
    <el-tabs type="border-card">
      <el-tab-pane label="盘点记录">
        <InventorySAP></InventorySAP>
      </el-tab-pane>
      <el-tab-pane label="普通盘点">
        <general></general>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import InventorySAP from './inventorySAP'
import GeneralInventory from './general_Inventory'
export default {
  name: 'inventorySAP',
  components: {
    InventorySAP,
    'general': GeneralInventory
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
