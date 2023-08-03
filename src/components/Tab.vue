<!--
탭
-->
<script setup lang="ts">
defineProps<{ tab: string, tabs: string[] }>()
</script>

<template>
  <div>
    <p v-for="tab in tabs"
      @click="()=>{
        $emit('change',tab)
      }"
    >{{tab}}</p>
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
</style>
