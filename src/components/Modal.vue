<template>
  <div v-if="isOpen" class=" fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
    <div class="bg-white p-6 rounded shadow-lg max-w-6xl max-h-full overflow-y-auto">
      <div class="grid gap-6">
        <div>
          <slot name="header"></slot>
        </div>
        <hr class="my-2" />
        <div>
          <slot name="body"></slot>
        </div>
        <div class="mt-6 flex justify-between">
          <slot name="footer"></slot>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  }
}
</script>