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
{name}, {size}oz
<button on:click={remove} class="border-none"> ❌ </button>

</li>