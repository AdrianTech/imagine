<template>
  <div
    v-if="$route.meta.access"
    class="
      fade
      font-primary
      bg-sky-100
      border border-l-2 border-blue-300
      h-screen
      fixed
      z-50
      inline-block
      transition-[width]
      duration-300
    "
    :class="store.navBar ? 'w-[200px]' : 'w-[30px]'"
  >
    <button
      @click="store.navBar = !store.navBar"
      class="
        absolute
        -right-10
        border-2
        py-2
        px-3
        rounded-sm
        z-20
        bg-slate-600
        text-yellow-50
      "
    >
      <i
        :class="`fa fa-arrow-${store.navBar ? 'left' : 'right'}`"
        aria-hidden="true"
      ></i>
    </button>
    <nav
      class="flex flex-col w-full relative transition-opacity px-4"
      :class="store.navBar ? 'opacity-100 delay-150' : 'opacity-0'"
    >
      <h3 class="text-green-900 uppercase">Admin Panel 0.8.9</h3>
      <ul class="my-10 text-lg md:text-xl">
        <li class="my-4">
          <router-link
            :to="{
              name: 'orders',
              query: { page: 1, limit: 5, sortBy: 'createdAt:DESC' },
            }"
            >{{ t ? "Zamówienia" : "Orders" }}</router-link
          >
        </li>
        <li class="my-4">
          <router-link
            :to="{
              name: 'adminProducts',
              query: { page: 1, limit: 5, sortBy: 'createdAt:DESC' },
            }"
            >{{ t ? "Produkty" : "Products" }}</router-link
          >
        </li>
        <li class="my-4">
          <router-link
            :to="{
              name: 'adminUsers',
              query: { page: 1, limit: 5, sortBy: 'createdAt:DESC' },
            }"
            >{{ t ? "Użytkownicy" : "Users" }}</router-link
          >
        </li>
        <li class="my-4">
          <router-link :to="{ name: 'delivery' }">{{
            t ? "Opcje dostawy" : "Delivery options"
          }}</router-link>
        </li>
        <li class="my-4">
          <button @click="$router.push({ name: 'home' })">
            {{ t ? "Powrót" : "Back" }}
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { useAdminStore } from "@/stores/admin";
import { useTranslationStore } from "@/stores/translation";
const store = useAdminStore();
const { lang } = useTranslationStore();
const t = lang === "pl" ? true : false;
</script>