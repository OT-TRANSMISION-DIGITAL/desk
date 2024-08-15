<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { clientes, deleteCliente }  from '../../services/clientes'
import Table from '../../components/Tables/Table.vue'
const router = useRouter();
const headers = ['Nombre','Correo','Teléfono'];
const columns = ['nombre','correo','telefono'];
const data = ref([])
const edit = (id) => {
    //console.log('Editando', id);
    router.push(`/clientes/${id}`);
}
const deleted = async (id) => {
    try {
        const res = await deleteCliente(id);
        if(res.status < 300){
            //console.log('Eliminado', id);
            location.reload();
        }
    } catch (error) {
        console.error(error);
    }
}
const addUser = () => {
    router.push('/clientes/crear');
}

onMounted(async () => {
    try {
        const res = await clientes();
        const d = res.data.data;
        console.log(res.data);
        data.value = d.map((item) => {
            item['edit'] = edit
            item['delete'] = deleted
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
    let res = await clientes(page);
    let d = res.data.data;
    while(d.length > 0){
        data.value = data.value.concat(d.map((item) => {
            item['edit'] = edit
            item['delete'] = deleted
            return item;
        }));
        page++;
        res = await clientes(page);
        d = res.data.data;
    }   
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
            btn-text="Agregar Cliente"
            :btn-action="addUser"
        />
    </div>
</template>

<style scoped>

</style>