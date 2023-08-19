<!--
탭
-->
<script setup lang="ts">
defineProps<{ tab: string; tabs: string[] }>();
</script>

<template>
  <div>
    <p
      v-for="_tab in tabs"
      :class="{ selected: _tab === tab }"
      @click="
        () => {
          $emit('change', _tab);
        }
      "
    >
      {{ _tab }}
    </p>
  </div>
</template>

<style scoped>
div {
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
div > p {
  cursor: pointer;
}
div > p:not(:last-child) {
  margin-right: 8px;
}
.selected {
  color: red;
}
</style>
