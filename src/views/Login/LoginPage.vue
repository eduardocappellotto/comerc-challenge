<template>
    <div class="h-full align-middle items-center">
        <div class="max-w-md bg-white p-6 rounded-lg shadow-md m-auto mt-20">
            <h1 class="text-xl font-semibold mb-6">Login</h1>
            <form @submit.prevent="onSubmit">
                <MFormInput name="username" label="Usuário" type="text" placeholder="Usuário" v-model="username"
                    @update:value="username = $event" :error="errors.username" />
                <MFormInput name="password" label="Senha" type="password" placeholder="Senha" v-model="password"
                    @update:value="password = $event" :error="errors.password" />
                <button type="submit"
                    class="w-full bg-comerc-btn-gradient text-black py-2 rounded-lg hover:opacity-80 transition duration-200">Login</button>
            </form>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { useSnackbarStore } from '@/stores/snackbar';
import { useField, useForm } from 'vee-validate';
import validationSchema from './validation/loginFormValidation';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';


const { login } = useAuthStore();
const snackbarStore = useSnackbarStore();
const router = useRouter();

const { handleSubmit, errors } = useForm({
    validationSchema,
});

const { value: username } = useField<string>('username');
const { value: password } = useField<string>('password');

const onSubmit = handleSubmit(async () => {
    try {
        await login({
            username: username.value,
            password: password.value
        });
        router.push("/movies")
        snackbarStore.show({
            message: 'Entrou com sucesso!',
            color: 'success',
        });

    } catch (error) {

        snackbarStore.show({
            message: error.message,
            color: 'error',
        });
        clearFields();
    }
});

const clearFields = () => {
    username.value = "";
    password.value = "";
};
</script>
  