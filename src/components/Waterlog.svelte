<script>
    import { db } from '../firebase';
    import { collection, where, query, updateDoc, addDoc, doc, deleteDoc} from 'firebase/firestore';
    import { collectionData } from 'rxfire/firestore';
    import Progress from './Progress.svelte';

    // User ID passed from parent
    export let uid;
    let today = new Date();
    today.setHours(0,0,0,0)

    // Form Text
    let amt = 16;

    const w_ref = collection(db, "waterlog");

    const q = query(
        w_ref,
        where('uid', '==', uid),
    //    where('date', '>=', today)
    )

    let data = []

    $: progress = data.reduce((sum, obj) => sum + obj.amt, 0);

    collectionData(q, {idField: 'id'})
        .subscribe(d => {
            if(d) data = d;
         });
    

    function add(amt) {   
        if(amt) 
            addDoc(w_ref, { uid, amt: amt, created: Date.now() });
    }

    function removeItem(event){
        const { id } = event.detail;
        deleteDoc(doc(w_ref, id));
    };

</script>
<ul>
    {#each data as d}
        <li>
            {d.amt}
        </li>
    {/each}
</ul>
<Progress amt={progress}/>
<div class="border-2 border-blue-100 max-w-fit mx-auto rounded-xl p-4 space-y-4">
    <h3 class="text-2xl text-blue-500">Make a new entry</h3>
    <div>
        <label for="number">Amount (Oz)</label>
        <input class="py-1 px-2 rounded-xl border-blue-200" id="number" type="number" bind:value={amt}>
    </div>
    <button on:click={add(amt)} class="m-2 px-2 rounded-full bg-blue-500 text-white hover:ring-1 ring-blue-500 text-lg">Add</button>
</div>