<!-- ALBUM DISPLAYER COMPONENTS -->

<template>
    <div>
        <div>
            <img :src="src" alt="Front album cover">
        </div>
        <div>
            <h2>{{data.title}}</h2>
        </div>
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
        src() {
            return this.api.cover.url + this.data.id + "/front";
        }
    },

    created() {
        console.log(this.data);
        
    }
}
</script>

<style lang="scss">

</style>
