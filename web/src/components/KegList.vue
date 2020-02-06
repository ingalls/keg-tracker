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
                    <h1 align='center' class='txt-h3 pt30'>Kegs</h1>

                    <div class='flex-parent flex-parent--center-main py24'>
                        <div class='flex-child'>
                            <label class='switch-container'>
                                <input v-model='noncirculating' type='checkbox' />
                                <div class='switch mr6'></div>
                                Non-Circulating
                            </label>
                        </div>
                    </div>

                    <div class='col col--12'>
                        <div class='grid'>
                            <div @click='order = "name"' class='cursor-pointer txt-underline-on-hover col col--4 border-b border--gray-light'>
                                <svg class='icon fl mr6 color-gray' style='height: 25px;'><use xlink:href='#icon-database'/></svg>
                                Name 
                                <template v-if='order === "name"'><svg class='icon fr mr6 color-gray' style='height: 25px;'><use xlink:href='#icon-chevron-down'/></svg></template>
                            </div>
                            <div @click='order = "stay"' class='cursor-pointer txt-underline-on-hover col col--2 border-b border--gray-light'>
                                <svg class='icon fl mr6 color-gray' style='height: 25px;'><use xlink:href='#icon-clock'/></svg>
                                Stay
                                <template v-if='order === "stay"'><svg class='icon fr mr6 color-gray' style='height: 25px;'><use xlink:href='#icon-chevron-down'/></svg></template>
                            </div>
                            <div @click='order = "capacity"' class='cursor-pointer txt-underline-on-hover jcol col--2 border-b border--gray-light'>
                                <svg class='icon fl mr6 color-gray' style='height: 25px;'><use xlink:href='#icon-filter'/></svg>
                                Size
                                <template v-if='order === "capacity"'><svg class='icon fr mr6 color-gray' style='height: 25px;'><use xlink:href='#icon-chevron-down'/></svg></template>
                            </div>
                            <div @click='order = "location"' class='cursor-pointer txt-underline-on-hover col col--4 border-b border--gray-light'>
                                <svg class='icon fl mr6 color-gray' style='height: 25px;'><use xlink:href='#icon-marker'/></svg>
                                Location
                                <template v-if='order === "location"'><svg class='icon fr mr6 color-gray' style='height: 25px;'><use xlink:href='#icon-chevron-down'/></svg></template>
                            </div>
                        </div>

                        <template v-for='k in kegs'>
                            <div class='grid grid--gut12 col col--12 py6 bg-darken10-on-hover cursor-pointer'>
                                <div @click='keg = k.id' class='col col--4 pl6'>
                                    <span v-text='k.name'></span>

                                    <template v-if='k.status !== "Circulating"'>
                                        <span class='ml6 color-red border border--red px6 py3 txt-xs txt-bold round' v-text='k.status'></span>
                                    </template>
                                </div>
                                <div @click='keg = k.id'class='col col--2' v-text='k.stay + " days"'></div>
                                <div @click='keg = k.id'class='col col--2' v-text='k.capacity'></div>
                                <div @click='location(k.location)' class='col col--4 txt-underline-on-hover' v-text='k.location_name'></div>
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
            noncirculating: false,
            order: 'stay',
            keg: false,
            kegs: []
        }
    },
    created: function() {
        this.refresh();
    },
    watch: {
        noncirculating: function() {
            this.refresh();
        },
        order: function() {
            this.refresh();
        }
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
            const status = this.noncirculating ? 'all' : 'Circulating';

            fetch(window.location.origin + `/api/kegs?status=${status}&order=${this.order}`, {
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
        },
        location: function(id) {
            this.$emit('location', id);
        }
    }
}
</script>
