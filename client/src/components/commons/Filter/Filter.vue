<template>
  <Modal classname="filters">
    <FormKit
      type="form"
      @submit="setFilter"
      submit-label="Filtruj"
      class="text-center"
    >
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
      <button
        class="text-red-600 text-lg mb-4 ml-2"
        @click.prevent="dialog(false, 'filters')"
      >
        Anuluj
      </button>
    </FormKit>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from "@/components/commons/Modal.vue";
import config from "@/resusables/config";
import { dialog } from "@/resusables/methods";
import { reactive } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";

const props = defineProps<{
  clientParams: String;
  serverParams: String;
  func: Function;
}>();

const router = useRouter();
const query = useRoute().query;

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
  let queryBilder = `?page=${query.page}&limit=${query.limit}&sortBy=${query.sortBy}`;
  let range = false;

  if (data["rangePriceFrom"] && data["rangePriceTo"]) {
    range = true;
    queryBilder = `${queryBilder}&filter.price=$btw:${data["rangePriceFrom"]}, ${data["rangePriceTo"]}`;
  }

  if (!range && filterData["rangePriceFrom"]) {
    queryBilder = `${queryBilder}&filter.price=$gte:${filterData["rangePriceFrom"]}`;
  } else if (!range && filterData["rangePriceTo"]) {
    queryBilder = `${queryBilder}&filter.price=$lte:${filterData["rangePriceTo"]}`;
  }

  Object.keys(data).forEach((key: any) => {
    if (!data[key] || key === "rangePriceFrom" || key === "rangePriceTo")
      delete data[key];
  });

  Object.keys(data).forEach((key: any) => {
    queryBilder = `${queryBilder}&filter.${key}=$in:${data[key]}`;
  });

  const fullPath = `/${props.serverParams}${queryBilder}`;
  router.replace(`${props.clientParams}${queryBilder}`);
  await props.func(
    { path: fullPath, method: "get", withCredentials: true },
    "products"
  );
};
</script>

<style lang="scss" scoped>
</style>