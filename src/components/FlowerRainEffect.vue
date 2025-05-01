<template>
  <canvas ref="canvas" class="rain-canvas"></canvas>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";

const canvas = ref(null);
let ctx;
let animationId;
let petals = [];

const canvasWidth = window.innerWidth / 2;
const canvasHeight = window.innerHeight;

const initCanvas = () => {
  const canvasEl = canvas.value;
  canvasEl.width = canvasWidth;
  canvasEl.height = canvasHeight;
  ctx = canvasEl.getContext("2d");
};

const createPetals = () => {
  const count = 80;
  petals = Array.from({ length: count }, () => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    radius: Math.random() * 6 + 4,
    speedY: Math.random() * 1.2 + 0.5,
    sway: Math.random() * 50 + 30,
    swaySpeed: Math.random() * 0.02 + 0.01,
    angle: Math.random() * Math.PI * 2,
  }));
};

const drawPetals = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  petals.forEach(petal => {
    const x = petal.x + Math.sin(petal.angle) * petal.sway;
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,182,193,0.7)"; // 연한 분홍색
    ctx.ellipse(x, petal.y, petal.radius, petal.radius * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
  });
};

const updatePetals = () => {
  petals.forEach(petal => {
    petal.y += petal.speedY;
    petal.angle += petal.swaySpeed;

    if (petal.y > canvasHeight) {
      petal.y = -10;
      petal.x = Math.random() * canvasWidth;
    }
  });
};

const animate = () => {
  drawPetals();
  updatePetals();
  animationId = requestAnimationFrame(animate);
};

onMounted(() => {
  initCanvas();
  createPetals();
  animate();
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.rain-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 150vh;
  z-index: 2;
  pointer-events: none;
}
</style>
