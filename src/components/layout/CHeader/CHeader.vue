<template>
    <header class="flex items-center justify-between py-8 px-8 max-sm:px-2 bg-comerc-blue-750 text-white">
        <AImage src="https://www.comerc.com.br/hs-fs/hubfs/_2024/logo%20comerc%20nova.png" alt="Logo"
            imageClass="h-10 hidden sm:block" />
        <div class="flex items-center space-x-4">
            <div class="space-x-4" v-if="isAuthenticated">
                <button v-for="button in navigationButtons" :key="button.route"
                    class="bg-comerc-btn-gradient text-comerc-blue-750 p-2 rounded-lg hover:opacity-80"
                    @click="navigateTo(button.route)">
                    {{ button.label }}
                </button>
            </div>
            <button v-if="isAuthenticated"
                class="bg-comerc-btn-gradient text-comerc-blue-750 p-2 rounded-lg hover:opacity-80" @click="logoutUser">
                Sair
            </button>
        </div>
    </header>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useSnackbarStore } from '@/stores/snackbar';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore)
const { login, logout } = authStore

const snackbarStore = useSnackbarStore();

const router = useRouter();



const navigationButtons = [
    { label: 'Filmes', route: '/movies' },
    { label: 'Usuários', route: '/users' },
    { label: 'Locações', route: '/rentals' },

];

const navigateTo = async (route: string) => {
    await router.push({ path: route });
};

const logoutUser = async () => {
    await logout()

    snackbarStore.show({
        message: "Saiu com sucesso!",
        color: "green"
    })

    router.push("/")
}

</script>
  