<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { Content } from "../types/embed";
import { convertToContent } from "../script/util";

const Embed = defineAsyncComponent(() => import("./Embed.vue"));

const tags: Array<string> = `
`
  .split(/\r?\n/)
  .filter((x) => !!x)
  .map((tag) => tag.trim());

const contents: Content[] = [
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/F37IAVr3F6Y?si=fxJyxB59TY_0vVYI",
    tags: "",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/zfnxpPHE3UQ?si=7DFPMv4c4IQMA_2u",
    tags: "",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/embed/WJUS6umKPzw?si=aAbtVpVHQHRdr8yk",
    tags: "",
  },
].map(convertToContent);
</script>

<template>
  <Embed :tags="tags" :contents="contents"></Embed>
</template>

<style scoped></style>
