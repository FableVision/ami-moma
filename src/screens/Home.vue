<script setup>
import Button from '../components/Button.vue'
import { store } from '@/store';
</script>

<template>
    <h2 class="home-instructions">
        Thanks for joining Vashti on an Art Adventure to collect lines around the Museum. Click “register” or “login” to begin!
    </h2>
        <div class="button-container">
        <Button :click="() => store.goToRegister()" variant="start">Register</Button>
        <Button :click="() => store.goToLogin()" variant="start">Log In</Button>
    </div>
</template>

<style>
.home-instructions {
    line-height: 1.5;
    max-width: 60vw;
}

.button-container {
    display: flex;
    flex-direction: row;
    gap: 50px;
}
</style>
