<template>
  <admin-section>
    <div class="w-full sm:w-10/12">
      <section-title>
        Zamówienie od
        {{ order?.name }} {{ order?.surname }}
      </section-title>
      <div class="detail grid grid-cols-1 sm:grid-cols-3">
        <div class="item">
          <h5>Dane adresowe:</h5>
          <ul class="text-sm text-start divide-y-2 divide-dotted">
            <li class="flex justify-between items-center text-sm">
              <p class="font-smaller">Imię i nazwisko:</p>
              <span class="ml-6">{{ fullname }}</span>
            </li>
            <li class="flex justify-between items-center">
              <p class="font-smaller">Kod pocztowy:</p>
              <span class="ml-6">{{ order?.zipcode }}</span>
            </li>
            <li class="flex justify-between items-center">
              <p class="font-smaller">Miasto:</p>
              <span class="ml-6">{{ order?.city }}</span>
            </li>
            <li class="flex justify-between items-center">
              <p class="font-smaller">Ulica i nr domu:</p>
              <span class="ml-6">{{ order?.address }}</span>
            </li>
            <li class="flex justify-between items-center">
              <p class="font-smaller">Województwo:</p>
              <span class="ml-6">{{ order?.voivodeship }}</span>
            </li>
          </ul>
        </div>
        <div class="item">
          <h5>Wartość zamówienia / sztuk:</h5>
          <p class="mt-5 font-bold">
            {{ order.totalPrice?.toFixed(2) }} zł | {{ order?.totalItems }}
          </p>
        </div>
        <div class="item">
          <h5>Data zamówienia</h5>
          <p class="mt-5 font-bold">
            {{ convertDate(order?.createdAt, "de-De") }}
          </p>
        </div>
        <div class="item">
          <h5>Email klienta:</h5>
          <p class="mt-5 font-bold">
            <a :href="`mailto:${order?.email}`">{{ order?.email }}</a>
          </p>
        </div>
        <div class="item">
          <h5>Numer telefonu:</h5>
          <p class="mt-5 font-bold">
            <a :href="`tel:+${order?.phone}`">{{ order?.phone }}</a>
          </p>
        </div>
        <div class="item">
          <h5>Opcja dostawy</h5>
          <p class="mt-5 font-bold">{{ order?.deliveryOption }}</p>
        </div>
        <div class="item"></div>
      </div>
      <div class="flex gap-2">
        <button :class="[primaryButton]" @click="dialog(true, 'details')">
          Pokaż szczegóły zamówienia
        </button>
        <products :products="order?.productsList" />
        <button :class="[primaryButton]" @click="updateOrderStatus">
          Zmień status zamówienia na
          <span class="font-bold">{{
            order?.finalized ? "Otwarty" : "Zamknięty"
          }}</span>
        </button>
        <button-back>Powrót</button-back>
      </div>
    </div>
  </admin-section>
</template>

<script lang="ts" setup>
import { getSingleItem } from "@/resusables/methods";
import { useAdminStore } from "@/stores/admin";
import AdminSection from "@/components/admin/AdminSection.vue";
import SectionTitle from "@/resusables/wrappers/SectionTitle.vue";
import ButtonBack from "@/resusables/wrappers/ButtonBack.vue";
import Products from "./List.vue";
import { useRoute } from "vue-router";
import { computed, ref } from "@vue/runtime-core";
import { convertDate } from "@/resusables/methods";
import { primaryButton } from "@/resusables/css-classes";
import { dialog } from "@/resusables/methods";
import config from "@/resusables/config";
const store = useAdminStore();
const details = ref(false);
const order = ref({});

const id = useRoute().params.id as string;

order.value = (await getSingleItem(
  id,
  `/orders/${id}`,
  store.orders
)) as object;

const fullname = computed(() => `${order.value.name} ${order.value.surname}`);

const updateOrderStatus = async () => {
  const result = await store.createOrUpdate(
    {
      path: `/orders/${id}`,
      method: "patch",
      body: { finalized: !order.value.finalized },
      withCredentials: true,
    },
    "orders",
    id
  );
  if (result)
    order.value = (await getSingleItem(
      id,
      `/orders/${id}`,
      store.orders
    )) as object;
};
</script>

<style lang="scss" scoped>
.item {
  text-align: center;
  padding: 12px 8px;
  h5 {
    background-color: burlywood;
  }
  p {
    padding: 6px;
    font-size: 18px;
  }
  .font-smaller {
    font-size: 14px;
  }
}
</style>