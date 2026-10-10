<script setup lang="ts">
/*
1. pc 원신에서 기원 목록을 열고 드래그 해서 ctrl+c
2. textarea에 붙여 넣음
3. 테이블로 변환된 목록을 엑셀에 붙여 넣기
*/
import { computed, ref } from "vue";
const reverse = ref(true); // true: 테이블에서 textarea의 역순으로 보여준다
const i = ref("");
const r = computed(() => {
  const a = i.value
    .trim()
    .replace(/((캐릭터|무기)\n(.+)\n(.+)\n(.+))+/g, "$2^$3^$4^$5")
    .split("\n");
  return reverse.value ? a.reverse() : a;
});
const v = computed(() => {
  if (i.value.length === 0) return true;
  for (let ii = 0; ii < r.value.length; ii++) {
    const tt = r.value[ii].split("^").map((s) => s.trim()); //  "캐릭터^1^1^1" .> ['캐릭터','1','1','1']
    if (tt.length !== 4) return false;
    for (let j = 0; j < tt.length; j++) {
      if (tt[j] === "캐릭터" || tt[j] === "무기") {
        if (j !== 0) return false;
      }
    }
  }
  return true;
});
</script>

<style lang="css" scoped>
th,
td {
  outline: 1px grey solid;
}
tbody {
  user-select: all;
}
.error {
  outline: 1px red solid;
}
</style>

<template>
  <textarea :class="{ error: !v }" v-model="i"></textarea>
  <!-- <pre>{{ r }}</pre> -->
  <div>
    <label>
      reverse
      <input type="checkbox" v-model="reverse" />
    </label>
  </div>
  <table>
    <thead>
      <tr>
        <th>아이템 유형</th>
        <th>아이템 이름</th>
        <th>기원 유형</th>
        <th>뽑기 시간</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rr, i) in r" :key="`${i}`">
        <td v-for="(rrr, ii) in rr.split('^')" :key="`${i}-${ii}`">
          {{ rrr.trim() }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
