<template>
    <div>
        HELLO
    </div>
</template>

<script>
export default {
    props: [],
    data: function() {
        return {

        }
    },
    created: function() {
        this.get();
    },
    methods: {
        get: function() {
            fetch('/api/companies', {
                method: 'GET',
                credentials: 'same-origin'
            }).then((res) => {

            });
        }
    }
}
</script>
