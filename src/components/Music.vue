<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { Content } from "../types/embed";
import { convertToContent } from "../script/util";

const Embed = defineAsyncComponent(() => import("./Embed.vue"));

const tags: Array<string> = `
  La Campanella
  Lost Ark
  Initial D
`
  .split(/\r?\n/)
  .filter((x) => !!x)
  .map((tag) => tag.trim());

const contents: Content[] = [
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/kkq_3CrvFUM?si=a5LzLfBjQ1tAEJQL",
    tags: "La Campanella",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/0FbQZCsYXVg?si=cFZXoBAmbS5d23Wx",
    tags: "La Campanella",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/9iw2NJyV6dg?si=N80YEVp4LQ9JKWp8",
    tags: "Lost Ark",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/-7zoopkjsD8?si=3kGwJ1sCRav8n8HI",
    tags: "Initial D",
  },
].map(convertToContent);
</script>

<template>
  <Embed :tags="tags" :contents="contents"></Embed>
</template>

<style scoped></style>
