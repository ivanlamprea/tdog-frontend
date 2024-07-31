<style>
    .toggle-icon:before {
        content: "\e9c7";
    }

    :root[class="dark"] .toggle-icon:before {
        content: "\e9c8";
    }
</style>
<template>
    <button @click="toggleDarkMode" class="fixed z-[1000] bottom-8 right-8 h-8 w-8 rounded-full inline-flex justify-center items-center bg-gray-600 dark:bg-yellow-500  text-sky-200 dark:text-gray-800 transition-colors duration-200">
        <i class="pi toggle-icon" />
    </button>
</template>

<script setup lang="ts">
    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
    }
</script>