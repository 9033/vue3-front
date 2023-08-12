<!--
자삭으로 입력 컴포넌트가 있는 컴포넌트
-->
<script setup lang="ts">
import { ref } from "vue";
import Input1 from "./Input1.vue";
import Input2 from "./Input2.vue";
import Result from "./Result.vue";
import Tab from "./Tab.vue";
import { Paper } from "../types/paper";
import { useRouter, useRoute } from "vue-router";
const [route, router] = [useRoute(), useRouter()];
const tab = ref<string>("Input1");
const tabs = [
  "Input1",
  "Input2",
  // 'Result',
];

const tabChange = (tabName: string) => {
  tab.value = tabName;
  // change url
  router.push({
    params: {
      tabName: tabName,
    },
    query: {
      ...route.query,
    },
  });
};

// 초기값 없어도 됨
const data = ref<Partial<Paper>>({
  // name: '',
  // age: 0,
});

// type에 맞춰서 초기값을 넣음
const data2 = ref<Paper>({
  name: "",
  age: 0,
});

// data와 data2에 값을 설정
const change = (draft: Partial<Paper>) => {
  data.value = {
    ...data.value,
    ...draft,
  };
  data2.value = {
    ...data2.value,
    ...draft,
  };
};
</script>

<template>
  <Tab :tab="tab" :tabs="tabs" @change="tabChange" />
  <table>
    <tr>
      <td>data</td>
      <td>
        <div v-if="tab === 'Input1'">
          <Input1 :data="data" @change="change" />
        </div>
        <div v-else-if="tab === 'Input2'">
          <Input2 :data="data" @change="change" />
        </div>
      </td>
    </tr>
    <tr>
      <td>data2</td>
      <td>
        <div v-if="tab === 'Input1'">
          <Input1 :data="data2" @change="change" />
        </div>
        <div v-else-if="tab === 'Input2'">
          <Input2 :data="data2" @change="change" />
        </div>
      </td>
    </tr>
  </table>
  <table>
    <tr>
      <td>data</td>
      <td>
        <Result :data="data" />
      </td>
    </tr>
    <tr>
      <td>data2</td>
      <td>
        <Result :data="data2" />
      </td>
    </tr>
  </table>
  <table>
    <tr>
      <th colspan="2">data</th>
    </tr>
    <tr>
      <td>Input1</td>
      <td>
        <Input1 :data="data" @change="change" />
      </td>
    </tr>
    <tr>
      <td>Input2</td>
      <td>
        <Input2 :data="data" @change="change" />
      </td>
    </tr>
  </table>
  <table>
    <tr>
      <th colspan="2">data2</th>
    </tr>
    <tr>
      <td>Input1</td>
      <td>
        <Input1 :data="data2" @change="change" />
      </td>
    </tr>
    <tr>
      <td>Input2</td>
      <td>
        <Input2 :data="data2" @change="change" />
      </td>
    </tr>
  </table>
  <!-- <component :is="tab" :data="data" @change="change"></component> -->
  <!-- <Input1 v-if="tab === 'Input1'" :data="data" @change="change"/>
  <Input2 v-else-if="tab === 'Input2'" :data="data" @change="change"/> -->
  <!-- <Result v-else-if="tab === 'Result'" :data="data"/> -->
</template>

<style scoped>
th,
td {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 8px;
  margin: 0;
}
table:not(:last-child) {
  margin-bottom: 32px;
}
</style>
