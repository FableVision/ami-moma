<script setup>
import Button from '../components/Button.vue'

defineProps({
    goToRegister: Function,
    goToLogin: Function
})

</script>

<template>
    <Button :click="goToRegister">Register</Button>
    <Button :click="goToLogin">Log In</Button>
</template>

<style scoped>
</style>
