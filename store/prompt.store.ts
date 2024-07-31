import { defineStore } from 'pinia';

export const usePromptStore = defineStore('prompt', {
    state: () => ({
        prompts: [],
        loadingPrompts: false,
    }),
    actions: {
        async getAllPrompts() {
            const config = useRuntimeConfig();
            const { data, pending, status, error } : any = await useFetch(`${config.public.API_URL}api/prompt/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            this.loadingPrompts = pending;
            
            if(data.value) {
                this.prompts = data.value.results;
                this.loadingPrompts = false;
            }
        }
    }
})