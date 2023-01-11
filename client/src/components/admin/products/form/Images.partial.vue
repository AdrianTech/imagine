<template>
  <!-- <FormKit type="form"> -->
  <FormKit
    v-if="props.imagesHandle.addImages"
    type="file"
    name="files"
    label="Dodaj nowe zdjęcia"
    accept=".jpg,.jpeg,.png"
    multiple
  />
  <!-- </FormKit> -->
  <FormKit
    v-if="props.imagesHandle.deleteImages"
    :type="imageCheckbox"
    :images="props.product?.gallery"
    label="Usuń wybrane zdjęcia"
    name="removeImages"
    help="Usuń jedno lub wiele"
    validation="required"
    validation-visibility="live"
  />
</template>

<script lang="ts" setup>
import ImageCheckbox from "./ImageCheckbox.vue";
import { createInput } from "@formkit/vue";

const props = defineProps<{
  product?: Object;
  imagesHandle: Object;
}>();

const imageCheckbox = createInput(ImageCheckbox);
</script>

<style lang="scss" scoped>
</style>