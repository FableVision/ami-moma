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
  Home: "/public/images/bg_login.png",
  Register: "/public/images/bg_login.png",
  Login: "/public/images/bg_login.png",
  ChallengeSelect: "/public/images/bg_challenge_02.png",
  ChallengeSubmit: "/public/images/bg_challenge_02.png",
  ChallengeComplete: "/public/images/bg_challenge_02.png"
}
</script>

<template>
  <img class='background' :src="screenBackgrounds[store.currentScreen]">
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
  position: absolute;
  z-index: -1;
  height: 100vh;
  width: auto;
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
