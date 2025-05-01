<template>
  <div class="write-guestbook">
    <div class="top-bar">
      <button class="back-button" @click="$emit('back')">←</button>
    </div>
    <div class="title">방명록 작성</div>
    <div class="content">
      <textarea
        v-model="content"
        placeholder="방명록을 작성해주세요..."
        class="guestbook-textarea"
        :maxlength="maxLength"
      ></textarea>
      <button 
        class="submit-button" 
        @click="handleSubmit"
        :disabled="!content.trim() || content.length > maxLength"
      >
        작성하기
      </button>
    </div>
    <div class="char-counter" :class="{ 'near-limit': isNearLimit }">
      {{ content.length }}/{{ maxLength }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const maxLength = 500
const content = ref('')
const emit = defineEmits(['back', 'submit'])

const isNearLimit = computed(() => {
  return content.value.length > maxLength * 0.9
})

const handleSubmit = async () => {
  if (content.value.trim() && content.value.length <= maxLength) {
    try {
      const response = await fetch('http://localhost:8080/emotion-forest/mailbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          forestId: 2,
          content: content.value
        })
      });

      if (!response.ok) {
        throw new Error('방명록 작성에 실패했습니다.');
      }

      alert('방명록이 작성되었습니다!');
      emit('submit', content.value);
      content.value = '';
    } catch (error) {
      console.error('Error:', error);
      alert('방명록 작성에 실패했습니다. 다시 시도해주세요.');
    }
  }
}
</script>

<style scoped>
.write-guestbook {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 24px;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.guestbook-textarea {
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.35);
  color: #3a5a40;
  font-size: 16px;
  resize: none;
  outline: none;
  max-height: 300px;
  overflow-y: auto;
}

.guestbook-textarea::placeholder {
  color: rgba(58, 90, 64, 0.6);
}

.char-counter {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: rgba(58, 90, 64, 0.8);
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  z-index: 10;
}

.char-counter.near-limit {
  color: #d32f2f;
  background: rgba(255, 255, 255, 0.8);
}

.submit-button {
  padding: 14px 0;
  background: rgba(255, 255, 255, 0.35);
  border: none;
  border-radius: 16px;
  color: #3a5a40;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.55);
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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