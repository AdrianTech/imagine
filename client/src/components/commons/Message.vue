<template>
  <div :class="[setApperance]" v-if="store.eventMessage">
    <p class="font-bold">
      {{ store.eventMessage }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { onUpdated, Ref, ref } from "@vue/runtime-core";

const store = useEventStore();
const setApperance: Ref<string> = ref<string>("");

const base =
  "px-2 md:px-6 md:ml-[10%] py-2 fixed bottom-10 border-2 rounded-md border-black";
onUpdated(() => {
  setApperance.value = store.isError
    ? `${base} bg-red-400`
    : `${base} bg-green-400`;
});
</script>