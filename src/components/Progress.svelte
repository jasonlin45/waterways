<script>
    export let amt;
</script>
<div class="h-1/2 w-1/2 mx-auto">
    <div class="h-8 bg-gray-200 w-full">
        <div class="bg-blue-500 h-full" style="width: {amt/100 * 100}%">{amt}</div>
    </div>
</div>