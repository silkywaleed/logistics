<script setup lang="ts">
import { ref } from 'vue';
import ErrorLabel from './ErrorLabel.vue';

type ViewType = 'text' | 'password';

const props = defineProps({
    field: {
        type: Object,
        required: true
    }
});

const viewType = ref<ViewType>("password");

/**
 * Toggle Password
 * @return {void}
 */
const togglePassword = () => {
    if (viewType.value === 'password') return viewType.value = 'text';
    return viewType.value = 'password';
};
</script>
<template>
    <!-- Text  -->
    <div class="flex flex-col space-y-2">
        <label :for="field.title" class="text-xs sm:text-sm font-medium inline-flex gap-3"
            :class="{ 'text-primary': !field.error, 'text-red-600': field.error }">
            <span>{{ field.title }}</span>
            <span v-if="field.is_required" class="text-red-600">*</span>
        </label>
        <div class="relative">
            <input :type="viewType"
                class="border text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-1.5"
                v-model="field.value" :class="{ 'border-gray-300': !field.error, 'border-red-600': field.error }"
                :required="field.is_required"
                :disabled="!field.is_active">
            <button type="button" style="{all: unset}" class="absolute top-[50%] right-2" @click="togglePassword">
                <span v-if="viewType === 'password'">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </span>
                <span v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                </span>
            </button>
        </div>
        <ErrorLabel :error="field.error" />
    </div>
    <!-- Text Ends  -->
</template>