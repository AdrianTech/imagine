<template>
  <nav
    v-if="!$route.meta.access"
    class="
      border-b border-slate-300
      font-primary
      px-4
      lg:px-6
      py-2.5
      bg-gray-800
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
      <router-link :to="{ name: 'home' }">
        <span
          class="self-center text-xl font-semibold whitespace-nowrap text-white"
          >Imagine</span
        >
      </router-link>
      <div class="flex items-center lg:order-2">
        <router-link
          v-if="store.isLogged"
          :to="{ name: 'profile' }"
          class="
            text-white
            border border-cyan-700
            bg-slate-700
            font-medium
            rounded-lg
            text-sm
            px-3
            lg:px-5
            py-2
            mr-2
            focus:outline-none focus:ring-blue-800
          "
          ><i
            class="fa fa-user text-yellow-50 mr-1 text-[16px]"
            aria-hidden="true"
          ></i
          ><span class="text-[17px]">Profil</span></router-link
        >
        <button
          v-if="store.isLogged"
          :class="[darkBgButton]"
          @click="store.logout"
        >
          <i class="fa fa-sign-out" aria-hidden="true"></i>
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
            text-sm
            rounded-lg
            lg:hidden
            hover:bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-gray-200
            text-gray-400
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
              "
              aria-current="page"
              >Home</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'about' }" :class="[achoreNav]">{{
              t("O mnie")
            }}</router-link>
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
              >{{ t("Obrazy") }}</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'contact' }" :class="[achoreNav]">{{
              t("Kontakt")
            }}</router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'cart' }"
              class="border-b-0"
              :class="[achoreNav]"
              >{{ t("Koszyk") }} ({{ cartStore.cart.length }})</router-link
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
import { useTranslationStore } from "@/stores/translation";
import { ref } from "@vue/reactivity";
const { t } = useTranslationStore();

const store = useAuthStore();
const cartStore = useCartStore();

const mobileNav = ref(false);
const visibleClass =
  "justify-between items-center w-full lg:flex lg:w-auto lg:order-1";
</script>

<style lang="scss" scoped>
a {
  color: white;
}
</style>