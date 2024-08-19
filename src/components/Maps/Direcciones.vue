<template>
    <p>{{ address }}</p>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import {getAddress} from '../../services/maps.js';

const props = defineProps({
    lat: Number,
    lng: Number,
});

const address = ref('');

const geocodeCoordinates = async (lat, lng) => {
    if(!lat || !lng) {
        address.value = 'No hay una dirección registrada.';
        return;
    }
    try {
        const response = await getAddress(lat, lng);
        if (response.status < 300 && response.data.results.length > 0) {
            address.value = response.data.results[0].formatted_address;
        } else {
            address.value = 'No hay una dirección registrada.';
        }
    } catch (error) {
        console.error('Error al obtener la dirección:', error);
        address.value = 'No hay una dirección registrada.';
    }
};

onMounted(() => {
    // geocodeCoordinates(25.517889, -103.351111); // Coordenadas de Cors1
    // geocodeCoordinates(25.517889, -103.351083); // Coordenadas de Cors2
    geocodeCoordinates(props?.lat, props?.lng); // Coordenadas de Cors2
});
</script>