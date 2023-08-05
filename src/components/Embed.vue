<script setup lang="ts">
/*
테그 변경시 이미 로드된 섬네일이 다시 로드되지 않게 하려고 v-show 사용
코드에 ''과 ,를 입력하는 수고를 덜기위해 데이터를 split로 배열로 변환
*/
import { ref } from 'vue';
import { Content } from '../types/embed.ts'

defineProps({
  tags: {
    type: Array<string>,
    default: ()=>[]
  },
  contents: {
    type: Array<Content>,
    default: ()=>[]
  },
})

const selectedTags = ref<Array<string>>([])

const toggleSelectTag = (tag: string) => {
  if(selectedTags.value.includes(tag)){
    // deselect
    selectedTags.value = selectedTags.value.filter(t => tag != t)
  } else {
    // select
    selectedTags.value.push(tag)
  }
}


// const showMethodOr = (content: Content) => {
//   return content.tags.find(tag => selectedTags.value.includes(tag))
// }

const showMethodAnd = (content: Content) => {
  return selectedTags.value.every(tag => content.tags.includes(tag))
}

const vshow = (content: Content) => {
  return showMethodAnd(content)
}
</script>

<template>
  <div class="list">
    <button v-for="tag in tags" :key="tag" :class="{'selected-tag': selectedTags.includes(tag)}" @click="toggleSelectTag(tag)">{{tag}}</button>
  </div>
  <div class="list">
    <!-- <component :is="c"></component> -->
    <template v-for="content in contents">
      <template v-if="content.type === 'youtube'">
        <iframe v-show="vshow(content)" width="560" height="315" :src="content.url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </template>
      <template v-else>
        <p v-show="vshow(content)">
          {{ content.type }}
        </p>
      </template>
    </template>
  </div>
</template>

<style scoped>
.selected-tag {
  color: red;
}
.list > * {
  margin: 8px;
}
</style>
