<script setup>
import { ref } from 'vue'
import Button from './Button.vue';

defineProps({
    btnText: String,
    questionText: String,
    options: Array,
    maxChoices: Number
})

const input = ref([])
</script>

<template>
    <h1>{{ questionText.replaceAll("\\n", "\n\n") }}</h1>
    <div class="multiple-choice-container">
        <label v-for="option in options">
            <input v-if="maxChoices === 1" type="radio" :value="option" v-model="input[0]"/>
            <input v-else type="checkbox" :id="option" :value="option" v-model="input">
            <label :for="option">{{ option }}</label>
        </label>
    </div>
    <Button :click="() => {$emit('submit', input.toString().toLowerCase()); input.length = 0}" :disabled="input.length === 0">{{ btnText }}</Button>
</template>

<style scoped>
h1 {
    white-space: pre-line;
}

input {
    margin: 0 5px;
}

.multiple-choice-container {
    display: flex;
    gap: 10px;
    flex-direction: row;
    flex-wrap: wrap;
}

label {
    font-size: large;
}
</style>
