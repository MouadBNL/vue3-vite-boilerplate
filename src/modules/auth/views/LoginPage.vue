<template>
    <div>
        <form @submit.prevent="">
            <label for="email">Email</label>
            <input type="email" v-model="email"><br />
            <label for="passowrd">passowrd</label>
            <input type="password" v-model="password"><br />
            <input type="submit" @click="sendLoginRequest">
        </form>
        <p>{{ isLoading ? 'Loading...' : 'Finished.' }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { router } from "@/router"
import { useAuthStore } from '../store/auth-store'

const auth = useAuthStore()
const email = ref('user@host.com')
const password = ref('password')
const isLoading = ref(false)
const sendLoginRequest = () => {
    isLoading.value = true
    auth.login({
        email: email.value,
        password: password.value
    }).then((res) => {
        router.push({name: 'auth.auth'})
    })
    .catch((err) => {
        console.log({err})
    })
    .finally(() => {
        isLoading.value = false
    })
}
</script>