<template>
  <div
    class="
      product
      px-2
      py-4
      relative
      flex flex-col
      items-center
      border-b-2 border-b-slate-300
      md:border-b-0
    "
  >
    <router-link
      class="text-lg"
      :to="{ name: 'productDetails', params: { id: props.product.id } }"
      >{{ props.product.title }}</router-link
    >
    <ImageBox :images="props.product.gallery" picSize="small" />
    <p
      class="text-red-800 text-sm font-bold uppercase pb-1"
      v-if="!props.product.isAvailable"
    >
      Niedostępny
    </p>
    <button @click="cartStore.addToCart(props.product)" v-if="!isInCart()">
      Dodaj do koszyka
    </button>
    <span class="text-green-700" v-else>Dodano do koszyka</span>
    <div class="price">
      <h5 v-if="props.product.isPromotion">
        Cena promocyjna:
        <span class="font-bold text-red-700"
          >{{ parseInt(props.product.discount_price).toFixed(2) }} zł</span
        >
      </h5>
      <h5 v-else>
        Cena:
        <span class="font-bold"
          >{{ parseInt(props.product.price).toFixed(2) }} zł</span
        >
      </h5>
    </div>
    <p class="text-[15px]">
      {{ props.product.description.slice(0, 30) }}...
      <button @click="pushToProductDetails" class="p-2 text-xs border-y-2">
        Pokaż więcej
      </button>
    </p>
  </div>
</template>

<script lang="ts" setup>
import ImageBox from "./ImageBox.vue";
import { useRoute, useRouter } from "vue-router";
import { PropType, watch } from "@vue/runtime-core";
import { IProduct } from "@/interfaces/product";
import { useCartStore } from "@/stores/cart";

const props = defineProps({
  product: { type: Object as PropType<IProduct>, required: true },
});
const { push } = useRouter();

const cartStore = useCartStore();

const isInCart = () =>
  cartStore.cart.find((product: IProduct) => props.product?.id === product.id);

const pushToProductDetails = () =>
  push({ name: "productDetails", params: { id: props.product.id } });
</script>

<style scoped>
.pic-size {
  width: 120px;
  height: 120px;
}
</style>