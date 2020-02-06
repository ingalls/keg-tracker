<template>
<div id="app">
    <div class='flex-parent viewport-full relative scroll-hidden'>
        <div class='flex-child w-full w60-ml absolute static-ml left bottom'>
            <div class='flex-parent flex-parent--column viewport-third h-full hmax-full bg-white'>
                <div class='flex-child flex-child--grow px12 py12 scroll-auto'>
                    <button @click='mode = "default"' class='btn px6 round btn--stroke mb24 w36 h36 color-black'>
                        <svg class='icon h24 w24'><use xlink:href='#icon-home'/></svg>
                    </button>

                    <button @click='mode = "company"' class='btn px6 round btn--stroke my6 w36 h36 color-black'>
                        <svg class='icon h24 w24'><use xlink:href='#icon-marker'/></svg>
                    </button>
                    <button @click='mode = "keg"' class='btn px6 round btn--stroke my6 w36 h36 color-black'>
                        <svg class='icon h24 w24'><use xlink:href='#icon-database'/></svg>
                    </button>
                </div>
                <footer class='px12 py12 bg-gray-faint txt-s'>
                </footer>
            </div>
        </div>
        <div class='flex-child flex-child--grow bg-darken10 viewport-twothirds viewport-full-ml'>
            <template v-if='mode === "default"'>
                <Default/>
            </template>
            <template v-else-if='mode === "company"'>
                <LocationList/>
            </template>
            <template v-else-if='mode === "keg"'>
                <KegList/>
            </template>
        </div>
    </div>
</div>
</template>

<script>
import LocationList from './components/LocationList.vue';
import KegList from './components/KegList.vue';
import Default from './components/Default.vue';

export default {
    name: 'app',
    data: function() {
        return {
            mode: 'default'
        }
    },
    components: {
        LocationList,
        KegList,
        Default
    }
}
</script>
