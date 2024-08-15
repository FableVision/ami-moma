<script setup>
import { ref } from 'vue'
import { store } from './store';
import Home from './screens/Home.vue'
import Register from './screens/Register.vue';
import Login from './screens/Login.vue';
import ChallengeSelect from './screens/ChallengeSelect.vue';
import ChallengeSubmit from './screens/ChallengeSubmit.vue';
import ChallengeComplete from './screens/ChallengeComplete.vue';

const screens = {
  Home,
  Register,
  Login,
  ChallengeSelect,
  ChallengeSubmit,
  ChallengeComplete
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
