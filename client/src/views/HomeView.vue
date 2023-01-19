<template>
  <div class="welcome flex justify-center items-center font-primary">
    <header
      class="
        relative
        flex flex-col
        md:flex-row
        bg-black bg-opacity-30
        p-3
        md:py-6 md:px-8
      "
    >
      <h1
        class="text-yellow-300 font-extrabold text-2xl mb-2 md:mb-0 md:text-4xl"
      >
        Victoria Picasso
      </h1>
      <div class="w-[4px] bg-red-700 mx-3"></div>
      <h3 class="text-yellow-300 font-extrabold text-xl md:text-3xl">
        {{ t("Malarstwo, Rysunek i Sztuka") }}
      </h3>
      <button
        class="
          py-2
          px-12
          text-2xl
          border-black
          bg-yellow-300 bg-opacity-50
          text-slate-200
          rounded-sm
          absolute
          -bottom-[70px]
          font-bold
          left-1/2
          tracking-wide
          uppercase
          -translate-x-3/4
        "
        @click="$router.push({ name: 'about' })"
      >
        Start
      </button>
    </header>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { useEventStore } from "@/stores/event";
import { useTranslationStore } from "@/stores/translation";
const { t } = useTranslationStore();
const store = useAuthStore();
const event = useEventStore();
</script>

<style lang="scss" scoped>
.welcome {
  background-image: url("https://cdn.pixabay.com/photo/2019/04/27/07/48/painting-4159435_1280.jpg");
  height: 100vh;
  background-position: center;
  background-size: cover;
}
</style>
