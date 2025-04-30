<template>
  <div class="diary-screen">
    <div class="content-wrapper">
      <div class="top-message">
        오늘 하루는 어땠나요?<br />
        하루의 감정을 숲에 심어보세요.
      </div>

      <div class="diary-container">
        <div class="diary-header">
          <div class="diary-title">
            <span class="diary-icon">📝</span>
            감정 일기 쓰기
          </div>
          <div class="diary-date">{{ currentDate }}</div>
        </div>

        <div class="button-group">
          <button class="action-btn secondary" @click="loadDraft">
            불러오기
          </button>
          <button class="action-btn secondary" @click="saveDraft">
            임시저장
          </button>
        </div>

        <textarea
          v-model="diaryContent"
          class="diary-textarea"
          placeholder="일기 내용을 입력해주세요"
          @input="updateCharCount"
        ></textarea>

        <div class="char-counter">{{ charCount }}/1000</div>

        <button 
          class="save-btn"
          @click="saveDiary"
          :disabled="!diaryContent.trim()"
        >
          저장하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const diaryContent = ref('');
const charCount = ref(0);

const updateCharCount = () => {
  charCount.value = diaryContent.value.length;
};

const currentDate = new Date().toLocaleDateString('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
});

const saveDraft = () => {
  localStorage.setItem('diaryDraft', diaryContent.value);
  alert('임시저장되었습니다.');
};

const loadDraft = () => {
  const draft = localStorage.getItem('diaryDraft');
  if (draft) {
    diaryContent.value = draft;
    updateCharCount();
  } else {
    alert('저장된 임시글이 없습니다.');
  }
};

const emit = defineEmits(['save']);

const saveDiary = () => {
  // TODO: API 연동 후 구현
  console.log('일기 저장:', diaryContent.value);
  localStorage.removeItem('diaryDraft'); // 임시저장 데이터 삭제
  emit('save');
};

onMounted(() => {
  const draft = localStorage.getItem('diaryDraft');
  if (draft) {
    diaryContent.value = draft;
    updateCharCount();
  }
});
</script>

<style scoped>
.diary-screen {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.top-message {
  color: #fff;
  font-size: 18px;
  margin-bottom: 32px;
  margin-left: 20px;
  line-height: 1.5;
}

.diary-container {
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 18px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 90%;
  box-sizing: border-box;
}

.diary-header {
  margin-bottom: 24px;
}

.diary-title {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.diary-icon {
  font-size: 24px;
}

.diary-date {
  color: rgba(255,255,255,0.8);
  font-size: 16px;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.action-btn {
  background: rgba(255,255,255,0.25);
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(255,255,255,0.35);
}

.diary-textarea {
  width: 100%;
  height: 300px;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  padding: 16px;
  color: #fff;
  font-size: 16px;
  line-height: 1.6;
  resize: none;
  margin-bottom: 12px;
  box-sizing: border-box;
}

.diary-textarea::placeholder {
  color: rgba(255,255,255,0.5);
}

.diary-textarea:focus {
  outline: none;
  border-color: rgba(255,255,255,0.4);
}

.char-counter {
  color: rgba(255,255,255,0.7);
  font-size: 14px;
  text-align: right;
  margin-bottom: 24px;
}

.save-btn {
  background: #3a5a40;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.save-btn:hover {
  background: #2d4632;
}

.save-btn:disabled {
  background: rgba(58, 90, 64, 0.5);
  cursor: not-allowed;
}
</style>