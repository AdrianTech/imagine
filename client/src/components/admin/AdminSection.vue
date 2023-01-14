<template>
  <section
    :class="store.navBar ? 'ml-[100px] opacity-0 md:opacity-100' : 'ml-[50px]'"
    class="transition-[margin-left] duration-300 font-primary pt-11"
  >
    <slot></slot>
  </section>
</template>

<script lang="ts" setup>
import { useAdminStore } from "@/stores/admin";

const store = useAdminStore();
</script>