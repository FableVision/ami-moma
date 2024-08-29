<script setup>
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

const screenBackgrounds = {
  Home: new URL("/public/images/bg_login.png", import.meta.url).href,
  Register: new URL("/public/images/bg_login.png", import.meta.url).href,
  Login: new URL("/public/images/bg_login.png", import.meta.url).href,
  ChallengeSelect: new URL("/public/images/bg_challenge_02.png", import.meta.url).href,
  ChallengeSubmit: new URL("/public/images/bg_challenge_02.png", import.meta.url).href,
  ChallengeComplete: new URL("/public/images/bg_challenge_02.png", import.meta.url).href
}
</script>

<template>
  <div class='background' :style="{ backgroundImage: 'url(' + screenBackgrounds[store.currentScreen] + ')' }"></div>
  <header>
    <img class="logo" src="/public/images/linecollector.png">
  </header>
  <main>
    <component v-bind:is="screens[store.currentScreen]"></component>
  </main>
</template>

<style scoped>
.background {
  top: 0;
  left: 0;
  z-index: -1;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}

.logo {
  max-width: 60vw;
}

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
