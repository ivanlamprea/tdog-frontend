<template>
    <div class="navbar">
        <img class="logo contrast-0 dark:contrast-200" src="/img/logo.png" />
        <ul class="main-menu" v-if="authenticated">
            <li>
                <NuxtLink to="/dashboard" class=" text-indigo-900 dark:text-lime-300 [&.router-link-exact-active]:underline">Search</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/pets" class=" text-indigo-900 dark:text-lime-300 [&.router-link-exact-active]:underline">My Pets</NuxtLink>
            </li>

            <li>
                <div class="flex flex-col items-center justify-end">
                    <NuxtLink :to="'/profile/'+profileState['id']" class="name text-indigo-900 dark:text-lime-400 font-bold flex items-center">
                        {{ profileState['nick'] }}
                        <img :src="pictureUrl+profileState['image']" class="cursor-pointer hover:opacity-50 w-10 h-10 ml-2 border-4 bg-black object-cover rounded-full" />
                    </NuxtLink >
                    
                </div>
            </li>
            <li>
                <NuxtLink @click="logout" class="text-indigo-900 dark:text-lime-400 text-sm">Salir</NuxtLink>
            </li>
           
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/store/auth.store'; 
    const config = useRuntimeConfig();
    const { logUserOut } = useAuthStore();
    const { authenticated } = storeToRefs(useAuthStore());

    const router = useRouter();
    
    const profileState = useProfile();
    const pictureUrl = ref(`${config.public.API_URL}api/user/avatar/`)
    
    /*********************************************** */
    /**********         Configs            ******** */
    const logout = () => {
        logUserOut();
        router.push('/login');
    }
</script>
