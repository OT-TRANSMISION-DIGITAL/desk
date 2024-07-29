<template>
    <div class="flex flex-row items-center gap-10">
      <div>
        <label for="date" class="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          type="datetime-local"
          v-model="date"
          id="date"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="time" class="block text-sm font-medium text-gray-700">Hora</label>
        <input
          type="time"
          v-model="time"
          id="time"
          step="60"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      date: '',
      time: '',
      showPicker: false,
      submitted: false,
    };
  },
  methods: {
    togglePicker() {
      this.showPicker = !this.showPicker;
    },
    submit() {
      this.submitted = true;
      this.showPicker = false;
    },
  },
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
