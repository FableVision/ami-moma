<script setup>
import { ref } from 'vue'
import Home from './screens/Home.vue'
import Register from './screens/Register.vue';
import Login from './screens/Login.vue';
import ChallengeSelect from './screens/ChallengeSelect.vue';
import { store } from './store';

let currentTab = ref('Home')
const screens = {
  Home,
  Register,
  Login,
  ChallengeSelect
}
</script>

<template>
  <header>
  </header>
  <main>
    <component v-bind:is="screens[store.currentScreen]"></component>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
</style>
