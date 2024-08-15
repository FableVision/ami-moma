<script setup>
import { ref } from 'vue'
import { doc, getDoc } from "firebase/firestore"
import Form from '@/components/Form.vue'
import db from '../firebase'
import { store } from '@/store'

let showAlert = ref(false)

async function handleSubmitUsername(input) {
    const docRef = doc(db, 'Users', input);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        store.setUser(docSnap.data().username)
        store.goToChallengeSelect()
    } else {
        showAlert.value = true;
    }
}
</script>

<template>
    <Form btn-text="Enter" question-text="What's your username?" @submit="handleSubmitUsername"></Form>
    <p v-if="showAlert">Hmm, we couldn't find an agent with that username. Did you enter it correctly?</p>
</template>