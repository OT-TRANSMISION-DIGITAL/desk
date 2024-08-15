<template>
  <div class="flex">
    <SideBar />
    <div class="flex-1 relative">
      <router-view name="title" />
      <main class="w-full p-8 mt-5 bg-neutral-100 mb-18 relative h-[92%]">
        <router-view 
          name="default"
        />
      </main>
    </div>
    <!-- Create loading with Tailwond CSS and position absolute -->
    <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center" v-if="state.loading">
      <div class="bg-white p-5 rounded-lg">
        <div class="flex justify-center">
          <Loading :loading="state.loading" :clases="['w-20', 'h-20']"/>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Footer from '../layouts/Footer.vue'
import SideBar from '../layouts/SideBar.vue'
import Loading from '../components/Forms/Loading.vue'
import CrearUser from '../Pages/Usuarios/Crear.vue'
import CrearCliente from '../Pages/Clientes/Crear.vue'
import Users from '../Pages/Usuarios/Usuarios.vue'
import {useGlobalState} from '../store/Loading.js'
const { state } = useGlobalState()
</script>

<style>
@import 'tailwindcss/tailwind.css';
</style>
