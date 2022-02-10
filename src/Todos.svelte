<script>
	import {auth, googleProvider} from './firebase';
	import {signInWithPopup, signOut} from "firebase/auth";
	import {authState} from 'rxfire/auth';

	import Profile from './Profile.svelte';
	import TodoList from './TodoList.svelte';
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
ABRADABRA
<Profile {...user}/>
<button on:click={logout}>sign out</button>
<hr>
<TodoList uid={user.uid}/>
{:else}
LOADING...
{/if}