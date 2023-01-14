<template>
  <Section>
    <form
      class="
        w-full
        md:w-1/2
        lg:w-1/4
        mx-auto
        mt-12
        text-center
        border
        rounded
        flex flex-col
        p-6
      "
    >
      <label>Email</label>
      <input class="border m-3 p-2" v-model="email" type="email" />
      <label>Hasło</label>
      <input class="border m-3 p-2" v-model="password" type="password" />
      <label
        ><input class="mr-2" type="checkbox" v-model="remember" />Zapamiętaj
        mnie
      </label>
      <button :class="[primaryButton]" @click.prevent="login">Zaloguj</button>
    </form>
  </Section>
</template>

<script lang="ts" setup>
import { primaryButton } from "@/resusables/css-classes";
import { useAuthStore } from "@/stores/auth";
import { ref } from "@vue/reactivity";
import Section from "@/components/commons/Section.vue";
import { useRoute, useRouter } from "vue-router";
const fullPath = useRoute().redirectedFrom?.fullPath;

const store = useAuthStore();
const { push } = useRouter();

const email = ref("");
const password = ref("");
const remember = ref(false);

const login = async () => {
  const result = await store.login(email.value, password.value, remember.value);
  result && push(fullPath || "/");
};
</script>

<style>
</style>