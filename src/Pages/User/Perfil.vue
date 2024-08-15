<template>
    <div class="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="p-6">
            <div class="flex items-center space-x-7 relative z-0">
                <div class="rounded-full border p-2 overflow-hidden max-w-24 max-h-24 min-w-24 min-h-24 flex justify-center items-center">
                    <img v-if="usuario.img" :src="path_api+(usuario.img.replaceAll(/\\/g, ''))" alt="Imagen Usuario" width="100">
                    <svg v-if="!usuario.img" class="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 0H0v24h24V0z" fill="none" />
                        <path
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </div>
                <div class="absolute bottom-2 left-12 cursor-pointer" @click="isOpen = true;error= '';">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                        <path
                            d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                        <path
                            d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
                    </svg>

                </div>
                <div>
                    <div class="space-y-1">
                        <h2 class="text-xl font-bold">{{ usuario.nombre }}</h2>
                        <p class="text-gray-600">{{ usuario.correo }}</p>
                    </div>
                </div>
                <div class="absolute right-2 top-2 cursor-pointer tooltip z-[999]" @click="logOut">
                    <span class="tooltiptext">salir</span>
                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect width="33" height="33" fill="url(#pattern0_2689_66)"/>
                    <defs>
                    <pattern id="pattern0_2689_66" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_2689_66" transform="scale(0.01)"/>
                    </pattern>
                    <image id="image0_2689_66" width="100" height="100" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAABDtJREFUeAHtnTur1FAQx/8WFhY2auNH8PkNrKzE2g8hYmOtYqO1XLDxUdkJfhAVfIBY+gD9AAqCiq876OHuhjnJmWUmZ2cyC0s2k8mc+f/+yU2yu3cD5CMJJIEkkASSQBJIAkkgCSSBJJAEkkAS8E/gNID7AN4D+AHgj9Mn9U4aSMspj7bs2236BoBfTg0Y23BI03UApNHNg8wYExVh2TUvbtAuHXHPGG5EPwGc9GDKgwXsHcWcex4MoYNfaTj69K0HQzyfTUk3oO8eDJGK8p6/9Z54ByztPw3ZsmNUGpKGyLYB6S7vPV9Gp0O2d8DS/jsglg0pFeQ9X0anQ7Z3wNL+OyCWDSkV5D1fRqdDtnfA0v47IJYNKRXkPV9Gp0O2d8DS/jsglg0pFeQ9X0anQ7Z3wNL+OyCWDSkV5D1fRqdDtnfA0v47IJYNKRXkPV9C5xiA2wAeArgEYL9k5U1zvQOW9t/K6QyAr4N3qp8AONxaYNM8qSDv+a2cng7MKLpfWJtSBlrKtMUQ+lIdfW2oxuS5pSm1QaPGWwyhnA8jhhAbM1Oigq/pajXk4oQhZqbUGo8abzWE8m42mPISwBFJ0ancqOBruqZ4DJe3mqJ29lVrPGp8CLxlvsUUtbOvqOBruloM4HJmM6XWeNQ4B7s1NospUcHXdLXCr+WZm1JrPGq8BloSNzWlN/jXu/8H+BjAo5meFwBoPOnCcIod5RySOE25U0Wtln8GcE7arEK+lZ5aXTLloKTvWiHrOF0J93hY6+Lq70iEcgXmiB2VNKmYO4e24RifJP0PV55rfkmGfPRgCH0C1+Mx1wa3Oo6LP1lfAJzv4MgqqDleuzmoFxhv8rR3fbMsYJYyXVe/2dythsuFjd9sXIoRRedmFuytZWoGDVMaXcp0D638lbkZaUi7KbOYkYa0GTKbGWnItCGzmpGGjBsyuxlpSN2Qyw0nPHTRp/blhtLKUs6uis6ie2pKbwiWdbipiRnUFDdY5NiUEbScvuX+e4SNmRlpSN2eVxVDNr4Crw+1viTy3sBpW1dfnzsL4NvAlGcWx4xhC1zTkWND/WPz9AOhd/5/1n8FwIGxZK1lkeFz2rS4mdXhmo4cMwOpVTgyfE6bFjezOlzTkWNmILUKR4bPadPiZlaHazpyzAykVuHI8DltWtzM6nBNR46ZgdQqHBk+p02Lm1kdrunIMTOQWoUjw+e0aXEzq8M1HTlmBlKrcGT4nDYtbmZ1uKYjx8xAahWODJ/TpsXNrA7XdOSYGUitwnnLIy2SSnXeDT6mjLx3uLgpGN2eNLIJq9ruKm3EpmXoc+OxX09bFeT5NWk8YUpSsTjdK9Yz7JberyryMi9FvzFI94qNuKeQJjLD1c2Ji+N0r1i6PSkd/OgmjC1b3jbmUO+kgY4Zx4u4nCaBJJAEkkASSAJJIAkkgSSQBJJAEkgCSeAfgb/g6mbEaID1dQAAAABJRU5ErkJggg=="/>
                    </defs>
                    </svg>
                </div>
            </div>
            <div class="mt-10 mb-4">
                <h3 class="text-xl font-bold">Información</h3>
                <div class="mt-2  space-y-2">
                    <div class="flex text-left justify-stretch">
                        <p class="w-full">Estatus:</p>
                        <p class="w-full">{{ usuario.estatus ? 'Activo' : 'Inactivo' }}</p>
                    </div>

                    <div class="flex text-left justify-stretch">
                        <p class="w-full">Teléfono:</p>
                        <p class="w-full">{{ usuario.telefono }}</p>
                    </div>

                    <div class="flex text-left justify-stretch">
                        <p class="w-full">Rol:</p>
                        <p class="w-full">Administrador</p>
                    </div>
                </div>
            </div>
            <hr />
            <div class="mt-4">
                <h3 class="text-md font-bold">Configuración de Cuenta</h3>
                <div class="flex text-left justify-stretch">
                    <p class="w-full">Correo:</p>
                    <p class="w-full">{{ usuario.correo }}</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Update Image -->
    <div v-if="isOpen" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>

            <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start mb-4">
                        <h1 class="text-xl">Actualizar Imagen</h1>
                    </div>
                    <InputFile v-model="imagen" v-model:image-s-r-c="IMGSRC"/>
                    <div>
                        <span>
                            <p class="text-red-500">{{ error }}</p>
                        </span>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button @click="sendImagen" type="button"
                        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                        Actualizar
                    </button>
                    <button @click="() => { isOpen = false; imagen = null }" type="button"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { user, updateImagen } from '../../services/usuarios.js';
import InputFile from '../../components/Forms/InputImage.vue';
 import {useRouter} from 'vue-router'
 import {useGlobalState} from '../../store/User.js'
import axios from 'axios'
const router = useRouter()
const path_api = import.meta.env.VITE_IMG_URL;
const {establecerUsuario, state} = useGlobalState()
const imagen = ref(null)
const isOpen = ref(false)
const IMGSRC = ref('')
const error = ref(null)
const usuario = ref({
    id: 0,
    nombre: "",
    correo: "",
    telefono: "",
    estatus: 1,
    img: null,
    rol_id: 1,
});



function validateFile(file) {
    let valid = true
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSizeInBytes = 2048 * 1024;

    

    if (!allowedTypes.includes(file.type)) {
        error.value = 'El archivo debe ser tipo JPEG, PNG, or JPG.';
        valid = false;
    }

    if (file.size > maxSizeInBytes) {
        error.value = 'El máximo tamaño del archivo es 2048 KB.';
        valid = false;
    }

    return valid;
}

const sendImagen = async () => { 
    if(!validateFile(imagen.value))
        return;
    const formData = new FormData();
    formData.append('img', imagen.value);
    try {
        const resUpdateImagen = await updateImagen(usuario.value.id, formData);
        if (resUpdateImagen.status < 300) {
            establecerUsuario(resUpdateImagen.data)
            usuario.value = state.usuario
            isOpen.value = false;
            imagen.value = null;
            initComponent();
        }else{
            error.value = resUpdateImagen?.data?.message || 'Error al actualizar la imagen';
        }
    } catch (err) {
        console.error(err);
        error.value = err?.response?.data?.message || err?.data?.message || err?.message || 'Error al actualizar la imagen';
    }
    // isOpen = false; 
    // imagen = null; 
}
const initComponent = async () => {
    try {
        const userResponse = await user();
        if (userResponse.status < 300) {
            establecerUsuario(userResponse.data)
            usuario.value = state.usuario
        } else {
        }
    } catch (error) {
        console.error(error);
    }
}

async function logOut(){
    let res = null
    try {
        res = await axios.get('/logout')
        if (res.status < 300) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('login')
        }else{
        //console.log(res)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('login')
        }
    } catch (error) {
        console.error(error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('login')
    }
    }
onMounted(async () => {
    initComponent();
})


</script>

<style scoped></style>