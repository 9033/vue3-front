<template>
  <template v-if="typeof value === 'string'">
    <input
      type="text"
      :value="_v ?? value"
      @input="inputFn['text']"
      :readonly="readonly"
      :disabled="disabled"
    />
  </template>
  <template v-else-if="typeof value === 'boolean'">
    <input
      type="checkbox"
      :value="_v ?? value"
      @input="inputFn['checkbox']"
      :readonly="readonly"
      :disabled="disabled"
    />
  </template>
  <template v-else-if="typeof value === 'number'">
    <input
      type="number"
      :value="_v ?? value"
      @input="inputFn['number']"
      :readonly="readonly"
      :disabled="disabled"
    />
  </template>
  <template v-else-if="typeOfValue === 'Date'">
    <input
      type="datetime-local"
      :value="_v ?? a"
      @input="inputFn['datetime-local']"
      :readonly="readonly"
      :disabled="disabled"
    />
  </template>
  <template v-else-if="Array.isArray(value)">
    <div v-for="v in value">
      <Value :value="v" :readonly="readonly" :disabled="disabled"></Value>
    </div>
  </template>
  <template v-else-if="typeof value === 'object'">
    <div v-for="[k, v] in Object.entries(value)">
      <label>{{ k }}</label>
      <Value :value="v" :readonly="readonly" :disabled="disabled"></Value>
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
const props = defineProps(["value", "readonly", "disabled"]);
const typeOfValue = computed(() => {
  if (props.value instanceof Date) return "Date";
  else undefined;
});
const _v = ref();
const inputFn = {
  // text
  text: (e: any): string => (_v.value = `${e.target.value}`),
  // checkbox
  checkbox: (e: any): boolean => (_v.value = e.target.checked),
  // number
  number: (e: any): number => (_v.value = e.target.value),
  // datetime-local
  "datetime-local": (e: any): string => (_v.value = e.target.value),
};
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
