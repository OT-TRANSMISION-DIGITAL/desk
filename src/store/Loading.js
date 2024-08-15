// src/store.js
import { reactive } from 'vue';

// Estado global compartido
const state = reactive({
  loading: null,
});


const establecerLoading = (nuevoUsuario) => {
  state.loading = nuevoUsuario;
};

// Exportar una función que retorna el estado y las funciones
export const useGlobalState = () => {
  return {
    state,
    establecerLoading
  };
};
