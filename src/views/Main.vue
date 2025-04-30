<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router"; // 현재 경로를 가져오기 위해 useRoute 사용
import SideMenu from "../components/SideMenu.vue";
import MateSideMenu from "../components/MateSideMenu.vue";

const currentView = ref("background"); // 초기 상태: BackgroundImage

const changeView = (view) => {
  currentView.value = view;
};

const route = useRoute(); // 현재 경로 가져오기
</script>

<template>
  <div class="container">
    <div class="main-area">
      <router-view />
    </div>
    <!-- 로그인 페이지가 아닐 때 -->
    <template v-if="route.path !== '/login'">
      <!-- forestmate 페이지일 때는 MateSideMenu를, 그 외에는 일반 SideMenu를 보여줌 -->
      <MateSideMenu v-if="route.name === 'ForestMate'" />
      <SideMenu v-else @change-view="changeView" />
    </template>
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
