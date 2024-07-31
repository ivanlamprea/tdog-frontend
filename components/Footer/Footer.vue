<template>
    <div class="copyright">
        Web site created by Ivan Lamprea - {{ currentYear }}
    </div>
</template>
<script setup lang="ts">
    const currentYear = new Date().getUTCFullYear();
</script>