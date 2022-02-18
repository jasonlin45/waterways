<script>
	import {auth} from './firebase';
	import {signOut} from "firebase/auth";
	import {authState} from 'rxfire/auth';
    import {push} from 'svelte-spa-router';

    import Waterlog from './components/Waterlog.svelte';
    import Navbar from './Navbar.svelte';
    
    import { onDestroy } from 'svelte';

    let loaded = false;
    let user;

    const unsubscribe = authState(auth).subscribe(u => {
        user = u;
        if(user) {
            loaded = true;  
        }
        else {
            push('/login');
        }
    });

	function logout() {
		signOut(auth);
        push('/login');
	}

    onDestroy(() => {
        unsubscribe.unsubscribe();
    })
</script>

<Navbar/>
{#if loaded}
<Waterlog uid={user.uid}/>
{:else}
<div class="flex h-screen">
    LOADING...
</div>
{/if}