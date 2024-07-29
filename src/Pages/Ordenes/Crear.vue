<template>
    <div class="flex justify-center mt-5">
        <form class="w-auto max-w-4xl p-8 bg-white border-4 border-[#3E4095] rounded-md shadow-md"
            @submit="sub($event)">
            <h2 class="mb-12 text-4xl font-bold text-center text-[#3E4095]">Registrar Orden</h2>
            <div class="grid grid-cols-2 gap-10 mt-5">
                <div class="col-span-1">
                    <Input v-model="form.persona_solicitante.value" label="Nombre del solicitante"
                        placeholder="Nombre del solicitante" type="text" name="persona_solicitante"
                        id="persona_solicitante" :validation-status="form.persona_solicitante.error.status"
                        :validation-message="form.persona_solicitante.error.message" />
                </div>
                <div class="col-span-1">
                    <Input v-model="form.puesto.value" label="Puesto" placeholder="Puesto" type="text" name="puesto"
                        id="puesto" :validation-status="form.puesto.error.status"
                        :validation-message="form.puesto.error.message" />
                </div>
                <div class="col-span-1">
                    <Input v-model="form.fechaHoraSolicitud.value" label="Fecha de solicitud"
                        placeholder="Fecha de solicitud" type="datetime-local" name="fechaHoraSolicitud" id="fechaHoraSolicitud"
                        :validation-status="form.fechaHoraSolicitud.error.status"
                        :validation-message="form.fechaHoraSolicitud.error.message" />
                </div>
                <div class="col-span-1">
                    <Input v-model="form.fechaHoraLlegada.value" label="Fecha de Llegada" placeholder="Fecha de Llegada"
                        type="datetime-local" id="fechaHoraLlegada" name="fechaHoraLlegada"
                        :validation-status="form.fechaHoraLlegada.error.status"
                        :validation-message="form.fechaHoraLlegada.error.message" />
                </div>
                <div class="col-span-1">
                    <Input v-model="form.fechaHoraSalida.value" label="Fecha de Salida" placeholder="Fecha de Salida"
                        type="datetime-local" id="fechaHoraSalida" name="fechaHoraSalida"
                        :validation-status="form.fechaHoraSalida.error.status"
                        :validation-message="form.fechaHoraSalida.error.message" />
                </div>
                <div class="col-span-1">
                    <Input v-model="form.direccion.value" label="Dirección" placeholder="Dirección" type="text"
                        name="direccion" id="direccion" :validation-status="form.direccion.error.status"
                        :validation-message="form.direccion.error.message" />
                </div>
                <div class="col-span-1">
                    <label for="countries"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione un
                        Cliente</label>
                    <select v-model="form.cliente_id.value" @change="changeCliente($event.target.value)" id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected disabled>Elija una opción</option>
                        <option v-for="rol in clientes" :value="rol.id">{{ rol.nombre }}</option>
                    </select>
                    <!-- Mensaje de error -->
                    <span v-if="form.cliente_id.error.status == 'error'" class="text-red-500 text-sm">{{
                form.cliente_id.error.message }}</span>
                </div>
                <div class="col-span-1">
                    <label for="countries"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione una
                        Sucursal</label>
                    <select v-model="form.sucursal_id.value" id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected disabled>Elija una opción</option>
                        <option v-for="rol in sucursales" :value="rol.id">{{ rol.nombre }}</option>
                    </select>
                    <!-- Mensaje de error -->
                    <span v-if="form.sucursal_id.error.status == 'error'" class="text-red-500 text-sm">{{
                form.sucursal_id.error.message }}</span>
                </div>
                <div class="col-span-1">
                    <label for="countries"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione un
                        Técnico</label>
                    <select v-model="form.tecnico_id.value" id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected disabled>Elija una opción</option>
                        <option v-for="rol in tecnicos" :value="rol.id">{{ rol.nombre }}</option>
                    </select>
                    <!-- Mensaje de error -->
                    <span v-if="form.tecnico_id.error.status == 'error'" class="text-red-500 text-sm">{{
                form.tecnico_id.error.message }}</span>
                </div>
                <div class="col-span-1">
                    <!-- Modal toggle -->
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Detalles</label>
                    <button data-modal-target="default-modal" data-modal-toggle="default-modal"
                        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button" @click="showModal = !showModal">
                        Agregar Productos
                    </button>
                    <!-- Mensaje de error -->
                    <span v-if="form.detalles.error.status == 'error'" class="text-red-500 text-sm">{{
                form.detalles.error.message }}</span>
                </div>
            </div>
            <!-- Span Error general API -->
            <div class="flex justify-center items-center" v-if="error">
                <p class="text-red-500 text-sm">{{ error }}</p>
            </div>
            <div class="flex justify-end mt-8 space-x-8">
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
    <div class="absolute top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full"
        v-show="showModal">
        <div class="relative w-full max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div
                    class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                        Detalles de orden
                    </h3>
                    <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="extralarge-modal" @click="showModal = false">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5 space-y-4">

                    <div class="mt-5 gap-5 grid grid-cols-2 justify-center overflow-y-auto">
                        <div v-for="(detalle, index) in form.detalles.value" :key="index"
                            class="w-auto max-w-2xl p-8 border-4 border-[#3E4095] rounded-md shadow-md col-span-1">
                            <h2 class="mb-12 text-4xl font-bold text-center text-[#3E4095]">Detalle {{ (index+1) }}</h2>
                            <div class="grid grid-cols-2 gap-10 mt-5">
                                <div class="col-span-1">
                                    <Input v-model="detalle.cantidad.value"
                                        label="Cantidad" placeholder="Cantidad"
                                        type="number" name="cantidad" id="cantidad"
                                        :validation-status="detalle.cantidad.error.status"
                                        :validation-message="detalle.cantidad.error.message" />
                                </div>
                                <div class="col-span-1">
                                    <label for="productos"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione un
                                        Cliente</label>
                                    <select v-model="detalle.producto_id.value" id="countries"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected disabled>Elija una opción</option>
                                        <option v-for="rol in productos" :value="rol.id">{{ rol.nombre }}</option>
                                    </select>
                                    <!-- Mensaje de error -->
                                    <span v-if="detalle.producto_id.error.status == 'error'" class="text-red-500 text-sm">{{
                                detalle.producto_id.error.message }}</span>
                                </div>

                                <div class="col-span-2">
                                    <Input v-model="detalle.descripcion.value" label="Descripción" placeholder="Descripción"
                                        type="text" name="descripcion" id="descripcion"
                                        :validation-status="detalle.descripcion.error.status"
                                        :validation-message="detalle.descripcion.error.message" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Modal footer -->
                    <div
                        class="flex items-center justify-between p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                        <div class="space-x-10">
                            <button data-modal-hide="extralarge-modal" type="button"
                                class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                                @click="showModal = false">Aceptar</button>
                            <button data-modal-hide="extralarge-modal" type="button"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                @click="addDetalle">Agregar</button>
                        </div>
                        <div>
                            <button data-modal-hide="extralarge-modal" type="button"
                                class="py-2.5 px-5 ms-3 text-sm font-medium bg-red-700 
                                hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-white rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                @click="showModal = false">Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div> 
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { crear } from '../../services/ordenes.js'
import Input from '../../components/Forms/Input.vue'
import { clientes as clis } from '../../services/clientes.js'
import { tecnicos as tecs } from '../../services/usuarios.js'
import { productos as prods } from '../../services/productos.js'
const router = useRouter();

const showModal = ref(false);

const clientes = ref([]);
const tecnicos = ref([]);
const sucursales = ref([]);
const productos = ref([]);

const form = ref({
    persona_solicitante: {
        value: '',
        error: {
            status: 'default',
            message: ''
        }
    },
    puesto: {
        value: '',
        error: {
            status: 'default',
            message: ''
        }
    },
    fechaHoraSolicitud: {
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
    },
    detalles: {
        value: [
        {
            cantidad: {
                value: '1',
                error: {
                    status: 'default',
                    message: ''
                }
            },
            descripcion: {
                value: '',
                error: {
                    status: 'default',
                    message: ''
                }
            },
            producto_id: {
                value: '',
                error: {
                    status: 'default',
                    message: ''
                }
            }
        },
    ],
        error: {
            status: 'default',
            message: ''
        }
    }
})

const back = () => {
    router.push('/ordenes')
}

const error = ref('');
const submit = async (e) => {
    console.log(form.value);
    if (!validar()) return;
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
    const data = {
        // Format date a Y-m-d H:i:s
        fechaHoraSolicitud: new Date(form.value.fechaHoraSolicitud.value).toLocaleDateString('en-ZA', options).split('.')[0].replace('T', ' ').replaceAll('/', '-').replace(',', ''),
        fechaHoraLlegada: form.value.fechaHoraLlegada.value ? new Date(form.value.fechaHoraLlegada.value).toLocaleDateString('en-ZA', options).split('.')[0].replace('T', ' ').replaceAll('/', '-').replace(',', '') : null,
        fechaHoraSalida: form.value.fechaHoraSalida.value ? new Date(form.value.fechaHoraSalida.value).toLocaleDateString('en-ZA', options).split('.')[0].replace('T', ' ').replaceAll('/', '-').replace(',', '') : null,
        persona_solicitante: form.value.persona_solicitante.value,
        puesto: form.value.puesto.value,
        direccion: form.value.direccion.value,
        cliente_id: form.value.cliente_id.value,
        tecnico_id: form.value.tecnico_id.value,
        sucursal_id: form.value.sucursal_id.value,
        detalles: form.value.detalles.value.map(detalle => ({
            cantidad: detalle.cantidad.value,
            descripcion: detalle.descripcion.value,
            producto_id: detalle.producto_id.value
        }))
    }
    try {
        const res = await crear(data);
        if (res.status < 300) {
            setTimeout(() => {
                router.push('/ordenes')
            }, 3000);
        }
    } catch (error) {
        console.log(error);
        error.value = err.response.data.message || err.response.data.msg || 'Error en el servidor al iniciar sesión';
    }
}

const validar = () => {
    let valid = true;
    // Validar requerido (Nombre solicitante, Fecha de solicitud, Dirección, Cliente, Técnico, Sucursal, Puesto, Mínimo 1 detalle)
    if (!form.value.persona_solicitante.value) {
        form.value.persona_solicitante.error.status = 'error';
        form.value.persona_solicitante.error.message = 'El campo es requerido';
        valid = false;
    } else {
        form.value.persona_solicitante.error.status = 'success';
        form.value.persona_solicitante.error.message = '';
    }
    if (!form.value.fechaHoraSolicitud.value) {
        form.value.fechaHoraSolicitud.error.status = 'error';
        form.value.fechaHoraSolicitud.error.message = 'El campo es requerido';
        valid = false;
    } else {
        form.value.fechaHoraSolicitud.error.status = 'success';
        form.value.fechaHoraSolicitud.error.message = '';
    }
    if (!form.value.direccion.value) {
        form.value.direccion.error.status = 'error';
        form.value.direccion.error.message = 'El campo es requerido';
        valid = false;
    } else {
        form.value.direccion.error.status = 'success';
        form.value.direccion.error.message = '';
    }
    if (!form.value.cliente_id.value) {
        form.value.cliente_id.error.status = 'error';
        form.value.cliente_id.error.message = 'El campo es requerido';
        valid = false;
    } else {
        form.value.cliente_id.error.status = 'success';
        form.value.cliente_id.error.message = '';
    }
    if (!form.value.tecnico_id.value) {
        form.value.tecnico_id.error.status = 'error';
        form.value.tecnico_id.error.message = 'El campo es requerido';
        valid = false;
    } else {
        form.value.tecnico_id.error.status = 'success';
        form.value.tecnico_id.error.message = '';
    }
    if (!form.value.sucursal_id.value) {
        form.value.sucursal_id.error.status = 'error';
        form.value.sucursal_id.error.message = 'El campo es requerido';
        valid = false;
    } else {
        form.value.sucursal_id.error.status = 'success';
        form.value.sucursal_id.error.message = '';
    }
    if (!form.value.puesto.value) {
        form.value.puesto.error.status = 'error';
        form.value.puesto.error.message = 'El campo es requerido';
        valid = false;
    } else {
        form.value.puesto.error.status = 'success';
        form.value.puesto.error.message = '';
    }
    if (form.value.detalles.value.length < 1) {
        form.value.detalles.error.status = 'error';
        form.value.detalles.error.message = 'Debe agregar al menos un detalle';
        valid = false;
    } else {
        form.value.detalles.error.status = 'success';
        form.value.detalles.error.message = '';
    }
    // Validar detalles
    form.value.detalles.value.forEach((detalle, index) => {
        if (!detalle.cantidad.value) {
            detalle.cantidad.error.status = 'error';
            detalle.cantidad.error.message = 'El campo es requerido';
            form.value.detalles.error.status = 'error';
            form.value.detalles.error.message = 'Falta llenar campos';
            valid = false;
        } else {
            detalle.cantidad.error.status = 'success';
            detalle.cantidad.error.message = '';
            form.value.detalles.error.status = 'success';
            form.value.detalles.error.message = '';
        }
        if (!detalle.descripcion.value) {
            detalle.descripcion.error.status = 'error';
            detalle.descripcion.error.message = 'El campo es requerido';
            form.value.detalles.error.status = 'error';
            form.value.detalles.error.message = 'Falta llenar campos';
            valid = false;
        } else {
            detalle.descripcion.error.status = 'success';
            detalle.descripcion.error.message = '';
            form.value.detalles.error.status = 'success';
            form.value.detalles.error.message = '';
        }
        if (!detalle.producto_id.value) {
            detalle.producto_id.error.status = 'error';
            detalle.producto_id.error.message = 'El campo es requerido';
            form.value.detalles.error.status = 'error';
            form.value.detalles.error.message = 'Falta llenar campos';
            valid = false;
        } else {
            detalle.producto_id.error.status = 'success';
            detalle.producto_id.error.message = '';
            form.value.detalles.error.status = 'success';
            form.value.detalles.error.message = '';
        }
    });
    return valid;
}

const changeCliente = (idCliente) => {
    const cliente = clientes.value.find(c => c.id == idCliente);
    sucursales.value = cliente.sucursales;
}
const addDetalle = () =>{
    form.value.detalles.value.push({
        cantidad: {
            value: '1',
            error: {
                status: 'default',
                message: ''
            }
        },
        descripcion: {
            value: '',
            error: {
                status: 'default',
                message: ''
            }
        },
        producto_id: {
            value: '',
            error: {
                status: 'default',
                message: ''
            }
        }
    });
}

const sub = (e) => { e.preventDefault(); }


onMounted(async () => {
    try {
        const resClientes = await clis();
        if (resClientes.status < 300) {
            clientes.value = resClientes.data.data;
            console.log(clientes.value);
        }
        const resTecnicos = await tecs();
        if (resTecnicos.status < 300) {
            tecnicos.value = resTecnicos.data;
            console.log(tecnicos.value);
        }
        const resProductos = await prods();
        if (resProductos.status < 300) {
            productos.value = resProductos.data.data;
            console.log(productos.value);
        }
    } catch (error) {
        console.log(error);
    }

})
</script>

<style scoped></style>