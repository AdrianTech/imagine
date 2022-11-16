<template>
  <Section>
    <div class="flex flex-col items-center w-full md:w-3/4 mx-auto mb-4">
      <h2 class="m-4 text-3xl">
        {{ data?.title }}
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 relative justify-center gap-3"
      >
        <ImageBox :images="data?.gallery" picSize="normal" />
        <div
          v-if="data?.isPromotion"
          class="
            price
            text-lg text-white
            absolute
            top-0
            bg-red-500
            w-[300px]
            text-center
          "
        >
          Promocja:
          <span class="font-bold text-xl">{{ data?.discount_price }}</span>
          zł
          <span class="text-sm ml-2 line-through">{{ data?.price }} zł</span>
        </div>
        <div
          v-else
          class="
            price
            text-lg text-black
            absolute
            top-0
            bg-zinc-300
            w-[300px]
            text-center
          "
        >
          Cena: <span class="font-bold">{{ data?.price }}</span> zł
        </div>
        <div class="details flex flex-col mt-6 sm:mt-0">
          <div class="px-2 mb-2 text-lg">
            Wymiary:
            <p class="item font-bold text-orange-600">
              {{ data?.dimension_x }} x {{ data?.dimension_y }}
            </p>
            cm
          </div>
          <div class="px-2 mb-2 text-lg">
            Rok:
            <p class="item font-bold text-orange-600">
              {{ data?.production_year }}
            </p>
          </div>
          <div class="test px-2 mb-2 text-lg">
            Technika:
            <p class="item font-bold text-orange-600">
              {{ data?.technique }}
            </p>
          </div>
          <div class="px-2 mb-2 text-lg">
            Styl:
            <p class="item font-bold text-orange-600">{{ data?.style }}</p>
          </div>
          <div class="px-2 mb-2 text-lg">
            Podłoże:
            <p class="item font-bold text-orange-600">{{ data?.base }}</p>
          </div>
          <div class="buy">
            <button
              @click="addToCart"
              :disabled="exist"
              class="
                py-1
                px-8
                mt-6
                text-lg
                font-bold
                text-gray-900
                border-2 border-green-800
                rounded-md
              "
            >
              {{ exist ? "Dodano do koszyka" : "Dodaj do koszyka" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="desc mt-12 text-center">
      <h5 class="text-center text-lg mb-3 font-semibold">Opis obrazu</h5>
      <p class="font-primary">
        {{ data?.description }}
      </p>
    </div>
    <!-- <pulse-loader
      class="absolute top-[50%] left-[50%] h-screen"
      :loading="event.loading"
      :color="'red'"
      :size="'80px'"
    ></pulse-loader> -->
  </Section>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { checkIfExist } from "@/resusables/methods";
// import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import ImageBox from "./ImageBox.vue";
import Section from "../commons/Section.vue";
import { ref } from "@vue/reactivity";
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();

export default {
  components: { ImageBox, Section },

  async setup() {
    const data = ref({});
    const exist = ref(false);

    const {
      params: { id },
    } = useRoute();

    const store = useProductsStore();

    data.value = await store.getSingleProduct(+id);
    exist.value = checkIfExist(cartStore.cart, +id);

    const addToCart = () => {
      cartStore.addToCart(data.value);
      exist.value = checkIfExist(cartStore.cart, +id);
    };

    return { data, event, cartStore, exist, addToCart };
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: inline-block;
}
.item::first-letter {
  text-transform: capitalize;
}
</style>