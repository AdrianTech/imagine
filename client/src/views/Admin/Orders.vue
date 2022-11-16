<template>
  <AdminSection>
    <div class="w-full sm:w-3/4 pt-7 pl-3">
      <section-title>Tutaj znajdziesz zamówienia klientów</section-title>
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
        </li>
      </ul>
    </div>
  </AdminSection>
</template>

<script lang="ts" setup>
import AdminSection from "@/components/admin/AdminSection.vue";
import { primaryButton } from "@/resusables/css-classes";
import SectionTitle from "@/resusables/wrappers/SectionTitle.vue";
import { useAdminStore } from "@/stores/admin";
import { convertDate } from "@/resusables/methods";

const store = useAdminStore();
store.getOrders();
</script>

<style lang="scss" scoped>
</style>