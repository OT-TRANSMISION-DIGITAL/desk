<template>
  <div class="flex">
    <SideBar />
    <div class="flex-1">
      <router-view name="title" />
      <main class="w-full p-8 mt-5 bg-neutral-100 mb-18 relative h-[92%]">
        <router-view 
          name="default"
        />
      </main>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Footer from '../layouts/Footer.vue'
import SideBar from '../layouts/SideBar.vue'
</script>

<style>
@import 'tailwindcss/tailwind.css';
</style>
