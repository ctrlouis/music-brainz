<!-- ALBUM DISPLAYER COMPONENTS -->

<template>
    <div>
        <p>{{data.name}}</p>
        <router-link :to="detailUrl">Go to details</router-link>
    </div>
</template>

<script>
export default {
    props: ['data'],

    data() {
        return {}
    },

    computed: {
        detailUrl() {
            return `/artists/${this.data.id}`;
        }
    }
}
</script>

<style lang="scss">

</style>
