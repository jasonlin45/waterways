<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    
    function remove() {
		dispatch('remove', { id });
	}    

    export let id; // document ID
    export let name;
    export let size;

</script>

<li class="p-4 rounded-xl bg-blue-100 max-w-fit mx-auto">
💧
<h3 class="text-xl">
    {name}    
</h3>{size} members
<!-- <button on:click={remove} class="border-none"> ❌ </button> -->

</li>