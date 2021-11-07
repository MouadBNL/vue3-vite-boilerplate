<template>
	<div>
		<span v-if="auth.user">
			{{ auth.user.name }}
			<button @click="auth.logout">logout</button>
		</span>
		<span v-else>
			<router-link :to="{name: 'auth.login'}">login</router-link>
			<router-link :to="{name: 'auth.register'}">register</router-link>
		</span>
	</div>
	<TheBaseLayout>
		<router-view></router-view>
	</TheBaseLayout>
</template>

<script setup lang="ts">
import TheBaseLayout from './layouts/base/TheBaseLayout.vue'
import { useAuthStore } from '@/modules/auth/store/auth-store'

const auth = useAuthStore()
</script>