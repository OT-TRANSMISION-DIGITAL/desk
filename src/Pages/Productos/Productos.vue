<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { productos, deleteProducto }  from '../../services/productos'
import Table from '../../components/Tables/Table.vue'
const router = useRouter();
const headers = ['Imagen','Nombre','Descripcion','Precio'];
const columns = ['img','nombre','descripcion','precio'];
const data = ref([])
const edit = (id) => {
    //console.log('Editando', id);
    router.push(`/productos/${id}`);
}
const deleted = async (id) => {
    try {
        const res = await deleteProducto(id);
        if(res.status < 300){
            //console.log('Eliminado', id);
            location.reload();
        }
    } catch (error) {
        console.error(error);
    }
}
const addUser = () => {
    router.push('/productos/crear');
}

const path_api = import.meta.env.VITE_IMG_URL;
onMounted(async () => {
    try {
        const res = await productos();
        const d = res.data.data;
        data.value = d.map((item) => {
            item['edit'] = edit
            item['delete'] = deleted
            item.precio = `$ ${parseFloat(item?.precio || 0).toFixed(2)}`
            item.img = item.img ? `<img src="${path_api+(item.img.replaceAll(/\\/g, ''))}" alt="Imagen Usuario" width="40" class="">`
            :
            `<p></p>`
            return item;
        });
        //console.log(d)
        paginateData();
    } catch (error) {
        console.error(error);
    }
});

async function paginateData(){
    // Siclo para paginar la api mientrar traega resultados
    let page = 2;
    let res = await productos(page);
    let d = res.data.data;
    while(d.length > 0){
        data.value = data.value.concat(d.map((item) => {
            item['edit'] = edit
            item['delete'] = deleted
            item.precio = `$ ${parseFloat(item?.precio || 0).toFixed(2)}`
            item.img = item.img ? `<img src="${path_api+(item.img.replaceAll(/\\/g, ''))}" alt="Imagen Usuario" width="40" class="">`
            :
            `<p></p>`
            return item;
        }));
        page++;
        res = await productos(page);
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
            btn-text="Agregar Producto / Servicio"
            :btn-action="addUser"
        />
    </div>
</template>

<style scoped>

</style>