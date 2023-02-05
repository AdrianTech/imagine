<template>
  <Section class="py-6 fixed top-1 w-full left-4">
    <div
      class="
        border-2 border-emerald-100
        shadow-lg shadow-slate-300
        rounded-sm
        flex flex-col
        items-center
        w-full
        mt-14
        md:mt-0
        p-4
        sm:w-3/4
        lg:w-1/2
        mx-auto
        bg-slate-100
      "
    >
      <div class="text-center w-full sm:w-1/2 mt-2">
        <div class="bg-slate-300 text-slate-900 text-lg rounded-md">
          <p class="font-bold py-1 text-xl">
            <i
              class="fa fa-info-circle mr-3 text-green-800"
              aria-hidden="true"
            ></i
            >Nazwa
          </p>
        </div>
        <div class="text-lg text-slate-800 my-2">
          <p class="text-[19px]">{{ props.deliver.name }}</p>
        </div>
      </div>
      <div class="text-center w-full sm:w-1/2 mt-2">
        <div class="bg-slate-300 text-slate-900 text-lg rounded-md">
          <p class="font-bold py-1 text-xl">
            <i class="fa fa-money mr-2 text-green-800" aria-hidden="true"></i
            ><span>Cena</span>
          </p>
        </div>
        <div class="text-lg text-slate-800 my-2">
          <p class="text-[19px]">{{ props.deliver.price }} zł</p>
        </div>
      </div>
      <div class="text-center w-full sm:w-1/2 mt-2">
        <div class="bg-slate-300 text-slate-900 text-lg rounded-md">
          <p class="font-bold py-1 text-xl">
            <i
              :class="
                props.deliver.active ? 'fa fa-toggle-on' : 'fa-fa-toggle-off'
              "
              class="mr-2 text-green-800"
              aria-hidden="true"
            ></i
            ><span>Aktywny</span>
          </p>
        </div>
        <div class="text-lg text-slate-800 my-2">
          <p class="text-[19px]">
            {{ props.deliver.active ? "Tak" : "Nie" }}
          </p>
        </div>
      </div>
      <div class="text-center w-full sm:w-1/2 mt-2">
        <div class="bg-slate-300 text-slate-900 text-lg rounded-md">
          <p class="font-bold py-1 text-xl">
            <i
              class="fa fa-plus-square-o mr-2 text-green-800"
              aria-hidden="true"
            ></i
            ><span>Data utworzenia</span>
          </p>
        </div>
        <div class="text-lg text-slate-800 my-2">
          <p class="text-[19px]">
            {{ convertDate(props.deliver.createdAt) }}
          </p>
        </div>
      </div>
      <div class="text-center w-full sm:w-1/2 mt-2">
        <div class="bg-slate-300 text-slate-900 text-lg rounded-md">
          <p class="font-bold py-1 text-xl">
            <i class="fa fa-wrench mr-2 text-green-800" aria-hidden="true"></i
            ><span>Zaktualizowany</span>
          </p>
        </div>
        <div class="text-lg text-slate-800 my-2">
          <p class="text-[19px]">
            {{ convertDate(props.deliver.updatedAt) }}
          </p>
        </div>
      </div>
    </div>
  </Section>
</template>

<script lang="ts" setup>
import Section from "@/components/commons/Section.vue";
import { convertDate } from "@/resusables/methods";

const props = defineProps<{
  deliver: Object;
}>();
</script>
