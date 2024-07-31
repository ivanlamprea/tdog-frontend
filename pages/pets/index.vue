
<template>
    <div class="container max-w-screen-xl w-[90%] dark:bg-indigo-950  rounded-sm shadow-md border-2 border-indigo-700/50 mx-auto mt-12 py-8 px-12">    
        <h1 class="text-center text-4xl text-indigo-700 dark:text-lime-400 font-bold mb-5">Mis Perritos</h1>
        <NuxtLink to="/pets/new">Registrar Macotas</NuxtLink>
        <hr/>
        <div class="grid gap-4 grid-cols-4">
            <Card v-for="dog in list_dog" >
                <template #header>
                    <img alt="user header" class="w-full h-48 object-cover" :src="dog.pictures.length > 0 ? `${config.public.API_URL}api/dog/photo/${dog.pictures[0].image}` : '/img/dog-default.jpg'" />
                </template>
                <template #title><h1>{{ dog.name }}</h1></template>
                <template #subtitle><strong>Edad:</strong> {{ dog.age }}</template>
                <template #content>
                    <p>Seguidores: 0</p>
                </template>
                <template #footer>
                    <div class="flex gap-3">
                        <Button label="Editar" severity="secondary" outlined class="w-full" @click="onEdit(dog._id)"/>
                        <Button :id="'Delete'+dog._id" label="Eliminar" class="w-full" @click="onConfirmDelete(dog._id)" />
                    </div>
                </template>
            </Card>
        </div>
    </div>
    <Toast />
    <ConfirmDialog :props="{ class: 'bg-white' }"></ConfirmDialog>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useDogStore } from '~/store/dog.store';

    import { useConfirm } from "primevue/useconfirm";
    import { useToast } from "primevue/usetoast";
    const config = useRuntimeConfig();

    const confirm = useConfirm();
    const toast = useToast();

    const { listDog, deleteDog } = useDogStore();
    const { list_dog, deleted_dog } = storeToRefs(useDogStore());

    const onEdit = (_id) => {
        navigateTo(`/pets/picture/${_id}/`);
    }

    const onConfirmDelete = (_id) => {
        confirm.require({
            message: 'Do you want to delete this record?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Delete',
                severity: 'danger'
            },
            accept: async () => {
                await deleteDog(_id);
                await listDog();
                toast.add({ 
                    severity: 'success',
                    summary: 'Success Message',
                    detail: deleted_dog.value?.message,
                    life: 3000 
                });
            },
            reject: () => {
                toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    };

    onMounted(async () => {
        await listDog();
        console.log(list_dog);
    })
</script>