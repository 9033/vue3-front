<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  CandlestickSeries,
  ColorType,
  type IChartApi,
  type ISeriesMarkersPluginApi,
  type ISeriesApi,
  type MouseEventParams,
  type Time,
  createChart,
  createSeriesMarkers,
} from "lightweight-charts";

type CandlePoint = {
  time: { year: number; month: number; day: number };
  open: number;
  high: number;
  low: number;
  close: number;
};

type ChartEventItem = {
  id: string;
  markerId: string;
  time: CandlePoint["time"];
  title: string;
  description: string;
};

type MarkerViewModel = {
  id: string;
  time: CandlePoint["time"];
  position: "aboveBar";
  shape: "circle";
  color: string;
  text: string;
  size: number;
};

const chartContainerRef = ref<HTMLElement | null>(null);
const hoveredMarkerIdFromChart = ref<string | null>(null);
const hoveredMarkerIdFromList = ref<string | null>(null);

const candles = createRandomCandles();
const events = createRandomEvents(candles, 8);
const activeHoveredMarkerId = computed(
  () => hoveredMarkerIdFromList.value ?? hoveredMarkerIdFromChart.value,
);

let chart: IChartApi | null = null;
let candleSeries: ISeriesApi<"Candlestick"> | null = null;
let markersApi: ISeriesMarkersPluginApi<Time> | null = null;
let resizeObserver: ResizeObserver | null = null;

const handleCrosshairMove = (param: MouseEventParams) => {
  if (typeof param.hoveredObjectId === "string") {
    hoveredMarkerIdFromChart.value = param.hoveredObjectId;
    updateMarkers();
    return;
  }

  if (hoveredMarkerIdFromChart.value !== null) {
    hoveredMarkerIdFromChart.value = null;
    updateMarkers();
  }
};

onMounted(() => {
  const container = chartContainerRef.value;
  if (!container) return;

  chart = createChart(container, {
    autoSize: true,
    height: 420,
    layout: {
      background: { type: ColorType.Solid, color: "#ffffff" },
      textColor: "#111827",
    },
    grid: {
      vertLines: { color: "#f1f5f9" },
      horzLines: { color: "#f1f5f9" },
    },
    rightPriceScale: {
      borderColor: "#e2e8f0",
    },
    timeScale: {
      borderColor: "#e2e8f0",
      timeVisible: true,
    },
    crosshair: {
      vertLine: {
        labelBackgroundColor: "#0ea5e9",
      },
      horzLine: {
        labelBackgroundColor: "#0ea5e9",
      },
    },
  });

  candleSeries = chart.addSeries(CandlestickSeries, {
    upColor: "#16a34a",
    borderUpColor: "#16a34a",
    wickUpColor: "#16a34a",
    downColor: "#dc2626",
    borderDownColor: "#dc2626",
    wickDownColor: "#dc2626",
  });
  candleSeries.setData(candles);

  markersApi = createSeriesMarkers(candleSeries, buildMarkers());
  chart.subscribeCrosshairMove(handleCrosshairMove);
  chart.timeScale().fitContent();

  // 차트 컨테이너 크기 변경 시 즉시 다시 그리기 위해 ResizeObserver를 연결한다.
  resizeObserver = new ResizeObserver(() => {
    chart?.timeScale().fitContent();
  });
  resizeObserver.observe(container);
});

onUnmounted(() => {
  if (chart) {
    chart.unsubscribeCrosshairMove(handleCrosshairMove);
  }
  resizeObserver?.disconnect();
  markersApi?.detach();
  chart?.remove();
});

const setHoveredMarkerFromList = (markerId: string | null) => {
  hoveredMarkerIdFromList.value = markerId;
  updateMarkers();
};

const isEventActive = (markerId: string) =>
  activeHoveredMarkerId.value === markerId;

const isEventDimmed = (markerId: string) =>
  activeHoveredMarkerId.value !== null &&
  activeHoveredMarkerId.value !== markerId;

function updateMarkers() {
  markersApi?.setMarkers(buildMarkers());
}

function buildMarkers(): MarkerViewModel[] {
  return events.map((event, index) => {
    const isActive = activeHoveredMarkerId.value === event.markerId;
    const hasAnyActive = activeHoveredMarkerId.value !== null;

    return {
      id: event.markerId,
      time: event.time,
      position: "aboveBar",
      shape: "circle",
      // hover 연동 시 사용자가 대응 이벤트를 즉시 인식하도록 마커 스타일을 동적으로 바꾼다.
      color: isActive ? "#2563eb" : hasAnyActive ? "#93c5fd" : "#f59e0b",
      text: `E${index + 1}`,
      size: isActive ? 3 : 2,
    };
  });
}

function createRandomCandles(): CandlePoint[] {
  const today = new Date();
  const start = new Date(today);
  start.setFullYear(start.getFullYear() - 1);

  const result: CandlePoint[] = [];
  let previousClose = 100;

  // 1년치 데모 데이터를 만들기 위해 주말을 제외한 일봉 시계열을 생성한다.
  for (
    const cursor = new Date(start);
    cursor <= today;
    cursor.setDate(cursor.getDate() + 1)
  ) {
    const day = cursor.getDay();
    if (day === 0 || day === 6) continue;

    const open = previousClose + randomBetween(-2.2, 2.2);
    const close = open + randomBetween(-3.4, 3.4);
    const high = Math.max(open, close) + randomBetween(0.2, 2.6);
    const low = Math.min(open, close) - randomBetween(0.2, 2.6);

    result.push({
      time: toBusinessDay(cursor),
      open: toFixed2(open),
      high: toFixed2(high),
      low: toFixed2(low),
      close: toFixed2(close),
    });

    previousClose = close;
  }

  return result;
}

function createRandomEvents(
  candleData: CandlePoint[],
  count: number,
): ChartEventItem[] {
  const today = new Date();
  const twoMonthsAgo = new Date(today);
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

  const recentCandles = candleData.filter((candle) => {
    const date = new Date(
      candle.time.year,
      candle.time.month - 1,
      candle.time.day,
    );
    return date >= twoMonthsAgo && date <= today;
  });

  const titles = [
    "실적 발표",
    "신제품 공개",
    "기관 매수",
    "목표가 상향",
    "지표 발표",
    "규제 뉴스",
    "컨퍼런스 콜",
    "배당 공시",
  ];

  // 최근 2개월 구간에서 랜덤 이벤트를 뽑아 마커/목록 동기화 시나리오를 재현한다.
  return Array.from({ length: count }).map((_, index) => {
    const candle =
      recentCandles[Math.floor(Math.random() * recentCandles.length)];
    const title = titles[index % titles.length];
    const markerId = `event-marker-${index + 1}`;

    return {
      id: `event-${index + 1}`,
      markerId,
      time: candle.time,
      title: `${title} #${index + 1}`,
      description: `${title} 관련 이벤트가 발생한 시점을 표시합니다.`,
    };
  });
}

function toBusinessDay(date: Date): CandlePoint["time"] {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function toFixed2(value: number): number {
  return Number(value.toFixed(2));
}

function formatBusinessDay(date: CandlePoint["time"]): string {
  const mm = String(date.month).padStart(2, "0");
  const dd = String(date.day).padStart(2, "0");
  return `${date.year}-${mm}-${dd}`;
}
</script>

<template>
  <section class="chart-events-page">
    <h1>Trading Chart Events</h1>
    <p class="page-description">
      1년 캔들 데이터와 최근 2개월 이벤트를 시리즈 마커로 연결한 데모
      페이지입니다.
    </p>
    <div class="layout">
      <div class="chart-panel">
        <div ref="chartContainerRef" class="chart-container"></div>
      </div>
      <aside class="event-panel">
        <h2>이벤트 목록</h2>
        <ul>
          <li
            v-for="event in events"
            :key="event.id"
            class="event-item"
            :class="{
              active: isEventActive(event.markerId),
              dimmed: isEventDimmed(event.markerId),
            }"
            @mouseenter="setHoveredMarkerFromList(event.markerId)"
            @mouseleave="setHoveredMarkerFromList(null)"
          >
            <div class="event-top">
              <span class="event-code">{{ event.markerId }}</span>
              <span class="event-date">{{
                formatBusinessDay(event.time)
              }}</span>
            </div>
            <p class="event-title">{{ event.title }}</p>
            <p class="event-description">{{ event.description }}</p>
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.chart-events-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

h1 {
  margin: 0;
  font-size: 22px;
}

.page-description {
  margin: 0;
  color: #4b5563;
}

.layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
}

.chart-panel,
.event-panel {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #ffffff;
}

.chart-panel {
  padding: 8px;
}

.chart-container {
  width: 100%;
  height: 420px;
}

.event-panel {
  padding: 12px;
}

.event-panel h2 {
  margin: 0 0 12px;
  font-size: 16px;
}

.event-panel ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 420px;
  overflow-y: auto;
}

.event-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px;
  background: #f8fafc;
  transition: all 0.15s ease;
}

.event-item.active {
  border-color: #2563eb;
  background: #eff6ff;
}

.event-item.dimmed {
  opacity: 0.45;
}

.event-top {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 12px;
  color: #334155;
}

.event-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.event-title {
  margin: 6px 0 2px;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.event-description {
  margin: 0;
  font-size: 13px;
  color: #475569;
}

@media (max-width: 980px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .event-panel ul {
    max-height: none;
  }
}
</style>
