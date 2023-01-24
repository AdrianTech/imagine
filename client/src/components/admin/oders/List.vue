<template>
  <ModalVue classname="details">
    <div class="" v-for="product in products" :key="product.id">
      <div class="px-4 py-2">
        <div class="">Tytuł obrazu: {{ product.title }}</div>
        <div class="">Cena: {{ product.price.toFixed(2) }} zł</div>
        <div class="">Sztuk: {{ product.quantity }}</div>
        <div class="">
          Razem: {{ (product.price * product.quantity).toFixed(2) }} zł
        </div>
        <div class="">
          {{ product.discount_price && product.discount_price.toFixed(2) }}
        </div>
      </div>
    </div>
    <button :class="[primaryButton]" @click="dialog(false, 'details')">
      Ok
    </button>
  </ModalVue>
</template>

<script lang="ts" setup>
import ModalVue from "../../commons/Modal.vue";
import { primaryButton } from "@/resusables/css-classes";
import { dialog } from "@/resusables/methods";

const { products } = defineProps<{
  products: Object[];
}>();
</script>