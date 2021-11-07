<template>
    <div>
        <h1>Home page</h1>
        <button @click="handleClick">Send request</button> <span>{{ isLoading ? 'Loading...': 'Finished'}}</span>
        <div style="display: flex; gap: 1rem;">
            <div>
                <p>Data</p>
                <pre>{{data}}</pre>
            </div>
            <div>
                <p>Error</p>
                <pre>{{error}}</pre>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAxios } from '@/services/use-axios'
const { fetch, data, error, isLoading } = useAxios('https://jsonplaceholder.typicode.com/users')
const handleClick = async () => {
    await fetch()
    console.log(data.value)
}
</script>