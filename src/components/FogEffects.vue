<template>
    <div class="container">
      <img
        class="fog"
        src="https://64.media.tumblr.com/224f9198d5d88a5e92e43f5ef4f7a592/139ff9bb70edd708-66/s540x810/0edbf6d586b6b4c85c5bd61569992f036c21191b.png"
        alt="fog"
      />
    </div>
  </template>
  
  <script setup>
  // 이 컴포넌트는 별도 스크립트 로직이 필요 없습니다.
  </script>
  
  <style scoped>
  html,
  body {
    height: 100%;
    margin: 0;
    background-color: #000;
    overflow: hidden;
  }
  
  .container {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 120%;
    pointer-events: none;
  }
  
  .fog {
    opacity: 1;
    min-width: 5000px;
    position: relative;
    animation-name: fog;
    animation-duration: 3s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  
  @keyframes fog {
    from {
      right: 0px;
    }
    to {
      right: 50px;
    }
  }
  </style>
  