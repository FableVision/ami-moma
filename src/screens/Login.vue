<script setup>
import { ref } from 'vue'
import { doc, getDoc } from "firebase/firestore"
import Form from '@/components/Form.vue'
import db from '../firebase'
import { store } from '@/store'

let showAlert = ref(false)

async function handleSubmitUsername(input) {
    const docRef = doc(db, 'Users', input.trim().toLowerCase());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        store.setUserId(docSnap.data().username.toLowerCase())
        store.setUserDisplayName(docSnap.data().username)
        store.goToChallengeSelect()
    } else {
        showAlert.value = true;
    }
}
</script>

<template>
    <Form btn-text="✔" question-text="What's your team name?" @submit="handleSubmitUsername"></Form>
    <p v-if="showAlert">We don't have a team with that name. Try again!</p>
</template>