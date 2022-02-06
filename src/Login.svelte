<script>
	import {auth, googleProvider} from './firebase';
	import {signInWithPopup} from "firebase/auth";
	import {authState} from 'rxfire/auth';
    import {push} from 'svelte-spa-router';

    authState(auth).subscribe(u => {
        if(u){
            push('/home');
        };
    });

    function login() {
		signInWithPopup(auth, googleProvider);
	}

</script>
<div class="flex h-screen">
    <div class="container m-auto text-center">
        <h1 class="text-xl text-blue-500">Welcome to WaterWays</h1>
    
        <h1 class="text-3xl">Log In</h1>
        <button on:click={login}>
        sign in with google</button>
    </div>
</div>