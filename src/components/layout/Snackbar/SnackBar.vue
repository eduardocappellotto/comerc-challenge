<template>
    <div v-for="message in messages" :key="message.id"
        :class="[message.color, 'fixed top-10 left-10 text-white rounded-md p-4 mb-4 shadow-lg']">
        {{ message.message }}
        <button v-if="message.id" @click="dismiss(message.id)"
            class="float-right text-white font-bold mx-2">&times;</button>
    </div>
</template>

<script setup lang="ts">
import { useSnackbarStore } from '@/stores/snackbar';
import { storeToRefs } from 'pinia';

const snackbarStore = useSnackbarStore();
const { messages } = storeToRefs(snackbarStore);
const dismiss = (id: number) => {
    snackbarStore.dismiss(id);
};

const snackBarClass = (color: string) => {
    return `bg-${color}-600`
}
</script>

<style scoped>
.snackbar-enter-active,
.snackbar-leave-active {
    transition: opacity 0.5s;
}

.snackbar-enter-from,
.snackbar-leave-to {
    opacity: 0;
}

/* Dynamically apply background color */
.error {
    @apply bg-red-600;
}

.success {
    @apply bg-green-600;
}

/* Add other color classes as needed */
</style>
