<!--
  d3으로 canvas에 그리기
-->
<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as d3 from "d3";

// node의 타입
type Node = {
  id: any;
} & d3.SimulationNodeDatum;

// link의 타입
type Link = d3.SimulationLinkDatum<any>;

// 노드
const nodes = ref<Node[]>([
  {
    id: 0,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  //   ].map((node) => ({
  //     x: 0,
  //     y: 0,
  //     vx: 0,
  //     vy: 0,
  //     ...node,
  //   }))
  // );
]);
// 링크
const links = ref<Link[]>([
  {
    source: 0,
    target: 1,
  },
  {
    source: 0,
    target: 2,
  },
]);
// draw
const updateCanvas = (scale = 1, translate = [0, 0]) => {
  const canvas = window.document.querySelector("canvas");
  if (!canvas) return false;
  const context = canvas.getContext("2d");
  if (!context) return false;
  const width = canvas.width;
  const height = canvas.height;
  context.clearRect(0, 0, width, height); // 캔버스 클리어
  // context.save();
  context.translate(translate[0], translate[1]);
  context.scale(scale, scale);

  // draw nodes
  context.fillStyle = "#ccc";
  context.strokeStyle = "#fff";
  context.globalAlpha = 1;
  nodes.value.forEach((d) => {
    if (typeof d.x !== "number" || typeof d.y !== "number") return;
    context.beginPath();
    context.moveTo(d.x + 5, d.y);
    context.arc(d.x, d.y, 5, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
  });
  context.stroke();
  // draw links
  context.globalAlpha = 0.6;
  context.strokeStyle = "#999";
  context.beginPath();
  links.value.forEach((d) => {
    context.moveTo(d.source.x, d.source.y);
    context.lineTo(d.target.x, d.target.y);
  });
  context.stroke();
};
//
const getForceCenter = () => {
  const canvas = window.document.querySelector("canvas");
  if (!canvas) return {};
  const rect = canvas.getBoundingClientRect();
  return {
    x: rect.width / 2,
    y: rect.height / 2,
  };
};
// new force simulation
// let simulation;
const forceSimulation = () => {
  const forcecenter = getForceCenter();
  const simulation = d3
    .forceSimulation(nodes.value)
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(links.value))
    .force("center", d3.forceCenter(forcecenter.x, forcecenter.y))
    .on("tick", updateCanvas);
  return simulation;
};
onMounted(() => {
  // simulation = forceSimulation();
  forceSimulation();
});
</script>

<template>
  <div class="canvas-container">
    <canvas ref="canvas" width="1000" height="1000"></canvas>
  </div>
</template>

<style scoped>
.canvas-container {
  border-color: darkslategray;
  border-width: 1px;
  border-style: solid;
}
</style>
