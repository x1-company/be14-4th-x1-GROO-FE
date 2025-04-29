<script setup>
import BackgroundImage from '../components/BackgroundImage.vue'
import SideMenu from '../components/SideMenu.vue'
</script>

<template>
  <div class="container">
    <div class="main-area">
      <BackgroundImage />
    </div>
    <SideMenu />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.main-area {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.3s ease;
  background: transparent;
}
</style>