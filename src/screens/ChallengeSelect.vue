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

function hasCompletedAnyChallenges() {
    return challenges.value.some((challenge) => {
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
        <Button v-for="c in challenges" :key="c.id" :disabled="hasCompletedChallenge(c)" :click="() => selectChallenge(c.id)" :variant="`card-`+ ((c.id - 1) % 3 + 1)">{{ c.id }}</Button>
    </div>
    <div class="action-button-container" v-if="user.username">
        <Button :click="logOut" variant="navigate">Done for now</Button>
        <Button :disabled="!hasCompletedAnyChallenges()" :click="() => { cancelTimeout(); store.goToChallengeComplete() }" variant="navigate">Complete my collection!</Button>
    </div>
</template>

<style>
.challenge-button-container {
    display: flex;
    gap: 25px;
    margin-bottom: 20px;
}

.action-button-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
</style>