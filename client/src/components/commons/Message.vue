<template>
  <div
    class="w-full flex justify-center fixed z-[60] bottom-[7%] text-center"
    v-if="store.eventMessage"
  >
    <p :class="[setApperance]" class="font-bold">
      {{ store.eventMessage }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { onUpdated, Ref, ref } from "@vue/runtime-core";

const store = useEventStore();
const setApperance: Ref<string> = ref<string>("");

const base = "px-4 md:px-8 py-2 border-2 rounded-md border-black";
onUpdated(() => {
  setApperance.value = store.isError
    ? `${base} bg-red-400`
    : `${base} bg-green-400`;
});
</script>