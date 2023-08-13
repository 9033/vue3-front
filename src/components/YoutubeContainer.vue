<template>
  <span>
    <iframe
      :width="width"
      :height="height"
      :src="src"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </span>
</template>
<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: () => "",
  },
  show: {
    type: Boolean,
    default: () => true,
  },
  width: {
    type: String,
    default: "560",
  },
  height: {
    type: String,
    default: "315",
  },
});
</script>
<style scoped></style>
