<template>
    <div class="container max-w-screen-xl w-[90%] dark:bg-indigo-950  rounded-sm shadow-md border-2 border-indigo-700/50 mx-auto mt-12 py-8 px-12">    
        <h1 class="text-center text-4xl text-indigo-700 dark:text-lime-400 font-bold mb-5">Registrar Mascota</h1>
        <div class="card flex justify-center">
            <form class="flex">
                <div class="w-3/6 px-2">
                    <div class="w-full mb-8">
                        <InputText v-model="name" placeholder="Nombre" class="w-full mb-4" />
                    </div>
                    <div class="w-full mb-8">
                        <InputText v-model.number="age" class="w-full mb-4" />
                        <Slider v-model="age" :max="20" class="w-full" />
                    </div>
                    <div class="w-full mb-8">
                        <Dropdown v-model="selectedBreed" :options="breeds" filter optionLabel="name" placeholder="Seleciona la raza de tu mascota" @change="setBreed" class="w-full mb-8">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Dropdown>
                        <Listbox v-model="selectedSize" :options="sizes" optionLabel="name" class="w-full" />
                    </div>
                </div>
                <div class="w-3/6 px-2">
                    <div class="w-full mb-12">
                        <Dropdown v-model="selectedCity" :options="cities" filter optionLabel="city" placeholder="Selecciona la ciudad donde te encuentras ubicado" class="w-full">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                    <div>{{ slotProps.value.state }} - {{ slotProps.value.city }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <div>{{ slotProps.option.city }}</div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="w-full">
                        <Editor v-model="bio" image="false" editorStyle="height: 320px" :pt="{root: { class: 'w-full bg-white'}, image:{ class: 'invisible'}}" />
                    </div>
                </div>
            </form>
        </div>
        <div class="flex w-full justify-end">
            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="saveDog(); nextCallback();" />
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import { onMounted } from 'vue'; 
    import { storeToRefs } from 'pinia';
    import { useDogStore } from '~/store/dog.store';
    import { useCityStore } from '~/store/city.store';
    import { useBreedStore } from '~/store/breed.store';
    import Editor from 'primevue/editor';

    const { createDog } = useDogStore();
    const { created_dog } = storeToRefs(useDogStore());
    const { listCity } = useCityStore();
    const { list_city } = storeToRefs(useCityStore());
    const { listBreed } = useBreedStore();
    const { list_breed } = storeToRefs(useBreedStore());

    const name = ref('');
    const age = ref(0);
    const bio = ref('');
    const selectedBreed = ref();
    const breeds = ref([]);

    const selectedCity = ref();
    const cities = ref([]);

    const selectedSize = ref();
    const sizes = ref([
        { name: 'Miniatura', code: 'XS' },
        { name: 'Pequeño', code: 'SM' },
        { name: 'Mediano', code: 'MD' },
        { name: 'Grande', code: 'LG' },
        { name: 'Gigante', code: 'XL' }
    ]);

    const setBreed = (_ev) => {
        let breedSize = _ev.value.size;
        let chooseSize = sizes.value.filter((itemSize, element) => {
            console.log(itemSize.code == breedSize);
            if(itemSize.code === breedSize) 
                return itemSize;
        });
        selectedSize.value = chooseSize[0];
    }

    const saveDog = async () => {
        console.log(selectedCity.value);
        
        let newDog = {
            name: name.value,
            age: age.value,
            breed: selectedBreed.value.name,
            size: selectedBreed.value.size,
            location_state: selectedCity.value.state,
            location_city: selectedCity.value.city,
            bio: bio.value
        };
        await createDog(newDog);
        navigateTo(`/pets/picture/${created_dog.value.dogStored['_id']}/`);
        
    }

    onMounted(async () => {
        await listBreed();
        await listCity();
        breeds.value = list_breed.value;
        cities.value = list_city.value;
    });
</script>