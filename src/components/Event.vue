<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
const stopPropagation = ref(false);
const stopPropagationRef = ref<HTMLInputElement>();
/* 채크박스 클릭 */
const stopPropagationClick = () => {
  stopPropagation.value =
    stopPropagationRef?.value?.checked ?? stopPropagation.value;
};
const log = ref<[number, string][]>([]);
/* 박스 클릭 */
const click = (e: Event, s: string) => {
  // console.log(s);
  const d = new Date();
  // log.value.push([Math.round(e.timeStamp), s]);
  // timeStamp.value = d.valueOf();
  log.value.unshift([d.valueOf(), s]);
  if (stopPropagation.value) e.stopPropagation(); // chocolate 클릭 -> orange 클릭
  // e.stopImmediatePropagation();
  // e.preventDefault();
};
/* 새 log를 표시 */
const timeStamp = ref<number>(0);
const intervalId = ref<number>(0);
onMounted(() => {
  intervalId.value = window.setInterval(() => {
    const d = new Date();
    timeStamp.value = d.valueOf();
  }, 100);
});
onUnmounted(() => {
  window.clearInterval(intervalId.value);
});
</script>

<template>
  <h1 class="title">stopPropagation 동작 확인</h1>
  <div>
    <ul>
      <li>stopPropagation 채크박스를 설정한 경우</li>
      <ul>
        <li>오렌지 박스 클릭시 오렌지 박스 클릭 이벤트 발생</li>
        <li>초콜렛 박스 클릭시 초콜렛과 오렌지 박스 클릭 이벤트 발생</li>
      </ul>
      <li>stopPropagation 채크박스를 해제한 경우</li>
      <ul>
        <li>오렌지 박스 클릭시 오렌지 박스 클릭 이벤트 발생</li>
        <li>초콜렛 박스 클릭시 초콜렛 박스 클릭 이벤트만 발생</li>
      </ul>
    </ul>
  </div>
  <div>
    <input
      ref="stopPropagationRef"
      type="checkbox"
      id="stopPropagation"
      name="stopPropagation"
      :value="stopPropagation"
      @click="stopPropagationClick"
    />
    <label for="stopPropagation">stopPropagation</label>
  </div>
  <div
    class="main"
    @click="(e) => click(e, 'click - orange')"
    @contextmenu="(e) => click(e, 'contextmenu - orange')"
  >
    <div
      @click="(e) => click(e, 'click - chocolate')"
      @contextmenu="(e) => click(e, 'contextmenu - chocolate')"
    ></div>
  </div>
  <div class="log">
    <span v-for="l in log" :class="{ new: timeStamp - l[0] <= 1000 }"
      >{{ l[0] }} {{ l[1] }}</span
    >
  </div>
</template>

<style scoped>
/* stopPropagation 채크박스 부분 */
div:has(input, label) {
  display: flex;
  align-items: anchor-center;
  font-size: x-large;
  label {
    cursor: pointer;
  }
}
/* 클릭한 시간과 박스 */
div.log {
  display: flex;
  flex-direction: column;
  height: 300px;
  width: fit-content;
  overflow-y: scroll;
  span {
    transition: background-color 0.3s ease-in-out;
    &.new {
      background-color: gray;
    }
  }
}
/* 오렌지와 그 안에 초콜렛 박스 배치 */
div.main {
  background-color: orange;
  height: 400px;
  width: 400px;
  align-content: center;
  justify-items: center; /* 일부 브라우저는 display: grid가 필요 */
  display: grid; /* for firefox safari */
  cursor: pointer;
  > div {
    background-color: chocolate;
    height: 150px;
    width: 150px;
  }
}
</style>
