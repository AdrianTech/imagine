<template>
  <Section>
    <div class="products">
      <div class="flex gap-x-5 ml-6 my-2">
        <select-items
          v-if="products.length"
          :func="store.getProducts"
          clientPageName="products"
          serverPageName="products"
        />
        <button :class="[primaryButton]" @click="dialog(true, 'filters')">
          Filtruj
        </button>
      </div>
      <ul
        class="grid grid-cols-1 md:grid-cols-3 border-t-2"
        v-if="products.length"
      >
        <li v-for="product in products" :key="product.id">
          <Product :product="product" />
        </li>
      </ul>
      <h4 class="text-center font-bold text-xl" v-else>
        Nie znaleziono produktów
      </h4>
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
import SelectItems from "@/components/commons/SelectItems.vue";
import Filter from "@/components/commons/Filter/Filter.vue";
import { dialog } from "@/resusables/methods";
import { useAdminStore } from "@/stores/admin";
import { primaryButton } from "@/resusables/css-classes";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { ROLES } from "@/resusables/enums";
const store = useProductsStore();
const adminStore = useAdminStore();
const { page, limit, sortBy } = useRoute().query;

const { products } = storeToRefs(store);
const { user } = storeToRefs(useAuthStore());

if (!products.value.length) {
  store.getProducts({
    path: `/products?page=${page}&limit=${limit}&sortBy=${sortBy}`,
    method: "get",
  });
}
</script>