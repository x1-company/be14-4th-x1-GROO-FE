<!-- filepath: d:\Github\be14-4th-x1-GROO-FE\src\components\GuestBookList.vue -->
<template>
  <div class="guestbook-list">
    <div class="top-bar">
      <button class="back-button" @click="$emit('back')">
        <img :src="previousIcon" alt="Back" />
      </button>
      <button class="write-button" @click="showWriteForm = true">
        <img :src="editIcon" />
      </button>
    </div>
    <WriteGuestbook 
      v-if="showWriteForm"
      @back="showWriteForm = false"
      @submit="handleSubmit"
    />
    <GuestbookDetail
      v-else-if="selectedGuestbookId"
      :guestbook-id="selectedGuestbookId"
      @back="selectedGuestbookId = null"
    />
    <div v-else>
      <div v-if="isLoading" class="loading">로딩 중...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <ul v-else>
        <li 
          v-for="entry in guestbookEntries" 
          :key="entry.id" 
          class="guestbook-entry"
          @click="selectedGuestbookId = entry.id"
        >
          <div>
            💌 {{ formatDate(entry.createdAt) }}의 편지
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import editIcon from '../icons/edit_icon.png'
import previousIcon from '../icons/previous_icon.png'
import WriteGuestbook from './WriteGuestbook.vue'
import GuestbookDetail from './GuestbookDetail.vue'

const emit = defineEmits(['back'])
const showWriteForm = ref(false);
const guestbookEntries = ref([]);
const isLoading = ref(true);
const error = ref(null);
const selectedGuestbookId = ref(null);

const fetchGuestbookEntries = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    error.value = "로그인이 필요합니다.";
    isLoading.value = false;
    return;
  }

  try {
    // forestId 필요 일단 1로 고정
    const response = await fetch("http://localhost:8080/mailbox-lists/2", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("방명록 데이터를 가져오는 데 실패했습니다.");
    }

    guestbookEntries.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

// 날짜 포맷 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(2); // 25년 형식
  const month = date.getMonth() + 1; // 월 (0부터 시작하므로 +1)
  const day = date.getDate(); // 일
  return `${year}년 ${month}월 ${day}일`;
};

const handleSubmit = (content) => {
  showWriteForm.value = false;
  fetchGuestbookEntries(); // 방명록 목록 새로고침
};

onMounted(() => {
  fetchGuestbookEntries();
});
</script>

<style scoped>
.guestbook-list {
  padding: 20px;
  color: #fff;
  height: 100%;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.back-button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
}

.back-button img {
  width: 24px;
  height: 24px;
}

.guestbook-entry {
  background: rgba(255, 255, 255, 0.15);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  text-align: center;
  font-size: 25px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.guestbook-entry:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.guestbook-entry::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.guestbook-entry:hover::before {
  opacity: 1;
}

.write-button {
  background: none;
  border: none;
  cursor: pointer;
}

.write-button img {
  width: 24px;
  height: 24px;
}

.loading,
.error {
  text-align: center;
  font-size: 18px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>