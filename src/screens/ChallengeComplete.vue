<script setup>
import { onBeforeMount, ref } from 'vue'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { store } from '@/store'
import db from '../firebase'
import Button from '@/components/Button.vue'

let name = ''
let storyTemplates = ref([])
let responses = ref([])
const currentPageIndex = ref(0)
const template = (tpl, args) => tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);

onBeforeMount(async () => {
    const snapshot = await getDocs(collection(db, 'StoryTemplates'));
    snapshot.forEach((doc) => {
        storyTemplates.value.push(doc.data())
    })
    storyTemplates.value.sort((a, b) => a.id - b.id)

    const docSnap = await getDoc(doc(db, 'Users', store.username))
    if (docSnap.exists()) {
        name = docSnap.data().name
        const challengeKeys = Object.keys(docSnap.data().challengeResponses)
        challengeKeys.sort()
        challengeKeys.forEach((challengeId) => {
            responses.value.push(docSnap.data().challengeResponses[challengeId])
        })
    }
})

function templatedSentence(sentence) {
    const sentenceVariables = {}
    if (currentPageIndex.value > 0) {
        responses.value[currentPageIndex.value - 1].forEach((variable, index) => {
            sentenceVariables[index] = formattedString(variable)
        })
    } else {
        sentenceVariables[0] = name
    }
    return template(sentence, sentenceVariables)
}

function formattedString(string) {
    const words = string.toLowerCase().split(',')
    if (words.length === 1) return words[0].trim()
    if (words.length === 2) return words.join(' and ')
    const lastWord = words.pop()
    return words.join(', ') + ', and ' + lastWord
}

</script>

<template>
<div v-if="storyTemplates.length > 0 && responses.length > 0">
    <h2 v-for="sentence in storyTemplates[currentPageIndex].sentences">{{ templatedSentence(sentence) }}</h2>
    <Button v-if="currentPageIndex < storyTemplates.length - 1" :click="() => {currentPageIndex++}">Next</Button>
    <Button v-else>Share</Button>
</div>
</template>