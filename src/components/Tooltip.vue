<template>
    <fwb-tooltip class="">
      <template #trigger>
        <slot>
        </slot>
      </template>
      <template #content>
        {{ content }}
      </template>
    </fwb-tooltip>
  </template>
  
  <script setup>
  import { FwbButton, FwbTooltip } from 'flowbite-vue'
  import { defineProps } from 'vue';

  const {content} = defineProps([
    "content"
  ]);

  </script>