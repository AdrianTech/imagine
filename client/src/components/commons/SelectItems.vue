<template>
  <form>
    <select @change="changeLimit">
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
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  func: { type: Function, required: true },
  clientPageName: { type: String, required: true },
  serverPageName: { type: String, required: true },
});
const query = useRoute().query;

const changeLimit = ({ target: { value } }: { target: { value: string } }) => {
  const link = `?page=${query.page}&limit=${value}&sortBy=${query.sortBy}`;
  const fullPath = `${config.nestApiPath}/${props.serverPageName}${link}`;
  router.replace(`${props.clientPageName}${link}`);
  props.func({ path: fullPath, method: "get", withCredentials: true });
};
</script>

<style>
</style>