<template>
  <footer
    v-if="!$route.meta.access"
    class="
      footer
      w-full
      bg-gray-800
      py-3
      text-center
      fixed
      bottom-0
      border-t border-slate-400
    "
  >
    <p class="text-white text-lg">Created by Adriantech.eu</p>
    <button
      v-if="checkPermissions()"
      class="
        absolute
        text-white
        border
        rounded
        px-4
        py-1
        hover:bg-white hover:text-red-600
        transition
        ease-in-out
        duration-400
      "
    >
      <router-link
        :to="{
          name: 'admin',
          query: {
            page: 1,
            limit: 5,
            sortBy: 'createdAt:DESC',
          },
        }"
        ><i class="fa fa-cog text-xl" aria-hidden="true"></i
      ></router-link>
    </button>
  </footer>
</template>

<script lang="ts" setup>
import { ROLES } from "@/resusables/enums";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();
const checkPermissions = () =>
  store.user?.role === ROLES.ADMIN || store.user?.role === ROLES.MODERATOR
    ? true
    : false;
</script>

<style lang="scss" scooped>
.footer {
  font-family: "Ubuntu", sans-serif;
  button {
    position: absolute;
    right: 2%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>