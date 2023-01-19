<template>
  <div
    v-if="cartStore.cart.length"
    class="
      flex
      items-center
      justify-center
      gap-x-2
      border-b border-slate-500
      pb-2
    "
  >
    <p class="mr-2 text-lg">{{ title }}</p>
    <span class="font-bold">{{ isPromotion ? discount_price : price }} zł</span
    ><img :src="`/uploads/` + gallery[0]" alt="" class="mb-2" />
    <input
      class="ml-2 border font-semibold p-1 w-[60px]"
      type="number"
      min="0"
      v-model="quantity"
      @change="quantityHandle"
    />
    <button
      class="ml-2 border bg-red-600 text-white px-3 py-1 rounded-sm"
      @click="cartStore.removeFromCart(id)"
    >
      Usuń
    </button>
  </div>
</template>

<script lang="ts" setup>
import { IProduct } from "@/interfaces/product";
import config from "@/resusables/config";
import { primaryButton } from "@/resusables/css-classes";
import { useCartStore } from "@/stores/cart";
import { PropType, ref } from "@vue/runtime-core";
import Section from "../commons/Section.vue";
const cartStore = useCartStore();

const props = defineProps({
  product: { type: Object as PropType<IProduct>, required: true },
  index: { type: Number, required: true },
});

const quantity = ref(props.product.quantity);

const { title, isPromotion, discount_price, price, gallery, id } =
  props.product;

function quantityHandle(): void {
  cartStore.updateCart(quantity.value, props.index);
}
</script>

<style lang="scss" scoped>
img {
  width: 60px;
}
span {
  margin-right: 10px;
}
</style>