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
            <form @submit.prevent="login" class="my-8">
                <div class="flex items-center mx-2">
                    <input id="email" placeholder="Email" type="email" v-model="user.email" class="bg-transparent text-pink-600 dark:text-white text-lg font-semibold border rounded-lg border-indigo-600 dark:border-lime-400 shadow-md shadow-indigo-300 dark:shadow-lime-300/30 p-2">
                </div>
                <br>
                <div class="flex items-center mx-2">
                    <input id="password" placeholder="Password" type="password" v-model="user.password" class="bg-transparent text-pink-600 dark:text-white text-lg font-semibold border rounded-lg border-indigo-600 dark:border-lime-400 shadow-md shadow-indigo-300 dark:shadow-lime-300/30 p-2">
                </div>
                <button class="flex bg-indigo-800 dark:bg-lime-400 font-bold text-lime-400 dark:text-indigo-950 py-2 px-3 mx-auto uppercase rounded-md my-8" type="submit">Iniciar sesión</button>
            </form>
            <NuxtLink to="/register" class="border-b border-indigo-950 dark:border-lime-400 text-indigo-900 dark:text-lime-300 [&.router-link-exact-active]:underline">Registrate</NuxtLink>
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
    
    const { authenticateUser } = useAuthStore();
    const { authenticated } = storeToRefs(useAuthStore());
        
    const user = ref({
        email: '',
        password: ''
    });
    
    const login = async () => {
        await authenticateUser(user.value);
        if(authenticated.value) {
            navigateTo('/dashboard')
        }
        else {
            toast.add({ 
                severity: 'warn',
                summary: 'Campos incorrectos',
                detail: 'El usuario o contraseña es incorrecto',
                life: 3000 
            });
        }
    }

    /*********************************************** */
    /**********         Configs            ******** */
    useHead({
        title: 'Login',
        link: [
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
            }
        ],
        script: [
            {
                src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
            },
            {
                src: 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js'
            }
        ]
    });

    
    onMounted(() => {
        let pageLogin:any = document.querySelector('.content-login');
        let logoHuman:any = document.querySelector('#LogoHuman');
        let sloganHuman: any = document.querySelector('#SloganHuman');
        logoHuman.addEventListener('animationend', () => {
            setTimeout(() => {
                pageLogin.classList.add('active');
            },1000);
        });

        logoHuman.classList.add('active');
    });
</script>