<script setup lang="ts">
import { useStoreTabsStore } from "../../stores/storeTab";
const store = useStoreTabsStore();
</script>
<template>
  <div>
    <label
      >age
      <input v-model="store.data.age" />
    </label>
  </div>
</template>
