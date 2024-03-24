<!--
  d3으로 canvas에 그리기
-->
<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as d3 from "d3";

/**
 * 연관된 변수를 모음
 */
const d3Canvas = ref<Record<any, any>>({
  radius: 10,
  status: "", // drag와 zoom이 동시에 동작하는 것을 방지
});

/**
 * node의 타입
 */
type Node = {
  id: any;
} & d3.SimulationNodeDatum;

/**
 * link의 타입
 */
type Link = d3.SimulationLinkDatum<any>;

/**
 * 노드
 */
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

/**
 * 간선
 */
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

/**
 * draw links
 */
const drawLinks = (context: any, links: any[]) => {
  context.globalAlpha = 0.666;
  context.strokeStyle = "#666";
  context.beginPath();
  links.forEach((d) => {
    context.moveTo(d.source.x, d.source.y);
    context.lineTo(d.target.x, d.target.y);
  });
  context.stroke();
};

/**
 * draw nodes
 * @description
 * x, y좌표가 지정된 node만 그림
 */
const drawNodes = (context: any, nodes: any[]) => {
  context.fillStyle = "#ccc";
  context.strokeStyle = "#ccc";
  context.globalAlpha = 1;
  nodes
    .filter((d) => {
      return typeof d?.x === "number" && typeof d?.y === "number";
    })
    .forEach((d) => {
      context.beginPath();
      context.moveTo(d.x, d.y);
      context.arc(d.x, d.y, d3Canvas.value.radius, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
    });
};

/**
 * draw
 */
const updateCanvas = () => {
  const canvas = d3Canvas.value.canvas;
  if (!canvas) return false;
  const context = d3Canvas.value.context;
  if (!context) return false;
  const width = canvas.width;
  const height = canvas.height;
  context.clearRect(0, 0, width, height); // 캔버스 클리어
  context.save(); // 없으면 마우스가 움직이는 대로 시점이 이동이 안됨

  const transform = d3Canvas.value.transform;
  context.translate(transform.x, transform.y);
  context.scale(transform.k, transform.k);

  drawLinks(context, links.value);
  drawNodes(context, nodes.value);
  context.restore(); // 없으면 마우스가 움직이는 대로 시점이 이동이 안됨
};

/**
 * get point of force center
 * @description
 * canvas의 중심 좌표 리턴
 */
const getForceCenter = () => {
  const canvas = window.document.querySelector("canvas");
  if (!canvas) return {};
  const rect = canvas.getBoundingClientRect();
  return {
    x: rect.width / 2,
    y: rect.height / 2,
  };
};

/**
 * set new force simulation
 * @description
 * x, y 좌표를 자동으로 지정한다.
 */
const forceSimulation = () => {
  const forcecenter = getForceCenter();
  const simulation = d3
    .forceSimulation(nodes.value)
    .force("charge", d3.forceManyBody())
    .force(
      "link",
      d3.forceLink(links.value).distance(() => d3Canvas.value.radius * 12)
    )
    .force("center", d3.forceCenter(forcecenter.x, forcecenter.y))
    .on("tick", updateCanvas);
  return simulation;
};

/**
 * zoom
 * @description
 * zoom 이벤트가 발생했을때 실행
 */
const zoomed = (event: any) => {
  if (d3Canvas.value.status === "drag") return;
  d3Canvas.value.transform = event.transform;
  updateCanvas();
};

/**
 * canvas에서 클릭한 지점을 중심으로 일정 거리안에서 가장 가까운 노드
 * @description
 * - popup, drag일때 사용됨
 * - zoom으로 변경된 스케일과 위치 계산
 * */
const closestNode = (event: any) => {
  // console.log("closestNode", event);
  const tx = d3Canvas.value.transform.invertX(event.x);
  const ty = d3Canvas.value.transform.invertY(event.y);
  const node = d3.least(nodes.value, ({ x = Infinity, y = Infinity }) => {
    const dist2 = (x - tx) ** 2 + (y - ty) ** 2;
    if (dist2 < d3Canvas.value.radius ** 2) return dist2;
  });
  return node;
};

/** setupCanvas */
const setupCanvas = () => {
  const canvas = window.document.querySelector("canvas");
  d3Canvas.value.canvas = canvas;
  const context = canvas?.getContext("2d");
  d3Canvas.value.context = context;
  d3Canvas.value.drag = d3
    .drag()
    .subject(closestNode)
    .on("start", dragStart)
    .on("drag", dragging)
    .on("end", dragEnd);
  d3.select(canvas)
    .call(d3Canvas.value.drag as any)
    .call(d3Canvas.value.zoom);
};

onMounted(() => {
  d3Canvas.value.transform = d3.zoomIdentity.scale(1).translate(0, 0); // 가운데 좌표가 0, 0
  d3Canvas.value.zoom = d3.zoom().scaleExtent([0.5, 10]).on("zoom", zoomed);
  d3Canvas.value.forceSimulation = forceSimulation();
  setupCanvas();
});

// drag
/** drag 시작 */
const dragStart = (event: any) => {
  // console.log("dragStart", { event });
  d3Canvas.value.status = "drag";
  if (!event.active) d3Canvas.value.forceSimulation.alphaTarget(0.3).restart(); // 이거 없으면 drag가 멈춤
  event.subject.fx = d3Canvas.value.transform.invertX(event.subject.x);
  event.subject.fy = d3Canvas.value.transform.invertY(event.subject.y);
};
/** drag 하는 중 */
const dragging = (event: any) => {
  // console.log("dragging", { event });
  event.subject.fx = d3Canvas.value.transform.invertX(event.x);
  event.subject.fy = d3Canvas.value.transform.invertY(event.y);
};
/** drop */
const dragEnd = (event: any) => {
  // console.log("dragEnd", { event });
  if (!event.active) d3Canvas.value.forceSimulation.alphaTarget(0); // 이거 없으면 drag가 멈춤
  event.subject.x = d3Canvas.value.transform.invertX(event.x);
  event.subject.y = d3Canvas.value.transform.invertY(event.y);
  event.subject.fx = null;
  event.subject.fy = null;
  d3Canvas.value.status = "dragEnd";
};
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
