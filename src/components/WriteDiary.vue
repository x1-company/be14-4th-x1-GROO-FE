<template>
  <div class="diary-page-wrap">
    <!-- 사이드 토글 -->
    <button class="toggle-button-outer" @click="$emit('toggleMenu')">
      <span>«</span>
    </button>

    <div class="diary-card-float">
      <!-- 헤더: 제목 + 임시저장/불러오기 -->
      <div class="diary-header-row">
        <div class="diary-title">
          <span class="main-title">감정 일기 쓰기</span>
          <span class="tree-emoji">🌳</span>
        </div>
        <div class="header-buttons">
          <button class="header-btn" @click="saveDraft">임시 저장</button>
          <button class="header-btn" @click="loadDraft">불러오기</button>
        </div>
      </div>

      <!-- 날짜 선택 -->
      <div class="date-row">
        <!-- 숨겨진 Flatpickr 인풋 -->
        <flat-pickr
          ref="fp"
          v-model="selectedDate"
          :config="fpConfig"
          class="hidden-input"
        />
        <!-- 달력 버튼 -->
        <button class="date-btn" @click="openCalendar">
          🗓️ {{ formattedDate }}
        </button>
      </div>

      <!-- 일기 본문 -->
      <textarea
        v-model="diaryContent"
        placeholder="일기 내용을 입력해주세요"
        class="diary-textarea"
        maxlength="1000"
      ></textarea>

      <!-- 단어 수 -->
      <div class="footer-row">
        <span class="word-count">{{ diaryContent.length }}/1000</span>
      </div>

      <!-- 저장 버튼 -->
      <button class="submit-button" @click="submitDiary">저장하기</button>
    </div>
  </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'WriteDiary',
  components: { FlatPickr },
  emits: ['toggleMenu'],
  data() {
    const today = new Date().toISOString().slice(0, 10)
    return {
      diaryContent: '',
      selectedDate: today,
      fpConfig: {
        dateFormat: 'Y-m-d',
        locale: {
          firstDayOfWeek: 1,
          weekdays: {
            shorthand: ['일','월','화','수','목','금','토'],
            longhand:  ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
          },
          months: {
            shorthand: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            longhand:  ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
          }
        },
        onDayCreate: (_dObj, _dStr, _fp, dayElem) => {
          dayElem.classList.add('custom-day')
        }
      }
    }
  },
  computed: {
    formattedDate() {
      if (!this.selectedDate) return '날짜 선택'
      const d = new Date(this.selectedDate)
      const y = d.getFullYear()
      const m = d.getMonth() + 1
      const dd = d.getDate()
      const w = ['일','월','화','수','목','금','토'][d.getDay()]
      return `${y}년 ${m}월 ${dd}일 ${w}요일`
    }
  },
  methods: {
    openCalendar() {
      this.$refs.fp.fp.open()
    },
    submitDiary() {
      alert(`날짜: ${this.formattedDate}\n내용이 저장되었습니다!`)
    },
    saveDraft() {
      localStorage.setItem('diaryDraft', JSON.stringify({
        date: this.selectedDate,
        content: this.diaryContent
      }))
      alert('임시 저장되었습니다.')
    },
    loadDraft() {
      const str = localStorage.getItem('diaryDraft')
      if (str) {
        const { date, content } = JSON.parse(str)
        this.selectedDate = date
        this.diaryContent = content
      } else {
        alert('저장된 임시 글이 없습니다.')
      }
    }
  }
}
</script>

<style scoped>
.diary-page-wrap {
  width: 100vw; height: 100vh;
  display: flex; align-items: center; justify-content: center;
  position: relative; background: none;
}
.toggle-button-outer {
  position: absolute;
  left: calc(50% - 655px / 2 - 40px);
  top: 50%; transform: translateY(-50%);
  width: 40px; height: 60px;
  background: rgba(255,255,255,0.15); color: #fff;
  font-size: 32px; border: none; cursor: pointer;
  border-radius: 8px 0 0 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex; align-items: center; justify-content: center;
}
.diary-card-float {
  width: 655px; height: 1024px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border-radius: 18px; border: 1.5px solid rgba(255,255,255,0.25);
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 38px 32px 32px; display: flex;
  flex-direction: column; gap: 18px; box-sizing: border-box;
}

/* 헤더 */
.diary-header-row {
  display: flex; justify-content: space-between; align-items: flex-start;
}
.diary-title {
  display: flex; align-items: center;
  font-size: 1.5rem; font-weight: bold; color: #fff; gap: 8px;
}
.tree-emoji { font-size: 1.5rem; }
.header-buttons { display: flex; gap: 10px; }
.header-btn {
  background: rgba(255,255,255,0.35); border: none;
  border-radius: 12px; padding: 8px 18px;
  color: #fff; font-size: 1rem; font-weight: 500;
  cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: background 0.2s;
}
.header-btn:hover { background: rgba(255,255,255,0.55); }

/* 날짜 선택 */
.date-row {
  display: flex; align-items: center; gap: 12px;
}
.hidden-input {
  position: absolute; opacity: 0; pointer-events: none;
  width: 0; height: 0;
}
.date-btn {
  background: rgba(255,255,255,0.2); border: none;
  border-radius: 8px; padding: 6px 12px;
  color: #fff; font-size: 1rem; cursor: pointer;
}

/* Flatpickr 팝업 */
.flatpickr-calendar {
  background: transparent; border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.flatpickr-weekdays {
  color: #555; font-weight: 500; margin-bottom: 8px;
}
.flatpickr-day {
  background: transparent; border: none;
  color: #222; padding: 0; margin: 0 2px;
}
/* 동그라미 날짜 */
.custom-day {
  width: 36px; height: 36px; line-height: 36px;
  border-radius: 50%; display: inline-flex;
  justify-content: center; align-items: center;
  background: #e6f7f4; color: #2a2a2a;
  margin: 2px 0; transition: background 0.2s;
}
.custom-day:hover { background: #d0ece6; cursor: pointer; }
/* 선택 강조 */
.flatpickr-day.selected,
.flatpickr-day.startRange,
.flatpickr-day.endRange {
  background: #4a8f4a !important; color: #fff !important;
}

/* 본문 */
.diary-textarea {
  width: 100%; min-height: 520px;
  background: rgba(255,255,255,0.18); border: none;
  border-radius: 16px; font-size: 1.1rem; color: #222;
  padding: 22px 18px; resize: none; box-sizing: border-box;
  outline: none;
}
.diary-textarea::placeholder {
  color: #b7c7b7; font-size: 1.1rem;
}

/* 푸터 */
.footer-row {
  display: flex; justify-content: flex-end; align-items: center;
}
.word-count {
  color: #fff; font-size: 1rem; opacity: 0.8;
}

/* 저장 버튼 */
.submit-button {
  width: 100%; padding: 15px 0;
  background-color: #23391a; color: #fff; border: none;
  border-radius: 12px; font-size: 1.15rem; font-weight: 600;
  cursor: pointer; transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.submit-button:hover {
  background-color: #1a2b13;
}
</style>