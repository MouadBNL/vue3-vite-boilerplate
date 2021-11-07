<template>
    <TheBaseLayoutHeader />
    <main>
        <h1>BaseLayout</h1>
        <slot></slot>
    </main>
    <TheBaseLayoutFooter />
</template>

<script setup lang="ts">
import TheBaseLayoutHeader from './TheBaseLayoutHeader.vue'
import TheBaseLayoutFooter from './TheBaseLayoutFooter.vue';

</script>