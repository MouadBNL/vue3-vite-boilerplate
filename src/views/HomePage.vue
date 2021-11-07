<template>
    <div>
        <h1>Home page</h1>
        <button @click="handleClick">Send request</button>
        <pre>{{data}}</pre>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useAxios } from '@/services/use-axios'
const { fetch, data } = useAxios('https://jsonplaceholder.typicode.com/users')
const handleClick = async () => {
    await fetch()
    console.log(data.value)
}
</script>