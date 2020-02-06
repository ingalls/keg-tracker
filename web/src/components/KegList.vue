<template>
    <div class='w-full h-full'>
        <template v-if='loading'>
            <div class='flex-parent flex-parent--center-cross flex-parent--center-main h-full'>
                <div class='flex-child loading'></div>
            </div>
        </template>
        <template v-else-if='keg === "new"'>
            <KegEdit :id='keg' v-on:close='refresh'/>
        </template>
        <template v-else-if='keg'>
            <Keg :id='keg' v-on:close='refresh'/>
        </template>
        <template v-else-if='!kegs.length'>
            <div class='flex-parent flex-parent--center-main pt60 pb24'>
                <div class='flex-child'>
                    <svg class='icon h60 w60'><use xlink:href='#icon-info'/></svg>
                </div>
            </div>
            <div class='flex-parent flex-parent--center-main'>
                <div class='flex-child'>
                    You haven't created any kegs yet!
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
                    <h1 align=center class='txt-h3 py30'>Kegs</h1>

                    <div class='col col--12'>
                        <div class='grid'>
                            <div class='col col--6 border-b border--gray-light'>
                                <svg class='icon fl mr6 color-gray' style='height: 25px;'><use xlink:href='#icon-database'/></svg>
                                Name
                            </div>
                            <div class='col col--2 border-b border--gray-light'>
                                <svg class='icon fl mr6 color-gray' style='height: 25px;'><use xlink:href='#icon-filter'/></svg>
                                Capacity
                            </div>
                            <div class='col col--4 border-b border--gray-light'>
                                <svg class='icon fl mr6 color-gray' style='height: 25px;'><use xlink:href='#icon-marker'/></svg>
                                Location
                            </div>
                        </div>

                        <template v-for='k in kegs'>
                            <div @click='keg = k.id' class='grid grid--gut12 col col--12 py6 bg-darken10-on-hover cursor-pointer'>
                                <div class='col col--6' v-text='k.name'></div>
                                <div class='col col--2' v-text='k.capacity + "L"'></div>
                                <div class='col col--4' v-text='k.location'></div>
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
import Keg from './Keg.vue'
import KegEdit from './KegEdit.vue'

export default {
    props: [],
    data: function() {
        return {
            loading: true,
            keg: false,
            kegs: []
        }
    },
    created: function() {
        this.refresh();
    },
    components: {
        Keg,
        KegEdit
    },
    methods: {
        refresh: function() {
            this.keg = false;
            this.get();
        },
        create: function() {
            this.keg = 'new';
        },
        get: function() {
            this.loading = true;

            fetch(window.location.origin + '/api/kegs', {
                method: 'GET',
                credentials: 'same-origin'
            }).then((res) => {
                this.loading = false;

                return res.json();
            }).then((kegs) => {
                this.kegs = kegs;
            }).catch((err) => {
                alert(err.message);
            });
        }
    }
}
</script>
