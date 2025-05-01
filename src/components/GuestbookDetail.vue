<template>
  <div class="guestbook-detail">
    <div v-if="isLoading" class="loading">로딩 중...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="content">
      <div class="message">{{ guestbook.content }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  guestbookId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['back'])

const guestbook = ref(null)
const isLoading = ref(true)
const error = ref(null)

const fetchGuestbookDetail = async () => {
  const token = localStorage.getItem('accessToken')
  if (!token) {
    error.value = '로그인이 필요합니다.'
    isLoading.value = false
    return
  }

  try {
    const response = await fetch(`http://localhost:8080/mailbox-detail/${props.guestbookId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('방명록 상세 정보를 가져오는 데 실패했습니다.')
    }

    const data = await response.json()
    if (data && data.length > 0) {
      guestbook.value = data[0]
    }
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchGuestbookDetail()
})
</script>

<style scoped>
.guestbook-detail {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
}

.top-bar {
  margin-bottom: 20px;
}

.back-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

.loading,
.error {
  text-align: center;
  font-size: 18px;
  color: #fff;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #fff;
  max-height: 400px;
  margin: 40px 0;
}

.message {
  background: rgba(255, 255, 255, 0.15);
  padding: 30px;
  border-radius: 12px;
  font-size: 18px;
  line-height: 1.6;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}

.message::-webkit-scrollbar {
  width: 8px;
}

.message::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.message::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.message::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style> 