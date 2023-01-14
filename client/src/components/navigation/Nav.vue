<template>
  <nav
    v-if="!$route.meta.access"
    class="
      font-primary
      border-gray-200
      px-4
      lg:px-6
      py-2.5
      dark:bg-gray-800
      absolute
      w-full
      top-0
      z-50
    "
  >
    <div
      class="
        flex flex-wrap
        justify-between
        items-center
        mx-auto
        max-w-screen-lx
      "
    >
      <a href="#" class="flex items-center">
        <!-- <img src="" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
        <span
          class="
            self-center
            text-xl
            font-semibold
            whitespace-nowrap
            dark:text-white
          "
          >Imagine</span
        >
      </a>
      <div class="flex items-center lg:order-2">
        <router-link
          v-if="store.isLogged"
          :to="{ name: 'profile' }"
          class="
            text-white
            bg-blue-700
            hover:bg-blue-800
            focus:ring-4 focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-4
            lg:px-5
            py-2
            lg:py-2.5
            mr-2
            dark:bg-blue-600 dark:hover:bg-blue-700
            focus:outline-none
            dark:focus:ring-blue-800
          "
          >{{ store.user.username }}</router-link
        >
        <button
          v-if="store.isLogged"
          :class="[darkBgButton]"
          @click="store.logout"
        >
          Logout
        </button>
        <button
          data-collapse-toggle="mobile-menu-2"
          type="button"
          @click="() => (mobileNav = !mobileNav)"
          class="
            inline-flex
            items-center
            p-2
            ml-1
            text-sm text-gray-500
            rounded-lg
            lg:hidden
            hover:bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-gray-200
            dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600
          "
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            class="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        :class="mobileNav ? visibleClass : 'hidden ' + visibleClass"
        id="mobile-menu-2"
      >
        <ul
          class="
            flex flex-col
            mt-4
            font-medium
            lg:flex-row lg:space-x-8 lg:mt-0
          "
        >
          <li>
            <router-link
              :to="{ name: 'home' }"
              class="
                block
                py-2
                pr-4
                pl-3
                text-white
                rounded
                bg-blue-700
                lg:bg-transparent lg:text-blue-700 lg:p-0
                dark:text-white
              "
              aria-current="page"
              >Home</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'about' }" :class="[achoreNav]"
              >O mnie</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                name: 'products',
                query: {
                  page: 1,
                  limit: 5,
                  sortBy: 'createdAt:DESC',
                },
              }"
              :class="[achoreNav]"
              >Obrazy</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'contact' }" :class="[achoreNav]"
              >Kontakt</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'cart' }" :class="[achoreNav]"
              >Koszyk ({{ cartStore.cart.length }})</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { achoreNav, darkBgButton } from "@/resusables/css-classes";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { ref } from "@vue/reactivity";

const store = useAuthStore();
const cartStore = useCartStore();

const mobileNav = ref(false);
const visibleClass =
  "justify-between items-center w-full lg:flex lg:w-auto lg:order-1";
</script>

<style lang="scss" scoped>
</style>