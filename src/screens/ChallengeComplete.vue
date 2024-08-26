<script setup>
import { onBeforeMount, ref } from 'vue'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { store } from '@/store'
import db from '../firebase'
import { jsPDF } from  'jspdf'
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

    const docSnap = await getDoc(doc(db, 'Users', store.userId))
    if (docSnap.exists()) {
        name = docSnap.data().username
        const challengeKeys = Object.keys(docSnap.data().challengeResponses)
        challengeKeys.sort()
        challengeKeys.forEach((challengeId) => {
            responses.value.push(docSnap.data().challengeResponses[challengeId])
        })
    }
})

function templatedSentence(sentence, pageIndex) {
    const sentenceVariables = {}
    if (pageIndex === 0) {
        sentenceVariables[0] = name
    } else if (pageIndex > 0 && pageIndex <= responses.value.length) {
        responses.value[pageIndex - 1].forEach((variable, index) => {
            sentenceVariables[index] = formattedString(variable)
        })
    }

    return template(sentence, sentenceVariables)
}

function formattedString(string) {
    const words = string.split(',')
    if (words.length === 1) return words[0].trim()
    if (words.length === 2) return words.join(' and ')
    const lastWord = words.pop()
    return words.join(', ') + ', and ' + lastWord
}

function generateSharePDF() {
    const doc = new jsPDF();
    doc.setFontSize(30);
    storyTemplates.value.forEach((page, pageIndex) => {
        const sentences = []
        page.sentences.forEach((sentence) => {
            sentences.push(...doc.splitTextToSize(templatedSentence(sentence, pageIndex), 180))
        })
        doc.text(sentences, 15, 20, {
            lineHeightFactor: 1.5
        });
        if (pageIndex < storyTemplates.value.length - 1) {
            doc.addPage()
        }
    })

    if (navigator.share) {
        const pdf = new File([doc.output('arraybuffer')], "story.pdf", { type: "application/pdf" });
        const files = [pdf]
        navigator.share({ files })
    } else {
        doc.output('dataurlnewwindow')
    }
}

function finish() {
    store.resetUser()
    store.goToHome()
}
</script>

<template>
<div v-if="storyTemplates.length > 0 && responses.length > 0">
    <h2 v-for="sentence in storyTemplates[currentPageIndex].sentences">{{ templatedSentence(sentence, currentPageIndex) }}</h2>
    <div class="button-container">    
        <Button v-if="currentPageIndex < storyTemplates.length - 1" :click="() => {currentPageIndex++}">Next</Button>
        <div v-else class="button-row">
            <Button :click="finish">Return Home</Button>
            <Button :click="generateSharePDF">Share</Button>
        </div>
    </div>
</div>
</template>

<style>
.button-container {
    display: flex;
    margin: 15px 0;
    justify-content: space-around;
}

.button-row {
    display: flex;
    gap: 10px;
}
</style>