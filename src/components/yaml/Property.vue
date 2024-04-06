<template>
  <div>
    <label>{{ property }}</label>
    <input :type="inputType" disabled :value="inputVal" />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["property", "properties", "type"]);

const inputType = computed(() => {
  return props?.type ?? "string";
});

const inputVal = computed(() => {
  return props.properties?.[props.property];
});
</script>
<style lang="scss" scoped></style>
