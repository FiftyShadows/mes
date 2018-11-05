<template>
  <!-- 默认页 -->
  <div class="index">
    <i class="img"></i>
  </div>
</template>
<script>
export default {
  name: 'index'
}
</script>
<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  // margin-left: -20px;
  // margin-top: -20px;
}
.img {
  display: inline-block;
  width: 100%;
  height: 100%;
  // border: 1px solid black;
  background-image: url('../assets/index.jpg');
  background-size: cover;
}
</style>
