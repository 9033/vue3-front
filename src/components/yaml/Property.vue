<template>
  <div>
    <input
      type="checkbox"
      v-model="selectResourceDefined"
      :disabled="disabled"
    />
    <label>{{ property }}</label>
    <template v-if="selectResourceDefined">
      <select :value="inputVal?.get_resource ?? ''" :disabled="disabled">
        <option value="">--Please choose an option--</option>
        <option v-for="resource in resources" :key="resource" :value="resource">
          {{ resource }}
        </option>
      </select>
    </template>
    <template v-else>
      <input :type="inputType" :disabled="disabled" :value="inputVal" />
    </template>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";

const props = defineProps([
  "property",
  "properties",
  "type",
  "resources",
  "disabled",
]);

const inputType = computed(() => {
  return props?.type ?? "string";
});

const selectResourceDefined = ref(false);

const inputVal = computed(() => {
  return props.properties?.[props.property];
});

watchEffect(() => {
  // selectResourceDefined.value =
  //   typeof props.properties?.[props.property]?.get_resource !== "undefined";
  selectResourceDefined.value =
    typeof inputVal.value?.get_resource !== "undefined";
});

// watch(inputVal, () => {
//   return typeof inputVal.value?.get_resource !== "undefined";
// });
</script>
<style lang="scss" scoped></style>
