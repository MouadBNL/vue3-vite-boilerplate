<template>
	<div>
		<div>
			<router-link :to="{name: 'home'}">home</router-link>
			<router-link :to="{name: 'about'}">about</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script setup lang="ts">

</script>