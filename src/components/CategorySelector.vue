<template>
  <div class="category-screen">
    <div class="top-message">
      오늘 하루는 어땠나요?<br />
      하루의 감정을 숲에 심어보세요.
    </div>
    
    <div class="category-container">
      <template v-if="isLoading">
        <LoadingAnimation />
      </template>
      <template v-else>
        <div class="category-title">
          감정을 분석하기 전,<br />
          받고싶은 기록의 조각 유형을 선택해주세요
        </div>
        
        <div class="category-options">
          <div
            v-for="cat in categories"
            :key="cat.value"
            :class="['category-card', { selected: selected === cat.value }]"
            @click="selectCategory(cat.value)"
          >
            <div class="category-label">{{ cat.label }}</div>
            <img :src="cat.icon" class="category-icon" />
          </div>
        </div>
        
        <button class="analyze-btn" @click="handleAnalyze">
          나의 감정 분석하기
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import plantIcon from "../icons/plant.png";
import objectIcon from "../icons/object.png";
import etcIcon from "../icons/etc.png";
import LoadingAnimation from "./LoadingAnimation.vue";

const categories = [
  { value: "plant", label: "식물", icon: plantIcon },
  { value: "object", label: "사물", icon: objectIcon },
  { value: "etc", label: "기타", icon: etcIcon },
];
const selected = ref("plant");
const isLoading = ref(false);
const selectCategory = (val) => (selected.value = val);

const emit = defineEmits(["analyze", "loading"]);
const handleAnalyze = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    emit("analyze", selected.value);
  }, 6000); // 6초 후에 분석 이벤트 발생 (API 대기 시뮬레이션)
};

watch(isLoading, (val) => {
  emit("loading", val);
});
</script>

<style scoped>
.category-screen {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 0;
}

.top-message {
  color: #fff;
  font-size: 18px;
  margin-bottom: 40px;
  margin-left: 20px;
  line-height: 1.5;
}

.category-container {
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 18px;
  padding: 28px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 90%;
  box-sizing: border-box;
}

.category-title {
  color: #fff;
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.5;
}

.category-options {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
  width: 100%;
}

.category-card {
  background: rgba(255,255,255,0.25);
  border-radius: 14px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
  flex: 1;
  max-width: 100px;
}

.category-card.selected {
  border: 2px solid #3a5a40;
  background: rgba(255,255,255,0.45);
}

.category-label {
  color: #3a5a40;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.category-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.analyze-btn {
  margin-top: 8px;
  background: #3a5a40;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px 28px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
  width: 60%;
}

.analyze-btn:hover {
  background: #588157;
}
</style>