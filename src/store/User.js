// src/store.js
import { reactive } from 'vue';

// Estado global compartido
const state = reactive({
  usuario: null,
});


const establecerUsuario = (nuevoUsuario) => {
  state.usuario = nuevoUsuario;
};

// Exportar una función que retorna el estado y las funciones
export const useGlobalState = () => {
  return {
    state,
    establecerUsuario
  };
};
