/*
* COMPONENT
* Display short artists informations
*/

<template>
    <router-link :to="detailUrl" class="card col-6 col-s-4 col-l-3 col-xl-2">
        <h3>{{data.name}}</h3>
        <div v-if="data.type" class="info">
            <div>Type:</div>
            <div>{{data.type}}</div>
        </div>
        <div v-if="data.gender" class="info">
            <div>Gender:</div>
            <div>{{data.gender}}</div>
        </div>
        <div v-if="data.country" class="info">
            <div>Country:</div>
            <div>{{data.country}}</div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: ['data'],

    data() {
        return {}
    },

    computed: {
        detailUrl() {
            /*
            * @return url to current artist details
            */
            return `/artists/${this.data.id}`;
        }
    }
}
</script>

<style lang="scss">

</style>
