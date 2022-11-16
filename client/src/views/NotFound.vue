<template>
  <div class="p-8 bg-orange-100 mx-auto w-1/2 text-center mt-12">
    <h3 class="font-bold text-3xl">404</h3>
    <h4 class="text-xl">Nie znaleziono strony</h4>
    <button @click="push('/')" class="text-red-700 mt-4">Strona główna</button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const { push } = useRouter();
</script>
