<script setup lang="ts">

const emit = defineEmits(['backToService']);

</script>
<template>
    <div class="p-8 m-auto">
        <div class="flex justify-center">
            <img src="/images/thumbs_up.png" alt="thumbs_up icon">
        </div>
        <div class="flex">
            <p class="font-semibold my-5 mx-auto text-lg xl:text-lg text-center">Thanks, your request has been submitted successfully
            </p>
        </div>
        <div class="flex justify-center">
            <button type="button" @click="emit('backToService')" class="text-white bg-secondary hover:bg-green-400 rounded-lg text-sm px-3 md:px-5 py-2.5 font-semibold mx-auto w-[80%] md:w-[25%]
                capitalize">
                back to services</button>
        </div>
    </div>
</template>