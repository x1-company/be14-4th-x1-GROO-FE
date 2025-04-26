<script setup>
import { ref, computed } from 'vue'

const isMenuOpen = ref(false)
const isMenuItemSelected = ref(false)

const sidebarWidth = computed(() => {
  if (!isMenuOpen.value) return 60
  return isMenuItemSelected.value ? window.innerWidth * 0.3333 : window.innerWidth * 0.22
})

const mainWidth = computed(() => {
  return `calc(100vw - ${sidebarWidth.value}px)`
})

const toggleMenu = () => {
  if (isMenuItemSelected.value) {
    isMenuItemSelected.value = false
  }
  isMenuOpen.value = !isMenuOpen.value
}

const selectMenuItem = () => {
  isMenuItemSelected.value = true
}
</script>

<template>
  <div class="container">
    <div class="main-area" :style="{ width: mainWidth }">
      <img class="background" src="https://x1-groo.s3.ap-northeast-2.amazonaws.com/background_green" alt="Green Background" />
    </div>

    <div class="side-menu" :class="{ open: isMenuOpen }" :style="{ width: sidebarWidth + 'px' }">
      <button class="toggle-button" @click="toggleMenu">
        {{ isMenuOpen ? '»' : '«' }}
      </button>
      <div class="menu-content" v-if="isMenuOpen">
        <p @click="selectMenuItem">🌱 메뉴 항목 1</p>
        <p @click="selectMenuItem">🌿 메뉴 항목 2</p>
        <p @click="selectMenuItem">🌼 메뉴 항목 3</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* 메인 영역 */
.main-area {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.3s ease;
  background: transparent;
}

.background {
  width: 50%;
}

/* 사이드 메뉴 */
.side-menu {
  background: rgba(255, 255, 255, 0.1);
  height: 100%;
  transition: width 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.side-menu.open {
  background: rgba(255, 255, 255, 0.2);
}

/* 화살표 버튼 */
.toggle-button {
  width: 60px;
  height: 60px;
  background: transparent;
  color: #fff;
  font-size: 30px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

/* 메뉴 내용 */
.menu-content {
  margin-top: 40px;
  color: #fff;
  text-align: center;
}

.menu-content p {
  cursor: pointer;
}
</style>
