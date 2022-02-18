<script>
    import { fade } from 'svelte/transition';

    import BarGraph from '../components/graphs/BarGraph.svelte';

    export let data;

    function sort(d) {
        d.sort((a, b) => {return b.num - a.num})
        return d;
    }
</script>

<div in:fade class="w-full md:w-1/2 lg:w-1/3 mx-auto">
    <h3 class="text-center text-3xl text-blue-500 mb-8">Daily Progress</h3>
    <BarGraph min=0 max=100 data={sort(data)} suffix="%"></BarGraph>
</div>