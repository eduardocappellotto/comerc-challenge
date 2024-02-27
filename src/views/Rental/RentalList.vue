<template>
    <div class="container mx-auto p-4">
        <h1 class="font-bold text-2xl my-8">Locações</h1>
        <div class="flex justify-between items-center">
            <div class="flex space-x-4">
                <MFormInput name="client" label="Cliente" type="text" placeholder="Insira o cliente" v-model="searchClient"
                    @update:value="searchClient = $event" />
                <MFormInput name="startDate" label="Início" type="date" placeholder="Início" v-model="startDate"
                    @update:value="startDate = $event" />
                <MFormInput name="endDate" label="Fim" type="date" placeholder="Fim" v-model="endDate"
                    @update:value="endDate = $event" />
            </div>
            <button class=" bg-comerc-btn-gradient p-2 mx-4 rounded-lg hover:opacity-80"
                @click="router.push('/rentals/manage/')">Nova Locação</button>
        </div>

        <div class="overflow-x-auto">
            <table class="mt-4 w-full table-auto text-center">
                <thead>
                    <tr>
                        <th class="px-4 py-2">Cliente</th>
                        <th class="px-4 py-2">E-mail</th>
                        <th class="px-4 py-2">Telefone</th>
                        <th class="px-4 py-2">Início</th>
                        <th class="px-4 py-2">Entrega</th>
                        <th class="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="filteredRentals.length === 0">
                        <td class="border px-4 py-2" colspan="6">Não foram encontradas locações</td>
                    </tr>
                    <tr v-for="rental in filteredRentals" :key="rental.id">
                        <td class="border px-4 py-2">{{ rental.client.name + ' ' + rental.client.surname }}</td>
                        <td class="border px-4 py-2">{{ rental.client.contacts.email }}</td>
                        <td class="border px-4 py-2">{{ rental.client.contacts.phone }}</td>
                        <td class="border px-4 py-2">{{ timestampToDate(rental.rentalDate) }}</td>
                        <td class="border px-4 py-2">{{ timestampToDate(rental.returnDate) }}</td>
                        <td class="border px-4 py-2">

                            <label for="rented">{{ rental.status === 'rented' ? 'Alugado' : 'Devolvido' }}</label>
                            <input class="m-2" type="checkbox" name="rented" id="rented"
                                :checked="rental.status === 'returned'" @change="rentalStore.changeRentalStatus(rental.id)">

                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRentalStore } from '@/stores/rental';
import { useRouter } from 'vue-router';

const rentalStore = useRentalStore();
const router = useRouter();

const searchClient = ref('');
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

const filteredRentals = computed(() => {
    const clientId = searchClient.value.trim();
    const start = startDate.value ? new Date(startDate.value) : null;
    const end = endDate.value ? new Date(endDate.value) : null;

    return rentalStore.getRentalsList(clientId, start, end);
});

const timestampToDate = (timestamp: number) => {
    const date = new Date(timestamp);

    const day = date.getDate();

    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return formattedDay + '/' + formattedMonth + '/' + year;
}

const filterRentals = () => {
    rentalStore.getRentalsList(searchClient.value.trim(), startDate.value, endDate.value);
};
</script>
  