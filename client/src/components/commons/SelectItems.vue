<template>
  <form class="my-3">
    <select
      class="p-2 lg:text-lg border border-slate-500 rounded"
      v-model="selected"
      @change="changeLimit"
    >
      <option value="5">{{ t("Wyświetl") }} 5</option>
      <option value="1">{{ t("Wyświetl") }} 1</option>
      <option value="10">{{ t("Wyświetl") }} 10</option>
      <option value="20">{{ t("Wyświetl") }} 20</option>
      <option value="50">{{ t("Wyświetl") }} 50</option>
    </select>
  </form>
</template>

<script lang="ts" setup>
import config from "@/resusables/config";
import { useTranslationStore } from "@/stores/translation";
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
const { t } = useTranslationStore();

const router = useRouter();
const query = useRoute().query;
const selected = ref(query.limit || 5);

const props = defineProps({
  func: { type: Function, required: true },
  clientPageName: { type: String, required: true },
  serverPageName: { type: String, required: true },
});

const changeLimit = ({ target: { value } }: { target: { value: string } }) => {
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set("limit", value);
  const fullPath = `${config.nestApiPath}/${props.serverPageName}${newUrl.search}`;
  router.replace(`${props.clientPageName}${newUrl.search}`);
  props.func(
    { path: fullPath, method: "get", withCredentials: true },
    props.serverPageName
  );
};
</script>