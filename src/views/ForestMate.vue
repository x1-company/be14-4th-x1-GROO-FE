<template>
  <div>
    <div class="background-wrapper">
      <BackgroundImage />
    </div>
    <h1 class="title">1조 공유 숲</h1>
    <div class="icons">
      <img :src="buttonIcon_6" class="btn-img" />
      <img :src="buttonIcon_7" class="btn-img" />
      <img :src="buttonIcon_8" class="btn-img" />
    </div>
    <p class="count">지금까지 총 17개의 조각을 심었습니다</p>
  </div>
</template>

<script setup>
import buttonIcon_6 from "../icons/edit_icon.png";
import buttonIcon_7 from "../icons/External_icon.png";
import buttonIcon_8 from "../icons/is_public_icon.png";
import BackgroundImage from "../components/BackgroundImage.vue";
</script>

<style scoped>
div {
  position: relative;
  width: 100%;
  height: 100%;
}

.background-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-wrapper :deep(.background) {
  width: 80%;
}

.title {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 24px;
  font-weight: 500;
  margin: 0;
}

.icons {
  position: absolute;
  top: 40px;
  left: 88px;
  display: flex;
  gap: 16px;
}

.btn-img {
  width: 24px;
  height: 24px;
  opacity: 0.8;
  cursor: pointer;
  padding: 8px;
}

.btn-img:hover {
  opacity: 1;
}

.count {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 16px;
  margin: 0;
}

.back-button {
  position: absolute;
  top: 40px;
  left: 40px;
  width: 24px;
  height: 24px;
  opacity: 0.8;
  cursor: pointer;
  padding: 8px;
}

.back-button:hover {
  opacity: 1;
}
</style>
