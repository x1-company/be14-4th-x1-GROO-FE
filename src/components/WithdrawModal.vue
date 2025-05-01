<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3>정말 탈퇴하시겠습니까?</h3>
      </div>
      <div class="modal-body">
        <p>탈퇴하시면 이 우정의 숲에서 영구적으로 나가게 됩니다.</p>
      </div>
      <div class="modal-buttons">
        <button @click="$emit('close')" class="cancel-btn">취소</button>
        <button @click="handleWithdraw" class="confirm-btn">탈퇴하기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const route = useRoute();

const router = useRouter();
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const handleWithdraw = async () => {
  try {
    const forestId = route.params.id;
    const token = localStorage.getItem("accessToken");

    if (!forestId) {
      throw new Error("숲 ID를 찾을 수 없습니다.");
    }

    console.log("Withdrawing from forest:", forestId); // 디버깅용

    const response = await fetch(
      `http://localhost:8080/mate/quit?forestId=${forestId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ forestId: forestId }),
      }
    );

    if (response.ok) {
      alert("우정의 숲에서 탈퇴되었습니다.");
      // 내 개인숲 id를 localStorage에 저장
      localStorage.setItem("forestId", "1");
      router.push("/");
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "탈퇴 처리 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  } finally {
    emit("close");
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header h3 {
  color: #3a5a40;
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
}

.modal-body p {
  color: #666;
  margin: 1rem 0;
  line-height: 1.5;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-btn,
.confirm-btn {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.cancel-btn {
  background: #e0e0e0;
  color: #666;
}

.cancel-btn:hover {
  background: #d0d0d0;
}

.confirm-btn {
  background: #ff6b6b;
  color: white;
}

.confirm-btn:hover {
  background: #ff5252;
}
</style>
