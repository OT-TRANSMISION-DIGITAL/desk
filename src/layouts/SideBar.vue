<template>
  <div class="flex flex-col w-72 h-dvh px-4 py-4 bg-neutral-50 border-r-4 text-black border-[#3E4095]">
    <div class="flex flex-col items-center mt-3">
      <img
        class="w-24 h-24 rounded-full"
        src="https://via.placeholder.com/150"
        alt="User Avatar"
      />
      <h4 class="mt-2 mb-4 text-lg font-semibold text-black">{{ name }}</h4>
      <button 
        @click="logOut"
      class="border border-[#3E4095] rounded-2xl py-1 px-6 bg-white hover:bg-[#3E4095] hover:text-white">
        Cerrar sesión
      </button>
    </div>
    <hr class="border-[#3E4095] mt-5 border-2" />
    <nav class="flex flex-col mt-5 space-y-4">
      <div class="flex items-center px-4 py-2 text-gray-400 rounded-md hover:bg-gray-200 hover:text-gray-700 cursor-pointer">
        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="49" height="49" fill="url(#pattern0_2359_457)"/>
        <defs>
        <pattern id="pattern0_2359_457" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_2359_457" transform="scale(0.0078125)"/>
        </pattern>
        <image id="image0_2359_457" width="128" height="128" xlink:href="data:image/png;base64,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"/>
        </defs>
        </svg>
        <RouterLink
          to="/ordenes"
          class="flex items-center px-4 py-2 text-gray-400 rounded-md hover:bg-gray-200 hover:text-gray-700">
          <span class="mx-4 font-medium uppercase">Ordenes de trabajo</span>
        </RouterLink>
      </div>
      <hr class="border-[#3E4095] my-10 border-2" />
      <div class="flex items-center px-4 py-2 text-gray-400 rounded-md hover:bg-gray-200 hover:text-gray-700 cursor-pointer">
        <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="43" height="43" fill="url(#pattern0_2359_458)"/>
        <defs>
        <pattern id="pattern0_2359_458" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_2359_458" transform="scale(0.0078125)"/>
        </pattern>
        <image id="image0_2359_458" width="128" height="128" xlink:href="data:image/png;base64,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"/>
        </defs>
        </svg>
        <RouterLink
          to="/visitas"
          class="flex items-center px-4 py-2 text-gray-400 rounded-md hover:bg-gray-200 hover:text-gray-700">
          <span class="mx-4 font-medium uppercase">Visitas</span>
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import axios from '../services/axios.js'
const name = ref('Sin nombre')
const router = useRouter()

onMounted(()=>{
  const user = JSON.parse(localStorage.getItem('user'))
  name.value = user?.nombre || 'Sin nombre'
})

const logOut = async () => {
  let res = null
  try {
    res = await axios.get('/logout')
    if (res.status < 300) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('login')
    }else{
      console.log(res)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('login')
    }
  } catch (error) {
    console.log(error)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('login')
  }
}

</script>

<style scoped>
</style>
