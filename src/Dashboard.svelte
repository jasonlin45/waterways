<script>
    import Leaderboard from './components/Leaderboard.svelte';
    import { push } from 'svelte-spa-router';
    import { authGuard } from './authGuard';
    import Navbar from './Navbar.svelte';
    import { onDestroy } from 'svelte';

    const unsub = authGuard();

    onDestroy(() => {
        unsub.unsubscribe();
    })

</script>
<Navbar/>
<Leaderboard/>