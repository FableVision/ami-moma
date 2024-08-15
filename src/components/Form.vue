<script setup>
import { ref } from 'vue'
import Button from './Button.vue';

defineProps({
    btnText: String,
    questionText: String
})

const input = ref('')
</script>

<template>
    <h1>{{ questionText }}</h1>
    <textarea v-model="input"></textarea>
    <Button :click="() => {$emit('submit', input)}" :disabled="input === ''">{{ btnText }}</Button>
</template>

<style scoped>
</style>
