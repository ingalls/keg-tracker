<template>
    <div class='w-full h-full'>
        <template v-if='loading'>
            <div class='flex-parent flex-parent--center-cross flex-parent--center-main h-full'>
                <div class='flex-child loading'></div>
            </div>
        </template>
        <template v-else-if='location === "new"'>
            <LocationEdit :id='location' v-on:close='refresh'/>
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
            <div class='flex-parent flex-parent--center-main'>
                <div class='flex-child w600'>
                    <h1 align=center class='txt-h3 py30'>Locations</h1>

                    <div class='grid grid--gut12 col col--12'>
                        <div class='col col--8 border-b border--gray-light'>
                            <svg class='icon fl mr6 color-gray' style='height: 25px;'><use xlink:href='#icon-marker'/></svg>
                            Location
                        </div>
                        <div class='col col--4 border-b border--gray-light'>
                            <svg class='icon fl mr6 color-gray' style='height: 25px;'><use xlink:href='#icon-database'/></svg>
                            Keg Inventory
                        </div>

                        <template v-for='loc in locations'>
                            <div @click='location = loc.id' class='grid col col--12 py6 bg-darken10-on-hover cursor-pointer'>
                                <div class='col col--8' v-text='loc.name'></div>
                                <div class='col col--4' v-text='loc.kegs + " kegs"'></div>
                            </div>
                        </template>

                        <div class='flex-parent flex-parent--center-main w-full py24'>
                            <div class='flex-child'>
                                <button @click='create' class='btn btn--stroke round color-gray color-green-on-hover py3 px3 mx6 my6'><svg class='icon h24 w24'><use xlink:href='#icon-plus'/></svg></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import Location from './Location.vue'
import LocationEdit from './LocationEdit.vue'

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
        Location,
        LocationEdit
    },
    methods: {
        refresh: function() {
            this.location = false;
            this.get();
        },
        create: function() {
            this.location = 'new';
        },
        get: function() {
            this.loading = true;

            fetch(window.location.origin + '/api/locations', {
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
