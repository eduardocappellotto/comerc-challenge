<template>
    <img :src="props.src" :alt="props.alt" :class="props.imageClass">
</template>
  
<script setup lang="ts">


const props = defineProps<{
    src: string;
    alt: string;
    imageClass?: string;
}>();
</script>
 