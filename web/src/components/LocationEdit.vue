<template>
    <div class='w-full h-full'>
        <div class='flex-parent flex-parent--center-main pt60 pb24'>
            <div class='flex-child'>
                <svg class='icon h60 w60'><use xlink:href='#icon-marker'/></svg>
            </div>
        </div>
        <template v-if='id === "new"'>
            <div class='flex-parent flex-parent--center-main pb24'>
                <div class='flex-child'>
                    New Location
                </div>
            </div>
        </template>
        <template v-else>
            <div class='flex-parent flex-parent--center-main pb24'>
                <div class='flex-child'>
                    <span v-text='location.name'></span>
                </div>
            </div>
        </template>

        <div class='flex-parent flex-parent--center-main pb24'>
            <div class='flex-child w600'>

                <div class='grid grid--gut12 col col--12'>
                    <div class='col col--12'>
                        <label>Name:</label>
                        <input v-model='location.name' class='input' placeholder='ACME Labs' />
                    </div>

                     <div class='col col--12 pt24'>
                        <label>Address:</label>
                        <input v-model='location.addr' class='input' placeholder='27 Allegheny Drive' />
                     </div>
                     <div class='col col--4'>
                        <label>City:</label>
                        <input v-model='location.city' class='input' placeholder='Seneca Rocks' />
                     </div>
                     <div class='col col--4'>
                        <label>Region:</label>
                        <input v-model='location.region' class='input' placeholder='WV' />
                     </div>
                     <div class='col col--4'>
                        <label>Postcode:</label>
                        <input v-model='location.postcode' class='input' placeholder='26884' />
                     </div>

                     <div class='col col--12 pt24'>
                        <button @click='close' class='fl btn btn--stroke round color-gray'>Cancel</button>
                        <button @click='save' class='fr btn btn--stroke round color-gray'>Save</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data: function() {
        return {
            location: {
                name: '',
                addr: '',
                city: '',
                region: '',
                postcode: ''
            }
        }
    },
    created: function() {

    },
    methods: {
        save: function() {
            if (this.id === "new") {
                fetch(window.location.origin + '/api/locations', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.location)
                }).then((res) => {
                    res.json().then((body) => {
                        if (res.status === 200) {
                            this.close();
                        } else {
                            alert(body.message);
                        }
                    }).catch((err) => {
                        alert(err.message);
                    });
                }).catch((err) => {
                    alert(err.message);
                });
            } else {

            }
        },
        close: function() {
            this.$emit('close');
        }
    }
}
</script>
