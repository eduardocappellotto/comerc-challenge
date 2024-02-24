<template>
    <div :class="props.error ? 'mb-2' : 'mb-8'">
        <label :for="props.name" class="block text-comerc-blue-750 text-md font-medium mb-2">{{ props.label }}</label>
        <div class="relative">
            <input :type="inputType" :id="props.name" :placeholder="props.placeholder" v-model="inputValue"
                :class="{ 'border-red-500': props.error }" class="w-full px-3 py-2 border rounded-lg">
            <button v-if="props.type === 'password'" @click="togglePasswordVisibility" type="button"
                class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <v-icon v-if="!passwordVisible" name="ri-eye-line" />
                <v-icon v-if="passwordVisible" name="ri-eye-off-line" />
            </button>
        </div>
        <span v-if="props.error" class="text-red-500 text-sm">{{ props.error }}</span>
    </div>
</template>
    
<script setup lang="ts">
import { defineProps, ref, watch, defineEmits, computed } from 'vue';

const props = defineProps<{
    name: string;
    label: string;
    type: string;
    placeholder: string;
    error?: string;
}>();

const inputValue = ref<string>('');
const emit = defineEmits(['update:value']);

watch(inputValue, (newValue) => {
    emit('update:value', newValue);
});

// For toggling password visibility
const passwordVisible = ref<boolean>(false);

const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
}
// Computed property to determine the actual input type (password or text)
const inputType = computed(() => {
    return passwordVisible.value ? 'text' : props.type;
});
</script>
  