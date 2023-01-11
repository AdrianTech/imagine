<template>
  <div class="" :key="updated">
    <FormKit type="form" @submit="submitHandler">
      <FormKitSchema :schema="formScheme" />
    </FormKit>
  </div>
</template>

<script lang="ts" setup>
import { IProduct } from "@/interfaces/product";
import config from "@/resusables/config";
import { getSingleItem } from "@/resusables/methods";
import { useAuthStore } from "@/stores/auth";
import { FormKitSchema } from "@formkit/vue";
import {
  computed,
  onMounted,
  onUpdated,
  PropType,
  ref,
  watch,
} from "@vue/runtime-core";
import { getNode } from "@formkit/core";
import { useAdminStore } from "@/stores/admin";
const store = useAuthStore();
const updated = ref(1);
const props = defineProps<{
  func: Function;
  settings: {
    targetItem: Object;
    method: String;
    path: String;
    id: Number | String;
    scheme: Object;
  };
}>();

const { path, method, dataName, scheme, id }: any = props.settings;
let formScheme = scheme;
let targetItem = props.settings.targetItem;

const returnState = () => {
  if (method === "patch" || method === "put") return true;
  return false;
};

if (returnState()) mutateScheme();

const submitHandler = async (data: any) => {
  Object.keys(data).forEach((key) => {
    if (!data[key]) delete data[key];
  });

  let body = data;

  if (!returnState() && dataName === "products") {
    body = formDataHandle(body);
  }
  // const result: boolean = await props.func(
  //   {
  //     path,
  //     method,
  //     body,
  //     headers: {
  //       "Content-Type": returnState()
  //         ? "application/json"
  //         : "multipart/form-data",
  //     },
  //     withCredentials: true,
  //   },
  //   dataName,
  //   id
  // );

  if (result) {
    updated.value++;
  }
};

onUpdated(() => {
  targetItem = computed(() => props.settings.targetItem).value;
  mutateScheme();
});
const formDataHandle = (body: any): FormData => {
  let files = body.files;
  delete body.files;
  const formData = new FormData();
  for (let elem in body) {
    formData.append(elem, body[elem]);
  }
  for (let elem in files) {
    formData.append("files", files[elem].file);
  }
  formData.append("userId", store.user?.id);

  return formData;
};

function mutateScheme() {
  const keys = Object.keys(scheme);
  keys.forEach((item: any) => {
    scheme[item].validation = scheme[item].validation.replace("required|", "");
    scheme[item].placeholder = targetItem[scheme[item]?.name];
    // console.log(targetItem[scheme[item].name]);
    if (scheme[item].$formkit === "file") scheme[item].$formkit = "hidden";
    if (scheme[item].$formkit === "checkbox")
      scheme[item].checked = targetItem[scheme[item].name];
    // scheme[item].func = test(e);
    // console.log(scheme[item]);
  });
}
</script>

<style lang="scss" scoped>
</style>