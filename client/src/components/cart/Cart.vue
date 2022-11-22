<template>
  <div v-if="cartStore.cart.length" class="flex items-center">
    <p class="mr-2 flex-1">{{ title }}</p>
    <span class="font-bold">{{ isPromotion ? discount_price : price }} zł</span
    ><img
      :src="'http://localhost:3000/uploads/' + gallery[0]"
      alt=""
      class="mb-2"
    />
    <input
      class="ml-2 border p-2 w-[80px]"
      type="number"
      min="0"
      v-model="quantity"
      @change="quantityHandle"
    />
    <button class="ml-2" @click="cartStore.removeFromCart(id)">Usuń</button>
  </div>
</template>

<script lang="ts" setup>
import { IProduct } from "@/interfaces/product";
import { primaryButton } from "@/resusables/css-classes";
import { useCartStore } from "@/stores/cart";
import { PropType, ref } from "@vue/runtime-core";
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