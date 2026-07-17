<script setup lang="ts">
import { useStoreTabsStore } from "../../stores/storeTab";
const store = useStoreTabsStore();
</script>
<template>
  <div>
    <label
      >name
      <input v-model="store.data.name" />
    </label>
  </div>
</template>
