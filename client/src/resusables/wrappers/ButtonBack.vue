<template>
  <button
    @click="!dataProps.externalFunc && $router.back()"
    class="flex items-center text-[19px] mx-3"
  >
    <i class="fa-solid fa-circle-arrow-left text-red-800 mr-1"></i><slot></slot>
  </button>
</template>

<script lang="ts" setup>
const dataProps = defineProps<{
  externalFunc?: boolean;
}>();
</script>