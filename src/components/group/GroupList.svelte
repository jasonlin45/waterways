<script>
    import { db } from '../../firebase';
    import {arrayRemove, 
            arrayUnion, 
            collection, 
            where, 
            query, 
            updateDoc, 
            addDoc, 
            doc, 
            deleteDoc, 
            writeBatch, 
            getDocs,
getDoc} from 'firebase/firestore';

    import { collectionData } from 'rxfire/firestore';
    import Group from './Group.svelte';
    import { onDestroy } from 'svelte';

    // User ID passed from parent
    export let uid;

    // Form Text
    let name = '';
    let code = '';
    let taken = false;
    let not_found = false;
    const ref = collection(db, "users");
    const gref = collection(db, "groups");

    const q = query(
        ref,
        where('uid', '==', uid)
    )

    let loaded = false;
    let user;
    let groups = [];
    // let groups = []
    const unsub = collectionData(q, {idField: 'id'})
        .subscribe(d => {
            user = d[0];
            if(user['groups']){
                groups = [];
                user['groups'].forEach(gid => {
                    getDoc(doc(gref, gid)).then(group => {
                        groups = [...groups, group.data()];
                    })
                })
            }
            loaded = true;
         });
    

    async function join() {
        // find group
        // name
        const gq = query(
            gref,
            where('name', '==', code)
        )
        const qSnap = await getDocs(gq);
        let group;
        if(qSnap.docs.length == 0){
            not_found = true;
            return;
        }
        let gid = qSnap.docs[0].id;
        const batch = writeBatch(db);
        batch.update(doc(gref, gid), {members: arrayUnion(uid)});
        batch.update(doc(ref, user.id), {groups: arrayUnion(gid)});
        await batch.commit();
        
    }

    async function add() {
        // check existence of name
        const gq = query(
            gref,
            where('name', '==', name)
        );

        const qSnap = await getDocs(gq);
        if(qSnap.docs.length > 0 || name.length == 0) {
            taken = true;
            return;
        }

        const newGroupRef = doc(gref);
        const batch = writeBatch(db);
        batch.set(newGroupRef, {name: name, members: [uid], owner: uid});
        batch.update(doc(ref, user.id), {groups: arrayUnion(newGroupRef.id)})
        await batch.commit();
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

{#if loaded}
<h3 class="text-2xl text-blue-500 font-medium">My Groups</h3>
<hr>
{#if (groups.length==0)}
    No groups yet!  Click create group to create a new group!
{:else}
<ul>
    {#each groups as group}
        <Group id={group.id} name={group.name} size={group.members.length} on:remove={removeItem} on:toggle={updateStatus} />
    {/each}
</ul>
{/if}

<div class="border-2 border-blue-100 max-w-fit mx-auto rounded-xl p-4 space-y-4">
    <h3 class="text-2xl text-blue-500">Join a Group</h3>
    <div>
        <label for="name">Name</label>
        <input class="py-1 px-2 rounded-xl border-blue-200" id="code" type="text" bind:value={code}>
    </div>
    {#if not_found}
    <span class="text-red-500">
        Group "{code}" not found!
    </span>
    <br>
    {/if}
    <button on:click={join} class="m-2 px-2 rounded-full bg-blue-500 text-white hover:ring-1 ring-blue-500 text-lg">Join</button>
</div>
<div class="border-2 border-blue-100 max-w-fit mx-auto rounded-xl p-4 space-y-4">
    <h3 class="text-2xl text-blue-500">Make a New Group</h3>
    <div>
        <label for="name">Name</label>
        <input 
            class="py-1 px-2 rounded-xl border-blue-200" 
            id="name" 
            type="text" 
            bind:value={name}
            on:focus={()=>taken=false}>
    </div>
    {#if taken}
    <span class="text-red-500">
        The name is taken!
    </span>
    <br>
    {/if}
    <button on:click={add} class="m-2 px-2 rounded-full bg-blue-500 text-white hover:ring-1 ring-blue-500 text-lg">Add</button>
</div>
{/if}