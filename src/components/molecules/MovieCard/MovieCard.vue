 
<template>
    <div class="border border-gray-200 p-4 rounded-lg shadow-md text-center">
        <img :src="props.movie.Poster" alt="Movie Poster" class="  h-60 w-auto mb-4 m-auto">
        <h3 class="text-lg font-semibold">{{ props.movie.Title }}</h3>
        <p class="text-sm text-gray-600">{{ props.movie.Year }}</p>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    movie: {
        Title: string;
        Poster: string;
        Year: string;
    };
}>();
</script>

  