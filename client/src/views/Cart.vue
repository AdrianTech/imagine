<template>
  <Section>
    <ul v-if="store.cart.length" class="w-full sm:w-1/2 mx-auto text-center">
      <li class="cart" v-for="(product, index) in store.cart" :key="product.id">
        <Cart :product="product" :index="index" />
      </li>
      <div class="text-center my-3">
        Podsumowanie:
        <span class="font-bold text-xl">{{
          store.cartTotalSum.toFixed(2)
        }}</span>
        zł
      </div>
      <button @click="$router.push({ name: 'transaction' })">
        Dokończ zakup
      </button>
    </ul>
    <div
      v-else
      class="
        flex flex-col
        items-center
        mt-[100px]
        text-lg
        sm:text-2xl
        font-bold
      "
    >
      <h2 class="mb-4">Jeszcze niczego nie dodałeś do koszyka</h2>
      <router-link :class="[primaryButton]" :to="{ name: 'products' }"
        >Obejrzyj obrazy</router-link
      >
    </div>
  </Section>
</template>

<script lang="ts" setup>
import Cart from "@/components/cart/Cart.vue";
import Section from "@/components/commons/Section.vue";
import { primaryButton } from "@/resusables/css-classes";
import { useCartStore } from "@/stores/cart";

const store = useCartStore();
</script>

<style lang="scss" scoped>
</style>