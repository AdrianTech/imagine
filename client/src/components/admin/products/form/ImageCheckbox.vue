<script setup lang="ts">
import ImageBox from "@/components/products/ImageBox.vue";
import config from "@/resusables/config";
const props = defineProps({
  context: Object,
  images: Array,
});

const images: string[] = props.context.attrs.images;

function handleInput() {
  const checkboxes = document.querySelectorAll(".input-checkbox");
  const imgs = document.querySelectorAll("img");
  const values: string[] = [...checkboxes]
    .filter((el: any) => el.checked && el.value)
    .map((x: any) => x.value);

  props.context.node.input(values);
}
</script>
<style lang="scss" scoped>
img {
  width: 60px;
}
input[type="checkbox"] {
  appearance: none;
  border: 1px solid black;
  height: 18px;
  width: 100%;
  // border-radius: 50%;
  vertical-align: bottom;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
input[type="checkbox"]:checked:after {
  content: "";
  background-color: red;
  height: 100%;
  width: 100%;
}
</style>

<template>
  <div class="m-2" v-for="image in images" :key="image">
    <input
      class="input-checkbox"
      type="checkbox"
      @change="handleInput"
      :value="image"
    />
    <img
      class="pt-1"
      :src="`${config.nestApiPath}/uploads/${image}`"
      alt="Zdjęcie do usunięcia"
    />
  </div>
</template>