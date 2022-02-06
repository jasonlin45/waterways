<script>
	import {auth} from './firebase';
	import {signOut} from "firebase/auth";
	import {authState} from 'rxfire/auth';

	import Profile from './Profile.svelte';
    import {push} from 'svelte-spa-router';
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
<div class="container">
    <Profile {...user}/>
    <button on:click={logout}>sign out</button>
</div>
{:else}
<div class="flex h-screen">
    LOADING...
</div>
{/if}