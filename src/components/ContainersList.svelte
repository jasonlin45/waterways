<script>
    import { db } from '../firebase';
    import { collection, where, query, updateDoc, addDoc, doc, deleteDoc} from 'firebase/firestore';
    import { collectionData } from 'rxfire/firestore';
    import Container from './Container.svelte';
    import { onDestroy } from 'svelte';

    // User ID passed from parent
    export let uid;

    // Form Text
    let size = 16;
    let name = 'Bottle';

    const ref = collection(db, "containers");
    const q = query(
        ref,
        where('uid', '==', uid)
    )

    let containers = []
    const unsub = collectionData(q, {idField: 'id'})
        .subscribe(d => {
            containers = d;
         });
    

    function add() {    
        addDoc(ref, { uid, name, size: size, created: Date.now() });
    }

    function removeItem(event){
        const { id } = event.detail;
        deleteDoc(doc(ref, id));
    };

    function updateStatus(event){
        const { id, newStatus } = event.detail;
        updateDoc(doc(ref, id), {complete: newStatus});
    };

    onDestroy(() => {
        unsub.unsubscribe();
    })

</script>

<ul>
	{#each containers as container}
        <Container {...container} on:remove={removeItem} on:toggle={updateStatus} />
	{/each}
</ul>

<div class="border-2 border-blue-100 max-w-fit mx-auto rounded-xl p-4 space-y-4">
    <h3 class="text-2xl text-blue-500">Add a New Container</h3>
    <div>
        <label for="number">Size (Oz)</label>
        <input class="py-1 px-2 rounded-xl border-blue-200" id="number" type="number" bind:value={size}>
    </div>
    <div>
        <label for="name">Name</label>
        <input class="py-1 px-2 rounded-xl border-blue-200" id="name" type="text" bind:value={name}>
    </div>
    <button on:click={add} class="m-2 px-2 rounded-full bg-blue-500 text-white hover:ring-1 ring-blue-500 text-lg">Add</button>
</div>
