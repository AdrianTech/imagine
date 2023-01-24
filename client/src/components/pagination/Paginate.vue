<template>
  <div
    v-if="props.metas.meta?.totalPages > 1"
    class="
      px-0
      sm:px-4
      py-2
      border-y-2 border-gray-200
      w-full
      lg:w-1/2
      mx-auto
      mt-3
      text-center
    "
  >
    <button @click="firstPage"><i class="fa-solid fa-backward"></i></button>
    <button class="font-bold text-xl" @click="nextPage">
      <i class="fa-solid fa-arrow-right"></i>
    </button>
    <span class="md:mx-2 text-lg"
      >Strona: {{ props.metas.meta?.currentPage }} z
      {{ props.metas.meta?.totalPages }}</span
    >
    <button class="font-bold text-xl" @click="previousPage">
      <i class="fa-solid fa-arrow-left"></i>
    </button>
    <button @click="lastPage">
      <i class="fa-solid fa-forward"></i>
    </button>
  </div>
</template>

<script lang="ts" setup>
import config from "@/resusables/config";
import { useRouter } from "vue-router";

const props = defineProps({
  metas: { type: Object, required: true },
  name: { type: String, required: true },
  getFunc: { type: Function, required: true },
});
const router = useRouter();
const setPath =
  config.nestApiPath === "http://localhost:3000"
    ? "http://localhost:3000"
    : "http://sanden.usermd.net";

const firstPage = () => {
  pageHandler(props.metas.links.first);
};

const nextPage = () => {
  pageHandler(props.metas.links.next);
};

const previousPage = () => {
  pageHandler(props.metas.links.previous);
};

const lastPage = () => {
  pageHandler(props.metas.links.last);
};

const pageHandler = (targetLink: string) => {
  if (!targetLink) return;
  const getParams: string = targetLink?.replace(`${setPath}/${props.name}`, "");

  props.getFunc(
    {
      path: `/${props.name}${getParams}`,
      method: "get",
      withCredentials: true,
    },
    props.name
  );
  router.push(getParams);
};
</script>

<style lang="scss" scoped>
button {
  margin: 2px 4px;
  border: 2px solid #080172;
  border-radius: 7px;
  padding: 5px 12px;
  outline: none;
}
</style>