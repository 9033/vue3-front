<script setup lang="ts">
/*
테그 나 페이지 변경시 이미 로드된 섬네일이 다시 로드되지 않게 하려고 v-show 사용
코드에 ''과 ,를 입력하는 수고를 덜기위해 데이터를 split로 배열로 변환
*/
import { computed, ref, watch } from "vue";
import { Content } from "../types/embed.ts";
import range from "../script/range";
const props = defineProps({
  tags: {
    type: Array<string>,
    default: () => [],
  },
  contents: {
    type: Array<Content>,
    default: () => [],
  },
});

// 선택한 테그
const selectedTags = ref<Array<string>>([]);
// 테그 변경
const toggleSelectTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    // deselect
    selectedTags.value = selectedTags.value.filter((t) => tag != t);
  } else {
    // select
    selectedTags.value.push(tag);
  }
};

// 테그 변경시 1 페이지로 이동
watch(selectedTags, () => {
  page.value = 1;
});

// const showMethodOr = (content: Content) => {
//   return content.tags.find(tag => selectedTags.value.includes(tag))
// }

// 컨텐츠가 선택된 테그에 전부 해당 하는지
const showMethodAnd = (content: Content): boolean => {
  return selectedTags.value.every((tag) => content.tags.includes(tag));
};

const vshow = (content: Content): boolean => {
  return showMethodAnd(content);
};

// 테그에 해당하는 컨텐츠의 인덱스 번호 목록
const filtered_idx_of_contents = computed((): number[] => {
  const index = [];
  for (const idx in props.contents) {
    if (vshow(props.contents[idx])) index.push(Number(idx));
  }
  return index;
});

// 페이지당 컨텐츠
const content_per_page = ref<number>(5);

// 현체 페이지
const page = ref<number>(1);

// 페이지에 해당하는 컨텐츠의 인덱스 목록
const paged_idx_of_contents = computed((): number[] => {
  return filtered_idx_of_contents.value.slice(
    (page.value - 1) * content_per_page.value,
    page.value * content_per_page.value
  );
});

// 페이지의 배열
const list_page = computed((): number[] => {
  return range(
    1,
    Math.ceil(filtered_idx_of_contents.value.length / content_per_page.value) +
      1
  );
});

// 전체 인덱스의 배열
const total_list_idx = computed((): number[] => {
  return range(0, props.contents.length);
});
</script>

<template>
  <div class="list">
    <button
      v-for="tag in tags"
      :key="tag"
      :class="{ 'selected-tag': selectedTags.includes(tag) }"
      @click="toggleSelectTag(tag)"
    >
      {{ tag }}
    </button>
  </div>
  <div class="list">
    <button
      v-for="_page in list_page"
      :key="_page"
      :class="{ 'selected-tag': _page === page }"
      @click="page = _page"
    >
      {{ _page }}
    </button>
  </div>
  <div class="list">
    <!-- <component :is="c"></component> -->
    <template v-for="idx in total_list_idx">
      <template v-if="contents[idx].type === 'youtube'">
        <iframe
          v-show="paged_idx_of_contents.includes(idx)"
          width="560"
          height="315"
          :src="contents[idx].url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </template>
      <template v-else>
        <p v-show="paged_idx_of_contents.includes(idx)">
          {{ contents[idx].url }}
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
