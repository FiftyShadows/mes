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
<style lang="scss">
.index {
  width: 100%;
  height: 100%;
}
.img {
  display: inline-block;
  width: 100%;
  height: 100%;
  background-image: url('../assets/index.jpg');
  background-size: cover;
  animation: appear 1s;
  animation-fill-mode : forwards;
}
@keyframes appear {
  from {
    opacity: .5;
  }
  to {
    opacity: 1;
  }
}
</style>
