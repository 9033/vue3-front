<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { Content } from "../types/embed.ts";

const Embed = defineAsyncComponent(() => import("./Embed.vue"));

const tags: Array<string> = `
  재개발
`
  .split(/\s+/)
  .filter((x) => !!x);

const contents: Content[] = [
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/NRzBnto0A6I",
    tags: "재개발".split(" "),
  },
];
</script>

<template>
  <Embed :tags="tags" :contents="contents"></Embed>
</template>

<style scoped></style>
