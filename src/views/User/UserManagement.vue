<template>
    <div class="container mx-auto max-w-md p-4">
        <h1 class="text-2xl font-semibold my-8">{{ editUserId ? 'Edição de Usuário' : 'Criação de Usuário' }}</h1>

        <form @submit.prevent="submitForm">
            <MFormInput name="myusername" label="Usuário" type="text" placeholder="Usuário" v-model="username"
                @update:value="username = $event" :error="errors.username" />

            <MFormInput name="document" label="Documento" type="text" placeholder="Documento" v-model="document"
                @update:value="document = $event" :error="errors.document" />
            <MFormInput name="myPassword" label="Senha" type="password" placeholder="Senha" v-model="password"
                @update:value="password = $event" :error="errors.password" />
            <div class="mb-8">
                <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                <select id="status" v-model="status" class="mt-1 p-2 border border-gray-300 rounded w-full">
                    <option value="active">Ativo</option>
                    <option value="deleted">Excluído</option>
                </select>

                <span>{{ errors.status }}</span>
            </div>

            <div class="flex justify-between">
                <button type="button" @click="cancelForm"
                    class="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">Cancelar</button>
                <button type="submit" class="bg-blue-700 text-white font-bold py-2 px-4 rounded">Salvar</button>

            </div>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useField, useForm } from 'vee-validate';
import validationSchema from './validation/userFormValidation';
import type { User, UserStatus } from '@/types/user';
import { useSnackbarStore } from '@/stores/snackbar';
import { onMounted, ref, toRaw } from 'vue';

const router = useRouter();
const userStore = useUserStore();
const snackbarStore = useSnackbarStore();
const editUserId = router.currentRoute.value.params.id as string;
const foundUser = ref<Partial<User> | null>(null);

const { handleSubmit, errors } = useForm({
    validationSchema,
});

const { value: username } = useField<string>('username');
const { value: password } = useField<string>('password');
const { value: document } = useField<string>('document');
const { value: status } = useField<string>('status');

const cancelForm = () => {
    router.push("/users")
};

onMounted(() => {
    if (editUserId) {
        foundUser.value = toRaw(userStore.getUserById(editUserId));


        username.value = foundUser.value?.username || 'asdassadfasdas';
        document.value = foundUser.value?.document || 'asdassadfasdas';
        password.value = '';
        status.value = foundUser.value?.status || 'active';
    }
})
const submitForm = handleSubmit(async () => {
    try {
        if (editUserId) {
            await userStore.updateUser({
                username: username.value,
                password: password.value,
                document: document.value,
                status: status.value as UserStatus,
                id: editUserId,
            });

            snackbarStore.show({
                message: 'Atualizado com sucesso!',
                color: 'green',
            });
            router.push("/users")
        }
        if (!editUserId) {
            await userStore.createUser({
                username: username.value,
                password: password.value,
                document: document.value,
                status: status.value as UserStatus
            });

            snackbarStore.show({
                message: 'Salvo com sucesso!',
                color: 'green',
            });

            router.push("/users")
        }
    } catch (error) {
        snackbarStore.show({
            message: 'Erro ao salvar, tente novamente!',
            color: 'red',
        });
    }

});
</script>
  