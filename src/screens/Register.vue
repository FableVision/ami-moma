<script setup>
import { ref, reactive } from 'vue'
import { doc, getDoc, setDoc } from "firebase/firestore"
import Form from '@/components/Form.vue'
import db from '../firebase'
import { store } from '@/store'

let showAlert = ref(false)
const user = reactive({
    username: '',
    challengeResponses: {
        // 1: [] // challengeId: array of responses
    }
})

async function handleSubmitUsername(input) {
    const docRef = doc(db, 'Users', input.trim().toLowerCase());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        showAlert.value = true;
    } else {
        user.username = input.trim()
        try {
            await setDoc(doc(db, "Users", user.username.toLowerCase()), user);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        store.setUserId(user.username.toLowerCase())
        store.setUserDisplayName(user.username)
        store.goToChallengeSelect()
    }
}
</script>

<template>
    <Form btn-text="✔" question-text="What's your team name?" @submit="handleSubmitUsername"></Form>
    <p v-if="showAlert">Sorry! That team name is already in use. Pick another one!</p>
</template>