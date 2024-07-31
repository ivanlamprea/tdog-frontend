import { defineStore } from 'pinia';

export const useFollowStore = defineStore('follow', {
    state: () => ({
        follow_dog: null
    }),
    actions: {
        async followDog(id: string ) {
            const config = useRuntimeConfig();
            const token:any = useCookie('token');

            const { data } : any = await useFetch(`${config.public.API_URL}api/follow/match`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.value
                },
                body: { id }
            });

            if(data.value) {
                this.follow_dog = data.value;
            }
        }
    }
})