<template>
  <div class="myitemview-screen">
    <div class="content-wrapper">
      <div class="top-message">
        나의 조각 보기<br />
        지금까지 모은 조각들을 확인해보세요.
      </div>

      <div class="pieces-wrapper">
        <div class="subtitle">총 {{ totalCount }}개의 조각을 모으셨네요!</div>
        <div class="section">
          <div class="section-title">식물</div>
          <div class="piece-grid">
            <div v-for="item in plants" :key="item.name" class="piece-card">
              <img :src="item.img" class="piece-img" />
              <div class="piece-name">{{ item.name }}</div>
              <div v-if="item.count > 1" class="piece-count">x{{ item.count }}</div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="section-title">사물</div>
          <div class="piece-grid">
            <div v-for="item in objects" :key="item.name" class="piece-card">
              <img :src="item.img" class="piece-img" />
              <div class="piece-name">{{ item.name }}</div>
              <div v-if="item.count > 1" class="piece-count">x{{ item.count }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const plants = [
  { name: '향기 꽃', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_flower1', count: 1 },
  { name: '분홍 꽃', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_flower2', count: 1 },
  { name: '흑백 꽃', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_flower3', count: 1 },
  { name: '높다란 나무', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_tree1', count: 1 },
  { name: '동글 나무', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_tree2', count: 2 },
  { name: '둥근 나무', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_tree3', count: 1 },
  { name: '메로나 나무', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_tree4', count: 1 },
  { name: '요거트 나무', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_tree5', count: 1 }
]
const objects = [
  { name: '빈 바구니', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_basket1', count: 1 },
  { name: '숲속 종탑', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_belfry1', count: 1 },
  { name: '포근한 하늘 새', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_bird1', count: 1 },
  { name: '졸린 고양이', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_cat1', count: 1 },
  { name: '꼬마 공룡', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_dinosaur1', count: 1 },
  { name: '느긋 코끼리', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_elephant1', count: 1 },
  { name: '포근 울타리', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_fence1', count: 1 },
  { name: '아담한 집', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_house1', count: 1 },
  { name: '요정 집', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_house2', count: 1 },
  { name: '농사꾼', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_man1', count: 1 },
  { name: '나무 이정표', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_milestone1', count: 1 },
  { name: '노란 우산', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_umbrella1', count: 2 },
  { name: '웃는 개구리', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_frog1', count: 1 },
  { name: '말똥말똥 부엉이', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_owl1', count: 1 },
  { name: '배추밭', img: 'https://x1-groo.s3.ap-northeast-2.amazonaws.com/sad_cabbages1', count: 1 }
]
const totalCount = plants.reduce((sum, p) => sum + p.count, 0) + objects.reduce((sum, o) => sum + o.count, 0)
</script>

<style scoped>
.myitemview-screen {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.top-message {
  color: #fff;
  font-size: 18px;
  margin-bottom: 32px;
  margin-left: 20px;
  line-height: 1.5;
}

.pieces-wrapper {
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 18px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 90%;
  box-sizing: border-box;
}

.subtitle {
  color: #fff;
  font-size: 0.95rem;
  margin-bottom: 18px;
  text-align: center;
}

.section {
  width: 100%;
  margin-bottom: 12px;
}

.section-title {
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 6px;
  margin-left: 8px;
}

.piece-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  background: rgba(255,255,255,0.10);
  border-radius: 16px;
  padding: 10px 4px;
}

.piece-card {
  background: rgba(255,255,255,0.18);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0 4px 0;
  min-height: 80px;
  position: relative;
}

.piece-img {
  width: 38px;
  height: 38px;
  margin-bottom: 4px;
}

.piece-name {
  color: #333;
  font-size: 0.92rem;
  font-weight: 500;
  margin-bottom: 2px;
}

.piece-count {
  position: absolute;
  right: 6px;
  bottom: 6px;
  color: #3a5a40;
  font-size: 0.9rem;
  font-weight: bold;
}
</style>