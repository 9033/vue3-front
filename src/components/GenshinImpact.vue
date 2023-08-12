<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { Content } from "../types/embed.ts";

const Embed = defineAsyncComponent(() => import("./Embed.vue"));

const tags: Array<string> = `
  Klee
  Nahida
  Lumine
  Kaeya
  Aether
  Paimon
  Kokomi
`
  .split(/\s+/)
  .filter((x) => !!x);

const contents: Content[] = [
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/KaCXs79zdls",
    tags: "Lumine Nahida".split(" "),
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/jON5ZozLStw",
    tags: "Lumine Nahida".split(" "),
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/hffiEkX95wA",
    tags: "Klee Kaeya".split(" "),
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/qhPv2m1iWI4",
    tags: "Klee Kaeya".split(" "),
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/CG0GC8rTqqE",
    tags: "Aether Nahida".split(" "),
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/sMBB15x8s4c",
    tags: "Klee Nahida".split(" "),
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/3r84Om3ylA8",
    tags: "Lumine Nahida".split(" "),
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/Lh7J9fDIGQk",
    tags: "Klee Nahida".split(" "),
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/6LxZt2mElhA",
    tags: "Paimon Nahida".split(" "),
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/4y8rDczyY3w",
    tags: "Kokomi Klee".split(" "),
  },
];
</script>

<template>
  <Embed :tags="tags" :contents="contents"></Embed>
</template>

<style scoped></style>
