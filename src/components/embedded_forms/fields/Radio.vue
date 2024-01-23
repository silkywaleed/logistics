<script setup lang="ts">
import { computed } from 'vue';
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
</script>
<template>
    <!-- Radio  -->
    <div class="flex flex-col space-y-2">
        <label :for="field.title" class="text-xs sm:text-sm font-medium inline-flex gap-3"
            :class="{ 'text-primary': !field.error, 'text-red-600': field.error }">
            <span>{{ field.title }}</span>
            <span v-if="field.is_required" class="text-red-600">*</span>
        </label>
        <div v-if="getOptions.length < 3"
            class="border text-sm md:text-base rounded-lg focus:ring-primary focus:border-primary flex w-full p-1"
            :class="{ 'border-gray-300': !field.error, 'border-red-600': field.error }">
            <button v-for="(option, opt_idx) in getOptions" :key="opt_idx" type="button"
                class="rounded-lg text-xs sm:text-sm py-1.5 px-4 font-medium w-1/2 capitalize" :disabled="!field.is_active"
                :class="{ 'btn-switch-active': field.value == option, 'btn-switch-inactive': !field.value == option }"
                @click="field.value = option">{{ option }}</button>
        </div>
        <div v-else class="border text-sm md:text-base rounded-lg focus:ring-primary focus:border-primary flex w-full p-1"
            :class="{ 'border-gray-300': !field.error, 'border-red-600': field.error }">
            <fieldset class="px-2 space-y-3 pb-3">
                <legend class="sr-only">{{ field.title }}</legend>

                <div v-for="(option, opt_idx) in getOptions" :key="opt_idx" class="flex items-center">
                    <input type="radio" :name="field.title" :value="option" v-model="field.value"
                        :disabled="!field.is_active" class="w-4 h-4 border-gray-300 accent-primary"
                        :checked="field.value === option">
                    <label class="block ml-2 text-xs sm:text-sm md:text-base font-medium capitalize">
                        {{ option }}
                    </label>
                </div>
            </fieldset>
        </div>
        <ErrorLabel :error="field.error" />
    </div>
    <!-- Radio Ends  -->
</template>

<style scoped>
.btn-switch-active {
    color: #021DA5;
    background-color: #ede9fe;
}

.btn-switch-inactive {
    color: #a8a29e;
}
</style>