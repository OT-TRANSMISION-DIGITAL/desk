<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ordenes, del, cancel, autorizar, pdf, orden } from '../../services/ordenes.js'
import Table from '../../components/Tables/Table.vue'
import Modal from '../../components/Modal.vue'
import Direcciones from '../../components/Maps/Direcciones.vue'
import { dmsToDecimal } from '../../global/Parser.js'
import { getCoords } from '../../services/maps.js'
const router = useRouter();
const headers = ['Solicitante', 'Dirección', 'Cliente', 'Técnico', 'Sucursal', 'Fecha de Solicitud', 'Estado'];
const columns = ['persona_solicitante', 'direccion', 'cliente_id', 'tecnico_id', 'sucursal_id', 'fechaHoraSolicitud', 'estatus'];
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
        if (res.status < 300) {
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
        if (res.status < 300) {
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
        if (res.status < 300) {
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
        if (res.status < 300) {
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
        if (res.status < 300) {
            ordenData.value = res.data
            
            if (ordenData.value.coorLlegada) {
                const splitLl = ordenData.value.coorLlegada.split(" ");
                ordenData.value.latLl = dmsToDecimal(splitLl[0]);
                ordenData.value.lngLl = dmsToDecimal(splitLl[1]);
            }
            if (ordenData.value.coorSalida) {
                const splitS = ordenData.value.coorSalida.split(" ");
                ordenData.value.latS = dmsToDecimal(splitS[0]);
                ordenData.value.lngS = dmsToDecimal(splitS[1]);
            }
            // get cord to direction
            try {
                const res = await getCoords(ordenData.value.direccion)
                if (res.status < 300 && res.data.status == 'OK') {
                    const cords = res.data?.results[0]?.geometry?.location
                    ordenData.value.latD = cords?.lat
                    ordenData.value.lngD = cords?.lng
                }
                isOpenModal.value = true
            } catch (error) {
                console.error(error)
            }
        } else {
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
            if (item.estatus == 'Sin Autorizar') {
                item['success'] = auto
                item['edit'] = edit
                item['cancel'] = cancelar
            } else if (item.estatus == 'Autorizada') {
                item['cancel'] = cancelar
                item['edit'] = edit
            } else if (item.estatus == 'Finalizada') {
                item['document'] = document
            }
            return item;
        });
        paginateData();
    } catch (error) {
        console.error(error);
    }
});

async function paginateData() {
    // Siclo para paginar la api mientrar traega resultados
    let page = 2;
    let res = await ordenes(page);
    let d = res.data.data;
    while (d.length > 0) {
        data.value = data.value.concat(d.map((item) => {
            // item['delete'] = deleted
            item.cliente_id = item.cliente.nombre;
            item.tecnico_id = item.tecnico.nombre;
            item.sucursal_id = item.sucursal?.nombre || '';
            item['show'] = show
            if (item.estatus == 'Sin Autorizar') {
                item['success'] = auto
                item['cancel'] = cancelar
                item['edit'] = edit
            } else if (item.estatus == 'Autorizada') {
                item['cancel'] = cancelar
                item['edit'] = edit
            } else if (item.estatus == 'Finalizada') {
                item['document'] = document
            }
            return item;
        }));
        page++;
        res = await ordenes(page);
        d = res.data.data;
    }
}

function convertirFecha(fechaOriginal) {
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
function ShowInMaps(data) {
    let urlMaps = 'https://www.google.com/maps/dir/'
    // Add ubicaciones to url map
    data.forEach((item) => {
        if (item.lat && item.lng) {
            urlMaps += `${item.lat},${item.lng}/`
        }
    })
    window.open(urlMaps, '_blank');
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
        <Table :columns="columns" :headers="headers" :data="data" btn-text="Agregar Orden" :btn-action="addUser" />
    </div>

    <!-- Modal -->

    <Modal v-model:isOpen="isOpenModal">
        <template v-slot:header>
            <h2 class="text-2xl font-bold">Orden: {{ ordenData?.id || '0' }}</h2>
            <p class="text-gray-500">Productos:</p>
            <ul class="mt-2 space-y-2 text-gray-500">
                <li class="flex items-center gap-2" v-for="data in (ordenData?.detalles || [])">
                    <!-- SVG icon directly included -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="h-5 w-5 text-blue-500">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {{ data.producto.nombre }}
                </li>
            </ul>
        </template>
        <template v-slot:body>
            <h2 class="text-2xl font-bold">Detalles de la Orden</h2>
            <div class="mt-4 grid grid-cols-2 gap-6">
                <div>
                    <div class="text-sm font-medium text-gray-500">Fecha de Solicitud</div>
                    <div class="text-lg font-bold">{{ convertirFecha(ordenData.fechaHoraSolicitud).split("\n")[0] }}
                    </div>
                </div>
                <div>
                    <div class="text-sm font-medium text-gray-500">Hora Solicitud</div>
                    <div class="text-lg font-bold">{{ convertirFecha(ordenData.fechaHoraSolicitud).split("\n")[1] }}
                    </div>
                </div>
                <div>
                    <div class="text-sm font-medium text-gray-500">Hora Llegada</div>
                    <div class="text-lg font-bold">{{ ordenData.fechaHoraLlegada ?
            convertirFecha(ordenData.fechaHoraLlegada).split("\n")[1] : '--:--' }}</div>
                    <div class="text-sm font-medium text-gray-500">Dirección Llegada</div>
                    <div class="text-lg font-bold">
                        <p>
                            <Direcciones 
                                :lat="ordenData.latLl"
                                :lng="ordenData.lngLl"
                            />
                        </p>
                    </div>
                </div>
                <div>
                    <div class="text-sm font-medium text-gray-500">Hora Salida</div>
                    <div class="text-lg font-bold">{{ ordenData.fechaHoraSalida ?
            convertirFecha(ordenData.fechaHoraSalida).split("\n")[1] : '--:--' }}</div>
                    <div class="text-sm font-medium text-gray-500">Dirección de Salida</div>
                    <div class="text-lg font-bold">
                        <p>
                                <Direcciones 
                                    :lat="ordenData.latS"
                                    :lng="ordenData.lngS"
                                />
                        </p>
                    </div>
                </div>
                <div>
                    <div class="text-sm font-medium text-gray-500">Cliente</div>
                    <div class="text-lg font-bold">{{ ordenData.cliente.nombre }}</div>
                </div>
                <div>
                    <div class="text-sm font-medium text-gray-500">Técnico</div>
                    <div class="text-lg font-bold">{{ ordenData.tecnico.nombre }} </div>
                </div>

                <div>
                    <div class="text-sm font-medium text-gray-500 flex gap-2 items-center">
                        <p>
                            Dirección
                        </p>
                        <!-- <label class="cursor-pointer tooltip z-[999]" @click="ShowInMaps([
                                {
                                    title: 'Dirección',
                                    lat: ordenData.latD,
                                    lng: ordenData.lngD
                                },
                                {
                                    lat: ordenData.latLl,
                                    lng: ordenData.lngLl,
                                    title: 'Llegada'
                                },
                                {
                                    lat: ordenData.latS,
                                    lng: ordenData.lngS,
                                    title: 'Salida'
                                }
                            ])">
                            <svg class="h-6 w-6 text-red-500" width="24" height="24" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="18" y2="6.01" />
                                <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" />
                                <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" />
                                <line x1="9" y1="4" x2="9" y2="17" />
                                <line x1="15" y1="15" x2="15" y2="20" />
                            </svg>
                        </label> -->
                    </div>
                    <div class="text-lg font-bold">{{ ordenData?.direccion || '' }} </div>
                </div>
                <div v-if="ordenData.sucursal">
                    <div class="text-sm font-medium text-gray-500">Sucursal</div>
                    <div class="text-lg font-bold">{{ ordenData.sucursal.nombre }} </div>
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

<style scoped></style>