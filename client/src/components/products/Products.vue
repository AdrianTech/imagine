<template>
  <Section>
    <div class="products">
      <form v-if="store.metas.meta.totalItems">
        <select @change="changeLimit">
          <option value="5">Wyświetla 5</option>
          <option value="1">Wyświetl 1</option>
          <option value="10">Wyświetl 10</option>
          <option value="20">Wyświetl 20</option>
          <option value="50">Wyświetl 50</option>
        </select>
      </form>
      <ul class="grid grid-cols-1 md:grid-cols-3">
        <li v-for="product in store.products" :key="product.id">
          <Product :product="product" />
        </li>
      </ul>
      <Paginate
        v-if="store.metas.meta.totalItems"
        :metas="store.metas"
        :name="'products'"
        :getFunc="store.getProducts"
      />
    </div>
  </Section>
</template>

<script lang="ts" setup>
import { useProductsStore } from "@/stores/products";
import Product from "./Product.vue";
import Section from "../commons/Section.vue";
import { useRoute, useRouter } from "vue-router";
import Paginate from "../pagination/Paginate.vue";
import config from "@/resusables/config";
const store = useProductsStore();
const { page, limit, sortBy } = useRoute().query;
if (!store.products.length && store.products.length !== +limit)
  store.getProducts({
    path: `${config.nestApiPath}/products?page=${page}&limit=${limit}&sortBy=${sortBy}`,
    method: "get",
  });
const router = useRouter();

const changeLimit = ({ target: { value } }: { target: { value: string } }) => {
  const link = `products?page=${page}&limit=${value}&sortBy=${sortBy}`;
  const fullPath = `${config.nestApiPath}/${link}`;
  router.replace(link);
  store.getProducts({ path: fullPath, method: "get" });
};
</script>

<style>
</style>