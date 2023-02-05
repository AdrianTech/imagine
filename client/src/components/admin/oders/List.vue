<template>
  <ModalVue classname="details">
    <div v-for="product in products" :key="product.id">
      <div class="px-4 py-2">
        <div>Tytuł obrazu: {{ product.title }}</div>
        <div>Cena: {{ product.price.toFixed(2) }} zł</div>
        <div>Sztuk: {{ product.quantity }}</div>
        <div>Razem: {{ (product.price * product.quantity).toFixed(2) }} zł</div>
        <div>
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