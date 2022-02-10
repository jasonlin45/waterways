<script>
    import { db } from './firebase';
    import TodoItem from './TodoItem.svelte';
    import { collection, where, query, updateDoc, addDoc, doc, deleteDoc} from 'firebase/firestore';
    import { collectionData } from 'rxfire/firestore';
    import { tap } from 'rxjs/operators';
    // User ID passed from parent
    export let uid;

    // Form Text
    let text = 'some task';

    const ref = collection(db, "todos");
    const q = query(
        ref,
        where('uid', '==', uid)
    )

    let todos = []
    collectionData(q, {idField: 'id'})
        .pipe(
            tap(d => console.log(d))
        )
        .subscribe(d => {
            todos = d;
         });
    

    function add() {    
        addDoc(collection(db, 'todos'), { uid, text, complete: false, created: Date.now() });
        text = '';
    }

    function removeItem(event){
        const { id } = event.detail;
        deleteDoc(doc(ref, id));
    };

    function updateStatus(event){
        const { id, newStatus } = event.detail;
        updateDoc(doc(ref, id), {complete: newStatus});
    };

</script>

<ul>
	{#each todos as todo}
        <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
	{/each}
</ul>

AFAFA
<input bind:value={text}>

<button on:click={add}>Add Task</button>
