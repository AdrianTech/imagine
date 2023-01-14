<template>
  <FormKit
    type="number"
    :label="`Ustaw cenę promocyjną. ${regularPrice}`"
    name="discount_price"
    prefix-icon="multiCurrency"
    step="0.01"
    :validation="props.deleteRequiredInValidation('required|number|min:1')"
    :placeholder="props?.product?.discount_price || 'Cena promocyjna obrazu'"
  />
  <FormKit
    type="datetime-local"
    label="Data początkowa promocji"
    prefix-icon="datetime"
    name="discount_start"
    :validation="props.deleteRequiredInValidation('required|date')"
    :placeholder="
      props?.product?.discount_start || 'Podaj datę początkową promocji'
    "
    :min="getCurrentDate()"
  />
  <FormKit
    type="date"
    label="Data końcową promocji"
    name="discount_end"
    prefix-icon="date"
    :validation="props.deleteRequiredInValidation('required|date')"
    :placeholder="props?.product?.discount_end || 'Podaj datę końcową promocji'"
    :min="getCurrentDate()"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  product?: Object;
  deleteRequiredInValidation: Function;
}>();

const getCurrentDate = () => new Date().toISOString().slice(0, 10);

const regularPrice: string = props.product
  ? ` Cena regularna ${props.product.price} zł`
  : "";
</script>

<style lang="scss" scoped>
</style>