<!-- ALBUM DISPLAYER COMPONENTS -->

<template>
    <div class="col-6 col-s-4 col-l-3 col-xl-2">
        <h3>{{data.name}}</h3>
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
