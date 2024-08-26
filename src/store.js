import { reactive } from 'vue'

export const store = reactive({
    currentScreen: 'Home',
    currentChallengeId: 0,
    userId: '',
    userDisplayName: '',
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
    goToChallengeSubmit() {
        this.currentScreen = 'ChallengeSubmit'
    },
    goToChallengeComplete() {
        this.currentScreen = 'ChallengeComplete'
    },
    setUserId(userId) {
        this.userId = userId
    },
    setUserDisplayName(name) {
        this.userDisplayName = name
    },
    resetUser() {
        this.userId = ''
        this.userDisplayName = ''
    },
    setChallenge(id) {
        this.currentChallengeId = id
    }
})