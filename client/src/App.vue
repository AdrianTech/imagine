<template>
  <Main />
  <Nav />
  <Suspense>
    <router-view />
  </Suspense>
  <message />
  <Footer />
</template>

<script lang="ts" setup>
import Nav from "./components/navigation/Nav.vue";
import Footer from "./components/Footer.vue";
import Main from "@/views/Admin/Main.vue";
import Message from "@/components/commons/Message.vue";
import { useAuthStore } from "./stores/auth";
import { useTranslationStore } from "@/stores/translation";
const store = useAuthStore();
useTranslationStore().setLang();

if (store.getRemember()) store.rememberLogin();
</script>

<style lang="scss">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #f90d0d;
    }
  }
}
</style>
