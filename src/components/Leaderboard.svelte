<script>
    import { db } from '../firebase';
    import { authState } from 'rxfire/auth';
    import { auth } from '../firebase';

    import { collection, where, query, doc, onSnapshot, getDoc} from 'firebase/firestore';
    import { collectionData } from 'rxfire/firestore';
    import { onDestroy } from 'svelte';
    import { mergeMap } from 'rxjs/operators';


    import LoadingScreen from './LoadingScreen.svelte';
    import DailyProgressBarChart from './DailyProgressBarChart.svelte';

    // User ID passed from parent
    let today = new Date();
    today.setHours(0,0,0,0)
    let loaded = false;
    let u_loaded = false;

    let groupid = 'Global';

    const w_ref = collection(db, "waterlog");
    const u_ref = collection(db, "users");
    const g_ref = collection(db, "groups");
    
    let user;
    const u_unsubscribe = authState(auth)
      .pipe(
        mergeMap(u => collectionData(query(u_ref, where('uid', '==', u.uid))))
      ).subscribe(r => {
        user = r[0];
      });

    const q = query(
        w_ref,
        where('date', '>=', today.getTime())
    )

    let data = []
    let name_map = {}
    let goal_map = {}

    
    const unsubscribe = collectionData(u_ref, {idField: 'id'})
        .subscribe(users => {
            users.forEach(o => name_map[o.uid] = o.name);
            users.forEach(o => goal_map[o.uid] = o.goal);
            u_loaded = true;
    });

    const unsub = onSnapshot(q,
        (snapShot) => {
            loaded = false;
            data = [];
            let tmp = {};
            snapShot.docs.map(doc => {
                let d = doc.data();
                tmp[d.uid] = tmp[d.uid] ? tmp[d.uid] + d.amt : d.amt;
            });
            for (let [key, value] of Object.entries(tmp)) {
                    data.push({uid: key, amt: value});
                } 
            loaded = true;
        }
    );
    
    onDestroy(() => {
        unsub();
        unsubscribe.unsubscribe();
        u_unsubscribe.unsubscribe();
    });

    async function getGroupDoc(gid){
      const docRef = doc(g_ref, gid);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    }

    async function getGroupName(gid){
      let d = await getGroupDoc(gid);
      return d.name;
    }
    
    async function getGroupMembers(gid){
      let d = await getGroupDoc(gid);
      return d.members;
    }

    let to_show;
    $: if(loaded && u_loaded) {
      to_show = [];
      data.forEach(item => {
        to_show.push({
          uid: item.uid,
          name: name_map[item.uid],
          num: Math.round(item.amt/goal_map[item.uid]*100)
        })
      })
    }
    
    async function filter(data, gid) {
      console.log(data);
      if(gid == 'Global') return data;
      let members = await getGroupMembers(gid);
      return data.filter(e => members.includes(e.uid))
    }
    


</script>
{#if loaded && u_loaded && user}
<div class="mx-auto w-fit pb-4">
  <span class="text-xl text-gray-500">Viewing:</span>
  <select class="p-2 border-blue-200 rounded-xl bg-transparent text-xl text-blue-500" 
        bind:value={groupid} on:change="{()=>{}}">
    <option value="Global">
      Global
    </option>
    {#each user.groups as group}
    <option value={group}>
        {#await getGroupName(group) then name}
          {name}
        {/await}
    </option>
    {/each}
  </select>
</div>
<h1 class="text-center text-gray-500">Global Leaderboard</h1>
{#await filter(to_show, groupid) then d}
<DailyProgressBarChart data={d}/>
{/await}
{:else}
<LoadingScreen/>
{/if}
