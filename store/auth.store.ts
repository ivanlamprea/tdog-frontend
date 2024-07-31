import { defineStore } from 'pinia';

interface LoginPayLoadInterface {
    email: string;
    password: string;
}

interface UserPayLoadInterface {
    name: string;
    last_name: string;
    nick: string;
    email: string;
    password: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
        registered: false,
    }),
    actions: {
        async authenticateUser({ email, password }: LoginPayLoadInterface) {
            const config = useRuntimeConfig();
            const profile = useProfile();
            const { data, pending, status, error } : any = await useFetch(`${config.public.API_URL}api/user/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: { email, password }
            });

            this.loading = pending;
  
            if(data.value) {
                const token = useCookie('token');
                const user = useCookie('user');
                token.value = data?.value?.token;
                user.value = JSON.stringify(data?.value?.user);
                profile.value = data?.value?.user;
                this.authenticated = true;
            }
            else {
                this.logUserOut()
            }
        },
        async userRegistered({ name, last_name, nick, email, password }: UserPayLoadInterface) {
            const config = useRuntimeConfig();
            const { data, pending, status, error } : any = await useFetch(`${config.public.API_URL}api/user/register/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: { name, last_name, nick, email, password }
            });
            if(data.value) {
                this.registered = data?.value;
            }
        },
        logUserOut() {
            const token = useCookie('token');
            const user = useCookie('user');
            this.authenticated = false;
            token.value = null;
            user.value = null;
        }

    }
})