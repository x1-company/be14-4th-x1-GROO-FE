<template>
  <div class="app">
  <main>
    <MainWithMenu/>
    <router-view></router-view> 
  </main>
  </div>
</template>

<script setup>
import MainWithMenu from './views/MainWithMenu.vue'
</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
