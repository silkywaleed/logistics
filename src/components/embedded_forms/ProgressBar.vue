<script setup lang="ts">
import { computed } from "vue";
import type { ProgressData, ProgressDataWithWidth } from "@/types/EmbeddedForm";
import ProgressTab from "./ProgressTab.vue";

const props = defineProps({
    active: {
        type: Number,
        required: true
    },
    data: {
        type: Array as () => ProgressData[],
        required: true
    }
});

const pageWidths = computed((): ProgressDataWithWidth[] => {
    const page_no: number = props.data.length;
    const full_width: number = 100;
    const each_width: number = full_width / page_no;

    return props.data.map((page: ProgressData, index: number): ProgressDataWithWidth => {
        const new_index: number = (index == 0) ? 0 : index + 1;
        return {
            width: each_width * new_index,
            ...page
        };
    })
});

const currentActiveData = computed((): ProgressDataWithWidth => {
    const output = pageWidths.value.find((page: ProgressDataWithWidth) => page.position === props.active);
    if (output) return output;
    return {} as ProgressDataWithWidth;
});

</script>
<template>
    <header class="relative">
        <div class="flex justify-between mx-auto mb-12 w-100 h-[.07rem] md:h-[.17rem] rounded-lg bg-carton-100">
            <ProgressTab v-for="(page, index) in data" :key="index" :active="active" :data="page" />
        </div>

        <div class="flex mx-auto mb-12 h-[.07rem] md:h-[.17rem] rounded-lg bg-primary absolute top-0"
            :style="{ width: `${currentActiveData.width}%` }"></div>

    </header>
</template>