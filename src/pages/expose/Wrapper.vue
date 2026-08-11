<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import Common from "./Common.vue";
import Wrapper2 from "./Wrapper2.vue";
const common = ref<typeof Common>();
const wrapper2 = ref<typeof Wrapper2>();
const Wrapper3 = defineAsyncComponent(() => import("./Wrapper3.vue"));
const wrapper3 = ref<typeof Wrapper3>();
</script>

<template>
  <div>
    <h1>컴포넌트 내부의 함수 call</h1>
    <p>
      컴포넌트 내부에 선언하고 defineExpose로 지정한 함수를 부모 컴포넌트 에서
      호출 하기
    </p>
  </div>
  <div>
    <Common ref="common"></Common>
    <ul>
      <li>
        바로 하위 컴포넌트에 expose된 함수 call
        <ul>
          <li>
            <button @click="common?.fn()">common?.fn()</button>
            <span>동작</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div>
    <Wrapper2 ref="wrapper2" />
    <ul>
      <li>
        하위의 하위 컴포넌트에 expose된 함수 call
        <ul>
          <li>
            <button
              @click="wrapper2?.fn1()"
              style="text-decoration-line: line-through"
            >
              wrapper2?.fn1()
            </button>
            <span>동작 하지 않고 콘솔에 오류가 나옴</span>
          </li>
          <li>
            <button @click="wrapper2?.fn2()">wrapper2?.fn2()</button>
            <span>동작</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div>
    <Wrapper3 ref="wrapper3" />
    <ul>
      <li>
        동적으로 import된 하위의 하위 컴포넌트에 expose된 함수 call
        <ul>
          <li>
            <button
              @click="wrapper3?.fn1()"
              style="text-decoration-line: line-through"
            >
              wrapper3?.fn1()
            </button>
            <span>동작 하지 않고 콘솔에 오류가 나옴</span>
          </li>
          <li>
            <button @click="wrapper3?.fn2()">wrapper3?.fn2()</button>
            <span>동작</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
