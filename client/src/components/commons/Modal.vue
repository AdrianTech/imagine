<template>
  <dialog class="modal w-full sm:w-1/2" :class="[classname]">
    <slot></slot>
  </dialog>
</template>

<script lang="ts" setup>
const { classname } = defineProps<{
  classname: string;
}>();
</script>

<style lang="scss" scoped>
.modal::backdrop {
  background: rgba(0, 0, 0, 0.4);
}
</style>