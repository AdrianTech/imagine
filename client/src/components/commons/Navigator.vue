<template>
  <div class="flex gap-x-2">
    <div v-for="elem in navPath" :key="elem">
      <router-link :to="{ name: elem }">{{ elem }}</router-link> >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
const route = useRoute();
const navPath = ref(["home", ...route.meta.navPath]);

watch(route, (fresh) => {
  navPath.value = fresh.meta.navPath;
});
</script>

<style lang="scss" scoped>
</style>