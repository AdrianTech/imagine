<template>
  <div
    v-if="$route.meta.access"
    class="
      fade
      font-primary
      bg-slate-100
      h-screen
      absolute
      z-50
      inline-block
      transition-[width]
      duration-300
    "
    :class="store.navBar ? 'w-[250px]' : 'w-[80px]'"
  >
    <button
      @click="store.navBar = !store.navBar"
      class="
        absolute
        -right-11
        border-2
        py-2
        px-4
        rounded-sm
        bg-slate-600
        text-yellow-50
      "
    >
      {{ store.navBar ? "X" : ">>" }}
    </button>
    <nav
      class="flex flex-col w-full relative transition-opacity ml-2"
      :class="store.navBar ? 'opacity-100 delay-150' : 'opacity-0'"
    >
      <ul class="list-decimal my-10">
        <li class="my-4 text-lg">
          <router-link
            :to="{
              name: 'orders',
              query: { page: 1, limit: 5, sortBy: 'createdAt:DESC' },
            }"
            >Zamówienia</router-link
          >
        </li>
        <li class="my-4 text-lg">
          <router-link :to="{ name: 'adminProducts' }">Produkty</router-link>
        </li>
        <li class="my-4 text-lg"><a href="">Użytkownicy</a></li>
        <li class="my-4 text-lg"><a href="">Centrum analiz</a></li>
        <li class="my-4 text-lg">
          <button @click="$router.push({ name: 'home' })">Powrót</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { useAdminStore } from "@/stores/admin";
const store = useAdminStore();
</script>

<style lang="scss" scoped>
ul {
  list-style: upper-roman;
}
</style>