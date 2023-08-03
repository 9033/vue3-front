<!--
입력 컴포넌트
-->
<script setup lang="ts">
import { Paper } from '../types/paper';
defineProps<{ data: Partial<Paper> }>()
const emit = defineEmits(['change'])
const change = (e: Event): void => {
  const target = e.target as HTMLInputElement
  emit('change',{
    name: target.value
  } as Partial<Paper>)
}
</script>

<template>
  name: <input :value="data.name" @input="change"/>
</template>

<style scoped>
</style>
