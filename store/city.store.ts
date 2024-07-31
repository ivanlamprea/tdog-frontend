import { defineStore } from 'pinia';

export const useCityStore = defineStore('city', {
    state: () => ({
        list_city: []
    }),
    actions: {
        async listCity() {
            const config = useRuntimeConfig();
            const token:any = useCookie('token');

            const { data } : any = await useFetch(`${config.public.API_URL}api/city/list/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.value
                }
            });
            if(data.value) {
                this.list_city = data.value['cities'];
            }
        }
    }
})