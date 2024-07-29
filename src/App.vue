<script setup>
import { onMounted } from 'vue';
onMounted(() => {
    document.body.classList.remove('dark');
});
</script>

<template>
    <router-view />
</template>

<style scoped>

</style>
