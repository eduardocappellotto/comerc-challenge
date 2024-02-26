<template>
    <div class="container mx-auto max-w-md p-4">
        <h1 class="text-2xl font-semibold my-8">{{ editClientId ? 'Edição de Cliente' : 'Criação de Cliente' }}</h1>

        <form @submit.prevent="submitForm">
            <div class="flex space-x-2">
                <MFormInput name="name" label="Nome" type="text" placeholder="Nome" v-model="name"
                    @update:value="name = $event" :error="errors.name" />
                <MFormInput name="surname" label="Sobrenome" type="text" placeholder="Sobrenome" v-model="surname"
                    @update:value="surname = $event" :error="errors.surname" />
            </div>
            <MFormInput name="cpf" label="CPF" type="text" placeholder="CPF" v-model="cpf" @update:value="cpf = $event"
                :error="errors.cpf" />

            <div class="mb-4">
                <MFormInput name="zipcode" label="CEP" type="text" placeholder="CEP" v-model="zipcode"
                    @update:value="zipcode = $event;" :error="errors.zipcode" />
            </div>

            <div class="flex space-x-2">
                <MFormInput name="city" label="Cidade" type="text" placeholder="Cidade" v-model="city"
                    @update:value="city = $event" :error="errors.city" />
                <MFormInput name="state" label="Estado" type="text" placeholder="Estado" v-model="state"
                    @update:value="state = $event" :error="errors.state" />
            </div>
            <div class="flex space-x-2">
                <MFormInput name="street" label="Logradouro" type="text" placeholder="Logradouro" v-model="street"
                    @update:value="street = $event" :error="errors.street" />

                <MFormInput name="neighborhood" label="Bairro" type="text" placeholder="Bairro" v-model="neighborhood"
                    @update:value="neighborhood = $event" :error="errors.neighborhood" />
            </div>
            <div class="flex space-x-2">
                <MFormInput name="phone" label="Telefone" type="text" placeholder="Telefone" v-model="phone"
                    @update:value="phone = $event" :error="errors.phone" />

                <MFormInput name="email" label="E-mail" type="text" placeholder="E-mail" v-model="email"
                    @update:value="email = $event" :error="errors.email" />
            </div>
            <div class="flex justify-between space-y-2">
                <button type="button" @click="cancelForm"
                    class="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">Cancelar</button>
                <button type="submit" class="bg-blue-700 text-white font-bold py-2 px-4 rounded">Salvar</button>
            </div>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useClientStore } from '@/stores/client';
import { useField, useForm } from 'vee-validate';
import validationSchema from './validation/clientFormValidation';
import type { Client } from '@/types/client';
import { useSnackbarStore } from '@/stores/snackbar';
import ViaCepService from '@/services/viaCepService';
import { onMounted, ref, watch } from 'vue';

const router = useRouter();
const clientStore = useClientStore();
const snackbarStore = useSnackbarStore();
const editClientId = router.currentRoute.value.params.id as string;
const foundClient = ref<Partial<Client> | null>(null);

const { handleSubmit, errors } = useForm({
    validationSchema,
});

const { value: name } = useField<string>('name');
const { value: surname } = useField<string>('surname');
const { value: cpf } = useField<string>('cpf');
const { value: zipcode } = useField<string>('zipcode');
const { value: neighborhood } = useField<string>('neighborhood');
const { value: street } = useField<string>('street');
const { value: city } = useField<string>('city');
const { value: state } = useField<string>('state');
const { value: phone } = useField<string>('phone');
const { value: email } = useField<string>('email');

const cancelForm = () => {
    router.push("/clients");
};

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

watch(zipcode, async () => {
    debounceFetchAddress()
})

const debounceFetchAddress = () => {
    clearTimeout(debounceTimer!);
    debounceTimer = setTimeout(async () => {
        try {
            const addressInfo = await ViaCepService.getAddress(zipcode.value);
            city.value = addressInfo.city;
            state.value = addressInfo.state;
            neighborhood.value = addressInfo.neighborhood;
            street.value = addressInfo.street;

        } catch (error) {
            console.error('Error fetching address:', error);
        }
    }, 600); // 600ms debounce time
};

onMounted(() => {
    if (editClientId) {
        foundClient.value = clientStore.getClientById(editClientId);
        name.value = foundClient.value?.name || '';
        surname.value = foundClient.value?.surname || '';
        cpf.value = foundClient.value?.cpf || '';
        zipcode.value = foundClient.value?.address!.zipcode || '';
        city.value = foundClient.value?.address!.city || '';
        state.value = foundClient.value?.address!.state || '';
    }
});

const submitForm = handleSubmit(async () => {
    try {
        if (editClientId) {
            await clientStore.updateClient({
                id: editClientId,
                name: name.value,
                surname: surname.value,
                cpf: cpf.value,
                address: {
                    zipcode: zipcode.value,
                    city: city.value,
                    state: state.value,
                },
            });
            snackbarStore.show({
                message: 'Cliente atualizado com sucesso!',
                color: 'green',
            });
        } else {
            await clientStore.createClient({
                name: name.value,
                surname: surname.value,
                cpf: cpf.value,
                contacts: {
                    email: email.value,
                    phone: phone.value,
                },
                address: {
                    zipcode: zipcode.value,
                    city: city.value,
                    state: state.value,
                },
            });
            snackbarStore.show({
                message: 'Cliente criado com sucesso!',
                color: 'green',
            });
        }
        router.push("/clients");
    } catch (error) {
        snackbarStore.show({
            message: 'Erro ao salvar cliente, tente novamente!',
            color: 'red',
        });
    }
});
</script>
  