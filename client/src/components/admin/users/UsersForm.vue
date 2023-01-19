<template>
  <div :class="[formAdmin]">
    <h2 class="ml-2 text-xl mb-3 uppercase">
      {{
        props.action
          ? `Edytuj użytkownika: ${user?.username}`
          : `Dodaj nowego użytkownika`
      }}
    </h2>
    <FormKit
      type="form"
      @submit="submit"
      autocomplete="off"
      id="formID"
      prefix-icon="submit"
    >
      <FormKit
        type="text"
        label="Imię i Nazwisko"
        name="username"
        prefix-icon="text"
        :placeholder="user?.username || 'Nazwa użytkownika'"
        :validation="deleteRequredInValidation('required|length:5')"
      />
      <FormKit
        type="email"
        label="E-mail"
        name="email"
        prefix-icon="email"
        :placeholder="user?.email || 'E-mail'"
        :validation="deleteRequredInValidation('required|email')"
      />
      <div class="password" v-if="!props.action || editPassword">
        <FormKit
          type="password"
          name="password"
          label="Hasło"
          prefix-icon="password"
          help="Enter a new password"
          validation="required"
          validation-visibility="live"
        />
        <FormKit
          type="password"
          name="password_confirm"
          label="Powtórz hasło"
          prefix-icon="repeater"
          help="Confirm your new password"
          validation="required|confirm"
          validation-visibility="live"
          validation-label="Password confirmation"
        />
      </div>
      <FormKit
        type="select"
        select-icon="caretDown"
        :label="action ? `Rola [aktualnie: ${user?.role}]` : 'Rola'"
        name="role"
        :validation="
          deleteRequredInValidation('required|matches:User,Moderator,Admin')
        "
        :options="[
          {
            label: 'Wybierz uprawnienia',
            value: '',
          },
          {
            label: 'User',
            value: 'User',
            attrs: { disabled: disableSelectOption('User') },
          },
          {
            label: 'Moderator',
            value: 'Moderator',
            attrs: { disabled: disableSelectOption('Moderator') },
          },
          {
            label: 'Admin',
            value: 'Admin',
            attrs: { disabled: disableSelectOption('Admin') },
          },
        ]"
      />
    </FormKit>
    <div :class="[formBottomNav]">
      <button
        v-if="action"
        @click="showPasswordFields"
        class="ml-2 border border-blue-800 rounded-md px-5"
      >
        {{ !editPassword ? "Edytuj hasło" : "Ukryj edycję hasła" }}
      </button>
      <button
        @click="props.formHandle(false)"
        class="ml-2 border border-blue-800 rounded-md px-5"
      >
        Powrót
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IUser } from "@/interfaces/user";
import config from "@/resusables/config";
import { useAdminStore } from "@/stores/admin";
import { PropType, ref } from "vue";
import { useEventStore } from "@/stores/event";
import { reset } from "@formkit/core";
import { formBottomNav, formAdmin } from "@/resusables/css-classes";
import { handleSubmitData } from "@/resusables/methods";

const props = defineProps({
  action: Boolean as PropType<boolean>,
  userID: Number as PropType<number>,
  formHandle: Function,
});

const store = useAdminStore();
const eventStore = useEventStore();
const editPassword = ref(false);

const user: IUser | undefined = store.users.find(
  (elem: IUser) => elem.id === props.userID
);

const showPasswordFields = () => (editPassword.value = !editPassword.value);

const disableSelectOption = (name: string) =>
  user?.role === name ? true : false;

const deleteRequredInValidation = (str: string): string => {
  if (props.action) return str.replace("required|", "");
  return str;
};

const submit = async (data: any) => {
  const form = handleSubmitData(data);
  if (!form) return;

  const methodChoice = props.action ? "patch" : "post";

  if (props.action) data.id = props.userID;

  const result = await store.createOrUpdate(
    {
      path: `/admin/users`,
      method: methodChoice,
      withCredentials: true,
      body: form,
    },
    "users",
    props.action && props.userID
  );
  if (result) {
    reset("formID");
    eventStore.eventMessageHelper("Użytkownik został pomyślnie zaktualizowany");
  } else {
    eventStore.eventMessageHelper("Wystąpił błąd. Spróbuj ponownie", true);
  }
};
</script>