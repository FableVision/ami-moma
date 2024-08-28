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
    <h1>{{ questionText.replaceAll("\\n", "\n") }}</h1>
    <div class="multiple-choice-container">
        <label v-for="option in options">
            <input v-if="maxChoices === 1" type="radio" :value="option" v-model="input[0]"/>
            <input v-else type="checkbox" :id="option" :value="option" v-model="input" :style="{ gridTemplateColumns: repeat(2, 1fr) }">
            <label :for="option">{{ option }}</label>
        </label>
    </div>
    <Button :click="() => {$emit('submit', input.toString().toLowerCase()); input.length = 0}" :disabled="input.length === 0" variant="ok">{{ btnText }}</Button>
</template>

<style scoped>
h1 {
    white-space: pre-line;
    line-height: 2;
}

input {
    margin: 0 5px;
    width: 20px;
    height: 20px;
}

.multiple-choice-container {
    display: grid;
    gap: 8px;
}

label {
    font-size: x-large;
    align-items: center;
    display: flex;
}
</style>
