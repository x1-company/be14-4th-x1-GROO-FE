<script setup>
import { ref, computed } from 'vue'
import buttonIcon_1 from '../icons/diarywrite_icon.png'
import buttonIcon_2 from '../icons/diaryview_icon.png'
import buttonIcon_3 from '../icons/forestmate_icon.png'
import buttonIcon_4 from '../icons/forestview_icon.png'
import buttonIcon_5 from '../icons/myitemview_icon.png'
import buttonIcon_6 from '../icons/mailbox_icon.png'
import logoutIcon from '../icons/logout_icon.png'
import CategorySelector from './CategorySelector.vue'
import AnalyzeResult from './AnalyzeResult.vue'
import WriteDiary from './WriteDiary.vue'
import GuestbookList from './GuestbookList.vue'
import { useRouter } from 'vue-router'


// 더미 데이터 - 실제로는 API 응답으로 받을 데이터
const dummyAnalysisResult = {
  emotions: [
    { label: '평온함', emoji: '😊', percent: 50 },
    { label: '즐거움', emoji: '😺', percent: 30 },
  ],
  summaryMessage: "평온하고 일상적인 하루에, 즐거움이 묻어나있네요!",
  pieces: [
    { value: 'tree1', label: '동글 나무', icon: buttonIcon_1 },
    { value: 'tree2', label: '뾰족 나무', icon: buttonIcon_2 },
    { value: 'tree3', label: '나는 나무', icon: buttonIcon_3 },
  ]
}

const isMenuOpen = ref(true)
const showCategorySelector = ref(false)
const showAnalyzeResult = ref(false)
const showWriteDiary = ref(false)
const showGuestbookList = ref(false); // 방명록 확인하기 화면 표시 여부
const categoryLoading = ref(false)

const sidebarWidth = computed(() => {
  if (!isMenuOpen.value) return 60
  return showCategorySelector.value || showAnalyzeResult.value || showWriteDiary.value || showGuestbookList.value ? 576 : 360
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const router = useRouter()

// 닉네임 가져오기
const nickname = localStorage.getItem('userNickname') || '여행자'

const logout = () => {
  // 로컬 스토리지 비우기
  localStorage.removeItem('accessToken')
  localStorage.removeItem('userNickname')
  localStorage.removeItem('myRecentforestId')
  router.push('/login')
}

const handleAnalyze = (category) => {
  console.log("Selected category:", category)
  // showCategorySelector는 로딩이 완료될 때까지 true로 유지
  setTimeout(() => {
    showCategorySelector.value = false
    showAnalyzeResult.value = true
  }, 2000)
}

const handlePlace = (selectedPiece) => {
  console.log("Selected piece to place:", selectedPiece)
  showAnalyzeResult.value = false
  // 여기에 배치 로직 추가
}

const handleToStorage = () => {
  console.log("Moving to storage")
  showAnalyzeResult.value = false
  router.push('/myitemview')
}

const handleDiarySave = () => {
  showWriteDiary.value = false;
  showCategorySelector.value = true;
};

const toggleCategorySelector = () => {
  if (showWriteDiary.value || showCategorySelector.value || showAnalyzeResult.value) {
    showWriteDiary.value = false;
    showCategorySelector.value = false;
    showAnalyzeResult.value = false;
  } else {
    showWriteDiary.value = true;
  }
}

const handleGuestbook = () => {
  showGuestbookList.value = true;
  showCategorySelector.value = false;
  showAnalyzeResult.value = false;
  showWriteDiary.value = false;
};

const handleGuestbookBack = () => {
  showGuestbookList.value = false;
};
</script>

<template>
  <div class="side-wrapper">
    <div
      class="side-menu"
      :class="{ 
        open: isMenuOpen, 
        'category-mode': showCategorySelector || showAnalyzeResult || showWriteDiary || showGuestbookList
      }"
      :style="{ width: sidebarWidth + 'px' }"
    >
      <div class="menu-content" v-if="isMenuOpen">
        <template v-if="!showCategorySelector && !showAnalyzeResult && !showWriteDiary && !showGuestbookList">
          <div class="top-bar">
            <span class="logout-icon" @click="logout">
              <img :src="logoutIcon" class="btn-img" />
            </span>
          </div>
          <div class="greeting">
            <div>안녕하세요 {{ nickname }}님,</div>
            <div>오늘 하루는 어떠셨나요?</div>
          </div>
          <div class="menu-buttons">
            <button class="menu-btn" @click="toggleCategorySelector">
              <span class="icon">
                <img :src="buttonIcon_1" class="btn-img" />
              </span>
              감정일기 작성하기
            </button>
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
            <button class="menu-btn" @click="handleGuestbook">
              <span class="icon">
                <img :src="buttonIcon_6" class="btn-img" />
              </span>
              방명록 확인하기
            </button>
          </div>
        </template>
        <template v-else-if="showWriteDiary">
          <div class="top-bar">
            <button class="back-button" @click="toggleCategorySelector">
              ←
            </button>
          </div>
          <WriteDiary @save="handleDiarySave" />
        </template>
        <template v-else-if="showCategorySelector">
          <div class="top-bar">
            <button v-if="!categoryLoading" class="back-button" @click="toggleCategorySelector">
              ←
            </button>
          </div>
          <CategorySelector @analyze="handleAnalyze" @loading="val => categoryLoading = val" />
        </template>
        <template v-else-if="showAnalyzeResult">
          <AnalyzeResult 
            v-bind="dummyAnalysisResult"
            @place="handlePlace"
            @toStorage="handleToStorage"
          />
        </template>
        <template v-else-if="showGuestbookList">
          <GuestbookList @back="handleGuestbookBack" />
        </template>
      </div>
    </div>
    <button
      class="toggle-button"
      @click="toggleMenu"
    >
      <span v-if="isMenuOpen">»</span>
      <span v-else>«</span>
    </button>
  </div>
</template>

<style scoped>
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
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.side-wrapper {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: stretch;
}

.side-menu {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-right: 1.5px solid rgba(255, 255, 255, 0.25);
  padding: 0px 20px 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow-y: auto;
  height: 100vh;
}

.side-menu.category-mode {
  background: rgba(255, 255, 255, 0.15);
  border: none;
}

.menu-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.top-bar {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 24px;
  margin-bottom: 12px;
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

.category-selector-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.back-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  margin-right: auto;
}
</style>