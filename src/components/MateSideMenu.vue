<script setup>
import { ref, computed } from "vue";
import buttonIcon_1 from "../icons/diarywrite_icon.png";
import buttonIcon_2 from "../icons/diaryview_icon.png";
import buttonIcon_3 from "../icons/forestmate_icon.png";
import buttonIcon_4 from "../icons/invite_icon.png";
import buttonIcon_5 from "../icons/myitemview_icon.png";
import logoutIcon from "../icons/logout_icon.png";
import previousIcon from "../icons/previous_icon.png";
import { useRouter, useRoute } from "vue-router";
import InviteLinkModal from "./InviteLinkModal.vue";
import ForestListModal from "./ForestListModal.vue";
import WithdrawModal from "./WithdrawModal.vue";

const route = useRoute();
const isMenuOpen = ref(true);
const sidebarWidth = computed(() => (isMenuOpen.value ? 360 : 60));
const showInviteModal = ref(false);
const showWithdrawModal = ref(false);
const inviteLink = ref("");
const router = useRouter();
const showForestListModal = ref(false);
const emit = defineEmits(["openShare", "openForestList", "openWithdraw"]);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleShare = () => {
  emit("openShare");
};

const goBack = () => {
  router.back();
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userNickname");
  router.push("/login");
};

const handleForestList = () => {
  emit("openForestList");
};

const handleWithdraw = () => {
  emit("openWithdraw");
};
</script>

<template>
  <div
    class="side-menu"
    :class="{ open: isMenuOpen }"
    :style="{ width: sidebarWidth + 'px' }"
  >
    <button class="toggle-button" @click="toggleMenu">
      <span v-if="isMenuOpen">»</span>
      <span v-else>«</span>
    </button>

    <div class="menu-content" v-if="isMenuOpen">
      <div class="top-bar">
        <span class="previous-icon" @click="goBack">
          <img :src="previousIcon" class="btn-img" />
        </span>
        <span class="logout-icon" @click="logout">
          <img :src="logoutIcon" class="btn-img" />
        </span>
      </div>
      <div class="greeting">
        <div>우정의 숲에</div>
        <div>들어오신걸 환영해요!</div>
      </div>
      <div class="menu-buttons">
        <button class="menu-btn">
          <span class="icon">
            <img :src="buttonIcon_1" class="btn-img" />
          </span>
          우정일기 작성하기
        </button>
        <button class="menu-btn">
          <span class="icon">
            <img :src="buttonIcon_2" class="btn-img" />
          </span>
          우정일기 다시보기
        </button>
        <button class="menu-btn" @click="handleShare">
          <span class="icon">
            <img :src="buttonIcon_4" class="btn-img" />
          </span>
          우정의 숲 초대하기
        </button>
        <button class="menu-btn">
          <span class="icon">
            <img :src="buttonIcon_5" class="btn-img" />
          </span>
          우리의 조각 보기
        </button>
        <button class="menu-btn" @click="handleWithdraw">
          <span class="icon">
            <img :src="buttonIcon_3" class="btn-img" />
          </span>
          우정의 숲 탈퇴하기
        </button>
        <InviteLinkModal
          v-if="showInviteModal"
          :inviteLink="inviteLink"
          @close="showInviteModal = false"
        />
        <ForestListModal
          v-if="showForestListModal"
          :isOpen="showForestListModal"
          @close="showForestListModal = false"
        />
        <WithdrawModal
          v-if="showWithdrawModal"
          :is-open="showWithdrawModal"
          :forest-id="route.params.id"
          @close="showWithdrawModal = false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.side-menu {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-right: 1.5px solid rgba(255, 255, 255, 0.25);
  height: 100%;
  padding: 0px 20px 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: width 0.3s ease;
  position: relative;
}

.side-menu.open {
  background: rgba(255, 255, 255, 0.15);
}

.toggle-button {
  width: 40px;
  height: 60px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 32px;
  border: none;
  cursor: pointer;
  position: absolute;
  left: -40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.menu-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 26px;
}

.top-bar {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 24px;
  margin-bottom: 32px;
}

.logout-icon {
  font-size: 28px;
  color: #fff;
  cursor: pointer;
}

.back-button {
  font-size: 28px;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.greeting {
  color: #fff;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 36px;
  line-height: 1.5;
}

.menu-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.menu-btn {
  width: 260px;
  padding: 14px 0;
  background: rgba(255, 255, 255, 0.35);
  border: none;
  border-radius: 16px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  color: #3a5a40;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
}

.menu-btn:hover {
  background: rgba(255, 255, 255, 0.55);
}

.btn-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin-right: 8px;
  vertical-align: middle;
}

.logout-icon {
  margin-left: 254.5px;
}

.previous-icon:hover {
  cursor: pointer;
}

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
  background: white;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.modal-content h3 {
  margin: 0 0 16px;
  color: #333;
  font-size: 20px;
}

.modal-content p {
  margin: 0 0 24px;
  color: #666;
  font-size: 16px;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.cancel-btn,
.confirm-btn {
  padding: 8px 24px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}

.cancel-btn {
  background: #e0e0e0;
  color: #333;
}

.confirm-btn {
  background: #ff6b6b;
  color: white;
}

.cancel-btn:hover {
  background: #d0d0d0;
}

.confirm-btn:hover {
  background: #ff5252;
}
</style>
