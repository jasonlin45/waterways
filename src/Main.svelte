<script>
	import {auth} from './firebase';
	import {signOut} from "firebase/auth";
	import {authState} from 'rxfire/auth';
    import {push} from 'svelte-spa-router';

	import Profile from './Profile.svelte';
    import Waterlog from './components/Waterlog.svelte';

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

</script>

{#if loaded}
<div class="container text-center mx-auto">
    <Waterlog uid={user.uid}/>
    <button on:click={logout}>sign out</button>
</div>
{:else}
<div class="flex h-screen">
    LOADING...
</div>
{/if}