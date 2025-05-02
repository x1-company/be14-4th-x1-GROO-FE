<template>
  <div>
    <div v-if="isLoading" class="loading">로딩 중...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="background-wrapper">
        <img
          :src="forestData?.backgroundImageUrl"
          class="background"
          v-if="forestData"
        />
      </div>

      <h1 class="title">{{ forestData?.name || "숲 이름 없음" }}</h1>
      <div class="nickname-list">
        함께하는 친구👥 : {{ forestData?.nicknames?.join(", ") || "없음" }}</div
      >

      <div class="icons">
        <img :src="buttonIcon_6" class="btn-img" />
        <img :src="buttonIcon_7" class="btn-img" />
        <img
          :src="buttonIcon_8"
          class="btn-img"
          :class="{ active: forestData?.isPublic }"
        />
      </div>
      <div class="placed-items" v-if="forestData">
        <div
          v-for="item in forestData.placementList"
          :key="item.placementId"
          class="placed-item"
          :style="{
            left: `${item.placementPositionX}px`,
            top: `${item.placementPositionY}px`,
          }"
        >
          <img
            :src="item.itemImageUrl"
            :alt="item.itemName"
            @error="handleImageError"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import WithdrawModal from "../components/WithdrawModal.vue";
const route = useRoute();
const forestData = ref(null);
const isLoading = ref(true);
const error = ref(null);
const isWithdrawModalOpen = ref(false);

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const fetchForestData = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const forestId = route.params.id;
    const token = localStorage.getItem("accessToken");

    if (!forestId) {
      throw new Error("숲 ID가 없습니다.");
    }

    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }

    const response = await fetch(`${API_BASE_URL}/mate/detail/${forestId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`데이터를 불러오는데 실패했습니다. (${response.status})`);
    }

    const data = await response.json();
    console.log("Received data:", data);
    const validData = Array.isArray(data) ? data[0] : data;

    if (!validData) {
      throw new Error("유효한 데이터를 찾을 수 없습니다.");
    }

    forestData.value = validData;
  } catch (err) {
    console.error("Error:", err);
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

const handleImageError = (e) => {
  console.error("이미지 로드 실패:", e.target.src);
  console.log("아이템 정보:", forestData.value?.placementList);
};

onMounted(() => {
  fetchForestData();
});
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
  transition: margin-right 0.3s ease;
}

.background {
  width: 800px;
  height: auto;
  display: block;
  transition: width 0.3s ease;
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

.nickname-list {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 18px;
  margin: 0;
  text-align: center;
  width: 100%;
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

.btn-img.active {
  opacity: 1;
  filter: brightness(1.2);
}

.placed-items {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: auto;
  pointer-events: none;
}

.placed-item {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 20;
}

.placed-item img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  pointer-events: auto;
  cursor: pointer;
  transition: transform 0.2s;
}

.placed-item img:hover {
  transform: scale(1.1);
}

.loading,
.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 18px;
  text-align: center;
}

.error {
  color: #ff6b6b;
}

.debug-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
}
</style>
