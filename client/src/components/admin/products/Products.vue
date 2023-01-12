<template>
  <div class="wrapper w-full md:w-3/4 mx-auto" v-if="!showForm">
    <select-items
      :func="store.getProducts"
      :clientPageName="'produkty'"
      :serverPageName="'products'"
    />
    <Table
      :data="store.products"
      :headers="['Autor', 'Cena zł', 'Promocja', 'Edycja', 'Usuń', 'Szczegóły']"
      :properties="['title', 'price', 'isPromotion']"
      :action="actionHandle"
    />
    <Paginate
      :metas="store.metas"
      :name="'products'"
      :getFunc="store.getProducts"
    />
    <button :class="primaryButton" @click="showForm = !showForm">
      <i class="fa-solid fa-circle-plus text-[18px] text-green-700 mr-2"></i>
      Dodaj produkt
    </button>
  </div>
  <Form :settings="settings" v-else :key="store.products" />
  <!-- <edit :data="store.products" /> -->
</template>

<script lang="ts" setup>
import config from "@/resusables/config";
import { useAdminStore } from "@/stores/admin";
import { useRoute, useRouter } from "vue-router";
import Table from "../../commons/Table.vue";
import SelectItems from "@/components/commons/SelectItems.vue";
import Paginate from "@/components/pagination/Paginate.vue";
import Form from "@/components/admin/products/form/Form.vue";
import { reactive, ref } from "@vue/reactivity";
import { primaryButton } from "@/resusables/css-classes";
import { Ref } from "vue";

const showForm: Ref<boolean> = ref<boolean>(false);

const router = useRouter();
const store = useAdminStore();
const settings = reactive({
  action: false,
  productID: null,
  formHandle: function (state?: boolean) {
    showForm.value = !showForm.value;
    state != null && (this.action = state);
    !state && (this.productID = null);
  },
});
const { page, limit, sortBy } = useRoute().query;

const query = `${config.nestApiPath}/products?page=${page}&limit=${limit}&sortBy=${sortBy}`;
await store.getProducts({ path: query, method: "get" });
// watch(store.products, (current) => {
//   settings.targetItem = current[0];
// });

const actionHandle = async (type: string, id: number): Promise<void> => {
  switch (type) {
    case "edit":
      settings.productID = id;
      settings.action = true;
      showForm.value = true;
      break;
    case "delete":
      await store.removeElement(
        {
          path: `${config.nestApiPath}/admin/products/${id}`,
          method: "delete",
          withCredentials: true,
        },
        id,
        "products"
      );
      break;
    default:
      router.push({ name: "productDetails", params: { id } });
  }
};
</script>

<style lang="scss" scoped>
</style>