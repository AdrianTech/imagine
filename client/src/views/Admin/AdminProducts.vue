<template>
  <AdminSection>
    <Products />
  </AdminSection>
</template>

<script lang="ts" setup>
import AdminSection from "@/components/admin/AdminSection.vue";
import Products from "@/components/admin/Products.vue";
import { useRoute } from "vue-router";
AdminSection;
</script>

<style lang="scss" scoped>
</style>