<script setup lang="ts">
import { computed } from "vue";
// import FieldType from "./FieldType.vue";
import NotNested from "./sections/NotNested.vue";
import Nested from "./sections/Nested.vue";
import type { } from "@/types/EmbeddedForm";

const props = defineProps({
    activePage: {
        type: Number,
        required: true
    },
    pages: {
        type: Array as () => any[],
        required: true
    }
});

const currentPageIndex = computed((): number => {
    return props.activePage - 1;
})

</script>
<template>
    <div v-for="(page, page_index) in pages" ::key="page_index" class="row">
        <!-- Show only the current page -->
        <div v-if="page_index == currentPageIndex" class="grid grid-cols-1 gap-4 space-y-4">
            <div v-for="(section, section_index) in page.sections" :key="section_index" class="grid grid-cols-1 mb-5">
                <Nested v-if="section.type == 'nested'" :section="section" />
                <NotNested v-else :section="section" />
            </div>
        </div>
    </div>
</template>