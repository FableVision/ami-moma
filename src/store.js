import { reactive } from 'vue'

export const store = reactive({
    username: '',
    setUser(username) {
        this.username = username
    },
    resetUser() {
        this.username = ''
    }
})