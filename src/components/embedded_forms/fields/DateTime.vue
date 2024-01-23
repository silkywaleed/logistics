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
    <!-- Text  -->
    <div class="flex flex-col space-y-2">
        <label :for="field.title" class="text-xs sm:text-sm font-medium inline-flex gap-3"
            :class="{ 'text-primary': !field.error, 'text-red-600': field.error }">
            <span>{{ field.title }}</span>
            <span v-if="field.is_required" class="text-red-600">*</span>
        </label>
        <input type="datetime-local"
            class="border text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-1.5"
            v-model="field.value" :class="{ 'border-gray-300': !field.error, 'border-red-600': field.error }"
            :disabled="!field.is_active"
            :required="field.is_required">
        <ErrorLabel :error="field.error" />
    </div>
    <!-- Text Ends  -->
</template>