<template>
    <div class="container mx-auto p-4">
        <h1 class="font-bold text-2xl my-8">Listagem de Clientes</h1>


        <div class="flex justify-between items-center mb-4 flex-wrap space-x-4 space-y-2">
            <input type="text" v-model="searchQuery" placeholder="Pesquisar por nome/cpf"
                class="p-2 border border-gray-300 rounded py-2 px-3" />

            <button class="  bg-comerc-btn-gradient text-black py-2 px-3 rounded hover:opacity-80"
                @click="router.push('/clients/manage')">
                Criar Cliente
            </button>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full table-auto text-center">
                <thead class="bg-gray-100 overflow-x-auto">
                    <tr>
                        <th class="px-4 py-2">Nome</th>
                        <th class="px-4 py-2">Email</th>
                        <th class="px-4 py-2">CPF</th>
                        <th class="px-4 py-2">CEP</th>
                        <th class="px-4 py-2">Cidade/Estado</th>
                        <th class="px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="client in filteredClients" :key="client.id">
                        <td class="border px-4 py-2">{{ client.name + ' ' + client.surname }}</td>

                        <td class="border px-4 py-2">{{ client.contacts.email }}</td>
                        <td class="border px-4 py-2">{{ censoredCPF(client.cpf) }}</td>
                        <td class="border px-4 py-2">{{ client.address.zipcode }}</td>
                        <td class="border px-4 py-2">{{ client.address.city }}, {{ client.address.state }}</td>
                        <td class="border space-x-2 space-y-2 px-4 py-2">
                            <button @click="editClient(client.id)"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                Editar
                            </button>
                            <button @click="deleteClient(client.id)"
                                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
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
import { ref, computed } from 'vue';
import { useClientStore } from '@/stores/client';
import { useRouter } from 'vue-router'

const router = useRouter();
const clientStore = useClientStore();
const searchQuery = ref('');

const filteredClients = computed(() => {
    if (!searchQuery.value) {
        return clientStore.clients;
    }
    const query = searchQuery.value.toLowerCase();
    return clientStore.clients.filter(client =>
        client.name.toLowerCase().includes(query) ||
        client.surname.toLowerCase().includes(query) ||
        client.cpf.includes(query)
    );
});

const censoredCPF = (cpf: string) => {
    if (!cpf) return '';
    return cpf.substring(0, 3) + '***.***.***-**';
};


const editClient = (clientId: string) => {
    // implement     it functionality
};

const deleteClient = (clientId: string) => {

};
</script>
 
  