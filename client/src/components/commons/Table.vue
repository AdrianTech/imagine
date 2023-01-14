<template>
  <div class="overflow-x-auto relative sm:rounded-lg my-5">
    <table class="w-full text-sm text-left text-gray-900">
      <thead class="text-xs text-gray-100 uppercase bg-blue-800 lg:text-[14px]">
        <tr>
          <th
            scope="col"
            class="py-3 px-6"
            v-for="header in headers"
            :key="header"
          >
            <div class="flex items-center">
              {{ header }}
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 w-3 h-3"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  />
                </svg>
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in props.data"
          :key="item.id"
          class="
            bg-white
            border-b border-b-[#6073ed]
            dark:bg-slate-100
            lg:text-[16px]
          "
        >
          <td
            class="py-4 px-6"
            v-for="property in props.properties"
            :key="property"
          >
            <span v-if="typeof item[property] === 'boolean'">
              {{ item[property] ? "Tak" : "Nie" }}
            </span>
            <span v-else>{{ item[property] }}</span>
          </td>
          <td class="py-4 px-6 text-left">
            <button
              @click="props.action('edit', item.id)"
              class="font-medium text-blue-600"
            >
              Edycja
            </button>
          </td>
          <td class="py-4 px-6 text-left">
            <button
              @click="props.action('delete', item.id)"
              class="font-medium text-red-600"
            >
              <i class="fa fa-trash mr-1" aria-hidden="true"></i>
              Usuń
            </button>
          </td>
          <td class="py-4 px-6 text-left text-green-900">
            <button
              @click="props.action('details', item.id)"
              class="font-medium"
            >
              <i class="fa fa-eye mr-1" aria-hidden="true"></i>
              Szczegóły
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  action: Function;
  data: object[];
  headers: string[];
  properties: string[];
}>();
</script>