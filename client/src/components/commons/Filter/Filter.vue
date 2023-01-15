<template>
  <Modal classname="filters">
    <FormKit type="form" @submit="setFilter" submit-label="Filtruj">
      <FormKit
        type="text"
        name="production_year"
        label="Rok produkcji"
        v-model="filterData.production_year"
      />
      <FormKit
        type="text"
        name="technique"
        label="Technika"
        v-model="filterData.technique"
      />
      <FormKit
        type="text"
        name="base"
        label="Podkład"
        v-model="filterData.base"
      />
      <FormKit
        type="text"
        name="title"
        label="Tytuł"
        v-model="filterData.title"
      />
      <FormKit
        type="select"
        label="Czy dostępny"
        name="isAvailable"
        :options="[
          { label: 'Wybierz Dostępność', value: '' },
          { label: 'Dostępny', value: 'true' },
          { label: 'Niedostępny', value: 'false' },
        ]"
      />
      <FormKit
        v-model="filterData.rangePriceFrom"
        type="range"
        :label="`Cena od: ${filterData.rangePriceFrom}`"
        min="0"
        max="20000"
        step="0.01"
        name="rangePriceFrom"
        help="Select your volume level."
      />
      <FormKit
        v-model="filterData.rangePriceTo"
        type="range"
        :label="`Cena do: ${filterData.rangePriceTo}`"
        :min="filterData.rangePriceFrom"
        step="0.01"
        max="20000"
        name="rangePriceTo"
        help="Select your volume level."
      />
    </FormKit>
    <button @click="dialog(false, 'filters')">Anuluj</button>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from "@/components/commons/Modal.vue";
import config from "@/resusables/config";
import { dialog } from "@/resusables/methods";
import { useAdminStore } from "@/stores/admin";
import { reactive } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
// import { filterProductScheme } from "@/components/commons/Forms/Schemes";

const router = useRouter();
const query = useRoute().query;
const store = useAdminStore();

const filterData = reactive({
  rangePriceFrom: 0,
  rangePriceTo: 0,
  production_year: "",
  technique: "",
  base: "",
  title: "",
  isAvailable: "",
});

const setFilter = async (data: any) => {
  let link = `?page=${query.page}&limit=${query.limit}&sortBy=${query.sortBy}`;
  let range = false;

  if (data["rangePriceFrom"] && data["rangePriceTo"]) {
    range = true;
    link = `${link}&filter.price=$btw:${data["rangePriceFrom"]}, ${data["rangePriceTo"]}`;
  }

  if (!range && filterData["rangePriceFrom"]) {
    link = `${link}&filter.price=$gte:${filterData["rangePriceFrom"]}`;
  } else if (!range && filterData["rangePriceTo"]) {
    link = `${link}&filter.price=$lte:${filterData["rangePriceTo"]}`;
  }

  Object.keys(data).forEach((key: any) => {
    if (!data[key] || key === "rangePriceFrom" || key === "rangePriceTo")
      delete data[key];
  });

  Object.keys(data).forEach((key: any) => {
    link = `${link}&filter.${key}=$in:${data[key]}`;
  });

  const fullPath = `${config.nestApiPath}/admin/products${link}`;
  router.replace(`produkty${link}`);
  await store.getAll(
    { path: fullPath, method: "get", withCredentials: true },
    "products"
  );
};
</script>

<style lang="scss" scoped>
</style>