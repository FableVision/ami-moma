<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import Button from '@/components/Button.vue';
import db from '../firebase'
import { store } from '@/store'

let user = ref({})
let challenges = ref([])
let timeoutId = null

onBeforeMount(async () => {
    const snapshot = await getDocs(collection(db, 'Challenges'));
    snapshot.forEach((doc) => {
        challenges.value.push(doc.data())
    })
    challenges.value.sort((a, b) => a.id - b.id)

    const docRef = doc(db, 'Users', store.userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        user.value.username = docSnap.data().username
        user.value.name = docSnap.data().name
        user.value.challengeResponses = docSnap.data().challengeResponses
    }
})

onMounted(() => {
    timeoutId = setTimeout(() => {
        logOut()
    }, 20000)
})

function cancelTimeout() {
    if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
    }
}

function logOut() {
    cancelTimeout()
    store.resetUser()
    store.goToHome()
}

function hasCompletedChallenge(challenge) {
    return user.value.challengeResponses[challenge.id] !== undefined && user.value.challengeResponses[challenge.id].length > 0
}

function hasCompletedAllChallenges() {
    return challenges.value.every((challenge) => {
        return hasCompletedChallenge(challenge)
    })
}

function selectChallenge(challengeId) {
    cancelTimeout()
    store.setChallenge(challengeId)
    store.goToChallengeSubmit()
}

</script>

<template>
    <h1>{{ store.userDisplayName }}, which challenge card are you working on?</h1>
    <div class="challenge-button-container" v-if="user.username">
        <Button v-for="c in challenges" :key="c.id" :disabled="hasCompletedChallenge(c)" :click="() => selectChallenge(c.id)">{{ c.id }}</Button>
    </div>
    <div v-if="user.username">
        <Button v-if="hasCompletedAllChallenges()" :click="() => { cancelTimeout(); store.goToChallengeComplete() }">Complete</Button>
        <Button v-else :click="logOut">Done for now</Button>
    </div>
</template>

<style>
.challenge-button-container {
    display: flex;
    gap: 10px;
}
</style>