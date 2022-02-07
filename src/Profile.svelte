<script>
    import { authState } from 'rxfire/auth';
    import { auth } from './firebase';
    import ContainersList from './components/ContainersList.svelte'
	import {signOut} from "firebase/auth";
    import { push } from 'svelte-spa-router';

    let loaded = false;
    let user;

    const unsubscribe = authState(auth).subscribe(
        u => {
            user = u;
           loaded = true;
        }
    );

    function logout() {
		signOut(auth);
        push('/login');
	}
</script>

{#if loaded}
<div class="container text-center mx-auto space-y-4">
    <img class="mx-auto rounded-full" src={user.photoURL} width="100" alt="avatar">
    <h3 class="text-4xl text-blue-500">{user.displayName}</h3>
    <button on:click={logout}>Log Out</button>
    <ContainersList uid={user.uid}/>
    <!-- <p>your userID is {user.uid}</p> -->
</div>
{/if}