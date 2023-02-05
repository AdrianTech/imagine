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
        <div class="details flex flex-col mt-6 sm:mt-0 ml-5">
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
          <button
            v-if="checkPermission()"
            class="text-left ml-2 text-amber-900 font-semibold"
            @click="dialog(true, 'moreDetails')"
          >
            Pokaż więcej szczegółów
          </button>
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
            <!-- <button @click="$router.back">Powrót do panelu admina</button> -->
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
    <MoreDetails :product="data" />
  </Section>
</template>

<script lang="ts">
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { checkIfExist, dialog, getSingleItem } from "@/resusables/methods";
import ImageBox from "./ImageBox.vue";
import Section from "../commons/Section.vue";
import { ref } from "@vue/reactivity";
import MoreDetails from "./MoreDetails.vue";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { onBeforeMount } from "@vue/runtime-core";
import { ROLES } from "@/resusables/enums";
import { useAdminStore } from "@/stores/admin";
const cartStore = useCartStore();
export default {
  components: { ImageBox, Section, MoreDetails },

  async setup() {
    const data = ref({});
    const exist = ref(false);
    const { user } = storeToRefs(useAuthStore());

    const {
      params: { id },
    } = useRoute();

    const checkPermission = (): boolean => {
      if (
        user.value?.role === ROLES.ADMIN ||
        user.value?.role === ROLES.MODERATOR
      )
        return true;
      return false;
    };

    const store = useProductsStore();
    const adminStore = useAdminStore();
    const setData: { storeData: object[]; path: string } = {
      path: `/products/${+id}`,
      storeData: store.products,
    };
    if (
      user.value?.role === ROLES.ADMIN ||
      user.value?.role === ROLES.MODERATOR
    ) {
      setData.path = `/admin/products/${+id}`;
      setData.storeData = adminStore.products;
    }
    data.value = await getSingleItem(+id, setData.path, setData.storeData);
    exist.value = checkIfExist(cartStore.cart, +id);

    const addToCart = () => {
      cartStore.addToCart(data.value);
      exist.value = checkIfExist(cartStore.cart, +id);
    };

    return {
      data,
      event,
      cartStore,
      exist,
      addToCart,
      user,
      dialog,
      checkPermission,
    };
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