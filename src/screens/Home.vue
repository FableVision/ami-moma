<script setup>
import Button from '../components/Button.vue'
import { store } from '@/store';
</script>

<template>
    Thanks for joining Vashti on an Art Adventure to collect lines around  the Museum. Click “register” or “login” to begin!
    <div class="button-container">
        <Button :click="() => store.goToRegister()">Register</Button>
        <Button :click="() => store.goToLogin()">Log In</Button>
    </div>
</template>

<style scoped>
.button-container {
    display: flex;
    flex-direction: row;
    gap: 50px;
}
</style>
