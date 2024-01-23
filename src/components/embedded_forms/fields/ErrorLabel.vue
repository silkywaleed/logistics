<script setup lang="ts">

const props = defineProps({
    error: {
        type: String,
        required: true
    }
})
</script>
<template>
    <!-- Error  -->
    <div v-if="error" class="text-xs text-red-600" role="alert">
        <span class="font-medium" role="alert" v-text="error">
        </span>
    </div>
    <!-- Error Ends  -->
</template>