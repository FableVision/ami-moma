<script setup>
import { ref, onUpdated, onMounted } from 'vue'
import Button from './Button.vue';

defineProps({
    btnText: String,
    questionText: String
})

const input = ref('')
const textarea = ref(null)

onMounted(() => {
    textarea.value.focus()
    textarea.value.select()
})

onUpdated(() => {
    textarea.value.focus()
})

</script>

<template>
    <h1>{{ questionText.replaceAll("\\n", "\n") }}</h1>
    <textarea v-model="input" ref="textarea" autocapitalize="off"></textarea>
    <Button :click="() => {$emit('submit', input); input = ''}" :disabled="input === ''" variant="ok">{{ btnText }}</Button>
</template>

<style scoped>
textarea {
    font-size: x-large;
    font-family: 'MoMA Sans-Bold';
    width: 300px;
}

h1 {
    white-space: pre-line;
    line-height: 2;
}
</style>
