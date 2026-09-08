<script setup lang="ts">
import { computed, ref } from "vue";

const c = ref<HTMLCanvasElement>();
const v = ref<HTMLVideoElement>();
/**
 * 캡쳐한 이미지
 */
const src = ref("");

/**
 * 캡쳐 시작
 * @description
 * 화면 혹은 창 캡쳐를 시작
 */
const start = async () => {
  const captureStream = await navigator.mediaDevices.getDisplayMedia();
  v.value!.srcObject = captureStream;

  const width = 1920;
  const height = 1080;
  // const width = window.document.body.clientWidth;
  // const height = window.document.body.clientHeight; // v.value!.videoHeight / (v.value!.videoWidth / width);
  v.value!.setAttribute("width", String(width));
  v.value!.setAttribute("height", String(height));
  c.value!.setAttribute("width", String(width));
  c.value!.setAttribute("height", String(height));
  // v.value!.width = window.document.body.getAttribute("width");
  // v.value!.height = window.document.body.getAttribute("height");
  v.value!.play();
};
/**
 * 캡쳐
 * @description
 * 화면 혹은 창을 이미지로 캡처
 */
const capture = async () => {
  const context = c.value!.getContext("2d");
  // c.value!.width = window.document.body.getAttribute("width");
  // c.value!.height = window.document.body.getAttribute("height");
  context!.drawImage(v.value!, 0, 0, c.value!.width, c.value!.height);
  const data = c.value!.toDataURL("image/png");
  // console.log(data);
  src.value = data;
};

/**
 * 캡쳐 함수 조회
 * @description
 * localhost이거나 https가 되어야 브라우저에서 허용됨
 */
const n = computed(() => {
  return navigator;
});

/**
 * 캡쳐 시작
 * @description
 * 카메라 캡쳐 시작
 */
const start_m = async () => {
  const t = {
    audio: false,
    video: {
      width: { ideal: 1080 },
      height: { ideal: 1920 },
      facingMode: "environment",
    },
  } as MediaStreamConstraints;
  const captureStream = await navigator.mediaDevices.getUserMedia(t);
  v.value!.srcObject = captureStream;

  // const width = window.document.body.clientWidth;
  // const height = window.document.body.clientHeight;
  const width = 1080;
  const height = 1920;
  v.value!.setAttribute("width", String(width));
  v.value!.setAttribute("height", String(height));
  c.value!.setAttribute("width", String(width));
  c.value!.setAttribute("height", String(height));
  // v.value!.width = window.document.body.getAttribute("width");
  // v.value!.height = window.document.body.getAttribute("height");
  v.value!.onloadedmetadata = () => {
    v.value!.play();
  };
};
/**
 * 캡쳐
 * @description
 * 카메라 캡쳐
 */
const capture_m = async () => {
  const context = c.value!.getContext("2d");
  // c.value.width = window.document.body.getAttribute("width");
  // c.value.height = window.document.body.getAttribute("height");
  context!.drawImage(v.value!, 0, 0, c.value!.width, c.value!.height);
  const data = c.value!.toDataURL("image/png");
  // console.log(data);
  src.value = data;
};
</script>
<style lang="css" scoped></style>

<template>
  <!-- <div>{{ w.document.body.clientHeight }}</div>
  <div>{{ w.document.body.scrollHeight }}</div>
  <div>{{ w.document.body.offsetHeight }}</div>
  <div>{{ w.document.body.clientWidth }}</div>
  <div>{{ w.document.body.scrollWidth }}</div>
  <div>{{ w.document.body.offsetWidth }}</div> -->
  <div>
    <a-button @click="start()">Start</a-button>
    <br />
    <a-button @click="capture()">Capture</a-button>
  </div>
  <br />
  <div>
    {{ n.mediaDevices }}
    <br />
    <a-button @click="start_m()">Start</a-button>
    <br />
    <a-button @click="capture_m()">Capture</a-button>
  </div>
  <canvas v-show="false" ref="c"></canvas>
  <video v-show="false" ref="v" autoplay playsinline muted></video>
  <img :src="src" />
</template>
