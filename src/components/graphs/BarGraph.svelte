
<script>
    import Bar from './Bar.svelte';
    export let min;
    export let max;
    export let data;
    export let suffix;

    // convert values to pct
    // [min, max] -> [0, 100]
    // min = 0;
    // max = 100;
    const interval = Math.round(100/(max-min));
    function map_to_pct(data_point) {
        return Math.round(interval * data_point);
    }

</script>


<div class="container w-full mx-auto p-2 md:p-0 space-y-8 border-r-2">
    <div class="w-full mx-auto flex flex-wrap gap-y-8">
        {#each data as d}
            <div class="flex basis-full">
                <div class="basis-1/4 md:basis-3/12 lg:basis-2/12 flex">
                    <div class="my-auto font-medium text-sm md:text-lg text-right w-full pr-4">
                        {d.name}
                    </div>
                </div>
                <div class="basis-3/4 md:basis-9/12 lg:basis-10/12">
                    <Bar width="{map_to_pct(d.num)}">{map_to_pct(d.num)}{suffix}</Bar>
                </div>
            </div>
        {/each}
    </div>
</div>