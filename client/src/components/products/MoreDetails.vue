<template>
  <Modal classname="moreDetails">
    <div class="flex flex-col">
      <div class="px-2 mb-2 text-lg">
        Utworzony:
        <p class="item font-bold text-orange-600">
          {{ convertDate(props.product?.createdAt) }}
        </p>
        Przez:
        <p class="item font-bold text-orange-600">
          {{ props.product?.user?.username }}
        </p>
      </div>
      <div class="px-2 mb-2 text-lg">
        Zaktualizowany:
        <p class="item font-bold text-orange-600">
          {{ convertDate(props.product?.updatedAt) }}
        </p>
      </div>
      <div v-if="props?.product.isPromotion">
        <div class="px-2 mb-2 text-lg">
          Początek promocji:
          <p class="item font-bold text-orange-600">
            {{ convertDate(props.product?.discount_start) }}
          </p>
        </div>
        <div class="px-2 mb-2 text-lg">
          Początek promocji:
          <p class="item font-bold text-orange-600">
            {{ convertDate(props.product?.discount_end) }}
          </p>
        </div>
      </div>

      <button class="" @click="dialog(false, 'moreDetails')">Zamknij</button>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from "@/components/commons/Modal.vue";
import { IProduct } from "@/interfaces/product";
import { convertDate, dialog } from "@/resusables/methods";
import * as translations from "@/translations";

const props = defineProps<{
  product: IProduct;
}>();
</script>

<style lang="scss" scoped>
</style>