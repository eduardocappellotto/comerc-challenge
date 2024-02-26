<template>
    <div class="container mx-auto p-4">
        <h1 class="font-bold text-2xl my-8">Listagem de Filmes</h1>
        <div class="mb-6 flex flex-wrap justify-center items-center space-x-6 space-y-2">
            <input type="text" v-model="searchQuery" placeholder="Pesquisar filmes..."
                class="border border-gray-300 px-4 py-2 rounded-lg   ">
            <select v-model="selectedYear" class="border border-gray-300 px-4 py-2 rounded-lg  ">
                <option value="">Todos os Anos</option>
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>
            <button @click="search" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Pesquisar</button>
        </div>
        <div class="flex flex-wrap justify-center">
            <MovieCard v-for="movie in filteredMovies" :key="movie.imdbID" :movie="movie"
                class="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 mb-4 px-2 mx-2 max-w-60" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import MovieService from '@/services/movieService'

const movies = ref<any[]>([]);
const searchQuery = ref<string>('friends');
const selectedYear = ref<string>('');

const filteredMovies = computed(() => {
    let filtered = movies.value;
    if (searchQuery.value) {
        filtered = filtered.filter((movie: any) => movie.Title.toLowerCase().includes(searchQuery.value.toLowerCase()));
    }
    if (selectedYear.value) {
        filtered = filtered.filter((movie: any) => movie.Year === selectedYear.value);
    }
    return filtered;
});

onMounted(() => {
    search()
})

const years = computed(() => {
    const yearsSet = new Set(movies.value.map(movie => movie.Year));
    return [''].concat(Array.from(yearsSet).sort());
});

const search = async () => {
    try {
        movies.value = await MovieService.searchMovies(searchQuery.value, selectedYear.value);
    } catch (error) {
        console.error('Error searching movies:', error);
    }
};
</script>
  