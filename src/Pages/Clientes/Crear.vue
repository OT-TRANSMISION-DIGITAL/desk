<template>
    <div class="flex justify-center mt-5">
      <form class="w-auto max-w-4xl p-8 bg-white border-4 border-[#3E4095] rounded-md shadow-md"
        @submit="sub($event)"
      >
        <h2 class="mb-5 text-4xl font-bold text-center text-[#3E4095]">Registrar Cliente</h2>
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
                    v-model="form.email.value"
                    label="Correo"
                    placeholder="Correo"
                    type="email"
                    name="email"
                    :validation-status="form.email.error.status"
                    :validation-message="form.email.error.message"
                />
            </div>
            <div class="col-span-2">
                <Input 
                    v-model="form.phone.value"
                    label="Teléfono"
                    placeholder="Teléfono"
                    type="text"
                    name="phone"
                    :validation-status="form.phone.error.status"
                    :validation-message="form.phone.error.message"
                    @keyup="form.phone.value = formatPhoneNumber(form.phone.value)"
                />
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
import { useRouter } from 'vue-router'
import { crearCliente } from '../../services/clientes.js'
import Input from '../../components/Forms/Input.vue'
import Loading from '../../components/Forms/Loading.vue'
import { formatPhoneNumber, isEmail, isValidPhoneNumber } from '../../global/Validators.js'
const router = useRouter();
const loading = ref(false);
const form = ref({
    nombre: {
        value: '',
        error: {
            status: '',
            message: ''
        }
    },
    email: {
        value: '',
        error: {
            status: '',
            message: ''
        }
    },
    phone: {
        value: '',
        error: {
            status: '',
            message: ''
        }
    }
})
const error = ref('');

const back = () => {
    router.push('/clientes')
}

const submit = async (e) => {
    if(!validar()) return;
    e.preventDefault();
    loading.value = true;
    const data = {
        nombre: form.value.nombre.value,
        correo: form.value.email.value,
        telefono: form.value.phone.value.replaceAll(' ','').replaceAll('-','')
    }
    try {
        const res = await crearCliente(data);
        if(res.status < 300){
            router.push('/clientes')
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
    if(form.value.nombre.value === ''){
        form.value.nombre.error.status = 'error';
        form.value.nombre.error.message = 'El nombre es requerido';
        valid = false;
    }
    // Validar nombre solo debe tener letras
    if(!/^[a-zA-Z\s]*$/.test(form.value.nombre.value)){
        form.value.nombre.error.status = 'error';
        form.value.nombre.error.message = 'El nombre solo debe contener letras';
        valid = false;
    }
    if(form.value.email.value === ''){
        form.value.email.error.status = 'error';
        form.value.email.error.message = 'El correo es requerido';
        valid = false;
    }
    if(!isEmail(form.value.email.value)){
        form.value.email.error.status = 'error';
        form.value.email.error.message = 'El formato del correo no es válido';
        valid = false;
    }
    if(form.value.phone.value === ''){
        form.value.phone.error.status = 'error';
        form.value.phone.error.message = 'El teléfono es requerido';
        valid = false;
    }
    if(!isValidPhoneNumber(form.value.phone.value)){
        form.value.phone.error.status = 'error';
        form.value.phone.error.message = 'El formato del teléfono no es válido (10 dígitos)';
        valid = false;
    }
    return valid;
}

const sub = (e) => {e.preventDefault();}

</script>

<style scoped>
</style>
  