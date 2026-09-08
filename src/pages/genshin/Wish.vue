<script setup lang="ts">
/*
1. pc 원신에서 기원 목록을 열고 드래그 해서 ctrl+c
2. textarea에 붙여 넣음
3. 테이블로 변환된 목록을 엑셀에 붙여 넣기
*/
import { computed, ref } from "vue";
const i = ref("");
const r = computed(() => {
  const a = i.value
    .trim()
    .replace(/((캐릭터|무기)\n(.+)\n(.+)\n(.+))+/g, "$2^$3^$4^$5")
    .split("\n");
  return a.reverse();
});
</script>

<style lang="css" scoped>
td {
  outline: 1px grey solid;
}
</style>

<template>
  <textarea v-model="i"></textarea>
  <!-- <pre>{{ r }}</pre> -->
  <table>
    <tbody>
      <tr v-for="(rr, i) in r" :key="`${i}`">
        <td v-for="(rrr, ii) in rr.split('^')" :key="`${i}-${ii}`">
          {{ rrr.trim() }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
