<template>
    <div class="flex justify-center mt-5">
      <form class="w-auto max-w-4xl p-8 bg-white border-4 border-[#3E4095] rounded-md shadow-md"
        @submit="sub($event)"
      >
        <h2 class="mb-7 text-4xl font-bold text-center text-[#3E4095]">Registrar Usuario</h2>
        <div class="grid grid-cols-2 gap-10 mt-5">
            <Input 
                label="Nombre"
                placeholder="Nombre"
                type="text"
                name="nombre"
                v-model="form.nombre.value"
                :validation-status="form.nombre.error.status"
                :validation-message="form.nombre.error.message"
            />
            <Input 
                label="Correo"
                placeholder="Correo"
                type="email"
                name="email"
                v-model="form.email.value"
                :validation-status="form.email.error.status"
                :validation-message="form.email.error.message"
            />
            <Input 
                label="Teléfono"
                placeholder="Teléfono"
                type="text"
                name="phone"
                v-model="form.phone.value"
                :validation-status="form.phone.error.status"
                :validation-message="form.phone.error.message"
                @keyup="form.phone.value = formatPhoneNumber(form.phone.value)"
            />
            <div class="">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol</label>
                <select v-model="form.rol.value"
                id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Elija una opción</option>
                    <option v-for="rol in roles" :value="rol.id">{{ rol.nombre }}</option>
                </select>
                <p class="text-red-500 text-sm" v-if="form.rol.error.status === 'error'">{{ form.rol.error.message }}</p>

            </div>
        </div>
        <!-- Span Error general API -->
        <div class="flex justify-center items-center" v-if="error">
            <p class="text-red-500 text-sm">{{ error }}</p>
        </div>
        <div class="flex justify-end mt-16 space-x-8">
            <button @click="back"
            class="border border-[#FF0000] rounded-2xl py-1 px-6 bg-white hover:bg-[#FF0000] hover:text-white">
                Cancelar
            </button>
            <button @click="submit"
            class="border border-[#3E4095] rounded-2xl py-1 px-8 bg-white hover:bg-[#3E4095] hover:text-white">
                Crear
            </button>
        </div>
      </form>
    </div>
  </template>
  
<script setup>
import {ref, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { editarUsuario, user, usuario } from '../../services/usuarios.js'
import {roles as GetRoles} from '../../services/roles.js'
import Input from '../../components/Forms/Input.vue'
import { formatPhoneNumber, isEmail, isPassword, isValidPhoneNumber } from '../../global/Validators.js'
const router = useRouter();
const route = useRoute()
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
    
    },
    rol: {
        value: '',
        error: {
            status: '',
            message: ''
        }
    }
})

const back = () => {
    router.push('/usuarios')
}

const submit = async (e) => {
    if(!validar()) return;
    e.preventDefault();
    const data = {
        nombre: form.value.nombre.value,
        correo: form.value.email.value,
        telefono: form.value.phone.value.replaceAll("-", ''),
        rol_id: form.value.rol.value,
    }
    try {
        const res = await editarUsuario(route.params.id,data);
        if(res.status < 300){
            router.push('/usuarios')
        }
    } catch (error) {
        console.error(error);
    }
}

const validar = ()=>{
    let valid = true;
    if(form.value.nombre.value === ''){
        form.value.nombre.error.status = 'error';
        form.value.nombre.error.message = 'El nombre es requerido';
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
        form.value.phone.error.message = 'El formato del teléfono no es válido (Ejemplo: 123-456-7890)';
        valid = false;
    }
    if(form.value.rol.value === ''){
        form.value.rol.error.status = 'error';
        form.value.rol.error.message = 'El rol es requerido';
        valid = false;
    }
    return valid;
}

const roles = ref([]);
onMounted(async ()=>{
    try {
        const res = await GetRoles();
        if(res.status < 300){
            roles.value = res.data.roles;
        }
        const resUsuario = await usuario(route.params.id)
        if(res.status < 300){
            //console.log(resUsuario)
            form.value.email.value = resUsuario.data.correo
            form.value.nombre.value = resUsuario.data.nombre
            form.value.phone.value = formatPhoneNumber(resUsuario.data.telefono)
            form.value.rol.value = resUsuario.data.rol_id
        }
    } catch (error) {
        console.error(error);
    }
})

const sub = (e) => {e.preventDefault();}
</script>

<style scoped>
</style>
  