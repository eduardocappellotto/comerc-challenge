<template>
    <transition-group name="snackbar" tag="div"
        class="fixed top-0 left-0 right-0 flex justify-center flex-col items-center p-4 z-50">
        <div v-for="message in messages" :key="message.id" class="bg-green-500 text-black rounded-md p-4 mb-4 shadow-lg">
            {{ message.message }}
            <button v-if="message.id" @click="dismiss(message.id)"
                class="float-right text-black font-bold mx-2">&times;</button>
        </div>
    </transition-group>
</template>

  
 
  
<script setup lang="ts">
import { useSnackbarStore } from '@/stores/snackbar';
import { storeToRefs } from 'pinia';

const snackbarStore = useSnackbarStore();
const { messages } = storeToRefs(snackbarStore);
const dismiss = (id: number) => {
    snackbarStore.dismiss(id);
};
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
</style>