<script setup lang="ts">
import { computed, defineComponent, h, onBeforeUnmount } from "vue";
import { useStoreTabsStore } from "../stores/storeTab";
import StoreTab1 from "./tabs/StoreTab1.vue";
import StoreTab2 from "./tabs/StoreTab2.vue";
const store = useStoreTabsStore();
const comp = computed(() => {
  if (store.tab === 1) return StoreTab1;
  else if (store.tab === 2) return StoreTab2;
  return defineComponent({
    name: "?",
    setup: () => () => h("a", "???"),
  });
});
onBeforeUnmount(()=>{
  store.$reset()
})
</script>
<template>
  <h3>입력은 child 컴포넌트에서 받고 parent 컴포넌트에서 데이터 조회</h3>
  <ul>
    <li>store 활용</li>
    <li>새로고침을 하면 기본 값으로 돌아감</li>
    <li>하위 컴포넌트에 props를 넣지 않아도 됨</li>
  </ul>
  <div style="outline: 1px white solid">
    <span>data</span>
    <pre>{{ store.data }}</pre>
  </div>
  <div>
    <span @click="store.tab = 1"><button>Tab 1</button></span>
    <span @click="store.tab = 2"><button>Tab 2</button></span>
  </div>
  <div style="outline: 1px white solid">
    <span>tab {{ store.tab }}</span>
  </div>
  <div style="outline: 1px white solid">
    <component :is="comp"></component>
  </div>  
</template>
