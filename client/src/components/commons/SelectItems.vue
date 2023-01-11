<template>
  <form class="my-3">
    <select class="p-2" v-model="selected" @change="changeLimit">
      <option value="5">Wyświetla 5</option>
      <option value="1">Wyświetl 1</option>
      <option value="10">Wyświetl 10</option>
      <option value="20">Wyświetl 20</option>
      <option value="50">Wyświetl 50</option>
    </select>
  </form>
</template>

<script lang="ts" setup>
import config from "@/resusables/config";
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const query = useRoute().query;
const selected = ref(query.limit || 5);

const props = defineProps({
  func: { type: Function, required: true },
  clientPageName: { type: String, required: true },
  serverPageName: { type: String, required: true },
});

const changeLimit = ({ target: { value } }: { target: { value: string } }) => {
  const link = `?page=${query.page}&limit=${value}&sortBy=${query.sortBy}`;
  const fullPath = `${config.nestApiPath}/${props.serverPageName}${link}`;
  router.replace(`${props.clientPageName}${link}`);
  props.func({ path: fullPath, method: "get", withCredentials: true });
};
</script>

<style>
</style>