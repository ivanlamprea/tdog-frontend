import { defineStore } from 'pinia';

export const useBreedStore = defineStore('breed', {
    state: () => ({
        list_breed: []
    }),
    actions: {
        async listBreed() {
            const config = useRuntimeConfig();
            const token:any = useCookie('token');

            const { data } : any = await useFetch(`${config.public.API_URL}api/breed/list/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.value
                }
            });
            if(data.value) {
                this.list_breed = data.value['breeds'];
            }
        }
    }
})