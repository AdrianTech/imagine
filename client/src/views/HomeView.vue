<template>
  <SectionVue> TEST </SectionVue>
</template>

<script lang="ts" setup>
import SectionVue from "@/components/commons/Section.vue";
import { useAuthStore } from "@/stores/auth";
import { useEventStore } from "@/stores/event";
const store = useAuthStore();
const event = useEventStore();
</script>
