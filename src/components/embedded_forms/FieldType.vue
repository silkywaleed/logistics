<script setup lang="ts">
import Text from './fields/Text.vue';
import TextArea from './fields/TextArea.vue';
import DateTime from './fields/DateTime.vue';
import Number from './fields/Number.vue';
import Radio from './fields/Radio.vue';
import Select from './fields/Select.vue';
import Map from './fields/Map.vue';
import DragZone from './fields/DragZone.vue';
import Email from './fields/Email.vue';
import Password from './fields/Password.vue';

const props = defineProps({
    field: {
        type: Object,
        required: true
    }
});
</script>
<template>
    <Text v-if="field.type === 'text'" :field="field" />
    <Email v-if="field.type === 'email'" :field="field" />
    <Number v-if="field.type === 'number'" :field="field" />
    <Password v-if="field.type === 'password'" :field="field" />
    <TextArea v-if="field.type === 'textarea'" :field="field" />
    <DateTime v-if="['date', 'datetime', 'datetime-local'].includes(field.type)" :field="field" />
    <Radio v-if="field.type === 'radio'" :field="field" />
    <Select v-if="['select', 'dropdown'].includes(field.type)" :field="field" />
    <Map v-if="field.type === 'map'" :field="field" />
    <DragZone v-if="['image', 'file'].includes(field.type)" :field="field" />
</template>