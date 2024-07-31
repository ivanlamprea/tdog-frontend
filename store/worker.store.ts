import { defineStore } from 'pinia';

export const useWorkerStore = defineStore('worker', {
    state: () => ({
        workers: [],
        loadingWorkers: false,
    }),
    actions: {
        async getAllWorkers() {
            const config = useRuntimeConfig();
            const { data, pending, status, error } : any = await useFetch(`${config.public.API_URL}api/worker/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            this.loadingWorkers = pending;
            
            if(data.value) {
                this.workers = data.value.results;
                this.loadingWorkers = false;
            }
        }
    }
})