<template>
  <AdminSection>
    <Products />
  </AdminSection>
</template>

<script lang="ts" setup>
import AdminSection from "@/components/admin/AdminSection.vue";
import Products from "@/components/admin/products/Products.vue";
import { useRoute } from "vue-router";
</script>

<style lang="scss" scoped>
</style>