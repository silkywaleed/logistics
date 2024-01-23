<script setup lang="ts">
import { computed, watch } from 'vue';
import ErrorLabel from './ErrorLabel.vue';

const props = defineProps({
    field: {
        type: Object,
        required: true
    }
});

/**
 * Convert field options to array
 * @param {String} options
 * @return {Array}
 */
const getOptions = computed((): any[] => {
    if (!props.field.options) return [];
    return props.field.options.split(',');
});

/**
 * Handle all change
 * @param {any} event 
 */
const handleChange = (event: any) => {

    if (props.field.is_multi) {
        const output: any[] = [];

        for (let index = 0; index < event.target.selectedOptions.length; index++) {
            const element = event.target.selectedOptions[index];
            output.push(element.value);
        }

        props.field.value = output;
    } else {
        props.field.value = event.target.value;
    }
}

// watch(() => prop() => {})

</script>
<template>
    <!-- Select/Dropdown  -->
    <div class="flex flex-col space-y-2">
        <label :for="field.title" class="text-xs sm:text-sm font-medium inline-flex gap-3"
            :class="{ 'text-primary': !field.error, 'text-red-600': field.error }">
            <span>{{ field.title }}</span>
            <span v-if="field.is_required" class="text-red-600">*</span>
        </label>
        <select class="border text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-1.5"
            @change="handleChange" @select="handleChange" :required="field.is_required" :multiple="field.is_multi ? true : false"
            :disabled="!field.is_active"
            :class="{ 'border-gray-300': !field.error, 'border-red-600': field.error }">
            <option value="" class="text-xs text-gray-500">Select an option</option>
            <option v-for="(opt, opt_idx) in getOptions" :key="opt_idx" :value="opt"
                :selected="(!field.is_multi && field.value === opt) || (field.is_multi && field.value.includes(field.value)) ? true : false"
                class="capitalize">
                {{ opt }}</option>
        </select>
        <ErrorLabel :error="field.error" />
    </div>
    <!-- Select/Dropdown Ends  -->
</template>