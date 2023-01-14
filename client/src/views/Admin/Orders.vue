<template>
  <AdminSection>
    <div class="w-full sm:w-3/4 pt-7 pl-3">
      <section-title>Tutaj znajdziesz zamówienia klientów</section-title>
      <select-items
        :func="store.getOrders"
        clientPageName="zamowienia"
        serverPageName="orders"
      />
      <ul class="divide-y divide-gray-300">
        <li
          class="p-2 flex flex-col sm:flex-row items-center odd:bg-sky-100"
          v-for="order in store.orders"
          :key="order.id"
        >
          <router-link
            :class="[primaryButton]"
            :to="{ name: 'orderDetails', params: { id: order.id } }"
            >Szczegóły</router-link
          >
          <p class="flex-1 text-center pl-2">
            Data:
            <span class="font-bold text-lg">{{
              convertDate(order.createdAt, "pl-PL")
            }}</span>
          </p>
          <p class="flex-1 text-base pl-2">
            Wartość:
            <span class="font-bold text-lg">{{
              order.totalPrice.toFixed(2)
            }}</span>
            zł
          </p>
          <span
            class="text-green-800 font-bold border-2 border-green-700 p-2"
            v-if="order.finalized"
          >
            Sfinalizowana
          </span>
        </li>
      </ul>
      <paginate
        v-if="store.metas.meta?.totalItems"
        :metas="store.metas"
        name="orders"
        :getFunc="store.getOrders"
      />
    </div>
  </AdminSection>
</template>

<script lang="ts" setup>
import AdminSection from "@/components/admin/AdminSection.vue";
import { primaryButton } from "@/resusables/css-classes";
import SectionTitle from "@/resusables/wrappers/SectionTitle.vue";
import Paginate from "@/components/pagination/Paginate.vue";
import { useAdminStore } from "@/stores/admin";
import { convertDate } from "@/resusables/methods";
import config from "@/resusables/config";
import SelectItems from "@/components/commons/SelectItems.vue";
import { useRoute } from "vue-router";

const store = useAdminStore();
const query = useRoute().query;

store.getOrders({
  path: `${config.nestApiPath}/orders?page=${query.page}&limit=${query.limit}&sortBy=${query.sortBy}`,
  method: "get",
  withCredentials: true,
});
</script>

<style lang="scss" scoped>
</style>