<script setup lang="ts">
import { computed } from "vue";
import type { ProgressData } from "@/types/EmbeddedForm";

const props = defineProps({
    active: {
        type: Number,
        required: true
    },
    data: {
        type: Object as () => ProgressData,
        required: true
    }
});

const isActive = computed((): boolean => {
    if (props.active >= props.data.position) return true;
    return false;
});

</script>
<template>
    <div class="relative">
        <!-- Dot -->
        <span class="p-1 md:p-2 rounded-full absolute -top-1 md:-top-1.5"
            :class="{ 'bg-primary': isActive, 'bg-carton-200': !isActive }"></span>
        <!-- Dot Ends  -->
        <span class="absolute text-xs sm:text-sm capitalize top-4 -left-4 text-center"
            :class="{ 'text-primary': isActive, 'text-carton-200': !isActive }">
            {{ data.name }}
        </span>
    </div>
</template>