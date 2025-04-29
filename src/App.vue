<template>
  <div class="app">
  <main>
    <Main/>
    <router-view></router-view> 
  </main>
  </div>
</template>

<script setup>
import Main from './views/Main.vue'
</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
