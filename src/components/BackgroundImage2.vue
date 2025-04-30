<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const bgRef = ref(null); // background 요소 참조
const containerRef = ref(null); // placement-container 요소 참조
const pos = ref({ x: 10, y: 10 }); // 아이템의 위치 (퍼센트 값)
const dragging = ref(false); // 드래그 상태
const offset = ref({ x: 0, y: 0 }); // 드래그 시작 시 마우스와 아이템의 상대 위치
const itemWidth = ref(80); // 아이템의 동적 크기

let resizeObserver = null; // ResizeObserver 인스턴스

const updateItemWidth = () => {
  if (containerRef.value) {
    const containerWidth = containerRef.value.getBoundingClientRect().width;
    // placement-container 크기에 따라 아이템 크기 조정
    itemWidth.value = Math.min(80, containerWidth * 0.09); // 최대 80px, 컨테이너의 10% 크기
  }
};

onMounted(() => {
  updateItemWidth();

  // ResizeObserver를 사용하여 placement-container 크기 변화를 감지
  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateItemWidth();
    });
    resizeObserver.observe(containerRef.value);
  }

  window.addEventListener("resize", updateItemWidth); // 창 크기 변경 시 업데이트
});

onBeforeUnmount(() => {
  // ResizeObserver 해제
  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value);
    resizeObserver = null;
  }

  window.removeEventListener("resize", updateItemWidth);
});

const onMouseDown = (e) => {
  if (!bgRef.value) return;
  dragging.value = true;
  const bgRect = bgRef.value.getBoundingClientRect();
  // 드래그 시작 시 마우스와 아이템의 상대 위치 계산
  offset.value.x = e.clientX - bgRect.left - (pos.value.x / 100) * bgRect.width;
  offset.value.y = e.clientY - bgRect.top - (pos.value.y / 100) * bgRect.height;
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
};

const onMouseMove = (e) => {
  if (!dragging.value || !bgRef.value) return;
  const bgRect = bgRef.value.getBoundingClientRect();
  // 마우스 위치를 background 기준 퍼센트 값으로 변환
  let newX = ((e.clientX - bgRect.left - offset.value.x) / bgRect.width) * 100;
  let newY = ((e.clientY - bgRect.top - offset.value.y) / bgRect.height) * 100;

  // 좌우로는 0 ~ 70% 사이로 제한
  newX = Math.min(Math.max(newX, 0), 70);
  // 상하로는 0 ~ 80% 사이로 제한
  newY = Math.min(Math.max(newY, 0), 110);

  pos.value = { x: newX, y: newY };
};

const onMouseUp = () => {
  dragging.value = false;
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
};
</script>

<template>
  <div ref="containerRef" class="placement-container">
    <img
      ref="bgRef"
      class="background"
      src="https://x1-groo.s3.ap-northeast-2.amazonaws.com/ground2"
      alt="Green Background"
    />
    <img
      class="item"
      src="https://x1-groo.s3.ap-northeast-2.amazonaws.com/joy_hedgehog"
      alt="hedgehog"
      @mousedown="onMouseDown"
      :style="{
        left: pos.x + '%',
        top: pos.y + '%',
        width: itemWidth + 'px'
      }"
      draggable="false"
    />
  </div>
</template>

<style scoped>
.placement-container {
  position: relative;
  border: 5px solid black;
}

.background {
  width: 80%;
  display: block;
  border: 5px solid blue;
}

.item {
  position: absolute;
  cursor: move;
  user-select: none;
}
</style>