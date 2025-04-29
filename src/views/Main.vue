<script setup>
import { ref } from 'vue'
import BackgroundImage from '../components/BackgroundImage.vue'
import SideMenu from '../components/SideMenu.vue'
import ForestView from '../components/ForestView.vue'

const currentView = ref('background') // 초기 상태: BackgroundImage

const changeView = (view) => {
  currentView.value = view
}
</script>

<template>
  <div class="container">
    <div class="main-area">
      <component :is="currentView === 'background' ? BackgroundImage : ForestView" />
    </div>
    <SideMenu @change-view="changeView" />
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
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.3s ease;
  background: transparent;
}
</style>