<script setup>
import { reactive } from 'vue'
import Form from '@/components/Form.vue';

const props = defineProps({
    goToChallengeSelect: Function
})

function handleSubmitUsername(input) {
    // check here to see if valid username
    
    props.goToChallengeSelect()
}

</script>

<template>
    <Form btn-text="Enter" question-text="What's your username?" @submit="handleSubmitUsername"></Form>
</template>