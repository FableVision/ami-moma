<script setup>
import Button from '@/components/Button.vue';

defineProps({
    goToHome: Function
})

</script>

<template>
    <h1>Which challenge card are you working on?</h1>
    <div class="challengeButtonContainer">
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
        <Button>5</Button>
    </div>
    <Button v-if="false">Complete</Button>
    <Button v-else :click="goToHome">Done for now</Button>
</template>