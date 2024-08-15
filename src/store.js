import { reactive } from 'vue'

export const store = reactive({
    currentScreen: 'Home',
    currentChallengeId: 0,
    username: '',
    goToHome() {
        this.currentScreen = 'Home'
    },
    goToRegister() {
        this.currentScreen = 'Register'
    },
    goToLogin() {
        this.currentScreen = 'Login'
    },
    goToChallengeSelect() {
        this.currentScreen = 'ChallengeSelect'
    },
    setUser(username) {
        this.username = username
    },
    resetUser() {
        this.username = ''
    },
    setChallenge(id) {
        this.currentChallengeId = id
    }
})