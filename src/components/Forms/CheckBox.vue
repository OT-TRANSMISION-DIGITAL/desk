<script module>

</script>

<template>
    <div class="flex items-center space-x-3">
        <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-indigo-600 bg-gray-100 border-indigo-300 rounded focus:indigo-blue-500 dark:focus:indigo-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hover:border-indigo-400">
        <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            <slot name="text">
            </slot>
        </label>
    </div>
</template>

<style scoped>

</style>