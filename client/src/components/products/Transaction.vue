<template>
  <Section>
    <h2 class="text-center text-2xl my-4">Strona zakupu</h2>
    <div class="flex justify-center items-center"></div>
    <form
      @submit.prevent="cartStore.orderComplete(data)"
      class="flex flex-col w-full md:w-1/2 mx-auto text-center"
    >
      <label class="font-bold text-blue-900">Imię</label
      ><input
        class="my-2 border border-blue-100 text-center p-2"
        v-model.trim="data.name"
        type="text"
      />
      <label class="font-bold text-blue-900">Nazwisko</label
      ><input
        class="my-2 border border-blue-100 text-center p-2"
        v-model.trim="data.surname"
        type="text"
      />
      <label class="font-bold text-blue-900">Miasto</label
      ><input
        class="my-2 border border-blue-100 text-center p-2"
        v-model.trim="data.city"
        type="text"
      />
      <label class="font-bold text-blue-900">Numer telefonu</label
      ><input
        class="my-2 border border-blue-100 text-center p-2"
        v-model.trim="data.phone"
        type="text"
        placeholder="np. 606526888 lub 48606526888"
      />
      <label class="font-bold text-blue-900">Województwo</label
      ><input
        class="my-2 border border-blue-100 text-center p-2"
        v-model.trim="data.voivodeship"
        type="text"
        placeholder="np. Mazowieckie"
      />
      <label class="font-bold text-blue-900">Email</label
      ><input
        class="my-2 border border-blue-100 text-center p-2"
        v-model.trim="data.email"
        type="email"
      />
      <label class="font-bold text-blue-900">Adres</label
      ><input
        class="my-2 border border-blue-100 text-center p-2"
        v-model.trim="data.address"
        placeholder="np: Pomorska 12/2"
        type="text"
      />
      <label class="font-bold text-blue-900">Kod pocztowy</label
      ><input
        class="my-2 border border-blue-100 text-center p-2"
        v-model.trim="data.zipcode"
        type="text"
        placeholder="np. 35-102"
      />
      <div class="flex flex-col my-3">
        <div>
          Podsumowanie: {{ cartStore.cartTotalSum.toFixed(2) }} zł + koszt
          dostawy {{ deliveryCost }} zł
        </div>
      </div>
      <select
        class="w-1/2 mx-auto p-1 mt-2"
        v-model="data.deliveryOption"
        @change="addDeliveryCost"
      >
        <option class="text-center" disabled value="">Sposób dostawy</option>
        <option value="INPOST-12" name="12">Paczkomat Inpost (12 zł)</option>
        <option value="DPD-15">Kurier DPD (15 zł)</option>
        <option value="PERSONAL-0">Odbiór osobisty (0 zł)</option>
        <option value="COD-14">Odbiór w Punkcie (14 zł)</option>
      </select>
      <button class="w-1/2 mx-auto" :class="[primaryButton]">
        Zamów obraz
      </button>
    </form>
    <div class="text-center">
      <h2 class="font-bold text-xl">LUB</h2>
      <button :class="[primaryButton]" @click="$router.push({ name: 'cart' })">
        Wróć do koszyka
      </button>
    </div>

    <Modal :classname="'errors'">
      <ul class="p-4 list-disc text-red-800 sm:px-[20%]">
        <h3 class="font-bold">
          Poniższe pola nie zostały poprawnie wypełnione
        </h3>
        <div v-for="(error, index) in eventStore.errors" :key="index">
          <li class="my-1">{{ error }}</li>
        </div>
        <button :class="[primaryButton]" @click="dialog(false, 'errors')">
          Rozumiem
        </button>
      </ul>
    </Modal>
  </Section>
</template>

<script lang="ts" setup>
import { primaryButton } from "@/resusables/css-classes";
import { dialog } from "@/resusables/methods";
import { useCartStore } from "@/stores/cart";
import { useEventStore } from "@/stores/event";
import { reactive, ref } from "@vue/reactivity";
import { VueElement } from "@vue/runtime-dom";
import { VueNode } from "@vue/test-utils/dist/types";
import { useRoute } from "vue-router";
import Modal from "../commons/Modal.vue";
import Section from "../commons/Section.vue";
const cartStore = useCartStore();
const eventStore = useEventStore();

const deliveryCost = ref(0);

const data = reactive({
  name: "",
  surname: "",
  phone: "",
  city: "",
  address: "",
  email: "",
  zipcode: "",
  voivodeship: "",
  deliveryOption: "",
  totalPrice: cartStore.cartTotalSum,
  cart: cartStore.cart,
});

const addDeliveryCost = (event: Event) => {
  const option = (event.target as HTMLInputElement).value;
  const search = option.search(/[-]/);
  const cost = option.slice(search + 1);
  deliveryCost.value = cost;
};
</script>

<style lang="scss" scoped>
label {
  text-align: left;
  margin-left: 20px;
}
</style>