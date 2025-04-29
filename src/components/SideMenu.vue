<script setup>
import { ref, computed } from 'vue'
import buttonIcon_1 from '../icons/diarywrite_icon.png'
import buttonIcon_2 from '../icons/diaryview_icon.png'
import buttonIcon_3 from '../icons/forestmate_icon.png'
import buttonIcon_4 from '../icons/forestview_icon.png'
import buttonIcon_5 from '../icons/myitemview_icon.png'
import buttonIcon_6 from '../icons/mailbox_icon.png'
import logoutIcon from '../icons/logout_icon.png'

const isMenuOpen = ref(true)

const sidebarWidth = computed(() => (isMenuOpen.value ? 360 : 60))

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div
    class="side-menu"
    :class="{ open: isMenuOpen }"
    :style="{ width: sidebarWidth + 'px' }"
  >
    <button class="toggle-button" @click="toggleMenu">
      <span v-if="isMenuOpen">»</span>
      <span v-else>«</span>
    </button>
    <div class="menu-content" v-if="isMenuOpen">
      <div class="top-bar">
        <span class="logout-icon">
          <img :src="logoutIcon" class="btn-img" />
        </span>
      </div>
      <div class="greeting">
        <div>안녕하세요 min님,</div>
        <div>오늘 하루는 어떠셨나요?</div>
      </div>
      <div class="menu-buttons">
        <router-link to="/writediary" class="menu-btn">
          <span class="icon">
            <img :src="buttonIcon_1" class="btn-img" />
          </span>
          감정일기 작성하기
        </router-link>
        <router-link to="/viewdiary" class="menu-btn">
          <span class="icon">
            <img :src="buttonIcon_2" class="btn-img" />
          </span>
          감정일기 다시보기
        </router-link>
        <router-link to="/forestmate" class="menu-btn">
          <span class="icon">
            <img :src="buttonIcon_3" class="btn-img" />
          </span>
          우정의 숲 입장하기
        </router-link>
        <router-link to="/forestview" class="menu-btn">
          <span class="icon">
            <img :src="buttonIcon_4" class="btn-img" />
          </span>
          다른 숲 구경가기
        </router-link>
        <router-link to="/myitemview" class="menu-btn">
          <span class="icon">
            <img :src="buttonIcon_5" class="btn-img" />
          </span>
          나의 조각 보기
        </router-link>
        <router-link to="/guestbook" class="menu-btn">
          <span class="icon">
            <img :src="buttonIcon_6" class="btn-img" />
          </span>
          방명록 확인하기
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add the styles for side-menu here */
.side-menu {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-right: 1.5px solid rgba(255, 255, 255, 0.25);
  height: 100%;
  padding: 0px 20px 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: width 0.3s ease;
  position: relative;
}

.side-menu.open {
  background: rgba(255, 255, 255, 0.15);
}

.toggle-button {
  width: 40px;
  height: 60px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 32px;
  border: none;
  cursor: pointer;
  position: absolute;
  left: -40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.menu-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 26px;
}

.top-bar {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 24px;
  margin-bottom: 32px;
}

.logout-icon {
  font-size: 28px;
  color: #fff;
  cursor: pointer;
}

.greeting {
  color: #fff;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 36px;
  line-height: 1.5;
}

.menu-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.menu-btn {
  width: 260px;
  padding: 14px 0;
  background: rgba(255, 255, 255, 0.35);
  border: none;
  border-radius: 16px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  color: #3a5a40;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
}

.menu-btn:hover {
  background: rgba(255, 255, 255, 0.55);
}

.icon {
  font-size: 22px;
  margin-left: 18px;
}

.btn-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin-right: 8px;
  vertical-align: middle;
}
</style>