import { defineStore } from 'pinia';

interface DogPayLoadInterface {
    name: string;
    age: number;
    breed: string;
    size: string;
    location_state: string;
    location_city: string;
    bio: string;
}

export const useDogStore = defineStore('dog', {
    state: () => ({
        get_dog: null,
        filter_dog: [],
        list_dog: [],
        created_dog: false,
        deleted_dog: false,
        uploaded_pictures: null
    }),
    actions: {
        async getDog(id: string) {
            const config = useRuntimeConfig();
            const token:any = useCookie('token');

            const { data } : any = await useFetch(`${config.public.API_URL}api/dog/view/${id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.value
                }
            });

            if(data.value) {
                this.get_dog = data.value;
            }
        },
        async filterDog () {
            const config = useRuntimeConfig();
            const token:any = useCookie('token');

            const { data } : any = await useFetch(`${config.public.API_URL}api/dog/search/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.value
                }
            });

            if(data.value) {
                this.filter_dog = data.value['dogs'];
            }
        },
        async listDog() {
            const config = useRuntimeConfig();
            const token:any = useCookie('token');

            const { data } : any = await useFetch(`${config.public.API_URL}api/dog/list/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.value
                }
            });

            if(data.value) {
                this.list_dog = data.value['dogs'];
            }
        },
        async createDog({ name, age, breed, size, location_state, location_city, bio } : DogPayLoadInterface ) {
            const config = useRuntimeConfig();
            const token:any = useCookie('token');

            const { data } : any = await useFetch(`${config.public.API_URL}api/dog/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.value
                },
                body: { name, age, breed, size, location_state, location_city, bio }
            });

            if(data.value) {
                this.created_dog = data.value;
            }
        },
        async deleteDog(id: string) {
            const config = useRuntimeConfig();
            const token:any = useCookie('token');

            const { data } : any = await useFetch(`${config.public.API_URL}api/dog/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.value
                }
            });

            if(data.value) {
                this.deleted_dog = data.value;
            }
        },
        async uploadPictures(id:any, _fileBody:any) {
            const config = useRuntimeConfig();
            const token:any = useCookie('token');
            
            const { data, refresh } : any = await useFetch(`${config.public.API_URL}api/dog/upload-pictures/${id}`, {
                method: 'POST',
                headers: {
                    /*'Content-Type': 'mutlipart/form-data'*/
                    'Authorization': token.value
                },
                body: _fileBody
            });

            if(data.value) {
                this.uploaded_pictures = data.value;
            }
        }
    }
})