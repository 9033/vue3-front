<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { Content } from "../types/embed";
import { convertToContent } from "../script/util";

const Embed = defineAsyncComponent(() => import("./Embed.vue"));

const tags: Array<string> = `
`
  .split(/\s+/)
  .filter((x) => !!x);
const contents: Content[] = [
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/F37IAVr3F6Y?si=fxJyxB59TY_0vVYI",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/zfnxpPHE3UQ?si=7DFPMv4c4IQMA_2u",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/WJUS6umKPzw?si=aAbtVpVHQHRdr8yk",
  },
].map(convertToContent);
</script>

<template>
  <Embed :tags="tags" :contents="contents"></Embed>
</template>

<style scoped></style>
