<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router' // 현재 경로를 가져오기 위해 useRoute 사용
import SideMenu from '../components/SideMenu.vue'

const currentView = ref('background') // 초기 상태: BackgroundImage

const changeView = (view) => {
  currentView.value = view
}

const route = useRoute() // 현재 경로 가져오기
</script>

<template>
  <div class="container">
    <div class="main-area">
      <router-view />
    </div>
    <!-- /login 경로가 아닐 때만 SideMenu를 렌더링 -->
    <SideMenu v-if="route.path !== '/login'" @change-view="changeView" />
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