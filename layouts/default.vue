<template>
    <div class="layout-default">
        <header>
            <Navbar/>
        </header>
        <main>
            <slot/>
        </main>
        <footer>
            <Footer/>
        </footer>
        <DarkToggle/>
    </div>
</template>
<script setup>
    useHead({
        titleTemplate: '%s - Tinder',
    })
</script>
