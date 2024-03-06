<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { Content } from "../types/embed";
import { convertToContent } from "../script/util";

const Embed = defineAsyncComponent(() => import("./Embed.vue"));

const tags: Array<string> = `
  Klee
  Nahida
  Lumine
  Kaeya
  Aether
  Paimon
  Kokomi
  Neuvillette
  Furina
`
  .split(/\s+/)
  .filter((x) => !!x);

const contents: Content[] = [
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/JjaszAiDuNk?si=yFUawwkbiVPaosj-",
    tags: "Neuvillette",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/WR671Bs9tH0?si=yBo9Cj9b_2LmGAX-",
    tags: "Neuvillette Furina",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/f1M0MF5u4lM?si=7AY1aKXO9phFBCK7",
    tags: "Neuvillette",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/pEBl2Rk60TA?si=kUmM4ybEhGGloFBM",
    tags: "Neuvillette Furina Lumine",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/KaCXs79zdls",
    tags: "Lumine Nahida",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/jON5ZozLStw",
    tags: "Lumine Nahida",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/hffiEkX95wA",
    tags: "Klee Kaeya",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/qhPv2m1iWI4",
    tags: "Klee Kaeya",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/CG0GC8rTqqE",
    tags: "Aether Nahida",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/sMBB15x8s4c",
    tags: "Klee Nahida",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/3r84Om3ylA8",
    tags: "Lumine Nahida",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/Lh7J9fDIGQk",
    tags: "Klee Nahida",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/6LxZt2mElhA",
    tags: "Paimon Nahida",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/4y8rDczyY3w",
    tags: "Kokomi Klee",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/aAeGYsUs5lo",
    tags: "Lumine Nahida",
  },
].map(convertToContent);
</script>

<template>
  <Embed :tags="tags" :contents="contents"></Embed>
</template>

<style scoped></style>
