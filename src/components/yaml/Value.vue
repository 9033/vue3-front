<template>
  <template v-if="typeof value === 'string'">
    <input type="string" :value="value" />
  </template>
  <template v-else-if="typeof value === 'boolean'">
    <input type="checkbox" :value="value" />
  </template>
  <template v-else-if="typeof value === 'number'">
    <input type="number" :value="value" />
  </template>
  <template v-else-if="typeOfValue === 'Date'">
    <!-- {{ value?.toISOString?.()?.slice?.(0, 16) }} -->
    <!-- <input type="string" :value="value" /> -->
    <input type="datetime-local" :value="a" />
    <!-- <input type="time" :value="a" />
    <input type="date" :value="a" /> -->
  </template>
  <template v-else-if="Array.isArray(value)">
    <div v-for="v in value">
      <Value :value="v"></Value>
    </div>
  </template>
  <template v-else-if="typeof value === 'object'">
    <div v-for="[k, v] in Object.entries(value)">
      <label>{{ k }}</label>
      <Value :value="v"></Value>
    </div>
  </template>
  <template v-else>
    {{ value }}
    {{ typeof value }}
  </template>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Value from "./Value.vue";
const props = defineProps(["value"]);
const typeOfValue = computed(() => {
  if (props.value instanceof Date) return "Date";
  else undefined;
});
const a = computed(() => {
  // YYYY-MM-DDTHH:MM:ss
  // YYYY-MM-DDTHH:MM
  return props.value?.toISOString?.()?.slice?.(0, 16);
  /*
  const pad = (n) => String(n).padStart(2, "0");
  const formatDateTimeLocal = (date) =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  */
  // return props.value?.toISOString?.();
  // return props.value?.toDateString?.();
  // return props.value?.toTimeString?.();
  // return props.value?.toTimeString?.();
});
</script>
<style lang="scss" scoped>
div {
  margin-left: 16px;
}
</style>
