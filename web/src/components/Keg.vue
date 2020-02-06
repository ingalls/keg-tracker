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
                    <svg class='icon h60 w60'><use xlink:href='#icon-database'/></svg>
                </div>
            </div>
            <div class='flex-parent flex-parent--center-main pb24'>
                <div class='flex-child'>
                    <span v-text='keg.name'></span>
                </div>
            </div>

            <div class='flex-parent flex-parent--center-main pb24'>
                <div class='flex-child w600'>

                    <div class='grid grid--gut12 col col--12'>
                         <div class='col col--12 pt24'>
                            <label>Location:</label>
                            <div class='h24' v-text='keg.location'></div>
                         </div>
                    </div>

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
            keg: {
                name: '',
                location: '',
                status: '',
                product: '',
                created: '',
                capacity: ''
            }
        }
    },
    created: function() {
        this.get();
    },
    methods: {
        get: function() {
            fetch(window.location.origin + '/api/kegs/' + this.id, {
                method: 'GET',
                credentials: 'same-origin'
            }).then((res) => {
                this.loading = false;

                return res.json();
            }).then((keg) => {
                this.keg = leg;
            });
        },
        kegs: function() {

        },
        close: function() {
            this.$emit('close');
        }
    }
}
</script>
