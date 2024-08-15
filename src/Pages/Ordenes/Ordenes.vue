<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ordenes, del, cancel, autorizar, pdf, orden }  from '../../services/ordenes.js'
import Table from '../../components/Tables/Table.vue'
import Modal from '../../components/Modal.vue'
const router = useRouter();
const headers = ['Solicitante','Dirección','Cliente', 'Técnico', 'Sucursal', 'Fecha de Solicitud', 'Estado'];
const columns = ['persona_solicitante','direccion','cliente_id', 'tecnico_id', 'sucursal_id', 'fechaHoraSolicitud','estatus'];
const data = ref([]);
const ordenData = ref(null)
const isOpenModal = ref(false)
const edit = (id) => {
    //console.log('Editando', id);
    router.push(`/ordenes/${id}`);
}
const cancelar = async (id) => {
    try {
        const res = await cancel(id);
        if(res.status < 300){
            //console.log('Cancelado', id);
            location.reload();
        }
    } catch (error) {
        console.error(error);
    }
}
const auto = async (id) => {
    try {
        const res = await autorizar(id);
        if(res.status < 300){
            //console.log('Autorizado', id);
            location.reload();
        }
    } catch (error) {
        console.error(error);
    }
}
const deleted = async (id) => {
    try {
        const res = await del(id);
        if(res.status < 300){
            //console.log('Eliminado', id);
            location.reload();
        }
    } catch (error) {
        console.error(error);
    }
}
const document = async (id) => {
    try {
        const res = await pdf(id);
        if(res.status < 300){
            //console.log(res);
            const file = new Blob([res.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');

        }
    } catch (error) {
        console.error(error);
    }
}
const show = async (id) => {
    try {
        const res = await orden(id)
        if(res.status < 300){
            ordenData.value = res.data
            isOpenModal.value = true
        }else{
            //console.log(res)
        }
    } catch (error) {
        console.error(error)
    }
}
const addUser = () => {
    router.push('/ordenes/crear');
}

onMounted(async () => {
    try {
        const res = await ordenes();
        const d = res.data.data;
        //console.log(d)
        data.value = d.map((item) => {
            // item['delete'] = deleted
            item.cliente_id = item.cliente.nombre;
            item.tecnico_id = item.tecnico.nombre;
            item.sucursal_id = item.sucursal?.nombre || '';
            item['show'] = show
            if(item.estatus == 'Sin Autorizar'){
                item['success'] = auto
                item['edit'] = edit
                item['cancel'] = cancelar
            }else if(item.estatus == 'Autorizada'){
                item['cancel'] = cancelar
                item['edit'] = edit
            }else if(item.estatus == 'Finalizada'){
                item['document'] = document
            }
            return item;
        });
        paginateData();
    } catch (error) {
        console.error(error);
    }
});

async function  paginateData() {
    // Siclo para paginar la api mientrar traega resultados
    let page = 2;
    let res = await ordenes(page);
    let d = res.data.data;
    while(d.length > 0){
        data.value = data.value.concat(d.map((item) => {
            // item['delete'] = deleted
            item.cliente_id = item.cliente.nombre;
            item.tecnico_id = item.tecnico.nombre;
            item.sucursal_id = item.sucursal?.nombre || '';
            item['show'] = show
            if(item.estatus == 'Sin Autorizar'){
                item['success'] = auto
                item['cancel'] = cancelar
                item['edit'] = edit
            }else if(item.estatus == 'Autorizada'){
                item['cancel'] = cancelar
                item['edit'] = edit
            }else if(item.estatus == 'Finalizada'){
                item['document'] = document
            }
            return item;
        }));
        page++;
        res = await ordenes(page);
        d = res.data.data;
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

<template>
    <div class="space-y-5">
        <div class="flex justify-end mr-5">
            <!-- <fwb-button gradient="blue" shadow="dark" 
            @click="addUser"
            >
                Agregar Usuario
            </fwb-button> -->
        </div>
        <Table 
            :columns="columns"
            :headers="headers"
            :data="data"
            btn-text="Agregar Orden"
            :btn-action="addUser"
        />
    </div>

    <!-- Modal -->
    
    <Modal  v-model:isOpen="isOpenModal">
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
                <div class="text-sm font-medium text-gray-500">Fecha de Solicitud</div>
                <div class="text-lg font-bold">{{ convertirFecha(ordenData.fechaHoraSolicitud).split("\n")[0] }}</div>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-500">Hora Solicitud</div>
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
                <div class="text-sm font-medium text-gray-500">Técnico</div>
                <div class="text-lg font-bold">{{ ordenData.tecnico.nombre }} </div>
              </div>
            </div>
        </template>
        <template v-slot:footer>
          <div class="flex float-end">
            <button @click="()=>{isOpenModal = false}" class="bg-gray-200 text-gray-500 py-2 px-4 rounded">
            Cerrar
          </button>
          </div>
        </template>
    </Modal>
</template>

<style scoped>

</style>