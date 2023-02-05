<template>
  <div class="w-full lg:w-3/4 mx-auto" v-if="!showForm">
    <Table
      :data="deliveryOptions"
      :headers="['Nazwa', 'Cena', 'Aktywna', 'Edycja', 'Usuń', 'Szczegóły']"
      :properties="['name', 'price', 'active']"
      :action="actionHandle"
    />
    <button
      :class="primaryButton"
      @click="showForm = !showForm"
      class="text-[18px]"
    >
      <i class="fa-solid fa-circle-plus text-[18px] text-green-700 mr-2"></i>
      Dodaj opcję dostawy
    </button>
  </div>
  <Form v-else :settings="settings" :key="deliveryOptions" />
  <Details
    :deliver="settings.details"
    v-if="settings.showDetails"
    @click="settings.showDetails = false"
  />
</template>

<script lang="ts" setup>
import { useDeliveryStore } from "@/stores/delivery";
import { storeToRefs } from "pinia";
import Table from "../../commons/Table.vue";
import Form from "./Form.vue";
import { primaryButton } from "@/resusables/css-classes";
import { reactive, Ref, ref } from "@vue/reactivity";
import Details from "./Details.vue";

const store = useDeliveryStore();
const showForm: Ref<boolean> = ref(false);
const { deliveryOptions } = storeToRefs(store);

const settings = reactive({
  action: false,
  deliveryID: null,
  showDetails: false,
  details: {},
  path: "/admin/delivery",
  formHandle: function (state?: boolean) {
    showForm.value = !showForm.value;
    this.action = false;
    this.path = "/admin/delivery/private";
    this.deliveryID = null;
  },
});

store.getAllDelivers({
  path: `/admin/delivery`,
  method: "get",
});

const actionHandle = async (type: string, id: number): Promise<void> => {
  switch (type) {
    case "edit":
      settings.deliveryID = id;
      settings.action = true;
      showForm.value = true;
      settings.path = `/admin/delivery/${id}`;
      break;
    case "delete":
      await store.deliverAction(
        {
          path: `/admin/delivery/${id}`,
          method: "delete",
          withCredentials: true,
        },
        id
      );
      break;
    default:
      settings.details = deliveryOptions.value.find(
        (elem: any) => id === elem.id
      );
      settings.showDetails = true;
  }
};
</script>