<template>
  <Section>
    <ul
      v-if="store.cart.length"
      class="w-full sm:w-1/2 mx-auto text-center mt-5"
    >
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
      <button
        class="disabled:bg-opacity-50"
        :class="[darkButton]"
        :disabled="!value"
        @click="$router.push({ name: 'transaction' })"
      >
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
import { darkButton, primaryButton } from "@/resusables/css-classes";
import { useCartStore } from "@/stores/cart";
import { ref, watch } from "@vue/runtime-core";

const store = useCartStore();

const calculate = (cart: any) => {
  return cart.reduce((acc: number, curr: object) => acc + curr?.quantity, 0);
};

const value = ref(calculate(store.cart));

watch(store.cart, (current) => {
  value.value = calculate(current);
});
</script>

<style lang="scss" scoped>
</style>