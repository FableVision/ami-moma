<script setup>
import { ref } from 'vue'
import Home from './screens/Home.vue'
import Register from './screens/Register.vue';
import Login from './screens/Login.vue';
import ChallengeSelect from './screens/ChallengeSelect.vue';

let currentTab = ref('Home')
const screens = {
  Home,
  Register,
  Login,
  ChallengeSelect
}
const dynamicProps = {
  goToHome: () => currentTab.value = 'Home' ,
  goToRegister: () => currentTab.value = 'Register' ,
  goToLogin: () => currentTab.value = 'Login',
  goToChallengeSelect: () => currentTab.value = 'ChallengeSelect'
}
</script>

<template>
  <header>
  </header>
  <main>
    <component v-bind:is="screens[currentTab]" v-bind="dynamicProps"></component>
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
