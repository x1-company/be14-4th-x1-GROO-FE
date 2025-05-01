<script setup>
import { ref, computed } from 'vue'
import buttonIcon_1 from '../icons/diarywrite_icon.png'
import buttonIcon_2 from '../icons/diaryview_icon.png'
import buttonIcon_3 from '../icons/forestmate_icon.png'
import buttonIcon_4 from '../icons/forestview_icon.png'
import buttonIcon_5 from '../icons/myitemview_icon.png'
import buttonIcon_6 from '../icons/mailbox_icon.png'
import logoutIcon  from '../icons/logout_icon.png'

import CategorySelector  from './CategorySelector.vue'
import AnalyzeResult     from './AnalyzeResult.vue'
import WriteDiary        from './WriteDiary.vue'
import GuestbookList     from './GuestbookList.vue'
import { useRouter }     from 'vue-router'

// 더미 데이터 - 실제 API 응답으로 대체하세요
const dummyAnalysisResult = {
  emotions: [
    { label: '평온함', emoji: '😊', percent: 50 },
    { label: '즐거움', emoji: '😺', percent: 30 }
  ],
  summaryMessage: "평온하고 일상적인 하루에, 즐거움이 묻어나있네요!",
  pieces: [
    { value: 'tree1', label: '동글 나무', icon: buttonIcon_1 },
    { value: 'tree2', label: '뾰족 나무', icon: buttonIcon_2 },
    { value: 'tree3', label: '나는 나무', icon: buttonIcon_3 }
  ]
}

const isMenuOpen            = ref(true)
const showCategorySelector = ref(false)
const showAnalyzeResult    = ref(false)
const showWriteDiary       = ref(false)
const showGuestbookList    = ref(false)
const categoryLoading      = ref(false)

const sidebarWidth = computed(() => {
  if (!isMenuOpen.value) return 60
  return (
    showCategorySelector.value ||
    showAnalyzeResult.value    ||
    showWriteDiary.value       ||
    showGuestbookList.value
  ) ? 576 : 360
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const router   = useRouter()
const nickname = localStorage.getItem('userNickname') || '여행자'

const logout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('userNickname')
  localStorage.removeItem('myRecentforestId')
  router.push('/login')
}

const handleAnalyze = (category) => {
  categoryLoading.value = true
  setTimeout(() => {
    categoryLoading.value = false
    showCategorySelector.value = false
    showAnalyzeResult.value    = true
  }, 2000)
}

const handlePlace = (selectedPiece) => {
  showAnalyzeResult.value = false
}

const handleToStorage = () => {
  showAnalyzeResult.value = false
  router.push('/myitemview')
}

const handleDiarySave = () => {
  showWriteDiary.value       = false
  showCategorySelector.value = true
}

const toggleCategorySelector = () => {
  // 쓰기 화면을 열 때만 showWriteDiary=true
  showWriteDiary.value       = true
  showCategorySelector.value = false
  showAnalyzeResult.value    = false
  showGuestbookList.value    = false
}

const handleWriteDiaryBack = () => {
  showWriteDiary.value = false
}

const handleGuestbook = () => {
  showGuestbookList.value    = true
  showCategorySelector.value = false
  showAnalyzeResult.value    = false
  showWriteDiary.value       = false
}

const handleGuestbookBack = () => {
  showGuestbookList.value = false
}
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
        <!-- 기본 메뉴 -->
        <template v-if="
          !showCategorySelector &&
          !showAnalyzeResult    &&
          !showWriteDiary       &&
          !showGuestbookList
        ">
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
              <span class="icon"><img :src="buttonIcon_1" class="btn-img" /></span>
              감정일기 작성하기
            </button>
            <router-link to="/viewdiary" class="menu-btn">
              <span class="icon"><img :src="buttonIcon_2" class="btn-img" /></span>
              감정일기 다시보기
            </router-link>
            <router-link to="/forestmate" class="menu-btn">
              <span class="icon"><img :src="buttonIcon_3" class="btn-img" /></span>
              우정의 숲 입장하기
            </router-link>
            <router-link to="/forestview" class="menu-btn">
              <span class="icon"><img :src="buttonIcon_4" class="btn-img" /></span>
              다른 숲 구경가기
            </router-link>
            <router-link to="/myitemview" class="menu-btn">
              <span class="icon"><img :src="buttonIcon_5" class="btn-img" /></span>
              나의 조각 보기
            </router-link>
            <button class="menu-btn" @click="handleGuestbook">
              <span class="icon"><img :src="buttonIcon_6" class="btn-img" /></span>
              방명록 확인하기
            </button>
          </div>
        </template>

        <!-- 일기 작성 화면 -->
        <template v-else-if="showWriteDiary">
          <div class="top-bar">
            <button class="back-button" @click="handleWriteDiaryBack">←</button>
          </div>
          <WriteDiary @save="handleDiarySave" />
        </template>

        <!-- 감정 선택 화면 -->
        <template v-else-if="showCategorySelector">
          <div class="top-bar">
            <button v-if="!categoryLoading" class="back-button" @click="toggleCategorySelector">←</button>
          </div>
          <CategorySelector
            @analyze="handleAnalyze"
            @loading="val => categoryLoading = val"
          />
        </template>

        <!-- 분석 결과 화면 -->
        <template v-else-if="showAnalyzeResult">
          <AnalyzeResult
            v-bind="dummyAnalysisResult"
            @place="handlePlace"
            @toStorage="handleToStorage"
          />
        </template>

        <!-- 방명록 화면 -->
        <template v-else-if="showGuestbookList">
          <GuestbookList @back="handleGuestbookBack" />
        </template>
      </div>
    </div>

    <button class="toggle-button" @click="toggleMenu">
      <span v-if="isMenuOpen">»</span>
      <span v-else>«</span>
    </button>
  </div>
</template>

<style scoped>
/* … 기존 스타일 유지 … */
</style>