<script setup lang="ts">
/*
테그 나 페이지 변경시 이미 로드된 섬네일이 다시 로드되지 않게 하려고 v-show 사용
코드에 ''과 ,를 입력하는 수고를 덜기위해 데이터를 split로 배열로 변환
*/
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { computed, onMounted, ref, watch } from "vue";
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
    selectedTags.value = selectedTags.value.filter(
      (selected) => selected !== tag,
    );
    return;
  }
  selectedTags.value.push(tag);
};

// const showMethodOr = (content: Content) => {
//   return content.tags.find(tag => selectedTags.value.includes(tag))
// }

// 컨텐츠가 선택된 테그에 전부 해당 하는지
const showMethodAnd = (content: Content): boolean => {
  if (selectedTags.value.length === 0) return true;
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
watch(selectedTags, () => {
  // 테그 변경시 1 페이지로 이동
  page.value = 1;
});

// 페이지에 해당하는 컨텐츠의 인덱스 목록
const paged_idx_of_contents = computed((): number[] => {
  return filtered_idx_of_contents.value.slice(
    (page.value - 1) * content_per_page.value,
    page.value * content_per_page.value,
  );
});

// 페이지의 배열
const list_page = computed((): number[] => {
  return range(
    1,
    Math.ceil(filtered_idx_of_contents.value.length / content_per_page.value) +
      1,
  );
});

// 전체 인덱스의 배열
const total_list_idx = computed((): number[] => {
  return range(0, props.contents.length);
});

import YoutubeContainer from "./YoutubeContainer.vue";

// 컨테이너 크기 반응형
// 컨테이너를 보여주는 목록의 크기를 바탕으로 각 컨테이너의 크기를 지정.
// 그리고 각 컨테이너별로 size를 조절하지 않음, 컨테이너별로 조정을 하면 v-show 가 false일때 넓이나 높이 값이 0이 나옴, 각 컨테이너 별로 이벤트 발생 후에 로직이 돌아가서 속도도 느림
const containerWidth = ref("560");
const containerHeigth = ref("315");
const setContainerSize = (containerWrapper: Element) => {
  const width = Math.min(560, containerWrapper.clientWidth);
  // console.log({ width });
  containerWidth.value = `${width}`;
  containerHeigth.value = `${(width / 16) * 9}`; // 16:9
};
const resize = () => {
  const containerWrapper = window.document.querySelector(".container-list");
  if (!containerWrapper) return;
  setContainerSize(containerWrapper);
};
onMounted(() => {
  resize();
  window.addEventListener("resize", () => {
    resize();
  });
});
</script>

<template>
  <div class="controls">
    <div class="control-block">
      <p class="control-label">태그 필터</p>
      <ul class="tag-options">
        <li v-for="tag in tags" :key="tag">
          <button
            type="button"
            class="tag-option"
            :class="{ 'selected-tag': selectedTags.includes(tag) }"
            @click="toggleSelectTag(tag)"
          >
            {{ tag }}
          </button>
        </li>
      </ul>
    </div>

    <div class="control-block">
      <p class="control-label">페이지</p>
      <RadioGroup v-model="page" class="page-group">
        <RadioGroupOption
          v-for="_page in list_page"
          :key="_page"
          :value="_page"
          as="template"
          v-slot="{ checked }"
        >
          <button
            type="button"
            class="page-button"
            :class="{ 'selected-tag': checked }"
          >
            {{ _page }}
          </button>
        </RadioGroupOption>
      </RadioGroup>
    </div>
  </div>

  <div class="container-list">
    <!-- <component :is="c"></component> -->
    <template v-for="idx in total_list_idx">
      <template v-if="contents[idx].type === 'youtube'">
        <YoutubeContainer
          v-show="paged_idx_of_contents.includes(idx)"
          :width="containerWidth"
          :height="containerHeigth"
          :src="contents[idx].url"
        />
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
  color: #fff;
  background: #115e59;
  border-color: #115e59;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 14px;
}

.control-block {
  min-width: 240px;
}

.control-label {
  margin: 0 0 8px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #1f2937;
}

.tag-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tag-option {
  cursor: pointer;
}

.page-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.page-button {
  min-width: 44px;
}

button {
  border: 1px solid #9ca3af;
  background: rgba(255, 255, 255, 0.72);
  color: #1f2937;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 600;
  transition: all 0.2s ease;
}

button:hover {
  border-color: #115e59;
  color: #115e59;
  background: rgba(255, 255, 255, 0.9);
}
</style>
