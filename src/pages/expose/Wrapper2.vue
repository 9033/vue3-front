<script setup lang="ts">
import { ref } from "vue";
import Common from "./Common.vue";
const common = ref<typeof Common>();
defineExpose({
  fn1: common?.value?.fn, // 함수가 아니라고 함
  fn2: () => common?.value?.fn(), // 동작한다.
});
</script>

<template>
  <Common ref="common"></Common>
</template>
