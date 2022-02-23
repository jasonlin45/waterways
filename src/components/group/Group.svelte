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

<div class="p-4 rounded-xl bg-blue-100 flex-grow mx-auto">
💧
<h3 class="text-xl">
    {name}    
</h3>
<span>
    {size} members
</span>
<!-- <button on:click={remove} class="border-none"> ❌ </button> -->

</div>