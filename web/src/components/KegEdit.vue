<template>
    <div class='w-full h-full'>
        <div class='flex-parent flex-parent--center-main pt60 pb24'>
            <div class='flex-child'>
                <svg class='icon h60 w60'><use xlink:href='#icon-database'/></svg>
            </div>
        </div>
        <template v-if='id === "new"'>
            <div class='flex-parent flex-parent--center-main pb24'>
                <div class='flex-child'>
                    New Keg
                </div>
            </div>
        </template>
        <template v-else>
            <div class='flex-parent flex-parent--center-main pb24'>
                <div class='flex-child'>
                    <span v-text='keg.name'></span>
                </div>
            </div>
        </template>

        <div class='flex-parent flex-parent--center-main pb24'>
            <div class='flex-child w600'>

                <div class='grid grid--gut12 col col--12'>
                    <div class='col col--8'>
                        <label>Name:</label>
                        <input v-model='keg.name' class='input' placeholder='Roaring Rabbit' />
                    </div>

                    <div class='col col--4'>
                        <label>Manufacturer:</label>
                        <input v-model='keg.manufacturer' class='input' placeholder='ACME Labs' />
                    </div>

                    <div class='col col--4'>
                        <label>Capacity:</label>
                        <div class='select-container w-full'>
                            <select v-model='keg.capacity' class='select'>
                                <option>Half-Barrel</option>
                                <option>Sixtel</option>
                            </select>
                            <div class='select-arrow'></div>
                        </div>
                    </div>

                    <div class='col col--4'>
                        <label>Status:</label>
                        <div class='select-container w-full'>
                            <select v-model='keg.status' class='select'>
                                <option>Circulating</option>
                                <option>Damaged</option>
                                <option>Lost</option>
                            </select>
                            <div class='select-arrow'></div>
                        </div>
                    </div>

                    <div class='col col--4'>
                        <label>Product:</label>
                        <input v-model='keg.product' class='input' placeholder='Empty' />
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
            keg: {
                name: '',
                manufacturer: '',
                capacity: 'Half-Barrel',
                status: 'Circulating',
                product: ''
            }
        }
    },
    created: function() {

    },
    methods: {
        save: function() {
            if (this.id === "new") {
                fetch(window.location.origin + '/api/kegs', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.keg)
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
