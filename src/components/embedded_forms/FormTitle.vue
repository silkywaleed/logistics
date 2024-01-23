<script setup lang="ts">
import type { PageNameAndDesc } from "@/types/EmbeddedForm";

const props = defineProps({
    data: {
        type: Object as () => PageNameAndDesc,
        required: true
    }
});

</script>
<template>
    <h3 class="text-xl md:text-2xl font-bold text-capitalize text-center">
        {{ data.name }}
    </h3>
    <p class="text-center text-xs sm:text-sm mt-2">
        {{ data?.description }}</p>
</template>