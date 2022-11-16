<template>
  <section
    :class="store.navBar ? 'ml-[290px] opacity-0 md:opacity-100' : 'ml-[100px]'"
    class="transition-[margin-left] duration-300 font-primary"
  >
    <slot></slot>
  </section>
</template>

<script lang="ts" setup>
import { useAdminStore } from "@/stores/admin";

const store = useAdminStore();
</script>

<style lang="scss" scoped>
</style>