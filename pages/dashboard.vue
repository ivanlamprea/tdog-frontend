<template>
    <div class="container max-w-screen-xl w-[90%] bg-white dark:bg-indigo-950  rounded-xl shadow-md border-2 border-indigo-700/50 mx-auto py-8 px-12">
        <h1 class="text-center text-4xl text-indigo-700 dark:text-lime-400 font-bold mb-5 ">Conoce amigos</h1>
        <div class="flex flex-col">
            <div v-for="dog in filter_dog" class="bg-indigo-50 my-1">
                <div class="relative flex">
                    <div class="w-1/5">
                        <img alt="user header" class="w-48 h-48 object-cover" :src="dog.pictures.length > 0 ? `${config.public.API_URL}api/dog/photo/${dog.pictures[0].image}` : '/img/dog-default.jpg'" />
                    </div>
                    <div class="w-3/5 p-4">
                        <h1 class="text-4xl">{{ dog.name }}</h1>
                        <p><strong>Edad: </strong>{{ dog.age }}</p>
                        <p><strong>Ciudad: </strong> {{ dog.location_city }} ({{ dog.location_state  }})</p>
                        <div>
                            <strong>Bio: </strong> 
                            <div v-html="dog.bio"></div>
                        </div>
                    </div>
                    <div class="w-1/5 flex justify-end items-start p-4">
                        <Button class="mx-2" icon="pi pi-heart" outlined @click="match(dog._id)" />
                    </div>
                </div>
            </div>
        </div>                
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from "vue";
    import { storeToRefs } from 'pinia';
    import { useDogStore } from '~/store/dog.store';
    import { useFollowStore } from '~/store/follow.store';

    const config = useRuntimeConfig();
    const { followDog } = useFollowStore();
    const { follow_dog } = storeToRefs(useFollowStore());
    const { filterDog } = useDogStore();
    const { filter_dog } = storeToRefs(useDogStore());

    const match = async (_id) => {
        await followDog(_id);
        await filterDog();
    }

    onMounted(async () => {
        console.log("Incializado");
        await filterDog();
        console.log(filter_dog);
    });
</script>
