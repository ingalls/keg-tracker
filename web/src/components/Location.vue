<template>
    <div class='w-full h-full'>
        <template v-if='loading'>
            <div class='flex-parent flex-parent--center-cross flex-parent--center-main h-full'>
                <div class='flex-child loading'></div>
            </div>
        </template>
        <template v-else>
            <div class='flex-parent flex-parent--center-main pt60 pb24'>
                <div class='flex-child'>
                    <svg class='icon h60 w60'><use xlink:href='#icon-marker'/></svg>
                </div>
            </div>
            <div class='flex-parent flex-parent--center-main pb24'>
                <div class='flex-child'>
                    <span v-text='location.name'></span>
                </div>
            </div>

            <div class='flex-parent flex-parent--center-main pb24'>
                <div class='flex-child w600'>

                    <template v-if='folds.contact'>
                        <div class='col col--12'>
                            <button @click='folds.contact = false'class='btn round btn--stroke color-gray'><svg class='icon h12 w12'><use xlink:href='#icon-chevron-right'/></svg></button>
                            Location Details
                       </div>
                    </template>
                    <template v-else>
                        <div class='col col--12'>
                            <button @click='folds.contact = true'class='btn round btn--stroke color-gray'><svg class='icon h12 w12'><use xlink:href='#icon-chevron-down'/></svg></button>
                            Location Details
                        </div>

                        <div class='grid grid--gut12 col col--12'>
                             <div class='col col--12 pt24'>
                                <label>Address:</label>
                                <div class='h24' v-text='location.addr'></div>
                             </div>
                             <div class='col col--4'>
                                <label>City:</label>
                                <div class='h24' v-text='location.city'></div>
                             </div>
                             <div class='col col--4'>
                                <label>Region:</label>
                                <div class='h24' v-text='location.region'></div>
                             </div>
                             <div class='col col--4'>
                                <label>Postcode:</label>
                                <div class='h24' v-text='location.postcode'></div>
                             </div>
                        </div>
                    </template>
                    <template v-if='folds.kegs'>
                        <div class='col col--12'>
                            <button @click='folds.contact = false'class='btn round btn--stroke color-gray'><svg class='icon h12 w12'><use xlink:href='#icon-chevron-right'/></svg></button>
                            Kegs
                       </div>
                    </template>
                    <template v-else>
                        <div class='col col--12'>
                            <button @click='folds.contact = true'class='btn round btn--stroke color-gray'><svg class='icon h12 w12'><use xlink:href='#icon-chevron-down'/></svg></button>
                            Kegs
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data: function() {
        return {
            loading: true,
            folds: {
                contact: true,
                kegs: false
            },
            kegs: [],
            location: {
                name: '',
                addr: '',
                city: '',
                region: '',
                postcode: '',
                agents: []
            }
        }
    },
    created: function() {
        this.get_kegs();
        this.get();
    },
    methods: {
        get: function() {
            fetch(window.location.origin + '/api/locations/' + this.id, {
                method: 'GET',
                credentials: 'same-origin'
            }).then((res) => {
                this.loading = false;

                return res.json();
            }).then((location) => {
                this.location = location;
            });
        },
        get_kegs: function() {
            fetch(window.location.origin + `/api/kegs?location=${encodeURIComponent(this.id)}`, {
                method: 'GET',
                credentials: 'same-origin'
            }).then((res) => {
                return res.json();
            }).then((kegs) => {
                this.kegs = kegs;
            });
        },
        close: function() {
            this.$emit('close');
        }
    }
}
</script>
