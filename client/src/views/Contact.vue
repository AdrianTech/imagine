<template>
  <Section>
    <div class="w-full md:w-1/2 md:mx-auto mt-2">
      <section-title>{{ t("Bądźmy w kontakcie...") }}</section-title>
      <div
        class="
          flex flex-col
          justify-center
          items-center
          md:flex-row md:gap-x-6
          mt-6
        "
      >
        <img
          class="w-3/4 md:w-1/3 rounded-md"
          src="https://images.unsplash.com/photo-1613746203812-717e6e5db3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
          alt=""
        />
        <div class="contact mt-4 md:mt-0">
          <ul class="divide-y-2 divide-blue-100">
            <li class="py-3 flex items-center">
              <i
                class="fa-solid fa-mobile text-3xl md:text-4xl text-red-800"
              ></i
              ><span :class="[descSpan]"
                ><a href="tel:+(+48) 777 888 999">(+48) 777 888 999</a></span
              >
            </li>
            <li class="py-3 flex items-center">
              <i
                class="fa-solid fa-envelope text-3xl md:text-4xl text-red-800"
              ></i
              ><span :class="[descSpan]">
                <a href="mailto:test@test.com"
                  >victoria.picasso@imagine.com</a
                ></span
              >
            </li>
            <li class="py-3 flex items-center">
              <i
                class="fa-brands fa-facebook text-3xl md:text-4xl text-red-800"
              >
              </i>
              <span :class="[descSpan]"
                ><a
                  href="http://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ t("Odwiedź mnie na Facebook") }}</a
                ></span
              >
            </li>
            <li class="py-3 flex items-center">
              <i
                class="
                  fa-brands fa-square-instagram
                  text-3xl
                  md:text-4xl
                  text-red-800
                "
              >
              </i>
              <span :class="[descSpan]"
                ><a
                  href="http://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ t("Odwiedź mnie na Instagram") }}</a
                ></span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Section>
</template>

<script lang="ts" setup>
import Section from "@/components/commons/Section.vue";
import SectionTitle from "@/resusables/wrappers/SectionTitle.vue";
import { useTranslationStore } from "@/stores/translation";
const { t } = useTranslationStore();

const descSpan = "text-xl md:text-2xl font-bold text-slate-800 ml-3";
</script>

<style lang="scss" scoped>
</style>