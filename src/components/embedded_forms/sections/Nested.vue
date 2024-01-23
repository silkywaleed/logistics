<script setup lang="ts">
import { computed, ref, watch } from "vue";
import FieldType from "../FieldType.vue";
import ErrorLabel from "../fields/ErrorLabel.vue";

const props = defineProps({
    section: {
        type: Object,
        required: true
    }
});

const nested = ref<any[]>([]);
const error = ref<string>('This is required');

const addToNested = () => {
    let template: Record<string, any> = {};

    let error = false;

    props.section.fields.forEach((field: any) => {
        field.error = '';

        if (!field.value && field.is_required) {
            field.error = 'This is required!';
            error = true;
        } else {
            template[field.title] = field.value;
        }
    });

    if (!error) {
        nested.value.push(template);
    }
};

const removeFromNested = (index: number) => {
    nested.value.splice(index, 1);
}

const countNested = computed((): Number => {
    return nested.value.length
});

const createNestName = (nest: object): string => {
    const objectArray: any[] = Object.values(nest);

    return (objectArray.length == 3)
        ? `${objectArray[0]} ${objectArray[1]} - ${objectArray[2]}`
        : objectArray.join(' - ');
}

const nestedNameTag = computed((): string => {
    return props.section.container_name
        ? props.section.container_name
        : 'nested';
})

watch(nested, () => {
    props.section[String(nestedNameTag.value)] = { value: nested.value };
}, { deep: true })

</script>
<template>
    <!-- Show only the section -->
    <div class="grid md:grid-cols-2 gap-4">
        <div class="space-y-4 md:space-y-6">
            <!-- Section Name -->
            <h6 v-if="section.name" class="text-primary my-2 xl:my-4">{{ section.name }}</h6>
            <!-- Section Name Ends -->
            <div class="grid gap-4">
                <div v-for="(field, field_index) in section.fields" :key="field_index" :class="{
                    'col-span-12': (section.fields.length - 1) == field_index,
                    'col-span-12 sm:col-span-6': (section.fields.length - 1) !== field_index,
                }">
                    <div>
                        <FieldType :field="field" />
                    </div>
                </div>
            </div>
            <!-- Fields End -->
            <div class="flex justify-end !mt-2">
                <!--Add Button -->
                <button type="button" class="rounded-lg text-sm py-1.5 px-4 font-medium text-white capitalize bg-primary"
                    @click="addToNested">
                    add
                </button>
                <!--Add Button Ends -->
            </div>
        </div>
        <!-- Push to container -->
        <div class="space-y-4 md:space-y-6 relative">
            <!-- Section Name -->
            <div class="flex justify-between my-2 xl:my-4">
                <h6 v-if="section.container_name" class="text-primary">
                    {{ section.container_name }}
                </h6>
                <span class="text-primary font-medium">{{ countNested }}</span>
            </div>
            <!-- Section Name Ends -->

            <div class="border text-sm md:text-base rounded-lg focus:ring-primary focus:border-primary w-full p-1 shadow-sm h-[80%] flex flex-col overflow-y-auto gap-1"
                :class="{ 'border-gray-300': !section.error[String(nestedNameTag)], 'border-red-600': section.error[String(nestedNameTag)] }">
                <!-- Each Nested Row Object -->
                <div class="w-full border rounded p-1 flex relative" v-for="(nest, index) in nested" :key="index">
                    <div class="w-[95%] text-xs">
                        {{ createNestName(nest) }}
                    </div>
                    <button type="button" class="absolute right-1 top-1/4 text-xs" @click="removeFromNested(index)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-3 h-3 text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
                <!-- Each Nested Row Object -->
            </div>
            <ErrorLabel :error="section.error[String(nestedNameTag)]" class="absolute -bottom-9" />
            <!-- Fields End -->
        </div>
        <!-- Push to container -->
    </div>
</template>