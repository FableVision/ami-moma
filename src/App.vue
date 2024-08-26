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
    <h1>Line Collector</h1>
  </header>
  <main>
    <component v-bind:is="screens[store.currentScreen]"></component>
  </main>
</template>

<style scoped>
header {
  text-align: center;
}

main {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  text-align: center;
}
</style>
