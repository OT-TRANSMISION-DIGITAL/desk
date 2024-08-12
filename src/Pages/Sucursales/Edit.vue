<template>
    <div class="flex justify-center mt-5">
      <form class="w-[35rem] max-w-4xl p-8 bg-white border-4 border-[#3E4095] rounded-md shadow-md"
        @submit="sub($event)"
      >
        <h2 class="mb-5 text-4xl font-bold text-center text-[#3E4095]">Editar Sucursal</h2>
        <div class="grid grid-cols-2 gap-10 mt-5">
            <div class="col-span-2">
                <Input 
                    v-model="form.nombre.value"
                    label="Nombre"
                    placeholder="Nombre"
                    type="text"
                    name="nombre"
                    :validation-status="form.nombre.error.status"
                    :validation-message="form.nombre.error.message"
                />
            </div>
            <div class="col-span-2">
                <Input 
                    v-model="form.direccion.value"
                    label="Correo"
                    placeholder="Correo"
                    type="email"
                    name="email"
                    :validation-status="form.direccion.error.status"
                    :validation-message="form.direccion.error.message"
                />
            </div>
            <div class="col-span-2">
                <Input 
                    v-model="form.telefono.value"
                    label="Teléfono"
                    placeholder="Teléfono"
                    type="text"
                    name="phone"
                    :validation-status="form.telefono.error.status"
                    :validation-message="form.telefono.error.message"
                    @keyup="form.telefono.value = formatPhoneNumber(form.telefono.value)"
                />
            </div>
            <div class="col-span-2">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione un Cliente</label>
                <select v-model="form.cliente_id.value"
                id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected disabled>Elija una opción</option>
                    <option v-for="cliente in clientes" :value="cliente.id">{{ cliente.nombre }}</option>
                </select>
                <!-- Mensaje de error -->
                <span v-if="form.cliente_id.error.status == 'error'" class="text-red-500 text-sm">{{ form.cliente_id.error.message }}</span>
            </div>
        </div>
        <!-- Span Error general API -->
        <div class="flex justify-center items-center" v-if="error">
            <p class="text-red-500 text-sm">{{ error }}</p>
        </div>
        <div class="relative flex justify-center items-center top-5">
            <Loading :loading="loading" class="absolute" />
        </div>
        <div class="flex justify-end mt-14 space-x-8">
            <button @click="back"
            class="border border-[#FF0000] rounded-2xl py-1 px-6 bg-white hover:bg-[#FF0000] hover:text-white">
                Cancelar
            </button>
            <button @click="submit"
            class="border border-[#3E4095] rounded-2xl py-1 px-6 bg-white hover:bg-[#3E4095] hover:text-white">
                Crear
            </button>
        </div>
      </form>
    </div>
  </template>
  
<script setup>
import {onMounted, ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { clientes as cli } from '../../services/clientes.js'
import { crearSucursal, sucursal } from '../../services/sucursales.js'
import Input from '../../components/Forms/Input.vue'
import Loading from '../../components/Forms/Loading.vue'
import { formatPhoneNumber, isValidPhoneNumber } from '../../global/Validators.js'
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const form = ref({
    nombre: {
        value: '',
        error: {
            status: '',
            message: ''
        }
    },
    direccion: {
        value: '',
        error: {
            status: '',
            message: ''
        }
    },
    telefono: {
        value: '',
        error: {
            status: '',
            message: ''
        }
    },
    cliente_id: {
        value: '',
        error: {
            status: '',
            message: ''
        }
    }
})
const error = ref('');

const back = () => {
    router.push('/sucursales')
}

const submit = async (e) => {
    if(!validar()) return;
    e.preventDefault();
    loading.value = true;
    const data = {
        nombre: form.value.nombre.value,
        direccion: form.value.direccion.value,
        telefono: form.value.telefono.value.replaceAll(' ','').replaceAll('-',''),
        cliente_id: form.value.cliente_id.value
    }
    try {
        const res = await crearSucursal(data);
        if(res.status < 300){
            router.push('/sucursales')
        }
    } catch (err) {
        console.error(err);
        error.value = err.response.data.message || err.response.data.msg || 'Error en el servidor';
    } finally {
        loading.value = false;
    }
}

const validar = () => {
    let valid = true;
    if(form.value.cliente_id.value === ''){
        form.value.cliente_id.error.status = 'error';
        form.value.cliente_id.error.message = 'El cliente es requerido';
        valid = false;
    }
    if(form.value.nombre.value === ''){
        form.value.nombre.error.status = 'error';
        form.value.nombre.error.message = 'El nombre es requerido';
        valid = false;
    }
    if(form.value.direccion.value === ''){
        form.value.direccion.error.status = 'error';
        form.value.direccion.error.message = 'El correo es requerido';
        valid = false;
    }
    if(form.value.telefono.value === ''){
        form.value.telefono.error.status = 'error';
        form.value.telefono.error.message = 'El teléfono es requerido';
        valid = false;
    }
    if(!isValidPhoneNumber(form.value.telefono.value)){
        form.value.telefono.error.status = 'error';
        form.value.telefono.error.message = 'El formato del teléfono no es válido (10 dígitos)';
        valid = false;
    }
    return valid;
}
const clientes = ref([])
const sub = (e) => {e.preventDefault();}
onMounted(async ()=>{
    try {
        const res = await cli()
        if(res.status < 300){
            clientes.value = res.data.data
        }
        const resSuc = await sucursal(route.params.id)
        if(resSuc.status < 300){
            form.value.cliente_id.value = resSuc.data.cliente_id
            form.value.telefono.value = formatPhoneNumber(resSuc.data.telefono)
            form.value.direccion.value = resSuc.data.direccion
            form.value.nombre.value = resSuc.data.nombre
        }
    } catch (error) {
        
    }
})
</script>

<style scoped>
</style>
  