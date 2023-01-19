<template>
  <Section>
    <div
      class="
        w-full
        sm:w-3/4
        mx-auto
        bg-slate-800
        dark:text-slate-100
        py-4
        px-4
        mt-2
        md:px-12
        rounded-md
      "
    >
      <img
        class="
          text-center
          md:float-left
          w-[150px]
          h-[150px]
          sm:w-[250px] sm:h-[250px]
          mr-2
          border-2 border-slate-100
          rounded-full
          sm:mr-6 sm:mb-5
        "
        src="https://images.unsplash.com/photo-1484186139897-d5fc6b908812?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
        alt=""
      />
      <p class="text-white">
      <h3 class="font-bold text-center my-2 text-xl">
        {{ t("Jestem Victoria...") }}
      </h3>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
      consequuntur veritatis corporis, harum iste aperiam magnam nulla velit
      quod deleniti voluptatum reprehenderit impedit est error ratione, eaque
      vel ipsum delectus excepturi blanditiis, ad distinctio eveniet! Temporibus
      tempore ipsam iusto a quis ea quaerat facere amet inventore odit.
      Provident architecto temporibus, voluptates voluptatum minus excepturi
      vero reprehenderit sint itaque quisquam! Officiis eveniet officia nulla
      placeat totam! Magni possimus consectetur aperiam optio! Ex sint
      cupiditate cumque quae ad debitis quasi facilis iste?
      </p>
      <p class="mt-1 text-white">
        Sed natus ea fugit harum est quae a unde placeat vero, neque,
        perferendis facilis! Quos minus cumque magnam optio esse inventore velit
        facilis sapiente doloremque, aperiam voluptate perspiciatis omnis
        corporis dignissimos molestias excepturi qui pariatur, iste repellendus
        quis earum, facere tempora? Amet inventore libero delectus nemo ab
        deserunt nam omnis. Dolor voluptatum eaque sequi aspernatur vitae
        reprehenderit nulla quasi. Alias quas velit obcaecati magni?
      </p>
      <div class="flex gap-4 justify-center pt-4">
        <button
          :class="[primaryButton]"
          @click="$router.push({ name: 'products' })"
        >
          {{ t("Zobacz moje obrazy") }}
        </button>
        <button
          :class="[primaryButton]"
          @click="$router.push({ name: 'contact' })"
        >
          {{ t("Skontaktuj się ze mną") }}
        </button>
      </div>
    </div>
  </Section>
</template>

<script lang="ts" setup>
import Section from "@/components/commons/Section.vue";
import { primaryButton } from "@/resusables/css-classes";
import { useTranslationStore } from "@/stores/translation";
import SectionTitle from "../resusables/wrappers/SectionTitle.vue";
const { t } = useTranslationStore();
</script>

<style lang="scss" scoped>
</style>