<template>
  <Section>
    <div class="flex flex-col items-center w-full sm:w-3/4 lg:w-1/2 mx-auto">
      <div class="text-center w-full sm:w-1/2 mt-6">
        <div class="bg-slate-300 text-slate-900 text-lg rounded-md">
          <p>Nazwa</p>
        </div>
        <div class="text-lg text-slate-800 my-2">
          <p>{{ user.username }}</p>
        </div>
      </div>
      <div class="text-center w-full sm:w-1/2 mt-2">
        <div class="bg-slate-300 text-slate-900 text-lg rounded-md">
          <p>Email</p>
        </div>
        <div class="text-lg text-slate-800 my-2">
          <p>{{ user.email }}</p>
        </div>
      </div>
      <div class="text-center w-full sm:w-1/2 mt-2">
        <div class="bg-slate-300 text-slate-900 text-lg rounded-md">
          <p>Rola</p>
        </div>
        <div class="text-lg text-slate-800 my-2">
          <p>{{ user.role }}</p>
        </div>
      </div>
      <div class="text-center w-full sm:w-1/2 mt-2">
        <div class="bg-slate-300 text-slate-900 text-lg rounded-md mb-2">
          <p>Produkty</p>
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
import { getSingleItem } from "@/resusables/methods";
import { useAdminStore } from "@/stores/admin";
import { useAuthStore } from "@/stores/auth";
import { Ref, ref } from "@vue/reactivity";
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
  user.value = useAuthStore().user;
}
</script>