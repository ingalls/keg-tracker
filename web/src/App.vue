<template>
<div id="app">
    <div class='flex-parent viewport-full relative scroll-hidden'>
        <div class='flex-child w-full w60-ml absolute static-ml left bottom'>
            <div class='flex-parent flex-parent--column viewport-third h-full hmax-full bg-white'>
                <div class='flex-child flex-child--grow px12 py12 scroll-auto'>
                    <button @click='mode = "company"' class='btn round btn--stroke my6 w36 h36 color-black'>
                        <svg class='icon'><use xlink:href='#icon-house'/></svg>
                    </button>
                    <button @click='mode = "keg"' class='btn round btn--stroke my6 w36 h36 color-black'>
                        <svg class='icon'><use xlink:href='#icon-house'/></svg>
                    </button>
                </div>
                <footer class='px12 py12 bg-gray-faint txt-s'>
                </footer>
            </div>
        </div>
        <div class='flex-child flex-child--grow bg-darken10 viewport-twothirds viewport-full-ml'>
            <template v-if='mode === "default"'>

            </template>
            <template v-else-if='mode === "company"'>
                <CompanyList/>
            </template>
            <template v-else-if='mode === "keg"'>

            </template>
        </div>
    </div>
</div>
</template>

<script>
import '../node_modules/@mapbox/assembly/dist/assembly.js';
import CompanyList from './components/CompanyList.vue';

export default {
    name: 'app',
    data: function() {
        return {
            mode: 'default'
        }
    },
    components: {
        CompanyList
    }
}
</script>

<style>
    @import '../node_modules/@mapbox/assembly/dist/assembly.min.css';
</style>
