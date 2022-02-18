<script>
    import { authState } from 'rxfire/auth';
    import { auth } from './firebase';
    import GroupList from './components/group/GroupList.svelte';
	import {signOut} from "firebase/auth";
    import { push } from 'svelte-spa-router';
    import { authGuard } from './authGuard';
    import Navbar from './Navbar.svelte';
    import { onDestroy } from 'svelte';
    const unsub = authGuard();

    let loaded = false;
    let user;

    const unsubscribe = authState(auth).subscribe(
        u => {
            if(u){
                user = u;
                loaded = true;
            }
        }
    );

    function logout() {
		signOut(auth);
        push('/login');
	}

    onDestroy(() => {
        unsubscribe.unsubscribe();
        unsub.unsubscribe();
    })

</script>
<Navbar/>
{#if loaded}
<div class="container text-center mx-auto space-y-4">
    <div class="space-y-4 w-fit mx-auto p-4 px-8 rounded-xl">
        <img class="mx-auto rounded-full" src={user.photoURL} width="100" alt="avatar">
        <h3 class="text-4xl text-blue-500">{user.displayName}</h3>
        <button class="p-2 px-4 text-blue-500 border-2 border-blue-500 rounded-xl m-8" on:click={logout}>Log Out</button>
    </div>
    <GroupList uid={user.uid}/>
    <!-- <div class="py-4">
        The containers feature is still WIP.
        <ContainersList uid={user.uid}/>
    </div> -->
    <!-- <p>your userID is {user.uid}</p> -->
</div>
{/if}