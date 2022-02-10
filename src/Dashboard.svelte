<script>
    import Leaderboard from './components/Leaderboard.svelte';
    import { push } from 'svelte-spa-router';
    import { authGuard } from './authGuard';
    import Navbar from './Navbar.svelte';

    authGuard();

</script>
<Navbar/>
<Leaderboard/>