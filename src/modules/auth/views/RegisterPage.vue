<template>
    <div>
        <form @submit.prevent="sendRegisterRequest">
            <p>{{ isLoading ? 'Loading...' : 'Finished.'}}</p>
            <label for="name">Name</label>
            <input type="text" v-model="name">
            <br>
            <label for="email">Email</label>
            <input type="email" v-model="email">
            <br>
            <label for="password">Password</label>
            <input type="password" v-model="password">
            <br>
            <label for="password_confirmation">Confirm your password</label>
            <input type="password" v-model="passwordConfirmation">
            <br>
            <input type="submit">
            <br>
            <p v-if="error">
                {{ error }}
            </p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/auth-store'
import { router } from '@/router'

const auth = useAuthStore()
const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const isLoading = ref(false)
const error = ref('')

const sendRegisterRequest = () => {
    auth.register({
        name: name.value,
        email: email.value,
        password: password.value,
        password_confimration: passwordConfirmation.value
    }).then((res) => {
        router.push({name: 'auth.auth'})
    })
    .catch((err) => {
        error.value = err
    })
}
</script>