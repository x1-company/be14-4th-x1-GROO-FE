<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
import buttonIcon_6 from "../icons/edit_icon.png"
import buttonIcon_7 from "../icons/External_icon.png"
import buttonIcon_8 from "../icons/is_public_icon.png"
import { useRouter } from 'vue-router';

const router = useRouter();
const showGuestBook = ref(false);
const showGuestBookDetail = ref(false);
const selectedGuestBookId = ref(null);

const bgRef = ref(null); // background 요소 참조
const containerRef = ref(null); // placement-container 요소 참조
const itemWidth = ref(60); // 아이템의 고정 크기
const showTooltip = ref(false);
const forestData = ref(null);
const selectedPiece = ref(null)
const dragPos = ref({ x: 50, y: 50 })
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })

const { proxy } = getCurrentInstance();

onMounted(async () => {
  // 숲 데이터 가져오기
  const token = localStorage.getItem('accessToken');

  // let forestId = route.params.forestId
  let forestId = localStorage.getItem("myRecentforestId")

  if (!forestId) {
    try {
      const res = await fetch('http://localhost:8080/myforest', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!res.ok) throw new Error('myforest 요청 실패')

      const forestList = await res.json()

      if (!forestList.length) {
        alert('소유한 숲이 없습니다.')
        return
      }

      forestId = forestList[0].id
      router.replace(`/forest-detail/${forestId}`)
      return
    } catch (err) {
      console.error('myforest 호출 실패:', err)
    }
  } else {
    try {
      const response = await fetch(`http://localhost:8080/detail/${forestId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        alert("다시 로그인해 주세요!")
        router.push('/login')
        throw new Error('detail 요청 실패')
      }

      forestData.value = await response.json()
      console.log('forestData:', forestData.value)
    } catch (error) {
      console.error('숲 정보 불러오기 실패:', error)
    }
  }

  // 이벤트 버스에서 이벤트 수신
  proxy.emitter.on('place-item', (piece) => {
    selectedPiece.value = piece;
    dragPos.value = { x: 10, y: 20 } // 초기 위치 고정
    console.log('Received piece in ForestDetail:', selectedPiece.value);
  });
});

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onUnmounted(() => {
  proxy.emitter.off('place-item');
});

const togglePublic = async () => {
  if (!forestData.value) return;
  const token = localStorage.getItem('accessToken');

  try {
    const res = await fetch(`http://localhost:8080/emotion-forest/public/${forestData.value[0].forestId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error('공개여부 변경 실패');

    forestData.value[0].isPublic = !forestData.value[0].isPublic;
  } catch (err) {
    alert('공개여부 변경에 실패했습니다.');
    console.error(err);
  }
};

const onMouseDown = (event) => {
  event.preventDefault(); // 브라우저 기본 드래그 방지
  isDragging.value = true;
  const container = containerRef.value;
  const rect = container.getBoundingClientRect();
  const imgCenterX = rect.left + (rect.width * dragPos.value.x / 100);
  const imgCenterY = rect.top + (rect.height * dragPos.value.y / 100);
  dragOffset.value = {
    x: event.clientX - imgCenterX,
    y: event.clientY - imgCenterY
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (event) => {
  if (!isDragging.value) return;
  const container = containerRef.value;
  const rect = container.getBoundingClientRect();
  const x = ((event.clientX - rect.left - dragOffset.value.x) / rect.width) * 100;
  const y = ((event.clientY - rect.top - dragOffset.value.y) / rect.height) * 100;
  dragPos.value = {
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y))
  };
};

const onMouseUp = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};

const handleCompletePlacement = async () => {
  const token = localStorage.getItem('accessToken');
  const forestId = localStorage.getItem('myRecentforestId');
  if (!selectedPiece.value || !forestId) {
    alert('필수 정보가 없습니다.');
    return;
  }
  const body = {
    forestId: Number(forestId),
    itemPositionX: dragPos.value.x,
    itemPositionY: dragPos.value.y,
    itemId: selectedPiece.value.value
  };
  try {
    const res = await fetch('http://localhost:8080/emotion-forest/placement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('배치 요청 실패');
    alert('배치가 완료되었습니다!');
    // placementList에 새 아이템 추가
    if (forestData.value && forestData.value[0]) {
      forestData.value[0].placementList.push({
        placementId: Date.now(), // 임시 ID
        itemImageUrl: selectedPiece.value.icon,
        itemName: selectedPiece.value.label,
        placementPositionX: dragPos.value.x,
        placementPositionY: dragPos.value.y,
        itemId: selectedPiece.value.value
      });
    }
    selectedPiece.value = null; // 버튼만 숨김, 이미지는 남음
  } catch (err) {
    alert('배치에 실패했습니다.');
    console.error(err);
  }
}
</script>

<template>
  <div class="forest-detail">
    <div v-if="!showGuestBook" class="icons">
      <img :src="buttonIcon_6" class="btn-img" @click="handleGuestBookClick" />
      <img :src="buttonIcon_7" class="btn-img" />
      <img
        :src="buttonIcon_8"
        class="btn-img"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
        @click="togglePublic"
        style="cursor:pointer;"
      />
      <div v-if="showTooltip" class="tooltip">
        <div class="tooltip-title">공개 범위 설정</div>
        <div class="tooltip-status"
          :class="forestData && forestData[0].isPublic ? 'public' : 'private'">
          {{ forestData && forestData[0].isPublic ? '공개중' : '비공개' }}
        </div>
      </div>
    </div>
  </div>

  <div ref="containerRef" class="placement-container">
    <div class="placement-inner-container">
      <button v-if="selectedPiece" class="complete-btn" @click="handleCompletePlacement">배치 완료</button>
      <img
        v-if="forestData && forestData.length"
        ref="bgRef"
        class="background"
        :src="forestData[0].backgroundImageUrl"
        alt="Green Background"
      />
      <img
        v-if="forestData && forestData.length"
        v-for="item in forestData[0].placementList"
        :key="item.placementId"
        class="item"
        :src="item.itemImageUrl" 
        :alt="item.itemName"
        :style="{
          left: `${item.placementPositionX}%`,
          top: `${item.placementPositionY}%`,
          width: `${itemWidth}px`
        }"
        draggable="false"
      />
      <img
        v-if="selectedPiece"
        class="item draggable"
        :src="selectedPiece.icon"
        :alt="selectedPiece.label"
        :style="{
          left: `${dragPos.x}%`,
          top: `${dragPos.y}%`,
          width: `${itemWidth}px`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }"
        @mousedown="onMouseDown"
        @dragstart.prevent
        draggable="false"
      />
    </div>
  </div>
</template>

<style scoped>
.placement-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.placement-inner-container {
  position: relative;
  width: 800px;
  height: auto;
}

.background {
  width: 100%;
  height: auto;
  display: block;
}

.item {
  position: absolute;
  user-select: none;
  transform: translate(-50%, -50%);
}

.icons {
  position: absolute;
  top: 12.83%;
  left: 5.07%;
  display: flex;
  gap: 16px;
  z-index: 10;
}

.btn-img {
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  bottom: 45px;
  left: 87%;
  transform: translateX(-50%);
  background: rgba(240, 248, 240, 0.95);
  opacity: 0.7;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 12px 24px 16px 24px;
  min-width: 180px;
  z-index: 100;
  text-align: center;
  font-size: 18px;
  color: #333;
  pointer-events: none;
}

.tooltip::after {
  content: '';
  position: absolute;
  left: 50.5%;
  bottom: -12px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 16px solid rgba(240, 248, 240, 0.95);
}

.tooltip-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.tooltip-status {
  font-size: 15px;
  background: #bfcfc2;
  color: #fff;
  border-radius: 10px;
  padding: 2px 12px;
  display: inline-block;
}

.tooltip-status.public {
  background: rgba(11, 87, 138, 0.33);
}

.tooltip-status.private {
  background: rgba(255, 10, 38, 0.33);
}

.item.draggable {
  user-select: none;
  touch-action: none;
  position: absolute;
}

/* .item.draggable:active {
  transform: scale(1.05);
} */

.place-btn {
  margin-top: 16px;
  padding: 8px 20px;
  background: #3a5a40;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.place-btn:hover {
  background: #2d4632;
}

.complete-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 30;
  padding: 10px 24px;
  background: #3a5a40;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.complete-btn:hover {
  background: #2d4632;
}
</style>