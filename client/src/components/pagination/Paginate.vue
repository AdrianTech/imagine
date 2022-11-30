<template>
  <div
    class="
      px-0
      sm:px-4
      py-2
      border-y-2 border-gray-200
      w-full
      sm:w-1/2
      mx-auto
      mt-3
      text-center
    "
  >
    <button @click="firstPage">Pierwsza</button>
    <button class="font-bold text-xl" @click="nextPage">&gt;</button>
    <span
      >Strona: {{ props.metas.meta.currentPage }} z
      {{ props.metas.meta.totalPages }}</span
    >
    <button class="font-bold text-xl" @click="previousPage">&lt;</button>
    <button @click="lastPage">Ostatnia</button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const props = defineProps({
  metas: { type: Object, required: true },
  name: { type: String, required: true },
  getFunc: { type: Function, required: true },
});
const router = useRouter();
// const curr = (currentPage + 1).toString();
// const test = next?.search(/[?]/);
// const query  = next?.slice(test)

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
  const changePath = targetLink?.replace(
    `http://localhost:3000/${props.name}`,
    ""
  );
  props.getFunc({ path: targetLink, method: "get", withCredentials: true });
  router.push(changePath);
};
</script>

<style lang="scss" scoped>
button {
  margin: 5px 8px;
  border: 2px solid #080172;
  border-radius: 7px;
  padding: 5px 12px;
  outline: none;
}
</style>