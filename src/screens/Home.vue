<script setup>
import Button from '../components/Button.vue'
import { store } from '@/store';
</script>

<template>
    <Button :click="() => store.goToRegister()">Register</Button>
    <Button :click="() => store.goToLogin()">Log In</Button>
</template>

<style scoped>
</style>
