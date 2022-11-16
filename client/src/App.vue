<template>
  <Main />
  <Nav />
  <Suspense>
    <router-view />
  </Suspense>
  <Footer />
</template>

<script lang="ts" setup>
import Nav from "./components/navigation/Nav.vue";
import Footer from "./components/Footer.vue";
import Main from "@/views/Admin/Main.vue";
import { useAuthStore } from "./stores/auth";
const store = useAuthStore();

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
