<template>
  <div class="my-2" :class="[setClassImageBox()]">
    <div :class="props.picSize" @click="() => showImg(1, props?.images[0])">
      <img :src="'http://localhost:3000/uploads/' + props?.images[0]" />
    </div>
    <div v-if="props.picSize === 'normal'" class="flex">
      <div
        class="miniatures image"
        v-for="(src, index) in store.removeFirstImage(props?.images)"
        :key="index"
        @click="() => showImg(index, src)"
      >
        <img :src="'http://localhost:3000/uploads/' + src" />
      </div>
    </div>
  </div>
  <vue-easy-lightbox
    :visible="visibleRef"
    :imgs="imgsRef"
    :index="indexRef"
    :loop="true"
    @hide="onHide"
  ></vue-easy-lightbox>
</template>

<script lang="ts" setup>
import VueEasyLightbox from "vue-easy-lightbox";
import { ref } from "@vue/reactivity";
import { PropType } from "@vue/runtime-core";
import { useProductsStore } from "@/stores/products";
const store = useProductsStore();

const props = defineProps({
  images: { type: Array as PropType<string[]>, required: true },
  picSize: String,
});

const visibleRef = ref(false);
const indexRef = ref(0);
const imgsRef = ref([]) as any;

const showImg = (index: number, src: string) => {
  imgsRef.value = `http://localhost:3000/uploads/${src}`;
  visibleRef.value = true;
};

const setClassImageBox = (): boolean | string =>
  props.picSize === "small" && "imageBox";

const onHide = () => (visibleRef.value = false);
</script>

<style lang="scss">
.small {
  width: 120px;
}
.normal {
  width: 300px;
}
.imageBox {
  height: 180px;
}
.image {
  img {
    height: 80px;
  }
}
</style>