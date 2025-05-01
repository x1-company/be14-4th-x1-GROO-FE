<template>
  <div class="app">
    <main>
      <router-view></router-view>
    </main>
    <WithdrawModal 
      v-if="showWithdrawModal" 
      :isOpen="showWithdrawModal"
      @close="closeWithdrawModal" 
    />
  </div>
  <DotLottieVue style="height: 500px; width: 500px" autoplay loop src="https://path-to-lottie.lottie" />
</template>

<script setup>
import { ref, provide } from 'vue';
import WithdrawModal from './components/WithdrawModal.vue';

const showWithdrawModal = ref(false);

const openWithdrawModal = () => {
  showWithdrawModal.value = true;
};

const closeWithdrawModal = () => {
  showWithdrawModal.value = false;
};

// Provide these methods to be used by any component
provide('openWithdrawModal', openWithdrawModal);
provide('closeWithdrawModal', closeWithdrawModal);
</script>
<!-- import { DotLottieVue } from '@lottiefiles/dotlottie-vue' -->
<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
