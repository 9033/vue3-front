<!-- 수익률 손실률 계산 -->
<script setup lang="ts">
import { computed, ref } from "vue";
const before = ref(0);
const after = ref(0);
const profit = computed(() => {
  return ((after.value - before.value) / before.value) * 100;
});
</script>
<template>
  <h1>수익률 손실률</h1>
  <p>
    <label
      >before
      <input v-model="before" type="number" id="before" name="before" />
    </label>
  </p>
  <p>
    <label
      >after
      <input v-model="after" type="number" id="after" name="after" />
    </label>
  </p>
  <p :style="{ color: profit > 0 ? 'red' : profit < 0 ? 'blue' : '' }">
    profit: {{ profit }}%
  </p>
</template>
