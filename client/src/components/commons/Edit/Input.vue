<template>
  <!-- <FormKit :type="createInput.type" /> -->
  {{ props.name }}
</template>

<script lang="ts" setup>
import { computed } from "@vue/runtime-core";

const props = defineProps<{
  input: any;
  name: any;
}>();

const inputs = computed(() => {
  return {
    $formkit: "",
    name: props.name,
    label: "",
    help: "",
    validation: "",
  };
  //   if (typeof props.input === "number")
  //     return { type: "number", inputType: "input" };
  //   else if (typeof props.input === "boolean")
  //     return { type: "checkbox", inputType: "input" };
  //   else if (typeof props.input === "string" && props.input.length > 100)
  //     return { type: "checkbox", inputType: "input" };
  //   else if (typeof props.input === "object")
  //     return { type: "file", inputType: "input" };
  //   else return { type: "text", inputType: "input" };
});
console.info(inputs.value);
</script>

<style lang="scss" scoped>
</style>