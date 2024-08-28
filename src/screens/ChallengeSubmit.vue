<script setup>
import { ref, onBeforeMount } from 'vue'
import db from '../firebase'
import { store } from '@/store'
import { doc, getDocs, query, collection, where, updateDoc } from 'firebase/firestore';
import Form from '@/components/Form.vue';
import MultipleChoice from '@/components/MultipleChoice.vue';
import Button from '@/components/Button.vue';

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
        await updateDoc(doc(db, 'Users', store.userId), `challengeResponses.${store.currentChallengeId}`, responses)
    }
}

function logOut() {
    store.resetUser()
    store.goToHome()
}
</script>

<template>
<div class="header">
    <Button :click="() => store.goToChallengeSelect()" variant="navigate"><span class="arrow">←</span> Challenge {{ store.currentChallengeId }}</Button>
    <Button :click="logOut" variant="navigate">Done for now</Button>
</div>
<div class="form-container" v-if="questions.length > 0 && currentQuestionIndex < questions.length">
    <Form v-if="questions[currentQuestionIndex]['options'] === undefined" btn-text="✔" :question-text="questions[currentQuestionIndex].question" @submit="incrementQuestion"></Form>
    <MultipleChoice v-else btn-text="✔" :question-text="questions[currentQuestionIndex].question" :options="questions[currentQuestionIndex]['options']" :max-choices="questions[currentQuestionIndex]['maxChoices'] ?? 0" @submit="incrementQuestion"></MultipleChoice>
</div>
</template>

<style>
.header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    top: 0;
    padding: 10px;
}

.arrow {
    font-family: system-ui;
    font-weight: 900;
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}
</style>