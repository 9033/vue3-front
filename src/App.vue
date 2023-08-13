<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const _route = useRoute();
const router = useRouter();

const routes = computed(router.getRoutes);

onMounted(() => {
  /*
  // go to the first route
  const routes = router.getRoutes()
  if(routes?.[0])router.push(routes[0])
  */
});
</script>

<template>
  <div class="route">
    <template v-for="route in routes" :key="route.path">
      <router-link :to="route" v-if="route.name">
        <button
          type="button"
          :class="{ 'selected-tag': _route.name === route.name }"
        >
          {{ route.name }}
        </button>
      </router-link>
    </template>
  </div>
  <router-view></router-view>
</template>

<style scoped>
div.route {
  min-height: calc(64px - 8px - 8px);
  margin-top: 8px;
  margin-bottom: 0px;
}
div.route > *:not(:last-child) {
  margin-right: 8px;
  margin-bottom: 8px;
}
.selected-tag {
  color: red;
}
</style>
