<script setup lang="ts">
import { ref, computed, watch } from "vue";
import ErrorLabel from './ErrorLabel.vue';

const props = defineProps({
    field: {
        type: Object,
        required: true
    }
});

const hiddenInput = ref();

const selectedFiles = ref<any[]>([]);

const acceptsType = computed((): string => {
    const accepted: string[] = ['*', 'image/*', '.pdf'];

    if (!props.field.type) return accepted[0];
    if (props.field.type == 'image') return accepted[1];
    if (props.field.type == 'file') return accepted[2];
    return accepted[0];
});

const selectFile = (): void => {
    if (!hiddenInput.value) return;
    hiddenInput.value.click();
};

const removeFile = (index: number) => {
    selectedFiles.value.splice(index, 1);
};

const handleDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
};

const handleDrop = (event: any) => {
    event.preventDefault();

    const { files } = event.dataTransfer;

    handleFileList(files);
};

const selectedFile = (event: any) => {

    event.preventDefault();

    const { files } = event.target;

    handleFileList(files);
};

const handleFileList = (files: any) => {
    if (!props.field.is_active) return;

    if (!props.field.is_multi && files.length > 1) {
        props.field.error = "Multiple files are not allowed";
        return;
    }

    props.field.error = "";

    selectedFiles.value = (!props.field.is_multi) ? [...files] : [...selectedFiles.value, ...files];

    props.field.value = selectedFiles.value;
};

watch(() => props.field, () => {
}, { deep: true });

</script>
<template>
    <!-- Image or Dragzone  -->
    <div class="flex flex-col space-y-2">
        <label v-if="field.title" :for="field.title" class="text-xs sm:text-sm font-medium inline-flex gap-3"
            :class="{ 'text-primary': !field.error, 'text-red-600': field.error }">
            <span>{{ field.title }}</span>
            <span v-if="field.is_required" class="text-red-600">*</span>
        </label>
        <div @dragover.prevent="handleDragOver" @drop.prevent="handleDrop"
            class="border border-primary text-sm md:text-base rounded-lg focus:ring-primary focus:border-primary w-full p-2.5 shadow-sm min-h-[14rem] h-full bg-dragzone relative"
            :class="{ 'border-gray-300': !field.error, 'border-red-600': field.error }">
            <p class="text-xs text-primary absolute top-1/2 !w-full flex justify-center">
                <span class="-ml-5">Drag & Drop or
                    <button class="" @click.prevent="selectFile">upload</button></span>
            </p>
            <ul class="list-none space-y-2" v-if="selectedFiles.length > 0">
                <li v-for="(file, index) in selectedFiles" :key="index"
                    class="flex justify-between border rounded p-1 text-sm">
                    <span class="my-auto text-sm">{{ file.name }}</span>
                    <button class="my-auto text-sm" @click="removeFile(index)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </li>
            </ul>
        </div>
        <input ref="hiddenInput" type="file" :accept="acceptsType" :multiple="Boolean(field.is_multi)"
            :disabled="!field.is_active" @change="selectedFile" v-show="false">
        <ErrorLabel :error="field.error" />
    </div>
    <!-- Image or Dragzone Ends  -->
</template>
