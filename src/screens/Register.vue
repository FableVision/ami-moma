<script setup>
import { reactive } from 'vue'
import Form from '@/components/Form.vue';

const userInput = reactive({
    name: '',
    username: ''
})

const props = defineProps({
    goToChallengeSelect: Function
})

function handleSubmitName(input) {
    console.log(input)
    userInput.name = input
}

function handleSubmitUsername(input) {
    // check here for unique username, if not unique, as to pick another one
    console.log(input)
    userInput.username = input
    props.goToChallengeSelect()
}

</script>

<template>
    <Form v-if="userInput.name === ''" btn-text="Enter" question-text="What are your names?" @submit="handleSubmitName"></Form>
    <Form v-else btn-text="Enter" question-text="What's your username? Pick something unique." @submit="handleSubmitUsername"></Form>
</template>