<script setup>
import { ref, onMounted } from 'vue'
import Button from './Button.vue';

defineProps({
    btnText: String,
    questionText: String
})

const input = ref('')
const textarea = ref(null)

onMounted(() => {
    textarea.value.focus()
})

</script>

<template>
    <h1>{{ questionText }}</h1>
    <textarea v-model="input" ref="textarea"></textarea>
    <Button :click="() => {$emit('submit', input)}" :disabled="input === ''">{{ btnText }}</Button>
</template>

<style scoped>
textarea {
    font-size: large;
}
</style>
