<template>
  <div v-if="isOpen" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>공유하기</h2>
        <button class="close-button" @click="$emit('close')">
          <span class="close-icon">×</span>
        </button>
      </div>

      <div class="modal-body">
        <div class="share-info">
          <div class="info-icon">🌳</div>
          <div class="info-text">
            <p class="info-title">우정의 숲</p>
            <p class="info-description"
              >친구들과 함께 나만의 숲을 가꾸어보세요</p
            >
          </div>
        </div>

        <div class="share-link-container">
          <div class="link-box">
            <input
              type="text"
              :value="shareUrl"
              readonly
              ref="linkInput"
              class="link-input"
            />
            <button @click="copyLink" class="copy-button"> 복사하기 </button>
          </div>
          <p class="share-tip">링크를 복사하여 친구들과 공유해보세요!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  isOpen: Boolean,
});

defineEmits(["close"]);

const linkInput = ref(null);
const shareUrl = "www.groo.com/x1company";

const copyLink = () => {
  if (linkInput.value) {
    linkInput.value.select();
    document.execCommand("copy");
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 480px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.close-icon {
  font-size: 24px;
  color: #666;
  opacity: 0.7;
}

.close-icon:hover {
  opacity: 1;
}

.modal-body {
  padding: 24px;
}

.share-info {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 24px;
}

.info-icon {
  font-size: 32px;
}

.info-text {
  flex: 1;
}

.info-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
}

.info-description {
  margin: 4px 0 0;
  font-size: 14px;
  color: #666;
}

.share-link-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.link-box {
  display: flex;
  gap: 8px;
  background: #f8f9fa;
  padding: 8px;
  border-radius: 12px;
}

.link-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  font-size: 14px;
  color: #2c3e50;
  background: white;
}

.copy-button {
  padding: 12px 24px;
  background: #3a5a40;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.copy-button:hover {
  background: #2c4632;
}

.share-tip {
  margin: 0;
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>
