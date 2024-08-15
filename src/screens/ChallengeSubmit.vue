<script setup>
import { ref, onBeforeMount } from 'vue'
import db from '../firebase'
import { store } from '@/store'
import { doc, getDocs, query, collection, where, updateDoc } from 'firebase/firestore';
import Form from '@/components/Form.vue';
import MultipleChoice from '@/components/MultipleChoice.vue';

const currentQuestionIndex = ref(0)
const questions = ref([])
const responses = []

onBeforeMount(async () => {
    const snapshot = await getDocs(query(collection(db, 'Challenges'), where('id', '==', store.currentChallengeId)))
    snapshot.docs[0].data().questions.forEach((question) => {
        questions.value.push(question)
    })
})

async function incrementQuestion(input) {
    responses.push(input)
    if (currentQuestionIndex.value < questions.value.length - 1) {
        currentQuestionIndex.value++
    } else {
        store.goToChallengeSelect()
        await updateDoc(doc(db, 'Users', store.username), `challengeResponses.${store.currentChallengeId}`, responses)
    }
}

</script>

<template>
<div class="form-container" v-if="questions.length > 0 && currentQuestionIndex < questions.length">
    <Form v-if="questions[currentQuestionIndex]['options'] === undefined" btn-text="OK" :question-text="questions[currentQuestionIndex].question" @submit="incrementQuestion"></Form>
    <MultipleChoice v-else btn-text="OK" :question-text="questions[currentQuestionIndex].question" :options="questions[currentQuestionIndex]['options']" :max-choices="questions[currentQuestionIndex]['maxChoices'] ?? 0" @submit="incrementQuestion"></MultipleChoice>
</div>
</template>

<style>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}
</style>