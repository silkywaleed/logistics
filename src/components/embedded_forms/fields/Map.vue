<script setup lang="ts">
import { GoogleMap, Marker, CustomMarker  } from 'vue3-google-map';
import ErrorLabel from './ErrorLabel.vue';
import { ref, computed, watch, nextTick } from 'vue';

interface Center {
    lat: number;
    lng: number;
};

const props = defineProps({
    field: {
        type: Object,
        required: true
    }
});

const center = ref<Center>({ lat: 24.75235, lng: 46.726273 });
const centerKeys = ref<Center[]>([] as Center[]);
const api_key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const updateLocation = (event: any) => {

    if (!props.field.is_active) return;

    const { Va } = event;

    if (!Va || Va == 'undefined') return;

    const { x, y } = Va;

    center.value.lng = x;
    center.value.lat = y;

    console.log(x, y)
    props.field.value = center.value;
};

const markerOptions = computed((): any => {
    return {
        position: center.value,
        anchorPoint: 'BOTTOM_CENTER'
    };
});

// const shouldRender = ref(true);

// const forceRerender = () => {
//     shouldRender.value = false;
//     nextTick(() => {
//         shouldRender.value = true;
//     });
// };


watch(center, () => {
    centerKeys.value = [center.value];
    console.log(center.value);
    // forceRerender()
}, { deep: true })
</script>
<template>
    <!-- Map  -->
    <div class="flex flex-col space-y-2">
        <label v-if="field.title" :for="field.title" class="text-xs sm:text-sm font-medium inline-flex gap-3"
            :class="{ 'text-primary': !field.error, 'text-red-600': field.error }">
            <span>{{ field.title }}</span>
            <span v-if="field.is_required" class="text-red-600">*</span>
        </label>
        <div class="border text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 shadow-sm min-h-[24rem] max-h-[24rem] h-full"
            :class="{ 'border-gray-300': !field.error, 'border-red-600': field.error }">
            <GoogleMap :api-key="api_key" style="width: 100%; height: 22.5rem;" :center="center" :zoom="15"
                @click="updateLocation">
                <!-- <Marker v-bind:options="markerOptions"  /> -->
                <CustomMarker :options="markerOptions">
      <div style="text-align: center">
        <div style="font-size: 1.125rem">Vuejs Amsterdam</div>
        <img src="https://vuejs.org/images/logo.png" width="50" height="50" style="margin-top: 8px" />
      </div>
    </CustomMarker>
            </GoogleMap>
        </div>
        <ErrorLabel :error="field.error" />
    </div>
    <!-- Map Ends  -->
</template>
