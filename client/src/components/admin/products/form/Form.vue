<template>
  <div class="pb-24 sm:pb-10 px-2 w-full md:w-1/2 mx-auto">
    <h2 class="ml-2 text-xl md:text-2xl mb-3 uppercase">
      {{ action ? `Edytuj obraz: ${product?.title}` : `Dodaj nowy obraz` }}
    </h2>
    <FormKit type="form" @submit="submit" autocomplete="off" id="formID">
      <FormKit
        type="text"
        label="Nazwa obrazu"
        prefix-icon="text"
        name="title"
        :placeholder="product?.title || 'Nazwa obrazu'"
        :validation="deleteRequredInValidation('required|length:5,100')"
      />
      <FormKit
        type="number"
        label="Cena obrazu"
        name="price"
        prefix-icon="multiCurrency"
        step="0.01"
        :placeholder="product?.price || 'Cena obrazu'"
        :validation="deleteRequredInValidation('required|number|min:1')"
      />

      <FormKit
        type="textarea"
        label="Opis"
        prefix-icon="text"
        name="description"
        :placeholder="product?.description || 'Opis obrazu'"
        :validation="deleteRequredInValidation('required|length:10, 500')"
      />
      <FormKit
        type="number"
        label="Szerokość"
        prefix-icon="number"
        name="dimension_x"
        :placeholder="product?.dimension_x || 'Szerokość obrazu'"
        :validation="deleteRequredInValidation('required|number|min:1')"
      />
      <FormKit
        type="number"
        label="Długość"
        prefix-icon="number"
        name="dimension_y"
        :placeholder="product?.dimension_y || 'Długość obrazu'"
        :validation="deleteRequredInValidation('required|number|min:1')"
      />
      <FormKit
        type="text"
        label="Rok produkcji"
        prefix-icon="date"
        name="production_year"
        :placeholder="product?.production_year || 'Rok produkcji'"
        :validation="deleteRequredInValidation('required|')"
        min="1990"
      />
      <FormKit
        type="text"
        label="Technika malarska"
        prefix-icon="text"
        name="technique"
        :placeholder="product?.technique || 'Technika malarska'"
        :validation="deleteRequredInValidation('required|length: 3,100')"
      />
      <FormKit
        type="text"
        label="Styl malarski"
        prefix-icon="text"
        name="style"
        :placeholder="product?.style || 'Styl malarski'"
        :validation="deleteRequredInValidation('required|length: 3,100')"
      />
      <FormKit
        type="text"
        label="Podkład"
        prefix-icon="text"
        name="base"
        :placeholder="product?.base || 'Podkład (np. płótno, drewno)'"
        :validation="deleteRequredInValidation('required|length: 3,100')"
      />
      <FormKit
        type="select"
        label="Dostępność"
        prefix-icon="select"
        name="isAvailable"
        :validation="deleteRequredInValidation('required|')"
        :options="[
          {
            label: 'Wybierz, czy będzie dostępny',
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
      <FormKit
        v-if="!action"
        type="file"
        prefix-icon="fileImage"
        label="Zdjęcia obrazu"
        name="files"
        accept=".jpg,.jpeg,.png"
        multiple
      />
      <PromotionForm
        :deleteRequiredInValidation="deleteRequredInValidation"
        :product="product"
        v-if="addPromotion"
      />
      <Images v-if="action" :imagesHandle="imagesHandle" :product="product" />
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
      <button
        class="border border-blue-800 rounded-md px-5"
        @click="addPromotion = !addPromotion"
      >
        {{ addPromotion ? "Ukryj promocję" : "Dodaj promocję" }}
      </button>
      <button
        v-if="action"
        class="ml-2 border border-blue-800 rounded-md px-5"
        @click="showImagesEditor('addImages')"
      >
        {{
          imagesHandle.addImages ? "Nie dodawaj zdjęć" : "Dodaj kolejne zdjęcia"
        }}
      </button>
      <button
        v-if="action"
        class="ml-2 border border-blue-800 rounded-md px-5"
        @click="showImagesEditor('deleteImages')"
      >
        {{ imagesHandle.deleteImages ? "Nie usuwaj zdjęć" : "Usuń zdjęcia" }}
      </button>
      <button-back :externalFunc="true" @click="formHandle(false)">
        Powrót
      </button-back>
    </div>
  </div>
</template>

<script setup lang="ts">
import config from "@/resusables/config";
import { useAdminStore } from "@/stores/admin";
import { PropType, reactive, ref, toRefs } from "vue";
import ButtonBack from "@/resusables/wrappers/ButtonBack.vue";
import Images from "./Images.partial.vue";
import { useEventStore } from "@/stores/event";
import { IProduct } from "@/interfaces/product";
import { useAuthStore } from "@/stores/auth";
import PromotionForm from "./Promotion.partial.vue";
import { reset } from "@formkit/core";

const props = defineProps<{
  settings: {
    formHandle: Function;
    action: boolean;
    productID: number;
  };
}>();

const imagesHandle = reactive({
  addImages: false,
  deleteImages: false,
});

const { action, productID, formHandle } = toRefs(props.settings);

const store = useAdminStore();
const userStore = useAuthStore();
const eventStore = useEventStore();
const addPromotion = ref(false);

const getCurrentDate = () => new Date().toISOString().slice(0, 10);

const showImagesEditor = (name: "addImages" | "deleteImages") => {
  imagesHandle[name] = !imagesHandle[name];
};

const product: IProduct | undefined = store.products?.find(
  (elem: IProduct) => elem.id === productID.value
);

const disableSelectOption = (bool: boolean) => product?.isAvailable === bool;

const deleteRequredInValidation = (str: string): string => {
  if (action.value) return str.replace("required|", "");
  return str;
};

const submit = async (data: any) => {
  Object.keys(data).forEach((key) => {
    if (!data[key]) delete data[key];
  });

  if (!Object.keys(data).length)
    return eventStore.eventMessageHelper(
      "Wypełnił przynajmniej jedno pole",
      true
    );
  let body = data;

  const setCorrectPath = () => {
    if (action.value)
      return `${config.nestApiPath}/products/${productID.value}`;
    return `${config.nestApiPath}/admin/products`;
  };
  const methodChoice = action.value ? "patch" : "post";
  body = formDataHandle(data);

  const result = await store.createOrUpdate(
    {
      path: setCorrectPath(),
      method: methodChoice,
      withCredentials: true,
      body,
      headers: {
        "Content-Type": action.value
          ? "application/json"
          : "multipart/form-data",
      },
    },
    "products",
    action.value && productID.value
  );
  if (result) {
    reset("formID");
    eventStore.eventMessageHelper("Produkt został pomyślnie zaktualizowany");
  } else {
    eventStore.eventMessageHelper("Wystąpił błąd. Spróbuj ponownie", true);
  }
};

const formDataHandle = (body: any): FormData => {
  let files = body.files;
  delete body.files;
  const formData = new FormData();
  formData.append("userId", userStore.user?.id);
  for (let elem in body) {
    formData.append(elem, body[elem]);
  }
  for (let elem in files) {
    formData.append("files", files[elem].file);
  }
  return formData;
};
</script>