import { defineStore } from 'pinia';

interface UserEditPayLoadInterface {
    name: string;
    last_name: string;
    nick: string;
    email: string;
    bio: string;
}

export const useProfileStore = defineStore('profile', {
    state: () => ({
        picture: 'NULL',
        profile: {},
        loading: false,
        loadingFile: false,
        fileData: {},
        updatedProfile: {}
    }),
    actions: {
        async getPictureProfile(_file:string) {
            const config = useRuntimeConfig();
            const token:any = useCookie('token');

            const {data, pending, status, error } : any = await useFetch(`${config.public.API_URL}api/user/avatar/${_file}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.value
                }
            }); 
        
            if(data.value) {
                this.picture = data.value;
            }
        },
        async getProfile (id:string) {
            const config = useRuntimeConfig();
            const token:any = useCookie('token');

            const { data, pending, status, error } : any = await useFetch(`${config.public.API_URL}api/user/profile/${id}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token.value
                },
            });

            this.loading = pending;
            if(data.value) {
                this.profile = data.value;
                this.loading = false;
            }
        },
        async updateProfile ({name, last_name, email, nick, bio} : UserEditPayLoadInterface) {
            const config = useRuntimeConfig();
            const token:any = useCookie('token');

            const { data } : any = await useFetch(`${config.public.API_URL}api/user/update/`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': token.value 
                },
                body: { name, last_name, email, nick, bio }
            });

            if(data.value) {
                this.updatedProfile = data.value;
            }

        },
        async uploadAvatar(_fileBody:any) {
            const config = useRuntimeConfig();
            const token:any = useCookie('token');
            const { data, pending } : any = await useFetch(`${config.public.API_URL}api/user/upload/`, {
                method: 'POST',
                headers: {
                    /*'Content-Type': 'mutlipart/form-data'*/
                    'Authorization': token.value
                },
                body: _fileBody
            });

            this.loadingFile = pending;

            if(data.value) {
                this.fileData = data.value;
                this.loadingFile = true;
            }
        }
    }
})