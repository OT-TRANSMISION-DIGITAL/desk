<template>
    <div class="mb-2 mt-0">
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione un Técnico</label>
        <select v-model="tecnico_id"
        @change="getAgenda($event.target.value)"
        id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected disabled>Elija una opción</option>
            <option v-for="rol in tecnicos" :value="rol.id">{{ rol.nombre }}</option>
        </select>
    </div>
    <Calendar
    :events="events"
    :actionCard="actionCard"
    />
    <!-- Modal Orden -->
    
    <Modal  v-model:isOpen="isOpenModalOrden">
        <template v-slot:header>
            <h2 class="text-2xl font-bold">Orden: {{ ordenData?.id || '0'  }}</h2>
            <p class="text-gray-500">Productos:</p>
            <ul class="mt-2 space-y-2 text-gray-500">
              <li class="flex items-center gap-2" v-for="data in (ordenData?.detalles || [])">
                <!-- SVG icon directly included -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-5 w-5 text-blue-500"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {{ data.producto.nombre }}
              </li>
            </ul>
        </template>
        <template v-slot:body>
            <h2 class="text-2xl font-bold">Detalles de la Orden</h2>
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div class="text-sm font-medium text-gray-500">Fecha</div>
                <div class="text-lg font-bold">{{ convertirFecha(ordenData.fechaHoraSolicitud).split("\n")[0] }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Hora</div>
                <div class="text-lg font-bold">{{ convertirFecha(ordenData.fechaHoraSolicitud).split("\n")[1] }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Hora Llegada</div>
                <div class="text-lg font-bold">{{ ordenData.fechaHoraLlegada ? convertirFecha(ordenData.fechaHoraLlegada).split("\n")[1] : '--:--' }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Hora Salida</div>
                <div class="text-lg font-bold">{{ ordenData.fechaHoraSalida ? convertirFecha(ordenData.fechaHoraSalida).split("\n")[1] : '--:--'}}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Cliente</div>
                <div class="text-lg font-bold">{{ ordenData.cliente.nombre }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Tecnico</div>
                <div class="text-lg font-bold">{{ ordenData.tecnico.nombre }} </div>
              </div>
            </div>
        </template>
        <template v-slot:footer>
          <div class="flex float-end">
            <button @click="()=>{isOpenModalOrden = false}" class="bg-gray-200 text-gray-500 py-2 px-4 rounded">
            Cerrar
          </button>
          </div>
        </template>
    </Modal>
    <!-- Modal Visita -->
    
    <Modal  v-model:isOpen="isOpenModalVisita">
        <template v-slot:header>
            <h2 class="text-2xl font-bold">Visita: {{ visitaData?.id || '0'  }}</h2>
            <h2 class="text-xl font-bold">Sucursal</h2>
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div class="text-sm font-medium text-gray-500">Nombre</div>
                <div class="text-lg font-bold">{{visitaData.sucursal.nombre }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Telefono</div>
                <div class="text-lg font-bold">{{ visitaData.sucursal.telefono }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Direccion</div>
                <div class="text-lg font-bold">{{ visitaData.sucursal.direccion }}</div>
              </div>
            </div>
        </template>
        <template v-slot:body>
            <h2 class="text-2xl font-bold">Detalles de la Visita</h2>
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div class="text-sm font-medium text-gray-500">Fecha</div>
                <div class="text-lg font-bold">{{ convertirFecha(visitaData.fechaHoraSolicitud).split("\n")[0] }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Hora</div>
                <div class="text-lg font-bold">{{ convertirFecha(visitaData.fechaHoraSolicitud).split("\n")[1] }}</div>
              </div>
              
              <div>
                <div class="text-sm font-medium text-gray-500">Hora Llegada</div>
                <div class="text-lg font-bold">{{ visitaData.fechaHoraLlegada ? convertirFecha(visitaData.fechaHoraLlegada).split("\n")[1] : '--:--' }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Hora Salida</div>
                <div class="text-lg font-bold">{{ visitaData.fechaHoraSalida ? convertirFecha(visitaData.fechaHoraSalida).split("\n")[1] : '--:--'}}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Cliente</div>
                <div class="text-lg font-bold">{{ visitaData.cliente.nombre }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Tecnico</div>
                <div class="text-lg font-bold">{{ visitaData.tecnico.nombre }} </div>
              </div>
            </div>
        </template>
        <template v-slot:footer>
          <div class="flex float-end">
            <button @click="()=>{isOpenModalVisita = false}" class="bg-gray-200 text-gray-500 py-2 px-4 rounded">
            Cerrar
          </button>
          </div>
        </template>
    </Modal>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import { agenda } from '../../services/agenda.js'
import Calendar from '../../components/Calendar.vue'
import { tecnicos as Tec } from '../../services/usuarios.js'
import { orden }  from '../../services/ordenes.js'
import { visita } from '../../services/visitas.js'
import Modal from '../../components/Modal.vue'
const events = ref([])
const tecnicos = ref([])
const ordenData = ref(null)
const visitaData = ref(null)
const isOpenModalOrden = ref(false)
const isOpenModalVisita = ref(false)
const tecnico_id = ref(null)
onMounted(async () => {
    try {
        const resTecnicos = await Tec()
        if(resTecnicos.status < 300){
            tecnicos.value = resTecnicos.data
            tecnico_id.value = tecnicos.value[0].id
            //console.log(tecnico_id.value)
            await getAgenda(tecnico_id.value)
        }
    } catch (error) {
        console.error(error)
    }
})
const getAgenda = async (id) => {
    events.value = []
    try {    
        // Get Vistas
        const resAgenda = await agenda({tecnico: Number(id), tipo: 'visitas'})
        if(resAgenda.status < 300){
            events.value = events.value.concat(resAgenda.data.map((item) => {
                // Separar data y hora
                const [date, time] = item.fechaHoraSolicitud.split(' ')
                return {
                    id: item.id,
                    date,
                    time,
                    title: 'Visitas | ' +item.estatus,
                    tipo: 'visitas',
                }
            }))
        }
        // Get Ordenes
        const resOrdenes = await agenda({tecnico: Number(id), tipo: 'ordenes'})
        if(resOrdenes.status < 300){
            events.value = events.value.concat(resOrdenes.data.map((item) => {
                // Separar data y hora
                const [date, time] = item.fechaHoraSolicitud.split(' ')
                return {
                    id: item.id,
                    date,
                    time,
                    tipo: 'ordenes',
                    title: 'Ordenes | ' +item.estatus,
                }
            }))
        }
    } catch (error) {
        console.error(error)   
    }
}

async function actionCard (event) {
    const {id, tipo} = event
    //console.log(event.id)
    if(tipo == 'ordenes'){
        await modalOrdenes(id)
    }
    else if(tipo == 'visitas'){
        await modalVisita(id)
    }
}
async function modalOrdenes(id) {
    try {
        const res = await orden(id)
        if(res.status < 300){
            ordenData.value = res.data
            isOpenModalOrden.value = true
        }else{
            //console.log(res)
        }
    } catch (error) {
        console.error(error)
    }
}
async function modalVisita(id) {
    try {
        const res = await visita(id)
        if(res.status < 300){
            visitaData.value = res.data
            isOpenModalVisita.value = true
        }else{
            //console.log(res)
        }
    } catch (error) {
        console.error(error)
    }
}

function convertirFecha(fechaOriginal){
    // Crear un objeto Date a partir de la cadena original
    const fecha = new Date(fechaOriginal);

    // Diccionario para traducir los meses al español
    const mesesEs = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Extraer la información
    const dia = fecha.getDate();
    const mes = mesesEs[fecha.getMonth()];
    const anio = fecha.getFullYear();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const periodo = horas >= 12 ? 'PM' : 'AM';
    const horas12 = horas % 12 || 12; // Convertir a formato 12 horas

    // Formatear la fecha y hora
    const fechaFormateada = `${dia} de ${mes}, ${anio}\n${horas12}:${minutos} ${periodo}`;
    return fechaFormateada

}
</script>
<style scoped>

</style>