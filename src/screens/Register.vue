<script setup>
import { ref, reactive } from 'vue'
import { doc, getDoc, setDoc } from "firebase/firestore"
import Form from '@/components/Form.vue'
import db from '../firebase'
import { store } from '@/store'

let showAlert = ref(false)
const user = reactive({
    name: '',
    username: '',
    challengeResponses: {
        // 1: [] // challengeId: array of responses
    }
})

const props = defineProps({
    goToChallengeSelect: Function
})

function handleSubmitName(input) {
    console.log(input)
    user.name = input
}

async function handleSubmitUsername(input) {
    const docRef = doc(db, 'Users', input);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        showAlert.value = true;
    } else {
        user.username = input
        try {
            await setDoc(doc(db, "Users", user.username), user);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        store.setUser(user.username)
        props.goToChallengeSelect()
    }
}
</script>

<template>
    <Form v-if="user.name === ''" btn-text="Enter" question-text="What are your names?" @submit="handleSubmitName"></Form>
    <Form v-else btn-text="Enter" question-text="What's your username? Pick something unique." @submit="handleSubmitUsername"></Form>
    <p v-if="showAlert">That username is already taken. Try another one!</p>
</template>