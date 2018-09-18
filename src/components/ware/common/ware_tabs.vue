<template>
  <el-tabs type="border-card">
    <el-tab-pane v-for="(tab,index) in tabs" :key="index" :label="tab"></el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'ware_tabs',
  props: ['tabs']
}
</script>
<style lang="sass" scoped>

</style>
