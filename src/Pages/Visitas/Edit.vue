<template>
    <div class="flex justify-center mt-5">
      <form class="w-auto max-w-4xl p-8 bg-white border-4 border-[#3E4095] rounded-md shadow-md"
        @submit="sub($event)"
      >
        <h2 class="mb-12 text-4xl font-bold text-center text-[#3E4095]">Editar Visitas</h2>
        <div class="grid grid-cols-2 gap-10 mt-5">
            <div class="col-span-1">
                <Input 
                    v-model="form.motivo.value"
                    label="Motivo"
                    placeholder="Motivo"
                    type="text"
                    name="motivo"
                    id="motivo"
                    :validation-status="form.motivo.error.status"
                    :validation-message="form.motivo.error.message"
                />
            </div>
            <div class="col-span-1">
                <label for="countries"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione un
                        Técnico</label>
                    <select v-model="form.tecnico_id.value" id="countries"
                        @change="changueTime($event)"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected disabled>Elija una opción</option>
                        <option v-for="rol in tecnicos" :value="rol.id">{{ rol.nombre }}</option>
                    </select>
                    <!-- Mensaje de error -->
                    <span v-if="form.tecnico_id.error.status == 'error'" class="text-red-500 text-sm">{{
                form.tecnico_id.error.message }}</span>
            </div>
                <div class="col-span-1">
                    <Input v-model="form.fechaSolicitud.value" label="Fecha de solicitud"
                        placeholder="Fecha de solicitud" type="date" name="fechaHoraSolicitud" id="fechaHoraSolicitud"
                        :validation-status="form.fechaSolicitud.error.status"
                        :change="changueTime"
                        :min-date="new Date().toISOString().split('T')[0]"
                        :validation-message="form.fechaSolicitud.error.message" 
                        />
                </div>
                <div class="col-span-1">
                    <!-- <Input v-model="form.horaSolicitud.value" label="Hora de solicitud"
                        placeholder="Hora de solicitud" type="time" name="horaSolicitud" id="horaSolicitud"
                        :validation-status="form.horaSolicitud.error.status"
                        :validation-message="form.horaSolicitud.error.message"
                        :change="changueValidTime"
                        :disabled="disableTime" /> -->
                        <label for="countries"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione la hora de
                        solicitud</label>
                    <select v-model="form.horaSolicitud.value" id="countries"
                        :disabled="disableTime"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected disabled value="">00:00:00</option>
                        <option v-for="VT in timesValidates" :value="VT">{{ VT }}</option>
                    </select>
                    <!-- Mensaje de error -->
                    <span v-if="form.horaSolicitud.error.status == 'error'" class="text-red-500 text-sm">
                        {{form.horaSolicitud.error.message }}</span>

                </div>
            <!-- <div class="col-span-1">
                <Input 
                    v-model="form.fechaHoraLlegada.value"
                    label="Fecha de Llegada"
                    placeholder="Fecha de Llegada"
                    type="datetime-local"
                    id="fechaHoraLlegada"
                    name="fechaHoraLlegada"
                    :validation-status="form.fechaHoraLlegada.error.status"
                    :validation-message="form.fechaHoraLlegada.error.message"
                />
            </div>
            <div class="col-span-1">
                <Input 
                    v-model="form.fechaHoraSalida.value"
                    label="Fecha de Salida"
                    placeholder="Fecha de Salida"
                    type="datetime-local"
                    id="fechaHoraSalida"
                    name="fechaHoraSalida"
                    :validation-status="form.fechaHoraSalida.error.status"
                    :validation-message="form.fechaHoraSalida.error.message"
                />
            </div> -->
            <div class="col-span-1">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione un Cliente</label>
                <select v-model="form.cliente_id.value"
                @change="changeCliente($event.target.value)"
                id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected disabled>Elija una opción</option>
                    <option v-for="rol in clientes" :value="rol.id">{{ rol.nombre }}</option>
                </select>
                <!-- Mensaje de error -->
                <span v-if="form.cliente_id.error.status == 'error'" class="text-red-500 text-sm">{{ form.cliente_id.error.message }}</span>
            </div>
            <div class="col-span-1">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione una Sucursal</label>
                <select v-model="form.sucursal_id.value"
                id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected disabled>Elija una opción</option>
                    <option v-for="rol in sucursales" :value="rol.id">{{ rol.nombre }}</option>
                </select>
                <!-- Mensaje de error -->
                <span v-if="form.sucursal_id.error.status == 'error'" class="text-red-500 text-sm">{{ form.sucursal_id.error.message }}</span>
            </div>
            <div class="col-span-2">
                <Input 
                    v-model="form.direccion.value"
                    label="Dirección"
                    placeholder="Dirección"
                    type="text"
                    name="direccion"
                    id="direccion"
                    :validation-status="form.direccion.error.status"
                    :validation-message="form.direccion.error.message"
                />
            </div>
        </div>
        <div class="flex justify-end mt-8 space-x-8">
            <button @click="back"
            class="border border-[#FF0000] rounded-2xl py-1 px-6 bg-white hover:bg-[#FF0000] hover:text-white">
                Cancelar
            </button>
            <button @click="submit"
            class="border border-[#3E4095] rounded-2xl py-1 px-6 bg-white hover:bg-[#3E4095] hover:text-white">
                Editar
            </button>
        </div>
      </form>
    </div>
  </template>
  
<script setup>
import {ref, onMounted} from 'vue'
import { editar, visita } from '../../services/visitas.js'
import Input from '../../components/Forms/Input.vue'
import { clientes as clis } from '../../services/clientes.js'
import { tecnicos as tecs } from '../../services/usuarios.js'
import { useRoute, useRouter } from 'vue-router'
import {fechasTecnico} from '../../services/usuarios.js'
const route = useRoute()
const router = useRouter()
const clientes = ref([]);
const tecnicos = ref([]);
const sucursales = ref([]);
const initTime = ref(null);
const disableTime = ref(true);
const timesValidates = ref([]);

const form = ref({
    motivo: {
        value: '',
        error: {
            status: 'default',
            message: ''
        }
    },
    horaSolicitud: {
        value: '',
        error: {
            status: 'error',
            message: 'Por favor, seleccione un técnico y una fecha'
        }
    },
    fechaSolicitud: {
        value: '',
        error: {
            status: 'default',
            message: ''
        }
    },
    fechaHoraLlegada: {
        value: '',
        error: {
            status: 'default',
            message: ''
        }
    },
    fechaHoraSalida: {
        value: '',
        error: {
            status: 'default',
            message: ''
        }
    },
    direccion: {
        value: '',
        error: {
            status: 'default',
            message: ''
        }
    },
    cliente_id: {
        value: '',
        error: {
            status: 'default',
            message: ''
        }
    },
    tecnico_id: {
        value: '',
        error: {
            status: 'default',
            message: ''
        }
    },
    sucursal_id: {
        value: '',
        error: {
            status: 'default',
            message: ''
        }
    }
})

const back = () => {
    router.push('/visitas');
}

const submit = async (e) => {
    if(!validar()) return;
    e.preventDefault();
    const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        };
    const fechaHoraSolicitud = new Date(form.value.fechaSolicitud.value + 'T' + form.value.horaSolicitud.value);
    const data = {
        motivo: form.value.motivo.value,
        // Format date a Y-m-d H:i:s
        fechaHoraSolicitud: new Date(fechaHoraSolicitud).toLocaleDateString('en-ZA', options).split('.')[0].replace('T', ' ').replaceAll('/', '-').replace(',', ''),
        // fechaHoraSolicitud: new Date(form.value.fechaHoraSolicitud.value).toLocaleDateString('en-ZA', options).split('.')[0].replace('T', ' ').replaceAll('/', '-').replace(',', ''),
        fechaHoraLlegada: form.value.fechaHoraLlegada.value ? new Date(form.value.fechaHoraLlegada.value).toLocaleDateString('en-ZA', options).split('.')[0].replace('T', ' ').replaceAll('/', '-').replace(',', '') : null,
        fechaHoraSalida: form.value.fechaHoraSalida.value ? new Date(form.value.fechaHoraSalida.value).toLocaleDateString('en-ZA', options).split('.')[0].replace('T', ' ').replaceAll('/', '-').replace(',', '') : null,
        direccion: form.value.direccion.value,
        cliente_id: form.value.cliente_id.value,
        tecnico_id: form.value.tecnico_id.value,
        sucursal_id: form.value.sucursal_id.value
    }
    try {
        const res = await editar(route.params.id,data);
        if(res.status < 300){
            setTimeout(() => {
                router.push('/visitas');
            }, 3000);
        }
    } catch (error) {
        console.error(error);
    }
}

const validar = ()=>{
    let valid = true;
    // Validar requerido (Motivo, Fecha de solicitud, Dirección, Cliente, Técnico, Sucursal)
    if(form.value.motivo.value == ''){
        form.value.motivo.error.status = 'error';
        form.value.motivo.error.message = 'El campo es requerido';
        valid = false;
    }else{
        form.value.motivo.error.status = 'success';
        form.value.motivo.error.message = '';
    }
    /// Fecha de solicitud y hora de solicitud
    if(form.value.fechaSolicitud.value == ''){
        form.value.fechaSolicitud.error.status = 'error';
        form.value.fechaSolicitud.error.message = 'El campo es requerido';
        valid = false;
    }else{
        form.value.fechaSolicitud.error.status = 'success';
        form.value.fechaSolicitud.error.message = '';
    }
    if(form.value.horaSolicitud.value == ''){
        form.value.horaSolicitud.error.status = 'error';
        form.value.horaSolicitud.error.message = 'El campo es requerido';
        valid = false;
    }else{
        form.value.horaSolicitud.error.status = 'success';
        form.value.horaSolicitud.error.message = '';
    }
    if(form.value.direccion.value == ''){
        form.value.direccion.error.status = 'error';
        form.value.direccion.error.message = 'El campo es requerido';
        valid = false;
    }else{
        form.value.direccion.error.status = 'success';
        form.value.direccion.error.message = '';
    }
    // Dirección mayor a 10
    if(form.value.direccion.value != '' && form.value.direccion.value.length < 10){
        form.value.direccion.error.status = 'error';
        form.value.direccion.error.message = 'El campo debe tener al menos 10 caracteres';
        valid = false;
    }
    if(form.value.cliente_id.value == ''){
        form.value.cliente_id.error.status = 'error';
        form.value.cliente_id.error.message = 'El campo es requerido';
        valid = false;
    }else{
        form.value.cliente_id.error.status = 'success';
        form.value.cliente_id.error.message = '';
    }
    if(form.value.tecnico_id.value == ''){
        form.value.tecnico_id.error.status = 'error';
        form.value.tecnico_id.error.message = 'El campo es requerido';
        valid = false;
    }else{
        form.value.tecnico_id.error.status = 'success';
        form.value.tecnico_id.error.message = '';
    }
    return valid;
}

const changeCliente = (idCliente) =>{
    const cliente = clientes.value.find(c => c.id == idCliente);
    sucursales.value = cliente.sucursales;
}

const sub = (e) => {e.preventDefault();}

const changueTime = async () => {
    timesValidates.value = [];
    if(!form.value.tecnico_id.value || !form.value.fechaSolicitud.value){
        form.value.horaSolicitud.error.message = 'Por favor, seleccione un técnico y una fecha';
        return;
    }
    if(!form.value.tecnico_id.value){
        form.value.horaSolicitud.error.message = 'Por favor, seleccione un técnico';
        return;
    }
    if(!form.value.fechaSolicitud.value){
        form.value.horaSolicitud.error.message = 'Por favor, seleccione una fecha';
        return;
    }
    form.value.horaSolicitud.error.message = '';
    try {
        const res = await fechasTecnico(form.value.tecnico_id.value, form.value.fechaSolicitud.value);
        if(res.status < 300){
            timesValidates.value = res.data?.horarios;
            // Add init time si no esta en el array
            if(!timesValidates.value.includes(initTime.value)){
                timesValidates.value.push(initTime.value);
            }
            disableTime.value = false;
        }
    } catch (error) {
        console.error(error);
    }
}

onMounted(async ()=>{
    try {
        const resClientes = await clis();
        if(resClientes.status < 300){
            clientes.value = resClientes.data.data;
            //console.log(clientes.value);
        }
        const resTecnicos = await tecs();
        if(resTecnicos.status < 300){
            tecnicos.value = resTecnicos.data;
            //console.log(tecnicos.value);
        }
        const resVisita = await visita(route.params.id);
        //console.log(resVisita);
        if(resVisita.status < 300){
            form.value.motivo.value = resVisita.data.motivo;
            // form.value.fechaHoraSolicitud.value = resVisita.data.fechaHoraSolicitud;
            const fecha = resVisita.data.fechaHoraSolicitud
            const hora = fecha.split(' ')[1];
            form.value.fechaSolicitud.value = fecha.split(' ')[0];
            form.value.horaSolicitud.value = hora;
            initTime.value = hora;
            form.value.fechaHoraLlegada.value = resVisita.data.fechaHoraLlegada;
            form.value.fechaHoraSalida.value = resVisita.data.fechaHoraSalida;
            form.value.direccion.value = resVisita.data.direccion;
            form.value.cliente_id.value = resVisita.data.cliente_id;
            form.value.tecnico_id.value = resVisita.data.tecnico_id;
            form.value.sucursal_id.value = resVisita.data.sucursal_id;
            changeCliente(resVisita.data.cliente_id);
            await changueTime();
        }
    } catch (error) {
        console.error(error);
    }

})
</script>

<style scoped>
</style>
  