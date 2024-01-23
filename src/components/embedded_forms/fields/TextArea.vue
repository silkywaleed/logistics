<script setup lang="ts">
import ErrorLabel from './ErrorLabel.vue';

const props = defineProps({
    field: {
        type: Object,
        required: true
    }
})
</script>
<template>
    <!-- Text Area  -->
    <div class="flex flex-col space-y-2">
        <label :for="field.title" class="text-xs sm:text-sm font-medium inline-flex gap-3"
            :class="{ 'text-primary': !field.error, 'text-red-600': field.error }">
            <span>{{ field.title }}</span>
            <span v-if="field.is_required" class="text-red-600">*</span>
        </label>
        <textarea class="border text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-1.5"
            :class="{ 'border-gray-300': !field.error, 'border-red-600': field.error }" :required="field.is_required"
            :disabled="!field.is_active"
            v-model="field.value" rows="5">
        </textarea>
        <ErrorLabel :error="field.error" />
    </div>
    <!-- Text Area Ends  -->
</template>