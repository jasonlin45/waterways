<script>
	import Router from 'svelte-spa-router';
	import routes from './routes';
</script>

<Router {routes}/>

<div class="md:fixed left-1 bottom-1 text-gray-500">
	Drinking too much water can be dangerous. 
	<br>Please try not to exceed 1 liter (~34oz) per hour.
</div>

<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	
	body {
		margin: 0;
		padding: 0;
	}
</style>