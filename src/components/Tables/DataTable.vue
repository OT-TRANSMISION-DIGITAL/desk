<!-- DataTable.vue -->
<template>
    <div class="p-4 rounded bg-[#F9FAFB] dark:bg-gray-700 shadow-md">
      <div class="flex justify-between items-center mb-4">
        <fwb-input v-model="searchQuery" type="text" placeholder="Buscar..." class="" />
        <fwb-select v-if="filters" v-model="selectedFilter" class="" :options="filters"
          placeholder="Seleccione un filtro" />
        <!-- <option value="">Todos</option>
            <option v-for="filter in filters" :key="filter" :value="filter">
              {{ filter }}
            </option>
          </select> -->
      </div>
  
      <fwb-table striped-columns class="min-h-[23rem] max-h-[23rem]">
        <fwb-table-head>
          <template v-for="h, index in header">
            <fwb-table-head-cell class="border-b">
              <button class="w-full h-full" @click="filterForColumn && sortTable(index)">
                {{ h }}
                <span v-if="sortColumn === index">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
              </button>
            </fwb-table-head-cell>
          </template>
          <!-- <fwb-table-head-cell>RFC</fwb-table-head-cell>
                  <fwb-table-head-cell>Regimen</fwb-table-head-cell>
                  <fwb-table-head-cell>Correos</fwb-table-head-cell>
                  <fwb-table-head-cell>Código postal</fwb-table-head-cell> -->
          <fwb-table-head-cell class="border-b"><span class="sr-only">Edit</span></fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>
          <fwb-table-row v-for="(item, i) in paginatedData" :key="item.id">
            <fwb-table-cell v-for="col in columns"
              class="w-auto max-w-96 max-h-10  overflow-hidden"
              v-html="item[col]"></fwb-table-cell>
  
            <!-- <fwb-table-cell>{{ item.rfc }}</fwb-table-cell>
                      <fwb-table-cell>{{ item.regimen.join(', ') }}</fwb-table-cell>
                      <fwb-table-cell>{{ item.emails.join(', ') }}</fwb-table-cell>
                      <fwb-table-cell>{{ item.codigo_postal }}</fwb-table-cell> -->
            <fwb-table-cell class=" flex" v-if="acciones">
              <template v-for="action in acciones">
                <Tooltip :content="'Editar'" >
                  <button class="p-1" @click="action.action(item.id)" v-if="action.icon == 'edit'">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                    </svg>
                  </button>
                </Tooltip>
                <Tooltip :content="'Eliminar'" >
                  <button class="p-1" @click="action.action(item.id)" v-if="action.icon == 'delete'">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                    </svg>
                  </button>
                </Tooltip>
                <Tooltip :content="'Acceso'" >
                  <button class="p-1" @click="action.action(item.id)" v-if="action.icon == 'acceso'">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round"  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                    </svg>
                  </button>
                </Tooltip>
              </template>
            </fwb-table-cell>
          </fwb-table-row>
        </fwb-table-body>
      </fwb-table>
      <div class="flex justify-end items-center mt-4 w-full">
        <!-- <div class="flex-1"> -->
        <fwb-pagination class="mr-5" v-model="currentPage" :total-pages="totalPages" show-icons :next-label="''"
          :previous-label="''"></fwb-pagination>
        <!-- </div> -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps } from 'vue';
  import Tooltip from '../Tooltip.vue'
  import {
    FwbA,
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,
    FwbPagination,
    FwbInput,
    FwbSelect
  } from 'flowbite-vue'
  
  const props = defineProps({
    data: Array,
    filters: Array,
    header: Array,
    columns: Array,
    filterForColumn: Boolean,
    acciones: [Object]
  });
  
  const searchQuery = ref('');
  const selectedFilter = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 5;
  
  const sortColumn = ref(null);
  const sortOrder = ref('asc');
  
  const sortTable = (columnIndex) => {
    if (sortColumn.value === columnIndex) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.value = columnIndex;
      sortOrder.value = 'asc';
    }
  };
  
  const filteredData = computed(() => {
    let data = props.data;
    const columns = props.columns;
  
    if (searchQuery.value) {
      data = data.filter(item =>
        columns.some(col => String(item[col]).toLowerCase().includes(searchQuery.value.toLowerCase()))
      );
    }
  
    if (selectedFilter.value) {
      data = data.filter(item => item.category === selectedFilter.value);
    }
  
    if (sortColumn.value !== null) {
      data = [...data].sort((a, b) => {
        const col = columns[sortColumn.value];
        if (a[col] < b[col]) return sortOrder.value === 'asc' ? -1 : 1;
        if (a[col] > b[col]) return sortOrder.value === 'asc' ? 1 : -1;
        return 0;
      });
    }
  
    return data;
  });
  
  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.value.slice(start, end);
  });
  
  const totalPages = computed(() => {
    return Math.ceil(filteredData.value.length / itemsPerPage);
  });
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  import { onBeforeUpdate } from 'vue'
  import { initFlowbite } from 'flowbite'
  
  // initialize components based on data attribute selectors
  onBeforeUpdate(() => {
      initFlowbite();
  })
  </script>
  
  <style scoped>
  /* Añade estilos según sea necesario */
  </style>