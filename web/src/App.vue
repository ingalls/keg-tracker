<template>
<div id="app">
    <div class='flex-parent viewport-full relative scroll-hidden'>
        <div class='flex-child w-full w60-ml absolute static-ml left bottom'>
            <div class='flex-parent flex-parent--column viewport-third h-full hmax-full bg-white'>
                <div class='flex-child flex-child--grow px12 py12 scroll-auto'>
                    <router-link to='/' class='btn px6 round btn--stroke mb24 w36 h36 color-black'>
                        <svg class='icon h24 w24'><use xlink:href='#icon-home'/></svg>
                    </router-link>

                    <router-link to='/locations' class='btn px6 round btn--stroke my6 w36 h36 color-black'>
                        <svg class='icon h24 w24'><use xlink:href='#icon-marker'/></svg>
                    </router-link>
                    <router-link to='/kegs' class='btn px6 round btn--stroke my6 w36 h36 color-black'>
                        <svg class='icon h24 w24'><use xlink:href='#icon-database'/></svg>
                    </router-link>
                    <router-link to='/ladens' class='btn px6 round btn--stroke my6 w36 h36 color-black'>
                        <svg class='icon h24 w24'><use xlink:href='#icon-printer'/></svg>
                    </router-link>
                </div>
                <footer class='px12 py12 bg-gray-faint txt-s'>
                </footer>
            </div>
        </div>
        <div class='flex-child flex-child--grow bg-darken10 viewport-twothirds viewport-full-ml'>
            <router-view/>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'app',
    data: function() {
        return {
            location: false,
            leg: false,
        }
    }
}
</script>
