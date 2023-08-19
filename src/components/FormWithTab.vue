<!--
자삭으로 입력 컴포넌트가 있는 컴포넌트
-->
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Input1 from "./Input1.vue";
import Input2 from "./Input2.vue";
import Result from "./Result.vue";
import Tab from "./Tab.vue";
import { Paper } from "../types/paper";
import { useRouter, useRoute } from "vue-router";
const [route, router] = [useRoute(), useRouter()];
const tab = ref<string>("Input1");
const tabs = [
  "name",
  "age",
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

onMounted(() => {
  tabChange(tabs[0]);
});

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
  <section class="tab">
    <Tab :tab="tab" :tabs="tabs" @change="tabChange" />
  </section>
  <template v-if="tab === tabs[0]">
    <section>
      <label for="data_name">data.name: </label>
      <Input1 id="data_name" :data="data" @change="change" />
    </section>
    <section>
      <label for="data2_name">data2.name: </label>
      <Input1 id="data2_name" :data="data2" @change="change" />
    </section>
  </template>
  <template v-else-if="tab === tabs[1]">
    <section>
      <label for="data_age">data.age: </label>
      <Input2 id="data_age" :data="data" @change="change" />
    </section>
    <section>
      <label for="data2_age">data2.age: </label>
      <Input2 id="data2_age" :data="data2" @change="change" />
    </section>
  </template>
  <section>
    <table class="result">
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
  </section>
  <section>
    <ul>
      <li>하위 컴포넌트에서 값을 변경하는 경우 상위 컴포넌트에 반영되어야함</li>
      <li>data의 값이 바뀌는 경우 data2의 값도 같이 바뀌어야함.</li>
      <li>탭을 변경해도 data나 data2의 값이 변경되지 않아야함.</li>
      <li>초기값을 지정한 경우 하위 컴포넌트의 입력란에 반영 되어야함</li>
    </ul>
  </section>
  <!-- <component :is="tab" :data="data" @change="change"></component> -->
  <!-- <Input1 v-if="tab === 'Input1'" :data="data" @change="change"/>
  <Input2 v-else-if="tab === 'Input2'" :data="data" @change="change"/> -->
  <!-- <Result v-else-if="tab === 'Result'" :data="data"/> -->
</template>

<style scoped>
section {
  width: 600px;
}
section,
td {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 8px;
  margin: 0;
}
section:not(:last-child) {
  margin-bottom: 32px;
}
section > label {
  width: 200px;
}
</style>
