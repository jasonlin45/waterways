<script>
    export let width;
</script>
<div 
    class="text-white 
            text-right 
            bg-blue-500 
            text-xl 
            py-4 
            font-medium 
            rounded-r-xl
            h-full
            " 
    style="width: {width}%;">
    <div class="flex h-full flex-row-reverse">
        <div class="my-auto pr-4">
            <slot></slot>
        </div>
    </div>
</div>