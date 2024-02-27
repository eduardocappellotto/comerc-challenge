<template>
    <header class="flex justify-center py-8 px-8 max-sm:px-2 bg-comerc-blue-750 text-white">
        <div class="flex items-center justify-between container px-4">
            <AImage src="https://www.comerc.com.br/hs-fs/hubfs/_2024/logo%20comerc%20nova.png" alt="Logo"
                imageClass="h-10 hidden sm:block" />
            <div class="flex items-center space-x-4">
                <div class="space-x-4 space-y-2" v-if="isAuthenticated">
                    <button v-for="button in navigationButtons" :key="button.route"
                        class="bg-comerc-btn-gradient text-comerc-blue-750 p-2 rounded-lg hover:opacity-80"
                        @click="router.push(button.route)">
                        {{ button.label }}
                    </button>
                    <button v-if="isAuthenticated"
                        class="bg-comerc-btn-gradient text-comerc-blue-750 p-2 rounded-lg hover:opacity-80"
                        @click="logoutUser">
                        Sair
                    </button>
                </div>

            </div>
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
const { logout } = authStore

const snackbarStore = useSnackbarStore();

const router = useRouter();

const navigationButtons = [
    { label: 'Filmes', route: '/movies' },
    { label: 'Clientes', route: '/clients' },
    { label: 'Usuários', route: '/users' },
    { label: 'Locações', route: '/rentals' },

];



const logoutUser = async () => {
    try {

        logout()
        snackbarStore.show({
            message: "Saiu com sucesso!",
            color: 'success'
        })
        router.push({ name: "Login" })

    } catch (error) {
        snackbarStore.show({
            message: "Erro ao sair!",
            color: 'error'
        })
    }
}

</script>
  