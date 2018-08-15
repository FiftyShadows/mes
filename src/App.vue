<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png" alt="hengyi">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body,#app{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.logo {
  position: absolute;
  top: 10px;
  left: 12px;
  z-index: 999;
}
</style>
