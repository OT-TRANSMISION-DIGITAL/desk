<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { visitas, del, autorizar, cancel }  from '../../services/visitas.js'
import Table from '../../components/Tables/Table.vue'
const router = useRouter();
const headers = ['Motivo','Dirección','Cliente', 'Técnico', 'Sucursal', 'Fecha', 'Estado'];
const columns = ['motivo','direccion','cliente_id', 'tecnico_id', 'sucursal_id', 'fechaHoraSolicitud','estatus'];
const data = ref([])
const edit = (id) => {
    console.log('Editando', id);
    router.push(`/visitas/${id}`);
}
const cancelar = async (id) => {
    try {
        const res = await cancel(id);
        if(res.status < 300){
            console.log('Cancelado', id);
            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}
const auto = async (id) => {
    try {
        const res = await autorizar(id);
        if(res.status < 300){
            console.log('Autorizado', id);
            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}
const deleted = async (id) => {
    try {
        const res = await del(id);
        if(res.status < 300){
            console.log('Eliminado', id);
            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}
const addUser = () => {
    router.push('/visitas/crear');
}

onMounted(async () => {
    try {
        const res = await visitas();
        const d = res.data.data;
        console.log(d)
        data.value = d.map((item) => {
            item['edit'] = edit
            item['delete'] = deleted
            item.cliente_id = item.cliente.nombre;
            item.tecnico_id = item.tecnico.nombre;
            item.sucursal_id = item.sucursal.nombre;
            if(item.estatus == 'Sin Autorizar'){
                item['cancel'] = cancelar
                item['success'] = auto
            }else if(item.estatus == 'Autorizada'){
                item['cancel'] = cancelar
            }
            return item;
        });
    } catch (error) {
        console.log(error);
    }
});

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
            btn-text="Agregar Visita"
            :btn-action="addUser"
        />
    </div>
</template>

<style scoped>

</style>