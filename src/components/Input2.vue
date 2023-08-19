<!--
입력 컴포넌트
-->
<script setup lang="ts">
import { Paper } from "../types/paper";
defineProps<{ data: Partial<Paper> }>();
const emit = defineEmits(["change"]);
const change = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  emit("change", {
    age: Number(target.value),
  } as Partial<Paper>);
};
</script>

<template>
  <input type="number" :value="data.age" @input="change" />
</template>

<style scoped></style>
