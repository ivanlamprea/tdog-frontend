import { defineStore } from 'pinia';
interface ResponsePayLoadInterface {
    applyment_id: number;
    worker_id: number;
    assessment_id: number;
    responses: Array<any>;
}

export const useResponseStore = defineStore('response', {
    state: () => ({
        responsesData: [],
        loading: false,
        created: false,
        updated: false,
        loadingFile: false,
        fileData: {}
    }),
    actions: {
        async createMultiple({applyment_id, worker_id, assessment_id, responses}: any) {
            const config = useRuntimeConfig();
            const { data, pending, error } : any = await useFetch(`${config.public.API_URL}api/response/create_multiple/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: { applyment_id, worker_id, assessment_id, responses, }
            });

            this.loading = pending;
            if(data.value) {
                this.created = true;
            }
        },
        async updateMultiple({applyment_id, worker_id, assessment_id, responses}: any) {
            const config = useRuntimeConfig();
            const { data, pending, error } : any = await useFetch(`${config.public.API_URL}api/response/update_multiple/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: { applyment_id, worker_id, assessment_id, responses }
            });
            this.loading = pending;
            if(data.value) {
                this.updated = true;
            }
        },
        async uploadFile(_fileBody:any) {
            const config = useRuntimeConfig();
            const { data, pending } : any = await useFetch(`${config.public.API_URL}api/response_file/upload/`, {
                method: 'POST',
                headers: {  /*'Content-Type': 'mutlipart/form-data'*/ },
                body: _fileBody
            });

            this.loadingFile = pending;

            if(data.value) {
                this.fileData = data.value;
                this.loadingFile = true;
            }
        },

        async deleteFile(_fileBody:any) {
            const config = useRuntimeConfig();
            const { data, pending } : any = await useFetch(`${config.public.API_URL}api/response_file/delete/`, {
                method: 'DELETE',
                headers: {  /*'Content-Type': 'mutlipart/form-data'*/ },
                body: _fileBody
            });

            this.loadingFile = pending;

            if(data.value) {
                console.log('file Deleted');
            }
        },
        async getResponseByApplyment(id:number) {
            const config = useRuntimeConfig();
            const { data, pending } : any = await useFetch(`${config.public.API_URL}api/response/?applyment=${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            this.loading = pending;

            if(data.value) {
                this.responsesData = data.value.results;
                this.loading = true;
            }
        }
    } 
})