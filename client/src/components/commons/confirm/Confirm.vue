<template>
  <div
    class="
      h-screen
      w-screen
      fixed
      bg-black bg-opacity-10
      flex
      top-0
      justify-center
      z-[220]
    "
  >
    <div
      class="
        border-2 border-white
        rounded-md
        h-auto
        fixed
        text-center
        py-4
        px-8
        bg-slate-900
      "
    >
      <div class="text-center font-bold m-2 text-teal-50 md:text-lg">
        <p>
          {{ props.question }}
        </p>
      </div>
      <div class="p-1">
        <button
          class="text-white px-4 py-1 mr-2 border border-slate-300 rounded-md"
          @click="emit('confirm')"
        >
          {{ t("Potwierdź") }}
        </button>
        <button
          class="text-white px-4 py-1 border border-slate-300 rounded-md"
          @click="emit('cancel')"
        >
          {{ t("Anuluj") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTranslationStore } from "@/stores/translation";

const { t } = useTranslationStore();
const props = defineProps<{
  question: String;
}>();

const emit = defineEmits(["confirm", "cancel"]);
</script>