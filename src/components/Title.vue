<template>
    <h1 :class="['text-gray-50',String(clasStyle || '').split(' '), 'mt-5', 'pl-4', 'text-5xl', 'font-bold']">
      {{ title || 'Titulo' }}
    </h1>
</template>

<script setup>
    import { defineProps } from 'vue';
    const props = defineProps(['title', 'clasStyle']);
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
</script>