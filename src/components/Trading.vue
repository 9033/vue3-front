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
    url: "https://www.youtube.com/embed/ne90b89vnhE?si=VMRvm016GNug0wpZ",
    tags: "",
  },
].map(convertToContent);
</script>

<template>
  <Embed :tags="tags" :contents="contents"></Embed>
</template>

<style scoped></style>
