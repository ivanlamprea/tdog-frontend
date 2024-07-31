<template>
    <div class="container max-w-screen-xl w-[90%] dark:bg-indigo-950  rounded-sm shadow-md border-2 border-indigo-700/50 mx-auto mt-12 py-8 px-12">    
        <h1 class="text-center text-4xl text-indigo-700 dark:text-lime-400 font-bold mb-5">{{ name }}</h1>
        <UploadPicturesDog :dogId="$route.params.id" />
    </div>
</template>

<script setup>
    import { onMounted } from 'vue'; 
    import { storeToRefs } from 'pinia';
    import { useDogStore } from '~/store/dog.store';
    

    const { getDog } = useDogStore();
    const { get_dog } = storeToRefs(useDogStore());
    const route = useRoute();

    const name = ref('');
    const age = ref('0');
    const bio = ref('');


    onMounted(async () => {
        await getDog(route.params.id);
        name.value = get_dog.value['dogInfo'].name;
        age.value = get_dog.value['dogInfo'].age;
    });
</script>