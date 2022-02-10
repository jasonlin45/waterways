<script>
	import {auth, googleProvider} from './firebase';
	import {signInWithPopup} from "firebase/auth";
	import {authState} from 'rxfire/auth';
  import {push} from 'svelte-spa-router';
  import { db } from './firebase';
  import { collection, where, query, addDoc} from 'firebase/firestore';
  import { collectionData } from 'rxfire/firestore';
  import { fade, fly } from 'svelte/transition';
  import { onDestroy } from 'svelte';

  let initialLogin = true;
  let secondary = false;
  let name = '';
  let weight = 100;
  let activity = 1;
  let user;

  const ACTIVE_MAP = {
    0: "Sedentary",
    1: "15-30 mins exercise",
    2: "1 hr exercise",
    3: "1-1.5 hrs exercise",
    4: "Extremely active",
    5: "Elite athlete"
  }
  const u_ref = collection(db, "users");

  $: goal = Math.floor(weight/2) + 12 * activity;

  const unsub_a = authState(auth).subscribe(u => {
      if(u){
          user = u;
          const uq = query(
              u_ref,
              where('uid', '==', u.uid)
          )
          name = u.displayName;

          collectionData(uq, {idField: 'id'})
              .subscribe(d => { 
                  if(d.length==0 || !d[0].goal){
                      initialLogin = false;
                  }
                  else push('/home');
              });
      };
  });

  

  function updateInfo() {
    if(name.length > 0 && weight > 0){
      addDoc(u_ref, {uid: user.uid, name: name, goal: goal});
      push('/home');
    }
  }

  function login() {
    signInWithPopup(auth, googleProvider);
  }

  onDestroy(() => {
    unsub_a.unsubscribe();
  })

</script>

<div out:fade="{{duration:300}}" class="flex w-screen h-screen flex-wrap out">
  {#if initialLogin}
        <div out:fade="{{duration:400}}" on:outroend="{()=>secondary=true}" 
              class="container 
                    basis-full
                    m-auto 
                    text-center 
                    rounded-xl
                    space-y-8
                    pb-12">
            <h1 class="text-4xl text-blue-500 font-bold">
                Waterways 
                💦
            </h1>
    
            <button on:click={login} 
            class="
                text-2xl 
                p-4 
                px-8 
                bg-blue-500 
                text-white 
                rounded-full
                hover:scale-105
                transition
                ease-out
                duration-500">
                Log in with Google
            </button>
        </div>
    {:else if secondary}
        <div in:fade="{{duration:300}}" 
            class="container
                    m-auto
                    rounded-xl
                    space-y-8
                    p-8
                    pb-12
                    w-fit">
          <div class="space-y-4">
            <h3 class="text-4xl text-blue-500">Tell us about yourself</h3>
            <p class="text-light opacity-60 max-w-sm">
              Your daily goal for water consumption will be automatically calculated
              based on weight and activity level.
            </p>
          </div>
          <div>
            <label class="text-blue-400 pb-2" for="name">Name</label>
            <input class="px-4 p-2 rounded-xl" id="name" type="text" bind:value={name}>
          </div>
          <div>
            <label class="text-blue-400 pb-2" for="weight">Weight (lbs)</label>
            <input class="px-4 p-2 rounded-xl" id="weight" type="number" bind:value={weight}>
          </div> 
          <div>
            <label class="text-blue-400 pb-2" for="activity">Daily Activity Level</label>
            <input id="activity" type="range" min="0" max="5" bind:value={activity}>
            <br>{ACTIVE_MAP[activity]}
          </div>
          <button 
          on:click={updateInfo}
          class="text-xl mx-auto p-2 px-4 bg-blue-500 text-white rounded-full hover:scale-105 transition ease-out duration-400">
          Get Started
        </button>
        </div>
    {/if}
    <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
    <defs>
    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
    </defs>
    <g class="parallax">
    <use xlink:href="#gentle-wave" x="48" y="0" class="fill-blue-500 opacity-70" />
    <use xlink:href="#gentle-wave" x="48" y="3" class="fill-blue-500 opacity-50" />
    <use xlink:href="#gentle-wave" x="48" y="5" class="fill-blue-500 opacity-20" />
    <use xlink:href="#gentle-wave" x="48" y="7" class="fill-blue-500 opacity-90" />
    </g>
    </svg>
    
</div>

<style>
.waves {
  position:fixed;
  width: 100%;
  height:15vh;
  bottom: 0;
  min-height:100px;
  max-height:150px;
}

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% { 
    transform: translate3d(85px,0,0);
  }
}

/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height:40px;
    min-height:40px;
    }
}
</style>