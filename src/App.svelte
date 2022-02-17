<script>
	import Router from 'svelte-spa-router';
	import routes from './routes';
</script>

<Router {routes}/>

<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	
	body {
		margin: 0;
		padding: 0;
	}
</style>