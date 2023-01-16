<template>
  <Section>
    <div class="products">
      <div class="flex gap-x-5 ml-6 my-2">
        <select-items
          v-if="store.products.length"
          :func="store.getProducts"
          clientPageName="products"
          serverPageName="products"
        />
        <button :class="[primaryButton]" @click="dialog(true, 'filters')">
          Filtruj
        </button>
      </div>
      <ul class="grid grid-cols-1 md:grid-cols-3 border-t-2">
        <li v-for="product in store.products" :key="product.id">
          <Product :product="product" />
        </li>
      </ul>
      <Paginate
        v-if="store.metas.meta.totalItems"
        :metas="store.metas"
        name="products"
        :getFunc="store.getProducts"
      />
    </div>
    <Filter
      clientParams="products"
      serverParams="products"
      :func="store.getProducts"
    />
  </Section>
</template>

<script lang="ts" setup>
import { useProductsStore } from "@/stores/products";
import Product from "./Product.vue";
import Section from "../commons/Section.vue";
import { useRoute, useRouter } from "vue-router";
import Paginate from "../pagination/Paginate.vue";
import config from "@/resusables/config";
import SelectItems from "@/components/commons/SelectItems.vue";
import { computed, watch } from "@vue/runtime-core";
import Filter from "@/components/commons/Filter/Filter.vue";
import { dialog } from "@/resusables/methods";
import { useAdminStore } from "@/stores/admin";
import { primaryButton } from "@/resusables/css-classes";
const store = useProductsStore();
const adminStore = useAdminStore();
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