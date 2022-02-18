<script>
    import { fly } from 'svelte/transition';
</script>

<div class="absolute top-0 left-0 h-screen w-screen overflow-hidden">
    <div class="w-full h-full" in:fly="{{y:2000, duration:100}}" out:fly="{{y:500, duration:1000}}">
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
        <div class="h-full w-full bg-blue-500 flex p-12">
            <div class="mx-auto lds-dual-ring">
            </div>
        </div>
    </div>
</div>

<style>
    .waves {
      position:relative;
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
    
    .lds-dual-ring {
      display: inline-block;
      width: 80px;
      height: 80px;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid #fff;
      border-color: #fff transparent #fff transparent;
      animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
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