<script setup>
import { ref, onMounted } from "vue";
import buttonIcon_6 from "../icons/edit_icon.png"
import buttonIcon_7 from "../icons/External_icon.png"
import buttonIcon_8 from "../icons/is_public_icon.png"

const bgRef = ref(null); // background 요소 참조
const containerRef = ref(null); // placement-container 요소 참조
const itemWidth = ref(60); // 아이템의 고정 크기
const showTooltip = ref(false);
const forestData = ref(null);

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
});

const togglePublic = async () => {
  if (!forestData.value) return;
  const token = localStorage.getItem('accessToken');

  try {
    const res = await fetch(`http://localhost:8080/emotion-forest/public/${forestData.value.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error('공개여부 변경 실패');

    forestData.value.isPublic = !forestData.value.isPublic;
  } catch (err) {
    alert('공개여부 변경에 실패했습니다.');
    console.error(err);
  }
};
</script>

<template>
  <div>
    <div class="icons">
      <img :src="buttonIcon_6" class="btn-img" />
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
          :class="forestData && forestData.isPublic ? 'public' : 'private'">
          {{ forestData && forestData.isPublic ? '공개중' : '비공개' }}
        </div>
      </div>
    </div>
  </div>

  <div ref="containerRef" class="placement-container">
    <div class="placement-inner-container">
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
</style>