<template>
  <div class="w-full md:w-3/4 mx-auto">
    <FormKit type="form" @submit="submitData">
      <h2 class="ml-2 text-xl md:text-2xl mb-3 uppercase">
        {{
          action
            ? `Edytuj opcje dostawy: ${deliveryOption?.name}`
            : `Dodaj nową opcję`
        }}
      </h2>
      <FormKit
        type="text"
        label="Nazwa opcji"
        prefix-icon="text"
        :placeholder="deliveryOption?.name || ''"
        :validation="deleteRequiredInValidation('required|length:2,20')"
        name="name"
      />
      <FormKit
        type="number"
        label="Cena"
        prefix-icon="multiCurrency"
        :placeholder="deliveryOption?.price || ''"
        :validation="deleteRequiredInValidation('required|min:1')"
        step="0.01"
        name="price"
      />
      <FormKit
        type="select"
        label="Dostępność"
        prefix-icon="select"
        name="active"
        :validation="deleteRequiredInValidation('required|')"
        :options="[
          {
            label: 'Dostępność',
            value: '',
          },
          {
            label: 'Dostępny',
            value: 'true',
            attrs: { disabled: disableSelectOption(true) },
          },
          {
            label: 'Niedostępny',
            value: 'false',
            attrs: { disabled: disableSelectOption(false) },
          },
        ]"
      />
    </FormKit>
    <div
      class="
        fixed
        p-3
        bottom-0
        border-t-2
        bg-slate-100
        w-full
        left-0
        flex
        justify-center
        z-50
        items-center
      "
    >
      <ButtonBack
        :externalFunc="true"
        @click="props.settings.formHandle(false)"
      >
        Powrót
      </ButtonBack>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getSingleItem, handleSubmitData } from "@/resusables/methods";
import { useDeliveryStore } from "@/stores/delivery";
import ButtonBack from "@/resusables/wrappers/ButtonBack.vue";
import { useEventStore } from "@/stores/event";
const store = useDeliveryStore();
const event = useEventStore();

const props = defineProps<{
  settings: {
    formHandle: Function;
    action: boolean;
    deliveryID: number;
    path: string;
  };
}>();
const { deliveryID, action, path } = props?.settings;

const deliveryOption = await getSingleItem(
  deliveryID,
  `/admin/delivery${deliveryID}`,
  store.deliveryOptions
);

const disableSelectOption = (bool: boolean) => deliveryOption?.active === bool;

const deleteRequiredInValidation = (str: string): string => {
  if (action) return str.replace("required|", "");
  return str;
};

const submitData = (data: any) => {
  const form = handleSubmitData(data);
  if (!form) return;
  data.active && (data.active = data.active === "true");

  store.deliverAction(
    { path, method: action ? "patch" : "post", body: form },
    deliveryID
  );
};
</script>

<style lang="scss" scoped>
</style>