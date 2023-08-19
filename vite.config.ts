/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  // https://vitest.dev/guide/#configuring-vitest
  test: {
    // jest와 같은 전역 테스트 API 사용
    globals: true,
    // happy-dom으로 DOM 시뮬레이션
    // (피어 의존성으로 happy-dom을 설치해야 함)
    environment: "happy-dom",
  },
  // jest not found
  // resolve: {
  //   conditions: process.env.VITEST ? ["node"] : [],
  // },
});
