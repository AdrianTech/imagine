<template>
  <div class="w-full md:w-3/4 mx-auto" v-if="!showForm">
    <select-items
      :func="store.getAll"
      clientPageName="uzytkownicy"
      serverPageName="users"
    />
    <Table
      :data="store.users"
      :headers="['Nazwisko', 'Rola', 'Edycja', 'Usuń', 'Szczegóły']"
      :properties="['username', 'role']"
      :action="actionHandle"
    />
    <Paginate :metas="store.metas" name="users" :getFunc="store.getAll" />
    <button :class="primaryButton" @click="formHandle(false)">
      <i class="fa-solid fa-circle-plus text-[18px] text-green-700 mr-2"></i
      >Dodaj użytkownika
    </button>
  </div>
  <Form
    v-else
    :action="action"
    :userID="userID"
    :key="store.users"
    :formHandle="formHandle"
  />
</template>

<script lang="ts" setup>
import config from "@/resusables/config";
import { useAdminStore } from "@/stores/admin";
import Table from "../../commons/Table.vue";
import Form from "./UsersForm.vue";
import SelectItems from "@/components/commons/SelectItems.vue";
import Paginate from "@/components/pagination/Paginate.vue";
import { Ref, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { primaryButton } from "@/resusables/css-classes";

const showForm: Ref<boolean> = ref<boolean>(false);
const action: Ref<boolean> = ref<boolean>(false);
const userID = ref(null);
const store = useAdminStore();
const router = useRouter();

store.getAll(
  {
    path: `${config.nestApiPath}/users`,
    method: "get",
    withCredentials: true,
  },
  "users"
);

const formHandle = (state?: boolean) => {
  showForm.value = !showForm.value;
  state != null && (action.value = state);
  !state && (userID.value = null);
};

const actionHandle = async (type: string, id: number): Promise<void> => {
  switch (type) {
    case "edit":
      showForm.value = true;
      action.value = true;
      userID.value = id;
      break;
    case "delete":
      await store.removeElement(
        {
          path: `/admin/users/${id}`,
          method: "delete",
          withCredentials: true,
        },
        id,
        "users"
      );
      break;
    default:
    // router.push({ name: "profile", params: { id } });
  }
};
</script>