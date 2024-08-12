<template>
  <div>
    <div class="flex items-center justify-between mt-4 mb-4">
      <div class="space-x-1">
        <label for="itemsPerPage" class="mr-2">Mostrar</label>
        <select id="itemsPerPage" v-model="itemsPerPage" @change="updatePagination" class="border rounded px-2 py-1 h-8 text-center">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
        </select>
        <label for="itemsPerPage" class="mx-2"> de </label> <span class="p-2 bg-white border border-black rounded">{{ data.length }} resultados</span>
      </div>
      <div class="flex items-center gap-5">
        <Pagination :total-pages="totalPages" :current-page="currentPage" @update:currentPage="currentPage = $event" />
        <button class="border-2 border-[#3E4095] rounded-2xl py-1 px-5 bg-white hover:bg-[#3E4095] hover:text-white"
            @click="btnAction">
            {{ btnText }}
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border-2 border-[#3e4095]">
        <thead class="bg-neutral-50 bg-opacity-75 text-[#3e4095] border-x">
          <tr>
            <th class="border border-[#3e4095]">#</th>
            <th class="border border-[#3e4095]" v-for="(header, i) in headers" :key="i">{{ header }}</th>
            <th class="border border-[#3e4095]">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="item.id" class="odd:bg-gray-200 even:bg-gray-300">
            <td class="border border-[#3e4095] pl-2">{{ item.id }}</td>
            <td class="border border-[#3e4095] pl-2" v-for="(column, i) in columns" :key="i" v-html="item[column]"></td>
            <td class="border-l-0 border-t-0 border-0 border-[#3e4095] pl-2 flex gap-2">
              <button class="text-red-500" v-if="item?.delete" @click="item?.delete(item.id)">
                <IconDelete />
              </button>
              <button class="text-blue-500" v-if="item?.edit" @click="item?.edit(item.id)">
                <IconEdit />
              </button>
              <button class="text-green-500" v-if="item?.success" @click="item?.success(item.id)">
                <Succes />  
              </button>
              <button class="text-red-500" v-if="item?.cancel" @click="item?.cancel(item.id)">
                <Cancelar />
              </button>
              <button class="text-red-500" v-if="item?.document" @click="item?.document(item.id)">
                <Document />
              </button>
              <button class="text-red-500" v-if="item?.show" @click="item?.show(item.id)">
                <Show />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, watch } from 'vue';
import IconDelete from '../../assets/svgs/delete.vue';
import IconEdit from '../../assets/svgs/edit.vue';
import Pagination from './Pagination.vue';
import Cancelar from '../../assets/svgs/cancel.vue';
import Succes from '../../assets/svgs/succes.vue';
import Document from '../../assets/svgs/document.vue'
import Show from '../../assets/svgs/show.vue'

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  btnText: {
    type: String,
    required: false,
    default: 'Botón',
  },
  btnAction: {
    type: Function,
    required: false,
    default: () => {},
  }
});

const itemsPerPage = ref(15);
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(props.data.length / itemsPerPage.value));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.data.slice(start, end);
});

function updatePagination() {
  currentPage.value = 1;
}

watch(itemsPerPage, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
/* añadir estilos adicionales */
</style>
