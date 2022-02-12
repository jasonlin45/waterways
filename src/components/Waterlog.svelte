<script>
    import { db } from '../firebase';
    import { increment, collection, where, query, updateDoc, addDoc, doc, deleteDoc} from 'firebase/firestore';
    import { collectionData } from 'rxfire/firestore';
    import { onDestroy } from 'svelte';
    import Progress from './Progress.svelte';

    // User ID passed from parent
    export let uid;
    let today = new Date();
    today.setHours(0,0,0,0)
    // Form Text
    let amt = 16;
    let goal = 100;
    let days_reached = 0;

    let id;
    const w_ref = collection(db, "waterlog");
    const u_ref = collection(db, "users");

    const q = query(
        w_ref,
        where('uid', '==', uid),
        where('date', '>=', today.getTime())
    )
    
    const uq = query(
        u_ref,
        where('uid', '==', uid)
    )

    let data = []

    $: progress = data.reduce((sum, obj) => sum + obj.amt, 0);

    const unsub_w = collectionData(q, {idField: 'id'})
        .subscribe(d => {
            if(d) data = d;
         });
    
    
    const unsub_u = collectionData(uq, {idField: 'id'})
        .subscribe(d => { 
            goal = d[0].goal;
            id = d[0].id;
            if(d[0].days_reached) days_reached = d[0].days_reached;
        });

    function add(amt) {   
        if(amt) 
            if(progress < goal && amt + progress >= goal){
                updateDoc(doc(u_ref, id), {days_reached: increment(1)})
            }
            addDoc(w_ref, { uid, amt: amt, date: Date.now() });
    }

    function removeItem(event){
        const { id } = event.detail;
        deleteDoc(doc(w_ref, id));
    };

    onDestroy(() => {
        unsub_w.unsubscribe();
        unsub_u.unsubscribe();
    })

    const containers = [
        {name: "Glass", amt: 8},
        {name: "Bottle", amt: 16},
        {name: "Bigger", amt: 22},
        {name: "Huge", amt: 32},
        {name: "Gallon", amt:128}
    ]

</script>
    <div class="text-center w-fit mx-auto relative">
        <Progress amt={progress} goal={goal} days_reached={days_reached}/>
        <div class="lg:absolute lg:left-full lg:top-24 lg:h-full lg:w-48 lg:space-y-4">
            {#each containers as c}
                <button class="lg:flex
                            border-2 
                            border-blue-500 
                            rounded-full 
                            text-blue-500
                            text-left
                            text-xl
                            w-fit
                            m-4
                            p-2 px-4
                            hover:text-white
                            hover:bg-blue-500
                            transition"
                        on:click={() => add(c.amt)}>
                    Add {c.amt}oz
                </button>
            {/each}
        </div>
    </div>
    <div class="border-2 border-blue-100 max-w-fit mx-auto rounded-xl p-4 space-y-4">
        <h3 class="text-2xl text-blue-500">Make a new entry</h3>
        <div>
            <label for="number">Amount (Oz)</label>
            <input class="py-1 px-2 rounded-xl border-blue-200" id="number" type="number" bind:value={amt}>
        </div>
        <button on:click={() => add(amt)} class="m-2 px-2 rounded-full bg-blue-500 text-white hover:ring-1 ring-blue-500 text-lg">Add</button>
    </div>