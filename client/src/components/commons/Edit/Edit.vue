<template>
  <div class="" v-for="(input, name, index) in arr" :key="index">
    { $formkit: 'text', name: "{{ input.name }}", label: "", help: "",
    validation: "" },
  </div>
  <!-- <FormKit type="form" @submit="submitHandler">
    <FormKit type="text" label="Name" name="name" />
    <FormKit type="range" label="Email" name="email" min="3" max="12" />
  </FormKit> -->
</template>

<script lang="ts" setup>
import { computed } from "@vue/runtime-core";
import Input from "./Input.vue";
// import Formkit from ''

const props = defineProps<{
  data: Object[];
}>();
const arr: Object[] = [];
for (let elem in props.data[0]) {
  if (
    elem !== "isPromotion" &&
    elem !== "id" &&
    elem !== "createdAt" &&
    elem !== "updatedAt"
  ) {
    arr.push({
      $formkit: "text",
      name: elem,
      label: "",
      help: "",
      validation: "",
    });
  }
}
console.log(arr);
</script>

<style lang="scss" scoped>
</style>