<template>
    <header class="flex items-center justify-between py-4 px-8 bg-comerc-blue-750 text-white">
        <AImage src="https://www.comerc.com.br/hs-fs/hubfs/_2024/logo%20comerc%20nova.png" alt="Logo"
            :imageClass="logoClass" />
        <div class="flex items-center space-x-4">
            <button class=" bg-comerc-btn-gradient text-comerc-blue-750 p-3 rounded-lg hover:opacity-80"
                @click="navigateTo('/')">
                Login
            </button>
            <slot></slot>
        </div>
    </header>
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const logoClass = 'h-10';

const navigateTo = async (route: string) => {
    await router.push({ path: route })
};

</script>
  
<style scoped>
/* Add any additional styles here */
</style>
  