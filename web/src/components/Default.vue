<template>
    <div class='w-full h-full'>
        <div class='flex-parent flex-parent--center-main pt30'>
            <div class='flex-child'>
                <h1 class='txt-h3'>Keg Tracker</h1>
            </div>
        </div>

        <div class='flex-parent flex-parent--center-main pt12'>
            <div class='flex-child'>
                <button @click='mode = "recent"' class='mx3 btn btn--s round btn--stroke'>Lengthy Stays</button>
                <button @click='mode = "receive"' class='mx3 btn btn--s round btn--stroke'>Quick Receive</button>
            </div>
        </div>

        <template v-if='mode === "recent"'>

        </template>
        <template v-else-if='mode === "receive"'>

        </template>
    </div>
</template>

<script>
export default {
    props: [],
    data: function() {
        return {
            loading: true,
            mode: 'recent'
        }
    },
    methods: {
    }
}
</script>
