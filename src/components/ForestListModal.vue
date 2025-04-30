<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2>우리의 숲 목록</h2>
        <button class="close-button" @click="$emit('close')">×</button>
      </div>
      <div class="forest-grid">
        <div v-for="forest in forests" :key="forest.id" class="forest-card">
          <img :src="forest.image" :alt="forest.name" class="forest-image" />
          <div class="forest-name">{{ forest.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

// 임시 데이터
const forests = ref([
  {
    id: 1,
    name: "1조의 숲",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "2조의 숲",
    image:
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "3조의 숲",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "4조의 숲",
    image:
      "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=500&auto=format&fit=crop",
  },
]);
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
</style>
