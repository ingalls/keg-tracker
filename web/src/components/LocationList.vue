<template>
    <div class='w-full h-full'>
        <template v-if='loading'>
            <div class='flex-parent flex-parent--center-cross flex-parent--center-main h-full'>
                <div class='flex-child loading'></div>
            </div>
        </template>
        <template v-else-if='location'>
            <Location :id='location' v-on:close='refresh'/>
        </template>
        <template v-else-if='!locations.length'>
            <div class='flex-parent flex-parent--center-main pt60 pb24'>
                <div class='flex-child'>
                    <svg class='icon h60 w60'><use xlink:href='#icon-info'/></svg>
                </div>
            </div>
            <div class='flex-parent flex-parent--center-main'>
                <div class='flex-child'>
                    You haven't created any locations yet!
                </div>
            </div>
            <div class='flex-parent flex-parent--center-main py30'>
                <div class='flex-child'>
                    <button @click='create' class='btn round btn--stroke color-gray color-green-on-hover'><svg class='icon h24 w24'><use xlink:href='#icon-plus'/></svg></button>
                </div>
            </div>
        </template>
        <template v-else>

        </template>
    </div>
</template>

<script>
import Location from './Location.vue'

export default {
    props: [],
    data: function() {
        return {
            loading: true,
            location: false,
            locations: []
        }
    },
    created: function() {
        this.refresh();
    },
    components: {
        Location
    },
    methods: {
        refresh: function() {
            this.location = false;
            this.get();
        },
        create: function() {
            this.location = -1;
        },
        get: function() {
            this.loading = true;

            fetch(window.location.origin + '/api/location', {
                method: 'GET',
                credentials: 'same-origin'
            }).then((res) => {
                this.loading = false;

                return res.json();
            }).then((locations) => {
                this.locations = locations;
            }).catch((err) => {
                alert(err.message);
            });
        }
    }
}
</script>
