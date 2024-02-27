<template>
    <div class="container mx-auto  p-4">
        <h1 class="font-bold text-2xl my-8">Locações</h1>
        <form @submit.prevent="submitForm" class="p-4">

            <div class="flex space-x-8">
                <div>
                    <label for="client" class="block mb-2">Cliente</label>
                    <select v-model="selectedClient" class="w-auto h-auto p-3 border rounded-md mb-4 bg-transparent">
                        <option v-for="client in clients" :key="client.id" :value="client">{{ client.name + ' ' +
                            client.surname }}</option>
                    </select>
                </div>

                <MFormInput name="zipcode" label="Início" type="date" placeholder="CEP" v-model="rentalStart"
                    @update:value="rentalStart = $event;" />
                <MFormInput name="rentalEnd" label="Fim" type="date" placeholder="CEP" v-model="rentalEnd"
                    @update:value="rentalEnd = $event;" />
            </div>

            <label for="movieSearch" class="block mb-2">Pesquise Filmes</label>
            <input type="text" v-model="movieSearch" @input="searchMovies" class="w-full p-2 border rounded-md mb-4"
                placeholder="Search movie...">

            <small>A busca retorna os 10 filmes mais relevantes encontrados. Seja mais específico caso queira encontrar um
                filme mais desconhecido!</small>


            <label v-if="searchedMovies.length > 0" for="movies" class="block mb-2">Selecione</label>

            <div class="flex flex-wrap mb-8">

                <label v-for="movie in searchedMovies" :key="movie.imdbID" class="inline-flex items-center mr-4 mb-2">
                    <span class="   bg-blue-300 text-black text-sm font-medium me-2 px-2.5 py-1 rounded  ">
                        <input type="checkbox" v-model="selectedMovies" :value="movie" class="mr-2">
                        {{ movie.Title + '-' + movie.Year }}
                    </span>
                </label>
            </div>
            <button type="submit" class=" bg-comerc-blue-800 text-white py-2 px-4 rounded">Criar locação</button>
        </form>

    </div>
</template>
  

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useClientStore } from '@/stores/client';
import { useAuthStore } from '@/stores/auth';
import { useSnackbarStore } from '@/stores/snackbar';
import { useRentalStore } from '@/stores/rental';

import MovieService from '@/services/movieService';

import type { Movie } from '@/types/movie';
import type { Client } from '@/types/client';
import type { Rental } from '@/types/rental';

import { debounce } from '@/utils/debounce';
import { useRouter } from 'vue-router';

const router = useRouter()
const clientStore = useClientStore();

const snackbarStore = useSnackbarStore();
const rentalStore = useRentalStore();
const { currentUser } = useAuthStore()

const selectedClient = ref<Client>();
const movieSearch = ref('');
const searchedMovies = ref<Movie[]>([]);
const selectedMovies = ref<Movie[]>([]);

const rentalStart = ref<string>("")
const rentalEnd = ref<string>("")

const clients = computed(() => clientStore.getClients);

const debouncedSearchMovies = debounce(async () => {
    const searchResult = await MovieService.searchMovies(movieSearch.value, '');
    searchedMovies.value = [
        ...new Map([...searchResult, ...selectedMovies.value].map(item => [item.imdbID, item])).values()
    ];

    if (searchedMovies.value.length === 0) {
        snackbarStore.show({
            message: 'Não encontramos filmes!',
            color: 'error'
        })
    }
}, 300);

const searchMovies = async () => {
    debouncedSearchMovies()
};

const submitForm = () => {
    try {

        if (selectedClient.value && currentUser) {
            const rental: Rental = {
                id: String(new Date().valueOf()),
                client: selectedClient.value,
                movies: selectedMovies.value,
                rentalDate: new Date(rentalStart.value).getTime(),
                returnDate: new Date(rentalEnd.value).getTime(),
                locatedBy: currentUser!,
                status: 'rented'
            }

            rentalStore.addRental(rental)

            snackbarStore.show({
                message: 'Locação criada com sucesso!',
                color: 'success'
            })

            router.push("/rentals")
        }

    } catch (error) {
        if (error instanceof Error) {
            snackbarStore.show({
                message: error.message,
                color: 'error'
            })
        }
    }

};

</script>
  