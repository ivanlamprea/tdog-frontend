<template>
    <div class="container max-w-screen-xl w-[90%] dark:bg-indigo-950  rounded-sm shadow-md border-2 border-indigo-700/50 mx-auto mt-12 py-8 px-12">
        <div class="flex">
            <div class="relative w-2/5 bg-slate-300 p-8 flex flex-col items-center justify-center ">
                <img :src="pictureUrl + profileState['image']" class="mx-auto w-64 h-64 bg-black object-cover" />
                <div class="flex items-center p-2 mt-8">
                    <input type="file" ref="anexFile" @change="setAvatarPicture" class=" p-1" >
                    <!-- <a v-if="mdl.data" :href="linkFile"  target="_blank">{{ linkFile }}</a> -->
                    <div class="bg-red-400 w-9 h-8 flex items-center justify-center" @click="delFile">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="w-3/5">
                <h1 class="text-center text-4xl text-indigo-700 dark:text-lime-400 font-bold mb-5">{{profile['user'].name}} {{profile['user'].last_name}}</h1>
                <form @submit.prevent="editProfile" class="flex flex-col items-center">
                    <div class="flex items-center w-4/5">
                        <input id="Name" placeholder="Nombre" type="text" v-model="profile['user'].name" class="w-full bg-transparent text-pink-600 dark:text-white text-lg font-semibold border rounded-lg border-indigo-600 dark:border-lime-400 shadow-md shadow-indigo-300 dark:shadow-lime-300/30 p-2">
                    </div>
                    <br>
                    <div class="flex items-center w-4/5">
                        <input id="LastName" placeholder="Apellido" type="text" v-model="profile['user'].last_name" class="w-full bg-transparent text-pink-600 dark:text-white text-lg font-semibold border rounded-lg border-indigo-600 dark:border-lime-400 shadow-md shadow-indigo-300 dark:shadow-lime-300/30 p-2">
                    </div>
                    <br>
                    <div class="flex items-center w-4/5">
                        <input id="Nick" placeholder="Nick" type="text" v-model="profile['user'].nick" class="w-full bg-transparent text-pink-600 dark:text-white text-lg font-semibold border rounded-lg border-indigo-600 dark:border-lime-400 shadow-md shadow-indigo-300 dark:shadow-lime-300/30 p-2">
                    </div>
                    <br>
                    <div class="flex items-center w-4/5">
                        <input id="Email" placeholder="Email" type="email" v-model="profile['user'].email" class="w-full bg-gray-200 text-pink-600 dark:text-white text-lg font-semibold border rounded-lg border-indigo-600 dark:border-lime-400 shadow-md shadow-indigo-300 dark:shadow-lime-300/30 p-2" disabled="disabled">
                    </div>
                    <br>
                    <div class="flex items-center w-4/5">
                        <textarea id="Bio" placeholder="Bio" v-model="profile['user'].bio" name="bio" rows="4" cols="50" class="w-full bg-transparent text-pink-600 dark:text-white text-lg font-semibold border rounded-lg border-indigo-600 dark:border-lime-400 shadow-md shadow-indigo-300 dark:shadow-lime-300/30 p-2">
                        
                        </textarea>
                    </div>
                    <!-- <Editor editorStyle="height: 320px" /> -->
                    <button class="flex bg-indigo-800 dark:bg-lime-400 font-bold text-lime-400 dark:text-indigo-950 py-2 px-3 mx-auto uppercase rounded-md my-8" type="submit">Guardar</button>
                </form>
            </div>
        </div>
    </div>
    <Toast />
</template>
<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useProfileStore } from '~/store/profile.store';
    import Editor from 'primevue/editor';
    const config = useRuntimeConfig();
    const route = useRoute();
    const toast = useToast();

    const userCookie = useCookie('user');
    
    const { getProfile, updateProfile, uploadAvatar } = useProfileStore();
    const { profile, updatedProfile, fileData } = storeToRefs(useProfileStore());
    
    await getProfile(route?.params?.id);

    const profileState = useProfile();
    const pictureUrl = ref(`${config.public.API_URL}api/user/avatar/`)
    
    const setAvatarPicture = async (_ev:any) => {
        let formData = new FormData();
        let fileInput = _ev.target.files[0];
        formData.append('user', route?.params?.id);
        formData.append("file0", fileInput, fileInput.name);
        await uploadAvatar(formData);
        userCookie.value = fileData?.value?.user;
        profileState.value = fileData?.value?.user;
    }

    const editProfile = async() => {
        const profileToUpdate = { 
            name: profile.value['user'].name,
            last_name: profile.value['user'].last_name,
            nick: profile.value['user'].nick,
            email: profile.value['user'].email,
            bio: profile.value['user'].bio,
        };
        
        await updateProfile(profileToUpdate);

        toast.add({ 
            severity: 'success',
            summary: 'Success Message',
            detail: 'Usuario editado correctamente',
            life: 3000 
        });

    }

    const delFile = async (_ev: any) => {
        profileState.value['image'] = "user-default.jpg";
    }

</script>