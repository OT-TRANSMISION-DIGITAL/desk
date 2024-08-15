<template>
    <div class="flex justify-center mt-5">
      <form class="w-[35rem] max-w-4xl p-8 bg-white border-4 border-[#3E4095] rounded-md shadow-md"
        @submit="sub($event)"
      >
        <h2 class="mb-5 text-4xl font-bold text-center text-[#3E4095]">Editar Producto / Servicio</h2>
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
                    v-model="form.descripcion.value"
                    label="Descripcion"
                    placeholder="Descripcion"
                    name="descripcion"
                    :validation-status="form.descripcion.error.status"
                    :validation-message="form.descripcion.error.message"
                />
            </div>
            <div class="col-span-2">
                <Input 
                    v-model="form.precio.value"
                    label="Precio"
                    placeholder="Precio"
                    name="precio"
                    :validation-status="form.precio.error.status"
                    :validation-message="form.precio.error.message"
                    @keyup="form.precio.value = changuePrecio(form.precio.value)"
                />
            </div>
            <div class="col-span-2">
                <InputFile v-model="form.imagen.value" v-model:image-s-r-c="imageSRC" />
                <img ref="imgRef" alt="" class=""/>
                <p class="text-red-500 text-sm">{{ form.imagen.error.message }}</p>
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
import { updateProducto, producto, imagenProducto }  from '../../services/productos'
import Input from '../../components/Forms/Input.vue'
import Loading from '../../components/Forms/Loading.vue';
import InputFile from '../../components/Forms/InputImage.vue';
import axios from 'axios'
const router = useRouter();
const route = useRoute();
const imgRef =ref(null)
const loading = ref(false);
const imageSRC = ref('')
const beforeImagen = ref(null)
const form = ref({
    nombre: {
        value: '',
        error: {
            status: '',
            message: ''
        }
    },
    descripcion: {
        value: '',
        error: {
            status: '',
            message: ''
        }
    },
    precio: {
        value: '',
        error: {
            status: '',
            message: ''
        }
    },
    imagen: {
        value: '',
        error: {
            status: '',
            message: ''
        }
    }
})
const path_api = import.meta.env.VITE_IMG_URL;
const error = ref('');

const back = () => {
    router.push('/productos')
}
function changuePrecio(precio){
    // Elimina cualquier carácter que no sea un dígito o un punto
    precio = precio.replace(/[^0-9.]/g, '');

    // Asegura que solo haya un punto decimal
    const parts = precio.split('.');
    if (parts.length > 2) {
        precio = parts[0] + '.' + parts[1]; // Permite solo un punto decimal
    }

    // Limita la parte decimal a 2 dígitos
    if (parts[1] && parts[1].length > 2) {
        precio = parts[0] + '.' + parts[1].substring(0, 2);
    }
    return precio
}

const submit = async (e) => {
    if(!validar()) return;
    if(form.value.imagen.value && !validateFile(form.value.imagen.value)) return;
    e.preventDefault();
    loading.value = true;
    const data = {
        nombre: form.value.nombre.value,
        descripcion: form.value.descripcion.value,
        precio: form.value.precio.value
    }
    try {
        const res = await updateProducto(route.params.id, data);
        if(res.status < 300){
            if(form.value.imagen.value)
                sendImagen(res.data.Producto)
            else
                router.push('/productos')
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
    if(form.value.descripcion.value === ''){
        form.value.descripcion.error.status = 'error';
        form.value.descripcion.error.message = 'La descripcion es requerido';
        valid = false;
    }
    // validar descripcion mayor a 10
    if(form.value.descripcion.value.length < 10){
        form.value.descripcion.error.status = 'error';
        form.value.descripcion.error.message = 'Debe tener al menos 10 caracteres';
        valid = false;
    }
    if(form.value.precio.value === ''){
        form.value.precio.error.status = 'error';
        form.value.precio.error.message = 'El precio es requerido';
        valid = false;
    }
    return valid;
}

const sub = (e) => {e.preventDefault();}
onMounted(async()=>{
    try {
        const res = await producto(route.params.id)
        if(res.status < 300){
            form.value.descripcion.value = res.data.descripcion
            form.value.nombre.value = res.data.nombre
            form.value.precio.value = res.data.precio
            imageSRC.value = res.data.img ? path_api + res.data.img : ''
        }else{
            //console.log(res)
        }
    } catch (error) {
        console.error(error)
    }
})
function validateFile(file) {
    let valid = true
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSizeInBytes = 2048 * 1024;

    

    if (!allowedTypes.includes(file.type)) {
        form.value.imagen.error.value = 'El archivo debe ser tipo JPEG, PNG, or JPG.';
        valid = false;
    }

    if (file.size > maxSizeInBytes) {
        form.value.imagen.error.value = 'El máximo tamaño del archivo es 2048 KB.';
        valid = false;
    }

    return valid;
}
const sendImagen = async (id) => { 
    if(!validateFile(form.value.imagen.value))
        return;
    const formData = new FormData();
    formData.append('img', form.value.imagen.value);
    try {
        const resUpdateImagen = await imagenProducto(id, formData);
        if (resUpdateImagen.status < 300) {
            router.push('/productos')
        }else{
            error.value = resUpdateImagen?.data?.message || 'Error al guardar la imagen';
        }
    } catch (err) {
        console.error(err);
        error.value = err?.response?.data?.message || err?.data?.message || err?.message || 'Error al guardar la imagen';
    }
}
</script>

<style scoped>
</style>
  