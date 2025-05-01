<template>
    <div class="dustwrapper">
      <div id="dustlayer_01" class="dust">
        <div class="image01" :style="getImageStyle(dust1)"></div>
        <div class="image02" :style="getImageStyle(dust1)"></div>
      </div>
      <div id="dustlayer_02" class="dust">
        <div class="image01" :style="getImageStyle(dust2)"></div>
        <div class="image02" :style="getImageStyle(dust2)"></div>
      </div>
      <div id="dustlayer_03" class="dust">
        <div class="image01" :style="getImageStyle(dust1)"></div>
        <div class="image02" :style="getImageStyle(dust1)"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import dust1 from '@/assets/yellow-watercolor-texture.jpg';  // 이미지 import
  import dust2 from '@/assets/yellow-watercolor-texture.jpg';  // 이미지 import
  
  const getImageStyle = (image) => ({
    background: `url(${image}) center center/cover no-repeat transparent`
  });
  </script>
  
  <style>
  html, body {
    margin: 0;
    padding: 0;
  }
  body {
    overflow-x: hidden;
    background-color: #f3e9c0;
  }
  
  .dustwrapper {
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    pointer-events: none;
    z-index: 1000;
    filter: blur(1.5px) sepia(0.5) hue-rotate(-20deg) brightness(1.05);
  }
  
  #dustlayer_01, #dustlayer_02, #dustlayer_03 {
    height: 100%;
    position: absolute;
    width: 200%;
  }
  
  #dustlayer_01 .image01, #dustlayer_01 .image02,
  #dustlayer_02 .image01, #dustlayer_02 .image02,
  #dustlayer_03 .image01, #dustlayer_03 .image02 {
    float: left;
    height: 250%;
    width: 50%;
    background-repeat: repeat-x;
  }
  
  #dustlayer_01 {
    animation: dust_opacity_01 10s linear infinite,
               dust_move 10s linear infinite;
  }
  #dustlayer_02 {
    animation: dust_opacity_02 15s linear infinite,
               dust_move 8s linear infinite;
  }
  #dustlayer_03 {
    animation: dust_opacity_03 20s linear infinite,
               dust_move 6s linear infinite;
  }
  
  @keyframes dust_opacity_01 {
    0%   { opacity: 0.3; }
    30%  { opacity: 0.5; }
    70%  { opacity: 0.4; }
    100% { opacity: 0.3; }
  }
  @keyframes dust_opacity_02 {
    0%   { opacity: 0.2; }
    40%  { opacity: 0.4; }
    80%  { opacity: 0.3; }
    100% { opacity: 0.2; }
  }
  @keyframes dust_opacity_03 {
    0%   { opacity: 0.2; }
    50%  { opacity: 0.5; }
    100% { opacity: 0.2; }
  }
  @keyframes dust_move {
    0%   { left: 0; }
    100% { left: -100%; }
  }
  
  @media (max-width: 767px) {
    #dustlayer_01 .image01, #dustlayer_01 .image02,
    #dustlayer_02 .image01, #dustlayer_02 .image02,
    #dustlayer_03 .image01, #dustlayer_03 .image02 {
      width: 3000%;
    }
  }
  </style>
  