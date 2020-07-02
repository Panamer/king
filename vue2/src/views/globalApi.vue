<template>
  <div>
		<p v-for="slient in slients" :key="slient">
			{{ slient }}
		</p>
	</div>
</template>

<script>
export default {
	name: "api",
	data() {
		return {
			slients: ['slient', 'for', 'lisy', 'maliya']
		}
	},
	methods: {
	},
};
</script>

<style lang="scss" scoped>
</style>