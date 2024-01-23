<script setup lang="ts">
import { watch } from 'vue';
import ErrorLabel from './ErrorLabel.vue';

const props = defineProps({
    field: {
        type: Object,
        required: true
    }
});


/**
 * Increment Field
 * @return {void}
 */
const incrementField = (): any => {

    if (!props.field.value) return props.field.value = 1;

    props.field.value = parseInt(props.field.value) + 1;
};

/**
 * Decrement Field
 * @return {void}
 */
const decrementField = (): any => {

    if (!props.field.value) return props.field.value = 0;

    const actual_no = parseInt(props.field.value);

    if (actual_no < 1) return props.field.value = 0;

    props.field.value = parseInt(props.field.value) - 1;
};

watch(() => props.field.value, () => { 
    if(isNaN(props.field.value)) return props.field.value = 0;
});

</script>
<template>
    <!-- Text  -->
    <div class="flex flex-col space-y-2">
        <div class="inline-flex gap-2">
            <label :for="field.title" class="text-xs sm:text-sm font-medium inline-flex my-auto"
                :class="{ 'text-primary': !field.error, 'text-red-600': field.error }">
                <span>{{ field.title }}</span>
                <span v-if="field.is_required" class="text-red-600">*</span>
            </label>
            <div class="inline-flex gap-2 my-auto">
                <button type="button" @click="decrementField()"
                    class="rounded-lg text-sm sm:text-base py-1 px-2 font-medium text-white bg-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                    </svg>
                </button>
                <input type="text"
                    class="border text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-1.5"
                    v-model="field.value" :class="{ 'border-gray-300': !field.error, 'border-red-600': field.error }"
                    :required="field.is_required"
                    :disabled="!field.is_active">
                <button type="button" @click="incrementField()"
                    class="rounded-lg text-sm sm:text-base py-1 px-2 font-medium text-white bg-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                </button>
            </div>
        </div>
        <ErrorLabel :error="field.error" />
    </div>
    <!-- Text Ends  -->
</template>