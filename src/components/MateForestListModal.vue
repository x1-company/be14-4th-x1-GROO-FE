<template>
  <div v-if="isOpen" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>🌳 우정의 숲 목록 🌳</h2>
      </div>
      <div class="forest-list">
        <button
          v-for="forest in forests"
          :key="forest.id"
          class="forest-item"
          @click="selectForest(forest.id)"
        >
          {{ forest.name }}
        </button>
        <button class="forest-item add-forest">
          <span class="plus">+</span>
        </button>
      </div>
      <button class="close-button" @click="$emit('close')">닫기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);
const router = useRouter();
const forests = ref([]);

const getForestList = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8080/mate/forests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch forest list");
    }

    const data = await response.json();
    forests.value = data;
  } catch (error) {
    console.error("Error fetching forest list:", error);
  }
};

const selectForest = (forestId) => {
  localStorage.setItem("forestId", forestId);
  router.push("/forest-mate");
  emit("close");
};

onMounted(() => {
  getForestList();
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal-header {
  margin-bottom: 20px;
}

.modal-header h2 {
  color: #3a5a40;
  font-size: 24px;
  margin: 0;
}

.forest-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.forest-item {
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #a5c0a7;
  border-radius: 12px;
  padding: 15px;
  font-size: 16px;
  color: #3a5a40;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.forest-item:hover {
  background: #a5c0a7;
  color: white;
  transform: translateY(-2px);
}

.add-forest {
  border-style: dashed;
}

.plus {
  font-size: 24px;
  color: #a5c0a7;
}

.add-forest:hover .plus {
  color: white;
}

.close-button {
  background: #3a5a40;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: #2c4632;
  transform: translateY(-2px);
}
</style>
