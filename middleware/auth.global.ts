import { useAuthStore } from '~/store/auth.store';

export default defineNuxtRouteMiddleware((to) => {
    const { authenticated } = storeToRefs(useAuthStore())
    const token = useCookie('token');
    
    if(token.value) {
        authenticated.value = true;
    }

    if(token.value && to?.name === 'index') {
        abortNavigation();
        return navigateTo('/dashboard');
    }

    if(token.value && to?.name === 'login') {
        return navigateTo('/dashboard');
    }

    if(token.value && to?.name === 'register') {
        return navigateTo('/dashboard');
    }
    
    if(!token.value && to?.name !== 'login' && to?.name !== 'register' ) {
        abortNavigation();
        return navigateTo('/login')
    }
    
});