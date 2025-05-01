<template>
    <div ref="container" class="rain-container"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const container = ref(null);
  const names = ['🎈', '🌹', '🌸', '🌷', '🌺'];
  
  function createRainName() {
    const span = document.createElement('span');
    span.className = 'name';
    span.textContent = names[Math.floor(Math.random() * names.length)];
  
    const x = Math.random() * (window.innerWidth - span.offsetWidth);
    const delay = Math.random() * 3;
    const duration = 3 + Math.random() * 3;
  
    span.style.left = `${x}px`;
    span.style.animationDelay = `${delay}s`;
    span.style.animationDuration = `${duration}s`;
  
    container.value.appendChild(span);
  }
  
  onMounted(() => {
    const numberOfNames = 20;
    for (let i = 0; i < numberOfNames; i++) {
      createRainName();
    }
  });
  </script>
  
  <style scoped>
  .rain-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    z-index: 999999;
  }
  
  .name {
    position: absolute;
    color: #000;
    font-size: 24px;
    animation: rain 3s linear infinite;
  }
  
  @keyframes rain {
    0% {
      transform: translateY(-100px);
      opacity: 0;
    }
  
    50% {
      opacity: 1;
    }
  
    100% {
      transform: translateY(100vh);
      opacity: 0;
    }
  }
  </style>
  