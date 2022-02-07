<script>
	import Router from 'svelte-spa-router';
	import routes from './routes';
	import Navbar from './Navbar.svelte';
</script>

<main>
	<Navbar/>
	<Router {routes}/>
</main>

<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>