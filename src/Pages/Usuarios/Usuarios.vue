<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usuarios, deleteUsuario }  from '../../services/usuarios.js'
import Table from '../../components/Tables/Table.vue'
const router = useRouter();
const headers = ['Nombre','Correo','Teléfono','Rol'];
const columns = ['nombre','correo','telefono','rol_id'];
const data = ref([])
const edit = (id) => {
    router.push('/usuarios/'+id);
}
const deleted = async (id) => {
    try {
        const res = await deleteUsuario(id);
        if(res.status < 300){
            //console.log('Eliminado', id);
            location.reload();
        }
    } catch (error) {
        console.error(error);
    }
}
const addUser = () => {
    router.push('/usuarios/crear');
}

onMounted(async () => {
    try {
        const res = await usuarios();
        const  d = res.data.data;
        d.map((item) => {
            item['edit'] = edit
            item['delete'] = deleted
            item.rol_id = item.rol.nombre;
            return item;
        });
        data.value = d;
        paginateData();
    } catch (error) {
        console.error(error);
    }
});

async function paginateData() {
    // Siclo para paginar la api mientrar traega resultados
    let page = 2;
    let res = await usuarios(page);
    let d = res.data.data;
    while(d.length > 0){
        data.value = data.value.concat(d.map((item) => {
            item['edit'] = edit
            item['delete'] = deleted
            item.rol_id = item.rol.nombre;
            return item;
        }));
        page++;
        res = await usuarios(page);
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
            btn-text="Agregar Usuario"
            :btn-action="addUser"
        />
    </div>
</template>

<style scoped>

</style>