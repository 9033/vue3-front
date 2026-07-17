<template>
  <main class="page-surface">
    <header class="page-hero">
      <p class="page-kicker">Vue 3 Playground</p>
      <h1 class="page-title">실험용 페이지 모음</h1>
      <p class="page-subtitle">원하는 항목을 선택해서 바로 이동하세요.</p>
    </header>

    <TabGroup>
      <TabList class="tab-list">
        <Tab v-slot="{ selected }" as="template">
          <button :class="['tab', selected && 'tab-active']">
            자주 쓰는 페이지
          </button>
        </Tab>
        <Tab v-slot="{ selected }" as="template">
          <button :class="['tab', selected && 'tab-active']">연습/예제</button>
        </Tab>
      </TabList>

      <TabPanels class="panels">
        <TabPanel class="panel">
          <ul class="card-list">
            <li v-for="item in mainLinks" :key="item.path">
              <a class="card" :href="item.path">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
              </a>
            </li>
          </ul>
        </TabPanel>

        <TabPanel class="panel">
          <ul class="card-list">
            <li v-for="item in practiceLinks" :key="item.path">
              <a class="card" :href="item.path">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
              </a>
            </li>
          </ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </main>
</template>

<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";

const mainLinks = [
  {
    title: "차량 가격 계산",
    path: "/#/car-budget",
    description: "자산과 연소득을 입력해 권장 차량 가격을 계산합니다.",
  },
  {
    title: "원신",
    path: "/#/genshin-impact",
    description: "원신 관련 즐겨보는 유튜브 동영상을 모아둔 페이지입니다.",
  },
];

const practiceLinks = [
  {
    title: "Form With Tab",
    path: "/#/form-with-tab",
    description:
      "하위 컴포넌트 양식으로 데이터를 생성/수정하고 값 변경을 다루는 예제입니다.",
  },
  {
    title: "store tab input",
    path: "/#/store-tab-input",
    description: "store를 이용해서 입력은 child 컴포넌트에서 받고 parent 컴포넌트에서 데이터 조회",
  },
];
</script>

<style scoped>
@import "../styles/page-theme.css";

.tab-list {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
}

.tab {
  border: 1px solid #9ca3af;
  background: rgba(255, 255, 255, 0.72);
  color: #1f2937;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab:hover {
  border-color: #115e59;
  color: #115e59;
  background: rgba(255, 255, 255, 0.9);
}

.tab-active {
  background: #115e59;
  color: #fff;
  border-color: #115e59;
}

.panel {
  outline: none;
}

.card-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.card {
  display: block;
  text-decoration: none;
  border: 1px solid #c7d2ce;
  border-radius: 14px;
  background: linear-gradient(165deg, #f8fbfa, #eef4f1);
  padding: 18px;
  min-height: 122px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  border-color: #0f766e;
  box-shadow: 0 10px 24px rgba(17, 94, 89, 0.18);
}

.card h2 {
  margin: 0 0 8px;
  font-size: 1.1rem;
  color: #111827;
}

.card p {
  margin: 0;
  color: #334155;
  line-height: 1.45;
}

@media (max-width: 640px) {
  .tab-list {
    flex-wrap: wrap;
  }
}
</style>
