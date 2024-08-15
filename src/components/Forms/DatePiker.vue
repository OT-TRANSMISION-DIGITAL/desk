<template>
  <div class="flex flex-col gap-4">
    <div v-for="(item, index) in dateTimeArray" :key="index" class="flex flex-row items-center gap-10">
      <div>
        <label :for="'date-' + index" class="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          type="datetime-local"
          v-model="item.date"
          :id="'date-' + index"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label :for="'time-' + index" class="block text-sm font-medium text-gray-700">Hora</label>
        <input
          type="time"
          v-model="item.time"
          :id="'time-' + index"
          step="60"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <button @click="removeDateTime(index)" class="text-red-600 hover:text-red-800">Eliminar</button>
    </div>

    <button @click="addDateTime" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Agregar Fecha y Hora</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateTimeArray: [
        { date: '', time: '' },
      ],
    };
  },
  methods: {
    addDateTime() {
      this.dateTimeArray.push({ date: '', time: '' });
    },
    removeDateTime(index) {
      this.dateTimeArray.splice(index, 1);
    },
  },
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
