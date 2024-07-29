<template>
    <nav aria-label="Page navigation example" class="max-w-max flex items-center">
    <p class="text-center text-sm">Pagina {{ currentPage }} de {{ totalPages }}</p>
      <ul class="flex items-center h-8 text-md space-x-0">
        <li>
          <a
            href="#"
            class="flex items-center justify-start px-2 h-8 ms-0 leading-tight text-gray-300 border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click.prevent="previousPage"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="w-4 h-4 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </a>
        </li>
        <li >
          <a 
            href="#"
            :class="[
              'flex items-center justify-center px-3 h-8 leading-tight border',
              'z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
               ]"
            @click.prevent="goToPage(currentPage)"
          >
            {{ currentPage || 0 }}
          </a>
        </li>

        <li v-if="totalPages == 0">
          <a 
            href="#"
            :class="[
              'flex items-center justify-center px-3 h-8 leading-tight border',
              'z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
               ]"
          >
            {{ 0 }}
          </a>
        </li>

        <li>
          <a
            href="#"
            class="flex items-center justify-end px-2 h-8 leading-tight text-gray-300 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click.prevent="nextPage"
          >
            <span class="sr-only">Next</span>
            <svg
              class="w-4 h-4 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  });
  
  const emit = defineEmits(['update:currentPage']);
  
  const currentPage = ref(props.currentPage);
  
  watch(currentPage, (newValue) => {
    emit('update:currentPage', newValue);
  });
  
  function previousPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  }
  
  function nextPage() {
    if (currentPage.value < props.totalPages) {
      currentPage.value++;
    }
  }
  
  function goToPage(page) {
    currentPage.value = page;
  }
  </script>
  
  <style scoped>
  /* Puedes añadir estilos adicionales si es necesario */
  </style>
  