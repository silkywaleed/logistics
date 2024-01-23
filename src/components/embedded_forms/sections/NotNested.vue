<script setup lang="ts">
import { computed } from "vue";
import FieldType from "../FieldType.vue";

const props = defineProps({
    section: {
        type: Object,
        required: true
    }
});

</script>
<template>
    <!-- Show only the section -->
    <div class="grid grid-cols-1 gap-4">
        <div class="space-y-5 md:space-y-12">
            <!-- Section Name -->
            <h6 v-if="section.name" class="text-primary my-2 xl:my-4">{{ section.name }}</h6>
            <!-- Section Name Ends -->

            <!-- Fields --}} -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(field, field_index) in section.fields" :key="field_index">
                    <div class="col-span-6">
                        <FieldType :field="field" />
                    </div>
                </div>
            </div>
            <!-- Fields End -->
        </div>
    </div>
</template>