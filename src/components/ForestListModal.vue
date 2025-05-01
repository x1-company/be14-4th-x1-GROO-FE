<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2>우정의 숲 목록</h2>
        <button class="close-button" @click="$emit('close')">×</button>
      </div>
      <div class="forest-grid">
        <div
          v-for="forest in forests"
          :key="forest.forestId"
          class="forest-card"
          @click="handleForestClick(forest.forestId)"
        >
          <img
            :src="forest.image"
            :alt="forest.forestName"
            class="forest-image"
          />
          <div class="forest-name">{{ forest.forestName }}</div>
        </div>
        <div
          class="forest-card add-forest-card"
          @click="showCreateForestModal = true"
        >
          <div class="add-forest-content">
            <div class="plus-icon">+</div>
            <div class="add-forest-text">새로운 숲 추가하기</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showCreateForestModal" class="modal-overlay">
    <div class="create-forest-modal">
      <div class="modal-header">
        <h2>새로운 우정의 숲 만들기</h2>
        <button class="close-button" @click="showCreateForestModal = false"
          >×</button
        >
      </div>
      <div class="create-forest-content">
        <input
          v-model="newForestName"
          type="text"
          placeholder="숲 이름을 입력하세요"
          class="forest-name-input"
          @keyup.enter="createNewForest"
        />
        <button class="create-button" @click="createNewForest">만들기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "openCreateForest"]);
const forests = ref([]);
const showCreateForestModal = ref(false);
const newForestName = ref("");

const getForestList = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch("http://localhost:8080/mate/forests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch forest list");
    }

    const data = await response.json();
    forests.value = data.map((forest) => ({
      ...forest,
      image:
        "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=500&auto=format&fit=crop",
    }));
  } catch (error) {
    console.error("Error fetching forest list:", error);
  }
};

const createNewForest = async () => {
  if (!newForestName.value.trim()) {
    alert("숲 이름을 입력해주세요.");
    return;
  }

  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch("http://localhost:8080/mate/forests/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        forestName: newForestName.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create forest");
    }

    const data = await response.json();
    console.log("New forest created:", data);

    showCreateForestModal.value = false;
    newForestName.value = "";

    await getForestList();
  } catch (error) {
    console.error("Error creating forest:", error);
    alert("숲 생성에 실패했습니다. 다시 시도해주세요.");
  }
};

const handleForestClick = (forestId) => {
  console.log("Clicking forest with ID:", forestId);
  localStorage.setItem("forestId", forestId);
  emit("close");
  console.log("Navigating to:", `/forestmate/${forestId}`);
  router.push(`/forestmate/${forestId}`);
};

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      getForestList();
    }
  }
);

onMounted(() => {
  if (props.isOpen) {
    getForestList();
  }
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
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  color: #3a5a40;
  margin: 0;
  font-size: 1.8rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  color: #3a5a40;
  cursor: pointer;
  padding: 0.5rem;
}

.forest-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.forest-card {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  aspect-ratio: 1;
  cursor: pointer;
}

.forest-card:hover {
  transform: translateY(-5px);
}

.forest-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.forest-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #3a5a40;
  font-weight: 500;
  text-align: center;
}

.add-forest-card {
  background: rgba(58, 90, 64, 0.05);
  border: 2px dashed #3a5a40;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.add-forest-card:hover {
  background: rgba(58, 90, 64, 0.1);
  border-style: solid;
}

.add-forest-content {
  text-align: center;
  color: #3a5a40;
}

.plus-icon {
  font-size: 3rem;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.add-forest-text {
  font-size: 1.1rem;
  font-weight: 500;
}

.create-forest-modal {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
}

.create-forest-content {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.forest-name-input {
  padding: 0.8rem 1rem;
  border: 2px solid #3a5a40;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
}

.forest-name-input:focus {
  outline: none;
  border-color: #588157;
  box-shadow: 0 0 0 2px rgba(58, 90, 64, 0.2);
}

.create-button {
  padding: 0.8rem 2rem;
  background-color: #3a5a40;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-button:hover {
  background-color: #588157;
}
</style>
