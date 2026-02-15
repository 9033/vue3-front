<script setup lang="ts">
import { computed, ref } from "vue";

const asset = ref<number | null>(null);
const income = ref<number | null>(null);

const assetValue = computed(() => Number(asset.value) || 0);
const incomeValue = computed(() => Number(income.value) || 0);

const recommendation = computed(
  () => assetValue.value * 0.05 + incomeValue.value * 0.5,
);

const formattedRecommendation = computed(() =>
  new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(recommendation.value),
);
</script>

<template>
  <section class="page">
    <div class="hero">
      <p class="eyebrow">자동차 가격 가이드</p>
      <h1>자산과 소득으로 합리적인 차 가격을 계산해요</h1>
      <p class="subtitle">
        입력한 자산의 5% + 연소득의 50%를 합산해 권장 가격을 보여줍니다.
      </p>
    </div>

    <div class="calculator">
      <div class="field">
        <label for="asset">자산 (만원)</label>
        <input
          id="asset"
          v-model.number="asset"
          type="number"
          min="0"
          step="1"
          placeholder="예: 12000"
        />
      </div>
      <div class="field">
        <label for="income">연소득 (만원)</label>
        <input
          id="income"
          v-model.number="income"
          type="number"
          min="0"
          step="1"
          placeholder="예: 5000"
        />
      </div>
    </div>

    <div class="result">
      <div>
        <p class="result-label">권장 차량 가격</p>
        <p class="result-value">
          {{ formattedRecommendation }}
          <span class="unit">만원</span>
        </p>
      </div>
      <p class="result-note">계산식: 자산 × 5% + 연소득 × 50%</p>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Space+Grotesk:wght@400;600&display=swap");

.page {
  --ink: #1b1c1d;
  --sand: #f5f0e6;
  --amber: #e6a756;
  --sea: #2f6f73;
  --paper: #fffaf2;
  min-height: 100vh;
  padding: 56px 20px 80px;
  background: radial-gradient(
    circle at top,
    #fff3d6 0%,
    #f4ece0 48%,
    #e2d3c2 100%
  );
  color: var(--ink);
  font-family: "Space Grotesk", "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(
      120deg,
      rgba(230, 167, 86, 0.08) 0%,
      rgba(47, 111, 115, 0.08) 100%
    ),
    radial-gradient(
      circle at 20% 20%,
      rgba(255, 255, 255, 0.7),
      transparent 55%
    );
  pointer-events: none;
  z-index: -1;
}

.hero {
  max-width: 720px;
  animation: fadeUp 0.7s ease-out;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 12px;
  color: var(--sea);
  margin-bottom: 12px;
  font-weight: 600;
}

h1 {
  font-family: "DM Serif Display", "Times New Roman", serif;
  font-size: clamp(30px, 5vw, 44px);
  margin: 0 0 12px;
}

.subtitle {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  max-width: 560px;
  color: #414141;
}

.calculator {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  background: var(--paper);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 16px 32px rgba(27, 28, 29, 0.08);
  border: 1px solid rgba(27, 28, 29, 0.08);
  animation: fadeUp 0.7s ease-out 0.1s both;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: 600;
  color: #2a2a2a;
}

input {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(27, 28, 29, 0.15);
  font-size: 16px;
  background: #fff;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  color: black;
}

input:focus {
  outline: none;
  border-color: var(--sea);
  box-shadow: 0 0 0 3px rgba(47, 111, 115, 0.2);
}

.result {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    rgba(47, 111, 115, 0.08),
    rgba(230, 167, 86, 0.18)
  );
  border: 1px solid rgba(27, 28, 29, 0.08);
  max-width: 520px;
  animation: fadeUp 0.7s ease-out 0.2s both;
}

.result-label {
  margin: 0;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #4a4a4a;
}

.result-value {
  margin: 0;
  font-size: clamp(28px, 5vw, 36px);
  font-weight: 600;
  color: var(--sea);
}

.unit {
  font-size: 16px;
  color: #4a4a4a;
  margin-left: 6px;
}

.result-note {
  margin: 0;
  font-size: 14px;
  color: #4a4a4a;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
