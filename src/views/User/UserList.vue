 
<template>
    <div class="container mx-auto p-4">
        <h1 class="font-bold text-2xl my-8">Listagem de Usuários</h1>
        <div class="flex justify-between items-center mb-4 flex-wrap space-x-4 space-y-2">
            <input type="text" placeholder="Pesquisar..." v-model="searchQuery"
                class="border border-gray-300 rounded py-2 px-3" />

            <button class="  bg-comerc-btn-gradient text-black py-2 px-3 rounded hover:opacity-80"
                @click="navigateTo('/users/manage')">
                Criar Usuário
            </button>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full table-auto text-center">
                <thead class="bg-gray-100">
                    <tr>

                        <th class="px-4 py-2">Nome</th>
                        <th class="px-4 py-2">Documento</th>
                        <th class="px-4 py-2">Status</th>
                        <th class="px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers" :key="user.id">

                        <td class="border px-4 py-2">{{ user.username }}</td>
                        <td class="border px-4 py-2">{{ user.document }}</td>
                        <td class="border px-4 py-2"><span v-if="user.status === 'active'"
                                class=" bg-comerc-green-600 text-black text-sm font-medium me-2 px-2.5 py-1 rounded  ">Ativo</span>
                            <span v-if="user.status === 'deleted'"
                                class="bg-purple-600 text-white text-sm font-medium me-2 px-2.5 py-1 rounded  ">Inativo</span>


                        </td>
                        <td class="border space-x-2 px-4 py-2 ">
                            <button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                @click="editUser(user.id)" :disabled="user.id === 'admin'">
                                Editar
                            </button>
                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                                @click="deleteUser(user.id)" :disabled="user.id === 'admin'">
                                Excluir
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';

import { useRouter } from 'vue-router';
import { useSnackbarStore } from '@/stores/snackbar';
const router = useRouter();

const userStore = useUserStore();
const snackbarStore = useSnackbarStore();
const searchQuery = ref('');

const filteredUsers = computed(() => {
    if (!searchQuery.value) {
        return userStore.users;
    }
    return userStore.users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const navigateTo = async (route: string) => {
    await router.push({ path: route });
};

const editUser = (userId: string) => {
    navigateTo(`/users/manage/${userId}`)
};

const deleteUser = (userId: string) => {
    userStore.deleteUser(userId);
    snackbarStore.show({
        message: 'Excluido com sucesso!',
        color: 'green',
    });

};

</script>
 