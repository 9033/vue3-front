<!--
오프젝트를 보여주는 컴포넌트
-->
<script setup lang="ts">
import { Paper } from "../types/paper";
defineProps<{ data: Partial<Paper> }>();
</script>

<template>
  <pre>{{ JSON.stringify(data, null, 2) }}</pre>
</template>

<style scoped></style>
