<template>
  <Section class="py-6">
    <div
      class="
        border-2 border-emerald-100
        shadow-lg shadow-slate-300
        rounded-sm
        flex flex-col
        items-center
        w-full
        mt-14
        md:mt-6
        p-4
        sm:w-3/4
        lg:w-1/2
        mx-auto
        bg-slate-100
      "
    >
      <div
        class="
          text-center
          w-full
          sm:w-1/2
          flex
          gap-x-3
          items-center
          justify-center
          text-2xl
          my-2
        "
      >
        <i class="fa fa-user" aria-hidden="true"></i>{{ user.username }}
      </div>
      <div class="text-center w-full sm:w-1/2 mt-2">
        <div class="bg-slate-300 text-slate-900 text-lg rounded-md">
          <p class="font-bold py-1 text-xl">
            <i
              class="fa fa-envelope-o mr-3 text-green-800"
              aria-hidden="true"
            ></i
            >Email
          </p>
        </div>
        <div class="text-lg text-slate-800 my-2">
          <p class="text-[19px]">{{ user.email }}</p>
        </div>
      </div>
      <div class="text-center w-full sm:w-1/2 mt-2">
        <div class="bg-slate-300 text-slate-900 text-lg rounded-md">
          <p class="font-bold py-1 text-xl">
            <i
              class="fa fa-user-circle-o mr-2 text-green-800"
              aria-hidden="true"
            ></i
            ><span>Rola</span>
          </p>
        </div>
        <div class="text-lg text-slate-800 my-2">
          <p
            :class="user.role === ROLES.ADMIN && 'text-red-600'"
            class="text-[19px]"
          >
            {{ user.role }}
          </p>
        </div>
      </div>
      <div
        class="w-full sm:w-1/2"
        v-if="
          authStore.user.role === ROLES.ADMIN ||
          authStore.user.role === ROLES.MODERATOR
        "
      >
        <div class="text-center mt-2">
          <div class="bg-slate-300 text-slate-900 text-lg rounded-md">
            <p class="font-bold py-1 text-xl">
              <i
                class="fa fa-plus-square-o mr-3 text-green-800"
                aria-hidden="true"
              ></i
              >Utworzone
            </p>
          </div>
          <div class="text-lg text-slate-800 my-2">
            <p class="text-[19px]">{{ convertDate(user.createdAt, "us") }}</p>
          </div>
        </div>
        <div class="text-center mt-2">
          <div class="bg-slate-300 text-slate-900 text-lg rounded-md">
            <p class="font-bold py-1 text-xl">
              <i class="fa fa-wrench mr-3 text-green-800" aria-hidden="true"></i
              >Ostatnio aktualizowane
            </p>
          </div>
          <div class="text-lg text-slate-800 my-2">
            <p class="text-[19px]">{{ convertDate(user.updatedAt) }}</p>
          </div>
        </div>
      </div>
      <div class="text-center w-full sm:w-1/2 mt-2">
        <div class="bg-slate-300 text-slate-900 text-lg rounded-md mb-2">
          <p class="font-bold py-1 text-xl">
            <i
              class="fa fa-picture-o mr-2 text-green-800"
              aria-hidden="true"
            ></i
            >Dodane obrazy
          </p>
        </div>
        <div v-for="product in user.products" :key="product.id" class="my-2">
          <router-link
            class="text-blue-800 hover:text-red-800 transition duration-500"
            :to="`/product/${product.id}`"
            >{{ product.title }}</router-link
          >
        </div>
      </div>
    </div>
  </Section>
</template>

<script lang="ts" setup>
import Section from "@/components/commons/Section.vue";
import { IUser } from "@/interfaces/user";
import { ROLES } from "@/resusables/enums";
import { convertDate, getSingleItem } from "@/resusables/methods";
import { useAdminStore } from "@/stores/admin";
import { useAuthStore } from "@/stores/auth";
import { Ref, ref } from "@vue/reactivity";
const authStore = useAuthStore();

const user: Ref<IUser> = ref<IUser>();
const store = useAdminStore();

const props = defineProps<{
  id?: number;
}>();

if (props.id) {
  user.value = await getSingleItem(
    props.id,
    `/admin/users/${props.id}`,
    store.users
  );
} else {
  user.value = authStore.user;
}
</script>