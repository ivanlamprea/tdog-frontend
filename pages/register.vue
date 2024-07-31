<template>
    <div class="content-login">
        <div class="section-bg">
            <div class="content-bg"></div>
            <div class="content-logos">
                <img id="LogoHuman" class="animate__animated animate__zoomIn" src="/img/logo-human.png">
                <h5 class="absolute bottom-8 mx-auto dark:text-lime-400">Developed by Ivan Lamprea 2024</h5>
            </div>
        </div>
        <div class="section-form">
            <img class="animate__animated animate__zoomIn max-w-72" src="/img/logo.png">
            <form @submit.prevent="register" class="my-8">
                <div class="flex items-center mx-2">
                    <input id="Name" placeholder="Nombre" type="text" v-model="user.name" class="bg-transparent text-pink-600 dark:text-white text-lg font-semibold border rounded-lg border-indigo-600 dark:border-lime-400 shadow-md shadow-indigo-300 dark:shadow-lime-300/30 p-2">
                </div>
                <br>
                <div class="flex items-center mx-2">
                    <input id="LastName" placeholder="Apellido" type="text" v-model="user.last_name" class="bg-transparent text-pink-600 dark:text-white text-lg font-semibold border rounded-lg border-indigo-600 dark:border-lime-400 shadow-md shadow-indigo-300 dark:shadow-lime-300/30 p-2">
                </div>
                <br>
                <div class="flex items-center mx-2">
                    <input id="Nick" placeholder="Nick" type="text" v-model="user.nick" class="bg-transparent text-pink-600 dark:text-white text-lg font-semibold border rounded-lg border-indigo-600 dark:border-lime-400 shadow-md shadow-indigo-300 dark:shadow-lime-300/30 p-2">
                </div>
                <br>
                <div class="flex items-center mx-2">
                    <input id="Email" placeholder="Email" type="email" v-model="user.email" class="bg-transparent text-pink-600 dark:text-white text-lg font-semibold border rounded-lg border-indigo-600 dark:border-lime-400 shadow-md shadow-indigo-300 dark:shadow-lime-300/30 p-2">
                </div>
                <br>
                <div class="flex items-center mx-2">
                    <input id="Password" placeholder="Password" type="password" v-model="user.password" class="bg-transparent text-pink-600 dark:text-white text-lg font-semibold border rounded-lg border-indigo-600 dark:border-lime-400 shadow-md shadow-indigo-300 dark:shadow-lime-300/30 p-2">
                </div>
                <button class="flex bg-indigo-800 dark:bg-lime-400 font-bold text-lime-400 dark:text-indigo-950 py-2 px-3 mx-auto uppercase rounded-md my-8" type="submit">Enviar</button>
            </form>
            <NuxtLink to="/login" class="border-b border-indigo-950 dark:border-lime-400 text-indigo-900 dark:text-lime-300 [&.router-link-exact-active]:underline">Login</NuxtLink>
        </div>
    </div>
    <Toast />
</template>

<script setup lang="ts">
    import { onMounted } from 'vue'; 
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/store/auth.store';
    import { useToast } from "primevue/usetoast";
    const toast = useToast();

    definePageMeta({
        layout: 'auth-layout'
    })
    
    const { userRegistered } = useAuthStore();
    const { registered } = storeToRefs(useAuthStore());
        
    const user = ref({
        name: '',
        last_name: '',
        nick: '',
        email: '',
        password: ''
    });
    
    const register = async () => {
        await userRegistered(user.value);
        toast.add({ 
            severity: 'success',
            summary: 'Success Message',
            detail: 'Usuario Registrado Correctamente',
            life: 3000 
        });
    }

    /*********************************************** */
    /**********         Configs            ******** */
    useHead({
        title: 'Registro',
        link: [
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
            }
        ]
    });

    
    onMounted(() => {
        let pageLogin:any = document.querySelector('.content-login');
        let logoHuman:any = document.querySelector('#LogoHuman');
        logoHuman.addEventListener('animationend', () => {
            setTimeout(() => {
                pageLogin.classList.add('active');
            },1000);
        });

        logoHuman.classList.add('active');
    });
</script>