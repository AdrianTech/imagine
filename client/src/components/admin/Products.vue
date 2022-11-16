<template>
  <div class="mt-100">
    <div class="" v-for="product in store.products" :key="product.id">
      <router-link
        :to="{ name: 'productDetails', params: { id: product.id } }"
        >{{ product.title }}</router-link
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import config from "@/resusables/config";
import { useAdminStore } from "@/stores/admin";
import { ref } from "@vue/reactivity";
const store = useAdminStore();
const query = `${config.nestApiPath}/products?page=1&limit=5&sortBy=createdAt:DESC`;
await store.getProducts(query);
</script>

<style lang="scss" scoped>
</style>