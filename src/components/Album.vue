<!-- ALBUM DISPLAYER COMPONENTS -->

<template>
    <div>
        <div>
            <img :src="imageSrc" alt="Front album cover">
        </div>
        <div>
            <h3>{{data.title}}</h3>
        </div>
        <router-link :to="detailUrl">Go to details</router-link>
    </div>
</template>

<script>
export default {
    props: ['data'],

    data() {
        return {
            api: {
                cover: {
                    url: "http://coverartarchive.org/release/"
                }
            }
        }
    },

    computed: {
        detailUrl() {
            return `/albums/${this.data.id}`;
        },
        imageSrc() {
            return this.api.cover.url + this.data.id + "/front";
        }
    }
}
</script>

<style lang="scss">

</style>
